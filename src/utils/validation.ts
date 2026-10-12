import { LunarYear, SolarUtil } from 'lunar-typescript';
import { kot } from '../i18n';

/**
 * 校验公历/农历 1～9999 年的真实日期，不接受自动滚动到下个月的无效日期。
 *
 * @internal
 * @version 2.6.2
 * @param date 待校验的日期
 * @param type 日期类型，默认为阳历
 * @param isLeapMonth 是否为农历闰月
 */
export const validateDate = (date: string | Date, type: 'solar' | 'lunar' = 'solar', isLeapMonth = false): void => {
  let parts: number[];
  if (date instanceof Date) {
    if (!Number.isFinite(date.getTime())) throw new Error('invalid date.');
    parts = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  } else {
    if (typeof date !== 'string' || !/^\d{1,4}([-/.])\d{1,2}\1\d{1,2}(?: \d{1,2}:\d{1,2}(?::\d{1,2})?)?$/.test(date)) {
      throw new Error('invalid date.');
    }
    const [day, time] = date.split(' ');
    parts = day.split(/[-/.]/).map(Number);
    if (time) {
      const [hour, minute, second = 0] = time.split(':').map(Number);
      if (hour > 23 || minute > 59 || second > 59) throw new Error('invalid time.');
    }
  }
  const [year, month, day] = parts;
  if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1) throw new Error('invalid date.');
  if (type === 'lunar') {
    const lunarYear = LunarYear.fromYear(year);
    const leap = isLeapMonth && lunarYear.getLeapMonth() === month;
    const lunarMonth = lunarYear.getMonth(leap ? -month : month);
    if (!lunarMonth || day > lunarMonth.getDayCount()) throw new Error('invalid lunar date.');
  } else {
    // 与底层历法一致：历史日期使用儒略历/格里历切换规则。
    if (year === 1582 && month === 10 && day >= 5 && day <= 14) throw new Error('invalid solar date.');
    const leap = SolarUtil.isLeapYear(year);
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > days[month - 1]) throw new Error('invalid solar date.');
  }
};

/**
 * 校验时辰为 0～12 的整数。
 *
 * @internal
 * @version 2.6.2
 */
export const validateTimeIndex = (index: number): void => {
  if (!Number.isInteger(index) || index < 0 || index > 12)
    throw new Error('invalid timeIndex: expected an integer from 0 to 12.');
};

/**
 * 校验已支持语言中的有效性别。
 *
 * @internal
 * @version 2.6.2
 */
export const validateGender = (gender: string): void => {
  if (typeof gender !== 'string' || !['male', 'female'].includes(kot<string>(gender)))
    throw new Error('invalid gender.');
};

/**
 * 校验布尔选项，不进行隐式类型转换。
 *
 * @internal
 * @version 2.6.2
 */
export const validateBoolean = (value: boolean, name: string): void => {
  if (typeof value !== 'boolean') throw new Error(`invalid ${name}: expected a boolean.`);
};
