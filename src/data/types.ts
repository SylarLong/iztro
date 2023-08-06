import { EARTHLY_BRANCHES, HEAVENLY_STEMS, PALACES } from './constants';

export type Gender = '男' | '女';
export type YinYang = '阴' | '阳';
export type FiveElements = '木' | '金' | '水' | '火' | '土';
export type StarBrightness = '庙' | '旺' | '利' | '得' | '平' | '不' | '陷';
export type EarthlyBranch = (typeof EARTHLY_BRANCHES)[number];
export type HeavenlyStem = (typeof HEAVENLY_STEMS)[number];
export type PalaceName = (typeof PALACES)[number];

/**
 * 紫微斗数星耀
 */
export type Star = {
  /** 星耀名字 */
  name: string;
  /** 星耀类型（主星 | 吉星 | 煞星 | 杂耀） */
  type: 'primary' | 'soft' | 'tough' | 'other';
  /** 作用范围（本命盘 | 大限盘 | 流年盘） */
  scope: 'origin' | 'stage' | 'yearly';
};

/**
 * 五行局，用于定紫微星和算起运年龄
 * 几局就从几岁（虚岁）开始起运
 * 比如 木三局 就从3岁开始起运
 */
export enum FiveElementsClass {
  水二局 = 2,
  木三局,
  金四局,
  土五局,
  火六局,
}

export type FiveElementsClassItem = keyof typeof FiveElementsClass;

export type LunarDate = {
  /** 农历年 */
  lunarYear: number;
  /** 农历月 */
  lunarMonth: number;
  /** 农历日 */
  lunarDay: number;
  /** 是否闰月 */
  isLeap: boolean;
  /**
   * 转化为字符串
   *
   * @param toCnStr 是否使用中文字符串, 若该参数为false则字符串中不会携带闰月信息
   * @returns string
   * @example
   * lunarYear = 2023;
   * lunarMonth = 6;
   * lunarDay = 12;
   * isLeap = true;
   *
   * toString(); // 2023-6-12
   * toString(true); // 二〇二三年(闰)二月十一
   */
  toString: (toCnStr?: boolean) => string;
};

export type SolarDate = {
  /** 公历年 */
  solarYear: number;
  /** 公历月 */
  solarMonth: number;
  /** 公历日 */
  solarDay: number;
  /**
   * 转化为字符串
   *
   * @returns string
   * @example
   * solarYear = 2023;
   * solarMonth = 6;
   * solarDay = 12;
   *
   * toString(); // 2023-6-12
   */
  toString: () => string;
};

export type HeavenlyStemAndEarthlyBranch = [HeavenlyStem, EarthlyBranch];

export type HeavenlyStemAndEarthlyBranchResult = {
  /** 年柱[天干，地支] */
  yearly: HeavenlyStemAndEarthlyBranch;
  /** 月柱[天干，地支] */
  monthly: HeavenlyStemAndEarthlyBranch;
  /** 日柱[天干，地支] */
  daily: HeavenlyStemAndEarthlyBranch;
  /** 时柱[天干，地支] */
  timely: HeavenlyStemAndEarthlyBranch;
  /**
   * 获取四柱的字符串
   *
   * @returns 四柱字符串，用空格隔开
   * @example
   * yearly = ['癸', '卯'];
   * monthly = ['戊', '午'];
   * daily = ['癸', '亥'];
   * timely = ['甲', '寅'];
   * toString(); // 癸卯 戊午 癸亥 甲寅
   */
  toString: () => string;
};

export type SoulAndBody = {
  /** 命宫索引 */
  soulIndex: number;
  /** 身宫索引 */
  bodyIndex: number;
  /** 命宫天干 */
  heavenlyStemOfSoul: HeavenlyStem;
  /** 命宫地支 */
  earthlyBranchOfSoul: EarthlyBranch;
};
