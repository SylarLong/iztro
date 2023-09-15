import { initStars } from '.';
import { getHeavenlyStemAndEarthlyBranchBySolarDate } from '../calendar';
import { t } from '../i18n';
import {
  getDailyStarIndex,
  getLuanXiIndex,
  getMonthlyStarIndex,
  getTimelyStarIndex,
  getYearlyStarIndex,
} from './location';

/**
 * 安杂耀
 *
 * @param solarDateStr 阳历日期字符串
 * @param timeIndex 时辰索引【0～12】
 * @param fixLeap 是否修复闰月，假如当月不是闰月则不生效
 * @returns 38杂耀
 */
export const getAdjectiveStar = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
  const stars = initStars();
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);

  const yearlyIndex = getYearlyStarIndex(solarDateStr, timeIndex, fixLeap);
  const monthlyIndex = getMonthlyStarIndex(solarDateStr, timeIndex, fixLeap);
  const dailyIndex = getDailyStarIndex(solarDateStr, timeIndex);
  const timelyIndex = getTimelyStarIndex(timeIndex);
  const { hongluanIndex, tianxiIndex } = getLuanXiIndex(yearly[1]);

  stars[hongluanIndex].push({ name: t('hongluan'), type: 'flower', scope: 'origin' });
  stars[tianxiIndex].push({ name: t('tianxi'), type: 'flower', scope: 'origin' });
  stars[monthlyIndex.tianyaoIndex].push({ name: t('tianyao'), type: 'flower', scope: 'origin' });
  stars[yearlyIndex.xianchiIndex].push({ name: t('xianchi'), type: 'flower', scope: 'origin' });
  stars[monthlyIndex.yuejieIndex].push({ name: t('jieshen'), type: 'helper', scope: 'origin' });
  stars[dailyIndex.santaiIndex].push({ name: t('santai'), type: 'adjective', scope: 'origin' });
  stars[dailyIndex.bazuoIndex].push({ name: t('bazuo'), type: 'adjective', scope: 'origin' });
  stars[dailyIndex.enguangIndex].push({ name: t('engguang'), type: 'adjective', scope: 'origin' });
  stars[dailyIndex.tianguiIndex].push({ name: t('tiangui'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.longchiIndex].push({ name: t('longchi'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.fenggeIndex].push({ name: t('fengge'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tiancaiIndex].push({ name: t('tiancai'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tianshouIndex].push({ name: t('tianshou'), type: 'adjective', scope: 'origin' });
  stars[timelyIndex.taifuIndex].push({ name: t('taifu'), type: 'adjective', scope: 'origin' });
  stars[timelyIndex.fenggaoIndex].push({ name: t('fenggao'), type: 'adjective', scope: 'origin' });
  stars[monthlyIndex.tianwuIndex].push({ name: t('tianwu'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.huagaiIndex].push({ name: t('huagai'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tianguanIndex].push({ name: t('tianguan'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tianfuIndex].push({ name: t('tianfu'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tianchuIndex].push({ name: t('tianchu'), type: 'adjective', scope: 'origin' });
  stars[monthlyIndex.tianyueIndex].push({ name: t('tianyue'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tiandeIndex].push({ name: t('tiande'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.yuedeIndex].push({ name: t('yuede'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tiankongIndex].push({ name: t('tiankong'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.xunkongIndex].push({ name: t('xunkong'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.jieluIndex].push({ name: t('jielu'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.kongwangIndex].push({ name: t('kongwang'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.guchenIndex].push({ name: t('guchen'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.guasuIndex].push({ name: t('guasu'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.feilianIndex].push({ name: t('feilian'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.posuiIndex].push({ name: t('posui'), type: 'adjective', scope: 'origin' });
  stars[monthlyIndex.tianxingIndex].push({ name: t('tianxing'), type: 'adjective', scope: 'origin' });
  stars[monthlyIndex.yinshaIndex].push({ name: t('yinsha'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tiankuIndex].push({ name: t('tianku'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tianxuIndex].push({ name: t('tianxu'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tianshiIndex].push({ name: t('tianshi'), type: 'adjective', scope: 'origin' });
  stars[yearlyIndex.tianshangIndex].push({ name: t('tianshang'), type: 'adjective', scope: 'origin' });

  return stars;
};
