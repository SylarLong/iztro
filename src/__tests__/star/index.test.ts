import {
  getStartIndex,
  getMajorStar,
  getMinorStar,
  getPatchStar,
  getChangesheng12,
  getBoShi12,
  getYearly12,
} from '../../star';
import { mergeStars } from '../../utils';

describe('star/index', () => {
  test('getStartIndex()', () => {
    const data = [
      {
        timeIndex: 0,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 11,
          tianfuIndex: 1,
        },
      },
      {
        timeIndex: 1,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 11,
          tianfuIndex: 1,
        },
      },
      {
        timeIndex: 2,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        timeIndex: 3,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        timeIndex: 4,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        timeIndex: 5,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        timeIndex: 6,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        timeIndex: 7,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 2,
          tianfuIndex: 10,
        },
      },
      {
        timeIndex: 8,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        timeIndex: 9,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 6,
          tianfuIndex: 6,
        },
      },
      {
        timeIndex: 10,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 4,
          tianfuIndex: 8,
        },
      },
      {
        timeIndex: 11,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 4,
          tianfuIndex: 8,
        },
      },
      {
        timeIndex: 12,
        solarDate: '2023-08-01',
        result: {
          ziweiIndex: 4,
          tianfuIndex: 8,
        },
      },
      {
        timeIndex: 12,
        solarDate: '2023-02-19',
        result: {
          ziweiIndex: 11,
          tianfuIndex: 1,
        },
      },
    ];

    data.forEach(({ solarDate, timeIndex, result }) => {
      expect(getStartIndex(solarDate, timeIndex, true)).toStrictEqual(result);
    });
  });

  test('getMajorStar()', () => {
    expect(getMajorStar('2023-03-06', 4, true)).toStrictEqual([
      [{ name: '七杀', type: 'major', scope: 'origin' }],
      [{ name: '天同', type: 'major', scope: 'origin' }],
      [{ name: '武曲', type: 'major', scope: 'origin' }],
      [{ name: '太阳', type: 'major', scope: 'origin' }],
      [{ name: '破军', type: 'major', scope: 'origin' }],
      [{ name: '天机', type: 'major', scope: 'origin' }],
      [
        { name: '紫微', type: 'major', scope: 'origin' },
        { name: '天府', type: 'major', scope: 'origin' },
      ],
      [{ name: '太阴', type: 'major', scope: 'origin' }],
      [{ name: '贪狼', type: 'major', scope: 'origin' }],
      [{ name: '巨门', type: 'major', scope: 'origin' }],
      [
        { name: '廉贞', type: 'major', scope: 'origin' },
        { name: '天相', type: 'major', scope: 'origin' },
      ],
      [{ name: '天梁', type: 'major', scope: 'origin' }],
    ]);
  });

  test('getMinorStar()', () => {
    const primaryStars = getMajorStar('2023-03-06', 2, true);
    const secondaryStars = getMinorStar('2023-03-06', 2, true);
    const otherStars = getPatchStar('2023-03-06', 2, true);

    const stars = mergeStars(primaryStars, otherStars, secondaryStars);
    const total = stars.reduce((prev, next) => {
      return (prev += next.length);
    }, 0);

    expect(stars).toHaveLength(12);
    expect(total).toEqual(66);
  });

  test('getChangesheng12()', () => {
    console.log(getChangesheng12('2023-8-15', 0, '女', true));
  });

  test('getBoShi12()', () => {
    console.log(getBoShi12('2023-8-15', '女'));
  });

  test('getYearly12()', () => {
    console.log(getYearly12('2025-8-15'));
  });
});
