import { getLeapDays } from './leap';
import { LUNAR_INFO, SOLAR_MONTH } from './rules';

/**
 * 返回农历年一整年的总天数
 *
 * @param year 农历年份
 * @return number
 * @example
 * count = getTotalDaysOfLunarYear(1987) ;//count=387
 */
export const getTotalDaysOfLunarYear = (year: number) => {
  let sum = 348;

  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += LUNAR_INFO[year - 1900] & i ? 1 : 0;
  }

  return sum + getLeapDays(year);
};

/**
 * 返回农历月（非闰月）的总天数，计算闰月时的天数请使用getLeapDays方法
 *
 * @param year 农历年份
 * @param month 农历月份，取值【1～12】
 * @return 29 | 30
 * @example
 * MonthDay = getTotalDaysOfLunarMonth(1987,9) ;//MonthDay=29
 */
export const getTotalDaysOfLunarMonth = (year: number, month: number) => {
  if (month > 12 || month < 1) {
    throw new Error('农历月份参数错误');
  }

  return LUNAR_INFO[year - 1900] & (0x10000 >> month) ? 30 : 29;
};

/**
 * 返回公历月的天数
 *
 * @param year 公历年
 * @param month 公历月，取值【1～12】，若参数错误 返回-1
 * @return 28 | 29 | 30 | 31
 * @example
 * solarMonthDay = getTotalDaysOfSolarMonth(1987, 1) ; // solarMonthDay=30
 */
export const getTotalDaysOfSolarMonth = (year: number, month: number) => {
  if (month > 12 || month < 1) {
    throw new Error('公历月份参数错误');
  }

  if (month === 2) {
    // 2月份的闰平规律测算后确认返回28或29
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
  }

  return SOLAR_MONTH[month - 1];
};
