import { getFiveElementsClass, getSoulAndBody } from '../../astro';
import { FiveElementsClass } from '../../data/types';

describe('astro/palace', () => {
  test('getSoulAndBody()', () => {
    const data = [
      {
        date: '2023-1-22',
        timeIndex: 5,
        result: {
          soulIndex: 7,
          bodyIndex: 5,
          heavenlyStemOfSoul: '辛',
          earthlyBranchOfSoul: '酉',
        },
      },
      {
        date: '2023-1-22',
        timeIndex: 6,
        result: {
          soulIndex: 6,
          bodyIndex: 6,
          heavenlyStemOfSoul: '庚',
          earthlyBranchOfSoul: '申',
        },
      },
    ];

    data.forEach((item) => {
      expect(getSoulAndBody(item.date, item.timeIndex)).toStrictEqual(item.result);
    });
  });

  test('getFiveElementsClass()', () => {
    expect(getFiveElementsClass('庚', '申')).toBe(FiveElementsClass[3]);
    expect(getFiveElementsClass('己', '未')).toBe(FiveElementsClass[6]);
    expect(getFiveElementsClass('戊', '午')).toBe(FiveElementsClass[6]);
    expect(getFiveElementsClass('丁', '巳')).toBe(FiveElementsClass[5]);
    expect(getFiveElementsClass('丙', '辰')).toBe(FiveElementsClass[5]);
    expect(getFiveElementsClass('乙', '卯')).toBe(FiveElementsClass[2]);
    expect(getFiveElementsClass('甲', '寅')).toBe(FiveElementsClass[2]);
    expect(getFiveElementsClass('乙', '丑')).toBe(FiveElementsClass[4]);
    expect(getFiveElementsClass('甲', '子')).toBe(FiveElementsClass[4]);
    expect(getFiveElementsClass('癸', '亥')).toBe(FiveElementsClass[2]);
    expect(getFiveElementsClass('壬', '戌')).toBe(FiveElementsClass[2]);
    expect(getFiveElementsClass('辛', '酉')).toBe(FiveElementsClass[3]);
  });
});
