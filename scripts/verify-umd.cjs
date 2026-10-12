const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const zlib = require('node:zlib');

const root = path.resolve(__dirname, '..');
const { version } = require('../package.json');
const versionedFile = path.join(root, 'dist', `iztro-v${version}.min.js`);
const aliasFile = path.join(root, 'dist', 'iztro.min.js');
const normalize = (value) => JSON.parse(JSON.stringify(value));

// 验证实际 UMD 入口，避免只验证 TypeScript 源码而遗漏压缩或模块加载问题。
function loadBundle(file, mode) {
  const sandbox = { console, setTimeout, clearTimeout };
  sandbox.self = sandbox;
  let amdExport;
  if (mode === 'commonjs') {
    sandbox.module = { exports: {} };
    sandbox.exports = sandbox.module.exports;
  } else if (mode === 'amd') {
    sandbox.define = (name, dependencies, factory) => {
      assert.equal(name, 'iztro');
      assert.deepEqual(normalize(dependencies), []);
      amdExport = factory();
    };
    sandbox.define.amd = {};
  }
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
  return mode === 'commonjs' ? sandbox.module.exports : mode === 'amd' ? amdExport : sandbox.iztro;
}

function checkModuleGraph(file) {
  const map = JSON.parse(fs.readFileSync(`${file}.map`, 'utf8'));
  const lunarModules = map.sources.filter((source) => /\/lunar-typescript\/dist\/index\.(cjs|mjs)$/.test(source));
  assert.equal(lunarModules.length, 1, `Expected one lunar module, found: ${lunarModules.join(', ')}`);
}

function chartResult(astro, input) {
  const chart = astro.withOptions(input);
  return normalize({
    chart: chart.toJSON(),
    horoscope: chart.horoscope('2026-10-12 23:30', 12).toJSON(),
  });
}

function listResult(astro) {
  const chart = astro.bySolar('2000-8-16', 3, '男');
  return normalize({
    decadal: chart.decadalList(),
    yearly: chart.yearlyList(0),
    monthly: [2023, 2025, 2033].map((year) => ({
      adjusted: chart.monthlyList(year),
      unadjusted: chart.monthlyList(year, false),
    })),
  });
}

function verify() {
  const directLunar = require.resolve('lunar-typescript');
  const indirectLunar = require.resolve('lunar-typescript', { paths: [path.dirname(require.resolve('lunar-lite'))] });
  assert.equal(directLunar, indirectLunar, 'Installed lunar dependencies must resolve to one module');
  for (const file of [versionedFile, aliasFile]) checkModuleGraph(file);
  const stripMap = (file) => fs.readFileSync(file, 'utf8').replace(/\/\/# sourceMappingURL=.*\s*$/, '');
  assert.equal(stripMap(versionedFile), stripMap(aliasFile), 'Versioned and compatibility bundles differ');

  // 可指定优化前的产物进行前后对比；默认与本次编译的 CommonJS 库对比。
  const reference = process.argv[2] ? loadBundle(path.resolve(process.argv[2]), 'commonjs') : require('../lib');
  reference.astro.resetConfig();
  const inputs = [];
  for (const dateStr of ['2000-8-16', '2000-2-4', '2023-1-22', '2023-4-5', '2023-4-6', '2024-2-29']) {
    for (let timeIndex = 0; timeIndex < 13; timeIndex++) {
      for (const gender of ['男', '女']) inputs.push({ dateStr, timeIndex, gender });
    }
  }
  for (const language of ['zh-CN', 'en-US', 'zh-TW', 'ja-JP', 'ko-KR', 'vi-VN']) {
    for (const astroType of ['heaven', 'earth', 'human']) {
      inputs.push({
        dateStr: '2023-4-6',
        timeIndex: 12,
        gender: '男',
        language,
        astroType,
        config: { algorithm: 'zhongzhou', dayDivide: 'current', ageDivide: 'birthday' },
      });
    }
  }
  const expected = inputs.map((input) => chartResult(reference.astro, input));
  const expectedLists = listResult(reference.astro);
  for (const mode of ['commonjs', 'amd', 'global']) {
    const bundle = loadBundle(versionedFile, mode);
    for (const namespace of ['astro', 'data', 'star', 'util']) {
      assert.deepEqual(
        Object.keys(bundle[namespace]).sort(),
        Object.keys(reference[namespace]).sort(),
        `${mode}: ${namespace} exports changed`,
      );
    }
    inputs.forEach((input, index) => {
      assert.deepEqual(chartResult(bundle.astro, input), expected[index], `${mode}: ${JSON.stringify(input)}`);
    });
    assert.deepEqual(listResult(bundle.astro), expectedLists, `${mode}: horoscope lists changed`);
    const original = bundle.astro.bySolar('2000-8-16', 3, '男');
    const before = normalize(original.horoscope('2026-3-1', 3));
    bundle.astro.withOptions({
      dateStr: '2000-8-16',
      timeIndex: 3,
      gender: '男',
      language: 'en-US',
      config: { ageDivide: 'birthday' },
    });
    bundle.astro.config({ ageDivide: 'birthday' });
    assert.deepEqual(normalize(original.horoscope('2026-3-1', 3)), before, `${mode}: chart context leaked`);
    assert.throws(() => bundle.astro.bySolar('2000-2-30', 3, '男'), /invalid solar date/);
    assert.throws(() => bundle.astro.bySolar('2000-8-16', -1, '男'), /invalid timeIndex/);
    const korean = bundle.astro.withOptions({ ...inputs[inputs.length - 1], language: 'ko-KR' });
    assert.equal(korean.palace('福德').index, korean.palace('복덕').index);
    console.log(
      `${mode}: ${inputs.length} chart/horoscope comparisons, exports, lists, isolation and validation passed`,
    );
  }
  const bytes = fs.readFileSync(versionedFile);
  console.log(
    `Single lunar module; JS ${(bytes.length / 1024).toFixed(1)} KiB, gzip ${(
      zlib.gzipSync(bytes).length / 1024
    ).toFixed(1)} KiB`,
  );
}

try {
  verify();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
