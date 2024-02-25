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
import FunctionalStar from '../star/FunctionalStar';
import { HeavenlyStemAndEarthlyBranchDate } from 'lunar-lite/lib/types';
import { solar2lunar } from 'lunar-lite';
import { getConfig } from '../astro';

const getTargetMutagens = (heavenlyStem: HeavenlyStemKey) => {
  const { mutagens } = getConfig();
  let result;

  if (mutagens && mutagens[heavenlyStem]) {
    result = mutagens[heavenlyStem] ?? [];
  } else {
    result = heavenlyStems[heavenlyStem].mutagen ?? [];
  }

  return result;
};

/**
 * 用于处理索引，将索引锁定在 0~max 范围内
 *
 * @param index 当前索引
 * @param max 最大循环数，默认为12【因为12用得最多，宫位数量以及十二地支数量都为12，所以将12作为默认值】
 * @returns {number} 处理后的索引
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
 * @param {EarthlyBranchName} earthlyBranch 地支
 * @returns {number} 该地支对应的宫位索引序号
 */
export const earthlyBranchIndexToPalaceIndex = (earthlyBranchName: EarthlyBranchName): number => {
  const earthlyBranch = kot<EarthlyBranchKey>(earthlyBranchName, 'Earthly');
  const yin = kot<EarthlyBranchKey>('yinEarthly', 'Earthly');

  return fixIndex(EARTHLY_BRANCHES.indexOf(earthlyBranch) - EARTHLY_BRANCHES.indexOf(yin));
};

/**
 * 配置星耀亮度
 *
 * @param {StarName} starName 星耀名字
 * @param {number} index 所在宫位索引
 */
export const getBrightness = (starName: StarName, index: number): Brightness => {
  const star = kot<keyof typeof STARS_INFO>(starName);
  const { brightness } = getConfig();
  const targetBrightness = brightness[star] ? brightness[star] : STARS_INFO[star]?.brightness;

  if (!targetBrightness) {
    return '';
  }

  return t<Brightness>(targetBrightness[fixIndex(index)]);
};

export const getMutagen = (starName: StarName, heavenlyStemName: HeavenlyStemName): Mutagen => {
  const heavenlyStem = kot<HeavenlyStemKey>(heavenlyStemName, 'Heavenly');
  const starKey = kot<StarKey>(starName);
  const target = getTargetMutagens(heavenlyStem);

  return t<Mutagen>(MUTAGEN[target.indexOf(starKey as never)]);
};

export const getMutagensByHeavenlyStem = (heavenlyStemName: HeavenlyStemName): StarName[] => {
  const heavenlyStem = kot<HeavenlyStemKey>(heavenlyStemName, 'Heavenly');
  const target = getTargetMutagens(heavenlyStem);

  return target.map((star) => t<StarName>(star));
};

/**
 * 处理地支相对于十二宫的索引，因为十二宫是以寅宫开始，所以下标需要减去地支寅的索引
 *
 * @param {EarthlyBranchName} earthlyBranch 地支
 * @returns {number} Number(0~11)
 */
export const fixEarthlyBranchIndex = (earthlyBranchName: EarthlyBranchName): number => {
  const earthlyBranch = kot<EarthlyBranchKey>(earthlyBranchName, 'Earthly');

  return fixIndex(EARTHLY_BRANCHES.indexOf(earthlyBranch) - EARTHLY_BRANCHES.indexOf('yinEarthly'));
};

/**
 * 调整农历月份的索引
 *
 * 正月建寅（正月地支为寅），fixLeap为是否调整闰月情况
 * 若调整闰月，则闰月的前15天按上月算，后面天数按下月算
 * 比如 闰二月 时，fixLeap 为 true 时 闰二月十五(含)前
 * 的月份按二月算，之后的按三月算
 *
 * @param {string} solarDateStr 阳历日期
 * @param {number} timeIndex 时辰序号
 * @param {vboolean} fixLeap 是否调整闰月
 * @returns {number} 月份索引
 */
export const fixLunarMonthIndex = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
  const { lunarMonth, lunarDay, isLeap } = solar2lunar(solarDateStr);
  // 紫微斗数以`寅`宫为第一个宫位
  const firstIndex = EARTHLY_BRANCHES.indexOf('yinEarthly');
  const needToAdd = isLeap && fixLeap && lunarDay > 15 && timeIndex !== 12;

  return fixIndex(lunarMonth + 1 - firstIndex + (needToAdd ? 1 : 0));
};

/**
 * 获取农历日期【天】的索引，晚子时将加一天，所以如果是晚子时下标不需要减一
 *
 * @param lunarDay 农历日期【天】
 * @param timeIndex 时辰索引
 * @returns {number} 农历日期【天】
 */
export const fixLunarDayIndex = (lunarDay: number, timeIndex: number) => (timeIndex >= 12 ? lunarDay : lunarDay - 1);

/**
 * 将多个星耀数组合并到一起
 *
 * @param {FunctionalStar[][][]} stars 星耀数组
 * @returns {FunctionalStar[][]} 合并后的星耀
 */
export const mergeStars = (...stars: FunctionalStar[][][]) => {
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
 * @param {number} hour 当前时间的小时数
 * @returns {number} 时辰的索引
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
 * @param {EarthlyBranchName} earthlyBranchName 地支
 * @returns {number} 小限开始的宫位索引
 */
export const getAgeIndex = (earthlyBranchName: EarthlyBranchName) => {
  const earthlyBranch = kot<EarthlyBranchKey>(earthlyBranchName, 'Earthly');
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

/**
 * 返回翻译后的干支纪年字符串
 *
 * @param chineseDate 干支纪年日期对象
 * @returns 干支纪年字符串
 */
export const translateChineseDate = (chineseDate: HeavenlyStemAndEarthlyBranchDate): string => {
  const { yearly, monthly, daily, hourly } = chineseDate;

  if (
    yearly.some((item) => (t(kot(item)) as string).length > 1) ||
    monthly.some((item) => (t(kot(item)) as string).length > 1) ||
    daily.some((item) => (t(kot(item)) as string).length > 1) ||
    hourly.some((item) => (t(kot(item)) as string).length > 1)
  ) {
    return `${yearly.map((item) => t(kot(item))).join(' ')} - ${monthly.map((item) => t(kot(item))).join(' ')} - ${daily
      .map((item) => t(kot(item)))
      .join(' ')} - ${hourly.map((item) => t(kot(item))).join(' ')}`;
  }

  return `${yearly.map((item) => t(kot(item))).join('')} ${monthly.map((item) => t(kot(item))).join('')} ${daily
    .map((item) => t(kot(item)))
    .join('')} ${hourly.map((item) => t(kot(item))).join('')}`;
};
