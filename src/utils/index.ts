import { EARTHLY_BRANCHES, PALACES, star } from '../data';

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
export const getBrightness = (starName: keyof typeof star, index: number): string => {
  if (!starName) {
    return '';
  }

  return star[starName].brightness[fixIndex(index)];
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
