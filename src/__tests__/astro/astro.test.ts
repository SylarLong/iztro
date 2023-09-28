import {
  getMajorStarByLunarDate,
  getMajorStarBySolarDate,
  getSignByLunarDate,
  getSignBySolarDate,
  getZodiacByLunarYear,
  getZodiacBySolarDate,
} from '../../astro';
import { setLanguage } from '../../i18n';
import { astro } from '../../index';

describe('Astrolabe', () => {
  afterEach(() => setLanguage('zh-CN'));

  test('astrolabeBySolarDate()', () => {
    const result = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true);

    expect(result).toHaveProperty('solarDate', '2000-8-16');
    expect(result).toHaveProperty('lunarDate', '二〇〇〇年七月十七');
    expect(result).toHaveProperty('chineseDate', '庚辰 甲申 丙午 庚寅');
    expect(result).toHaveProperty('time', '寅时');
    expect(result).toHaveProperty('sign', '狮子座');
    expect(result).toHaveProperty('zodiac', '龙');
    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '午');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '戌');
    expect(result).toHaveProperty('soul', '破军');
    expect(result).toHaveProperty('body', '文昌');
    expect(result).toHaveProperty('fiveElementsClass', '木三局');

    const horoscope = result.horoscope('2023-8-19 3:12');

    expect(horoscope).toHaveProperty('solarDate', '2023-8-19');
    expect(horoscope.decadal).toHaveProperty('index', 2);
    expect(horoscope.decadal).toHaveProperty('heavenlyStem', '庚');
    expect(horoscope.decadal).toHaveProperty('earthlyBranch', '辰');
    expect(horoscope.decadal).toHaveProperty('palaceNames', [
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
      '子女',
    ]);
    expect(horoscope.decadal).toHaveProperty('mutagen', ['太阳', '武曲', '太阴', '天同']);
    expect(horoscope.age).toHaveProperty('index', 10);
    expect(horoscope.age).toHaveProperty('nominalAge', 23);
    expect(horoscope.yearly).toHaveProperty('index', 1);
    expect(horoscope.yearly).toHaveProperty('heavenlyStem', '癸');
    expect(horoscope.yearly).toHaveProperty('earthlyBranch', '卯');
    expect(horoscope.yearly).toHaveProperty('palaceNames', [
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
      '子女',
      '夫妻',
    ]);
    expect(horoscope.yearly).toHaveProperty('mutagen', ['破军', '巨门', '太阴', '贪狼']);
    expect(horoscope.monthly).toHaveProperty('index', 3);
    expect(horoscope.monthly).toHaveProperty('heavenlyStem', '庚');
    expect(horoscope.monthly).toHaveProperty('earthlyBranch', '申');
    expect(horoscope.monthly).toHaveProperty('palaceNames', [
      '子女',
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
    ]);
    expect(horoscope.monthly).toHaveProperty('mutagen', ['太阳', '武曲', '太阴', '天同']);
    expect(horoscope.daily).toHaveProperty('index', 6);
    expect(horoscope.daily).toHaveProperty('heavenlyStem', '己');
    expect(horoscope.daily).toHaveProperty('earthlyBranch', '酉');
    expect(horoscope.daily).toHaveProperty('palaceNames', [
      '迁移',
      '疾厄',
      '财帛',
      '子女',
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
    ]);
    expect(horoscope.daily).toHaveProperty('mutagen', ['武曲', '贪狼', '天梁', '文曲']);
    expect(horoscope.hourly).toHaveProperty('index', 8);
    expect(horoscope.hourly).toHaveProperty('heavenlyStem', '丙');
    expect(horoscope.hourly).toHaveProperty('earthlyBranch', '寅');
    expect(horoscope.hourly).toHaveProperty('palaceNames', [
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
      '子女',
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
    ]);
    expect(horoscope.hourly).toHaveProperty('mutagen', ['天同', '天机', '文昌', '廉贞']);

    const horoscope2 = result.horoscope('2023-10-19 3:12');

    expect(horoscope2.age).toHaveProperty('index', 9);
    expect(horoscope2.age).toHaveProperty('nominalAge', 24);
  });

  test('astrolabeBySolarDate() Korean', () => {
    const result = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'ko-KR');

    expect(result).toHaveProperty('solarDate', '2000-8-16');
    expect(result).toHaveProperty('lunarDate', '二〇〇〇年七月十七');
    expect(result).toHaveProperty('chineseDate', '경진 갑신 병오 경인');
    expect(result).toHaveProperty('time', '인시');
    expect(result).toHaveProperty('sign', '사자궁');
    expect(result).toHaveProperty('zodiac', '용');
    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '오');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '술');
    expect(result).toHaveProperty('soul', '파군');
    expect(result).toHaveProperty('body', '문창');
    expect(result).toHaveProperty('fiveElementsClass', '목삼국');

    const horoscope = result.horoscope('2023-8-19 3:12');

    expect(horoscope).toHaveProperty('solarDate', '2023-8-19');
    expect(horoscope.decadal).toHaveProperty('index', 2);
    expect(horoscope.decadal).toHaveProperty('heavenlyStem', '경');
    expect(horoscope.decadal).toHaveProperty('earthlyBranch', '진');
    expect(horoscope.decadal.stars).toStrictEqual([
      [{ name: '천마(십년)', type: 'tianma', scope: 'decadal' }],
      [{ name: '문곡(십년)', type: 'soft', scope: 'decadal' }],
      [],
      [{ name: '천희(십년)', type: 'flower', scope: 'decadal' }],
      [],
      [
        { name: '천월(십년)', type: 'soft', scope: 'decadal' },
        { name: '타라(십년)', type: 'tough', scope: 'decadal' },
      ],
      [{ name: '록존(십년)', type: 'lucun', scope: 'decadal' }],
      [{ name: '경양(십년)', type: 'tough', scope: 'decadal' }],
      [],
      [
        { name: '문창(십년)', type: 'soft', scope: 'decadal' },
        { name: '홍란(십년)', type: 'flower', scope: 'decadal' },
      ],
      [],
      [{ name: '천괴(십년)', type: 'soft', scope: 'decadal' }],
    ]);
    expect(horoscope.decadal).toHaveProperty('palaceNames', [
      '부처',
      '형제',
      '명궁',
      '부모',
      '복덕',
      '전택',
      '관록',
      '노복',
      '천이',
      '질액',
      '재백',
      '자녀',
    ]);
    expect(horoscope.decadal).toHaveProperty('mutagen', ['태양', '무곡', '태음', '천동']);
    expect(horoscope.age).toHaveProperty('index', 10);
    expect(horoscope.age).toHaveProperty('nominalAge', 23);
    expect(horoscope.yearly).toHaveProperty('index', 1);
    expect(horoscope.yearly).toHaveProperty('heavenlyStem', '계');
    expect(horoscope.yearly).toHaveProperty('earthlyBranch', '묘');
    expect(horoscope.yearly.stars).toStrictEqual([
      [],
      [
        { name: '천괴(년)', type: 'soft', scope: 'yearly' },
        { name: '문창(년)', type: 'soft', scope: 'yearly' },
      ],
      [],
      [
        { name: '천월(년)', type: 'soft', scope: 'yearly' },
        { name: '천마(년)', type: 'tianma', scope: 'yearly' },
      ],
      [{ name: '천희(년)', type: 'flower', scope: 'yearly' }],
      [{ name: '해신(년)', type: 'helper', scope: 'yearly' }],
      [],
      [],
      [],
      [
        { name: '문곡(년)', type: 'soft', scope: 'yearly' },
        { name: '타라(년)', type: 'tough', scope: 'yearly' },
      ],
      [
        { name: '록존(년)', type: 'lucun', scope: 'yearly' },
        { name: '홍란(년)', type: 'flower', scope: 'yearly' },
      ],
      [{ name: '경양(년)', type: 'tough', scope: 'yearly' }],
    ]);
    expect(horoscope.yearly).toHaveProperty('palaceNames', [
      '형제',
      '명궁',
      '부모',
      '복덕',
      '전택',
      '관록',
      '노복',
      '천이',
      '질액',
      '재백',
      '자녀',
      '부처',
    ]);
    expect(horoscope.yearly).toHaveProperty('mutagen', ['파군', '거문', '태음', '탐랑']);
    expect(horoscope.monthly).toHaveProperty('index', 3);
    expect(horoscope.monthly).toHaveProperty('heavenlyStem', '경');
    expect(horoscope.monthly).toHaveProperty('earthlyBranch', '신');
    expect(horoscope.monthly).toHaveProperty('palaceNames', [
      '자녀',
      '부처',
      '형제',
      '명궁',
      '부모',
      '복덕',
      '전택',
      '관록',
      '노복',
      '천이',
      '질액',
      '재백',
    ]);
    expect(horoscope.monthly).toHaveProperty('mutagen', ['태양', '무곡', '태음', '천동']);
    expect(horoscope.daily).toHaveProperty('index', 6);
    expect(horoscope.daily).toHaveProperty('heavenlyStem', '기');
    expect(horoscope.daily).toHaveProperty('earthlyBranch', '유');
    expect(horoscope.daily).toHaveProperty('palaceNames', [
      '천이',
      '질액',
      '재백',
      '자녀',
      '부처',
      '형제',
      '명궁',
      '부모',
      '복덕',
      '전택',
      '관록',
      '노복',
    ]);
    expect(horoscope.daily).toHaveProperty('mutagen', ['무곡', '탐랑', '천량', '문곡']);
    expect(horoscope.hourly).toHaveProperty('index', 8);
    expect(horoscope.hourly).toHaveProperty('heavenlyStem', '병');
    expect(horoscope.hourly).toHaveProperty('earthlyBranch', '인');
    expect(horoscope.hourly).toHaveProperty('palaceNames', [
      '관록',
      '노복',
      '천이',
      '질액',
      '재백',
      '자녀',
      '부처',
      '형제',
      '명궁',
      '부모',
      '복덕',
      '전택',
    ]);
    expect(horoscope.hourly).toHaveProperty('mutagen', ['천동', '천기', '문창', '염정']);
  });

  test('astrolabeByLunarDate()', () => {
    const result = astro.astrolabeByLunarDate('2000-7-17', 2, '女', true, true);

    expect(result).toHaveProperty('solarDate', '2000-8-16');
    expect(result).toHaveProperty('lunarDate', '二〇〇〇年七月十七');
    expect(result).toHaveProperty('chineseDate', '庚辰 甲申 丙午 庚寅');
    expect(result).toHaveProperty('time', '寅时');
    expect(result).toHaveProperty('sign', '狮子座');
    expect(result).toHaveProperty('zodiac', '龙');
    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '午');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '戌');
    expect(result).toHaveProperty('soul', '破军');
    expect(result).toHaveProperty('body', '文昌');
    expect(result).toHaveProperty('fiveElementsClass', '木三局');
    expect(result.palaces).toHaveLength(12);
    expect(result.palaces[0].decadal).toStrictEqual({ range: [43, 52], heavenlyStem: '戊', earthlyBranch: '寅' });
    expect(result.palaces[11].decadal).toStrictEqual({ range: [53, 62], heavenlyStem: '己', earthlyBranch: '丑' });
  });

  test('astrolabeBySolarDate() fix leap month', () => {
    const result = astro.astrolabeBySolarDate('2023-4-10', 4, '女', true);

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '子');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '申');
    expect(result).toHaveProperty('soul', '贪狼');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '金四局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '迁移');
  });

  test('astrolabeBySolarDate() use default fixLeap', () => {
    const result = astro.astrolabeBySolarDate('2023-4-10', 4, '女');

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '子');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '申');
    expect(result).toHaveProperty('soul', '贪狼');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '金四局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '迁移');
  });

  test('astrolabeBySolarDate() do not fix leap month', () => {
    const result = astro.astrolabeBySolarDate('2023-4-10', 4, '女', false);

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '未');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '水二局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '命宫');
  });

  test('astrolabeByLunarDate() fix leap month', () => {
    const result = astro.astrolabeByLunarDate('2023-2-20', 4, '女', true, true);

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '子');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '申');
    expect(result).toHaveProperty('soul', '贪狼');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '金四局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '迁移');
  });

  test('astrolabeByLunarDate() use default isLeapMonth', () => {
    const result = astro.astrolabeByLunarDate('2023-2-20', 4, '女');

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '未');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '水二局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '命宫');
  });

  test('astrolabeByLunarDate() do not fix leap month', () => {
    const result = astro.astrolabeByLunarDate('2023-2-20', 4, '女', true, false);

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '未');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '水二局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '命宫');
  });

  test('getZodiacBySolarDate()', () => {
    expect(getZodiacBySolarDate('2023-2-20')).toEqual('兔');
    expect(getZodiacBySolarDate('2023-2-20', 'en-US')).toEqual('rabbit');
  });

  test('getZodiacByLunarYear()', () => {
    expect(getZodiacByLunarYear(2023)).toEqual('兔');
    expect(getZodiacByLunarYear(2023, 'en-US')).toEqual('rabbit');
  });

  test('getSignBySolarDate()', () => {
    expect(getSignBySolarDate('2023-9-5')).toEqual('处女座');
    expect(getSignBySolarDate('2023-9-5', 'en-US')).toEqual('virgo');
  });

  test('getSignBySolarDate()', () => {
    expect(getSignByLunarDate('2023-7-21')).toEqual('处女座');
    expect(getSignByLunarDate('2023-7-21', false, 'en-US')).toEqual('virgo');
  });

  test('getSignBySolarDate() leap month', () => {
    expect(getSignByLunarDate('2023-2-3')).toEqual('双鱼座');
    expect(getSignByLunarDate('2023-2-3', true)).toEqual('白羊座');
  });

  test('getMajorStarBySolarDate() leap month', () => {
    expect(getMajorStarBySolarDate('2023-4-7', 0)).toEqual('贪狼');
    expect(getMajorStarBySolarDate('2023-4-7', 0, false)).toEqual('紫微,贪狼');
    expect(getMajorStarBySolarDate('2023-4-7', 0, true, 'ko-KR')).toEqual('탐랑');
  });

  test('getMajorStarByLunarDate() leap month', () => {
    expect(getMajorStarByLunarDate('2023-2-17', 0)).toEqual('紫微,贪狼');
    expect(getMajorStarByLunarDate('2023-2-17', 0, true)).toEqual('贪狼');
    expect(getMajorStarByLunarDate('2023-2-17', 0, true, false)).toEqual('紫微,贪狼');
  });
});
