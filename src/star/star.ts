import { getFiveElementsClass, getSoulAndBody } from '../astro';
import { getHeavenlyStemAndEarthlyBranchBySolarDate } from '../calendar';
import { GENDER, earthlyBranches } from '../data';
import { FiveElementsClass, Star } from '../data/types';
import { fixEarthlyBranchIndex, fixIndex, fixLunarMonthIndex } from '../utils';
import {
  getChangQuIndex,
  getDailyStarIndex,
  getHuoLingIndex,
  getKongJieIndex,
  getKuiYueIndex,
  getLuanXiIndex,
  getLuYangTuoMaIndex,
  getMonthlyStarIndex,
  getNianjieIndex,
  getStartIndex,
  getTimelyStarIndex,
  getYearlyStarIndex,
  getZuoYouIndex,
} from './location';

export const initStars = (): Array<Star[]> => [[], [], [], [], [], [], [], [], [], [], [], []];

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
  const stars = initStars();
  const ziweiGroup = ['紫微', '天机', '', '太阳', '武曲', '天同', '', '', '廉贞'];
  const tianfuGroup = ['天府', '太阴', '贪狼', '巨门', '天相', '天梁', '七杀', '', '', '', '破军'];

  ziweiGroup.forEach((s, i) => {
    // 安紫微星系，起始宫逆时针安
    s &&
      stars[fixIndex(ziweiIndex - i)].push({
        name: s,
        type: 'major',
        scope: 'origin',
      });
  });

  tianfuGroup.forEach((s, i) => {
    s &&
      stars[fixIndex(tianfuIndex + i)].push({
        name: s,
        type: 'major',
        scope: 'origin',
      });
  });

  return stars;
};

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

  stars[zuoIndex].push({ name: '左辅', type: 'soft', scope: 'origin' });
  stars[youIndex].push({ name: '右弼', type: 'soft', scope: 'origin' });
  stars[changIndex].push({ name: '文昌', type: 'soft', scope: 'origin' });
  stars[quIndex].push({ name: '文曲', type: 'soft', scope: 'origin' });
  stars[kuiIndex].push({ name: '天魁', type: 'soft', scope: 'origin' });
  stars[yueIndex].push({ name: '天钺', type: 'soft', scope: 'origin' });
  stars[luIndex].push({ name: '禄存', type: 'major', scope: 'origin' });
  stars[maIndex].push({ name: '天马', type: 'major', scope: 'origin' });
  stars[kongIndex].push({ name: '地空', type: 'tough', scope: 'origin' });
  stars[jieIndex].push({ name: '地劫', type: 'tough', scope: 'origin' });
  stars[huoIndex].push({ name: '火星', type: 'tough', scope: 'origin' });
  stars[lingIndex].push({ name: '铃星', type: 'tough', scope: 'origin' });
  stars[yangIndex].push({ name: '擎羊', type: 'tough', scope: 'origin' });
  stars[tuoIndex].push({ name: '陀罗', type: 'tough', scope: 'origin' });

  return stars;
};

/**
 * 安杂耀
 *
 * @param solarDateStr 阳历日期字符串
 * @param timeIndex 时辰索引【0～12】
 * @param fixLeap 是否修复闰月，假如当月不是闰月则不生效
 * @returns 38杂耀
 */
export const getPatchStar = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
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
  const nianjieIndex = getNianjieIndex(yearly[1]);

  stars[hongluanIndex].push({ name: '红鸾', type: 'adjective', scope: 'origin' });
  stars[tianxiIndex].push({ name: '天喜', type: 'adjective', scope: 'origin' });
  stars[tianyaoIndex].push({ name: '天姚', type: 'adjective', scope: 'origin' });
  stars[xianchiIndex].push({ name: '咸池', type: 'adjective', scope: 'origin' });
  stars[nianjieIndex].push({ name: '年解', type: 'adjective', scope: 'origin' });
  stars[yuejieIndex].push({ name: '月解', type: 'adjective', scope: 'origin' });
  stars[santaiIndex].push({ name: '三台', type: 'adjective', scope: 'origin' });
  stars[bazuoIndex].push({ name: '八座', type: 'adjective', scope: 'origin' });
  stars[enguangIndex].push({ name: '恩光', type: 'adjective', scope: 'origin' });
  stars[tianguiIndex].push({ name: '天贵', type: 'adjective', scope: 'origin' });
  stars[longchiIndex].push({ name: '龙池', type: 'adjective', scope: 'origin' });
  stars[fenggeIndex].push({ name: '凤阁', type: 'adjective', scope: 'origin' });
  stars[tiancaiIndex].push({ name: '天才', type: 'adjective', scope: 'origin' });
  stars[tianshouIndex].push({ name: '天寿', type: 'adjective', scope: 'origin' });
  stars[taifuIndex].push({ name: '台辅', type: 'adjective', scope: 'origin' });
  stars[fenggaoIndex].push({ name: '封诰', type: 'adjective', scope: 'origin' });
  stars[tianwuIndex].push({ name: '天巫', type: 'adjective', scope: 'origin' });
  stars[huagaiIndex].push({ name: '华盖', type: 'adjective', scope: 'origin' });
  stars[tianguanIndex].push({ name: '天官', type: 'adjective', scope: 'origin' });
  stars[tianfuIndex].push({ name: '天福', type: 'adjective', scope: 'origin' });
  stars[tianchuIndex].push({ name: '天厨', type: 'adjective', scope: 'origin' });
  stars[tianyueIndex].push({ name: '天月', type: 'adjective', scope: 'origin' });
  stars[tiandeIndex].push({ name: '天德', type: 'adjective', scope: 'origin' });
  stars[yuedeIndex].push({ name: '月德', type: 'adjective', scope: 'origin' });
  stars[tiankongIndex].push({ name: '天空', type: 'adjective', scope: 'origin' });
  stars[xunkongIndex].push({ name: '旬空', type: 'adjective', scope: 'origin' });
  stars[jieluIndex].push({ name: '截路', type: 'adjective', scope: 'origin' });
  stars[kongwangIndex].push({ name: '空亡', type: 'adjective', scope: 'origin' });
  stars[guchenIndex].push({ name: '孤辰', type: 'adjective', scope: 'origin' });
  stars[guasuIndex].push({ name: '寡宿', type: 'adjective', scope: 'origin' });
  stars[feilianIndex].push({ name: '蜚廉', type: 'adjective', scope: 'origin' });
  stars[posuiIndex].push({ name: '破碎', type: 'adjective', scope: 'origin' });
  stars[tianxingIndex].push({ name: '天刑', type: 'adjective', scope: 'origin' });
  stars[yinshaIndex].push({ name: '阴煞', type: 'adjective', scope: 'origin' });
  stars[tiankuIndex].push({ name: '天哭', type: 'adjective', scope: 'origin' });
  stars[tianxuIndex].push({ name: '天虚', type: 'adjective', scope: 'origin' });
  stars[tianshiIndex].push({ name: '天使', type: 'adjective', scope: 'origin' });
  stars[tianshangIndex].push({ name: '天伤', type: 'adjective', scope: 'origin' });

  return stars;
};

export const getChangesheng12 = (
  solarDateStr: string,
  timeIndex: number,
  gender: keyof typeof GENDER,
  fixLeap?: boolean,
) => {
  const changesheng12 = [];
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0);
  const [, earthlyBranchOfYear] = yearly;
  // 获取命宫干支，需要通过命宫干支计算五行局
  const { heavenlyStemOfSoul, earthlyBranchOfSoul } = getSoulAndBody(solarDateStr, timeIndex, fixLeap);
  // 获取五行局，通过五行局获取起运年龄
  const fiveElementClass = getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul);
  // 长生12神顺序
  const stars = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];

  let startIdx = 0;

  switch (FiveElementsClass[fiveElementClass]) {
    case 2: {
      startIdx = fixEarthlyBranchIndex('申');
      break;
    }
    case 3: {
      startIdx = fixEarthlyBranchIndex('亥');
      break;
    }
    case 4: {
      startIdx = fixEarthlyBranchIndex('巳');
      break;
    }
    case 5: {
      startIdx = fixEarthlyBranchIndex('申');
      break;
    }
    case 6: {
      startIdx = fixEarthlyBranchIndex('寅');
      break;
    }
  }

  for (let i = 0; i < stars.length; i++) {
    let idx = 0;

    if (GENDER[gender] === earthlyBranches[earthlyBranchOfYear].yinYang) {
      idx = i + startIdx;
      idx = idx >= stars.length ? idx - stars.length : idx;
    } else {
      idx = startIdx - i;
      idx = idx < 0 ? idx + stars.length : idx;
    }

    changesheng12[idx] = stars[i];
  }

  return changesheng12;
};

export const getBoShi12 = (solarDateStr: string, gender: keyof typeof GENDER) => {
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0);
  const [heavenlyStemOfYear, earthlyBranchOfYear] = yearly;
  // 博士12神的顺序
  const stars = ['博士', '力士', '青龙', '小耗', '将军', '奏书', '蜚廉', '喜神', '病符', '大耗', '伏兵', '官府'];
  const { luIndex } = getLuYangTuoMaIndex(heavenlyStemOfYear, earthlyBranchOfYear);
  const boshi12 = [];

  for (let i = 0; i < stars.length; i++) {
    // 阳男阴女顺行，阴男阳女逆部
    const idx = fixIndex(GENDER[gender] === earthlyBranches[earthlyBranchOfYear].yinYang ? luIndex + i : luIndex - i);

    boshi12[idx] = stars[i];
  }

  return boshi12;
};

export const getYearly12 = (solarDateStr: string) => {
  const jiangqian12 = [];
  const taisui12 = [];

  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0);

  const [, earthlyBranchOfYear] = yearly;
  const ts12shen = ['岁建', '晦气', '丧门', '贯索', '官符', '小耗', '大耗', '龙德', '白虎', '天德', '吊客', '病符'];

  for (let i = 0; i < ts12shen.length; i++) {
    const idx = fixIndex(fixEarthlyBranchIndex(earthlyBranchOfYear) + i);

    taisui12[idx] = ts12shen[i];
  }

  const jq12shen = ['将星', '攀鞍', '岁驿', '息神', '华盖', '劫煞', '灾煞', '天煞', '指背', '咸池', '月煞', '亡神'];

  let jqStartIdx = -1;

  if (['寅', '午', '戌'].indexOf(earthlyBranchOfYear) >= 0) {
    jqStartIdx = fixEarthlyBranchIndex('午');
  } else if (['申', '子', '辰'].indexOf(earthlyBranchOfYear) >= 0) {
    jqStartIdx = fixEarthlyBranchIndex('子');
  } else if (['巳', '酉', '丑'].indexOf(earthlyBranchOfYear) >= 0) {
    jqStartIdx = fixEarthlyBranchIndex('酉');
  } else if (['亥', '卯', '未'].indexOf(earthlyBranchOfYear) >= 0) {
    jqStartIdx = fixEarthlyBranchIndex('卯');
  }
  for (let i = 0; i < jq12shen.length; i++) {
    const idx = fixIndex(jqStartIdx + i);

    jiangqian12[idx] = jq12shen[i];
  }

  return { taisui12, jiangqian12 };
};
