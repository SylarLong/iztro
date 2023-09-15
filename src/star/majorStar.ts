import { initStars } from '.';
import { getHeavenlyStemAndEarthlyBranchBySolarDate } from '../calendar';
import { t } from '../i18n';
import { fixIndex, getBrightness, getMutagen } from '../utils';
import { getStartIndex } from './location';

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
export const getMajorStar = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
  const { ziweiIndex, tianfuIndex } = getStartIndex(solarDateStr, timeIndex, fixLeap);
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);
  const stars = initStars();
  const ziweiGroup = [
    'ziweiMaj',
    'tianjiMaj',
    '',
    'taiyangMaj',
    'wuquMaj',
    'tiantongMaj',
    '',
    '',
    'lianzhenMaj',
  ] as const;
  const tianfuGroup = [
    'tianfuMaj',
    'taiyinMaj',
    'tanlangMaj',
    'jumenMaj',
    'tianxiangMaj',
    'tianliangMaj',
    'qishaMaj',
    '',
    '',
    '',
    'pojunMaj',
  ] as const;

  ziweiGroup.forEach((s, i) => {
    // 安紫微星系，起始宫逆时针安
    if (s !== '') {
      stars[fixIndex(ziweiIndex - i)].push({
        name: t(s),
        type: 'major',
        scope: 'origin',
        brightness: getBrightness(t(s), fixIndex(ziweiIndex - i)),
        mutagen: getMutagen(t(s), yearly[0]),
      });
    }
  });

  tianfuGroup.forEach((s, i) => {
    if (s !== '') {
      stars[fixIndex(tianfuIndex + i)].push({
        name: t(s),
        type: 'major',
        scope: 'origin',
        brightness: getBrightness(t(s), fixIndex(tianfuIndex + i)),
        mutagen: getMutagen(t(s), yearly[0]),
      });
    }
  });

  return stars;
};
