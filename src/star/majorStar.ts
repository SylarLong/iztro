import { getHeavenlyStemAndEarthlyBranchBySolarDate } from 'lunar-lite';
import { initStars } from '.';
import { t } from '../i18n';
import { fixIndex, getBrightness, getMutagen } from '../utils';
import FunctionalStar from './FunctionalStar';
import { getStartIndex } from './location';
import { getConfig } from '../astro';
import { AstrolabeParam } from '../data/types';

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
 * @param {AstrolabeParam} param 通用排盘参数
 * @returns {Array<Star[]>} 从寅宫开始每一个宫的星耀
 */
export const getMajorStar = (param: AstrolabeParam) => {
  const { solarDate, timeIndex } = param;
  const { ziweiIndex, tianfuIndex } = getStartIndex(param);
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDate, timeIndex, {
    year: getConfig().yearDivide,
  });
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
      stars[fixIndex(ziweiIndex - i)].push(
        new FunctionalStar({
          name: t(s),
          type: 'major',
          scope: 'origin',
          brightness: getBrightness(t(s), fixIndex(ziweiIndex - i)),
          mutagen: getMutagen(t(s), yearly[0]),
        }),
      );
    }
  });

  tianfuGroup.forEach((s, i) => {
    if (s !== '') {
      stars[fixIndex(tianfuIndex + i)].push(
        new FunctionalStar({
          name: t(s),
          type: 'major',
          scope: 'origin',
          brightness: getBrightness(t(s), fixIndex(tianfuIndex + i)),
          mutagen: getMutagen(t(s), yearly[0]),
        }),
      );
    }
  });

  return stars;
};
