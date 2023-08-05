import { EARTHLY_BRANCHES, ZODIAC } from '../data';
import { EarthlyBranch } from '../data/types';
import { normalizeSolarDateStr } from './convertor';
import { LUNAR_DAY_NAME, LUNAR_MONTH_NAME, NUM_TO_CHAR, TERM_INFO } from './rules';

/**
 * 传入公历年获得该年第termNo个节气的公历节气日
 *
 * @param year 公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
 * @param termNo 节气序号【1～24】
 * @return 节气日期
 * @example
 * termDay = getTerm(1987, 3); // termDay=4; 即1987年2月4日立春
 */
export const getTerm = (year: number, termNo: number) => {
  if (year < 1900 || year > 2100) {
    throw new Error('公历年份参数错误');
  }

  if (termNo < 1 || termNo > 24) {
    throw new Error('节气序号参数错误');
  }

  const _table = TERM_INFO[year - 1900];
  const _info = [];

  for (let i = 0; i < 30; i += 5) {
    _info.push(parseInt('0x' + _table.substring(i, i + 5)).toString());
  }

  const _calday: string[] = [];

  _info.forEach((item) => {
    _calday.push(item.substring(0, 1));
    _calday.push(item.substring(1, 3));
    _calday.push(item.substring(3, 4));
    _calday.push(item.substring(4, 6));
  });

  return parseInt(_calday[termNo - 1]);
};

/**
 * 将数字年份转化为中文字符串
 *
 * @param lunarYear 农历年份数字
 * @returns 农历年份字符串
 * @example
 * str = lunarYearToStr(1986); // str = '一九八六'
 */
export const lunarYearToStr = (lunarYear: number) => {
  const y = lunarYear.toString();
  const char = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let result = '';

  for (let i = 0; i < y.length; i++) {
    result = result + char[+y.charAt(i)];
  }

  return result;
};

/**
 * 将数字月份转化为中文字符串
 *
 * @param lunarMonth 农历月份数字
 * @returns 农历月份字符串
 * @example
 * str = lunarMonthToStr(1); // str = '正月'
 */
export const lunarMonthToStr = (lunarMonth: number) => {
  if (lunarMonth > 12 || lunarMonth < 1) {
    throw new Error('农历月份不正确');
  }

  return `${LUNAR_MONTH_NAME[lunarMonth]}月`;
};

/**
 * 将数字日转化为中文字符串
 *
 * @param lunarDay 农历日数字
 * @returns 农历日字符串
 * @example
 * str = lunarDayToStr(7); // str = '初七'
 */
export const lunarDayToStr = (lunarDay: number) => {
  let result = '';

  switch (lunarDay) {
    case 10:
      result = '初十';
      break;
    case 20:
      result = '二十';
      break;
    case 30:
      result = '三十';
      break;
    default:
      result = `${LUNAR_DAY_NAME[Math.floor(lunarDay / 10)]}${NUM_TO_CHAR[lunarDay % 10]}`;
  }

  return result;
};

/**
 * 将 YYYY-MM-DD 格式的农历日期转化为中文字符串
 *
 * @param lunarDateStr 农历日期字符串 YYYY-MM-DD
 * @param isLeap 是否闰月
 * @returns 农历日期的中文字符串
 */
export const lunarDateToStr = (lunarDateStr: string, isLeap: boolean) => {
  const [year, month, day] = lunarDateStr.split('-').map((item) => +item);

  return `${lunarYearToStr(year)}年${isLeap ? '(闰)' : ''}${lunarMonthToStr(month)}${lunarDayToStr(day)}`;
};

/**
 * 获取星座
 *
 * @param  solarDateStr [description]
 * @return 星座
 */
export const getSign = (solarDateStr: string) => {
  const [, month, day] = normalizeSolarDateStr(solarDateStr);
  const s = '摩羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯';
  const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];

  return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2) + '座';
};

/**
 * 通过年支获取生肖
 *
 * @param earthlyBranchOfYear 年支
 * @example
 * const zodiac = calendar.getZodiac("卯") ;// zodiac='兔'
 */
export const getZodiac = (earthlyBranchOfYear: EarthlyBranch) => {
  return ZODIAC[EARTHLY_BRANCHES.indexOf(earthlyBranchOfYear)];
};
