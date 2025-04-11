import { getHeavenlyStemAndEarthlyBranchBySolarDate, getSign, getZodiac, lunar2solar, solar2lunar } from 'lunar-lite';
import { CHINESE_TIME, EARTHLY_BRANCHES, HEAVENLY_STEMS, TIME_RANGE, earthlyBranches } from '../data';
import { Config, Language, Option, Plugin } from '../data/types';
import {
  BrightnessKey,
  EarthlyBranchKey,
  EarthlyBranchName,
  GenderName,
  HeavenlyStemKey,
  HeavenlyStemName,
  StarKey,
  kot,
  setLanguage,
  t,
} from '../i18n';
import { getAdjectiveStar, getBoShi12, getchangsheng12, getMajorStar, getMinorStar, getYearly12 } from '../star';
import { fixIndex, translateChineseDate } from '../utils';
import FunctionalAstrolabe from './FunctionalAstrolabe';
import FunctionalPalace, { IFunctionalPalace } from './FunctionalPalace';
import { getPalaceNames, getSoulAndBody, getHoroscope, getFiveElementsClass } from './palace';

const _plugins = [] as Plugin[];
const _mutagens: Partial<Record<HeavenlyStemKey, StarKey[]>> = {};
const _brightness: Partial<Record<StarKey, BrightnessKey[]>> = {};

/**
 * 年分界点参数，默认为立春分界。
 *
 * @version v2.4.0
 *
 * normal：正月初一分界
 * exact：立春分界
 */
let _yearDivide: 'normal' | 'exact' = 'exact';
let _horoscopeDivide: 'normal' | 'exact' = 'exact';

/**
 * 小限分割点，默认为生日。
 *
 * @version v2.4.5
 * @default 'normal'
 *
 * normal: 只考虑年份，不考虑生日
 * birthday: 以生日为分界点
 */
let _ageDivide: 'normal' | 'birthday' = 'normal';

/**
 * 排盘派别设置。
 *
 * @version v2.5.0
 * @default 'default'
 *
 * default: 以《紫微斗数全书》为基础安星
 * zhongzhou: 以中州派安星法为基础安星
 */
let _algorithm: 'default' | 'zhongzhou' = 'default';

/**
 * 批量加载插件
 *
 * @version v2.3.0
 *
 * @param plugins 插件方法数组
 */
export const loadPlugins = (plugins: Plugin[]) => {
  Array.prototype.push.apply(_plugins, plugins);
};

/**
 * 加载单个插件
 *
 * @version v2.3.0
 *
 * @param plugin 插件方法
 */
export const loadPlugin = (plugin: Plugin) => {
  _plugins.push(plugin);
};

/**
 * 全局配置四化和亮度
 *
 * 由于key和value都有可能是不同语言传进来的，
 * 所以需会将key和value转化为对应的i18n key。
 *
 * @version 2.3.0
 *
 * @param {Config} param0 自定义配置
 */
export const config = ({
  mutagens,
  brightness,
  yearDivide = _yearDivide,
  ageDivide = _ageDivide,
  horoscopeDivide = _horoscopeDivide,
  algorithm = _algorithm,
}: Config) => {
  if (mutagens) {
    Object.entries(mutagens).forEach(([key, value]) => {
      _mutagens[kot<HeavenlyStemKey>(key)] = value.map((item) => kot<StarKey>(item)) ?? [];
    });
  }

  if (brightness) {
    Object.entries(brightness).forEach(([key, value]) => {
      _brightness[kot<StarKey>(key)] = value.map((item) => kot<BrightnessKey>(item)) ?? [];
    });
  }

  _yearDivide = yearDivide;
  _horoscopeDivide = horoscopeDivide;
  _ageDivide = ageDivide;
  _algorithm = algorithm;
};

export const getConfig = () => ({
  mutagens: _mutagens,
  brightness: _brightness,
  yearDivide: _yearDivide,
  ageDivide: _ageDivide,
  horoscopeDivide: _horoscopeDivide,
  algorithm: _algorithm,
});

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
export function astrolabeBySolarDate<T extends FunctionalAstrolabe>(
  solarDateStr: string,
  timeIndex: number,
  gender: GenderName,
  fixLeap: boolean = true,
  language?: Language,
): T {
  return bySolar<T>(solarDateStr, timeIndex, gender, fixLeap, language);
}

/**
 * 通过阳历获取星盘信息
 *
 * @param solarDate 阳历日期【YYYY-M-D】
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言
 * @returns 星盘信息
 */
export function bySolar<T extends FunctionalAstrolabe>(
  solarDate: string,
  timeIndex: number,
  gender: GenderName,
  fixLeap: boolean = true,
  language?: Language,
): T {
  language && setLanguage(language);

  const palaces: IFunctionalPalace[] = [];
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDate, timeIndex, {
    year: getConfig().yearDivide,
  });
  const earthlyBranchOfYear = kot<EarthlyBranchKey>(yearly[1], 'Earthly');
  const heavenlyStemOfYear = kot<HeavenlyStemKey>(yearly[0], 'Heavenly');
  const { bodyIndex, soulIndex, heavenlyStemOfSoul, earthlyBranchOfSoul } = getSoulAndBody({
    solarDate,
    timeIndex,
    fixLeap,
  });
  const palaceNames = getPalaceNames(soulIndex);
  const majorStars = getMajorStar({ solarDate, timeIndex, fixLeap });
  const minorStars = getMinorStar(solarDate, timeIndex, fixLeap);
  const adjectiveStars = getAdjectiveStar({
    solarDate,
    timeIndex,
    gender,
    fixLeap,
  });
  const changsheng12 = getchangsheng12({
    solarDate,
    timeIndex,
    gender,
    fixLeap,
  });
  const boshi12 = getBoShi12(solarDate, gender);
  const { jiangqian12, suiqian12 } = getYearly12(solarDate);
  const { decadals, ages } = getHoroscope({ solarDate, timeIndex, gender, fixLeap });

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
        majorStars: majorStars[i],
        minorStars: minorStars[i],
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

  const chineseDate = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDate, timeIndex, {
    year: getConfig().yearDivide,
  });
  const lunarDate = solar2lunar(solarDate);

  const result = new FunctionalAstrolabe({
    gender: t(kot<GenderName>(gender)),
    solarDate,
    lunarDate: lunarDate.toString(true),
    chineseDate: translateChineseDate(chineseDate),
    rawDates: { lunarDate, chineseDate },
    time: t(CHINESE_TIME[timeIndex]),
    timeRange: TIME_RANGE[timeIndex],
    sign: getSignBySolarDate(solarDate, language),
    zodiac: getZodiacBySolarDate(solarDate, language),
    earthlyBranchOfSoulPalace: t<EarthlyBranchName>(earthlyBranchOfSoulPalace),
    earthlyBranchOfBodyPalace,
    soul: t(earthlyBranches[earthlyBranchOfSoulPalace].soul),
    body: t(earthlyBranches[earthlyBranchOfYear].body),
    fiveElementsClass: getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul),
    palaces,
    copyright: `copyright © 2023-${new Date().getFullYear()} iztro (https://github.com/SylarLong/iztro)`,
  });

  _plugins.map((plugin) => result.use(plugin));

  return result as T;
}

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
export function astrolabeByLunarDate<T extends FunctionalAstrolabe>(
  lunarDateStr: string,
  timeIndex: number,
  gender: GenderName,
  isLeapMonth: boolean = false,
  fixLeap: boolean = true,
  language?: Language,
): T {
  return byLunar<T>(lunarDateStr, timeIndex, gender, isLeapMonth, fixLeap, language);
}

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
export function byLunar<T extends FunctionalAstrolabe>(
  lunarDateStr: string,
  timeIndex: number,
  gender: GenderName,
  isLeapMonth: boolean = false,
  fixLeap: boolean = true,
  language?: Language,
) {
  const solarDate = lunar2solar(lunarDateStr, isLeapMonth);

  return bySolar<T>(solarDate.toString(), timeIndex, gender, fixLeap, language);
}

export function rearrangeAstrolable<T extends FunctionalAstrolabe>({
  from,
  astrolable,
  option,
}: {
  from: { heavenlyStem: HeavenlyStemName; earthlyBranch: EarthlyBranchName };
  astrolable: T;
  option: Option;
}) {
  const { timeIndex, fixLeap } = option;
  // 以传入地支为命宫
  const { soulIndex, bodyIndex } = getSoulAndBody({
    solarDate: astrolable.solarDate,
    timeIndex,
    fixLeap,
    from,
  });
  const fiveElementsClass = getFiveElementsClass(from.heavenlyStem, from.earthlyBranch);
  const palaceNames = getPalaceNames(soulIndex);
  const majorStars = getMajorStar({ solarDate: astrolable.solarDate, timeIndex, fixLeap, from });
  const changsheng12 = getchangsheng12({ solarDate: astrolable.solarDate, timeIndex, fixLeap, from });
  const { decadals, ages } = getHoroscope({
    solarDate: astrolable.solarDate,
    timeIndex,
    gender: astrolable.gender as GenderName,
    fixLeap,
    from,
  });

  astrolable.fiveElementsClass = fiveElementsClass;
  astrolable.palaces.forEach((palace, i) => {
    palace.name = palaceNames[i];
    palace.majorStars = majorStars[i];
    palace.changsheng12 = changsheng12[i];
    palace.decadal = decadals[i];
    palace.ages = ages[i];
    palace.isBodyPalace = bodyIndex === i;
  });

  return astrolable;
}

/**
 * 获取排盘信息。
 *
 * @param param0 排盘参数
 * @returns 星盘信息
 */
export function withOptions<T extends FunctionalAstrolabe>(option: Option): T {
  const { type = 'solar', dateStr, timeIndex, gender, isLeapMonth, fixLeap, language, astroType, config: cfg } = option;

  if (cfg) {
    config(cfg);
  }

  let result: T;

  if (type === 'solar') {
    result = bySolar<T>(dateStr, timeIndex, gender, fixLeap, language);
  } else {
    result = byLunar<T>(dateStr, timeIndex, gender, isLeapMonth, fixLeap, language);
  }

  switch (astroType) {
    case 'earth': {
      // 以身宫干支起五行局重排，身宫为命宫
      const bodyPalace = result.palace('身宫');
      const { heavenlyStem, earthlyBranch } = bodyPalace!;

      return rearrangeAstrolable({ from: { heavenlyStem, earthlyBranch }, astrolable: result, option });
    }
    case 'human': {
      // 以福德宫干支起五行局重排，福德宫为命宫
      const bodyPalace = result.palace('福德');
      const { heavenlyStem, earthlyBranch } = bodyPalace!;

      return rearrangeAstrolable({ from: { heavenlyStem, earthlyBranch }, astrolable: result, option });
    }
    default: {
      // 直接返回天盘
      return result;
    }
  }
}

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

  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0, {
    year: getConfig().yearDivide,
  });

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

  const { bodyIndex } = getSoulAndBody({ solarDate: solarDateStr, timeIndex, fixLeap });
  const majorStars = getMajorStar({ solarDate: solarDateStr, timeIndex, fixLeap });
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
