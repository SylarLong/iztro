import { getHeavenlyStemAndEarthlyBranchBySolarDate } from 'lunar-lite';
import { getYearly12, initStars } from '.';
import { kot, t } from '../i18n';
import FunctionalStar from './FunctionalStar';
import {
  getDailyStarIndex,
  getLuanXiIndex,
  getMonthlyStarIndex,
  getTimelyStarIndex,
  getYearlyStarIndex,
} from './location';
import { getConfig } from '../astro';
import { AstrolabeParam } from '../data/types';

/**
 * 安杂耀
 *
 * @param {AstrolabeParam} param - 通用排盘参数参数
 * @returns 38杂耀
 */
export const getAdjectiveStar = (param: AstrolabeParam) => {
  const { solarDate, timeIndex, fixLeap } = param;
  const { algorithm } = getConfig();
  const stars = initStars();
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDate, timeIndex, {
    year: getConfig().yearDivide,
  });

  const yearlyIndex = getYearlyStarIndex(param);
  const monthlyIndex = getMonthlyStarIndex(solarDate, timeIndex, fixLeap);
  const dailyIndex = getDailyStarIndex(solarDate, timeIndex, fixLeap);
  const timelyIndex = getTimelyStarIndex(timeIndex);
  const { hongluanIndex, tianxiIndex } = getLuanXiIndex(yearly[1]);
  const { suiqian12 } = getYearly12(solarDate);

  stars[hongluanIndex].push(new FunctionalStar({ name: t('hongluan'), type: 'flower', scope: 'origin' }));
  stars[tianxiIndex].push(new FunctionalStar({ name: t('tianxi'), type: 'flower', scope: 'origin' }));
  stars[monthlyIndex.tianyaoIndex].push(new FunctionalStar({ name: t('tianyao'), type: 'flower', scope: 'origin' }));
  stars[yearlyIndex.xianchiIndex].push(new FunctionalStar({ name: t('xianchi'), type: 'flower', scope: 'origin' }));
  stars[monthlyIndex.yuejieIndex].push(new FunctionalStar({ name: t('jieshen'), type: 'helper', scope: 'origin' }));
  stars[dailyIndex.santaiIndex].push(new FunctionalStar({ name: t('santai'), type: 'adjective', scope: 'origin' }));
  stars[dailyIndex.bazuoIndex].push(new FunctionalStar({ name: t('bazuo'), type: 'adjective', scope: 'origin' }));
  stars[dailyIndex.enguangIndex].push(new FunctionalStar({ name: t('engguang'), type: 'adjective', scope: 'origin' }));
  stars[dailyIndex.tianguiIndex].push(new FunctionalStar({ name: t('tiangui'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.longchiIndex].push(new FunctionalStar({ name: t('longchi'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.fenggeIndex].push(new FunctionalStar({ name: t('fengge'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.tiancaiIndex].push(new FunctionalStar({ name: t('tiancai'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.tianshouIndex].push(
    new FunctionalStar({ name: t('tianshou'), type: 'adjective', scope: 'origin' }),
  );
  stars[timelyIndex.taifuIndex].push(new FunctionalStar({ name: t('taifu'), type: 'adjective', scope: 'origin' }));
  stars[timelyIndex.fenggaoIndex].push(new FunctionalStar({ name: t('fenggao'), type: 'adjective', scope: 'origin' }));
  stars[monthlyIndex.tianwuIndex].push(new FunctionalStar({ name: t('tianwu'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.huagaiIndex].push(new FunctionalStar({ name: t('huagai'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.tianguanIndex].push(
    new FunctionalStar({ name: t('tianguan'), type: 'adjective', scope: 'origin' }),
  );
  stars[yearlyIndex.tianfuIndex].push(new FunctionalStar({ name: t('tianfu'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.tianchuIndex].push(new FunctionalStar({ name: t('tianchu'), type: 'adjective', scope: 'origin' }));
  stars[monthlyIndex.tianyueIndex].push(new FunctionalStar({ name: t('tianyue'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.tiandeIndex].push(new FunctionalStar({ name: t('tiande'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.yuedeIndex].push(new FunctionalStar({ name: t('yuede'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.tiankongIndex].push(
    new FunctionalStar({ name: t('tiankong'), type: 'adjective', scope: 'origin' }),
  );
  stars[yearlyIndex.xunkongIndex].push(new FunctionalStar({ name: t('xunkong'), type: 'adjective', scope: 'origin' }));

  if (algorithm !== 'zhongzhou') {
    // 中州派没有的星耀
    stars[yearlyIndex.jieluIndex].push(new FunctionalStar({ name: t('jielu'), type: 'adjective', scope: 'origin' }));
    stars[yearlyIndex.kongwangIndex].push(
      new FunctionalStar({ name: t('kongwang'), type: 'adjective', scope: 'origin' }),
    );
  } else {
    // 中州派特有的星耀
    stars[suiqian12.indexOf(t(kot('longde')))].push(
      new FunctionalStar({ name: t('longde'), type: 'adjective', scope: 'origin' }),
    );
    stars[yearlyIndex.jiekongIndex].push(
      new FunctionalStar({ name: t('jiekong'), type: 'adjective', scope: 'origin' }),
    );
    stars[yearlyIndex.jieshaAdjIndex].push(
      new FunctionalStar({ name: t('jieshaAdj'), type: 'adjective', scope: 'origin' }),
    );
    stars[yearlyIndex.dahaoAdjIndex].push(new FunctionalStar({ name: t('dahao'), type: 'adjective', scope: 'origin' }));
  }

  stars[yearlyIndex.guchenIndex].push(new FunctionalStar({ name: t('guchen'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.guasuIndex].push(new FunctionalStar({ name: t('guasu'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.feilianIndex].push(new FunctionalStar({ name: t('feilian'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.posuiIndex].push(new FunctionalStar({ name: t('posui'), type: 'adjective', scope: 'origin' }));
  stars[monthlyIndex.tianxingIndex].push(
    new FunctionalStar({ name: t('tianxing'), type: 'adjective', scope: 'origin' }),
  );
  stars[monthlyIndex.yinshaIndex].push(new FunctionalStar({ name: t('yinsha'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.tiankuIndex].push(new FunctionalStar({ name: t('tianku'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.tianxuIndex].push(new FunctionalStar({ name: t('tianxu'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.tianshiIndex].push(new FunctionalStar({ name: t('tianshi'), type: 'adjective', scope: 'origin' }));
  stars[yearlyIndex.tianshangIndex].push(
    new FunctionalStar({ name: t('tianshang'), type: 'adjective', scope: 'origin' }),
  );

  // 生年年解
  stars[yearlyIndex.nianjieIndex].push(new FunctionalStar({ name: t('nianjie'), type: 'helper', scope: 'origin' }));

  return stars;
};
