import { astro } from '../../index';

// 单独运行于新的模块环境，避免其他测试修改全局配置或语言。
describe('bySolar / withOptions 默认参数一致性', () => {
  beforeEach(() => astro.resetConfig());
  const dates = [
    '1999-12-31',
    '2000-1-1',
    '2000-2-4', // 立春
    '2000-2-5', // 春节
    '2000-8-16',
    '2023-1-21', // 春节前一天
    '2023-1-22', // 春节
    '2023-3-22', // 闰二月初一
    '2023-4-5', // 闰二月十五
    '2023-4-6', // 闰二月十六
    '2023-4-19', // 闰二月末
    '2024-2-29', // 公历闰日
  ];
  const cases = dates.flatMap((dateStr) =>
    Array.from({ length: 13 }, (_, timeIndex) =>
      (['男', '女'] as const).map((gender) => ({ dateStr, timeIndex, gender })),
    ).flat(),
  );

  test('初始全局配置为默认值', () => {
    expect(astro.getConfig()).toEqual({
      mutagens: {},
      brightness: {},
      yearDivide: 'normal',
      horoscopeDivide: 'normal',
      ageDivide: 'normal',
      dayDivide: 'forward',
      algorithm: 'default',
    });
  });

  test.each(cases)('$dateStr 时辰 $timeIndex $gender：完整星盘和运限一致', (params) => {
    const { dateStr, timeIndex, gender } = params;
    const direct = astro.bySolar(dateStr, timeIndex, gender);
    const wrapped = astro.withOptions({ type: 'solar', ...params });
    const explicitDefaults = astro.withOptions({
      type: 'solar',
      ...params,
      fixLeap: true,
      language: 'zh-CN',
      astroType: 'heaven',
    });

    expect(wrapped.toJSON()).toEqual(direct.toJSON());
    expect(explicitDefaults.toJSON()).toEqual(direct.toJSON());
    expect(wrapped.horoscope('2026-10-12', 2).toJSON()).toEqual(direct.horoscope('2026-10-12', 2).toJSON());
  });

  test('运行时省略 type 同样默认为 solar', () => {
    const params = { dateStr: '2023-4-6', timeIndex: 12, gender: '女' as const };
    const direct = astro.bySolar(params.dateStr, params.timeIndex, params.gender);
    expect(astro.withOptions(params).toJSON()).toEqual(direct.toJSON());
  });
});
