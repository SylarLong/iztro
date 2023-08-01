import { FiveElementsClassItem } from '../../data/types';
import { getStartIndex } from '../../star';

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
});
