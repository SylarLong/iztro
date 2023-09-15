import { initStars } from '.';
import { Star } from '../data/types';
import { t, HeavenlyStemName, EarthlyBranchName } from '../i18n';
import {
  getChangQuIndexByHeavenlyStem,
  getKuiYueIndex,
  getLuanXiIndex,
  getLuYangTuoMaIndex,
  getNianjieIndex,
} from './location';

/**
 * 获取流耀
 *
 * 魁钺昌曲禄羊陀马鸾喜
 *
 * @param heavenlyStem 天干
 * @param earthlyBranch 地支
 */
export const getHoroscopeStar = (
  heavenlyStem: HeavenlyStemName,
  earthlyBranch: EarthlyBranchName,
  scope: 'decadal' | 'yearly',
): Star[][] => {
  const { kuiIndex, yueIndex } = getKuiYueIndex(heavenlyStem);
  const { changIndex, quIndex } = getChangQuIndexByHeavenlyStem(heavenlyStem);
  const { luIndex, yangIndex, tuoIndex, maIndex } = getLuYangTuoMaIndex(heavenlyStem, earthlyBranch);
  const { hongluanIndex, tianxiIndex } = getLuanXiIndex(earthlyBranch);
  const stars = initStars();

  if (scope === 'yearly') {
    const nianjieIndex = getNianjieIndex(earthlyBranch);

    stars[nianjieIndex].push({ name: t('nianjie'), type: 'helper', scope: 'yearly' });
    stars[kuiIndex].push({ name: t('liukui'), type: 'soft', scope });
    stars[yueIndex].push({ name: t('liuyue'), type: 'soft', scope });
    stars[changIndex].push({ name: t('liuchang'), type: 'soft', scope });
    stars[quIndex].push({ name: t('liuqu'), type: 'soft', scope });
    stars[luIndex].push({ name: t('liulu'), type: 'lucun', scope });
    stars[yangIndex].push({ name: t('liuyang'), type: 'tough', scope });
    stars[tuoIndex].push({ name: t('liutuo'), type: 'tough', scope });
    stars[maIndex].push({ name: t('liuma'), type: 'tianma', scope });
    stars[hongluanIndex].push({ name: t('liuluan'), type: 'flower', scope });
    stars[tianxiIndex].push({ name: t('liuxi'), type: 'flower', scope });
  } else {
    stars[kuiIndex].push({ name: t('yunkui'), type: 'soft', scope });
    stars[yueIndex].push({ name: t('yunyue'), type: 'soft', scope });
    stars[changIndex].push({ name: t('yunchang'), type: 'soft', scope });
    stars[quIndex].push({ name: t('yunqu'), type: 'soft', scope });
    stars[luIndex].push({ name: t('yunlu'), type: 'lucun', scope });
    stars[yangIndex].push({ name: t('yunyang'), type: 'tough', scope });
    stars[tuoIndex].push({ name: t('yuntuo'), type: 'tough', scope });
    stars[maIndex].push({ name: t('yunma'), type: 'tianma', scope });
    stars[hongluanIndex].push({ name: t('yunluan'), type: 'flower', scope });
    stars[tianxiIndex].push({ name: t('yunxi'), type: 'flower', scope });
  }

  return stars;
};
