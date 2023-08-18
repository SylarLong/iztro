import { BIRTH_TIME, EARTHLY_BRANCHES, HEAVENLY_STEMS, MUTAGEN, PALACES, TIME_RANGE } from './constants';

export type Gender = '男' | '女';
export type YinYang = '阴' | '阳';
export type Mutagen = (typeof MUTAGEN)[number];
export type FiveElements = '木' | '金' | '水' | '火' | '土';
export type StarBrightness = '' | '庙' | '旺' | '利' | '得' | '平' | '不' | '陷';
export type EarthlyBranch = (typeof EARTHLY_BRANCHES)[number];
export type HeavenlyStem = (typeof HEAVENLY_STEMS)[number];
export type PalaceName = (typeof PALACES)[number];
export type BirthTime = (typeof BIRTH_TIME)[number];
export type TimeRange = (typeof TIME_RANGE)[number];
export type Scope = 'origin' | 'decadal' | 'yearly';
export type StarType = 'major' | 'soft' | 'tough' | 'adjective' | 'flower' | 'helper' | 'lucun' | 'tianma';

/**
 * 紫微斗数星耀
 */
export type Star = {
  /** 星耀名字 */
  name: string;
  /** 星耀类型（主星 | 吉星 | 煞星 | 杂耀 | 桃花星 | 解神 | 禄存 | 天马） */
  type: StarType;
  /** 作用范围（本命盘 | 大限盘 | 流年盘） */
  scope: Scope;
  /** 星耀亮度 */
  brightness?: StarBrightness;
  /** 四化 */
  mutagen?: Mutagen;
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

export type Decadal = {
  /** 大限起止年龄 [起始年龄, 截止年龄] */
  range: number[];
  /** 大限天干 */
  heavenlyStem: HeavenlyStem;
  /** 大限地支 */
  earthlyBranch: EarthlyBranch;
};

export type Palace = {
  /** 宫名 */
  name: PalaceName;
  /** 是否身宫 */
  isBodyPalace: boolean;
  /** 是否来因宫 */
  isOriginalPalace: boolean;
  /** 宫位天干 */
  heavenlyStem: HeavenlyStem;
  /** 宫位地支 */
  earthlyBranch: EarthlyBranch;
  /** 主星 */
  majorStars: Star[];
  /** 辅星 */
  minorStars: Star[];
  /** 杂耀 */
  adjectiveStars: Star[];
  /** 长生12神 */
  changsheng12: string;
  /** 博士12神 */
  boshi12: string;
  /** 流年将前12神 */
  jiangqian12: string;
  /** 流年岁前12神 */
  suiqian12: string;
  /** 大限 */
  decadal: Decadal;
  /** 小限 */
  ages: number[];
};

export type Astrolabe = {
  /** 阳历日期 */
  solarDate: string;
  /** 农历日期 */
  lunarDate: string;
  /** 四柱 */
  chineseDate: string;
  /** 时辰 */
  time: BirthTime;
  /** 时辰对应的时间段 */
  timeRange: TimeRange;
  /** 星座 */
  sign: string;
  /** 生肖 */
  zodiac: string;
  /** 命宫地支 */
  earthlyBranchOfSoulPalace: EarthlyBranch;
  /** 身宫地支 */
  earthlyBranchOfBodyPalace: EarthlyBranch;
  /** 命主 */
  soul: string;
  /** 身主 */
  body: string;
  /** 五行局 */
  fiveElementsClass: FiveElementsClassItem;
  /** 十二宫数据 */
  palaces: Palace[];
};
