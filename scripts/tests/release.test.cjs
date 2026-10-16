const assert = require('node:assert/strict');
const { test } = require('node:test');
const { validateVersion, validateTagCommit, isPublished, extractReleaseNotes } = require('../check-release.cjs');

test('release notes support dated and historical headings and preserve categorized content', () => {
  const notes = '- 🛠️ 修复（fix）\n  - 修复查询\n\n### 兼容性\n保持兼容';
  for (const title of ['v2.6.3', 'v2.6.3（2026.10.16 发布）']) {
    const markdown = `# 日志\n## 未发布\n- 尚未发布\n\n## ${title}\n\n${notes}\n\n## v2.6.2\n- 历史`;
    assert.equal(extractReleaseNotes(markdown, 'v2.6.3'), `${notes}\n`);
    assert.equal(extractReleaseNotes(markdown.replace(/\n/g, '\r\n'), 'v2.6.3'), `${notes}\n`);
  }
  assert.equal(extractReleaseNotes('## v2.7.0-rc.1（2026.10.16 发布）\n- 预发布', 'v2.7.0-rc.1'), '- 预发布\n');
});

test('missing, ambiguous and empty changelog sections stop the release', () => {
  for (const markdown of [
    '## v2.6.30\n- another version',
    '## v2x6x3\n- invalid heading',
    '## v2.6.3\n\n## v2.6.2\n- older',
    '## v2.6.3\n- first\n## v2.6.3（2026.10.16 发布）\n- duplicate',
  ]) {
    assert.throws(() => extractReleaseNotes(markdown, 'v2.6.3'));
  }
});

test('exact matching release versions use latest; prereleases use next', () => {
  assert.equal(validateVersion('v2.6.3', '2.6.3'), 'latest');
  assert.equal(validateVersion('v2.7.0-rc.1', '2.7.0-rc.1'), 'next');
});

test('mismatched tags, version ranges and normalized versions stop the release', () => {
  assert.throws(() => validateVersion('v2.6.2', '2.6.3'), /must equal/);
  assert.throws(() => validateVersion('main', '2.6.3'), /must equal/);
  for (const version of ['2.6', '02.6.3', '^2.6.3', '2.6.3+build', '2.6.3-01', '2.6.3\n', undefined]) {
    assert.throws(() => validateVersion(`v${version}`, version));
  }
});

test('the checked-out commit must belong to an existing release tag', () => {
  const matching = () => ({ status: 0, stdout: 'abc123\n' });
  validateTagCommit('v2.6.3', matching);
  assert.throws(() => validateTagCommit('v2.6.3', () => ({ status: 1 })), /must exist/);
  assert.throws(
    () =>
      validateTagCommit('v2.6.3', (command, args) => ({
        status: 0,
        stdout: args.includes('HEAD') ? 'another-commit' : 'tag-commit',
      })),
    /does not match/,
  );
});

test('a published version is skipped and only an explicit E404 permits publishing', () => {
  assert.equal(
    isPublished('iztro', '2.6.3', (command, args) => {
      assert.equal(command, 'npm');
      assert.deepEqual(args, ['view', 'iztro@2.6.3', 'version', '--json', '--registry', 'https://registry.npmjs.org']);
      return { status: 0, stdout: '"2.6.3"' };
    }),
    true,
  );
  assert.equal(
    isPublished('iztro', '2.6.3', () => ({ status: 1, stdout: '{"error":{"code":"E404"}}' })),
    false,
  );
});

test('network, authorization, malformed responses and unexpected versions fail closed', () => {
  for (const code of ['E401', 'E403', 'E429', 'E500', 'ENOTFOUND', 'ETIMEDOUT']) {
    assert.throws(
      () => isPublished('iztro', '2.6.3', () => ({ status: 1, stdout: JSON.stringify({ error: { code } }) })),
      /publication stopped/,
    );
  }
  assert.throws(() => isPublished('iztro', '2.6.3', () => ({ error: new Error('timeout') })), /timeout/);
  assert.throws(() => isPublished('iztro', '2.6.3', () => ({ status: 1, stdout: 'not JSON' })), /invalid response/);
  assert.throws(() => isPublished('iztro', '2.6.3', () => ({ status: 0, stdout: '"2.6.2"' })), /unexpected version/);
});
