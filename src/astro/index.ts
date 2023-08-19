import {
  getHeavenlyStemAndEarthlyBranchBySolarDate,
  getSign,
  getZodiac,
  lunar2solar,
  normalizeSolarDateStr,
  solar2lunar,
} from '../calendar';
import {
  BIRTH_TIME,
  EARTHLY_BRANCHES,
  HEAVENLY_STEMS,
  TIME_RANGE,
  earthlyBranches,
  Gender,
  heavenlyStems,
} from '../data';
import { Astrolabe, EarthlyBranch, HeavenlyStem } from '../data/types';
import {
  getAdjectiveStar,
  getBoShi12,
  getchangsheng12,
  getHoroscopeStar,
  getMajorStar,
  getMinorStar,
  getYearly12,
} from '../star';
import { fixEarthlyBranchIndex, fixIndex } from '../utils';
import { getPalaceNames, getSoulAndBody, getHoroscope, getFiveElementsClass } from './palace';

export * from './palace';

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
): Astrolabe => {
  const palaces = [];
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);
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
      HEAVENLY_STEMS[fixIndex(HEAVENLY_STEMS.indexOf(heavenlyStemOfSoul) - soulIndex + i, 10)];
    const earthlyBranchOfPalace = EARTHLY_BRANCHES[fixIndex(2 + i)];

    palaces.push({
      // 宫名
      name: palaceNames[i],
      // 是否身宫
      isBodyPalace: bodyIndex === i,
      // 是否来因宫
      isOriginalPalace: !['子', '丑'].includes(earthlyBranchOfPalace) && heavenlyStemOfPalace === yearly[0],
      // 宫位天干
      heavenlyStem: heavenlyStemOfPalace,
      // 宫位地支
      earthlyBranch: earthlyBranchOfPalace,
      // 主星
      majorStars: majorStars[i].concat(minorStars[i].filter((star) => ['lucun', 'tianma'].includes(star.type))),
      // 辅星
      minorStars: minorStars[i].filter((star) => !['lucun', 'tianma'].includes(star.type)),
      // 杂耀
      adjectiveStars: adjectiveStars[i],
      // 长生12神
      changsheng12: changsheng12[i],
      // 博士12神
      boshi12: boshi12[i],
      // 流年将前12神
      jiangqian12: jiangqian12[i],
      // 流年岁前12神
      suiqian12: suiqian12[i],
      // 大限
      decadal: decadals[i],
      // 小限
      ages: ages[i],
    });
  }

  // 宫位是从寅宫开始，而寅的索引是2，所以需要+2
  const earthlyBranchOfSoulPalace = EARTHLY_BRANCHES[fixIndex(soulIndex + 2)];
  const earthlyBranchOfBodyPalace = EARTHLY_BRANCHES[fixIndex(bodyIndex + 2)];
  const chineseDate = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);

  const result = {
    // 阳历日期
    solarDate: solarDateStr,
    // 农历日期
    lunarDate: solar2lunar(solarDateStr).toString(true),
    // 四柱
    chineseDate: chineseDate.toString(),
    // 时辰
    time: BIRTH_TIME[timeIndex],
    // 时辰对应的时间段
    timeRange: TIME_RANGE[timeIndex],
    // 星座
    sign: getSign(solarDateStr),
    // 生肖
    zodiac: getZodiac(yearly[1]),
    // 命宫地支
    earthlyBranchOfSoulPalace,
    // 身宫地支
    earthlyBranchOfBodyPalace,
    // 命主
    soul: earthlyBranches[earthlyBranchOfSoulPalace].soul,
    // 身主
    body: earthlyBranches[yearly[1]].body,
    // 五行局
    fiveElementsClass: getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul),
    // 十二宫数据
    palaces,

    /**
     * 获取运限数据，包括大限，小限，流年，年月，流日
     *
     * @param targetDate 阳历日期【可选】，如果不填写会获取当前时间
     * @returns Horoscope
     */
    horoscope(targetDate: string | Date = new Date()) {
      const _birthday = solar2lunar(solarDateStr);
      const _date = solar2lunar(targetDate);
      const {
        yearly: targetYearly,
        monthly: targetMonthly,
        daily: targetDaily,
      } = getHeavenlyStemAndEarthlyBranchBySolarDate(targetDate.toString(), 0);
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
      let heavenlyStemOfDecade: HeavenlyStem = '甲';
      let earthlyBranchOfDecade: EarthlyBranch = '子';
      // 小限索引
      let ageIndex = -1;
      // 流年索引
      const yearlyIndex = fixEarthlyBranchIndex(targetYearly[1]);
      // 流月索引
      let monthlyIndex = -1;
      // 流日索引
      let dailyIndex = -1;

      // 查询大限索引
      decadals.some((decadal, index) => {
        if (nominalAge >= decadal.range[0] && nominalAge <= decadal.range[1]) {
          decadalIndex = index;
          heavenlyStemOfDecade = decadal.heavenlyStem;
          earthlyBranchOfDecade = decadal.earthlyBranch;

          return true;
        }
      });

      // 查询小限索引
      ages.some((age, index) => {
        if (age.includes(nominalAge)) {
          ageIndex = index;

          return true;
        }
      });

      // 获取流月索引, 流年地支逆数到生月所在宫位，再从该宫位顺数到生时，为正月所在宫位，之后每月一宫
      monthlyIndex = fixIndex(
        yearlyIndex -
          EARTHLY_BRANCHES.indexOf(chineseDate.monthly[1]) +
          EARTHLY_BRANCHES.indexOf(chineseDate.timely[1]) +
          EARTHLY_BRANCHES.indexOf(targetMonthly[1]),
      );

      // 获取流日索引
      dailyIndex = (monthlyIndex + _date.lunarDay - 1) % 12;

      const scope = {
        solarDate: normalizeSolarDateStr(targetDate).join('-'),
        lunarDate: _date.toString(true),
        decadal: {
          index: decadalIndex,
          heavenlyStem: heavenlyStemOfDecade,
          palaceNames: getPalaceNames(decadalIndex),
          mutagen: heavenlyStems[heavenlyStemOfDecade].mutagen,
          stars: getHoroscopeStar(heavenlyStemOfDecade, earthlyBranchOfDecade, 'decadal'),
        },
        age: {
          index: ageIndex,
          nominalAge,
        },
        yearly: {
          index: yearlyIndex,
          heavenlyStem: targetYearly[0],
          palaceNames: getPalaceNames(yearlyIndex),
          mutagen: heavenlyStems[targetYearly[0]].mutagen,
          stars: getHoroscopeStar(targetYearly[0], targetYearly[1], 'yearly'),
        },
        monthly: {
          index: monthlyIndex,
          heavenlyStem: targetMonthly[0],
          palaceNames: getPalaceNames(monthlyIndex),
          mutagen: heavenlyStems[targetMonthly[0]].mutagen,
        },
        daily: {
          index: dailyIndex,
          heavenlyStem: targetDaily[0],
          palaceNames: getPalaceNames(dailyIndex),
          mutagen: heavenlyStems[targetDaily[0]].mutagen,
        },
      };

      return scope;
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
 * @returns
 */
export const astrolabeByLunarDate = (
  lunarDateStr: string,
  timeIndex: number,
  gender: Gender,
  isLeapMonth: boolean = false,
  fixLeap: boolean = true,
): Astrolabe => {
  const solarDate = lunar2solar(lunarDateStr, isLeapMonth);

  return astrolabeBySolarDate(solarDate.toString(), timeIndex, gender, fixLeap);
};
