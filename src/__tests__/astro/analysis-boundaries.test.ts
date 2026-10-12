import { astro } from '../../index';
import FunctionalHoroscope from '../../astro/FunctionalHoroscope';
import FunctionalPalace from '../../astro/FunctionalPalace';
import FunctionalStar from '../../star/FunctionalStar';
import { PalaceName } from '../../i18n';

const createChart = () => astro.bySolar('2000-8-16', 3, '男');
const unknownPalace = 'unknown' as PalaceName;

describe('宫位、星曜和运限查询边界', () => {
  beforeEach(() => astro.resetConfig());
  afterEach(() => astro.resetConfig());

  test('不存在的宫位返回 undefined，三方四正和夹宫查询明确报错', () => {
    const chart = createChart();
    expect(() => chart.palace(12)).toThrow('invalid palace index.');
    expect(chart.palace(unknownPalace)).toBeUndefined();
    expect(() => chart.surroundedPalaces(unknownPalace)).toThrow('indexOrName is inccorrect.');
    expect(() => chart.flankingPalaces(unknownPalace)).toThrow('invalid palace index or name.');
    expect(() => chart.yearlyList(unknownPalace)).toThrow('invalid decadal index or palace name.');
  });

  test('独立星曜未关联宫位或星盘时，不返回无效的宫位引用', () => {
    const star = new FunctionalStar({ name: '紫微', type: 'major', scope: 'origin' });
    expect(star.palace()).toBeUndefined();
    expect(star.oppositePalace()).toBeUndefined();
    expect(star.surroundedPalaces()).toBeUndefined();
    const chart = createChart();
    star.setPalace(chart.palace('命宫')!);
    expect(star.oppositePalace()).toBeUndefined();
    expect(star.surroundedPalaces()).toBeUndefined();
    star.setAstrolabe(chart);
    expect(star.oppositePalace()?.index).toBe(chart.palace('迁移')?.index);
  });

  test('独立宫位未关联星盘以及无效目标宫位不会进行飞化分析', () => {
    const chart = createChart();
    const palace = new FunctionalPalace(chart.palace('命宫')!);
    expect(palace.astrolabe()).toBeUndefined();
    expect(palace.fliesTo('迁移', '禄')).toBe(false);
    expect(palace.fliesOneOfTo('迁移', ['禄'])).toBe(false);
    expect(palace.notFlyTo('迁移', '禄')).toBe(false);
    expect(palace.mutagedPlaces()).toEqual([]);
    palace.setAstrolabe(chart);
    expect(palace.fliesTo(unknownPalace, '禄')).toBe(false);
    expect(palace.fliesOneOfTo(unknownPalace, ['禄'])).toBe(false);
    expect(palace.notFlyTo(unknownPalace, '禄')).toBe(false);
  });

  test('空四化筛选不产生飞化目标', () => {
    const palace = createChart().palace('命宫')!;
    expect(palace.fliesTo('迁移', [])).toBe(false);
    expect(palace.fliesOneOfTo('迁移', [])).toBe(true);
    expect(palace.notFlyTo('迁移', [])).toBe(true);
  });

  test.each(['origin', 'yearly'] as const)('运限 %s 中未知宫位不会命中星曜或四化', (scope) => {
    const horoscope = createChart().horoscope('2026-10-12', 3);
    expect(horoscope.palace(unknownPalace, scope)).toBeUndefined();
    expect(horoscope.surroundPalaces(unknownPalace, scope)).toBeUndefined();
    expect(horoscope.hasHoroscopeStars(unknownPalace, scope, ['运禄'])).toBe(false);
    expect(horoscope.notHaveHoroscopeStars(unknownPalace, scope, ['运禄'])).toBe(false);
    expect(horoscope.hasOneOfHoroscopeStars(unknownPalace, scope, ['运禄'])).toBe(false);
    expect(horoscope.hasHoroscopeMutagen(unknownPalace, scope, '禄')).toBe(false);
  });

  test.each(['decadal', 'yearly'] as const)('运限缺少 %s 流曜时分析安全返回 false', (scope) => {
    const chart = createChart();
    const data = chart.horoscope('2026-10-12', 3).toJSON();
    // 流曜在 HoroscopeItem 类型中是可选字段，导入的运限数据可以不包含它。
    delete data[scope].stars;
    const horoscope = new FunctionalHoroscope(data, chart);
    expect(horoscope.hasHoroscopeStars('命宫', 'yearly', ['运禄'])).toBe(false);
    expect(horoscope.notHaveHoroscopeStars('命宫', 'yearly', ['运禄'])).toBe(false);
    expect(horoscope.hasOneOfHoroscopeStars('命宫', 'yearly', ['运禄'])).toBe(false);
  });

  test('本命范围不应用运限四化，空四化表不会产生化曜', () => {
    astro.config({ mutagens: { 辛: [] } });
    const chart = createChart();
    const horoscope = chart.horoscope('2026-10-12', 3);
    expect(horoscope.hasHoroscopeMutagen('命宫', 'origin', '禄')).toBe(false);
    expect(chart.decadalList()[0].mutagen).toEqual([]);
    expect(chart.palace('命宫')!.mutagedPlaces()).toEqual([]);
  });

  test('三方四正的四化排除查询能区分命中和未命中', () => {
    const chart = astro.bySolar('2013-8-21', 4, '女');
    expect(chart.surroundedPalaces('福德').notHaveMutagen('禄')).toBe(false);
    expect(chart.surroundedPalaces('财帛').notHaveMutagen('科')).toBe(true);
  });
});
