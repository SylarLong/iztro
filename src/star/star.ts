import { getTotalDaysOfLunarMonth } from '../calendar';
import { FiveElementsClass, FiveElementsClassItem, Star, LunarDate } from '../data/types';
import { fixIndex } from '../utils';

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
 * @param ziweiIndex 紫微星索引
 * @param tianfuIndex 天府星索引
 * @returns {Array<Star[]>} 从寅宫开始每一个宫的星耀
 */
export const getPrimaryStar = (ziweiIndex: number, tianfuIndex: number) => {
  const stars: Array<Star[]> = [[], [], [], [], [], [], [], [], [], [], [], []];
  const ziweiGroup = ['紫微', '天机', '', '太阳', '武曲', '天同', '', '', '廉贞'];
  const tianfuGroup = ['天府', '太阴', '贪狼', '巨门', '天相', '天梁', '七杀', '', '', '', '破军'];

  ziweiGroup.forEach((s, i) => {
    // 安紫微星系，起始宫逆时针安
    s &&
      stars[fixIndex(ziweiIndex - i)].push({
        name: s,
        type: 'primary',
        scope: 'origin',
      });
  });

  tianfuGroup.forEach((s, i) => {
    s &&
      stars[fixIndex(tianfuIndex + i)].push({
        name: s,
        type: 'primary',
        scope: 'origin',
      });
  });

  return stars;
};

export const setSecondaryStar = (lunarDate: LunarDate, timeIndex: number, fixLeap?: boolean) => {
  
};
