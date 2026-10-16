import { astro } from '../../index';
import { Scope } from '../../data/types';
import { kot, t, withLanguage } from '../../i18n';

const birth = { dateStr: '2023-4-6', timeIndex: 12, gender: '男' as const };
const config = { algorithm: 'zhongzhou', dayDivide: 'current', ageDivide: 'birthday' } as const;

describe('宫位和星曜同名时的语言查询', () => {
  beforeEach(() => astro.resetConfig());
  afterEach(() => astro.resetConfig());

  test('韩语福德宫可以使用韩语、中文或英文宫名查询', () => {
    const chart = astro.withOptions({ ...birth, config, language: 'ko-KR' });
    const palace = chart.palaces.find((item) => item.name === '복덕')!;
    expect(palace.index).toBe(4);
    expect(chart.palace('복덕')).toBe(palace);
    expect(chart.palace('福德')).toBe(palace);
    expect(chart.palace('spirit')).toBe(palace);
    expect(chart.surroundedPalaces('福德').target).toBe(palace);
    expect(chart.flankingPalaces('spirit').previous.index).toBe(3);
  });

  test.each(['origin', 'decadal', 'yearly', 'monthly', 'daily', 'hourly'] as Scope[])(
    '韩语运限的 %s 范围支持混合语言福德宫名',
    (scope) => {
      const chart = astro.withOptions({ ...birth, config, language: 'ko-KR' });
      const horoscope = chart.horoscope('2026-10-12', 3);
      const index = scope === 'origin' ? 4 : horoscope[scope as Exclude<Scope, 'origin'>].palaceNames.indexOf('복덕');
      expect(index).toBeGreaterThanOrEqual(0);
      for (const name of ['복덕', '福德', 'spirit'] as const) {
        expect(horoscope.palace(name, scope)).toBe(chart.palaces[index]);
        expect(horoscope.surroundPalaces(name, scope)?.target).toBe(chart.palaces[index]);
      }
    },
  );

  test('韩语人盘可成功生成，宫位、大限、小限和十二长生与中文人盘一致', () => {
    const chinese = astro.withOptions({ ...birth, config, astroType: 'human', language: 'zh-CN' });
    const korean = astro.withOptions({ ...birth, config, astroType: 'human', language: 'ko-KR' });
    const summarize = (chart: typeof chinese) => ({
      fiveElements: kot(chart.fiveElementsClass),
      soulBranch: kot(chart.earthlyBranchOfSoulPalace, 'Earthly'),
      palaces: chart.palaces.map((palace) => ({
        index: palace.index,
        name: kot(palace.name, 'Palace'),
        isBodyPalace: palace.isBodyPalace,
        decadalRange: palace.decadal.range,
        ages: palace.ages,
      })),
    });
    expect(summarize(korean)).toEqual(summarize(chinese));
    expect(korean.palaces.map((palace) => palace.changsheng12)).toEqual(
      withLanguage('ko-KR', () => chinese.palaces.map((palace) => t(kot(palace.changsheng12)))),
    );
    expect(korean.palace('명궁')?.index).toBe(chinese.palace('命宫')?.index);
  });

  test('天德星与福德宫使用各自正确的韩语名称', () => {
    const chart = astro.withOptions({ ...birth, config, language: 'ko-KR' });
    expect(chart.star('天德').name).toBe('천덕');
    expect(chart.star('천덕').name).toBe('천덕');
    expect(kot('천덕')).toBe('tiande');
    expect(kot('복덕')).toBe('spiritPalace');
    expect(chart.palace('福德')?.name).toBe('복덕');
  });

  test('日语新字形宫名支持查询和反查', () => {
    const chart = astro.withOptions({ ...birth, config, language: 'ja-JP' });
    for (const [name, key] of [
      ['奴僕', 'friendsPalace'],
      ['官禄', 'careerPalace'],
      ['福徳', 'spiritPalace'],
    ] as const) {
      expect(kot(name, 'Palace')).toBe(key);
      expect(chart.palace(name)?.name).toBe(name);
    }
  });
});
