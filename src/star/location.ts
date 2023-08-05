import { getFiveElementsClass, getSoulAndBody } from '../astro';
import { getTotalDaysOfLunarMonth, solar2lunar } from '../calendar';
import { EARTHLY_BRANCHES, HEAVENLY_STEMS } from '../data';
import { EarthlyBranch, FiveElementsClass, HeavenlyStem } from '../data/types';
import { fixEarthlyBranchIndex, fixIndex } from '../utils';

/**
 * 起紫微星诀算法
 *
 * - 六五四三二，酉午亥辰丑，
 * - 局数除日数，商数宫前走；
 * - 若见数无余，便要起虎口，
 * - 日数小於局，还直宫中守。
 *
 * 举例：
 * - 例一：27日出生木三局，以三除27，循环0次就可以整除，27➗3=9，从寅进9格，在戍安紫微。
 * - 例二：13日出生火六局，以六除13，最少需要加5才能整除， 18➗8=3，从寅进3格为辰，添加数为5（奇数），故要逆回五宫，在亥安紫微。
 * - 例三：6日出生土五局，以五除6，最少需要加4才能整除，10➗5=2，从寅进2格为卯，添加数为4（偶数），顺行4格为未，在未安紫微。
 *
 * @param solarDateStr 公历日期 YYYY-MM-DD
 * @param timeIndex 时辰索引【0～12】
 * @param fixLeap 是否调整农历闰月（若该月不是闰月则不会生效）
 * @returns 紫微和天府星所在宫位索引
 */
export const getStartIndex = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
  const { heavenlyStemOfSoul, earthlyBranchOfSoul } = getSoulAndBody(solarDateStr, timeIndex, fixLeap);
  const { lunarYear, lunarMonth, lunarDay } = solar2lunar(solarDateStr);
  const fiveElements = getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul);
  let remainder = -1; // 余数
  let quotient; // 商
  let offset = -1; // 循环次数

  // 获取当月最大天数
  const maxDays = getTotalDaysOfLunarMonth(lunarYear, lunarMonth);

  // 如果timeIndex等于12说明是晚子时，需要加一天
  let _day = timeIndex === 12 ? lunarDay + 1 : lunarDay;

  if (_day > maxDays) {
    // 假如日期超过当月最大天数，说明跨月了，需要处理为合法日期
    _day -= maxDays;
  }

  do {
    // 农历出生日（初一为1，以此类推）加上偏移量作为除数，以这个数处以五行局的数向下取整
    // 需要一直运算到余数为0为止
    offset++;

    const divisor = _day + offset;

    quotient = Math.floor(divisor / FiveElementsClass[fiveElements]);
    remainder = divisor % FiveElementsClass[fiveElements];
  } while (remainder !== 0);

  // 将商除以12取余数
  quotient %= 12;

  // 以商减一（因为需要从0开始）作为起始位置
  let ziweiIndex = quotient - 1;

  if (offset % 2 === 0) {
    // 若循环次数为偶数，则索引逆时针数到循环数
    ziweiIndex += offset;
  } else {
    // 若循环次数为偶数，则索引顺时针数到循环数
    ziweiIndex -= offset;
  }

  ziweiIndex = fixIndex(ziweiIndex);

  // 天府星位置与紫微星相对
  const tianfuIndex = fixIndex(12 - ziweiIndex);

  return { ziweiIndex, tianfuIndex };
};

/**
 * 按年干支计算禄存、擎羊，陀罗、天马的索引
 *
 * 定禄存、羊、陀诀（按年干）
 *
 * - 甲禄到寅宫，乙禄居卯府。
 * - 丙戊禄在巳，丁己禄在午。
 * - 庚禄定居申，辛禄酉上补。
 * - 壬禄亥中藏，癸禄居子户。
 * - 禄前羊刃当，禄后陀罗府。
 *
 * 安天马（按年支），天马只会出现在四马地【寅申巳亥】
 *
 * - 寅午戍年马在申，申子辰年马在寅。
 * - 巳酉丑年马在亥，亥卯未年马在巳。
 *
 * @param heavenlyStem 天干
 * @param earthlyBranch 地支
 * @returns 禄存、擎羊，陀罗、天马的索引
 */
export const getLuYangTuoMaIndex = (heavenlyStem: HeavenlyStem, earthlyBranch: EarthlyBranch) => {
  let luIndex = -1; // 禄存索引
  let maIndex = -1; // 天马索引

  switch (earthlyBranch) {
    case '寅':
    case '午':
    case '戌':
      maIndex = fixEarthlyBranchIndex('申');
      break;
    case '申':
    case '子':
    case '辰':
      maIndex = fixEarthlyBranchIndex('寅');
      break;
    case '巳':
    case '酉':
    case '丑':
      maIndex = fixEarthlyBranchIndex('亥');
      break;
    case '亥':
    case '卯':
    case '未':
      maIndex = fixEarthlyBranchIndex('巳');
      break;
  }

  switch (heavenlyStem) {
    case '甲': {
      luIndex = fixEarthlyBranchIndex('寅');
      break;
    }
    case '乙': {
      luIndex = fixEarthlyBranchIndex('卯');
      break;
    }
    case '丙':
    case '戊': {
      luIndex = fixEarthlyBranchIndex('巳');
      break;
    }
    case '丁':
    case '己': {
      luIndex = fixEarthlyBranchIndex('午');
      break;
    }
    case '庚': {
      luIndex = fixEarthlyBranchIndex('申');
      break;
    }
    case '辛': {
      luIndex = fixEarthlyBranchIndex('酉');
      break;
    }
    case '壬': {
      luIndex = fixEarthlyBranchIndex('亥');
      break;
    }
    case '癸': {
      luIndex = fixEarthlyBranchIndex('子');
      break;
    }
  }

  return {
    luIndex,
    maIndex,
    yangIndex: fixIndex(luIndex + 1),
    tuoIndex: fixIndex(luIndex - 1),
  };
};

/**
 * 获取天魁天钺所在宫位索引（按年干）
 *
 * - 甲戊庚之年丑未
 * - 乙己之年子申
 * - 辛年午寅
 * - 壬癸之年卯巳
 * - 丙丁之年亥酉
 *
 * @param heavenlyStem 天干
 * @returns
 */
export const getKuiYueIndex = (heavenlyStem: HeavenlyStem) => {
  let kuiIndex = -1;
  let yueIndex = -1;

  switch (heavenlyStem) {
    case '甲':
    case '戊':
    case '庚':
      kuiIndex = fixEarthlyBranchIndex('丑');
      yueIndex = fixEarthlyBranchIndex('未');
      break;
    case '乙':
    case '己':
      kuiIndex = fixEarthlyBranchIndex('子');
      yueIndex = fixEarthlyBranchIndex('申');
      break;
    case '辛':
      kuiIndex = fixEarthlyBranchIndex('午');
      yueIndex = fixEarthlyBranchIndex('寅');
      break;
    case '丙':
    case '丁':
      kuiIndex = fixEarthlyBranchIndex('亥');
      yueIndex = fixEarthlyBranchIndex('酉');
      break;
    case '壬':
    case '癸':
      kuiIndex = fixEarthlyBranchIndex('卯');
      yueIndex = fixEarthlyBranchIndex('巳');
      break;
  }

  return { kuiIndex, yueIndex };
};

/**
 * 获取左辅右弼的索引（按生月）
 *
 * - 辰上顺正寻左辅
 * - 戌上逆正右弼当
 *
 * 解释：
 *
 * - 从辰顺数农历月份数是左辅的索引
 * - 从戌逆数农历月份数是右弼的索引
 *
 * @param lunarMonth 农历月份
 * @returns 左辅、右弼索引
 */
export const getZuoYouIndex = (lunarMonth: number) => {
  const zuoIndex = fixIndex(fixEarthlyBranchIndex('辰') + (lunarMonth - 1));
  const youIndex = fixIndex(fixEarthlyBranchIndex('戌') - (lunarMonth - 1));

  return { zuoIndex, youIndex };
};

/**
 * 获取文昌文曲的索引（按时支）
 *
 * - 辰上顺时文曲位
 * - 戌上逆时觅文昌
 *
 * 解释：
 *
 * - 从辰顺数到时辰地支索引是文曲的索引
 * - 从戌逆数到时辰地支索引是文昌的索引
 *
 * 由于时辰地支的索引即是时辰的序号，所以可以直接使用时辰的序号
 *
 * @param timeIndex 时辰索引【0～11】
 * @returns 文昌、文曲索引
 */
export const getChangQuIndex = (timeIndex: number) => {
  const changIndex = fixIndex(fixEarthlyBranchIndex('戌') - timeIndex);
  const quIndex = fixIndex(fixEarthlyBranchIndex('辰') + timeIndex);

  return { changIndex, quIndex };
};

/**
 * 获取地空地劫的索引（按时支）
 *
 * - 亥上子时顺安劫
 * - 逆回便是地空亡
 *
 * 解释：
 *
 * - 从亥顺数到时辰地支索引是地劫的索引
 * - 从亥逆数到时辰地支索引是地空的索引
 *
 * 由于时辰地支的索引即是时辰的序号，所以可以直接使用时辰的序号
 *
 * @param timeIndex 时辰索引【0～11】
 * @returns 地空、地劫索引
 */
export const getKongJieIndex = (timeIndex: number) => {
  const kongIndex = fixIndex(fixEarthlyBranchIndex('亥') - timeIndex);
  const jieIndex = fixIndex(fixEarthlyBranchIndex('亥') + timeIndex);

  return { kongIndex, jieIndex };
};

/**
 * 获取火星铃星索引（按年支以及时支）
 *
 * - 申子辰人寅戌扬
 * - 寅午戌人丑卯方
 * - 巳酉丑人卯戌位
 * - 亥卯未人酉戌房
 *
 * 起火铃二曜先据出生年支，依口诀定火铃起子时位。
 *
 * 例如壬辰年卯时生人，据[申子辰人寅戌扬]口诀，故火星在寅宫起子时，铃星在戌宫起子时，顺数至卯时，即火星在巳，铃星在丑。
 *
 * @param earthlyBranch 地支
 * @param timeIndex 时辰序号
 * @returns 火星、铃星索引
 */
export const getHuoLingIndex = (earthlyBranch: EarthlyBranch, timeIndex: number) => {
  let huoIndex = -1;
  let lingIndex = -1;

  switch (earthlyBranch) {
    case '寅':
    case '午':
    case '戌': {
      huoIndex = fixEarthlyBranchIndex('丑') + timeIndex;
      lingIndex = fixEarthlyBranchIndex('卯') + timeIndex;
      break;
    }
    case '申':
    case '子':
    case '辰': {
      huoIndex = fixEarthlyBranchIndex('寅') + timeIndex;
      lingIndex = fixEarthlyBranchIndex('戌') + timeIndex;
      break;
    }
    case '巳':
    case '酉':
    case '丑': {
      huoIndex = fixEarthlyBranchIndex('卯') + timeIndex;
      lingIndex = fixEarthlyBranchIndex('戌') + timeIndex;
      break;
    }
    case '亥':
    case '未':
    case '卯': {
      huoIndex = fixEarthlyBranchIndex('酉') + timeIndex;
      lingIndex = fixEarthlyBranchIndex('戌') + timeIndex;
      break;
    }
  }

  return {
    huoIndex: fixIndex(huoIndex),
    lingIndex: fixIndex(lingIndex),
  };
};

/**
 * 获取红鸾天喜所在宫位索引
 *
 * - 卯上起子逆数之
 * - 数到当生太岁支
 * - 坐守此宫红鸾位
 * - 对宫天喜不差移
 *
 * @param earthlyBranch 年支
 * @returns 红鸾、天喜索引
 */
export const getLuanXiIndex = (earthlyBranch: EarthlyBranch) => {
  const hongluanIndex = fixIndex(fixEarthlyBranchIndex('卯') - EARTHLY_BRANCHES.indexOf(earthlyBranch));

  const tianxiIndex = fixIndex(hongluanIndex + 6);

  return { hongluanIndex, tianxiIndex };
};
