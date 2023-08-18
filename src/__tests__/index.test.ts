import { astro } from '../index';

describe('Astrolabe', () => {
  test('astrolableBySolarDate()', () => {
    const result = astro.astrolableBySolarDate('2000-8-16', 2, '女', true);

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
  });

  test('astrolableByLunarDate()', () => {
    const result = astro.astrolableByLunarDate('2000-7-17', 2, '女', true, true);

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
