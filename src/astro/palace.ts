import { getHeavenlyStemAndEarthlyBranchBySolarDate, solar2lunar } from '../calendar';
import { EARTHLY_BRANCHES, HEAVENLY_STEMS, PALACES, TIGER_RULE } from '../data';
import { FiveElementsClass, SoulAndBody } from '../data/types';
import { fixIndex } from '../utils';

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

/**
 * 定五行局法（以命宫天干地支而定）
 *
 * 纳音五行计算取数巧记口诀：
 *
 * - 甲乙丙丁一到五，子丑午未一来数，
 * - 寅卯申酉二上走，辰巳戌亥三为足。
 * - 干支相加多减五，五行木金水火土。
 *
 * 注解：
 *
 * 1、五行取数：木1 金2 水3 火4 土5
 *
 *  天干取数：
 *  - 甲乙 ——> 1
 *  - 丙丁 ——> 2
 *  - 戊己 ——> 3
 *  - 庚辛 ——> 4
 *  - 壬癸 ——> 5
 *
 *  地支取数：
 *  - 子午丑未 ——> 1
 *  - 寅申卯酉 ——> 2
 *  - 辰戌巳亥 ——> 3
 *
 * 2、计算方法：
 *
 *  干支数相加，超过5者减去5，以差论之。
 *  - 若差为1则五行属木
 *  - 若差为2则五行属金
 *  - 若差为3则五行属水
 *  - 若差为4则五行属火
 *  - 若差为5则五行属土
 *
 * 3、举例：
 *  - 丙子：丙2 子1=3 ——> 水 ——> 水二局
 *  - 辛未：辛4 未1=5 ——> 土 ——> 土五局
 *  - 庚申：庚4 申2=6 ——> 6-5=1 ——> 木 ——> 木三局
 *
 * @param heavenlyStem 天干
 * @param earthlyBranch 地支
 * @returns 水二局 ｜ 木三局 ｜ 金四局 ｜ 土五局 ｜ 火六局
 */
export const getFiveElementsClass = (
  heavenlyStem: (typeof HEAVENLY_STEMS)[number],
  earthlyBranch: (typeof EARTHLY_BRANCHES)[number],
): keyof typeof FiveElementsClass => {
  const fiveElementsTable: Array<keyof typeof FiveElementsClass> = ['木三局', '金四局', '水二局', '火六局', '土五局'];

  const heavenlyStemNumber = Math.floor(HEAVENLY_STEMS.indexOf(heavenlyStem) / 2) + 1;
  const earthlyBranchNumber = Math.floor(fixIndex(EARTHLY_BRANCHES.indexOf(earthlyBranch), 6) / 2) + 1;
  let index = heavenlyStemNumber + earthlyBranchNumber;

  while (index > 5) {
    index -= 5;
  }

  return fiveElementsTable[index - 1];
};

/**
 * 获取从寅宫开始的各个宫名
 *
 * @param fromIndex 命宫索引
 * @returns 从寅宫开始的各个宫名
 */
export const getPalaceNames = (fromIndex: number): Array<(typeof PALACES)[number]> => {
  const names: Array<(typeof PALACES)[number]> = [];

  for (let i = 0; i < PALACES.length; i++) {
    let idx = fixIndex(i - fromIndex);

    names[i] = PALACES[idx];
  }

  return names;
};
