import { EARTHLY_BRANCHES, HEAVENLY_STEMS } from './constants';

/**
 * 十二地支信息
 * 其中包含：
 * 1. 阴阳（yinYang）
 * 2. 五行（fiveElements）
 * 3. 六冲（crash）
 * 4. 紫微斗数命主（soul）
 * 5. 紫微斗数身主（body）
 * 6. 身体部位【内】（inside）
 * 7. 身体部位【外】（outside）
 * 8. 健康提示（healthTip）
 */
export type EarthlyBranch = {
  [key in (typeof EARTHLY_BRANCHES)[number]]: {
    /** 阴阳 */
    yinYang: string;
    /** 五行 */
    fiveElements: string;
    /**
     * 六冲
     * - 子午相冲
     * - 丑未相冲
     * - 寅申相冲
     * - 卯酉相冲
     * - 辰戌相冲
     * - 巳亥相冲
     */
    crash: string;
    /**
     * 命主
     * - 命主以命宫所在宫位地支定之
     */
    soul: string;
    /**
     * 身主
     * - 身主以生年年支定之
     */
    body: string;
    /** 身体部位【内】 */
    inside: string;
    /** 身体部位【外】 */
    outside: string;
    /** 健康提示 */
    healthTip: string;
  };
};

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

export type HeavenlyStemAndEarthlyBranch = [(typeof HEAVENLY_STEMS)[number], (typeof EARTHLY_BRANCHES)[number]];

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
  heavenlyStemOfSoul: (typeof HEAVENLY_STEMS)[number];
  /** 命宫地支 */
  earthlyBranchOfSoul: (typeof EARTHLY_BRANCHES)[number];
};