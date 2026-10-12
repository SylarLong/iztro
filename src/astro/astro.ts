import { getHeavenlyStemAndEarthlyBranchBySolarDate, getSign, getZodiac, lunar2solar, solar2lunar } from 'lunar-lite';
import type { LunarDate } from 'lunar-lite/lib/types';
import { CHINESE_TIME, EARTHLY_BRANCHES, HEAVENLY_STEMS, TIME_RANGE, earthlyBranches } from '../data';
import { Language, Option, Plugin } from '../data/types';
import {
  EarthlyBranchKey,
  EarthlyBranchName,
  GenderName,
  getLanguage,
  HeavenlyStemKey,
  HeavenlyStemName,
  StarName,
  kot,
  withLanguage,
  t,
} from '../i18n';
import {
  getAdjectiveStar,
  getBoShi12,
  getchangsheng12,
  getMajorStar,
  getMinorStar,
  getTianshiTianshangIndex,
  getYearly12,
} from '../star';
import { fixIndex, translateChineseDate } from '../utils';
import FunctionalAstrolabe from './FunctionalAstrolabe';
import FunctionalPalace, { IFunctionalPalace } from './FunctionalPalace';
import { getPalaceNames, getSoulAndBody, getHoroscope, getFiveElementsClass } from './palace';
import FunctionalStar from '../star/FunctionalStar';
import { getConfig, resolveConfig, withConfig } from './config';
import { bindContext } from './context';
import { validateDate, validateTimeIndex, validateGender, validateBoolean } from '../utils/validation';

const _plugins = [] as Plugin[];
/**
 * 按当前排盘语言格式化农历日期。
 *
 * @internal
 * @version 2.6.2
 */
const formatLunarDate = (lunarDate: LunarDate): string => {
  const language = getLanguage();
  if (language === 'zh-CN' || language === 'zh-TW') {
    return lunarDate.toString(true);
  }

  return t<string>('lunarDate', {
    year: lunarDate.lunarYear,
    month: lunarDate.lunarMonth,
    day: lunarDate.lunarDay,
    leapMonth: lunarDate.isLeap ? t<string>('leapMonth') : '',
  });
};

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

export { config, getConfig, resetConfig } from './config';

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
  validateDate(solarDate);
  validateTimeIndex(timeIndex);
  validateGender(gender);
  validateBoolean(fixLeap, 'fixLeap');
  return withLanguage(language ?? 'zh-CN', () => {
    const palaces: IFunctionalPalace[] = [];
    const { dayDivide } = getConfig();
    let tIndex = timeIndex;

    if (dayDivide === 'current' && tIndex >= 12) {
      // 如果当前时辰为晚子时并且晚子时算当天时，将时辰调整为当日早子时
      tIndex = 0;
    }

    const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDate, tIndex, {
      year: getConfig().yearDivide,
      month: getConfig().horoscopeDivide,
    });
    const earthlyBranchOfYear = kot<EarthlyBranchKey>(yearly[1], 'Earthly');
    const heavenlyStemOfYear = kot<HeavenlyStemKey>(yearly[0], 'Heavenly');
    const { bodyIndex, soulIndex, heavenlyStemOfSoul, earthlyBranchOfSoul } = getSoulAndBody({
      solarDate,
      timeIndex: tIndex,
      fixLeap,
    });
    const palaceNames = getPalaceNames(soulIndex);
    const majorStars = getMajorStar({ solarDate, timeIndex: tIndex, fixLeap });
    const minorStars = getMinorStar(solarDate, tIndex, fixLeap);
    const adjectiveStars = getAdjectiveStar({
      solarDate,
      timeIndex: tIndex,
      gender,
      fixLeap,
    });
    const changsheng12 = getchangsheng12({
      solarDate,
      timeIndex: tIndex,
      gender,
      fixLeap,
    });
    const boshi12 = getBoShi12(solarDate, gender);
    const { jiangqian12, suiqian12 } = getYearly12(solarDate);
    const { decadals, ages } = getHoroscope({ solarDate, timeIndex: tIndex, gender, fixLeap });

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
            !['ziEarthly', 'chouEarthly'].includes(earthlyBranchOfPalace) &&
            heavenlyStemOfPalace === heavenlyStemOfYear,
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

    const chineseDate = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDate, tIndex, {
      year: getConfig().yearDivide,
      month: getConfig().horoscopeDivide,
    });
    const lunarDate = solar2lunar(solarDate);

    // 中州派地支以年支找命主
    // 通用派别以命宫地支找命主
    const soul = t<StarName>(
      earthlyBranches[getConfig().algorithm === 'zhongzhou' ? earthlyBranchOfYear : earthlyBranchOfSoulPalace].soul,
    );

    const result = new FunctionalAstrolabe({
      gender: t(kot<GenderName>(gender)),
      solarDate,
      lunarDate: formatLunarDate(lunarDate),
      chineseDate: translateChineseDate(chineseDate),
      rawDates: { lunarDate, chineseDate },
      time: t(CHINESE_TIME[timeIndex]),
      timeRange: TIME_RANGE[timeIndex],
      sign: getSignBySolarDate(solarDate, language),
      zodiac: getZodiacBySolarDate(solarDate, language),
      earthlyBranchOfSoulPalace: t<EarthlyBranchName>(earthlyBranchOfSoulPalace),
      earthlyBranchOfBodyPalace,
      soul,
      body: t(earthlyBranches[earthlyBranchOfYear].body),
      fiveElementsClass: getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul),
      palaces,
      copyright: `copyright © 2023-${new Date().getFullYear()} iztro (https://github.com/SylarLong/iztro)`,
    });

    bindContext(result);
    _plugins.map((plugin) => result.use(plugin));

    return result as T;
  });
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
  validateDate(lunarDateStr, 'lunar', isLeapMonth);
  validateTimeIndex(timeIndex);
  validateGender(gender);
  validateBoolean(isLeapMonth, 'isLeapMonth');
  validateBoolean(fixLeap, 'fixLeap');
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
  const { dayDivide } = getConfig();
  let tIndex = timeIndex;

  if (dayDivide === 'current' && tIndex >= 12) {
    // 如果当前时辰为晚子时并且晚子时算当天时，将时辰调整为当日早子时
    tIndex = 0;
  }

  // 以传入地支为命宫
  const { soulIndex, bodyIndex } = getSoulAndBody({
    solarDate: astrolable.solarDate,
    timeIndex: tIndex,
    fixLeap,
    from,
  });
  const fiveElementsClass = getFiveElementsClass(from.heavenlyStem, from.earthlyBranch);
  const palaceNames = getPalaceNames(soulIndex);
  const majorStars = getMajorStar({ solarDate: astrolable.solarDate, timeIndex: tIndex, fixLeap, from });
  const changsheng12 = getchangsheng12({
    solarDate: astrolable.solarDate,
    gender: astrolable.gender as GenderName,
    timeIndex: tIndex,
    fixLeap,
    from,
  });
  const { decadals, ages } = getHoroscope({
    solarDate: astrolable.solarDate,
    timeIndex: tIndex,
    gender: astrolable.gender as GenderName,
    fixLeap,
    from,
  });

  astrolable.fiveElementsClass = fiveElementsClass;

  // 重新获取天使、天伤的索引
  const { tianshiIndex, tianshangIndex } = getTianshiTianshangIndex(
    astrolable.gender as GenderName,
    kot(astrolable.rawDates.chineseDate.yearly[1]) as EarthlyBranchKey,
    soulIndex,
  );
  // 重新获取天才星的位置
  const tiancaiIndex = fixIndex(
    soulIndex + EARTHLY_BRANCHES.indexOf(kot(astrolable.rawDates.chineseDate.yearly[1]) as EarthlyBranchKey),
  );

  astrolable.palaces.forEach((palace, i) => {
    const _tianshangIdx = palace.adjectiveStars.findIndex((item) => kot(item.name) === 'tianshang');

    if (_tianshangIdx !== -1 && tianshangIndex !== i) {
      // 当天伤不应该在该宫位时，删之
      palace.adjectiveStars.splice(_tianshangIdx, 1);
    }

    if (_tianshangIdx === -1 && tianshangIndex === i) {
      // 当天伤应该在该宫位却不在，加之
      palace.adjectiveStars.push(new FunctionalStar({ name: t('tianshang'), type: 'adjective', scope: 'origin' }));
    }

    const _tianshiIdx = palace.adjectiveStars.findIndex((item) => kot(item.name) === 'tianshi');

    if (_tianshiIdx !== -1 && tianshiIndex !== i) {
      // 当天使不应该在该宫位时，删之
      palace.adjectiveStars.splice(_tianshiIdx, 1);
    }

    if (_tianshiIdx === -1 && tianshiIndex === i) {
      // 当天使应该在该宫位却不在，加之
      palace.adjectiveStars.push(new FunctionalStar({ name: t('tianshi'), type: 'adjective', scope: 'origin' }));
    }

    const _tiancaiIndex = palace.adjectiveStars.findIndex((item) => kot(item.name) === 'tiancai');

    if (_tiancaiIndex !== -1 && tiancaiIndex !== i) {
      // 当天才不应该在该宫位时，删之
      palace.adjectiveStars.splice(_tiancaiIndex, 1);
    }

    if (_tiancaiIndex === -1 && tiancaiIndex === i) {
      // 当天才应该在该宫位却不在，加之
      palace.adjectiveStars.push(new FunctionalStar({ name: t('tiancai'), type: 'adjective', scope: 'origin' }));
    }

    palace.name = palaceNames[i];
    palace.majorStars = majorStars[i];
    palace.changsheng12 = changsheng12[i];
    palace.decadal = decadals[i];
    palace.ages = ages[i];
    palace.isBodyPalace = bodyIndex === i;
  });

  astrolable.earthlyBranchOfSoulPalace = t(astrolable.palace('命宫')!.earthlyBranch);

  return astrolable;
}

/**
 * 获取排盘信息。
 * config 只覆盖当前星盘，不改变全局默认配置。
 * 返回的星盘及其运限查询保留生成时的配置和语言。
 *
 * @param param0 排盘参数
 * @returns 星盘信息
 */
export function withOptions<T extends FunctionalAstrolabe>(option: Option): T {
  const { type = 'solar', dateStr, timeIndex, gender, isLeapMonth, fixLeap, language, astroType, config: cfg } = option;

  if (!['solar', 'lunar'].includes(type)) throw new Error('invalid date type.');
  if (astroType !== undefined && !['heaven', 'earth', 'human'].includes(astroType))
    throw new Error('invalid astroType.');
  return withConfig(resolveConfig(cfg), () =>
    withLanguage(language ?? 'zh-CN', () => {
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
    }),
  );
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
  validateDate(solarDateStr);
  return withLanguage(language ?? 'zh-CN', () => {
    const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0, {
      year: getConfig().yearDivide,
    });

    return t(kot(getZodiac(yearly[1])));
  });
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
  validateDate(solarDateStr);
  return withLanguage(language ?? 'zh-CN', () => {
    return t(kot(getSign(solarDateStr)));
  });
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
  validateDate(lunarDateStr, 'lunar', isLeapMonth);
  if (isLeapMonth !== undefined) validateBoolean(isLeapMonth, 'isLeapMonth');
  return withLanguage(language ?? 'zh-CN', () => {
    const solarDate = lunar2solar(lunarDateStr, isLeapMonth);

    return getSignBySolarDate(solarDate.toString(), language);
  });
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
  validateDate(solarDateStr);
  validateTimeIndex(timeIndex);
  validateBoolean(fixLeap, 'fixLeap');
  return withLanguage(language ?? 'zh-CN', () => {
    const { soulIndex } = getSoulAndBody({ solarDate: solarDateStr, timeIndex, fixLeap });
    const majorStars = getMajorStar({ solarDate: solarDateStr, timeIndex, fixLeap });
    const stars = majorStars[soulIndex].filter((star) => star.type === 'major');

    if (stars.length) {
      return stars.map((star) => t(star.name)).join(',');
    }

    // 如果命宫为空宫，则借对宫主星
    return majorStars[fixIndex(soulIndex + 6)]
      .filter((star) => star.type === 'major')
      .map((star) => t(star.name))
      .join(',');
  });
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
  validateDate(lunarDateStr, 'lunar', isLeapMonth);
  validateBoolean(isLeapMonth, 'isLeapMonth');
  const solarDate = lunar2solar(lunarDateStr, isLeapMonth);

  return getMajorStarBySolarDate(solarDate.toString(), timeIndex, fixLeap, language);
};
