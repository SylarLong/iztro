import { astro } from '../..';
import { EarthlyBranchName, HeavenlyStemName } from '../../i18n';
import {
  getLuYangTuoMaIndex,
  getKuiYueIndex,
  getZuoYouIndex,
  getChangQuIndex,
  getKongJieIndex,
  getHuoLingIndex,
  getLuanXiIndex,
  getYearlyStarIndex,
  getNianjieIndex,
  getTimelyStarIndex,
  getMonthlyStarIndex,
  getDailyStarIndex,
  getChangQuIndexByHeavenlyStem,
  getHuagaiXianchiIndex,
  getGuGuaIndex,
  getDahaoIndex,
} from '../../star';

describe('star/location', () => {
  test('getDahaoIndex()', () => {
    const index = getDahaoIndex('siEarthly');

    expect(index).toBe(8);
  });

  test('santai bazuo for lunar month', () => {
    const result = astro.withOptions({
      type: 'solar',
      dateStr: '1979-08-21',
      timeIndex: 6,
      gender: 'male',
      language: 'zh-CN',
    });

    const santaiIndex = result.star('三台').palace()!.index;
    const bazuoIndex = result.star('八座').palace()!.index;

    expect(santaiIndex).toBe(0);
    expect(bazuoIndex).toBe(10);
  });

  test('xunkong for yin year', () => {
    const result = astro.withOptions({
      type: 'solar',
      dateStr: '1979-08-21',
      timeIndex: 6,
      gender: 'male',
      language: 'zh-CN',
    });

    const xunkongIndex = result.star('旬空').palace()!.index;

    expect(xunkongIndex).toBe(11);
  });

  test('xunkong for yang year', () => {
    const result = astro.withOptions({
      type: 'solar',
      dateStr: '1980-08-21',
      timeIndex: 6,
      gender: 'male',
      language: 'zh-CN',
    });

    const xunkongIndex = result.star('旬空').palace()!.index;

    expect(xunkongIndex).toBe(10);
  });

  test('getLuYangTuoMaIndex()', () => {
    const data = [
      {
        heavenlyStem: '癸',
        earthlyBranch: '卯',
        result: {
          luIndex: 10,
          yangIndex: 11,
          tuoIndex: 9,
          maIndex: 3,
        },
      },
      {
        heavenlyStem: '庚',
        earthlyBranch: '寅',
        result: {
          luIndex: 6,
          yangIndex: 7,
          tuoIndex: 5,
          maIndex: 6,
        },
      },
      {
        heavenlyStem: '辛',
        earthlyBranch: '巳',
        result: {
          luIndex: 7,
          yangIndex: 8,
          tuoIndex: 6,
          maIndex: 9,
        },
      },
      {
        heavenlyStem: '壬',
        earthlyBranch: '午',
        result: {
          luIndex: 9,
          yangIndex: 10,
          tuoIndex: 8,
          maIndex: 6,
        },
      },
      {
        heavenlyStem: '癸',
        earthlyBranch: '未',
        result: {
          luIndex: 10,
          yangIndex: 11,
          tuoIndex: 9,
          maIndex: 3,
        },
      },
      {
        heavenlyStem: '甲',
        earthlyBranch: '申',
        result: {
          luIndex: 0,
          yangIndex: 1,
          tuoIndex: 11,
          maIndex: 0,
        },
      },
      {
        heavenlyStem: '丁',
        earthlyBranch: '亥',
        result: {
          luIndex: 4,
          maIndex: 3,
          tuoIndex: 3,
          yangIndex: 5,
        },
      },
      {
        heavenlyStem: '乙',
        earthlyBranch: '酉',
        result: {
          luIndex: 1,
          maIndex: 9,
          tuoIndex: 0,
          yangIndex: 2,
        },
      },
      {
        heavenlyStem: '戊',
        earthlyBranch: '戌',
        result: {
          luIndex: 3,
          maIndex: 6,
          tuoIndex: 2,
          yangIndex: 4,
        },
      },
      {
        heavenlyStem: '己',
        earthlyBranch: '未',
        result: {
          luIndex: 4,
          maIndex: 3,
          tuoIndex: 3,
          yangIndex: 5,
        },
      },
      {
        heavenlyStem: '丙',
        earthlyBranch: '午',
        result: {
          luIndex: 3,
          maIndex: 6,
          tuoIndex: 2,
          yangIndex: 4,
        },
      },
    ];

    data.forEach((item) => {
      expect(
        getLuYangTuoMaIndex(item.heavenlyStem as HeavenlyStemName, item.earthlyBranch as EarthlyBranchName),
      ).toStrictEqual(item.result);
    });
  });

  test('getLuYangTuoMaIndex() vi-VN', () => {
    const data = [
      {
        heavenlyStem: 'Quý',
        earthlyBranch: 'Mão',
        result: {
          luIndex: 10,
          yangIndex: 11,
          tuoIndex: 9,
          maIndex: 3,
        },
      },
      {
        heavenlyStem: 'Canh',
        earthlyBranch: 'Dần',
        result: {
          luIndex: 6,
          yangIndex: 7,
          tuoIndex: 5,
          maIndex: 6,
        },
      },
      {
        heavenlyStem: 'Tân',
        earthlyBranch: 'Tỵ',
        result: {
          luIndex: 7,
          yangIndex: 8,
          tuoIndex: 6,
          maIndex: 9,
        },
      },
      {
        heavenlyStem: 'Nhâm',
        earthlyBranch: 'Ngọ',
        result: {
          luIndex: 9,
          yangIndex: 10,
          tuoIndex: 8,
          maIndex: 6,
        },
      },
      {
        heavenlyStem: 'Quý',
        earthlyBranch: 'Mùi',
        result: {
          luIndex: 10,
          yangIndex: 11,
          tuoIndex: 9,
          maIndex: 3,
        },
      },
      {
        heavenlyStem: 'Giáp',
        earthlyBranch: 'Thân',
        result: {
          luIndex: 0,
          yangIndex: 1,
          tuoIndex: 11,
          maIndex: 0,
        },
      },
      {
        heavenlyStem: 'Đinh',
        earthlyBranch: 'Hợi',
        result: {
          luIndex: 4,
          maIndex: 3,
          tuoIndex: 3,
          yangIndex: 5,
        },
      },
      {
        heavenlyStem: 'Ất',
        earthlyBranch: 'Dậu',
        result: {
          luIndex: 1,
          maIndex: 9,
          tuoIndex: 0,
          yangIndex: 2,
        },
      },
      {
        heavenlyStem: 'Mậu',
        earthlyBranch: 'Tuất',
        result: {
          luIndex: 3,
          maIndex: 6,
          tuoIndex: 2,
          yangIndex: 4,
        },
      },
      {
        heavenlyStem: 'Kỷ',
        earthlyBranch: 'Mùi',
        result: {
          luIndex: 4,
          maIndex: 3,
          tuoIndex: 3,
          yangIndex: 5,
        },
      },
      {
        heavenlyStem: 'Bính',
        earthlyBranch: 'Ngọ',
        result: {
          luIndex: 3,
          maIndex: 6,
          tuoIndex: 2,
          yangIndex: 4,
        },
      },
    ];

    data.forEach((item) => {
      expect(
        getLuYangTuoMaIndex(item.heavenlyStem as HeavenlyStemName, item.earthlyBranch as EarthlyBranchName),
      ).toStrictEqual(item.result);
    });
  });

  test('getKuiYueIndex()', () => {
    const data = [
      {
        heavenlyStem: '壬',
        result: {
          kuiIndex: 1,
          yueIndex: 3,
        },
      },
      {
        heavenlyStem: '癸',
        result: {
          kuiIndex: 1,
          yueIndex: 3,
        },
      },
      {
        heavenlyStem: '甲',
        result: {
          kuiIndex: 11,
          yueIndex: 5,
        },
      },
      {
        heavenlyStem: '戊',
        result: {
          kuiIndex: 11,
          yueIndex: 5,
        },
      },
      {
        heavenlyStem: '庚',
        result: {
          kuiIndex: 11,
          yueIndex: 5,
        },
      },
      {
        heavenlyStem: '乙',
        result: {
          kuiIndex: 10,
          yueIndex: 6,
        },
      },
      {
        heavenlyStem: '己',
        result: {
          kuiIndex: 10,
          yueIndex: 6,
        },
      },
      {
        heavenlyStem: '辛',
        result: {
          kuiIndex: 4,
          yueIndex: 0,
        },
      },
      {
        heavenlyStem: '丙',
        result: {
          kuiIndex: 9,
          yueIndex: 7,
        },
      },
      {
        heavenlyStem: '丁',
        result: {
          kuiIndex: 9,
          yueIndex: 7,
        },
      },
    ];

    data.forEach((item) => {
      expect(getKuiYueIndex(item.heavenlyStem as HeavenlyStemName)).toStrictEqual(item.result);
    });
  });

  test('getZuoYouIndex()', () => {
    const data = [
      {
        lunarMonth: 1,
        result: {
          zuoIndex: 2,
          youIndex: 8,
        },
      },
      {
        lunarMonth: 2,
        result: {
          zuoIndex: 3,
          youIndex: 7,
        },
      },
      {
        lunarMonth: 3,
        result: {
          zuoIndex: 4,
          youIndex: 6,
        },
      },
      {
        lunarMonth: 4,
        result: {
          zuoIndex: 5,
          youIndex: 5,
        },
      },
      {
        lunarMonth: 5,
        result: {
          zuoIndex: 6,
          youIndex: 4,
        },
      },
      {
        lunarMonth: 6,
        result: {
          zuoIndex: 7,
          youIndex: 3,
        },
      },
      {
        lunarMonth: 7,
        result: {
          zuoIndex: 8,
          youIndex: 2,
        },
      },
      {
        lunarMonth: 8,
        result: {
          zuoIndex: 9,
          youIndex: 1,
        },
      },
      {
        lunarMonth: 9,
        result: {
          zuoIndex: 10,
          youIndex: 0,
        },
      },
      {
        lunarMonth: 10,
        result: {
          zuoIndex: 11,
          youIndex: 11,
        },
      },
      {
        lunarMonth: 11,
        result: {
          zuoIndex: 0,
          youIndex: 10,
        },
      },
      {
        lunarMonth: 12,
        result: {
          zuoIndex: 1,
          youIndex: 9,
        },
      },
    ];

    data.forEach((item) => {
      expect(getZuoYouIndex(item.lunarMonth)).toStrictEqual(item.result);
    });
  });

  test('getChangQuIndex()', () => {
    const data = [
      { changIndex: 8, quIndex: 2 },
      { changIndex: 7, quIndex: 3 },
      { changIndex: 6, quIndex: 4 },
      { changIndex: 5, quIndex: 5 },
      { changIndex: 4, quIndex: 6 },
      { changIndex: 3, quIndex: 7 },
      { changIndex: 2, quIndex: 8 },
      { changIndex: 1, quIndex: 9 },
      { changIndex: 0, quIndex: 10 },
      { changIndex: 11, quIndex: 11 },
      { changIndex: 10, quIndex: 0 },
      { changIndex: 9, quIndex: 1 },
    ];

    data.forEach((item, index) => {
      expect(getChangQuIndex(index)).toStrictEqual(item);
    });
  });

  test('getKongJieIndex()', () => {
    const data = [
      { kongIndex: 9, jieIndex: 9 },
      { kongIndex: 8, jieIndex: 10 },
      { kongIndex: 7, jieIndex: 11 },
      { kongIndex: 6, jieIndex: 0 },
      { kongIndex: 5, jieIndex: 1 },
      { kongIndex: 4, jieIndex: 2 },
      { kongIndex: 3, jieIndex: 3 },
      { kongIndex: 2, jieIndex: 4 },
      { kongIndex: 1, jieIndex: 5 },
      { kongIndex: 0, jieIndex: 6 },
      { kongIndex: 11, jieIndex: 7 },
      { kongIndex: 10, jieIndex: 8 },
    ];

    data.forEach((item, index) => {
      expect(getKongJieIndex(index)).toStrictEqual(item);
    });
  });

  test('getHuoLingIndex()', () => {
    const data = [
      {
        timeIndex: 0,
        result: {
          huoIndex: 11,
          lingIndex: 1,
        },
      },
      {
        timeIndex: 1,
        result: {
          huoIndex: 0,
          lingIndex: 2,
        },
      },
      {
        timeIndex: 2,
        result: {
          huoIndex: 1,
          lingIndex: 3,
        },
      },
      {
        timeIndex: 3,
        result: {
          huoIndex: 2,
          lingIndex: 4,
        },
      },
      {
        timeIndex: 4,
        result: {
          huoIndex: 3,
          lingIndex: 5,
        },
      },
      {
        timeIndex: 5,
        result: {
          huoIndex: 4,
          lingIndex: 6,
        },
      },
      {
        timeIndex: 6,
        result: {
          huoIndex: 5,
          lingIndex: 7,
        },
      },
      {
        timeIndex: 7,
        result: {
          huoIndex: 6,
          lingIndex: 8,
        },
      },
      {
        timeIndex: 8,
        result: {
          huoIndex: 7,
          lingIndex: 9,
        },
      },
      {
        timeIndex: 9,
        result: {
          huoIndex: 8,
          lingIndex: 10,
        },
      },
      {
        timeIndex: 10,
        result: {
          huoIndex: 9,
          lingIndex: 11,
        },
      },
      {
        timeIndex: 11,
        result: {
          huoIndex: 10,
          lingIndex: 0,
        },
      },
    ];

    data.forEach((item) => {
      expect(getHuoLingIndex('午', item.timeIndex)).toStrictEqual(item.result);
    });

    const data2 = [
      {
        earthlyBranch: '寅',
        result: {
          huoIndex: 11,
          lingIndex: 1,
        },
      },
      {
        earthlyBranch: '申',
        result: {
          huoIndex: 0,
          lingIndex: 8,
        },
      },
      {
        earthlyBranch: '子',
        result: {
          huoIndex: 0,
          lingIndex: 8,
        },
      },
      {
        earthlyBranch: '巳',
        result: {
          huoIndex: 1,
          lingIndex: 8,
        },
      },
      {
        earthlyBranch: '酉',
        result: {
          huoIndex: 1,
          lingIndex: 8,
        },
      },
      {
        earthlyBranch: '丑',
        result: {
          huoIndex: 1,
          lingIndex: 8,
        },
      },
      {
        earthlyBranch: '亥',
        result: {
          huoIndex: 7,
          lingIndex: 8,
        },
      },
      {
        earthlyBranch: '未',
        result: {
          huoIndex: 7,
          lingIndex: 8,
        },
      },
    ];

    data2.forEach((item) => {
      expect(getHuoLingIndex(item.earthlyBranch as EarthlyBranchName, 0)).toStrictEqual(item.result);
    });
  });

  test('getLuanXiIndex()', () => {
    const data = [
      { earthlyBranch: '卯', result: { hongluanIndex: 10, tianxiIndex: 4 } },
      { earthlyBranch: '辰', result: { hongluanIndex: 9, tianxiIndex: 3 } },
      { earthlyBranch: '巳', result: { hongluanIndex: 8, tianxiIndex: 2 } },
      { earthlyBranch: '午', result: { hongluanIndex: 7, tianxiIndex: 1 } },
      { earthlyBranch: '未', result: { hongluanIndex: 6, tianxiIndex: 0 } },
      { earthlyBranch: '申', result: { hongluanIndex: 5, tianxiIndex: 11 } },
      { earthlyBranch: '酉', result: { hongluanIndex: 4, tianxiIndex: 10 } },
      { earthlyBranch: '戌', result: { hongluanIndex: 3, tianxiIndex: 9 } },
      { earthlyBranch: '亥', result: { hongluanIndex: 2, tianxiIndex: 8 } },
      { earthlyBranch: '子', result: { hongluanIndex: 1, tianxiIndex: 7 } },
      { earthlyBranch: '丑', result: { hongluanIndex: 0, tianxiIndex: 6 } },
      { earthlyBranch: '寅', result: { hongluanIndex: 11, tianxiIndex: 5 } },
    ];

    data.forEach((item) => {
      expect(getLuanXiIndex(item.earthlyBranch as EarthlyBranchName)).toStrictEqual(item.result);
    });
  });

  test('getNianjieIndex()', () => {
    const data = {
      子: 8,
      丑: 7,
      寅: 6,
      卯: 5,
      辰: 4,
      巳: 3,
      午: 2,
      未: 1,
      申: 0,
      酉: 11,
      戌: 10,
      亥: 9,
    };

    Object.entries(data).forEach(([key, value]) => {
      expect(getNianjieIndex(key as EarthlyBranchName)).toEqual(value);
    });
  });

  test('getYearlyStarIndex()', () => {
    expect(
      getYearlyStarIndex({
        solarDate: '2023-03-06',
        timeIndex: 2,
        fixLeap: true,
        gender: '女',
      }),
    ).toStrictEqual({
      xianchiIndex: 10,
      huagaiIndex: 5,
      guchenIndex: 3,
      guasuIndex: 11,
      tiancaiIndex: 2,
      tianshouIndex: 6,
      tianchuIndex: 9,
      posuiIndex: 3,
      feilianIndex: 3,
      longchiIndex: 5,
      fenggeIndex: 5,
      tiankuIndex: 1,
      tianxuIndex: 7,
      tianguanIndex: 4,
      tianfuIndex: 3,
      jieluIndex: 10,
      kongwangIndex: 11,
      xunkongIndex: 3,
      tiankongIndex: 2,
      tiandeIndex: 10,
      yuedeIndex: 6,
      tianshangIndex: 4,
      tianshiIndex: 6,
      dahaoAdjIndex: 6,
      jiekongIndex: 11,
      jieshaAdjIndex: 6,
      nianjieIndex: 5,
    });
    expect(
      getYearlyStarIndex({
        solarDate: '2001-08-16',
        timeIndex: 2,
        fixLeap: true,
        gender: '女',
      }),
    ).toStrictEqual({
      xianchiIndex: 4,
      huagaiIndex: 11,
      guchenIndex: 6,
      guasuIndex: 2,
      tiancaiIndex: 8,
      tianshouIndex: 0,
      tianchuIndex: 4,
      posuiIndex: 7,
      feilianIndex: 5,
      longchiIndex: 7,
      fenggeIndex: 3,
      tiankuIndex: 11,
      tianxuIndex: 9,
      tianguanIndex: 7,
      tianfuIndex: 3,
      jieluIndex: 2,
      kongwangIndex: 3,
      xunkongIndex: 7,
      tiankongIndex: 4,
      tiandeIndex: 0,
      yuedeIndex: 8,
      tianshangIndex: 8,
      tianshiIndex: 10,
      dahaoAdjIndex: 8,
      jiekongIndex: 3,
      jieshaAdjIndex: 0,
      nianjieIndex: 3,
    });
  });

  test('getMonthlyStarIndex()', () => {
    expect(getMonthlyStarIndex('2021-08-09', 2, true)).toStrictEqual({
      yuejieIndex: 0,
      tianyaoIndex: 5,
      tianxingIndex: 1,
      yinshaIndex: 0,
      tianyueIndex: 9,
      tianwuIndex: 0,
    });
    expect(getMonthlyStarIndex('2023-08-15', 0, true)).toStrictEqual({
      yuejieIndex: 10,
      tianyaoIndex: 4,
      tianxingIndex: 0,
      yinshaIndex: 2,
      tianyueIndex: 1,
      tianwuIndex: 6,
    });
  });

  test('getDailyStarIndex()', () => {
    expect(getDailyStarIndex('2020-08-05', 1)).toStrictEqual({
      santaiIndex: 10,
      bazuoIndex: 0,
      enguangIndex: 9,
      tianguiIndex: 5,
    });
  });

  test('getTimelyStarIndex()', () => {
    const data = [
      { taifuIndex: 4, fenggaoIndex: 0 },
      { taifuIndex: 5, fenggaoIndex: 1 },
      { taifuIndex: 6, fenggaoIndex: 2 },
      { taifuIndex: 7, fenggaoIndex: 3 },
      { taifuIndex: 8, fenggaoIndex: 4 },
      { taifuIndex: 9, fenggaoIndex: 5 },
      { taifuIndex: 10, fenggaoIndex: 6 },
      { taifuIndex: 11, fenggaoIndex: 7 },
      { taifuIndex: 0, fenggaoIndex: 8 },
      { taifuIndex: 1, fenggaoIndex: 9 },
      { taifuIndex: 2, fenggaoIndex: 10 },
      { taifuIndex: 3, fenggaoIndex: 11 },
    ];
    data.forEach((item, index) => {
      expect(getTimelyStarIndex(index)).toStrictEqual(item);
    });
  });

  test('getChangQuIndexByHeavenlyStem()', () => {
    const data = [
      { heavenlyStem: '甲', result: { changIndex: 3, quIndex: 7 } },
      { heavenlyStem: '乙', result: { changIndex: 4, quIndex: 6 } },
      { heavenlyStem: '丙', result: { changIndex: 6, quIndex: 4 } },
      { heavenlyStem: '戊', result: { changIndex: 6, quIndex: 4 } },
      { heavenlyStem: '丁', result: { changIndex: 7, quIndex: 3 } },
      { heavenlyStem: '己', result: { changIndex: 7, quIndex: 3 } },
      { heavenlyStem: '辛', result: { changIndex: 10, quIndex: 0 } },
      { heavenlyStem: '壬', result: { changIndex: 0, quIndex: 10 } },
    ];

    data.forEach((item) => {
      expect(getChangQuIndexByHeavenlyStem(item.heavenlyStem as HeavenlyStemName)).toStrictEqual(item.result);
    });
  });

  test('getHuagaiXianchiIndex()', () => {
    const data = {
      yin: { huagaiIndex: 8, xianchiIndex: 1 },
      woo: { huagaiIndex: 8, xianchiIndex: 1 },
      xu: { huagaiIndex: 8, xianchiIndex: 1 },
      shen: { huagaiIndex: 2, xianchiIndex: 7 },
      zi: { huagaiIndex: 2, xianchiIndex: 7 },
      chen: { huagaiIndex: 2, xianchiIndex: 7 },
      si: { huagaiIndex: 11, xianchiIndex: 4 },
      you: { huagaiIndex: 11, xianchiIndex: 4 },
      chou: { huagaiIndex: 11, xianchiIndex: 4 },
      hai: { huagaiIndex: 5, xianchiIndex: 10 },
      wei: { huagaiIndex: 5, xianchiIndex: 10 },
      mao: { huagaiIndex: 5, xianchiIndex: 10 },
    };

    Object.entries(data).forEach(([key, value]) => {
      expect(getHuagaiXianchiIndex(key as EarthlyBranchName)).toStrictEqual(value);
    });
  });

  test('getGuGuaIndex()', () => {
    const data = {
      yin: { guchenIndex: 3, guasuIndex: 11 },
      mao: { guchenIndex: 3, guasuIndex: 11 },
      chen: { guchenIndex: 3, guasuIndex: 11 },
      si: { guchenIndex: 6, guasuIndex: 2 },
      woo: { guchenIndex: 6, guasuIndex: 2 },
      wei: { guchenIndex: 6, guasuIndex: 2 },
      shen: { guchenIndex: 9, guasuIndex: 5 },
      you: { guchenIndex: 9, guasuIndex: 5 },
      xu: { guchenIndex: 9, guasuIndex: 5 },
      hai: { guchenIndex: 0, guasuIndex: 8 },
      zi: { guchenIndex: 0, guasuIndex: 8 },
      chou: { guchenIndex: 0, guasuIndex: 8 },
    };

    Object.entries(data).forEach(([key, value]) => {
      expect(getGuGuaIndex(key as EarthlyBranchName)).toStrictEqual(value);
    });
  });
});
