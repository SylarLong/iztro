import dayjs from 'dayjs';
import { getHeavenlyStemAndEarthlyBranchBySolarDate, lunar2solar, normalizeDateStr, solar2lunar } from 'lunar-lite';
import { LunarYear } from 'lunar-typescript';
import { EARTHLY_BRANCHES } from '../data';
import { Astrolabe, DecadalHoroscope, Horoscope, MonthlyHoroscope, Plugin, YearlyHoroscope } from '../data/types';
import { EarthlyBranchKey, EarthlyBranchName, HeavenlyStemName, kot, PalaceName, StarKey, StarName, t } from '../i18n';
import { getHoroscopeStar, getYearly12 } from '../star';
import { IFunctionalStar } from '../star/FunctionalStar';
import { fixEarthlyBranchIndex, fixIndex, getMutagensByHeavenlyStem, timeToIndex } from '../utils';
import { getFlankingPalaces, getPalace, getSurroundedPalaces } from './analyzer';
import { IFunctionalPalace } from './FunctionalPalace';
import { IFunctionalSurpalaces } from './FunctionalSurpalaces';
import { IFunctinalFlankingPalaces } from './FunctionalFlankingPalaces';
import { getPalaceNames } from './palace';
import FunctionalHoroscope, { IFunctionalHoroscope } from './FunctionalHoroscope';
import { getConfig } from './astro';
import { serialize } from '../utils/toJSON';

/**
 * 获取运限数据
 *
 * @version v0.2.1
 *
 * @private 私有方法
 *
 * @param $ 星盘对象
 * @param targetDate 阳历日期【可选】，默认为调用时日期
 * @param timeIndex 时辰序号【可选】，若不传会返回 `targetDate` 中时间所在的时辰
 * @returns 运限数据
 */
const _getHoroscopeBySolarDate = (
  $: FunctionalAstrolabe,
  targetDate: string | Date = new Date(),
  timeIndex?: number,
): IFunctionalHoroscope => {
  const _birthday = solar2lunar($.solarDate);
  const _date = solar2lunar(targetDate);
  const convertTimeIndex = timeToIndex(dayjs(targetDate).hour());
  const targetTimeIndex = timeIndex ?? convertTimeIndex;
  const adjustedTargetTimeIndex = getConfig().dayDivide === 'current' && targetTimeIndex >= 12 ? 0 : targetTimeIndex;
  const { yearly, monthly, daily, hourly } = getHeavenlyStemAndEarthlyBranchBySolarDate(
    targetDate,
    adjustedTargetTimeIndex,
    {
      // 允许配置运限分割点
      year: getConfig().horoscopeDivide,
      month: getConfig().horoscopeDivide,
    },
  );
  // 虚岁
  let nominalAge = _date.lunarYear - _birthday.lunarYear;
  // 是否童限
  let isChildhood = false;

  if (getConfig().ageDivide === 'birthday') {
    // 假如目标日期已经过了生日，则需要加1岁
    // 比如 2022年九月初一 出生的人，在出生后虚岁为 1 岁
    // 但在 2023年九月初二 以后，虚岁则为 2 岁
    if (
      _date.lunarMonth > _birthday.lunarMonth ||
      (_date.lunarMonth === _birthday.lunarMonth && _date.lunarDay > _birthday.lunarDay)
    ) {
      nominalAge += 1;
    }
  } else {
    // 以自然年为界，直接加1岁
    nominalAge += 1;
  }

  // 大限索引
  let decadalIndex = -1;
  // 大限天干
  let heavenlyStemOfDecade: HeavenlyStemName = 'jia';
  // 大限地支
  let earthlyBranchOfDecade: EarthlyBranchName = 'zi';
  // 小限索引
  let ageIndex = -1;
  // 流年索引
  const yearlyIndex = fixEarthlyBranchIndex(yearly[1]);
  // 流月索引
  let monthlyIndex = -1;
  // 流日索引
  let dailyIndex = -1;
  // 流时索引
  let hourlyIndex = -1;
  // 小限天干
  let heavenlyStemOfAge: HeavenlyStemName = 'jia';
  // 小限地支
  let earthlyBranchOfAge: EarthlyBranchName = 'zi';

  // 查询大限索引
  $.palaces.some(({ decadal }, index) => {
    if (nominalAge >= decadal.range[0] && nominalAge <= decadal.range[1]) {
      decadalIndex = index;
      heavenlyStemOfDecade = decadal.heavenlyStem;
      earthlyBranchOfDecade = decadal.earthlyBranch;

      return true;
    }
  });

  if (decadalIndex < 0) {
    // 如果大限索引小于0则证明还没有开始起运
    // 此时应该取小限运
    // 一命二财三疾厄	四岁夫妻五福德
    // 六岁事业为童限	专就宫垣视吉凶
    const palaces: PalaceName[] = ['命宫', '财帛', '疾厄', '夫妻', '福德', '官禄'];
    const targetIndex = palaces[nominalAge - 1];
    const targetPalace = $.palace(targetIndex);

    if (targetPalace) {
      isChildhood = true;
      decadalIndex = targetPalace.index;
      heavenlyStemOfDecade = targetPalace.heavenlyStem;
      earthlyBranchOfDecade = targetPalace.earthlyBranch;
    }
  }

  // 查询小限索引
  $.palaces.some(({ ages, heavenlyStem, earthlyBranch }, index) => {
    if (ages.includes(nominalAge)) {
      ageIndex = index;
      heavenlyStemOfAge = heavenlyStem;
      earthlyBranchOfAge = earthlyBranch;

      return true;
    }
  });

  // 获取流月索引, 流年地支逆数到生月所在宫位，再从该宫位顺数到生时，为正月所在宫位，之后每月一宫
  // 计算流月时需要考虑生月闰月情况，如果是后15天则计算时需要加1月
  const leapAddition = _birthday.isLeap && _birthday.lunarDay > 15 ? 1 : 0;
  // 流月当月的闰月情况也需要考虑
  const dateLeapAddition = _date.isLeap && _date.lunarDay > 15 ? 1 : 0;
  monthlyIndex = fixIndex(
    yearlyIndex -
      (_birthday.lunarMonth + leapAddition) +
      EARTHLY_BRANCHES.indexOf(kot<EarthlyBranchKey>($.rawDates.chineseDate.hourly[1])) +
      (_date.lunarMonth + dateLeapAddition),
  );

  // 获取流日索引
  dailyIndex = fixIndex(monthlyIndex + _date.lunarDay - 1);

  // 获取流时索引
  hourlyIndex = fixIndex(dailyIndex + EARTHLY_BRANCHES.indexOf(kot<EarthlyBranchKey>(hourly[1], 'Earthly')));

  const scope: Horoscope = {
    solarDate: normalizeDateStr(targetDate).slice(0, 3).join('-'),
    lunarDate: _date.toString(true),
    decadal: {
      index: decadalIndex,
      name: isChildhood ? t('childhood') : t('decadal'),
      heavenlyStem: t(kot(heavenlyStemOfDecade, 'Heavnly')),
      earthlyBranch: t(kot(earthlyBranchOfDecade, 'Earthly')),
      palaceNames: getPalaceNames(decadalIndex),
      mutagen: getMutagensByHeavenlyStem(heavenlyStemOfDecade),
      stars: getHoroscopeStar(heavenlyStemOfDecade, earthlyBranchOfDecade, 'decadal'),
    },
    age: {
      index: ageIndex,
      nominalAge,
      name: t('turn'),
      heavenlyStem: heavenlyStemOfAge,
      earthlyBranch: earthlyBranchOfAge,
      palaceNames: getPalaceNames(ageIndex),
      mutagen: getMutagensByHeavenlyStem(heavenlyStemOfAge),
    },
    yearly: {
      index: yearlyIndex,
      name: t('yearly'),
      heavenlyStem: t(kot(yearly[0], 'Heavenly')),
      earthlyBranch: t(kot(yearly[1], 'Earthly')),
      palaceNames: getPalaceNames(yearlyIndex),
      mutagen: getMutagensByHeavenlyStem(yearly[0]),
      stars: getHoroscopeStar(yearly[0], yearly[1], 'yearly'),
      yearlyDecStar: getYearly12(targetDate),
    },
    monthly: {
      index: monthlyIndex,
      name: t('monthly'),
      heavenlyStem: t(kot(monthly[0], 'Heavenly')),
      earthlyBranch: t(kot(monthly[1], 'Earthly')),
      palaceNames: getPalaceNames(monthlyIndex),
      mutagen: getMutagensByHeavenlyStem(monthly[0]),
      stars: getHoroscopeStar(monthly[0], monthly[1], 'monthly'),
    },
    daily: {
      index: dailyIndex,
      name: t('daily'),
      heavenlyStem: t(kot(daily[0], 'Heavenly')),
      earthlyBranch: t(kot(daily[1], 'Earthly')),
      palaceNames: getPalaceNames(dailyIndex),
      mutagen: getMutagensByHeavenlyStem(daily[0]),
      stars: getHoroscopeStar(daily[0], daily[1], 'daily'),
    },
    hourly: {
      index: hourlyIndex,
      name: t('hourly'),
      heavenlyStem: t(kot(hourly[0], 'Heavenly')),
      earthlyBranch: t(kot(hourly[1], 'Earthly')),
      palaceNames: getPalaceNames(hourlyIndex),
      mutagen: getMutagensByHeavenlyStem(hourly[0]),
      stars: getHoroscopeStar(hourly[0], hourly[1], 'hourly'),
    },
  };

  return new FunctionalHoroscope(scope, $);
};

/**
 * 星盘类接口定义。
 *
 * 文档地址：https://docs.iztro.com/posts/astrolabe.html#functionalastrolabe
 */
export interface IFunctionalAstrolabe extends Astrolabe {
  /**
   * 将功能星盘转换为普通 JSON 对象
   *
   * @version 2.6.0
   */
  toJSON: () => Astrolabe;

  /**
   * 插件注入方法
   *
   * @version v2.3.0
   *
   * @param plugin 插件函数
   */
  use(plugin: Plugin): void;
  /**
   * 获取运限数据
   *
   * @version v0.2.0
   *
   * @param date 阳历日期【可选】，默认为调用时的日期
   * @param timeIndex 时辰索引【可选】，默认会自动读取当前时间的时辰
   * @returns 运限数据
   */
  horoscope: (date?: string | Date, timeIndex?: number) => IFunctionalHoroscope;

  /**
   * 获取按起运先后排列的大限列表。
   *
   * @returns 大限数据列表，第 0 项为第一个大限
   */
  decadalList: () => DecadalHoroscope[];

  /**
   * 获取指定大限内的全部流年。
   *
   * @param indexOrName 大限序号（0 为第一个大限）或者本命宫位名称
   * @returns 该大限十个虚岁对应的流年数据
   */
  yearlyList: (indexOrName: number | PalaceName) => YearlyHoroscope[];

  /**
   * 获取指定流年内的全部流月。
   *
   * @param year 流年年份，可直接传入 `yearlyList()` 返回项的 `year`
   * @param fixLeap 是否将闰月前后半月分开计算，默认为 `true`
   * @returns 该流年的流月数据；无闰月 12 项，有闰月时返回 13 或 14 项
   */
  monthlyList: (year: number, fixLeap?: boolean) => MonthlyHoroscope[];

  /**
   * 通过星耀名称获取到当前星耀的对象实例
   *
   * @version v1.2.0
   *
   * @param starName 星耀名称
   * @returns 星耀实例
   */
  star: (starName: StarName) => IFunctionalStar;

  /**
   * 获取星盘的某一个宫位
   *
   * @version v1.0.0
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @returns 对应的宫位数据，若没有找到则返回undefined
   */
  palace: (indexOrName: number | PalaceName) => IFunctionalPalace | undefined;

  /**
   * 获取三方四正宫位，所谓三方四正就是传入的目标宫位，以及其对宫，财帛位和官禄位，总共四个宫位
   *
   * @version v1.1.0
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @returns 三方四正宫位
   */
  surroundedPalaces: (indexOrName: number | PalaceName) => IFunctionalSurpalaces;

  /**
   * 获取目标宫位的功能夹宫对象，即目标宫位前后相邻的两个宫位。
   *
   * 返回对象的 `previous` 属性是前一宫，`next` 属性是后一宫。
   * 返回对象还提供星曜、四化分析以及 JSON 转换方法。十二宫首尾相连，
   * 因此首宫的前一宫是末宫，末宫的后一宫是首宫。
   *
   * @version 2.6.0
   *
   * @param indexOrName 目标宫位索引或者宫位名称
   * @returns 包含前一宫、后一宫及夹宫分析方法的功能夹宫对象
   */
  flankingPalaces: (indexOrName: number | PalaceName) => IFunctinalFlankingPalaces;

  /**
   *
   * 判断某一个宫位三方四正是否包含目标星耀，必须要全部包含才会返回true
   *
   * @version v1.0.0
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @param stars 星耀名称数组
   * @returns true | false
   */
  isSurrounded: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;

  /**
   * 判断三方四正内是否有传入星耀的其中一个，只要命中一个就会返回true
   *
   * @version v1.1.0
   * @deprecated v1.2.0
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @param stars 星耀名称数组
   * @returns true | false
   */
  isSurroundedOneOf: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;

  /**
   * 判断某一个宫位三方四正是否不含目标星耀，必须要全部都不在三方四正内含才会返回true
   *
   * @version v1.1.0
   * @deprecated v1.2.0
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @param stars 星耀名称数组
   * @returns true | false
   */
  notSurrounded: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;
}

/**
 * 星盘类。
 *
 * 文档地址：https://docs.iztro.com/posts/astrolabe.html#functionalastrolabe
 */
export default class FunctionalAstrolabe implements IFunctionalAstrolabe {
  gender;
  solarDate;
  lunarDate;
  chineseDate;
  rawDates;
  time;
  timeRange;
  sign;
  zodiac;
  earthlyBranchOfSoulPalace;
  earthlyBranchOfBodyPalace;
  soul;
  body;
  fiveElementsClass;
  palaces;
  copyright;

  // 保存插件列表
  private plugins: Plugin[] = [];

  constructor(data: Astrolabe) {
    this.gender = data.gender;
    this.solarDate = data.solarDate;
    this.lunarDate = data.lunarDate;
    this.chineseDate = data.chineseDate;
    this.rawDates = data.rawDates;
    this.time = data.time;
    this.timeRange = data.timeRange;
    this.sign = data.sign;
    this.zodiac = data.zodiac;
    this.earthlyBranchOfBodyPalace = data.earthlyBranchOfBodyPalace;
    this.earthlyBranchOfSoulPalace = data.earthlyBranchOfSoulPalace;
    this.soul = data.soul;
    this.body = data.body;
    this.fiveElementsClass = data.fiveElementsClass;
    this.palaces = data.palaces;
    this.copyright = data.copyright;

    return this;
  }

  use(plugin: Plugin): void {
    this.plugins.push(plugin);
    plugin.apply(this);
  }

  toJSON = (): Astrolabe => serialize<Astrolabe>(this);

  star = (starName: StarName): IFunctionalStar => {
    let targetStar: IFunctionalStar | undefined;

    this.palaces.some((p) => {
      [...p.majorStars, ...p.minorStars, ...p.adjectiveStars].some((item) => {
        if (kot<StarKey>(item.name) === kot<StarKey>(starName)) {
          targetStar = item;
          targetStar.setPalace(p);
          targetStar.setAstrolabe(this);
        }
      });
    });

    if (!targetStar) {
      throw new Error('invalid star name.');
    }

    return targetStar;
  };

  horoscope = (targetDate: string | Date = new Date(), timeIndexOfTarget?: number) =>
    _getHoroscopeBySolarDate(this, targetDate, timeIndexOfTarget);

  decadalList = (): DecadalHoroscope[] => {
    const birthYear = this.rawDates.lunarDate.lunarYear;

    return [...this.palaces]
      .sort((previous, next) => previous.decadal.range[0] - next.decadal.range[0])
      .map(({ index, name: palaceName, decadal }) => ({
        index,
        name: t('decadal'),
        palaceName,
        ageRange: [...decadal.range],
        yearRange: [birthYear + decadal.range[0] - 1, birthYear + decadal.range[1] - 1],
        heavenlyStem: decadal.heavenlyStem,
        earthlyBranch: decadal.earthlyBranch,
        palaceNames: getPalaceNames(index),
        mutagen: getMutagensByHeavenlyStem(decadal.heavenlyStem),
        stars: getHoroscopeStar(decadal.heavenlyStem, decadal.earthlyBranch, 'decadal'),
      }));
  };

  yearlyList = (indexOrName: number | PalaceName): YearlyHoroscope[] => {
    const decadalPalaces = [...this.palaces].sort(
      (previous, next) => previous.decadal.range[0] - next.decadal.range[0],
    );
    const palace = typeof indexOrName === 'number' ? decadalPalaces[indexOrName] : this.palace(indexOrName);

    if (!palace) {
      throw new Error('invalid decadal index or palace name.');
    }

    const birthYear = this.rawDates.lunarDate.lunarYear;
    const [startAge, endAge] = palace.decadal.range;
    const timeIndex = EARTHLY_BRANCHES.indexOf(kot<EarthlyBranchKey>(this.rawDates.chineseDate.hourly[1], 'Earthly'));

    return Array.from({ length: endAge - startAge + 1 }, (_, index) => {
      const age = startAge + index;
      const year = birthYear + age - 1;
      const targetDate = lunar2solar(`${year}-6-1`).toString();
      const { yearly } = this.horoscope(targetDate, timeIndex);

      return {
        index: yearly.index,
        name: yearly.name,
        age,
        year,
        heavenlyStem: yearly.heavenlyStem,
        earthlyBranch: yearly.earthlyBranch,
        palaceNames: yearly.palaceNames,
        mutagen: yearly.mutagen,
        stars: yearly.stars,
      };
    });
  };

  monthlyList = (year: number, fixLeap: boolean = true): MonthlyHoroscope[] => {
    if (!Number.isInteger(year)) {
      throw new Error('invalid year.');
    }

    const age = year - this.rawDates.lunarDate.lunarYear + 1;
    const timeIndex = EARTHLY_BRANCHES.indexOf(kot<EarthlyBranchKey>(this.rawDates.chineseDate.hourly[1], 'Earthly'));
    const periods = LunarYear.fromYear(year)
      .getMonthsInYear()
      .flatMap<{ month: number; isLeapMonth: boolean; part: MonthlyHoroscope['part']; dayRange: [number, number] }>(
        (lunarMonth) => {
          const rawMonth = lunarMonth.getMonth();
          const month = Math.abs(rawMonth);
          const isLeapMonth = rawMonth < 0;
          const lastDay = lunarMonth.getDayCount();

          if (isLeapMonth && fixLeap) {
            return [
              { month, isLeapMonth, part: 'first', dayRange: [1, 15] },
              { month, isLeapMonth, part: 'second', dayRange: [16, lastDay] },
            ];
          }

          return [{ month, isLeapMonth, part: 'normal', dayRange: [1, lastDay] }];
        },
      );

    return periods.map(({ month, isLeapMonth, part, dayRange }) => {
      const targetDay = part === 'second' ? 16 : 1;
      const targetDate = lunar2solar(`${year}-${month}-${targetDay}`, isLeapMonth).toString();
      const { monthly } = this.horoscope(targetDate, timeIndex);

      return {
        index: monthly.index,
        name: monthly.name,
        age,
        year,
        month,
        isLeapMonth,
        part,
        dayRange,
        heavenlyStem: monthly.heavenlyStem,
        earthlyBranch: monthly.earthlyBranch,
        palaceNames: monthly.palaceNames,
        mutagen: monthly.mutagen,
        stars: monthly.stars,
      };
    });
  };

  palace = (indexOrName: number | PalaceName): IFunctionalPalace | undefined => getPalace(this, indexOrName);

  surroundedPalaces = (indexOrName: number | PalaceName): IFunctionalSurpalaces =>
    getSurroundedPalaces(this, indexOrName);

  flankingPalaces = (indexOrName: number | PalaceName): IFunctinalFlankingPalaces =>
    getFlankingPalaces(this, indexOrName);

  /**
   * @deprecated 此方法已在`v1.2.0`废弃，请用下列方法替换
   *
   * @example
   *  // AS IS
   *  astrolabe.isSurrounded(0, ["紫微"]);
   *
   *  // TO BE
   *  astrolabe.surroundedPalaces(0).have(["紫微"]);
   */
  isSurrounded = (indexOrName: number | PalaceName, stars: StarName[]): boolean =>
    this.surroundedPalaces(indexOrName).have(stars);

  /**
   * @deprecated 此方法已在`v1.2.0`废弃，请用下列方法替换
   *
   * @example
   *  // AS IS
   *  astrolabe.isSurroundedOneOf(0, ["紫微"]);
   *
   *  // TO BE
   *  astrolabe.surroundedPalaces(0).haveOneOf(["紫微"]);
   */
  isSurroundedOneOf = (indexOrName: number | PalaceName, stars: StarName[]): boolean =>
    this.surroundedPalaces(indexOrName).haveOneOf(stars);

  /**
   * @deprecated 此方法已在`v1.2.0`废弃，请用下列方法替换
   *
   * @example
   *  // AS IS
   *  astrolabe.notSurrounded(0, ["紫微"]);
   *
   *  // TO BE
   *  astrolabe.surroundedPalaces(0).notHave(["紫微"]);
   */
  notSurrounded = (indexOrName: number | PalaceName, stars: StarName[]): boolean =>
    this.surroundedPalaces(indexOrName).notHave(stars);
}
