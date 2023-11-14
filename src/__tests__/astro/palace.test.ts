import { getFiveElementsClass, getSoulAndBody, getPalaceNames, getHoroscope } from '../../astro';
import { FiveElementsClass } from '../../data';
import { t } from '../../i18n';

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
      {
        date: '2023-2-19',
        timeIndex: 12,
        result: {
          soulIndex: 0,
          bodyIndex: 0,
          heavenlyStemOfSoul: '甲',
          earthlyBranchOfSoul: '寅',
        },
      },
    ];

    data.forEach((item) => {
      expect(getSoulAndBody(item.date, item.timeIndex)).toStrictEqual(item.result);
    });
  });

  test('getFiveElementsClass()', () => {
    expect(getFiveElementsClass('庚', '申')).toBe(t(FiveElementsClass[3]));
    expect(getFiveElementsClass('己', '未')).toBe(t(FiveElementsClass[6]));
    expect(getFiveElementsClass('戊', '午')).toBe(t(FiveElementsClass[6]));
    expect(getFiveElementsClass('丁', '巳')).toBe(t(FiveElementsClass[5]));
    expect(getFiveElementsClass('丙', '辰')).toBe(t(FiveElementsClass[5]));
    expect(getFiveElementsClass('乙', '卯')).toBe(t(FiveElementsClass[2]));
    expect(getFiveElementsClass('甲', '寅')).toBe(t(FiveElementsClass[2]));
    expect(getFiveElementsClass('乙', '丑')).toBe(t(FiveElementsClass[4]));
    expect(getFiveElementsClass('甲', '子')).toBe(t(FiveElementsClass[4]));
    expect(getFiveElementsClass('癸', '亥')).toBe(t(FiveElementsClass[2]));
    expect(getFiveElementsClass('壬', '戌')).toBe(t(FiveElementsClass[2]));
    expect(getFiveElementsClass('辛', '酉')).toBe(t(FiveElementsClass[3]));
  });

  test('getPalaceNames() should return correct list', () => {
    const targetList = ['兄弟', '命宫', '父母', '福德', '田宅', '官禄', '仆役', '迁移', '疾厄', '财帛', '子女', '夫妻'];
    expect(getPalaceNames(1)).toStrictEqual(targetList);
    expect(getPalaceNames(13)).toStrictEqual(targetList);
    expect(getPalaceNames(-11)).toStrictEqual(targetList);
  });

  test('getHoroscope() for female', () => {
    const result = getHoroscope('2023-11-15', 3, '女');

    expect(result.ages).toStrictEqual([
      [12, 24, 36, 48, 60, 72, 84],
      [11, 23, 35, 47, 59, 71, 83],
      [10, 22, 34, 46, 58, 70, 82],
      [9, 21, 33, 45, 57, 69, 81],
      [8, 20, 32, 44, 56, 68, 80],
      [7, 19, 31, 43, 55, 67, 79],
      [6, 18, 30, 42, 54, 66, 78],
      [5, 17, 29, 41, 53, 65, 77],
      [4, 16, 28, 40, 52, 64, 76],
      [3, 15, 27, 39, 51, 63, 75],
      [2, 14, 26, 38, 50, 62, 74],
      [1, 13, 25, 37, 49, 61, 73],
    ]);
  });

  test('getHoroscope() for male', () => {
    const result = getHoroscope('2023-11-15', 3, '男');

    expect(result.ages).toStrictEqual([
      [2, 14, 26, 38, 50, 62, 74],
      [3, 15, 27, 39, 51, 63, 75],
      [4, 16, 28, 40, 52, 64, 76],
      [5, 17, 29, 41, 53, 65, 77],
      [6, 18, 30, 42, 54, 66, 78],
      [7, 19, 31, 43, 55, 67, 79],
      [8, 20, 32, 44, 56, 68, 80],
      [9, 21, 33, 45, 57, 69, 81],
      [10, 22, 34, 46, 58, 70, 82],
      [11, 23, 35, 47, 59, 71, 83],
      [12, 24, 36, 48, 60, 72, 84],
      [1, 13, 25, 37, 49, 61, 73],
    ]);
  });
});
