import { CHINESE_TIME, LANGUAGES, TIME_RANGE } from './constants';
import {
  Brightness,
  EarthlyBranchName,
  FiveElementsClassName,
  HeavenlyStemName,
  Mutagen,
  PalaceName,
  StarName,
} from '../i18n';

/** 支持的语言 */
export type Language = (typeof LANGUAGES)[number];

/** 性别 */
export type Gender = '男' | '女';

/** 阴阳 */
export type YinYang = '阴' | '阳';

/** 五行 */
export type FiveElements = '木' | '金' | '水' | '火' | '土';

/** 时辰，子时分早晚 */
export type ChineseTime = (typeof CHINESE_TIME)[number];

/** 时辰对应的时间段 */
export type TimeRange = (typeof TIME_RANGE)[number];

/** 范围：本命｜大限｜流年 */
export type Scope = 'origin' | 'decadal' | 'yearly';

/** 星耀类型 */
export type StarType = 'major' | 'soft' | 'tough' | 'adjective' | 'flower' | 'helper' | 'lucun' | 'tianma';

/**
 * 紫微斗数星耀
 *
 * @property
 * - name 星耀名字
 * - type 星耀类型
 * - scope 作用范围
 * - brightness 星耀亮度
 * - mutagen 四化
 */
export type Star = {
  /** 星耀名字 */
  name: StarName;
  /** 星耀类型（主星 | 吉星 | 煞星 | 杂耀 | 桃花星 | 解神 | 禄存 | 天马） */
  type: StarType;
  /** 作用范围（本命盘 | 大限盘 | 流年盘） */
  scope: Scope;
  /** 星耀亮度，若没有亮度数据则此字段为`空字符串`或者 `undefined` */
  brightness?: Brightness;
  /** 四化，若未产生四化则此字段为 `undefined` */
  mutagen?: Mutagen;
};

/**
 * 五行局，用于定紫微星和算起运年龄
 * 几局就从几岁（虚岁）开始起运
 * 比如 木三局 就从3岁开始起运
 *
 * @enum
 *  - 2 水二局
 *  - 3 木三局
 *  - 4 金四局
 *  - 5 土五局
 *  - 6 火六局
 */
export enum FiveElementsClass {
  水二局 = 2,
  木三局,
  金四局,
  土五局,
  火六局,
}

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
 * - timely 时柱[天干，地支]
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

/**
 * 命宫、身宫对象
 *
 * @property
 * - soulIndex 命宫索引
 * - bodyIndex 身宫索引
 * - heavenlyStemOfSoul 命宫天干
 * - earthlyBranchOfSoul 命宫地支
 */
export type SoulAndBody = {
  /** 命宫索引 */
  soulIndex: number;
  /** 身宫索引 */
  bodyIndex: number;
  /** 命宫天干 */
  heavenlyStemOfSoul: HeavenlyStemName;
  /** 命宫地支 */
  earthlyBranchOfSoul: EarthlyBranchName;
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
 * 宫位对象
 *
 * @property
 * - name 宫位名称
 * - isBodyPalace 是否身宫
 * - isOriginalPalace 是否来因宫
 * - heavenlyStem 宫位天干
 * - earthlyBranch 宫位地支
 * - majorStars 主星
 * - minorStars 辅星
 * - adjectiveStars 杂耀
 * - changsheng12 长生12神之一
 * - boshi12 博士12神之一
 * - jiangqian12 将前12神之一
 * - suiqian12 岁前12神之一
 * - decadal 大限
 * - ages 小限
 */
export type Palace = {
  /** 宫位名称 */
  name: PalaceName;
  /** 是否身宫 */
  isBodyPalace: boolean;
  /** 是否来因宫 */
  isOriginalPalace: boolean;
  /** 宫位天干 */
  heavenlyStem: HeavenlyStemName;
  /** 宫位地支 */
  earthlyBranch: EarthlyBranchName;
  /** 主星 */
  majorStars: Star[];
  /** 辅星 */
  minorStars: Star[];
  /** 杂耀 */
  adjectiveStars: Star[];
  /** 长生12神 */
  changsheng12: StarName;
  /** 博士12神 */
  boshi12: StarName;
  /** 流年将前12神 */
  jiangqian12: StarName;
  /** 流年岁前12神 */
  suiqian12: StarName;
  /** 大限 */
  decadal: Decadal;
  /** 小限 */
  ages: number[];
};

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
  };
  /** 流年 */
  yearly: HoroscopeItem;
  /** 流月 */
  monthly: HoroscopeItem;
  /** 流日 */
  daily: HoroscopeItem;
  /** 流时 */
  timely: HoroscopeItem;
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
 * @function horoscope() 获取运限数据
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
  time: ChineseTime;
  /** 时辰对应的时间段 */
  timeRange: TimeRange;
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
  palaces: Palace[];

  /**
   * 获取运限数据
   *
   * @version v0.2.0
   *
   * @param date 阳历日期【可选】，默认为调用时的日期
   * @param timeIndex 时辰索引【可选】，默认会自动读取当前时间的时辰
   * @returns 运限数据
   */
  horoscope: (date?: string | Date, timeIndex?: number) => Horoscope;
};
