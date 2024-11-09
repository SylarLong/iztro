import { initStars } from '.';
import { Scope } from '../data/types';
import { t, HeavenlyStemName, EarthlyBranchName, StarName } from '../i18n';
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
  scope: Scope,
): FunctionalStar[][] => {
  const { kuiIndex, yueIndex } = getKuiYueIndex(heavenlyStem);
  const { changIndex, quIndex } = getChangQuIndexByHeavenlyStem(heavenlyStem);
  const { luIndex, yangIndex, tuoIndex, maIndex } = getLuYangTuoMaIndex(heavenlyStem, earthlyBranch);
  const { hongluanIndex, tianxiIndex } = getLuanXiIndex(earthlyBranch);
  const stars = initStars();

  const trans: Record<
    Scope,
    Record<
      'tiankui' | 'tianyue' | 'wenchang' | 'wenqu' | 'lucun' | 'qingyang' | 'tuoluo' | 'tianma' | 'hongluan' | 'tianxi',
      StarName
    >
  > = {
    origin: {
      tiankui: t('tiankuiMin'),
      tianyue: t('tianyueMin'),
      wenchang: t('wenchangMin'),
      wenqu: t('wenquMin'),
      lucun: t('lucunMin'),
      qingyang: t('qingyangMin'),
      tuoluo: t('tuoluoMin'),
      tianma: t('tianmaMin'),
      hongluan: t('hongluanMin'),
      tianxi: t('tianxi'),
    },
    decadal: {
      tiankui: t('yunkui'),
      tianyue: t('yunyue'),
      wenchang: t('yunchang'),
      wenqu: t('yunqu'),
      lucun: t('yunlu'),
      qingyang: t('yunyang'),
      tuoluo: t('yuntuo'),
      tianma: t('yunma'),
      hongluan: t('yunluan'),
      tianxi: t('yunxi'),
    },
    yearly: {
      tiankui: t('liukui'),
      tianyue: t('liuyue'),
      wenchang: t('liuchang'),
      wenqu: t('liuqu'),
      lucun: t('liulu'),
      qingyang: t('liuyang'),
      tuoluo: t('liutuo'),
      tianma: t('liuma'),
      hongluan: t('liuluan'),
      tianxi: t('liuxi'),
    },
    monthly: {
      tiankui: t('yuekui'),
      tianyue: t('yueyue'),
      wenchang: t('yuechang'),
      wenqu: t('yuequ'),
      lucun: t('yuelu'),
      qingyang: t('yueyang'),
      tuoluo: t('yuetuo'),
      tianma: t('yuema'),
      hongluan: t('yueluan'),
      tianxi: t('yuexi'),
    },
    daily: {
      tiankui: t('rikui'),
      tianyue: t('riyue'),
      wenchang: t('richang'),
      wenqu: t('riqu'),
      lucun: t('rilu'),
      qingyang: t('riyang'),
      tuoluo: t('rituo'),
      tianma: t('rima'),
      hongluan: t('riluan'),
      tianxi: t('rixi'),
    },
    hourly: {
      tiankui: t('shikui'),
      tianyue: t('shiyue'),
      wenchang: t('shichang'),
      wenqu: t('shiqu'),
      lucun: t('shilu'),
      qingyang: t('shiyang'),
      tuoluo: t('shituo'),
      tianma: t('shima'),
      hongluan: t('shiluan'),
      tianxi: t('shixi'),
    },
  };

  if (scope === 'yearly') {
    const nianjieIndex = getNianjieIndex(earthlyBranch);

    stars[nianjieIndex].push(new FunctionalStar({ name: t('nianjie'), type: 'helper', scope: 'yearly' }));
  }

  stars[kuiIndex].push(new FunctionalStar({ name: trans[scope].tiankui, type: 'soft', scope }));
  stars[yueIndex].push(new FunctionalStar({ name: trans[scope].tianyue, type: 'soft', scope }));
  stars[changIndex].push(new FunctionalStar({ name: trans[scope].wenchang, type: 'soft', scope }));
  stars[quIndex].push(new FunctionalStar({ name: trans[scope].wenqu, type: 'soft', scope }));
  stars[luIndex].push(new FunctionalStar({ name: trans[scope].lucun, type: 'lucun', scope }));
  stars[yangIndex].push(new FunctionalStar({ name: trans[scope].qingyang, type: 'tough', scope }));
  stars[tuoIndex].push(new FunctionalStar({ name: trans[scope].tuoluo, type: 'tough', scope }));
  stars[maIndex].push(new FunctionalStar({ name: trans[scope].tianma, type: 'tianma', scope }));
  stars[hongluanIndex].push(new FunctionalStar({ name: trans[scope].hongluan, type: 'flower', scope }));
  stars[tianxiIndex].push(new FunctionalStar({ name: trans[scope].tianxi, type: 'flower', scope }));

  return stars;
};
