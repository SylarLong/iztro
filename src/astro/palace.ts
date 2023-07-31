import { getHeavenlyStemAndEarthlyBranchBySolarDate, solar2lunar } from '../calendar';
import { EARTHLY_BRANCHES, HEAVENLY_STEMS, TIGER_RULE } from '../data';
import { fixIndex } from '../utils';

type SoulAndBody = {
  /** 命宫索引 */
  soulIndex: number;
  /** 身宫索引 */
  bodyIndex: number;
  /** 命宫天干 */
  heavenlyStemOfSoul: (typeof HEAVENLY_STEMS)[number];
  /** 命宫地支 */
  earthlyBranchOfSoul: (typeof EARTHLY_BRANCHES)[number];
};

/**
 * 获取命宫以及身宫数据
 *
 * 1. 定寅首
 * - 甲己年生起丙寅，乙庚年生起戊寅，
 * - 丙辛年生起庚寅，丁壬年生起壬寅，
 * - 戊癸年生起甲寅。
 *
 * 2. 安命身宫诀
 * - 寅起正月，顺数至生月，逆数生时为命宫。
 * - 寅起正月，顺数至生月，顺数生时为身宫。
 *
 * @param solarDate 公历日期，用公历日期比较方便，因为农历日期需要考虑闰月问题，如果得到的数据是农历，可以用 lunar2solar 方法得到公历日期
 * @param timeIndex 出生时索引
 * @param fixLeap 是否修正闰月，若修正，则闰月前15天按上月算，后15天按下月算
 * @returns SoulAndBody
 */
export const getSoulAndBody = (solarDate: string, timeIndex: number, fixLeap?: boolean): SoulAndBody => {
  const lunarDate = solar2lunar(solarDate);
  const { lunarYear, lunarMonth, lunarDay, isLeap } = lunarDate;
  const { yearly, timely } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDate, timeIndex);

  // 紫微斗数以`寅`宫为第一个宫位
  const firstIndex = EARTHLY_BRANCHES.indexOf('寅');

  // 正月建寅（正月地支为寅），fixLeap为是否调整闰月情况
  // 若调整闰月，则闰月的前15天按上月算，后面天数按下月算
  // 比如 闰二月 时，fixLeap 为 true 时 闰二月十五(含)前
  // 的月份按二月算，之后的按三月算
  const monthIndex = fixIndex(lunarMonth + 1 - firstIndex + (isLeap && fixLeap && lunarDay > 15 ? 1 : 0));

  // 命宫索引，以寅宫为0，顺时针数到生月地支索引，再逆时针数到生时地支索引
  // 此处数到生月地支索引其实就是农历月份，所以不再计算生月地支索引
  const soulIndex = fixIndex(monthIndex - EARTHLY_BRANCHES.indexOf(timely[1]));

  // 身宫索引，以寅宫为0，顺时针数到生月地支索引，再顺时针数到生时地支索引
  // 与命宫索引一样，不再赘述
  const bodyIndex = fixIndex(monthIndex + EARTHLY_BRANCHES.indexOf(timely[1]));

  // 用五虎遁取得寅宫的天干
  const startHevenlyStem = TIGER_RULE[yearly[0]];

  // 获取命宫天干索引，起始天干索引加上命宫的索引即是
  // 天干循环数为10
  const heavenlyStemOfSoulIndex = fixIndex(HEAVENLY_STEMS.indexOf(startHevenlyStem) + soulIndex, 10);

  // 命宫的天干
  const heavenlyStemOfSoul = HEAVENLY_STEMS[heavenlyStemOfSoulIndex];

  // 命宫地支，命宫索引 + `寅`的索引（因为紫微斗数里寅宫是第一个宫位）
  const earthlyBranchOfSoul = EARTHLY_BRANCHES[fixIndex(soulIndex + firstIndex)];

  return {
    soulIndex,
    bodyIndex,
    heavenlyStemOfSoul,
    earthlyBranchOfSoul,
  };
};
