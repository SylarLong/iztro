import { initStars } from '.';
import { getHeavenlyStemAndEarthlyBranchBySolarDate } from '../calendar';
import { t } from '../i18n';
import { fixLunarMonthIndex, getBrightness, getMutagen } from '../utils';
import {
  getChangQuIndex,
  getHuoLingIndex,
  getKongJieIndex,
  getKuiYueIndex,
  getLuYangTuoMaIndex,
  getZuoYouIndex,
} from './location';

/**
 * 安14辅星，寅宫下标为0，若下标对应的数组为空数组则表示没有星耀
 *
 * @param solarDateStr 阳历日期字符串
 * @param timeIndex 时辰索引【0～12】
 * @param fixLeap 是否修复闰月，假如当月不是闰月则不生效
 * @returns 14辅星
 */
export const getMinorStar = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
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

  stars[zuoIndex].push({
    name: t('zuofuMin'),
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('左辅', zuoIndex),
    mutagen: getMutagen('左辅', yearly[0]),
  });
  stars[youIndex].push({
    name: t('youbiMin'),
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('右弼', youIndex),
    mutagen: getMutagen('右弼', yearly[0]),
  });
  stars[changIndex].push({
    name: t('wenchangMin'),
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('文昌', changIndex),
    mutagen: getMutagen('文昌', yearly[0]),
  });
  stars[quIndex].push({
    name: t('wenquMin'),
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('文曲', quIndex),
    mutagen: getMutagen('文曲', yearly[0]),
  });
  stars[kuiIndex].push({
    name: t('tiankuiMin'),
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('天魁', kuiIndex),
  });
  stars[yueIndex].push({
    name: t('tianyueMin'),
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('天钺', yueIndex),
  });
  stars[luIndex].push({
    name: t('lucunMin'),
    type: 'lucun',
    scope: 'origin',
    brightness: getBrightness('禄存', luIndex),
  });
  stars[maIndex].push({
    name: t('tianmaMin'),
    type: 'tianma',
    scope: 'origin',
    brightness: getBrightness('天马', maIndex),
  });
  stars[kongIndex].push({
    name: t('dikongMin'),
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('地空', kongIndex),
  });
  stars[jieIndex].push({
    name: t('dijieMin'),
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('地劫', jieIndex),
  });
  stars[huoIndex].push({
    name: t('huoxingMin'),
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('火星', huoIndex),
  });
  stars[lingIndex].push({
    name: t('lingxingMin'),
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('铃星', lingIndex),
  });
  stars[yangIndex].push({
    name: t('qingyangMin'),
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('擎羊', yangIndex),
  });
  stars[tuoIndex].push({
    name: t('tuoluoMin'),
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('陀罗', tuoIndex),
  });

  return stars;
};
