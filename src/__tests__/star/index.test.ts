import { FiveElementsClass, FiveElementsClassItem } from '../../data/types';
import { getStartIndex } from '../../star';

describe('star/index', () => {
  test('getStartIndex()', () => {
    const data = [
      {
        fiveElementsClass: '火六局' as FiveElementsClassItem,
        timeIndex: 0,
        lunarDay: 15,
        result: {
          ziweiIndex: 11,
          tianfuIndex: 1,
        },
      },
      {
        fiveElementsClass: '火六局' as FiveElementsClassItem,
        timeIndex: 1,
        lunarDay: 15,
        result: {
          ziweiIndex: 11,
          tianfuIndex: 1,
        },
      },
      {
        fiveElementsClass: '土五局' as FiveElementsClassItem,
        timeIndex: 2,
        lunarDay: 15,
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        fiveElementsClass: '土五局' as FiveElementsClassItem,
        timeIndex: 3,
        lunarDay: 15,
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        fiveElementsClass: '水二局' as FiveElementsClassItem,
        timeIndex: 4,
        lunarDay: 15,
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        fiveElementsClass: '水二局' as FiveElementsClassItem,
        timeIndex: 5,
        lunarDay: 15,
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        fiveElementsClass: '金四局' as FiveElementsClassItem,
        timeIndex: 6,
        lunarDay: 15,
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        fiveElementsClass: '金四局' as FiveElementsClassItem,
        timeIndex: 7,
        lunarDay: 15,
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        fiveElementsClass: '水二局' as FiveElementsClassItem,
        timeIndex: 8,
        lunarDay: 15,
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        fiveElementsClass: '水二局' as FiveElementsClassItem,
        timeIndex: 9,
        lunarDay: 15,
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        fiveElementsClass: '木三局' as FiveElementsClassItem,
        timeIndex: 10,
        lunarDay: 15,
        result: {
          ziweiIndex: 4,
          tianfuIndex: 8,
        },
      },
      {
        fiveElementsClass: '木三局' as FiveElementsClassItem,
        timeIndex: 11,
        lunarDay: 15,
        result: {
          ziweiIndex: 4,
          tianfuIndex: 8,
        },
      },
      {
        fiveElementsClass: '火六局' as FiveElementsClassItem,
        timeIndex: 12,
        lunarDay: 15,
        result: {
          ziweiIndex: 4,
          tianfuIndex: 8,
        },
      },
    ];

    data.forEach(({ fiveElementsClass, timeIndex, lunarDay, result }) => {
      expect(getStartIndex(fiveElementsClass, timeIndex, lunarDay)).toStrictEqual(result);
    });
  });
});
