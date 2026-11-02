import { lunar2solar } from 'lunar-lite';
import { astro, star, util } from '../../index';
import FunctionalAstrolabe from '../../astro/FunctionalAstrolabe';
import { Language } from '../../data/types';
import { setLanguage } from '../../i18n';

const json = (value: unknown): unknown => JSON.parse(JSON.stringify(value));

// 保留实际输入的公历生日、时段和星座，只比较按换日规则计算的盘面。
const chartData = (chart: FunctionalAstrolabe) => {
  const { solarDate, time, timeRange, sign, ...data } = chart.toJSON();
  void [solarDate, time, timeRange, sign];
  return data;
};

const horoscopeData = (chart: FunctionalAstrolabe, date: string | Date, timeIndex?: number) => {
  const { solarDate, ...data } = chart.horoscope(date, timeIndex).toJSON();
  void solarDate;
  return data;
};

describe('晚子时完整换日（#314）', () => {
  beforeEach(() => {
    astro.resetConfig();
    setLanguage('zh-CN');
  });
  afterEach(() => {
    astro.resetConfig();
    setLanguage('zh-CN');
  });

  test('issue 公历示例：六月廿九晚子时按七月初一排盘', () => {
    const late = astro.bySolar('1996-8-13', 12, 'female');
    const early = astro.bySolar('1996-8-14', 0, 'female');
    expect(late).toMatchObject({
      solarDate: '1996-8-13',
      time: '晚子时',
      timeRange: '23:00~00:00',
      lunarDate: '一九九六年七月初一',
      chineseDate: '丙子 丙申 癸未 壬子',
      earthlyBranchOfSoulPalace: '申',
      earthlyBranchOfBodyPalace: '申',
      fiveElementsClass: '火六局',
    });
    expect(late.star('紫微').palace()?.earthlyBranch).toBe('酉');
    expect(chartData(late)).toEqual(chartData(early));
  });

  test('issue 农历示例及旧入口：十月三十晚子时按十一月初一排盘', () => {
    const early = astro.byLunar('1987-11-1', 0, 'female');
    for (const late of [
      astro.byLunar('1987-10-30', 12, 'female'),
      astro.astrolabeByLunarDate('1987-10-30', 12, 'female'),
      astro.astrolabeBySolarDate(lunar2solar('1987-10-30').toString(), 12, 'female'),
    ]) {
      expect(late.earthlyBranchOfSoulPalace).toBe('子');
      expect(late.fiveElementsClass).toBe('木三局');
      expect(late.star('紫微').palace()?.earthlyBranch).toBe('辰');
      expect(chartData(late)).toEqual(chartData(early));
    }
  });

  test.each([
    ['月中', '2000-8-16', '2000-8-17'],
    ['农历小月末', '1996-8-13', '1996-8-14'],
    ['农历大月末', '1987-12-20', '1987-12-21'],
    ['农历年末', '2020-1-24', '2020-1-25'],
    ['公历年末', '2023-12-31', '2024-1-1'],
    ['进入闰月', '2023-3-21', '2023-3-22'],
    ['闰月十五', '2023-4-5', '2023-4-6'],
    ['闰月月末', '2023-4-19', '2023-4-20'],
    ['历法切换', '1582-10-4', '1582-10-15'],
  ])('%s：两种安星法、天地人盘及闰月选项均等同次日早子时', (_, dateStr, nextDate) => {
    for (const algorithm of ['default', 'zhongzhou'] as const) {
      for (const astroType of ['heaven', 'earth', 'human'] as const) {
        for (const fixLeap of [false, true]) {
          const options = { gender: '女', fixLeap, astroType, config: { algorithm } } as const;
          const late = astro.withOptions({ ...options, dateStr, timeIndex: 12 });
          const early = astro.withOptions({ ...options, dateStr: nextDate, timeIndex: 0 });
          expect(chartData(late)).toEqual(chartData(early));
        }
      }
    }
  });

  test.each(['forward', 'current'] as const)('%s 配置下，辅助查询和底层安星入口与整盘保持一致', (dayDivide) => {
    astro.config({ dayDivide });
    const solarDate = '2020-1-24';
    const earlyDate = dayDivide === 'forward' ? '2020-1-25' : solarDate;
    const late = { solarDate, timeIndex: 12, fixLeap: true, gender: '女' } as const;
    const early = { ...late, solarDate: earlyDate, timeIndex: 0 };
    expect(astro.getSoulAndBody(late)).toEqual(astro.getSoulAndBody(early));
    expect(astro.getHoroscope(late)).toEqual(astro.getHoroscope(early));
    expect(star.getStartIndex(late)).toEqual(star.getStartIndex(early));
    expect(json(star.getMajorStar(late))).toEqual(json(star.getMajorStar(early)));
    expect(json(star.getAdjectiveStar(late))).toEqual(json(star.getAdjectiveStar(early)));
    expect(star.getchangsheng12(late)).toEqual(star.getchangsheng12(early));
    expect(json(star.getMinorStar(solarDate, 12, true))).toEqual(json(star.getMinorStar(earlyDate, 0, true)));
    expect(star.getDailyStarIndex(solarDate, 12, true)).toEqual(star.getDailyStarIndex(earlyDate, 0, true));
    expect(star.getYearlyStarIndex(late)).toEqual(star.getYearlyStarIndex(early));
    expect(util.fixLunarMonthIndex(solarDate, 12, true)).toBe(util.fixLunarMonthIndex(earlyDate, 0, true));
    expect(astro.getMajorStarBySolarDate(solarDate, 12)).toBe(astro.getMajorStarBySolarDate(earlyDate, 0));
    expect(astro.getMajorStarByLunarDate('2019-12-30', 12)).toBe(
      astro.getMajorStarByLunarDate(dayDivide === 'forward' ? '2020-1-1' : '2019-12-30', 0),
    );
  });

  test('current 保持当日农历日期和整盘，forward 不重复进日', () => {
    for (const dayDivide of ['current', 'forward'] as const) {
      astro.config({ dayDivide });
      const late = astro.byLunar('2023-2-15', 12, '女', true);
      const early = astro.byLunar(dayDivide === 'current' ? '2023-2-15' : '2023-2-16', 0, '女', true);
      expect(chartData(late)).toEqual(chartData(early));
      expect(late.rawDates.lunarDate.lunarDay).toBe(dayDivide === 'current' ? 15 : 16);
    }
  });

  test('运限查询的日期、月年进位、日宫和流耀使用同一个换日结果', () => {
    const chart = astro.bySolar('1996-8-14', 0, '女');
    for (const [date, next] of [
      ['2020-1-24', '2020-1-25'],
      ['2023-4-19', '2023-4-20'],
    ]) {
      const expected = horoscopeData(chart, next, 0);
      expect(horoscopeData(chart, date, 12)).toEqual(expected);
      expect(horoscopeData(chart, `${date} 23:30`)).toEqual(expected);
      const [year, month, day] = date.split('-').map(Number);
      expect(horoscopeData(chart, new Date(year, month - 1, day, 23, 30))).toEqual(expected);
      expect(horoscopeData(chart, `${date} 23:30`, 0)).toEqual(horoscopeData(chart, date, 0));
    }
  });

  test.each(['normal', 'birthday'] as const)('年末出生的后续运限和列表保留换日后的生日（%s）', (ageDivide) => {
    astro.config({ ageDivide });
    const late = astro.bySolar('2020-1-24', 12, '女');
    const early = astro.bySolar('2020-1-25', 0, '女');
    expect(late.horoscope('2026-2-18', 0).toJSON()).toEqual(early.horoscope('2026-2-18', 0).toJSON());
    expect(json(late.decadalList())).toEqual(json(early.decadalList()));
    expect(json(late.yearlyList(0))).toEqual(json(early.yearlyList(0)));
    expect(json(late.monthlyList(2026))).toEqual(json(early.monthlyList(2026)));
  });

  test.each(['normal', 'exact'] as const)('%s 年月分界在春节和立春前后仍按有效日期计算', (divide) => {
    astro.config({ yearDivide: divide, horoscopeDivide: divide });
    for (const [date, next] of [
      ['2020-1-24', '2020-1-25'],
      ['2000-2-3', '2000-2-4'],
    ]) {
      const late = astro.bySolar(date, 12, '女');
      const early = astro.bySolar(next, 0, '女');
      expect(chartData(late)).toEqual(chartData(early));
      expect(horoscopeData(late, date, 12)).toEqual(horoscopeData(early, next, 0));
    }
  });

  test.each(['zh-CN', 'zh-TW', 'en-US', 'ja-JP', 'ko-KR', 'vi-VN'] as Language[])(
    '%s 盘保留自己的换日配置和语言',
    (language) => {
      const options = { gender: '女', language, config: { dayDivide: 'forward' } } as const;
      const late = astro.withOptions({ ...options, dateStr: '1996-8-13', timeIndex: 12 });
      const early = astro.withOptions({ ...options, dateStr: '1996-8-14', timeIndex: 0 });
      const before = horoscopeData(late, '2023-4-19', 12);
      astro.config({ dayDivide: 'current', ageDivide: 'birthday' });
      astro.bySolar('2020-1-24', 12, '男', true, 'en-US');
      setLanguage('en-US');
      expect(chartData(late)).toEqual(chartData(early));
      expect(horoscopeData(late, '2023-4-19', 12)).toEqual(before);
      expect(before).toEqual(horoscopeData(early, '2023-4-20', 0));
    },
  );

  test('换日超出支持年份时明确报错，current 仍可使用上限日期', () => {
    expect(() => astro.bySolar('9999-12-31', 12, '女')).toThrow('invalid date');
    astro.config({ dayDivide: 'current' });
    expect(() => astro.bySolar('9999-12-31', 12, '女')).not.toThrow();
  });
});
