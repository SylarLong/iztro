import { EARTHLY_BRANCHES, HEAVENLY_STEMS } from '../../data';
import { FiveElementsClassItem } from '../../data/types';
import { getStartIndex, getPrimaryStar, getLuYangTuoMaIndex, getKuiYueIndex, getZuoYouIndex } from '../../star';

describe('star/index', () => {
  test('getStartIndex()', () => {
    const data = [
      {
        fiveElementsClass: '火六局' as FiveElementsClassItem,
        timeIndex: 0,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 11,
          tianfuIndex: 1,
        },
      },
      {
        fiveElementsClass: '火六局' as FiveElementsClassItem,
        timeIndex: 1,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 11,
          tianfuIndex: 1,
        },
      },
      {
        fiveElementsClass: '土五局' as FiveElementsClassItem,
        timeIndex: 2,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        fiveElementsClass: '土五局' as FiveElementsClassItem,
        timeIndex: 3,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        fiveElementsClass: '水二局' as FiveElementsClassItem,
        timeIndex: 4,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        fiveElementsClass: '水二局' as FiveElementsClassItem,
        timeIndex: 5,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        fiveElementsClass: '金四局' as FiveElementsClassItem,
        timeIndex: 6,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        fiveElementsClass: '金四局' as FiveElementsClassItem,
        timeIndex: 7,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        fiveElementsClass: '水二局' as FiveElementsClassItem,
        timeIndex: 8,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        fiveElementsClass: '水二局' as FiveElementsClassItem,
        timeIndex: 9,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        fiveElementsClass: '木三局' as FiveElementsClassItem,
        timeIndex: 10,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 4,
          tianfuIndex: 8,
        },
      },
      {
        fiveElementsClass: '木三局' as FiveElementsClassItem,
        timeIndex: 11,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 4,
          tianfuIndex: 8,
        },
      },
      {
        fiveElementsClass: '火六局' as FiveElementsClassItem,
        timeIndex: 12,
        lunarYear: 2023,
        lunarMonth: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 4,
          tianfuIndex: 8,
        },
      },
      {
        fiveElementsClass: '水二局' as FiveElementsClassItem,
        timeIndex: 12,
        lunarYear: 2023,
        lunarMonth: 1,
        lunarDay: 29,
        result: {
          ziweiIndex: 11,
          tianfuIndex: 1,
        },
      },
    ];

    data.forEach(({ fiveElementsClass, timeIndex, lunarYear, lunarMonth, lunarDay, result }) => {
      expect(getStartIndex(fiveElementsClass, lunarYear, lunarMonth, lunarDay, timeIndex)).toStrictEqual(result);
    });
  });

  test('getPrimaryStar()', () => {
    expect(getPrimaryStar(6, 6)).toStrictEqual([
      [{ name: '七杀', type: 'primary', scope: 'origin' }],
      [{ name: '天同', type: 'primary', scope: 'origin' }],
      [{ name: '武曲', type: 'primary', scope: 'origin' }],
      [{ name: '太阳', type: 'primary', scope: 'origin' }],
      [{ name: '破军', type: 'primary', scope: 'origin' }],
      [{ name: '天机', type: 'primary', scope: 'origin' }],
      [
        { name: '紫微', type: 'primary', scope: 'origin' },
        { name: '天府', type: 'primary', scope: 'origin' },
      ],
      [{ name: '太阴', type: 'primary', scope: 'origin' }],
      [{ name: '贪狼', type: 'primary', scope: 'origin' }],
      [{ name: '巨门', type: 'primary', scope: 'origin' }],
      [
        { name: '廉贞', type: 'primary', scope: 'origin' },
        { name: '天相', type: 'primary', scope: 'origin' },
      ],
      [{ name: '天梁', type: 'primary', scope: 'origin' }],
    ]);
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
    ];

    data.forEach((item) => {
      expect(getZuoYouIndex(item.lunarMonth)).toStrictEqual(item.result);
    });
  });
});
