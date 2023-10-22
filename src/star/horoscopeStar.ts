import { initStars } from '.';
import { t, HeavenlyStemName, EarthlyBranchName } from '../i18n';
import FunctionalStar from './FunctionalStar';
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
): FunctionalStar[][] => {
  const { kuiIndex, yueIndex } = getKuiYueIndex(heavenlyStem);
  const { changIndex, quIndex } = getChangQuIndexByHeavenlyStem(heavenlyStem);
  const { luIndex, yangIndex, tuoIndex, maIndex } = getLuYangTuoMaIndex(heavenlyStem, earthlyBranch);
  const { hongluanIndex, tianxiIndex } = getLuanXiIndex(earthlyBranch);
  const stars = initStars();

  if (scope === 'yearly') {
    const nianjieIndex = getNianjieIndex(earthlyBranch);

    stars[nianjieIndex].push(new FunctionalStar({ name: t('nianjie'), type: 'helper', scope: 'yearly' }));
    stars[kuiIndex].push(new FunctionalStar({ name: t('liukui'), type: 'soft', scope }));
    stars[yueIndex].push(new FunctionalStar({ name: t('liuyue'), type: 'soft', scope }));
    stars[changIndex].push(new FunctionalStar({ name: t('liuchang'), type: 'soft', scope }));
    stars[quIndex].push(new FunctionalStar({ name: t('liuqu'), type: 'soft', scope }));
    stars[luIndex].push(new FunctionalStar({ name: t('liulu'), type: 'lucun', scope }));
    stars[yangIndex].push(new FunctionalStar({ name: t('liuyang'), type: 'tough', scope }));
    stars[tuoIndex].push(new FunctionalStar({ name: t('liutuo'), type: 'tough', scope }));
    stars[maIndex].push(new FunctionalStar({ name: t('liuma'), type: 'tianma', scope }));
    stars[hongluanIndex].push(new FunctionalStar({ name: t('liuluan'), type: 'flower', scope }));
    stars[tianxiIndex].push(new FunctionalStar({ name: t('liuxi'), type: 'flower', scope }));
  } else {
    stars[kuiIndex].push(new FunctionalStar({ name: t('yunkui'), type: 'soft', scope }));
    stars[yueIndex].push(new FunctionalStar({ name: t('yunyue'), type: 'soft', scope }));
    stars[changIndex].push(new FunctionalStar({ name: t('yunchang'), type: 'soft', scope }));
    stars[quIndex].push(new FunctionalStar({ name: t('yunqu'), type: 'soft', scope }));
    stars[luIndex].push(new FunctionalStar({ name: t('yunlu'), type: 'lucun', scope }));
    stars[yangIndex].push(new FunctionalStar({ name: t('yunyang'), type: 'tough', scope }));
    stars[tuoIndex].push(new FunctionalStar({ name: t('yuntuo'), type: 'tough', scope }));
    stars[maIndex].push(new FunctionalStar({ name: t('yunma'), type: 'tianma', scope }));
    stars[hongluanIndex].push(new FunctionalStar({ name: t('yunluan'), type: 'flower', scope }));
    stars[tianxiIndex].push(new FunctionalStar({ name: t('yunxi'), type: 'flower', scope }));
  }

  return stars;
};
