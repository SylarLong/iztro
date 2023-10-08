import { CHINESE_TIME, LANGUAGES, TIME_RANGE } from '../constants';

/** 支持的语言 */
export type Language = (typeof LANGUAGES)[number];

/** 阴阳 */
export type YinYang = '阴' | '阳';

/** 五行 */
export type FiveElements = '木' | '金' | '水' | '火' | '土';

/** 时辰，子时分早晚 */
export type ChineseTime = (typeof CHINESE_TIME)[number];

/** 时辰对应的时间段 */
export type TimeRange = (typeof TIME_RANGE)[number];

/** 范围：本命｜大限｜流年|流月|流日|流时 */
export type Scope = 'origin' | 'decadal' | 'yearly' | 'monthly' | 'daily' | 'hourly';

/** 星耀类型 */
export type StarType = 'major' | 'soft' | 'tough' | 'adjective' | 'flower' | 'helper' | 'lucun' | 'tianma';
