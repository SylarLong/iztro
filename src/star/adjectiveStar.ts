import { getHeavenlyStemAndEarthlyBranchBySolarDate } from 'lunar-lite';
import { getDuongPhuIndex, getLuuHaIndex, getYearly12, initStars } from '.';
import { kot, t } from '../i18n';
import FunctionalStar from './FunctionalStar';
import {
  getDailyStarIndex,
  getDaoHoaIndex,
  getLuanXiIndex,
  getMonthlyStarIndex,
  getTimelyStarIndex,
  getVanTinhIndex,
  getYearlyStarIndex,
} from './location';
import { getConfig } from '../astro';
import { AstrolabeParam } from '../data/types';

export const getQuocAnIndex = (heavenlyStem: string): number => {
  const earthlyBranchIndexMap: Record<string, number> = {
    甲: 9, // Giáp -> Tuất
    乙: 10, // Ất -> Hợi
    丙: 1, // Bính -> Sửu
    丁: 2, // Đinh -> Dần
    戊: 1, // Mậu -> Sửu
    己: 2, // Kỷ -> Dần
    庚: 4, // Canh -> Thìn
    辛: 5, // Tân -> Tị
    壬: 7, // Nhâm -> Mùi
    癸: 8, // Quý -> Thân
  };

  return earthlyBranchIndexMap[heavenlyStem] || 0;
};

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
  stars[yearlyIndex.nianjieIndex].push(new FunctionalStar(
    { name: t('nianjie'), type: 'helper', scope: 'origin' }));

  stars[yearlyIndex.thaitueIndex].push(new FunctionalStar({
    name: t('thaitue'),
    type: 'adjective',
    scope: 'origin'
  }));


  stars[yearlyIndex.thieuduongIndex].push(new FunctionalStar({
    name: t('thieuduong'),
    type: 'adjective',
    scope: 'origin'
  }));


// Add the remaining 10 stars in the Thái Tuế series
  stars[yearlyIndex.tangmonIndex].push(new FunctionalStar({
    name: t('tangmon'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[yearlyIndex.thieuamIndex].push(new FunctionalStar({
    name: t('thieuam'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[yearlyIndex.quanphuIndex].push(new FunctionalStar({
    name: t('quanphu'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[yearlyIndex.tuphuIndex].push(new FunctionalStar({
    name: t('tuphu'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[yearlyIndex.tuephaIndex].push(new FunctionalStar({
    name: t('tuepha'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[yearlyIndex.longducIndex].push(new FunctionalStar({
    name: t('longduc'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[yearlyIndex.bachhoIndex].push(new FunctionalStar({
    name: t('bachho'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[yearlyIndex.phucducIndex].push(new FunctionalStar({
    name: t('phucduc'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[yearlyIndex.dieukhachIndex].push(new FunctionalStar({
    name: t('dieukhach'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[yearlyIndex.trucphuIndex].push(new FunctionalStar({
    name: t('trucphu'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[monthlyIndex.thiengiaiIndex].push(new FunctionalStar({
    name: t('thiengiai'),
    type: 'adjective',
    scope: 'origin'
  }));

  stars[monthlyIndex.diagiaiIndex].push(new FunctionalStar({
    name: t('diagiai'),
    type: 'adjective',
    scope: 'origin'
  }));



  const quocAnIndex = getQuocAnIndex(yearly[0]);

  stars[quocAnIndex].push(new FunctionalStar({
    name: t('quocan'),
    type: 'adjective',
    scope: 'origin'
  }));

// Thêm sao Đẩu Quân
  stars[yearlyIndex.dauQuanIndex].push(new FunctionalStar({
    name: t('dauquan'),
    type: 'adjective',
    scope: 'origin'
  }));


  const daoHoaIndex = getDaoHoaIndex(yearly[1]);

// Add Đào Hoa star
  stars[daoHoaIndex].push(new FunctionalStar({
    name: t('daohoa'),
    type: 'adjective',
    scope: 'origin'
  }));


  const luuHaIndex = getLuuHaIndex(yearly[0]);

  stars[luuHaIndex].push(new FunctionalStar({
    name: t('luuha'),
    type: 'adjective',
    scope: 'origin'
  }));


  const duongPhuIndex = getDuongPhuIndex(yearly[0]);
  stars[duongPhuIndex].push(new FunctionalStar({
    name: t('duongphu'),
    type: 'adjective',
    scope: 'origin'
  }));


  const vantinhIndex = getVanTinhIndex(yearly[0]);
  stars[vantinhIndex].push(new FunctionalStar({
    name: t('vantinh'),
    type: 'adjective',
    scope: 'origin'
  }));

  return stars;
};

