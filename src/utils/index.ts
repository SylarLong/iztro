import { getTotalDaysOfLunarMonth, solar2lunar } from '../calendar';
import { EARTHLY_BRANCHES, STARS_INFO } from '../data';
import { LunarDate, Star } from '../data/types';
import { initStars } from '../star';

/**
 * 用于处理索引，将索引锁定在 0~max 范围内
 *
 * @param index 当前索引
 * @param max 最大循环数，默认为12【因为12用得最多，宫位数量以及十二地支数量都为12，所以将12作为默认值】
 * @returns 处理后的索引
 */
export const fixIndex = (index: number, max: number = 12): number => {
  if (index < 0) {
    return fixIndex(index + max, max);
  }

  if (index > max - 1) {
    return fixIndex(index - max, max);
  }

  return index;
};

/**
 * 因为宫位是从寅宫开始的排列的，所以需要将目标地支的序号减去寅的序号才能得到宫位的序号
 *
 * @param earthlyBranch 地支
 * @returns 该地支对应的宫位索引序号
 */
export const earthlyBranchIndexToPalaceIndex = (earthlyBranch: (typeof EARTHLY_BRANCHES)[number]): number =>
  EARTHLY_BRANCHES.indexOf(earthlyBranch) - EARTHLY_BRANCHES.indexOf('寅');

/**
 * 配置星耀亮度
 *
 * @param starName 星耀名字
 * @param index 所在宫位索引
 */
export const getBrightness = (starName: keyof typeof STARS_INFO, index: number): string => {
  if (!starName) {
    return '';
  }

  return STARS_INFO[starName].brightness[fixIndex(index)];
};

/**
 * 处理地支相对于十二宫的索引，因为十二宫是以寅宫开始，所以下标需要减去地支寅的索引
 *
 * @param earthlyBranch 地支
 * @returns Number(0~11)
 */
export const fixEarthlyBranchIndex = (earthlyBranch: (typeof EARTHLY_BRANCHES)[number]): number =>
  fixIndex(EARTHLY_BRANCHES.indexOf(earthlyBranch) - EARTHLY_BRANCHES.indexOf('寅'));

/**
 * 处理晚子时日期
 *
 * @param solarDateStr 阳历日期
 * @param timeIndex 时辰序号【0～12】，12代表晚子时
 * @returns LunarDate
 */
export const fixLunarDate = (solarDateStr: string, timeIndex: number) => {
  let lunarDate = solar2lunar(solarDateStr);
  // 获取当月的天数
  const totalDaysOfLunarMonth = getTotalDaysOfLunarMonth(lunarDate.lunarYear, lunarDate.lunarMonth);

  if (timeIndex >= 12 && lunarDate.lunarDay >= totalDaysOfLunarMonth) {
    // 假如是晚子时并且日期是农历月的最后一天时，月份需要加1
    const dt = new Date(solarDateStr);

    dt.setDate(dt.getDate() + 1);
    lunarDate = solar2lunar(dt);
  }

  return lunarDate;
};

/**
 * 调整农历月份的索引
 *
 * 正月建寅（正月地支为寅），fixLeap为是否调整闰月情况
 * 若调整闰月，则闰月的前15天按上月算，后面天数按下月算
 * 比如 闰二月 时，fixLeap 为 true 时 闰二月十五(含)前
 * 的月份按二月算，之后的按三月算
 *
 * @param solarDateStr 阳历日期
 * @param timeIndex 时辰序号
 * @param fixLeap 是否调整闰月
 * @returns {number} 月份索引
 */
export const fixLunarMonthIndex = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
  const lunarDate = fixLunarDate(solarDateStr, timeIndex);
  const { lunarMonth, lunarDay, isLeap } = lunarDate;
  // 紫微斗数以`寅`宫为第一个宫位
  const firstIndex = EARTHLY_BRANCHES.indexOf('寅');

  return fixIndex(lunarMonth + 1 - firstIndex + (isLeap && fixLeap && lunarDay > 15 ? 1 : 0));
};

/**
 * 将多个星耀数组合并到一起
 *
 * @param stars 星耀数组
 * @returns 合并后的星耀
 */
export const mergeStars = (...stars: Array<Star[][]>) => {
  const finalStars = initStars();

  stars.forEach((item) => {
    item.forEach((subItem, index) => {
      Array.prototype.push.apply(finalStars[index], subItem);
    });
  });

  return finalStars;
};
