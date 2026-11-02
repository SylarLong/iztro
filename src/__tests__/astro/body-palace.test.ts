import { astro } from '../../index';
import { getSoulAndBody } from '../../astro';
import { Language } from '../../data/types';
import { setLanguage } from '../../i18n';

describe('中州派天地人盘安身宫', () => {
  beforeEach(() => {
    astro.resetConfig();
    setLanguage('zh-CN');
  });
  afterEach(() => {
    astro.resetConfig();
    setLanguage('zh-CN');
  });

  test('地盘、人盘只重定命宫，身宫仍按出生月和时辰计算', () => {
    const birth = { solarDate: '1979-8-21', timeIndex: 8, fixLeap: true };

    expect(getSoulAndBody(birth)).toMatchObject({ soulIndex: 10, bodyIndex: 2 });
    expect(getSoulAndBody({ ...birth, from: { heavenlyStem: '戊', earthlyBranch: '辰' } })).toMatchObject({
      soulIndex: 2,
      bodyIndex: 2,
    });
    expect(getSoulAndBody({ ...birth, from: { heavenlyStem: '丙', earthlyBranch: '寅' } })).toMatchObject({
      soulIndex: 0,
      bodyIndex: 2,
    });
  });

  test('天盘身宫在官禄时，地盘命身同宫，人盘身宫在福德', () => {
    const birth = {
      dateStr: '1979-8-21',
      timeIndex: 8,
      gender: '男',
      config: { algorithm: 'zhongzhou' },
    } as const;
    const heaven = astro.withOptions({ ...birth, astroType: 'heaven' });
    const earth = astro.withOptions({ ...birth, astroType: 'earth' });
    const human = astro.withOptions({ ...birth, astroType: 'human' });

    expect(heaven.palace('身宫')).toMatchObject({ name: '官禄', earthlyBranch: '辰' });
    expect(earth.palace('身宫')).toBe(earth.palace('命宫'));
    expect(human.palace('身宫')).toBe(human.palace('福德'));
    for (const chart of [heaven, earth, human]) {
      expect(chart.earthlyBranchOfBodyPalace).toBe('辰');
      expect(chart.palace('身宫')?.earthlyBranch).toBe('辰');
      expect(chart.toJSON().earthlyBranchOfBodyPalace).toBe('辰');
    }
  });

  test.each([
    { dateStr: '1979-8-21', fixLeap: true, dayDivide: 'forward' },
    { dateStr: '2023-4-6', fixLeap: true, dayDivide: 'forward' },
    { dateStr: '2023-4-6', fixLeap: false, dayDivide: 'forward' },
    { dateStr: '2023-4-6', fixLeap: true, dayDivide: 'current' },
    { dateStr: '2023-4-19', fixLeap: true, dayDivide: 'forward' },
  ] as const)('所有时辰在 $dateStr / fixLeap=$fixLeap / $dayDivide 下遵守同一安身宫诀', (options) => {
    const { dayDivide, ...birth } = options;
    for (let timeIndex = 0; timeIndex <= 12; timeIndex++) {
      const option = {
        ...birth,
        timeIndex,
        gender: '女',
        config: { algorithm: 'zhongzhou', dayDivide },
      } as const;
      const heaven = astro.withOptions(option);
      const expectedBody = heaven.palace('身宫')!;
      for (const astroType of ['earth', 'human'] as const) {
        const chart = astro.withOptions({ ...option, astroType });
        const body = chart.palace('身宫')!;
        expect(chart.palaces.filter((palace) => palace.isBodyPalace)).toHaveLength(1);
        expect(body.index).toBe(expectedBody.index);
        expect(chart.earthlyBranchOfBodyPalace).toBe(body.earthlyBranch);
        expect(body.earthlyBranch).toBe(expectedBody.earthlyBranch);
        expect(chart.star('天寿').palace()?.index).toBe(heaven.star('天寿').palace()?.index);
        expect(chart.earthlyBranchOfSoulPalace).toBe(
          heaven.palace(astroType === 'earth' ? '身宫' : '福德')?.earthlyBranch,
        );
      }
    }
  });

  test.each(['zh-CN', 'zh-TW', 'en-US', 'ja-JP', 'ko-KR', 'vi-VN'] as Language[])(
    '%s 盘的身宫查询和序列化在其他排盘及全局配置变化后保持一致',
    (language) => {
      for (const astroType of ['earth', 'human'] as const) {
        const chart = astro.withOptions({
          dateStr: '1979-8-21',
          timeIndex: 8,
          gender: '男',
          astroType,
          language,
          config: { algorithm: 'zhongzhou' },
        });
        const body = chart.palace('身宫')!;
        const before = chart.toJSON();
        const horoscope = chart.horoscope('2026-10-12', 3).toJSON();
        astro.config({ dayDivide: 'current', algorithm: 'default' });
        astro.withOptions({ dateStr: '2023-4-6', timeIndex: 12, gender: '女', language: 'en-US' });
        setLanguage('en-US');
        expect(body.index).toBe(2);
        expect(chart.palace('身宫')).toBe(body);
        expect(chart.earthlyBranchOfBodyPalace).toBe(body.earthlyBranch);
        expect(chart.toJSON()).toEqual(before);
        expect(chart.horoscope('2026-10-12', 3).toJSON()).toEqual(horoscope);
      }
    },
  );
});
