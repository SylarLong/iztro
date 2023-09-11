/** 支持的语言 */
export const LANGUAGES = ['en-US', 'ja-JP', 'ko-KR', 'zh-CN', 'zh-TW', 'vi-VN'];

/** 十天干 */
export const HEAVENLY_STEMS = [
  'jiaHeavenly',
  'yiHeavenly',
  'bingHeavenly',
  'dingHeavenly',
  'wuHeavenly',
  'jiHeavenly',
  'gengHeavenly',
  'xinHeavenly',
  'renHeavenly',
  'guiHeavenly',
] as const;

/** 十二地支 */
export const EARTHLY_BRANCHES = [
  'ziEarthly',
  'chouEarthly',
  'yinEarthly',
  'maoEarthly',
  'chenEarthly',
  'siEarthly',
  'wuEarthly',
  'weiEarthly',
  'shenEarthly',
  'youEarthly',
  'xuEarthly',
  'haiEarthly',
] as const;

/** 十二生肖（按地支顺序） */
export const ZODIAC = [
  'rat',
  'ox',
  'tiger',
  'rabbit',
  'dragon',
  'snake',
  'horse',
  'sheep',
  'monkey',
  'rooster',
  'dog',
  'pig',
] as const;

/** 紫微斗数十二宫名称 */
export const PALACES = [
  'soulPalace',
  'parentsPalace',
  'spiritPalace',
  'propertyPalace',
  'careerPalace',
  'friendsPalace',
  'surfacePalace',
  'healthPalace',
  'wealthPalace',
  'childrenPalace',
  'spousePalace',
  'siblingsPalace',
] as const;

/** 性别对应阴阳，男为阳，女为阴 */
export const GENDER = {
  male: '阳',
  female: '阴',
} as const;

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
  water2nd = 2,
  wood3rd,
  metal4th,
  earth5th,
  fire6th,
}

/**
 * 时辰, 子时分早晚。
 * 其中 00:00-01:00 为早子时，23:00-00:00 为晚子时
 */
export const CHINESE_TIME = [
  'earlyRatHour', // : '00:00~01:00',
  'oxHour', // : '01:00~03:00',
  'tigerHour', // : '03:00~05:00',
  'rabbitHour', // : '05:00~07:00',
  'dragonHour', // : '07:00~09:00',
  'snakeHour', // : '09:00~11:00',
  'horseHour', // : '11:00~13:00',
  'goatHour', // : '13:00~15:00',
  'monkeyHour', // : '15:00~17:00',
  'roosterHour', // : '17:00~19:00',
  'dogHour', // : '19:00~21:00',
  'pigHour', // : '21:00~23:00',
  'lateRatHour', // : '23:00~00:00',
] as const;

/** 时辰序号所对应的时间段，与 `CHINESE_TIME` 一一对应 */
export const TIME_RANGE = [
  '00:00~01:00',
  '01:00~03:00',
  '03:00~05:00',
  '05:00~07:00',
  '07:00~09:00',
  '09:00~11:00',
  '11:00~13:00',
  '13:00~15:00',
  '15:00~17:00',
  '17:00~19:00',
  '19:00~21:00',
  '21:00~23:00',
  '23:00~00:00',
] as const;

/**
 * 五虎遁 从年干算月干。
 *
 * “五虎遁元”年上起月法，简称 `五虎遁`。
 * 因为正月建寅，所以正月的地支为寅，寅属虎，所以叫五虎盾。
 *
 * - 甲己之年丙作首
 * - 乙庚之岁戊为头
 * - 丙辛必定寻庚起
 * - 丁壬壬位顺行流
 * - 若问戊癸何方发
 * - 甲寅之上好追求
 */
export const TIGER_RULE = {
  jiaHeavenly: 'bingHeavenly',
  yiHeavenly: 'wuHeavenly',
  bingHeavenly: 'gengHeavenly',
  dingHeavenly: 'renHeavenly',
  wuHeavenly: 'jiaHeavenly',
  jiHeavenly: 'bingHeavenly',
  gengHeavenly: 'wuHeavenly',
  xinHeavenly: 'gengHeavenly',
  renHeavenly: 'renHeavenly',
  guiHeavenly: 'jiaHeavenly',
} as const;

/**
 * 五鼠遁 以日干算时干。
 *
 * “五鼠遁元”日上起时法，简称 `五鼠遁`。
 * 因为日支全部以“子”时打头来排列的，子为鼠，所以叫五鼠遁。
 *
 * - 甲己还加甲，乙庚丙作初。
 * - 丙辛从戊起，丁壬庚子居。
 * - 戊癸起壬子，周而复始求。
 */
export const RAT_RULE = {
  jiaHeavenly: 'jiaHeavenly',
  yiHeavenly: 'bingHeavenly',
  bingHeavenly: 'wuHeavenly',
  dingHeavenly: 'gengHeavenly',
  wuHeavenly: 'renHeavenly',
  jiHeavenly: 'jiaHeavenly',
  gengHeavenly: 'bingHeavenly',
  xinHeavenly: 'wuHeavenly',
  renHeavenly: 'gengHeavenly',
  guiHeavenly: 'renHeavenly',
} as const;
