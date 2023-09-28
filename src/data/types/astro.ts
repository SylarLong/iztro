import { IFunctionalPalace } from '../../astro/FunctionalPalace';
import { EarthlyBranchName, FiveElementsClassName, HeavenlyStemName, PalaceName, StarName } from '../../i18n';
import { HeavenlyStemAndEarthlyBranchDate, LunarDate } from './calendar';
import { Star } from './star';

/**
 * 运限对象
 *
 * @property
 * - index 所在宫位的索引
 * - heavenlyStem 该运限天干
 * - palaceNames 该运限的十二宫
 * - mutagen 四化星
 * - stars 流耀
 */
export type HoroscopeItem = {
  /** 所在宫位的索引 */
  index: number;
  /** 运限名称 */
  name: string;
  /** 该运限天干 */
  heavenlyStem: HeavenlyStemName;
  /** 该运限地支 */
  earthlyBranch: EarthlyBranchName;
  /** 该运限的十二宫 */
  palaceNames: PalaceName[];
  /** 四化星 */
  mutagen: StarName[];
  /** 流耀 */
  stars?: Star[][];
};

/**
 * 大限
 *
 * @property
 * - range 大限起止年龄 [起始年龄, 截止年龄]
 * - heavenlyStem 大限天干
 * - earthlyBranch 大限地支
 */
export type Decadal = {
  /** 大限起止年龄 [起始年龄, 截止年龄] */
  range: [number, number];
  /** 大限天干 */
  heavenlyStem: HeavenlyStemName;
  /** 大限地支 */
  earthlyBranch: EarthlyBranchName;
};

/**
 * 运限
 *
 * @property
 * - lunarDate 农历日期
 * - solarDate 阳历日期
 * - decadal 大限
 * - age 小限
 * - yearly 流年
 * - monthly 流月
 * - daily 流日
 */
export type Horoscope = {
  /** 农历日期 */
  lunarDate: string;
  /** 阳历日期 */
  solarDate: string;
  /** 大限 */
  decadal: HoroscopeItem;
  /**
   * 小限
   *
   * @property
   * - index 小限所在宫位索引
   * - nominalAge 虚岁
   */
  age: {
    /** 小限所在宫位索引 */
    index: number;
    /** 虚岁 */
    nominalAge: number;
    /** 名称 */
    name: string;
  };
  /** 流年 */
  yearly: HoroscopeItem & { yearlyDecStar: { jiangqian12: StarName[]; suiqian12: StarName[] } };
  /** 流月 */
  monthly: HoroscopeItem;
  /** 流日 */
  daily: HoroscopeItem;
  /** 流时 */
  hourly: HoroscopeItem;
};

/**
 * 星盘对象
 *
 * @property
 * - solarDate 阳历日期
 * - lunarDate 农历日期
 * - chineseDate 干支纪年日期
 * - time 时辰
 * - timeRange 时辰对应的时间段
 * - sign 星座
 * - zodiac 生肖
 * - earthlyBranchOfSoulPalace 命宫地支
 * - earthlyBranchOfBodyPalace 身宫地支
 * - soul 命主
 * - body 身主
 * - palaces 十二宫数据
 *
 * @function
 * - horoscope() 获取运限数据
 * - palace() 获取宫位数据
 */
export type Astrolabe = {
  /** 阳历日期 */
  solarDate: string;
  /** 农历日期 */
  lunarDate: string;
  /** 干支纪年日期 */
  chineseDate: string;
  /**
   * 原始日期数据，用于今后内部方法使用
   *
   * @property
   * - lunar 农历日期对象
   * - chinese 干支纪年日期对象
   */
  rawDates: {
    /** 农历日期对象 */
    lunarDate: LunarDate;
    /** 干支纪年日期对象 */
    chineseDate: HeavenlyStemAndEarthlyBranchDate;
  };
  /** 时辰 */
  time: string;
  /** 时辰对应的时间段 */
  timeRange: string;
  /** 星座 */
  sign: string;
  /** 生肖 */
  zodiac: string;
  /** 命宫地支 */
  earthlyBranchOfSoulPalace: EarthlyBranchName;
  /** 身宫地支 */
  earthlyBranchOfBodyPalace: EarthlyBranchName;
  /** 命主 */
  soul: StarName;
  /** 身主 */
  body: StarName;
  /** 五行局 */
  fiveElementsClass: FiveElementsClassName;
  /** 十二宫数据 */
  palaces: IFunctionalPalace[];
};
