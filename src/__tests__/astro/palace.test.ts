import { astro } from '../..';
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
          heavenlyStemOfSoul: '己',
          earthlyBranchOfSoul: '酉',
        },
      },
      {
        date: '2023-1-22',
        timeIndex: 6,
        result: {
          soulIndex: 6,
          bodyIndex: 6,
          heavenlyStemOfSoul: '戊',
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
      expect(getSoulAndBody({ solarDate: item.date, timeIndex: item.timeIndex })).toStrictEqual(item.result);
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
    const result = getHoroscope({
      solarDate: '2023-11-15',
      timeIndex: 3,
      gender: '女',
    });

    expect(result.ages).toStrictEqual([
      [12, 24, 36, 48, 60, 72, 84, 96, 108, 120],
      [11, 23, 35, 47, 59, 71, 83, 95, 107, 119],
      [10, 22, 34, 46, 58, 70, 82, 94, 106, 118],
      [9, 21, 33, 45, 57, 69, 81, 93, 105, 117],
      [8, 20, 32, 44, 56, 68, 80, 92, 104, 116],
      [7, 19, 31, 43, 55, 67, 79, 91, 103, 115],
      [6, 18, 30, 42, 54, 66, 78, 90, 102, 114],
      [5, 17, 29, 41, 53, 65, 77, 89, 101, 113],
      [4, 16, 28, 40, 52, 64, 76, 88, 100, 112],
      [3, 15, 27, 39, 51, 63, 75, 87, 99, 111],
      [2, 14, 26, 38, 50, 62, 74, 86, 98, 110],
      [1, 13, 25, 37, 49, 61, 73, 85, 97, 109],
    ]);
  });

  test('getHoroscope() for male', () => {
    const result = getHoroscope({
      solarDate: '2023-11-15',
      timeIndex: 3,
      gender: '男',
    });

    expect(result.ages).toStrictEqual([
      [2, 14, 26, 38, 50, 62, 74, 86, 98, 110],
      [3, 15, 27, 39, 51, 63, 75, 87, 99, 111],
      [4, 16, 28, 40, 52, 64, 76, 88, 100, 112],
      [5, 17, 29, 41, 53, 65, 77, 89, 101, 113],
      [6, 18, 30, 42, 54, 66, 78, 90, 102, 114],
      [7, 19, 31, 43, 55, 67, 79, 91, 103, 115],
      [8, 20, 32, 44, 56, 68, 80, 92, 104, 116],
      [9, 21, 33, 45, 57, 69, 81, 93, 105, 117],
      [10, 22, 34, 46, 58, 70, 82, 94, 106, 118],
      [11, 23, 35, 47, 59, 71, 83, 95, 107, 119],
      [12, 24, 36, 48, 60, 72, 84, 96, 108, 120],
      [1, 13, 25, 37, 49, 61, 73, 85, 97, 109],
    ]);
  });

  test('fliesTo() & notFlyTo() & fliesOneOfTo()', () => {
    const astrolabe = astro.bySolar('2017-12-4', 12, 'male');

    expect(astrolabe.palace('命宫')?.fliesTo('兄弟', '忌')).toBeTruthy();
    expect(astrolabe.palace('命宫')?.notFlyTo('兄弟', '科')).toBeTruthy();
    expect(astrolabe.palace('田宅')?.fliesTo('福德', ['禄', '科'])).toBeTruthy();
    expect(astrolabe.palace('田宅')?.notFlyTo('福德', ['禄', '科'])).toBeFalsy();
    expect(astrolabe.palace('兄弟')?.fliesTo('夫妻', ['权', '科'])).toBeFalsy();
    expect(astrolabe.palace('兄弟')?.fliesOneOfTo('夫妻', ['权', '科'])).toBeTruthy();
    expect(astrolabe.palace('兄弟')?.fliesOneOfTo('夫妻', ['权', '禄'])).toBeFalsy();
    expect(astrolabe.palace('兄弟')?.notFlyTo('夫妻', ['权', '科'])).toBeFalsy();
    expect(astrolabe.palace('仆役')?.selfMutaged('科')).toBeTruthy();
    expect(astrolabe.palace('仆役')?.selfMutaged(['科', '权'])).toBeFalsy();
    expect(astrolabe.palace('仆役')?.selfMutagedOneOf(['科', '权'])).toBeTruthy();
    expect(astrolabe.palace('仆役')?.selfMutagedOneOf()).toBeTruthy();
    expect(astrolabe.palace('仆役')?.selfMutaged('权')).toBeFalsy();
    expect(astrolabe.palace('仆役')?.notSelfMutaged()).toBeFalsy();
    expect(astrolabe.palace('仆役')?.notSelfMutaged('权')).toBeTruthy();
    expect(astrolabe.palace('仆役')?.notSelfMutaged(['权', '科'])).toBeFalsy();

    const palaces = astrolabe.palace('命宫')?.mutagedPlaces() ?? [];

    expect(palaces).toHaveLength(4);
    expect(palaces[0]).toHaveProperty('name', '命宫');
    expect(palaces[1]).toHaveProperty('name', '迁移');
    expect(palaces[2]).toHaveProperty('name', '仆役');
    expect(palaces[3]).toHaveProperty('name', '兄弟');
  });
});
