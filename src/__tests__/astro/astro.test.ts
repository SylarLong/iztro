import { astro } from '../../index';

describe('Astrolabe', () => {
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
    expect(horoscope.timely).toHaveProperty('index', 8);
    expect(horoscope.timely).toHaveProperty('heavenlyStem', '丙');
    expect(horoscope.timely).toHaveProperty('earthlyBranch', '寅');
    expect(horoscope.timely).toHaveProperty('palaceNames', [
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
    expect(horoscope.timely).toHaveProperty('mutagen', ['天同', '天机', '文昌', '廉贞']);
  });

  test('astrolabeBySolarDate() Korean', () => {
    const result = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'ko-KR');
    result.palaces.forEach((palace) => {
      console.log(palace);
    });
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
    expect(horoscope.decadal).toHaveProperty('mutagen', ['太阳', '武曲', '太阴', '天同']);
    expect(horoscope.age).toHaveProperty('index', 10);
    expect(horoscope.age).toHaveProperty('nominalAge', 23);
    expect(horoscope.yearly).toHaveProperty('index', 1);
    expect(horoscope.yearly).toHaveProperty('heavenlyStem', '癸');
    expect(horoscope.yearly).toHaveProperty('earthlyBranch', '卯');
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
    expect(horoscope.yearly).toHaveProperty('mutagen', ['破军', '巨门', '太阴', '贪狼']);
    expect(horoscope.monthly).toHaveProperty('index', 3);
    expect(horoscope.monthly).toHaveProperty('heavenlyStem', '庚');
    expect(horoscope.monthly).toHaveProperty('earthlyBranch', '申');
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
    expect(horoscope.monthly).toHaveProperty('mutagen', ['太阳', '武曲', '太阴', '天同']);
    expect(horoscope.daily).toHaveProperty('index', 6);
    expect(horoscope.daily).toHaveProperty('heavenlyStem', '己');
    expect(horoscope.daily).toHaveProperty('earthlyBranch', '酉');
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
    expect(horoscope.daily).toHaveProperty('mutagen', ['武曲', '贪狼', '天梁', '文曲']);
    expect(horoscope.timely).toHaveProperty('index', 8);
    expect(horoscope.timely).toHaveProperty('heavenlyStem', '丙');
    expect(horoscope.timely).toHaveProperty('earthlyBranch', '寅');
    expect(horoscope.timely).toHaveProperty('palaceNames', [
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
    expect(horoscope.timely).toHaveProperty('mutagen', ['天同', '天机', '文昌', '廉贞']);
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
});
