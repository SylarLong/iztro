import { getHeavenlyStemAndEarthlyBranchBySolarDate } from '../calendar';
import { Star } from '../data/types';
import { fixIndex, fixLunarMonthIndex } from '../utils';
import {
  getChangQuIndex,
  getHuoLingIndex,
  getKongJieIndex,
  getKuiYueIndex,
  getLuYangTuoMaIndex,
  getStartIndex,
  getZuoYouIndex,
} from './location';

export const initStars = (): Array<Star[]> => [[], [], [], [], [], [], [], [], [], [], [], []];

/**
 * 安主星，寅宫下标为0，若下标对应的数组为空数组则表示没有星耀
 *
 * 安紫微诸星诀
 * - 紫微逆去天机星，隔一太阳武曲辰，
 * - 连接天同空二宫，廉贞居处方是真。
 *
 * 安天府诸星诀
 * - 天府顺行有太阴，贪狼而后巨门临，
 * - 随来天相天梁继，七杀空三是破军。
 *
 * @param solarDateStr 公历日期 YYYY-MM-DD
 * @param timeIndex 时辰索引【0～12】
 * @param fixLeap 是否调整农历闰月（若该月不是闰月则不会生效）
 * @returns {Array<Star[]>} 从寅宫开始每一个宫的星耀
 */
export const getPrimaryStar = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
  const { ziweiIndex, tianfuIndex } = getStartIndex(solarDateStr, timeIndex, fixLeap);
  const stars = initStars();
  const ziweiGroup = ['紫微', '天机', '', '太阳', '武曲', '天同', '', '', '廉贞'];
  const tianfuGroup = ['天府', '太阴', '贪狼', '巨门', '天相', '天梁', '七杀', '', '', '', '破军'];

  ziweiGroup.forEach((s, i) => {
    // 安紫微星系，起始宫逆时针安
    s &&
      stars[fixIndex(ziweiIndex - i)].push({
        name: s,
        type: 'primary',
        scope: 'origin',
      });
  });

  tianfuGroup.forEach((s, i) => {
    s &&
      stars[fixIndex(tianfuIndex + i)].push({
        name: s,
        type: 'primary',
        scope: 'origin',
      });
  });

  return stars;
};

/**
 * 安14辅星，寅宫下标为0，若下标对应的数组为空数组则表示没有星耀
 *
 * @param solarDateStr 阳历日期字符串
 * @param timeIndex 时辰索引【0～12】
 * @param fixLeap 是否修复闰月，假如当月不是闰月则不生效
 * @returns 14辅星
 */
export const setSecondaryStar = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
  const stars = initStars();
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);
  const monthIndex = fixLunarMonthIndex(solarDateStr, timeIndex, fixLeap);

  // 此处获取到的是索引，下标是从0开始的，所以需要加1
  const { zuoIndex, youIndex } = getZuoYouIndex(monthIndex + 1);
  const { changIndex, quIndex } = getChangQuIndex(timeIndex);
  const { kuiIndex, yueIndex } = getKuiYueIndex(yearly[0]);
  const { huoIndex, lingIndex } = getHuoLingIndex(yearly[1], timeIndex);
  const { kongIndex, jieIndex } = getKongJieIndex(timeIndex);
  const { luIndex, yangIndex, tuoIndex, maIndex } = getLuYangTuoMaIndex(yearly[0], yearly[1]);

  stars[zuoIndex].push({ name: '左辅', type: 'soft', scope: 'origin' });
  stars[youIndex].push({ name: '右弼', type: 'soft', scope: 'origin' });
  stars[changIndex].push({ name: '文昌', type: 'soft', scope: 'origin' });
  stars[quIndex].push({ name: '文曲', type: 'soft', scope: 'origin' });
  stars[kuiIndex].push({ name: '天魁', type: 'soft', scope: 'origin' });
  stars[yueIndex].push({ name: '天钺', type: 'soft', scope: 'origin' });
  stars[luIndex].push({ name: '禄存', type: 'primary', scope: 'origin' });
  stars[maIndex].push({ name: '天马', type: 'primary', scope: 'origin' });
  stars[kongIndex].push({ name: '地空', type: 'tough', scope: 'origin' });
  stars[jieIndex].push({ name: '地劫', type: 'tough', scope: 'origin' });
  stars[huoIndex].push({ name: '火星', type: 'tough', scope: 'origin' });
  stars[lingIndex].push({ name: '铃星', type: 'tough', scope: 'origin' });
  stars[yangIndex].push({ name: '擎羊', type: 'tough', scope: 'origin' });
  stars[tuoIndex].push({ name: '陀罗', type: 'tough', scope: 'origin' });

  return stars;
};
