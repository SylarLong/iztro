import { astro, util } from '../../index';
import { Config, Language } from '../../data/types';

const birth = { dateStr: '1981-03-25', timeIndex: 0, gender: 'male' as const };

describe('公开的全局语言设置', () => {
  beforeEach(() => {
    astro.resetConfig();
    astro.setLanguage('zh-CN');
  });

  afterEach(() => {
    astro.resetConfig();
    astro.setLanguage('zh-CN');
  });

  test.each(['zh-CN', 'zh-TW', 'en-US', 'ja-JP', 'ko-KR', 'vi-VN'] as Language[])(
    '%s 全局语言作用于独立四化查询，单次排盘不会覆盖它',
    (language) => {
      const chart = astro.withOptions({ ...birth, language });
      const expected = chart.horoscope('2026-11-05', 0).yearly.mutagen;
      astro.config({ language });
      astro.bySolar(birth.dateStr, 0, birth.gender, true, 'zh-CN');

      expect(astro.getLanguage()).toBe(language);
      expect(astro.getConfig().language).toBe(language);
      expect(util.getMutagensByHeavenlyStem('丙')).toEqual(expected);
      expect(astro.withOptions(birth).toJSON()).toEqual(chart.toJSON());
    },
  );

  test('复现英文星盘后的独立查询，切换语言不改变已有星盘和后续运限', () => {
    const chart = astro.withOptions({ ...birth, language: 'en-US' });
    const before = chart.horoscope('2026-11-05', 0).toJSON();
    astro.setLanguage('en-US');
    expect(util.getMutagensByHeavenlyStem(chart.palaces[0].heavenlyStem)).toEqual([
      'sun',
      'warrior',
      'moon',
      'fortunate',
    ]);

    astro.setLanguage('zh-CN');
    expect(util.getMutagensByHeavenlyStem('geng')).toEqual(['太阳', '武曲', '太阴', '天同']);
    expect(chart.horoscope('2026-11-05', 0).toJSON()).toEqual(before);
    chart.use(() => expect(astro.getLanguage()).toBe('en-US'));
    expect(astro.getLanguage()).toBe('zh-CN');
  });

  test('全局语言作为排盘和日期辅助方法的默认值，resetConfig 恢复简体中文', () => {
    astro.config({ language: 'en-US' });
    const chart = astro.withOptions(birth);
    expect(chart.palaces[0].heavenlyStem).toBe('geng');
    expect(astro.bySolar(birth.dateStr, 0, birth.gender).toJSON()).toEqual(chart.toJSON());
    expect(astro.byLunar('1981-2-20', 0, birth.gender).palaces[0].heavenlyStem).toBe('geng');
    expect(astro.getSignBySolarDate(birth.dateStr)).toBe('aries');
    expect(astro.getSignByLunarDate('1981-2-20')).toBe('aries');
    expect(astro.getZodiacBySolarDate(birth.dateStr)).toBe('rooster');
    expect(astro.getMajorStarBySolarDate(birth.dateStr, 0)).toBe(
      astro.getMajorStarByLunarDate('1981-2-20', 0, false, true, 'en-US'),
    );
    astro.resetConfig();
    expect(astro.getLanguage()).toBe('zh-CN');
    expect(astro.getConfig().language).toBe('zh-CN');
    expect(astro.bySolar(birth.dateStr, 0, birth.gender).palaces[0].heavenlyStem).toBe('庚');
    expect(util.getMutagensByHeavenlyStem('geng')).toEqual(['太阳', '武曲', '太阴', '天同']);

    expect(chart.horoscope('2026-11-05', 0).yearly.mutagen).toEqual(['fortunate', 'advisor', 'scholar', 'judge']);
  });

  test('单次语言参数优先于单次配置，单次配置优先于全局默认且不泄漏', () => {
    astro.config({ language: 'en-US' });
    const local = astro.withOptions({ ...birth, config: { language: 'zh-TW' } });
    expect(local.palaces[0].heavenlyStem).toBe('庚');
    expect(local.horoscope('2026-11-05', 0).yearly.mutagen).toEqual(['天同', '天機', '文昌', '廉貞']);
    const explicit = astro.withOptions({ ...birth, language: 'en-US', config: { language: 'zh-TW' } });
    expect(explicit.palaces[0].heavenlyStem).toBe('geng');
    expect(astro.getConfig().language).toBe('en-US');
    expect(astro.getLanguage()).toBe('en-US');
    expect(astro.getSignBySolarDate(birth.dateStr, 'zh-CN')).toBe('白羊座');

    local.use(() => {
      expect(astro.getConfig().language).toBe('zh-TW');
      expect(astro.getLanguage()).toBe('zh-TW');
      expect(util.getMutagensByHeavenlyStem('yi')).toEqual(['天機', '天梁', '紫微', '太陰']);
      astro.withOptions({ ...birth, language: 'ko-KR' });
      expect(astro.getLanguage()).toBe('zh-TW');
      astro.config({ ageDivide: 'birthday' });
      expect(astro.getConfig().language).toBe('zh-TW');
    });
    expect(astro.getLanguage()).toBe('en-US');
    expect(astro.getConfig().language).toBe('en-US');
  });

  test.each(['heaven', 'earth', 'human'] as const)('%s 盘保存单次配置的语言且不受全局切换影响', (astroType) => {
    const chart = astro.withOptions({ ...birth, astroType, config: { language: 'en-US' } });
    const explicit = astro.withOptions({ ...birth, astroType, language: 'en-US' });
    expect(chart.toJSON()).toEqual(explicit.toJSON());
    const before = chart.horoscope('2026-11-05', 0).toJSON();
    astro.config({ language: 'vi-VN' });
    expect(chart.horoscope('2026-11-05', 0).toJSON()).toEqual(before);
    expect(astro.getConfig().language).toBe('vi-VN');
  });

  test('setLanguage 与 config 共用全局语言，省略 language 的配置更新保留原值', () => {
    astro.setLanguage('en-US');
    expect(astro.getConfig().language).toBe('en-US');
    astro.config({ yearDivide: 'exact' });
    expect(astro.getConfig().language).toBe('en-US');
    const copy = astro.getConfig();
    copy.language = 'vi-VN';
    expect(astro.getLanguage()).toBe('en-US');
    astro.config({ language: 'zh-TW' });
    expect(astro.getLanguage()).toBe('zh-TW');
    expect(astro.getConfig().yearDivide).toBe('exact');
  });

  test('非法语言抛错且保留全局语言，异常退出的排盘也不泄漏语言', () => {
    astro.setLanguage('en-US');
    expect(() => astro.setLanguage('unknown' as Language)).toThrow('invalid language.');
    const before = astro.getConfig();
    expect(() => astro.config({ language: 'vi-VN', yearDivide: 'unknown' } as unknown as Config)).toThrow(
      'invalid yearDivide.',
    );
    expect(astro.getConfig()).toEqual(before);
    expect(() => astro.withOptions({ ...birth, dateStr: '2000-2-30', language: 'vi-VN' })).toThrow();
    expect(astro.getLanguage()).toBe('en-US');
    expect(util.getMutagensByHeavenlyStem('geng')).toEqual(['sun', 'warrior', 'moon', 'fortunate']);
  });
});
