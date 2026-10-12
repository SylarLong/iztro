import { astro } from '../../index';
import FunctionalAstrolabe from '../../astro/FunctionalAstrolabe';
import { Config, Language, Option } from '../../data/types';
import { GenderName, getLanguage, setLanguage, t } from '../../i18n';
import { validateDate } from '../../utils/validation';

const json = (value: unknown): unknown => JSON.parse(JSON.stringify(value));

const birth = { dateStr: '2000-8-16', timeIndex: 3, gender: '男' as const };

describe('排盘上下文和参数校验', () => {
  beforeEach(() => {
    astro.resetConfig();
    setLanguage('zh-CN');
  });
  afterEach(() => {
    astro.resetConfig();
    setLanguage('zh-CN');
  });

  test('单次配置不改变全局默认值或已有星盘', () => {
    const original = astro.withOptions(birth);
    const before = original.horoscope('2026-3-1', 3).toJSON();
    const custom = astro.withOptions({ ...birth, config: { ageDivide: 'birthday' } });

    expect(before.age.nominalAge).toBe(27);
    expect(custom.horoscope('2026-3-1', 3).age.nominalAge).toBe(26);
    expect(astro.getConfig().ageDivide).toBe('normal');
    expect(original.horoscope('2026-3-1', 3).toJSON()).toEqual(before);
    expect(astro.withOptions(birth).toJSON()).toEqual(original.toJSON());

    astro.config({ ageDivide: 'birthday', dayDivide: 'current', horoscopeDivide: 'exact' });
    expect(original.horoscope('2026-3-1', 3).toJSON()).toEqual(before);
    expect(astro.withOptions(birth).horoscope('2026-3-1', 3).age.nominalAge).toBe(26);
    astro.resetConfig();
    expect(custom.horoscope('2026-3-1', 3).age.nominalAge).toBe(26);
  });

  test('大限、流年、流月及四化分析保留自己的配置', () => {
    const original = astro.withOptions(birth);
    const decadals = json(original.decadalList());
    const yearlies = json(original.yearlyList(0));
    const monthlies = json(original.monthlyList(2026));
    const palace = original.palace('命宫')!;
    const flying = palace.mutagedPlaces().map((item) => item?.index);
    astro.config({ mutagens: { 辛: ['紫微', '天机', '太阳', '武曲'] }, horoscopeDivide: 'exact' });
    expect(json(original.decadalList())).toEqual(decadals);
    expect(json(original.yearlyList(0))).toEqual(yearlies);
    expect(json(original.monthlyList(2026))).toEqual(monthlies);
    expect(palace.mutagedPlaces().map((item) => item?.index)).toEqual(flying);
  });

  test('交错使用六种语言，星盘、运限及后续默认调用保持各自语言', () => {
    const chinese = astro.withOptions(birth);
    const before = chinese.horoscope('2026-10-12', 3).toJSON();
    const lists = json(chinese.decadalList());
    for (const language of ['en-US', 'zh-TW', 'ja-JP', 'ko-KR', 'vi-VN'] as Language[]) {
      const localized = astro.withOptions({ ...birth, language });
      const ownHoroscope = localized.horoscope('2026-10-12', 3).toJSON();
      setLanguage('zh-CN');
      expect(localized.horoscope('2026-10-12', 3).toJSON()).toEqual(ownHoroscope);
      expect(chinese.horoscope('2026-10-12', 3).toJSON()).toEqual(before);
      expect(json(chinese.decadalList())).toEqual(lists);
    }
    setLanguage('en-US');
    expect(astro.withOptions(birth).toJSON()).toEqual(chinese.toJSON());
    expect(chinese.horoscope('2026-10-12', 3).toJSON()).toEqual(before);
    expect(astro.getSignBySolarDate(birth.dateStr)).toBe('狮子座');
    expect(getLanguage()).toBe('en-US');
  });

  test('getConfig 返回深拷贝，resetConfig 清除自定义表且不修改旧盘', () => {
    const stars = ['紫微', '天机', '太阳', '武曲'] as const;
    astro.config({ mutagens: { 辛: [...stars] }, brightness: { 紫微: Array(12).fill('庙') } });
    const chart = astro.withOptions(birth);
    const expected = json(chart.decadalList());
    const snapshot = astro.getConfig();
    snapshot.mutagens.xinHeavenly!.pop();
    snapshot.brightness.ziweiMaj![0] = 'xian';
    snapshot.dayDivide = 'current';
    expect(astro.getConfig().mutagens.xinHeavenly).toHaveLength(4);
    expect(astro.getConfig().brightness.ziweiMaj![0]).toBe('miao');
    expect(astro.getConfig().dayDivide).toBe('forward');
    astro.resetConfig();
    expect(astro.getConfig().mutagens).toEqual({});
    expect(astro.getConfig().brightness).toEqual({});
    expect(json(chart.decadalList())).toEqual(expected);
  });

  test('插件的嵌套排盘和异常退出不会泄漏状态', () => {
    const chart = astro.withOptions(birth) as FunctionalAstrolabe & { readName: () => string; fail: () => void };
    chart.use(function () {
      chart.readName = () => {
        astro.withOptions({ ...birth, language: 'en-US', config: { algorithm: 'zhongzhou' } });
        return t<string>('yearly');
      };
      chart.fail = () => {
        throw new Error('plugin failed');
      };
    });
    setLanguage('en-US');
    expect(chart.readName()).toBe('流年');
    expect(getLanguage()).toBe('en-US');
    expect(() => chart.fail()).toThrow('plugin failed');
    expect(getLanguage()).toBe('en-US');
    expect(astro.getConfig().algorithm).toBe('default');
    expect(() =>
      astro.withOptions({ ...birth, dateStr: '2000-2-30', language: 'vi-VN', config: { ageDivide: 'birthday' } }),
    ).toThrow();
    expect(astro.getConfig().ageDivide).toBe('normal');
    expect(getLanguage()).toBe('en-US');
  });

  test.each([-1, 13, 1.5, NaN, Infinity])('拒绝非法时辰 %s，包含运限和辅助入口', (index) => {
    expect(() => astro.bySolar(birth.dateStr, index, birth.gender)).toThrow('invalid timeIndex');
    expect(() => astro.byLunar('2000-7-17', index, birth.gender)).toThrow('invalid timeIndex');
    expect(() => astro.withOptions({ ...birth, timeIndex: index })).toThrow('invalid timeIndex');
    expect(() => astro.getMajorStarBySolarDate(birth.dateStr, index)).toThrow('invalid timeIndex');
    expect(() => astro.withOptions(birth).horoscope('2026-10-12', index)).toThrow('invalid timeIndex');
  });

  test.each([
    '2000-2-30',
    '1900-2-29',
    '2000-13-1',
    '2000-0-1',
    '2000-1-0',
    '0000-1-1',
    '10000-1-1',
    'garbage',
    '2000-8-16 24:00',
  ])('拒绝非法阳历 %s', (date) => {
    expect(() => astro.bySolar(date, 3, '男')).toThrow();
    expect(() => astro.getSignBySolarDate(date)).toThrow();
    expect(() => astro.getZodiacBySolarDate(date)).toThrow();
    expect(() => astro.withOptions(birth).horoscope(date)).toThrow();
  });

  test('农历按实际月份天数校验，保留非闰月时忽略闰月标记的兼容行为', () => {
    expect(() => astro.byLunar('2023-2-30', 3, '男', true)).toThrow('invalid lunar date');
    expect(() => astro.getSignByLunarDate('2023-2-30', true)).toThrow('invalid lunar date');
    expect(() => astro.getMajorStarByLunarDate('2023-2-30', 3, true)).toThrow('invalid lunar date');
    expect(astro.byLunar('2000-7-17', 3, '男', true).toJSON()).toEqual(astro.byLunar('2000-7-17', 3, '男').toJSON());
    expect(() => astro.bySolar('2024-2-29', 3, 'male')).not.toThrow();
    expect(() => validateDate(new Date(NaN))).toThrow('invalid date');
    expect(() => validateDate('1-1-1')).not.toThrow();
    expect(() => validateDate('9999-12-31')).not.toThrow();
  });

  test('拒绝未知性别、语言、日期类型和星盘类型', () => {
    expect(() => astro.bySolar(birth.dateStr, 3, 'unknown' as GenderName)).toThrow('invalid gender');
    expect(() => astro.bySolar(birth.dateStr, 3, '男', true, 'unknown')).toThrow('invalid language');
    expect(() => astro.withOptions({ ...birth, type: 'unknown' } as unknown as Option)).toThrow('invalid date type');
    expect(() => astro.withOptions({ ...birth, astroType: 'unknown' } as unknown as Option)).toThrow(
      'invalid astroType',
    );
  });

  test.each(['yearDivide', 'horoscopeDivide', 'ageDivide', 'dayDivide', 'algorithm'] as const)(
    '非法 %s 配置抛出错误且不修改全局配置',
    (key) => {
      const before = astro.getConfig();
      const invalid = { yearDivide: 'exact', [key]: 'unknown' } as unknown as Config;
      expect(() => astro.config(invalid)).toThrow(`invalid ${key}.`);
      expect(astro.getConfig()).toEqual(before);
      expect(() => astro.withOptions({ ...birth, config: invalid })).toThrow(`invalid ${key}.`);
      expect(astro.getConfig()).toEqual(before);
    },
  );

  test('传入的四化、亮度数组与全局配置及单次配置互相独立', () => {
    const options: Config = {
      mutagens: { 辛: ['紫微', '天机', '太阳', '武曲'] },
      brightness: { 紫微: Array(12).fill('庙') },
    };
    astro.config(options);
    const local = astro.withOptions({ ...birth, config: options });
    const before = json(local.decadalList());
    options.mutagens!.辛!.splice(0);
    options.brightness!.紫微!.fill('陷');
    expect(astro.getConfig().mutagens.xinHeavenly).toHaveLength(4);
    expect(astro.getConfig().brightness.ziweiMaj).toEqual(Array(12).fill('miao'));
    astro.resetConfig();
    expect(local.star('紫微').brightness).toBe('庙');
    expect(json(local.decadalList())).toEqual(before);
  });

  test.each([0, 10000, NaN, Infinity])('流月列表拒绝不支持的年份 %s', (year) => {
    expect(() => astro.withOptions(birth).monthlyList(year)).toThrow('invalid year.');
  });

  test('默认运限日期来自调用时钟，Date 和字符串查询结果一致', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 9, 12, 5, 30, 15));
    try {
      const chart = astro.withOptions(birth);
      const explicit = chart.horoscope('2026-10-12 5:30:15').toJSON();
      expect(chart.horoscope().toJSON()).toEqual(explicit);
      expect(chart.horoscope(new Date()).toJSON()).toEqual(explicit);
    } finally {
      jest.useRealTimers();
    }
  });

  test('找不到星曜时明确报错，兼容旧的阳历和农历入口', () => {
    const direct = astro.withOptions(birth);
    expect(() => direct.star('unknown' as Parameters<typeof direct.star>[0])).toThrow('invalid star name.');
    expect(astro.astrolabeBySolarDate(birth.dateStr, 3, '男').toJSON()).toEqual(direct.toJSON());
    expect(astro.astrolabeByLunarDate('2000-7-17', 3, '男').toJSON()).toEqual(direct.toJSON());
  });

  test.each(['earth', 'human'] as const)('%s 盘遵守晚子时归入当日的配置并保留上下文', (astroType) => {
    const options = { ...birth, astroType, config: { algorithm: 'zhongzhou', dayDivide: 'current' } } as const;
    const late = astro.withOptions({ ...options, timeIndex: 12 });
    const early = astro.withOptions({ ...options, timeIndex: 0 });
    expect(late.fiveElementsClass).toBe(early.fiveElementsClass);
    expect(late.palaces.map((palace) => palace.toJSON())).toEqual(early.palaces.map((palace) => palace.toJSON()));
    const before = late.horoscope('2026-10-12 23:30', 12).toJSON();
    astro.config({ algorithm: 'default', dayDivide: 'forward' });
    expect(late.horoscope('2026-10-12 23:30', 12).toJSON()).toEqual(before);
  });
});
