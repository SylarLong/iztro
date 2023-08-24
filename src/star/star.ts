import { getFiveElementsClass, getSoulAndBody } from '../astro';
import { getHeavenlyStemAndEarthlyBranchBySolarDate } from '../calendar';
import { GENDER, earthlyBranches } from '../data';
import { FiveElementsClass, Star, Gender } from '../data/types';
import {
  StarName,
  HeavenlyStemKey,
  t,
  EarthlyBranchKey,
  kot,
  FiveElementsClassKey,
  HeavenlyStemName,
  EarthlyBranchName,
} from '../i18n';
import { fixEarthlyBranchIndex, fixIndex, fixLunarMonthIndex, getBrightness, getMutagen } from '../utils';
import {
  getChangQuIndex,
  getChangQuIndexByHeavenlyStem,
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

export const initStars = (): Star[][] => [[], [], [], [], [], [], [], [], [], [], [], []];

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
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);
  const stars = initStars();
  const ziweiGroup = ['紫微', '天机', '', '太阳', '武曲', '天同', '', '', '廉贞'] as const;
  const tianfuGroup = ['天府', '太阴', '贪狼', '巨门', '天相', '天梁', '七杀', '', '', '', '破军'] as const;

  ziweiGroup.forEach((s, i) => {
    // 安紫微星系，起始宫逆时针安
    if (s !== '') {
      stars[fixIndex(ziweiIndex - i)].push({
        name: t(s) as StarName,
        type: 'major',
        scope: 'origin',
        brightness: getBrightness(s, fixIndex(ziweiIndex - i)),
        mutagen: getMutagen(s, yearly[0]),
      });
    }
  });

  tianfuGroup.forEach((s, i) => {
    if (s !== '') {
      stars[fixIndex(tianfuIndex + i)].push({
        name: t(s) as StarName,
        type: 'major',
        scope: 'origin',
        brightness: getBrightness(s, fixIndex(tianfuIndex + i)),
        mutagen: getMutagen(s, yearly[0]),
      });
    }
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

  stars[zuoIndex].push({
    name: t('左辅') as StarName,
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('左辅', zuoIndex),
    mutagen: getMutagen('左辅', yearly[0]),
  });
  stars[youIndex].push({
    name: t('右弼') as StarName,
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('右弼', youIndex),
    mutagen: getMutagen('右弼', yearly[0]),
  });
  stars[changIndex].push({
    name: t('文昌') as StarName,
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('文昌', changIndex),
    mutagen: getMutagen('文昌', yearly[0]),
  });
  stars[quIndex].push({
    name: t('文曲') as StarName,
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('文曲', quIndex),
    mutagen: getMutagen('文曲', yearly[0]),
  });
  stars[kuiIndex].push({
    name: t('天魁') as StarName,
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('天魁', kuiIndex),
  });
  stars[yueIndex].push({
    name: t('天钺') as StarName,
    type: 'soft',
    scope: 'origin',
    brightness: getBrightness('天钺', yueIndex),
  });
  stars[luIndex].push({
    name: t('禄存') as StarName,
    type: 'lucun',
    scope: 'origin',
    brightness: getBrightness('禄存', luIndex),
  });
  stars[maIndex].push({
    name: t('天马') as StarName,
    type: 'tianma',
    scope: 'origin',
    brightness: getBrightness('天马', maIndex),
  });
  stars[kongIndex].push({
    name: t('地空') as StarName,
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('地空', kongIndex),
  });
  stars[jieIndex].push({
    name: t('地劫') as StarName,
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('地劫', jieIndex),
  });
  stars[huoIndex].push({
    name: t('火星') as StarName,
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('火星', huoIndex),
  });
  stars[lingIndex].push({
    name: t('铃星') as StarName,
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('铃星', lingIndex),
  });
  stars[yangIndex].push({
    name: t('擎羊') as StarName,
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('擎羊', yangIndex),
  });
  stars[tuoIndex].push({
    name: t('陀罗') as StarName,
    type: 'tough',
    scope: 'origin',
    brightness: getBrightness('陀罗', tuoIndex),
  });

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

  stars[hongluanIndex].push({ name: t('红鸾') as StarName, type: 'flower', scope: 'origin' });
  stars[tianxiIndex].push({ name: t('天喜') as StarName, type: 'flower', scope: 'origin' });
  stars[tianyaoIndex].push({ name: t('天姚') as StarName, type: 'flower', scope: 'origin' });
  stars[xianchiIndex].push({ name: t('咸池') as StarName, type: 'flower', scope: 'origin' });
  stars[yuejieIndex].push({ name: t('解神') as StarName, type: 'helper', scope: 'origin' });
  stars[santaiIndex].push({ name: t('三台') as StarName, type: 'adjective', scope: 'origin' });
  stars[bazuoIndex].push({ name: t('八座') as StarName, type: 'adjective', scope: 'origin' });
  stars[enguangIndex].push({ name: t('恩光') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianguiIndex].push({ name: t('天贵') as StarName, type: 'adjective', scope: 'origin' });
  stars[longchiIndex].push({ name: t('龙池') as StarName, type: 'adjective', scope: 'origin' });
  stars[fenggeIndex].push({ name: t('凤阁') as StarName, type: 'adjective', scope: 'origin' });
  stars[tiancaiIndex].push({ name: t('天才') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianshouIndex].push({ name: t('天寿') as StarName, type: 'adjective', scope: 'origin' });
  stars[taifuIndex].push({ name: t('台辅') as StarName, type: 'adjective', scope: 'origin' });
  stars[fenggaoIndex].push({ name: t('封诰') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianwuIndex].push({ name: t('天巫') as StarName, type: 'adjective', scope: 'origin' });
  stars[huagaiIndex].push({ name: t('华盖') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianguanIndex].push({ name: t('天官') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianfuIndex].push({ name: t('天福') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianchuIndex].push({ name: t('天厨') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianyueIndex].push({ name: t('天月') as StarName, type: 'adjective', scope: 'origin' });
  stars[tiandeIndex].push({ name: t('天德') as StarName, type: 'adjective', scope: 'origin' });
  stars[yuedeIndex].push({ name: t('月德') as StarName, type: 'adjective', scope: 'origin' });
  stars[tiankongIndex].push({ name: t('天空') as StarName, type: 'adjective', scope: 'origin' });
  stars[xunkongIndex].push({ name: t('旬空') as StarName, type: 'adjective', scope: 'origin' });
  stars[jieluIndex].push({ name: t('截路') as StarName, type: 'adjective', scope: 'origin' });
  stars[kongwangIndex].push({ name: t('空亡') as StarName, type: 'adjective', scope: 'origin' });
  stars[guchenIndex].push({ name: t('孤辰') as StarName, type: 'adjective', scope: 'origin' });
  stars[guasuIndex].push({ name: t('寡宿') as StarName, type: 'adjective', scope: 'origin' });
  stars[feilianIndex].push({ name: t('蜚廉') as StarName, type: 'adjective', scope: 'origin' });
  stars[posuiIndex].push({ name: t('破碎') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianxingIndex].push({ name: t('天刑') as StarName, type: 'adjective', scope: 'origin' });
  stars[yinshaIndex].push({ name: t('阴煞') as StarName, type: 'adjective', scope: 'origin' });
  stars[tiankuIndex].push({ name: t('天哭') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianxuIndex].push({ name: t('天虚') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianshiIndex].push({ name: t('天使') as StarName, type: 'adjective', scope: 'origin' });
  stars[tianshangIndex].push({ name: t('天伤') as StarName, type: 'adjective', scope: 'origin' });

  return stars;
};

/**
 * 长生12神。
 *
 * 水二局长生在申，木三局长生在亥，金四局长生在巳，土五局长生在申，火六局长生在寅，
 * 阳男阴女顺行，阴男阳女逆行，安长生、沐浴、冠带、临官、帝旺、衰、病、死、墓、绝 、胎、养。
 *
 * @param solarDateStr 阳历日期字符串
 * @param timeIndex 时辰索引【0～12】
 * @param gender 性别【男｜女】
 * @param fixLeap 是否修复闰月，假如当月不是闰月则不生效
 * @returns 长生12神从寅宫开始的顺序
 */
export const getchangsheng12 = (
  solarDateStr: string,
  timeIndex: number,
  gender: Gender,
  fixLeap?: boolean,
): StarName[] => {
  const changsheng12: StarName[] = [];
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0);
  const [, earthlyBranchNameOfYear] = yearly;
  const earthlyBranchOfYear = kot<EarthlyBranchKey>(earthlyBranchNameOfYear);
  // 获取命宫干支，需要通过命宫干支计算五行局
  const { heavenlyStemOfSoul, earthlyBranchOfSoul } = getSoulAndBody(solarDateStr, timeIndex, fixLeap);
  // 获取五行局，通过五行局获取起运年龄
  const fiveElementClass = kot<FiveElementsClassKey>(getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul));
  // 长生12神顺序
  const stars: StarName[] = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];

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

    changsheng12[idx] = t(stars[i]) as StarName;
  }

  return changsheng12;
};

/**
 * 博士12神。
 *
 * 从禄存起，阳男阴女顺行，阴男阳女逆行。安博士、力士、青龙、小耗、将军、奏书、飞廉、喜神、病符、大耗、伏兵、官府。
 *
 * @param solarDateStr 阳历日期字符串
 * @param gender 性别【男｜女】
 * @returns 博士12神从寅宫开始的顺序
 */
export const getBoShi12 = (solarDateStr: string, gender: Gender): StarName[] => {
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0);
  const [heavenlyStemNameOfYear, earthlyBranchNameOfYear] = yearly;
  const heavenlyStemOfYear = kot<HeavenlyStemKey>(heavenlyStemNameOfYear);
  const earthlyBranchOfYear = kot<EarthlyBranchKey>(earthlyBranchNameOfYear);
  // 博士12神的顺序
  const stars: StarName[] = [
    '博士',
    '力士',
    '青龙',
    '小耗',
    '将军',
    '奏书',
    '蜚廉',
    '喜神',
    '病符',
    '大耗',
    '伏兵',
    '官府',
  ];
  const { luIndex } = getLuYangTuoMaIndex(heavenlyStemOfYear, earthlyBranchOfYear);
  const boshi12: StarName[] = [];

  for (let i = 0; i < stars.length; i++) {
    // 阳男阴女顺行，阴男阳女逆部
    const idx = fixIndex(GENDER[gender] === earthlyBranches[earthlyBranchOfYear].yinYang ? luIndex + i : luIndex - i);

    boshi12[idx] = t(stars[i]) as StarName;
  }

  return boshi12;
};

/**
 * 流年诸星。
 *
 * - 流年岁前诸星
 *   - 流年地支起岁建，岁前首先是晦气，
 *   - 丧门贯索及官符，小耗大耗龙德继，
 *   - 白虎天德连吊客，病符居后须当记。
 *
 * - 安流年将前诸星（按流年地支起将星）
 *   - 寅午戍年将星午，申子辰年子将星，
 *   - 巳酉丑将酉上驻，亥卯未将卯上停。
 *   - 攀鞍岁驿并息神，华盖劫煞灾煞轻，
 *   - 天煞指背咸池续，月煞亡神次第行。
 *
 * @param solarDateStr 阳历日期字符串
 * @returns 流年诸星从寅宫开始的顺序
 */
export const getYearly12 = (solarDateStr: string): { suiqian12: StarName[]; jiangqian12: StarName[] } => {
  const jiangqian12: StarName[] = [];
  const suiqian12: StarName[] = [];

  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0);

  const [, earthlyBranchOfYear] = yearly;
  const ts12shen: StarName[] = [
    '岁建',
    '晦气',
    '丧门',
    '贯索',
    '官符',
    '小耗',
    '大耗',
    '龙德',
    '白虎',
    '天德',
    '吊客',
    '病符',
  ];

  for (let i = 0; i < ts12shen.length; i++) {
    const idx = fixIndex(fixEarthlyBranchIndex(earthlyBranchOfYear) + i);

    suiqian12[idx] = t(ts12shen[i]) as StarName;
  }

  const jq12shen: StarName[] = [
    '将星',
    '攀鞍',
    '岁驿',
    '息神',
    '华盖',
    '劫煞',
    '灾煞',
    '天煞',
    '指背',
    '咸池',
    '月煞',
    '亡神',
  ];

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

    jiangqian12[idx] = t(jq12shen[i]) as StarName;
  }

  return { suiqian12, jiangqian12 };
};

/**
 * 获取流耀
 *
 * 魁钺昌曲禄羊陀马鸾喜
 *
 * @param heavenlyStem 天干
 * @param earthlyBranch 地支
 */
export const getHoroscopeStar = (
  heavenlyStemName: HeavenlyStemName,
  earthlyBranchName: EarthlyBranchName,
  scope: 'decadal' | 'yearly',
): Star[][] => {
  const heavenlyStem = kot<HeavenlyStemKey>(heavenlyStemName);
  const earthlyBranch = kot<EarthlyBranchKey>(earthlyBranchName);
  const { kuiIndex, yueIndex } = getKuiYueIndex(heavenlyStem);
  const { changIndex, quIndex } = getChangQuIndexByHeavenlyStem(heavenlyStem);
  const { luIndex, yangIndex, tuoIndex, maIndex } = getLuYangTuoMaIndex(heavenlyStem, earthlyBranch);
  const { hongluanIndex, tianxiIndex } = getLuanXiIndex(earthlyBranch);
  const stars = initStars();

  stars[kuiIndex].push({ name: scope === 'decadal' ? '运魁' : '流魁', type: 'soft', scope });
  stars[yueIndex].push({ name: scope === 'decadal' ? '运钺' : '流钺', type: 'soft', scope });
  stars[changIndex].push({ name: scope === 'decadal' ? '运昌' : '流昌', type: 'soft', scope });
  stars[quIndex].push({ name: scope === 'decadal' ? '运曲' : '流曲', type: 'soft', scope });
  stars[luIndex].push({ name: scope === 'decadal' ? '运禄' : '流禄', type: 'lucun', scope });
  stars[yangIndex].push({ name: scope === 'decadal' ? '运羊' : '流羊', type: 'tough', scope });
  stars[tuoIndex].push({ name: scope === 'decadal' ? '运陀' : '流陀', type: 'tough', scope });
  stars[maIndex].push({ name: scope === 'decadal' ? '运马' : '流马', type: 'tianma', scope });
  stars[hongluanIndex].push({ name: scope === 'decadal' ? '运鸾' : '流鸾', type: 'flower', scope });
  stars[tianxiIndex].push({ name: scope === 'decadal' ? '运喜' : '流喜', type: 'flower', scope });

  if (scope === 'yearly') {
    const nianjieIndex = getNianjieIndex(earthlyBranch);

    stars[nianjieIndex].push({ name: '年解', type: 'helper', scope: 'yearly' });
  }

  return stars;
};
