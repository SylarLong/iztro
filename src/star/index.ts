import { FiveElementsClass, FiveElementsClassItem } from '../data/types';
import { fixIndex } from '../utils';

export const getStartIndex = (fiveElements: FiveElementsClassItem, timeIndex: number, lunarDay: number = 0) => {
  let remainder = -1; // 余数
  let quotient; // 商
  let offset = -1; // 循环次数

  // 如果timeIndex等于12说明是晚子时，需要加一天
  const _day = timeIndex === 12 ? lunarDay + 1 : lunarDay;

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
