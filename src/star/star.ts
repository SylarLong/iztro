import { getHeavenlyStemAndEarthlyBranchBySolarDate } from '../calendar';
import { Star } from '../data/types';
import { fixIndex, fixLunarMonthIndex } from '../utils';
import {
  getChangQuIndex,
  getDailyStarIndex,
  getHuoLingIndex,
  getKongJieIndex,
  getKuiYueIndex,
  getLuanXiIndex,
  getLuYangTuoMaIndex,
  getMonthlyStarIndex,
  getNianjieIndex,
  getStartIndex,
  getTimelyStarIndex,
  getYearlyStarIndex,
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

export const getOtherStar = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
  const stars = initStars();
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);

  const {
    xianchiIndex,
    huagaiIndex,
    guchenIndex,
    guasuIndex,
    tiancaiIndex,
    tianshouIndex,
    tianchuIndex,
    posuiIndex,
    feilianIndex,
    longchiIndex,
    fenggeIndex,
    tiankuIndex,
    tianxuIndex,
    tianguanIndex,
    tianfuIndex,
    tiandeIndex,
    yuedeIndex,
    tiankongIndex,
    jieluIndex,
    kongwangIndex,
    xunkongIndex,
    tianshangIndex,
    tianshiIndex,
  } = getYearlyStarIndex(solarDateStr, timeIndex, fixLeap);
  const { yuejieIndex, tianyaoIndex, tianxingIndex, yinshaIndex, tianyueIndex, tianwuIndex } = getMonthlyStarIndex(
    solarDateStr,
    timeIndex,
    fixLeap,
  );
  const { santaiIndex, bazuoIndex, enguangIndex, tianguiIndex } = getDailyStarIndex(solarDateStr, timeIndex);
  const { taifuIndex, fenggaoIndex } = getTimelyStarIndex(timeIndex);
  const { hongluanIndex, tianxiIndex } = getLuanXiIndex(yearly[1]);
  const nianjieIndex = getNianjieIndex(yearly[1]);

  stars[hongluanIndex].push({ name: '红鸾', type: 'other', scope: 'origin' });
  stars[tianxiIndex].push({ name: '天喜', type: 'other', scope: 'origin' });
  stars[tianyaoIndex].push({ name: '天姚', type: 'other', scope: 'origin' });
  stars[xianchiIndex].push({ name: '咸池', type: 'other', scope: 'origin' });
  stars[nianjieIndex].push({ name: '年解', type: 'other', scope: 'origin' });
  stars[yuejieIndex].push({ name: '月解', type: 'other', scope: 'origin' });
  stars[santaiIndex].push({ name: '三台', type: 'other', scope: 'origin' });
  stars[bazuoIndex].push({ name: '八座', type: 'other', scope: 'origin' });
  stars[enguangIndex].push({ name: '恩光', type: 'other', scope: 'origin' });
  stars[tianguiIndex].push({ name: '天贵', type: 'other', scope: 'origin' });
  stars[longchiIndex].push({ name: '龙池', type: 'other', scope: 'origin' });
  stars[fenggeIndex].push({ name: '凤阁', type: 'other', scope: 'origin' });
  stars[tiancaiIndex].push({ name: '天才', type: 'other', scope: 'origin' });
  stars[tianshouIndex].push({ name: '天寿', type: 'other', scope: 'origin' });
  stars[taifuIndex].push({ name: '台辅', type: 'other', scope: 'origin' });
  stars[fenggaoIndex].push({ name: '封诰', type: 'other', scope: 'origin' });
  stars[tianwuIndex].push({ name: '天巫', type: 'other', scope: 'origin' });
  stars[huagaiIndex].push({ name: '华盖', type: 'other', scope: 'origin' });
  stars[tianguanIndex].push({ name: '天官', type: 'other', scope: 'origin' });
  stars[tianfuIndex].push({ name: '天福', type: 'other', scope: 'origin' });
  stars[tianchuIndex].push({ name: '天厨', type: 'other', scope: 'origin' });
  stars[tianyueIndex].push({ name: '天月', type: 'other', scope: 'origin' });
  stars[tiandeIndex].push({ name: '天德', type: 'other', scope: 'origin' });
  stars[yuedeIndex].push({ name: '月德', type: 'other', scope: 'origin' });
  stars[tiankongIndex].push({ name: '天空', type: 'other', scope: 'origin' });
  stars[xunkongIndex].push({ name: '旬空', type: 'other', scope: 'origin' });
  stars[jieluIndex].push({ name: '截路', type: 'other', scope: 'origin' });
  stars[kongwangIndex].push({ name: '空亡', type: 'other', scope: 'origin' });
  stars[guchenIndex].push({ name: '孤辰', type: 'other', scope: 'origin' });
  stars[guasuIndex].push({ name: '寡宿', type: 'other', scope: 'origin' });
  stars[feilianIndex].push({ name: '蜚廉', type: 'other', scope: 'origin' });
  stars[posuiIndex].push({ name: '破碎', type: 'other', scope: 'origin' });
  stars[tianxingIndex].push({ name: '天刑', type: 'other', scope: 'origin' });
  stars[yinshaIndex].push({ name: '阴煞', type: 'other', scope: 'origin' });
  stars[tiankuIndex].push({ name: '天哭', type: 'other', scope: 'origin' });
  stars[tianxuIndex].push({ name: '天虚', type: 'other', scope: 'origin' });
  stars[tianshiIndex].push({ name: '天使', type: 'other', scope: 'origin' });
  stars[tianshangIndex].push({ name: '天伤', type: 'other', scope: 'origin' });

  return stars;
};
