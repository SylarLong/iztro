import { EARTHLY_BRANCHES, HEAVENLY_STEMS } from '../../data';
import {
  getLuYangTuoMaIndex,
  getKuiYueIndex,
  getZuoYouIndex,
  getChangQuIndex,
  getKongJieIndex,
  getHuoLingIndex,
} from '../../star';

describe('star/location', () => {
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
    ];

    data.forEach((item) => {
      expect(
        getLuYangTuoMaIndex(
          item.heavenlyStem as (typeof HEAVENLY_STEMS)[number],
          item.earthlyBranch as (typeof EARTHLY_BRANCHES)[number],
        ),
      ).toStrictEqual(item.result);
    });
  });

  test('getKuiYueIndex()', () => {
    const data = [
      {
        heavenlyStem: '癸',
        result: {
          kuiIndex: 1,
          yueIndex: 3,
        },
      },
    ];

    data.forEach((item) => {
      expect(getKuiYueIndex(item.heavenlyStem as (typeof HEAVENLY_STEMS)[number])).toStrictEqual(item.result);
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
  });
});
