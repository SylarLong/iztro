import { astro, util } from '../../index';
import { Language } from '../../data/types';

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
      astro.setLanguage(language);
      astro.bySolar(birth.dateStr, 0, birth.gender, true, 'zh-CN');

      expect(astro.getLanguage()).toBe(language);
      expect(util.getMutagensByHeavenlyStem('丙')).toEqual(expected);
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

  test('全局语言不改变排盘和日期辅助方法的默认值，也不由 resetConfig 重置', () => {
    astro.setLanguage('en-US');
    const chart = astro.withOptions(birth);
    expect(chart.palaces[0].heavenlyStem).toBe('庚');
    expect(astro.byLunar('1981-2-20', 0, birth.gender).palaces[0].heavenlyStem).toBe('庚');
    expect(astro.getSignBySolarDate(birth.dateStr)).toBe('白羊座');
    expect(astro.getSignByLunarDate('1981-2-20')).toBe('白羊座');
    expect(astro.getZodiacBySolarDate(birth.dateStr)).toBe('鸡');
    astro.resetConfig();
    expect(astro.getLanguage()).toBe('en-US');

    astro.setLanguage('zh-CN');
    expect(chart.horoscope('2026-11-05', 0).yearly.mutagen).toEqual(['天同', '天机', '文昌', '廉贞']);
  });

  test('非法语言抛错且保留全局语言，异常退出的排盘也不泄漏语言', () => {
    astro.setLanguage('en-US');
    expect(() => astro.setLanguage('unknown' as Language)).toThrow('invalid language.');
    expect(() => astro.withOptions({ ...birth, dateStr: '2000-2-30', language: 'vi-VN' })).toThrow();
    expect(astro.getLanguage()).toBe('en-US');
    expect(util.getMutagensByHeavenlyStem('geng')).toEqual(['sun', 'warrior', 'moon', 'fortunate']);
  });
});
