import { getHeavenlyStemAndEarthlyBranchBySolarDate, normalizeSolarDateStr, solar2lunar } from '../calendar';
import { EARTHLY_BRANCHES } from '../data';
import { Astrolabe, Horoscope } from '../data/types';
import { EarthlyBranchKey, EarthlyBranchName, HeavenlyStemName, kot, PalaceName, StarName } from '../i18n';
import { getHoroscopeStar } from '../star';
import { fixEarthlyBranchIndex, fixIndex, getMutagensByHeavenlyStem, timeToIndex } from '../utils';
import { getPalace, isSurroundedByStars } from './analyzer';
import { IFunctionalPalace } from './FunctionalPalace';
import { getPalaceNames } from './palace';

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
  $: Astrolabe,
  targetDate: string | Date = new Date(),
  timeIndex?: number,
): Horoscope => {
  const _birthday = solar2lunar($.solarDate);
  const _date = solar2lunar(targetDate);
  const convertTimeIndex = timeToIndex(new Date(targetDate).getHours());
  const { yearly, monthly, daily, timely } = getHeavenlyStemAndEarthlyBranchBySolarDate(
    targetDate.toString(),
    timeIndex || convertTimeIndex,
  );
  // 虚岁
  let nominalAge = _date.lunarYear - _birthday.lunarYear;

  // 假如目标日期已经过了生日，则需要加1岁
  // 比如 2022年九月初一 出生的人，在出生后虚岁为 1 岁
  // 但在 2023年九月初二 以后，虚岁则为 2 岁
  if (
    (_date.lunarMonth === _birthday.lunarMonth && _date.lunarDay > _birthday.lunarDay) ||
    _date.lunarMonth > _birthday.lunarMonth
  ) {
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
  let timelyIndex = -1;

  // 查询大限索引
  $.palaces.some(({ decadal }, index) => {
    if (nominalAge >= decadal.range[0] && nominalAge <= decadal.range[1]) {
      decadalIndex = index;
      heavenlyStemOfDecade = decadal.heavenlyStem;
      earthlyBranchOfDecade = decadal.earthlyBranch;

      return true;
    }
  });

  // 查询小限索引
  $.palaces.some(({ ages }, index) => {
    if (ages.includes(nominalAge)) {
      ageIndex = index;

      return true;
    }
  });

  // 获取流月索引, 流年地支逆数到生月所在宫位，再从该宫位顺数到生时，为正月所在宫位，之后每月一宫
  monthlyIndex = fixIndex(
    yearlyIndex -
      EARTHLY_BRANCHES.indexOf(kot<EarthlyBranchKey>($.rawDates.chineseDate.monthly[1])) +
      EARTHLY_BRANCHES.indexOf(kot<EarthlyBranchKey>($.rawDates.chineseDate.timely[1])) +
      EARTHLY_BRANCHES.indexOf(kot<EarthlyBranchKey>(monthly[1])),
  );

  // 获取流日索引
  dailyIndex = (monthlyIndex + _date.lunarDay - 1) % 12;

  // 获取流时索引
  timelyIndex = fixIndex(dailyIndex + EARTHLY_BRANCHES.indexOf(kot<EarthlyBranchKey>(timely[1])));

  const scope: Horoscope = {
    solarDate: normalizeSolarDateStr(targetDate).join('-'),
    lunarDate: _date.toString(true),
    decadal: {
      index: decadalIndex,
      heavenlyStem: heavenlyStemOfDecade,
      earthlyBranch: earthlyBranchOfDecade,
      palaceNames: getPalaceNames(decadalIndex),
      mutagen: getMutagensByHeavenlyStem(heavenlyStemOfDecade),
      stars: getHoroscopeStar(heavenlyStemOfDecade, earthlyBranchOfDecade, 'decadal'),
    },
    age: {
      index: ageIndex,
      nominalAge,
    },
    yearly: {
      index: yearlyIndex,
      heavenlyStem: yearly[0],
      earthlyBranch: yearly[1],
      palaceNames: getPalaceNames(yearlyIndex),
      mutagen: getMutagensByHeavenlyStem(yearly[0]),
      stars: getHoroscopeStar(yearly[0], yearly[1], 'yearly'),
    },
    monthly: {
      index: monthlyIndex,
      heavenlyStem: monthly[0],
      earthlyBranch: monthly[1],
      palaceNames: getPalaceNames(monthlyIndex),
      mutagen: getMutagensByHeavenlyStem(monthly[0]),
    },
    daily: {
      index: dailyIndex,
      heavenlyStem: daily[0],
      earthlyBranch: daily[1],
      palaceNames: getPalaceNames(dailyIndex),
      mutagen: getMutagensByHeavenlyStem(daily[0]),
    },
    timely: {
      index: timelyIndex,
      heavenlyStem: timely[0],
      earthlyBranch: timely[1],
      palaceNames: getPalaceNames(timelyIndex),
      mutagen: getMutagensByHeavenlyStem(timely[0]),
    },
  };

  return scope;
};

export interface IFunctionalAstrolabe extends Astrolabe {
  /**
   * 获取运限数据
   *
   * @version v0.2.0
   *
   * @param date 阳历日期【可选】，默认为调用时的日期
   * @param timeIndex 时辰索引【可选】，默认会自动读取当前时间的时辰
   * @returns 运限数据
   */
  horoscope: (date?: string | Date, timeIndex?: number) => Horoscope;

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
   * 判断某一个宫位三方四正是否包含目标星耀，必须要全部包含才会返回true
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @param stars 星耀名称数组
   * @returns true | false
   */
  isSurrounded: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;
}

export default class FunctionalAstrolabe implements IFunctionalAstrolabe {
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

  constructor(data: Astrolabe) {
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
  }

  horoscope = (targetDate: string | Date = new Date(), timeIndexOfTarget?: number) =>
    _getHoroscopeBySolarDate(this, targetDate, timeIndexOfTarget);

  palace = (indexOrName: number | PalaceName): IFunctionalPalace | undefined => getPalace(this, indexOrName);

  isSurrounded = (indexOrName: number | PalaceName, stars: StarName[]): boolean =>
    isSurroundedByStars(this, indexOrName, stars);
}
