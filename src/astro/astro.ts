import {
  getHeavenlyStemAndEarthlyBranchBySolarDate,
  getSign,
  getZodiac,
  lunar2solar,
  normalizeSolarDateStr,
  solar2lunar,
} from '../calendar';
import { CHINESE_TIME, EARTHLY_BRANCHES, HEAVENLY_STEMS, TIME_RANGE, earthlyBranches } from '../data';
import { Astrolabe, Gender, Horoscope, Palace, Language } from '../data/types';
import { EarthlyBranchKey, EarthlyBranchName, HeavenlyStemKey, HeavenlyStemName, kot, setLanguage, t } from '../i18n';
import {
  getAdjectiveStar,
  getBoShi12,
  getchangsheng12,
  getHoroscopeStar,
  getMajorStar,
  getMinorStar,
  getYearly12,
} from '../star';
import { fixEarthlyBranchIndex, fixIndex, getMutagensByHeavenlyStem, timeToIndex } from '../utils';
import { getPalaceNames, getSoulAndBody, getHoroscope, getFiveElementsClass } from './palace';

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

/**
 * 通过阳历获取星盘信息
 *
 * @param solarDateStr 阳历日期【YYYY-M-D】
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @returns 星盘信息
 */
export const astrolabeBySolarDate = (
  solarDateStr: string,
  timeIndex: number,
  gender: Gender,
  fixLeap: boolean = true,
  language: Language = 'zh-CN',
): Astrolabe => {
  setLanguage(language);

  const palaces: Palace[] = [];
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);
  const heavenlyStemOfYear = kot<HeavenlyStemKey>(yearly[0]);
  const earthlyBranchOfYear = kot<EarthlyBranchKey>(yearly[1]);
  const { bodyIndex, soulIndex, heavenlyStemOfSoul, earthlyBranchOfSoul } = getSoulAndBody(
    solarDateStr,
    timeIndex,
    fixLeap,
  );
  const palaceNames = getPalaceNames(soulIndex);
  const majorStars = getMajorStar(solarDateStr, timeIndex, fixLeap);
  const minorStars = getMinorStar(solarDateStr, timeIndex, fixLeap);
  const adjectiveStars = getAdjectiveStar(solarDateStr, timeIndex, fixLeap);
  const changsheng12 = getchangsheng12(solarDateStr, timeIndex, gender, fixLeap);
  const boshi12 = getBoShi12(solarDateStr, gender);
  const { jiangqian12, suiqian12 } = getYearly12(solarDateStr);
  const { decadals, ages } = getHoroscope(solarDateStr, timeIndex, gender, fixLeap);

  for (let i = 0; i < 12; i++) {
    const heavenlyStemOfPalace =
      HEAVENLY_STEMS[fixIndex(HEAVENLY_STEMS.indexOf(kot<HeavenlyStemKey>(heavenlyStemOfSoul)) - soulIndex + i, 10)];
    const earthlyBranchOfPalace = EARTHLY_BRANCHES[fixIndex(2 + i)];

    palaces.push({
      name: palaceNames[i],
      isBodyPalace: bodyIndex === i,
      isOriginalPalace:
        !['ziEarthly', 'chouEarthly'].includes(earthlyBranchOfPalace) && heavenlyStemOfPalace === heavenlyStemOfYear,
      heavenlyStem: t(heavenlyStemOfPalace),
      earthlyBranch: t(earthlyBranchOfPalace),
      majorStars: majorStars[i].concat(minorStars[i].filter((star) => ['lucun', 'tianma'].includes(star.type))),
      minorStars: minorStars[i].filter((star) => !['lucun', 'tianma'].includes(star.type)),
      adjectiveStars: adjectiveStars[i],
      changsheng12: changsheng12[i],
      boshi12: boshi12[i],
      jiangqian12: jiangqian12[i],
      suiqian12: suiqian12[i],
      decadal: decadals[i],
      ages: ages[i],
    });
  }

  // 宫位是从寅宫开始，而寅的索引是2，所以需要+2
  const earthlyBranchOfSoulPalace = EARTHLY_BRANCHES[fixIndex(soulIndex + 2)];
  const earthlyBranchOfBodyPalace = t<EarthlyBranchName>(EARTHLY_BRANCHES[fixIndex(bodyIndex + 2)]);

  const chineseDate = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);
  const lunarDate = solar2lunar(solarDateStr);

  const result: Astrolabe = {
    solarDate: solarDateStr,
    lunarDate: lunarDate.toString(true),
    chineseDate: chineseDate.toString(),
    rawDates: { lunarDate, chineseDate },
    time: t(CHINESE_TIME[timeIndex]),
    timeRange: TIME_RANGE[timeIndex],
    sign: getSign(solarDateStr),
    zodiac: getZodiac(yearly[1]),
    earthlyBranchOfSoulPalace: t<EarthlyBranchName>(earthlyBranchOfSoulPalace),
    earthlyBranchOfBodyPalace,
    soul: t(earthlyBranches[earthlyBranchOfSoulPalace].soul),
    body: t(earthlyBranches[earthlyBranchOfYear].body),
    fiveElementsClass: getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul),
    palaces,
    horoscope(targetDate: string | Date = new Date(), timeIndexOfTarget?: number) {
      return _getHoroscopeBySolarDate(this, targetDate, timeIndexOfTarget);
    },
  };

  return result;
};

/**
 * 通过农历获取星盘信息
 *
 * @param lunarDateStr 农历日期【YYYY-M-D】，例如2000年七月十七则传入 2000-7-17
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param isLeapMonth 是否闰月【默认 false】，当实际月份没有闰月时该参数不生效
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @returns 星盘数据
 */
export const astrolabeByLunarDate = (
  lunarDateStr: string,
  timeIndex: number,
  gender: Gender,
  isLeapMonth: boolean = false,
  fixLeap: boolean = true,
  language?: Language,
): Astrolabe => {
  const solarDate = lunar2solar(lunarDateStr, isLeapMonth);

  return astrolabeBySolarDate(solarDate.toString(), timeIndex, gender, fixLeap, language);
};
