import { getTotalDaysOfLunarMonth, solar2lunar } from '../calendar';
import { EARTHLY_BRANCHES, heavenlyStems, MUTAGEN, STARS_INFO } from '../data';
import { initStars } from '../star';
import {
  Brightness,
  EarthlyBranchKey,
  EarthlyBranchName,
  HeavenlyStemKey,
  HeavenlyStemName,
  Mutagen,
  StarName,
  kot,
  t,
  StarKey,
} from '../i18n';
import { Star } from '../data/types';
import dayjs from 'dayjs';

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

  const res = 1 / index === -Infinity ? 0 : index;

  return res;
};

/**
 * 因为宫位是从寅宫开始的排列的，所以需要将目标地支的序号减去寅的序号才能得到宫位的序号
 *
 * @param earthlyBranch 地支
 * @returns 该地支对应的宫位索引序号
 */
export const earthlyBranchIndexToPalaceIndex = (earthlyBranchName: EarthlyBranchName): number => {
  const earthlyBranch = kot<EarthlyBranchKey>(earthlyBranchName);
  const yin = kot<EarthlyBranchKey>('yinEarthly');

  return fixIndex(EARTHLY_BRANCHES.indexOf(earthlyBranch) - EARTHLY_BRANCHES.indexOf(yin));
};

/**
 * 配置星耀亮度
 *
 * @param starName 星耀名字
 * @param index 所在宫位索引
 */
export const getBrightness = (starName: StarName, index: number): Brightness => {
  const star = kot<keyof typeof STARS_INFO>(starName);

  return t<Brightness>(STARS_INFO[star]?.brightness[fixIndex(index)]);
};

export const getMutagen = (starName: StarName, heavenlyStemName: HeavenlyStemName): Mutagen => {
  const heavenlyStem = kot<HeavenlyStemKey>(heavenlyStemName);
  const starKey = kot<StarKey>(starName);

  return t<Mutagen>(MUTAGEN[heavenlyStems[heavenlyStem].mutagen.indexOf(starKey as never)]);
};

export const getMutagensByHeavenlyStem = (heavenlyStemName: HeavenlyStemName): StarName[] => {
  const heavenlyStem = kot<HeavenlyStemKey>(heavenlyStemName);

  return heavenlyStems[heavenlyStem].mutagen.map((star) => t<StarName>(star));
};

/**
 * 处理地支相对于十二宫的索引，因为十二宫是以寅宫开始，所以下标需要减去地支寅的索引
 *
 * @param earthlyBranch 地支
 * @returns Number(0~11)
 */
export const fixEarthlyBranchIndex = (earthlyBranchName: EarthlyBranchName): number => {
  const earthlyBranch = kot<EarthlyBranchKey>(earthlyBranchName);

  return fixIndex(EARTHLY_BRANCHES.indexOf(earthlyBranch) - EARTHLY_BRANCHES.indexOf('yinEarthly'));
};

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
    const dt = dayjs(solarDateStr);

    dt.add(1, 'day');
    lunarDate = solar2lunar(new Date(dt.format()));
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
  const firstIndex = EARTHLY_BRANCHES.indexOf('yinEarthly');

  return fixIndex(lunarMonth + 1 - firstIndex + (isLeap && fixLeap && lunarDay > 15 ? 1 : 0));
};

export const fixLunarDayIndex = (lunarDay: number, timeIndex: number) => (timeIndex >= 12 ? lunarDay : lunarDay - 1);

/**
 * 将多个星耀数组合并到一起
 *
 * @param stars 星耀数组
 * @returns 合并后的星耀
 */
export const mergeStars = (...stars: Star[][][]) => {
  const finalStars = initStars();

  stars.forEach((item) => {
    item.forEach((subItem, index) => {
      Array.prototype.push.apply(finalStars[index], subItem);
    });
  });

  return finalStars;
};

/**
 * 将时间的小时转化为时辰的索引
 *
 * @param hour 当前时间的小时数
 * @returns 时辰的索引
 */
export const timeToIndex = (hour: number) => {
  if (hour === 0) {
    // 00:00～01:00 为早子时
    return 0;
  }

  if (hour === 23) {
    // 23:00～00:00 为晚子时
    return 12;
  }

  return Math.floor((hour + 1) / 2);
};

/**
 * 起小限
 *
 * - 小限一年一度逢，男顺女逆不相同，
 * - 寅午戍人辰上起，申子辰人自戍宫，
 * - 巳酉丑人未宫始，亥卯未人起丑宫。
 *
 * @param earthlyBranchName 地支
 * @returns 小限开始的宫位索引
 */
export const getAgeIndex = (earthlyBranchName: EarthlyBranchName) => {
  const earthlyBranch = kot<EarthlyBranchKey>(earthlyBranchName);
  let ageIdx = -1;

  if (['yinEarthly', 'wuEarthly', 'xuEarthly'].includes(earthlyBranch)) {
    ageIdx = fixEarthlyBranchIndex('chen');
  } else if (['shenEarthly', 'ziEarthly', 'chenEarthly'].includes(earthlyBranch)) {
    ageIdx = fixEarthlyBranchIndex('xu');
  } else if (['siEarthly', 'youEarthly', 'chouEarthly'].includes(earthlyBranch)) {
    ageIdx = fixEarthlyBranchIndex('wei');
  } else if (['haiEarthly', 'maoEarthly', 'weiEarthly'].includes(earthlyBranch)) {
    ageIdx = fixIndex(fixEarthlyBranchIndex('chou'));
  }

  return ageIdx;
};
