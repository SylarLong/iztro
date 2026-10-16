const assert = require('node:assert/strict');
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');

// Accept exact npm versions, never ranges or build metadata that npm normalizes away.
const identifier = '(?:0|[1-9]\\d*|\\d*[A-Za-z-][0-9A-Za-z-]*)';
const versionPattern = new RegExp(
  `^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-${identifier}(?:\\.${identifier})*)?$`,
);

function validateVersion(tag, version) {
  assert.equal(typeof version, 'string', 'package.json must contain a version');
  assert.equal(version.trim(), version, 'Version must not contain surrounding whitespace');
  assert.match(version, versionPattern, 'Use an exact semantic version without build metadata');
  assert.equal(tag, `v${version}`, `Release tag must equal v${version}`);
  return version.includes('-') ? 'next' : 'latest';
}

function validateTagCommit(tag, run = spawnSync) {
  const options = { encoding: 'utf8' };
  const tagged = run('git', ['rev-parse', '--verify', `refs/tags/${tag}^{commit}`], options);
  assert.equal(tagged.status, 0, 'Release tag must exist locally; branches are not release tags');
  const head = run('git', ['rev-parse', 'HEAD'], options);
  assert.equal(head.status, 0, 'Cannot read checked-out commit');
  assert.equal(tagged.stdout.trim(), head.stdout.trim(), 'Checked-out commit does not match the release tag');
}

function isPublished(name, version, run = spawnSync) {
  const result = run(
    'npm',
    ['view', `${name}@${version}`, 'version', '--json', '--registry', 'https://registry.npmjs.org'],
    {
      encoding: 'utf8',
      timeout: 120000,
      env: { ...process.env, NPM_CONFIG_FETCH_RETRIES: '1', NPM_CONFIG_FETCH_TIMEOUT: '30000' },
    },
  );
  if (result.error) throw result.error;
  let response;
  try {
    response = JSON.parse(result.stdout);
  } catch {
    throw new Error('npm registry returned an invalid response; refusing to assume the version is unpublished');
  }
  if (result.status === 0) {
    assert.equal(response, version, 'npm registry returned an unexpected version');
    return true;
  }
  if (response?.error?.code === 'E404') return false;
  throw new Error(`npm registry check failed (${response?.error?.code || result.status}); publication stopped`);
}

function output(key, value) {
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
}

function extractReleaseNotes(markdown, tag) {
  validateVersion(tag, tag.slice(1));
  const heading = new RegExp(`^## ${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:（\\d{4}\\.\\d{2}\\.\\d{2} 发布）)?$`);
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const matches = lines.flatMap((line, index) => (heading.test(line.trimEnd()) ? [index] : []));
  assert.equal(matches.length, 1, `CHANGELOG.md must contain exactly one section for ${tag}`);
  const start = matches[0] + 1;
  const nextHeading = lines.findIndex((line, index) => index >= start && /^## /.test(line));
  const notes = lines.slice(start, nextHeading === -1 ? undefined : nextHeading).join('\n').trim();
  assert.ok(notes, `Release notes for ${tag} must not be empty`);
  return `${notes}\n`;
}

if (require.main === module) {
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const npmTag = validateVersion(process.env.RELEASE_TAG, pkg.version);
    if (process.argv[2] === 'validate') {
      validateTagCommit(process.env.RELEASE_TAG);
      output('npm_tag', npmTag);
      console.log(`Validated ${process.env.RELEASE_TAG}; npm dist-tag: ${npmTag}`);
    } else if (process.argv[2] === 'registry') {
      const published = isPublished(pkg.name, pkg.version);
      output('published', published);
      console.log(
        published
          ? `${pkg.name}@${pkg.version} already exists; skipping npm publish`
          : `${pkg.name}@${pkg.version} is not published`,
      );
    } else if (process.argv[2] === 'notes') {
      const notes = extractReleaseNotes(fs.readFileSync('CHANGELOG.md', 'utf8'), process.env.RELEASE_TAG);
      fs.writeFileSync('release-notes.md', notes);
      console.log(`Extracted release notes for ${process.env.RELEASE_TAG}`);
    } else {
      throw new Error('Usage: node scripts/check-release.cjs validate|registry|notes');
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { validateVersion, validateTagCommit, isPublished, extractReleaseNotes };
