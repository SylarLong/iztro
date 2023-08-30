import { EarthlyBranchName, HeavenlyStemName } from '../../i18n';

/**
 * 农历日期对象
 *
 * @property
 * - lunarYear 年
 * - lunarMonth 月
 * - lunarDay 日
 * - isLeap 月份是否闰月
 *
 * @function toString() 输出 YYYY-M-D 或 农历中文 字符串
 */
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

/**
 * 阳历日期对象
 *
 * @property
 * - solarYear 年
 * - solarMonth 月
 * - solarDay 日
 *
 * @function toString() 将对象以 YYYY-M-D 格式字符串输出
 */
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

/** [天干，地支] */
export type HeavenlyStemAndEarthlyBranch = [HeavenlyStemName, EarthlyBranchName];

/**
 * 干支纪年日期对象
 *
 * @property
 * - yearly 年柱[天干，地支]
 * - monthly 月柱[天干，地支]
 * - monthly 月柱[天干，地支]
 * - daily 日柱[天干，地支]
 * - hourly 时柱[天干，地支]
 *
 * @function toString() 将对象以干支纪年字符串输出
 */
export type HeavenlyStemAndEarthlyBranchDate = {
  /** 年柱[天干，地支] */
  yearly: HeavenlyStemAndEarthlyBranch;
  /** 月柱[天干，地支] */
  monthly: HeavenlyStemAndEarthlyBranch;
  /** 日柱[天干，地支] */
  daily: HeavenlyStemAndEarthlyBranch;
  /** 时柱[天干，地支] */
  hourly: HeavenlyStemAndEarthlyBranch;
  /**
   * 获取四柱的字符串
   *
   * @returns 四柱字符串，用空格隔开
   * @example
   * yearly = ['癸', '卯'];
   * monthly = ['戊', '午'];
   * daily = ['癸', '亥'];
   * hourly = ['甲', '寅'];
   * toString(); // 癸卯 戊午 癸亥 甲寅
   */
  toString: () => string;
};
