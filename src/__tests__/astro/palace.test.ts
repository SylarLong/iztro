import { getFiveElementsClass, getSoulAndBody, getPalaceNames } from '../../astro';
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
});
