import { getTotalDaysOfLunarMonth } from '../calendar';
import { FiveElementsClass, FiveElementsClassItem } from '../data/types';
import { fixIndex } from '../utils';

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
 * @param fiveElements 五行局
 * @param lunarYear 农历年
 * @param lunarMonth 农历月
 * @param lunarDay 农历日
 * @param timeIndex 时辰索引【0～12】
 * @returns 紫微和天府星所在宫位索引
 */
export const getStartIndex = (
  fiveElements: FiveElementsClassItem,
  lunarYear: number,
  lunarMonth: number,
  lunarDay: number,
  timeIndex: number,
) => {
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
