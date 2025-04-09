import {
  getStartIndex,
  getMajorStar,
  getMinorStar,
  getAdjectiveStar,
  getchangsheng12,
  getBoShi12,
  getYearly12,
  getChangesheng12StartIndex,
  getJiangqian12StartIndex,
} from '../../star';
import { mergeStars } from '../../utils';
import { astro, star } from '../../index';
import { EarthlyBranchName, FiveElementsClassName, setLanguage } from '../../i18n';

describe('star/index', () => {
  afterEach(() => {
    setLanguage('zh-CN');
    astro.config({ algorithm: 'default' });
  });

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
      expect(getStartIndex({ solarDate, timeIndex, fixLeap: true })).toStrictEqual(result);
    });
  });

  test('getMajorStar()', () => {
    expect(
      getMajorStar({ solarDate: '2023-03-06', timeIndex: 4, fixLeap: true })?.map((stars) =>
        stars.map((star) => ({
          name: star.name,
          type: star.type,
          scope: star.scope,
          brightness: star.brightness,
          mutagen: star.mutagen,
        })),
      ),
    ).toStrictEqual([
      [{ name: '七杀', type: 'major', brightness: '庙', scope: 'origin', mutagen: '' }],
      [{ name: '天同', type: 'major', brightness: '平', scope: 'origin', mutagen: '' }],
      [{ name: '武曲', type: 'major', brightness: '庙', scope: 'origin', mutagen: '' }],
      [{ name: '太阳', type: 'major', brightness: '旺', scope: 'origin', mutagen: '' }],
      [{ name: '破军', type: 'major', brightness: '庙', scope: 'origin', mutagen: '禄' }],
      [{ name: '天机', type: 'major', brightness: '陷', scope: 'origin', mutagen: '' }],
      [
        { name: '紫微', type: 'major', brightness: '旺', scope: 'origin', mutagen: '' },
        { name: '天府', type: 'major', brightness: '得', scope: 'origin', mutagen: '' },
      ],
      [{ name: '太阴', type: 'major', brightness: '不', scope: 'origin', mutagen: '科' }],
      [{ name: '贪狼', type: 'major', brightness: '庙', scope: 'origin', mutagen: '忌' }],
      [{ name: '巨门', type: 'major', brightness: '旺', scope: 'origin', mutagen: '权' }],
      [
        { name: '廉贞', type: 'major', brightness: '平', scope: 'origin', mutagen: '' },
        { name: '天相', type: 'major', brightness: '庙', scope: 'origin', mutagen: '' },
      ],
      [{ name: '天梁', type: 'major', brightness: '旺', scope: 'origin', mutagen: '' }],
    ]);
  });

  test('getMajorStar() vi-VN', () => {
    setLanguage('vi-VN');

    expect(
      getMajorStar({ solarDate: '2023-03-06', timeIndex: 4, fixLeap: true })?.map((stars) =>
        stars.map((star) => ({
          name: star.name,
          type: star.type,
          scope: star.scope,
          brightness: star.brightness,
          mutagen: star.mutagen,
        })),
      ),
    ).toStrictEqual([
      [{ name: 'Thất Sát', type: 'major', brightness: 'Miếu', scope: 'origin', mutagen: '' }],
      [{ name: 'Thiên Đồng', type: 'major', brightness: 'Bình', scope: 'origin', mutagen: '' }],
      [{ name: 'Vũ Khúc', type: 'major', brightness: 'Miếu', scope: 'origin', mutagen: '' }],
      [{ name: 'Thái Dương', type: 'major', brightness: 'Vượng', scope: 'origin', mutagen: '' }],
      [{ name: 'Phá Quân', type: 'major', brightness: 'Miếu', scope: 'origin', mutagen: 'Lộc' }],
      [{ name: 'Thiên Cơ', type: 'major', brightness: 'Hạn', scope: 'origin', mutagen: '' }],
      [
        { name: 'Tử Vi', type: 'major', brightness: 'Vượng', scope: 'origin', mutagen: '' },
        { name: 'Thiên Phủ', type: 'major', brightness: 'Đắc', scope: 'origin', mutagen: '' },
      ],
      [{ name: 'Thái Âm', type: 'major', brightness: 'Bất', scope: 'origin', mutagen: 'Khoa' }],
      [{ name: 'Tham Lang', type: 'major', brightness: 'Miếu', scope: 'origin', mutagen: 'Kỵ' }],
      [{ name: 'Cự Môn', type: 'major', brightness: 'Vượng', scope: 'origin', mutagen: 'Quyền' }],
      [
        { name: 'Liêm Trinh', type: 'major', brightness: 'Bình', scope: 'origin', mutagen: '' },
        { name: 'Thiên Tướng', type: 'major', brightness: 'Miếu', scope: 'origin', mutagen: '' },
      ],
      [{ name: 'Thiên Lương', type: 'major', brightness: 'Vượng', scope: 'origin', mutagen: '' }],
    ]);
  });

  test('getMinorStar()', () => {
    const primaryStars = getMajorStar({ solarDate: '2023-03-06', timeIndex: 2, fixLeap: true });
    const secondaryStars = getMinorStar('2023-03-06', 2, true);
    const otherStars = getAdjectiveStar({
      solarDate: '2023-03-06',
      timeIndex: 2,
      fixLeap: true,
      gender: '女',
    });

    const stars = mergeStars(primaryStars, otherStars, secondaryStars);
    const total = stars.reduce((prev, next) => {
      return (prev += next.length);
    }, 0);

    expect(stars).toHaveLength(12);
    expect(total).toEqual(66);
  });

  test('getchangsheng12()', () => {
    expect(getchangsheng12({ solarDate: '2023-8-15', timeIndex: 0, gender: '女', fixLeap: true })).toStrictEqual([
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

  test('getchangsheng12() vi-VN', () => {
    setLanguage('vi-VN');

    expect(getchangsheng12({ solarDate: '2023-8-15', timeIndex: 0, gender: '女', fixLeap: true })).toStrictEqual([
      'Trường Sinh',
      'Mục Dục',
      'Quan Đới',
      'Lâm Quan',
      'Đế Vượng',
      'Suy',
      'Bệnh',
      'Tử',
      'Mộ',
      'Tuyệt',
      'Thai',
      'Dưỡng',
    ]);
  });

  test('getBoShi12()', () => {
    expect(getBoShi12('2023-8-15', '女')).toStrictEqual([
      '青龙',
      '小耗',
      '将军',
      '奏书',
      '飞廉',
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

  test('getHoroscopeStar() scope="decadal"', () => {
    expect(
      star
        .getHoroscopeStar('庚', '辰', 'decadal')
        ?.map((stars) => stars.map((star) => ({ name: star.name, type: star.type, scope: star.scope }))),
    ).toStrictEqual([
      [{ name: '运马', type: 'tianma', scope: 'decadal' }],
      [{ name: '运曲', type: 'soft', scope: 'decadal' }],
      [],
      [{ name: '运喜', type: 'flower', scope: 'decadal' }],
      [],
      [
        { name: '运钺', type: 'soft', scope: 'decadal' },
        { name: '运陀', type: 'tough', scope: 'decadal' },
      ],
      [{ name: '运禄', type: 'lucun', scope: 'decadal' }],
      [{ name: '运羊', type: 'tough', scope: 'decadal' }],
      [],
      [
        { name: '运昌', type: 'soft', scope: 'decadal' },
        { name: '运鸾', type: 'flower', scope: 'decadal' },
      ],
      [],
      [{ name: '运魁', type: 'soft', scope: 'decadal' }],
    ]);
  });

  test('getHoroscopeStar() scope="yearly"', () => {
    expect(
      star
        .getHoroscopeStar('癸', '卯', 'yearly')
        ?.map((stars) => stars.map((star) => ({ name: star.name, type: star.type, scope: star.scope }))),
    ).toStrictEqual([
      [],
      [
        { name: '流魁', type: 'soft', scope: 'yearly' },
        { name: '流昌', type: 'soft', scope: 'yearly' },
      ],
      [],
      [
        { name: '流钺', type: 'soft', scope: 'yearly' },
        { name: '流马', type: 'tianma', scope: 'yearly' },
      ],
      [{ name: '流喜', type: 'flower', scope: 'yearly' }],
      [{ name: '年解', scope: 'yearly', type: 'helper' }],
      [],
      [],
      [],
      [
        { name: '流曲', type: 'soft', scope: 'yearly' },
        { name: '流陀', type: 'tough', scope: 'yearly' },
      ],
      [
        { name: '流禄', type: 'lucun', scope: 'yearly' },
        { name: '流鸾', type: 'flower', scope: 'yearly' },
      ],
      [{ name: '流羊', type: 'tough', scope: 'yearly' }],
    ]);
  });

  test('getChangesheng12StartIndex()', () => {
    const data = { 水二局: 6, 木三局: 9, 金四局: 3, 土五局: 6, 火六局: 0 };

    Object.entries(data).forEach(([key, value]) => {
      expect(getChangesheng12StartIndex(key as FiveElementsClassName)).toEqual(value);
    });
  });

  test('getJiangqian12StartIndex()', () => {
    const data = {
      yin: 4,
      woo: 4,
      xu: 4,
      shen: 10,
      zi: 10,
      chen: 10,
      si: 7,
      you: 7,
      chou: 7,
      hai: 1,
      mao: 1,
      wei: 1,
    };

    Object.entries(data).forEach(([key, value]) => {
      expect(getJiangqian12StartIndex(key as EarthlyBranchName)).toEqual(value);
    });
  });

  test('getAdjectiveStar()', () => {
    const data = getAdjectiveStar({
      solarDate: '2001-08-16',
      timeIndex: 2,
      gender: '男',
    });

    const jiekongStar = data.find((item) => item.find((star) => star.name === '截空'));
    const jieshaStar = data.find((item) => item.find((star) => star.name === '劫杀'));
    const jieluStar = data.find((item) => item.find((star) => star.name === '截路'));
    const nianjieStar = data.find((item) => item.find((star) => star.name === '年解'));
    const dahaoStar = data.find((item) => item.find((star) => star.name === '大耗'));

    data.forEach((item, index) =>
      item.find((star) => {
        if (star.name === '天使') {
          expect(index).toEqual(10);

          return;
        }

        if (star.name === '天伤') {
          expect(index).toEqual(8);

          return;
        }
      }),
    );

    expect(jiekongStar).toBeUndefined();
    expect(jieshaStar).toBeUndefined();
    expect(dahaoStar).toBeUndefined();
    expect(jieluStar).not.toBeUndefined();
    expect(nianjieStar).not.toBeUndefined();
  });

  test('getAdjectiveStar() zhongzhou', () => {
    astro.config({ algorithm: 'zhongzhou' });

    const data = getAdjectiveStar({
      solarDate: '2001-08-16',
      timeIndex: 2,
      gender: '男',
    });

    const jiekongStar = data.find((item) => item.find((star) => star.name === '截空'));
    const jieshaStar = data.find((item) => item.find((star) => star.name === '劫杀'));
    const jieluStar = data.find((item) => item.find((star) => star.name === '截路'));
    const nianjieStar = data.find((item) => item.find((star) => star.name === '年解'));
    const dahaoStar = data.find((item) => item.find((star) => star.name === '大耗'));

    data.forEach((item, index) =>
      item.find((star) => {
        if (star.name === '天使') {
          expect(index).toEqual(8);

          return;
        }

        if (star.name === '天伤') {
          expect(index).toEqual(10);

          return;
        }
      }),
    );

    expect(jiekongStar).not.toBeUndefined();
    expect(jieshaStar).not.toBeUndefined();
    expect(jieluStar).toBeUndefined();
    expect(nianjieStar).not.toBeUndefined();
    expect(dahaoStar).not.toBeUndefined();
  });
});
