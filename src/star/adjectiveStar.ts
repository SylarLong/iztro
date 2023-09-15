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

  stars[hongluanIndex].push({ name: t('hongluan'), type: 'flower', scope: 'origin' });
  stars[tianxiIndex].push({ name: t('tianxi'), type: 'flower', scope: 'origin' });
  stars[tianyaoIndex].push({ name: t('tianyao'), type: 'flower', scope: 'origin' });
  stars[xianchiIndex].push({ name: t('xianchi'), type: 'flower', scope: 'origin' });
  stars[yuejieIndex].push({ name: t('jieshen'), type: 'helper', scope: 'origin' });
  stars[santaiIndex].push({ name: t('santai'), type: 'adjective', scope: 'origin' });
  stars[bazuoIndex].push({ name: t('bazuo'), type: 'adjective', scope: 'origin' });
  stars[enguangIndex].push({ name: t('engguang'), type: 'adjective', scope: 'origin' });
  stars[tianguiIndex].push({ name: t('tiangui'), type: 'adjective', scope: 'origin' });
  stars[longchiIndex].push({ name: t('longchi'), type: 'adjective', scope: 'origin' });
  stars[fenggeIndex].push({ name: t('fengge'), type: 'adjective', scope: 'origin' });
  stars[tiancaiIndex].push({ name: t('tiancai'), type: 'adjective', scope: 'origin' });
  stars[tianshouIndex].push({ name: t('tianshou'), type: 'adjective', scope: 'origin' });
  stars[taifuIndex].push({ name: t('taifu'), type: 'adjective', scope: 'origin' });
  stars[fenggaoIndex].push({ name: t('fenggao'), type: 'adjective', scope: 'origin' });
  stars[tianwuIndex].push({ name: t('tianwu'), type: 'adjective', scope: 'origin' });
  stars[huagaiIndex].push({ name: t('huagai'), type: 'adjective', scope: 'origin' });
  stars[tianguanIndex].push({ name: t('tianguan'), type: 'adjective', scope: 'origin' });
  stars[tianfuIndex].push({ name: t('tianfu'), type: 'adjective', scope: 'origin' });
  stars[tianchuIndex].push({ name: t('tianchu'), type: 'adjective', scope: 'origin' });
  stars[tianyueIndex].push({ name: t('tianyue'), type: 'adjective', scope: 'origin' });
  stars[tiandeIndex].push({ name: t('tiande'), type: 'adjective', scope: 'origin' });
  stars[yuedeIndex].push({ name: t('yuede'), type: 'adjective', scope: 'origin' });
  stars[tiankongIndex].push({ name: t('tiankong'), type: 'adjective', scope: 'origin' });
  stars[xunkongIndex].push({ name: t('xunkong'), type: 'adjective', scope: 'origin' });
  stars[jieluIndex].push({ name: t('jielu'), type: 'adjective', scope: 'origin' });
  stars[kongwangIndex].push({ name: t('kongwang'), type: 'adjective', scope: 'origin' });
  stars[guchenIndex].push({ name: t('guchen'), type: 'adjective', scope: 'origin' });
  stars[guasuIndex].push({ name: t('guasu'), type: 'adjective', scope: 'origin' });
  stars[feilianIndex].push({ name: t('feilian'), type: 'adjective', scope: 'origin' });
  stars[posuiIndex].push({ name: t('posui'), type: 'adjective', scope: 'origin' });
  stars[tianxingIndex].push({ name: t('tianxing'), type: 'adjective', scope: 'origin' });
  stars[yinshaIndex].push({ name: t('yinsha'), type: 'adjective', scope: 'origin' });
  stars[tiankuIndex].push({ name: t('tianku'), type: 'adjective', scope: 'origin' });
  stars[tianxuIndex].push({ name: t('tianxu'), type: 'adjective', scope: 'origin' });
  stars[tianshiIndex].push({ name: t('tianshi'), type: 'adjective', scope: 'origin' });
  stars[tianshangIndex].push({ name: t('tianshang'), type: 'adjective', scope: 'origin' });

  return stars;
};
