import dayjs from 'dayjs';
import { EARTHLY_BRANCHES, HEAVENLY_STEMS, RAT_RULE } from '../data';
import { HeavenlyStemAndEarthlyBranch, HeavenlyStemAndEarthlyBranchDate } from '../data/types';
import { HeavenlyStemKey, HeavenlyStemName, kot, t } from '../i18n';
import { fixIndex } from '../utils';
import { lunar2solar, normalizeLunarDateStr, normalizeSolarDateStr, solar2lunar } from './convertor';
import { getTerm } from './misc';

/**
 * 传入offset偏移量返回干支
 *
 * @param offset 相对甲子的偏移量，单位为天
 * @return [干, 支]
 */
const heavenlyStemAndEarthlyBranchFromOffset = (offset: number): HeavenlyStemAndEarthlyBranch => {
  return [t(HEAVENLY_STEMS[offset % 10]), t(EARTHLY_BRANCHES[offset % 12])];
};

/**
 * 农历年份计算年干支
 *
 * @param  year 农历年的年份数
 * @return [干, 支]
 */
export const heavenlyStemAndEarthlyBranchOfYear = (year: number): HeavenlyStemAndEarthlyBranch => {
  let heavenStemKey = (year - 3) % 10;
  let earthlyBranchKey = (year - 3) % 12;

  if (heavenStemKey === 0) heavenStemKey = 10; // 如果余数为0则为最后一个天干
  if (earthlyBranchKey === 0) earthlyBranchKey = 12; // 如果余数为0则为最后一个地支

  return [t(HEAVENLY_STEMS[heavenStemKey - 1]), t(EARTHLY_BRANCHES[earthlyBranchKey - 1])];
};

/**
 * 通过公历日期计算月干支
 *
 * @param date 公历日期
 * @returns [干, 支]
 */
export const heavenlyStemAndEarthlyBranchOfMonth = (date: Date): HeavenlyStemAndEarthlyBranch => {
  const [year, month, day] = normalizeSolarDateStr(date);

  // 当月的第一个节气
  // 返回当月「节」为几日开始
  const firstNode = getTerm(year, month * 2 - 1);
  const offset = (year - 1900) * 12 + month + 11;

  if (day >= firstNode) {
    return heavenlyStemAndEarthlyBranchFromOffset(offset + 1);
  }

  return heavenlyStemAndEarthlyBranchFromOffset(offset);
};

/**
 * 获取公历日期计算日干支
 *
 * @param date 公历日期
 * @param timeIndex 时辰索引，主要是为了修复晚子时需要加一天的问题
 * @returns [干, 支]
 */
export const heavenlyStemAndEarthlyBranchOfDay = (date: Date, timeIndex: number): HeavenlyStemAndEarthlyBranch => {
  const [year, month, day] = normalizeSolarDateStr(date);
  const dayFix = timeIndex === 12 ? 1 : 0; // 若时辰索引为12表示是晚子时，需要加一天
  const dayCyclical = Date.UTC(year, month - 1, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

  return heavenlyStemAndEarthlyBranchFromOffset(dayCyclical + day + dayFix - 1);
};

/**
 * 通过当天的日天干获取第 `t` （0~11）个时辰的干支，需要通过五鼠遁来定时辰天干
 *
 * @param timeIndex 时辰序号（0~11），子时为0，亥时为11
 * @param heavenlyStemNameOfDay 当日天干
 * @returns [干, 支]
 */
export const heavenlyStemAndEarthlyBranchOfTime = (
  timeIndex: number,
  heavenlyStemNameOfDay: HeavenlyStemName,
): HeavenlyStemAndEarthlyBranch => {
  const heavenlyStemOfDay = kot<HeavenlyStemKey>(heavenlyStemNameOfDay);
  const startHeavenlyStem = RAT_RULE[heavenlyStemOfDay];
  const heavenlyStem = HEAVENLY_STEMS[fixIndex(HEAVENLY_STEMS.indexOf(startHeavenlyStem) + fixIndex(timeIndex), 10)];
  const earthlyBranch = EARTHLY_BRANCHES[fixIndex(timeIndex)];

  return [t(heavenlyStem), t(earthlyBranch)];
};

/**
 * 通过农历获取生辰干支
 *
 * @param dateStr 农历日期 YYYY-MM-DD
 * @param timeIndex 时辰索引【0～12】
 * @param isLeap 是否为闰月
 * @returns HeavenlyStemAndEarthlyBranchResult
 */
export const getHeavenlyStemAndEarthlyBranchByLunarDate = (
  dateStr: string,
  timeIndex: number,
  isLeap?: boolean,
): HeavenlyStemAndEarthlyBranchDate => {
  const [lunarYear] = normalizeLunarDateStr(dateStr);
  const solar = lunar2solar(dateStr, isLeap);
  const solarDate = new Date(dayjs(solar.toString()).format());

  const yearly = heavenlyStemAndEarthlyBranchOfYear(lunarYear);
  const monthly = heavenlyStemAndEarthlyBranchOfMonth(solarDate);
  const daily = heavenlyStemAndEarthlyBranchOfDay(solarDate, timeIndex);
  const hourly = heavenlyStemAndEarthlyBranchOfTime(timeIndex, daily[0]);

  return {
    yearly,
    monthly,
    daily,
    hourly,
    toString() {
      if (yearly[0].length > 1) {
        return `${yearly.join(' ')} - ${monthly.join(' ')} - ${daily.join(' ')} - ${hourly.join(' ')}`;
      } else {
        return `${yearly.join('')} ${monthly.join('')} ${daily.join('')} ${hourly.join('')}`;
      }
    },
  };
};

/**
 * 将阳历转化为干支纪年
 *
 * @param dateStr 公历日期 YYYY-MM-DD
 * @param timeIndex 时辰索引【0～12】
 * @returns HeavenlyStemAndEarthlyBranchResult
 */
export const getHeavenlyStemAndEarthlyBranchBySolarDate = (
  dateStr: string | Date,
  timeIndex: number,
): HeavenlyStemAndEarthlyBranchDate => {
  const lunarDate = solar2lunar(dateStr);

  return getHeavenlyStemAndEarthlyBranchByLunarDate(lunarDate.toString(), timeIndex, lunarDate.isLeap);
};
