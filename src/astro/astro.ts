import { getHeavenlyStemAndEarthlyBranchBySolarDate, getSign, getZodiac, lunar2solar, solar2lunar } from 'lunar-lite';
import { CHINESE_TIME, EARTHLY_BRANCHES, HEAVENLY_STEMS, TIME_RANGE, earthlyBranches } from '../data';
import { Language } from '../data/types';
import { EarthlyBranchKey, EarthlyBranchName, GenderName, HeavenlyStemKey, kot, setLanguage, t } from '../i18n';
import { getAdjectiveStar, getBoShi12, getchangsheng12, getMajorStar, getMinorStar, getYearly12 } from '../star';
import { fixIndex, translateChineseDate } from '../utils';
import FunctionalAstrolabe from './FunctionalAstrolabe';
import FunctionalPalace, { IFunctionalPalace } from './FunctionalPalace';
import { getPalaceNames, getSoulAndBody, getHoroscope, getFiveElementsClass } from './palace';

/**
 * 通过阳历获取星盘信息
 *
 * @deprecated 此方法已在`v2.0.5`废弃，请用 `bySolar` 方法替换，参数不变
 *
 * @param solarDateStr 阳历日期【YYYY-M-D】
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言
 * @returns 星盘信息
 */
export const astrolabeBySolarDate = (
  solarDateStr: string,
  timeIndex: number,
  gender: GenderName,
  fixLeap: boolean = true,
  language?: Language,
) => {
  return bySolar(solarDateStr, timeIndex, gender, fixLeap, language);
};

/**
 * 通过阳历获取星盘信息
 *
 * @param solarDateStr 阳历日期【YYYY-M-D】
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言
 * @returns 星盘信息
 */
export const bySolar = (
  solarDateStr: string,
  timeIndex: number,
  gender: GenderName,
  fixLeap: boolean = true,
  language?: Language,
) => {
  language && setLanguage(language);

  const palaces: IFunctionalPalace[] = [];
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);
  const earthlyBranchOfYear = kot<EarthlyBranchKey>(yearly[1], 'Earthly');
  const heavenlyStemOfYear = kot<HeavenlyStemKey>(yearly[0], 'Heavenly');
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
      HEAVENLY_STEMS[
        fixIndex(HEAVENLY_STEMS.indexOf(kot<HeavenlyStemKey>(heavenlyStemOfSoul, 'Heavenly')) - soulIndex + i, 10)
      ];
    const earthlyBranchOfPalace = EARTHLY_BRANCHES[fixIndex(2 + i)];

    palaces.push(
      new FunctionalPalace({
        index: i,
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
      }),
    );
  }

  // 宫位是从寅宫开始，而寅的索引是2，所以需要+2
  const earthlyBranchOfSoulPalace = EARTHLY_BRANCHES[fixIndex(soulIndex + 2)];
  const earthlyBranchOfBodyPalace = t<EarthlyBranchName>(EARTHLY_BRANCHES[fixIndex(bodyIndex + 2)]);

  const chineseDate = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);
  const lunarDate = solar2lunar(solarDateStr);

  const result = new FunctionalAstrolabe({
    gender: t(kot<GenderName>(gender)),
    solarDate: solarDateStr,
    lunarDate: lunarDate.toString(true),
    chineseDate: translateChineseDate(chineseDate),
    rawDates: { lunarDate, chineseDate },
    time: t(CHINESE_TIME[timeIndex]),
    timeRange: TIME_RANGE[timeIndex],
    sign: getSignBySolarDate(solarDateStr, language),
    zodiac: getZodiacBySolarDate(solarDateStr, language),
    earthlyBranchOfSoulPalace: t<EarthlyBranchName>(earthlyBranchOfSoulPalace),
    earthlyBranchOfBodyPalace,
    soul: t(earthlyBranches[earthlyBranchOfSoulPalace].soul),
    body: t(earthlyBranches[earthlyBranchOfYear].body),
    fiveElementsClass: getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul),
    palaces,
  });

  return result;
};

/**
 * 通过农历获取星盘信息
 *
 * @deprecated 此方法已在`v2.0.5`废弃，请用 `byLunar` 方法替换，参数不变
 *
 * @param lunarDateStr 农历日期【YYYY-M-D】，例如2000年七月十七则传入 2000-7-17
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param isLeapMonth 是否闰月【默认 false】，当实际月份没有闰月时该参数不生效
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言
 * @returns 星盘数据
 */
export const astrolabeByLunarDate = (
  lunarDateStr: string,
  timeIndex: number,
  gender: GenderName,
  isLeapMonth: boolean = false,
  fixLeap: boolean = true,
  language?: Language,
) => {
  return byLunar(lunarDateStr, timeIndex, gender, isLeapMonth, fixLeap, language);
};

/**
 * 通过农历获取星盘信息
 *
 * @param lunarDateStr 农历日期【YYYY-M-D】，例如2000年七月十七则传入 2000-7-17
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param isLeapMonth 是否闰月【默认 false】，当实际月份没有闰月时该参数不生效
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言
 * @returns 星盘数据
 */
export const byLunar = (
  lunarDateStr: string,
  timeIndex: number,
  gender: GenderName,
  isLeapMonth: boolean = false,
  fixLeap: boolean = true,
  language?: Language,
) => {
  const solarDate = lunar2solar(lunarDateStr, isLeapMonth);

  return bySolar(solarDate.toString(), timeIndex, gender, fixLeap, language);
};

/**
 * 通过公历获取十二生肖
 *
 * @version v1.2.1
 *
 * @param solarDateStr 阳历日期【YYYY-M-D】
 * @param language 输出语言，默认为中文
 * @returns 十二生肖
 */
export const getZodiacBySolarDate = (solarDateStr: string, language?: Language): string => {
  language && setLanguage(language);

  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0);

  return t(kot(getZodiac(yearly[1])));
};

/**
 * 通过阳历获取星座
 *
 * @version v1.2.1
 *
 * @param solarDateStr 阳历日期【YYYY-M-D】
 * @param language 输出语言，默认为中文
 * @returns 星座
 */
export const getSignBySolarDate = (solarDateStr: string, language?: Language): string => {
  language && setLanguage(language);

  return t(kot(getSign(solarDateStr)));
};

/**
 * 通过农历获取星座
 *
 * @version v1.2.1
 *
 * @param lunarDateStr 农历日期【YYYY-M-D】
 * @param isLeapMonth 是否闰月，如果该月没有闰月则此字段不生效
 * @param language 输出语言，默认为中文
 * @returns 星座
 */
export const getSignByLunarDate = (lunarDateStr: string, isLeapMonth?: boolean, language?: Language): string => {
  language && setLanguage(language);

  const solarDate = lunar2solar(lunarDateStr, isLeapMonth);

  return getSignBySolarDate(solarDate.toString(), language);
};

/**
 * 通过阳历获取命宫主星
 *
 * @version v1.2.1
 *
 * @param solarDateStr 阳历日期【YYYY-M-D】
 * @param timeIndex 出生时辰序号【0~12】
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言，默认为中文
 * @returns 命宫主星
 */
export const getMajorStarBySolarDate = (
  solarDateStr: string,
  timeIndex: number,
  fixLeap: boolean = true,
  language?: Language,
) => {
  language && setLanguage(language);

  const { bodyIndex } = getSoulAndBody(solarDateStr, timeIndex, fixLeap);
  const majorStars = getMajorStar(solarDateStr, timeIndex, fixLeap);
  const stars = majorStars[bodyIndex].filter((star) => star.type === 'major');

  if (stars.length) {
    return stars.map((star) => t(star.name)).join(',');
  }

  // 如果命宫为空宫，则借对宫主星
  return majorStars[fixIndex(bodyIndex + 6)]
    .filter((star) => star.type === 'major')
    .map((star) => t(star.name))
    .join(',');
};

/**
 * 通过农历获取命宫主星
 *
 * @version v1.2.1
 *
 * @param lunarDateStr 农历日期【YYYY-M-D】，例如2000年七月十七则传入 2000-7-17
 * @param timeIndex 出生时辰序号【0~12】
 * @param isLeapMonth 是否闰月，如果该月没有闰月则此字段不生效
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言，默认为中文
 * @returns 命宫主星
 */
export const getMajorStarByLunarDate = (
  lunarDateStr: string,
  timeIndex: number,
  isLeapMonth: boolean = false,
  fixLeap: boolean = true,
  language?: Language,
) => {
  const solarDate = lunar2solar(lunarDateStr, isLeapMonth);

  return getMajorStarBySolarDate(solarDate.toString(), timeIndex, fixLeap, language);
};
