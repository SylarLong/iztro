import {
  getStartIndex,
  getMajorStar,
  getMinorStar,
  getAdjectiveStar,
  getchangsheng12,
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
      [{ name: '七杀', type: 'major', brightness: '庙', scope: 'origin' }],
      [{ name: '天同', type: 'major', brightness: '平', scope: 'origin' }],
      [{ name: '武曲', type: 'major', brightness: '庙', scope: 'origin' }],
      [{ name: '太阳', type: 'major', brightness: '旺', scope: 'origin' }],
      [{ name: '破军', type: 'major', brightness: '庙', scope: 'origin' }],
      [{ name: '天机', type: 'major', brightness: '陷', scope: 'origin' }],
      [
        { name: '紫微', type: 'major', brightness: '旺', scope: 'origin' },
        { name: '天府', type: 'major', brightness: '得', scope: 'origin' },
      ],
      [{ name: '太阴', type: 'major', brightness: '旺', scope: 'origin' }],
      [{ name: '贪狼', type: 'major', brightness: '庙', scope: 'origin' }],
      [{ name: '巨门', type: 'major', brightness: '旺', scope: 'origin' }],
      [
        { name: '廉贞', type: 'major', brightness: '平', scope: 'origin' },
        { name: '天相', type: 'major', brightness: '庙', scope: 'origin' },
      ],
      [{ name: '天梁', type: 'major', brightness: '旺', scope: 'origin' }],
    ]);
  });

  test('getMinorStar()', () => {
    const primaryStars = getMajorStar('2023-03-06', 2, true);
    const secondaryStars = getMinorStar('2023-03-06', 2, true);
    const otherStars = getAdjectiveStar('2023-03-06', 2, true);

    const stars = mergeStars(primaryStars, otherStars, secondaryStars);
    const total = stars.reduce((prev, next) => {
      return (prev += next.length);
    }, 0);

    expect(stars).toHaveLength(12);
    expect(total).toEqual(66);
  });

  test('getchangsheng12()', () => {
    expect(getchangsheng12('2023-8-15', 0, '女', true)).toStrictEqual([
      '长生',
      '沐浴',
      '冠带',
      '临官',
      '帝旺',
      '衰',
      '病',
      '死',
      '墓',
      '绝',
      '胎',
      '养',
    ]);
  });

  test('getBoShi12()', () => {
    expect(getBoShi12('2023-8-15', '女')).toStrictEqual([
      '青龙',
      '小耗',
      '将军',
      '奏书',
      '蜚廉',
      '喜神',
      '病符',
      '大耗',
      '伏兵',
      '官府',
      '博士',
      '力士',
    ]);
  });

  test('getYearly12()', () => {
    expect(getYearly12('2025-8-15')).toStrictEqual({
      suiqian12: ['天德', '吊客', '病符', '岁建', '晦气', '丧门', '贯索', '官符', '小耗', '大耗', '龙德', '白虎'],
      jiangqian12: ['劫煞', '灾煞', '天煞', '指背', '咸池', '月煞', '亡神', '将星', '攀鞍', '岁驿', '息神', '华盖'],
    });
  });
});
