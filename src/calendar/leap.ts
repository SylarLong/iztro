import { LUNAR_INFO } from './rules';

/**
 * 返回农历年闰月是哪个月；若没有闰月 则返回0
 * @param year 农历年份
 * @return Number (0-12)
 * @example
 * leapMonth = getLeapMonth(1987) ; // leapMonth=6
 */
export const getLeapMonth = (year: number) => {
  return LUNAR_INFO[year - 1900] & 0xf;
};

/**
 * 返回农历年闰月的天数 若该年没有闰月则返回0
 * @param year 农历年份
 * @return Number (0、29、30)
 * @example
 * leapMonthDay = getLeapDays(1987) ; //leapMonthDay=29
 */
export const getLeapDays = (year: number) => {
  if (getLeapMonth(year)) {
    return LUNAR_INFO[year - 1900] & 0x10000 ? 30 : 29;
  }

  return 0;
};
