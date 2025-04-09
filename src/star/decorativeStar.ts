import { getHeavenlyStemAndEarthlyBranchBySolarDate } from 'lunar-lite';
import { getConfig, getFiveElementsClass, getSoulAndBody } from '../astro';
import { GENDER, earthlyBranches, FiveElementsClass } from '../data';
import {
  StarName,
  t,
  EarthlyBranchKey,
  kot,
  FiveElementsClassKey,
  EarthlyBranchName,
  FiveElementsClassName,
  GenderName,
  GenderKey,
  StarKey,
} from '../i18n';
import { fixEarthlyBranchIndex, fixIndex } from '../utils';
import { getLuYangTuoMaIndex } from './location';
import { AstrolabeParam } from '../data/types';

/**
 * 获取长生12神开始的宫位索引
 *
 * - 水二局长生在申
 * - 木三局长生在亥
 * - 金四局长生在巳
 * - 土五局长生在申
 * - 火六局长生在寅，
 * @param fiveElementClassName 五行局
 * @returns 长生12神开始的索引
 */
export const getChangesheng12StartIndex = (fiveElementClassName: FiveElementsClassName) => {
  const fiveElementClass = kot<FiveElementsClassKey>(fiveElementClassName);
  let startIdx = 0;

  switch (FiveElementsClass[fiveElementClass]) {
    case 2: {
      startIdx = fixEarthlyBranchIndex('shen');
      break;
    }
    case 3: {
      startIdx = fixEarthlyBranchIndex('hai');
      break;
    }
    case 4: {
      startIdx = fixEarthlyBranchIndex('si');
      break;
    }
    case 5: {
      startIdx = fixEarthlyBranchIndex('shen');
      break;
    }
    case 6: {
      startIdx = fixEarthlyBranchIndex('yin');
      break;
    }
  }

  return startIdx;
};

/**
 * 长生12神。
 *
 * 阳男阴女顺行，阴男阳女逆行，安长生、沐浴、冠带、临官、帝旺、衰、病、死、墓、绝 、胎、养。
 *
 * @param {AstrolabeParam} param 通用排盘参数
 * @returns 长生12神从寅宫开始的顺序
 */
export const getchangsheng12 = (param: AstrolabeParam): StarName[] => {
  const { solarDate, gender } = param;
  const changsheng12: StarName[] = [];
  const genderKey = kot<GenderKey>(gender!);
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDate, 0, {
    year: getConfig().yearDivide,
  });
  const [, earthlyBranchNameOfYear] = yearly;
  const earthlyBranchOfYear = kot<EarthlyBranchKey>(earthlyBranchNameOfYear, 'Earthly');
  // 获取命宫干支，需要通过命宫干支计算五行局
  const { heavenlyStemOfSoul, earthlyBranchOfSoul } = getSoulAndBody(param);
  // 获取五行局，通过五行局获取起运年龄
  const fiveElementClass = getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul);
  // 长生12神顺序
  const stars: StarKey[] = [
    'changsheng',
    'muyu',
    'guandai',
    'linguan',
    'diwang',
    'shuai',
    'bing',
    'si',
    'mu',
    'jue',
    'tai',
    'yang',
  ];
  const startIdx = getChangesheng12StartIndex(fiveElementClass);

  for (let i = 0; i < stars.length; i++) {
    let idx = 0;

    if (GENDER[genderKey] === earthlyBranches[earthlyBranchOfYear].yinYang) {
      idx = fixIndex(i + startIdx);
    } else {
      idx = fixIndex(startIdx - i);
    }

    changsheng12[idx] = t(stars[i]);
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
export const getBoShi12 = (solarDateStr: string, gender: GenderName): StarName[] => {
  const genderKey = kot<GenderKey>(gender);
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0, {
    year: getConfig().yearDivide,
  });
  const [heavenlyStemNameOfYear, earthlyBranchNameOfYear] = yearly;
  const earthlyBranchOfYear = kot<EarthlyBranchKey>(earthlyBranchNameOfYear, 'Earthly');
  // 博士12神的顺序
  const stars: StarKey[] = [
    'boshi',
    'lishi',
    'qinglong',
    'xiaohao',
    'jiangjun',
    'zhoushu',
    'faylian',
    'xishen',
    'bingfu',
    'dahao',
    'fubing',
    'guanfu',
  ];
  const { luIndex } = getLuYangTuoMaIndex(heavenlyStemNameOfYear, earthlyBranchNameOfYear);
  const boshi12: StarName[] = [];

  for (let i = 0; i < stars.length; i++) {
    // 阳男阴女顺行，阴男阳女逆部
    const idx = fixIndex(
      GENDER[genderKey] === earthlyBranches[earthlyBranchOfYear].yinYang ? luIndex + i : luIndex - i,
    );

    boshi12[idx] = t(stars[i]);
  }

  return boshi12;
};

/**
 * 安流年将前诸星（按流年地支起将星）
 * - 寅午戍年将星午，申子辰年子将星，
 * - 巳酉丑将酉上驻，亥卯未将卯上停。
 * - 攀鞍岁驿并息神，华盖劫煞灾煞轻，
 * - 天煞指背咸池续，月煞亡神次第行。
 *
 * @param earthlyBranchName 地支
 * @returns 将前诸星起始索引
 */
export const getJiangqian12StartIndex = (earthlyBranchName: EarthlyBranchName) => {
  let jqStartIdx = -1;
  const earthlyBranchOfYear = kot<EarthlyBranchKey>(earthlyBranchName, 'Earthly');

  if (['yinEarthly', 'wuEarthly', 'xuEarthly'].includes(earthlyBranchOfYear)) {
    jqStartIdx = fixEarthlyBranchIndex('woo');
  } else if (['shenEarthly', 'ziEarthly', 'chenEarthly'].includes(earthlyBranchOfYear)) {
    jqStartIdx = fixEarthlyBranchIndex('zi');
  } else if (['siEarthly', 'youEarthly', 'chouEarthly'].includes(earthlyBranchOfYear)) {
    jqStartIdx = fixEarthlyBranchIndex('you');
  } else if (['haiEarthly', 'maoEarthly', 'weiEarthly'].includes(earthlyBranchOfYear)) {
    jqStartIdx = fixEarthlyBranchIndex('mao');
  }

  return fixIndex(jqStartIdx);
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
export const getYearly12 = (solarDateStr: string | Date): { suiqian12: StarName[]; jiangqian12: StarName[] } => {
  const jiangqian12: StarName[] = [];
  const suiqian12: StarName[] = [];
  const { algorithm } = getConfig();
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, 0, {
    // 流年神煞应该用立春为界，但为了满足不同流派的需求允许配置
    year: getConfig().horoscopeDivide,
  });

  // 中州派的大耗叫岁破
  const ts12shen: StarKey[] =
    algorithm === 'zhongzhou'
      ? [
          'suijian',
          'huiqi',
          'sangmen',
          'guansuo',
          'gwanfu',
          'xiaohao',
          'suipo',
          'longde',
          'baihu',
          'tiande',
          'diaoke',
          'bingfu',
        ]
      : [
          'suijian',
          'huiqi',
          'sangmen',
          'guansuo',
          'gwanfu',
          'xiaohao',
          'dahao',
          'longde',
          'baihu',
          'tiande',
          'diaoke',
          'bingfu',
        ];

  for (let i = 0; i < ts12shen.length; i++) {
    const idx = fixIndex(fixEarthlyBranchIndex(yearly[1]) + i);

    suiqian12[idx] = t(ts12shen[i]);
  }

  const jq12shen: StarKey[] = [
    'jiangxing',
    'panan',
    'suiyi',
    'xiishen',
    'huagai',
    'jiesha',
    'zhaisha',
    'tiansha',
    'zhibei',
    'xianchi',
    'yuesha',
    'wangshen',
  ];

  const jiangqian12StartIndex = getJiangqian12StartIndex(yearly[1]);

  for (let i = 0; i < jq12shen.length; i++) {
    const idx = fixIndex(jiangqian12StartIndex + i);

    jiangqian12[idx] = t(jq12shen[i]);
  }

  return { suiqian12, jiangqian12 };
};
