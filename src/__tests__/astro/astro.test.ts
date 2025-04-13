import {
  getMajorStarByLunarDate,
  getMajorStarBySolarDate,
  getSignByLunarDate,
  getSignBySolarDate,
  getZodiacBySolarDate,
  withOptions,
} from '../../astro';
import { setLanguage } from '../../i18n';
import { astro } from '../../index';

describe('Astrolabe', () => {
  afterEach(() => {
    setLanguage('zh-CN');
    astro.config({ yearDivide: 'exact', algorithm: 'default' });
  });

  test('bySolar()', () => {
    const result = astro.bySolar('2000-8-16', 2, '女', true);

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

    expect(result.palace('父母')?.isEmpty()).toBeTruthy();
    expect(result.palace('父母')?.isEmpty(['陀罗'])).toBeFalsy();
    expect(result.palace('命宫')?.isEmpty()).toBeFalsy();
    expect(result.palace('父母')?.isEmpty(['文昌', '文曲'])).toBeTruthy();

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
    expect(horoscope.age).toHaveProperty('index', 9);
    expect(horoscope.age).toHaveProperty('nominalAge', 24);
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

    expect(horoscope.hasHoroscopeStars('疾厄', 'decadal', ['流陀', '流曲', '运昌'])).toBe(true);
    expect(horoscope.hasHoroscopeStars('财帛', 'yearly', ['流陀', '流曲', '运昌'])).toBe(true);
    expect(horoscope.hasHoroscopeStars('迁移', 'monthly', ['流陀', '流曲', '运昌'])).toBe(true);
    expect(horoscope.hasHoroscopeStars('田宅', 'daily', ['流陀', '流曲', '运昌'])).toBe(true);
    expect(horoscope.notHaveHoroscopeStars('疾厄', 'decadal', ['流陀', '流曲', '运昌'])).toBe(false);
    expect(horoscope.notHaveHoroscopeStars('疾厄', 'decadal', ['流陀', '流鸾', '运昌'])).toBe(false);
    expect(horoscope.notHaveHoroscopeStars('疾厄', 'decadal', ['流喜', '流鸾', '流魁'])).toBe(true);
    expect(horoscope.hasOneOfHoroscopeStars('疾厄', 'decadal', ['流陀', '流曲', '运昌'])).toBe(true);
    expect(horoscope.hasOneOfHoroscopeStars('疾厄', 'decadal', ['流喜', '流鸾', '流魁'])).toBe(false);
    expect(horoscope.hasHoroscopeMutagen('兄弟', 'decadal', '禄')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('夫妻', 'decadal', '权')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('疾厄', 'decadal', '科')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('子女', 'decadal', '忌')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('仆役', 'yearly', '禄')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('夫妻', 'yearly', '权')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('财帛', 'yearly', '科')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('子女', 'yearly', '忌')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('夫妻', 'monthly', '禄')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('子女', 'monthly', '权')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('迁移', 'monthly', '科')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('财帛', 'monthly', '忌')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('迁移', 'daily', '禄')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('官禄', 'daily', '权')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('疾厄', 'daily', '科')).toBe(true);
    expect(horoscope.hasHoroscopeMutagen('夫妻', 'daily', '忌')).toBe(true);

    const agePalace = horoscope.agePalace();

    expect(agePalace).toHaveProperty('name', '仆役');
    expect(agePalace).toHaveProperty('heavenlyStem', '丁');
    expect(agePalace).toHaveProperty('earthlyBranch', '亥');

    const originalPalace = horoscope.palace('命宫', 'origin');

    expect(originalPalace).toHaveProperty('name', '命宫');
    expect(originalPalace).toHaveProperty('heavenlyStem', '壬');
    expect(originalPalace).toHaveProperty('earthlyBranch', '午');

    const decadalPalace = horoscope.palace('命宫', 'decadal');

    expect(decadalPalace).toHaveProperty('name', '夫妻');
    expect(decadalPalace).toHaveProperty('heavenlyStem', '庚');
    expect(decadalPalace).toHaveProperty('earthlyBranch', '辰');

    const decadalSurpalaces = horoscope.surroundPalaces('命宫', 'decadal');

    expect(decadalSurpalaces?.target).toHaveProperty('name', '夫妻');
    expect(decadalSurpalaces?.target).toHaveProperty('heavenlyStem', '庚');
    expect(decadalSurpalaces?.target).toHaveProperty('earthlyBranch', '辰');
    expect(decadalSurpalaces?.opposite).toHaveProperty('name', '官禄');
    expect(decadalSurpalaces?.opposite).toHaveProperty('heavenlyStem', '丙');
    expect(decadalSurpalaces?.opposite).toHaveProperty('earthlyBranch', '戌');
    expect(decadalSurpalaces?.career).toHaveProperty('name', '福德');
    expect(decadalSurpalaces?.career).toHaveProperty('heavenlyStem', '甲');
    expect(decadalSurpalaces?.career).toHaveProperty('earthlyBranch', '申');
    expect(decadalSurpalaces?.wealth).toHaveProperty('name', '迁移');
    expect(decadalSurpalaces?.wealth).toHaveProperty('heavenlyStem', '戊');
    expect(decadalSurpalaces?.wealth).toHaveProperty('earthlyBranch', '子');

    const originalSurpalaces = horoscope.surroundPalaces('夫妻', 'origin');

    expect(originalSurpalaces?.target).toHaveProperty('name', '夫妻');
    expect(originalSurpalaces?.target).toHaveProperty('heavenlyStem', '庚');
    expect(originalSurpalaces?.target).toHaveProperty('earthlyBranch', '辰');
    expect(originalSurpalaces?.opposite).toHaveProperty('name', '官禄');
    expect(originalSurpalaces?.opposite).toHaveProperty('heavenlyStem', '丙');
    expect(originalSurpalaces?.opposite).toHaveProperty('earthlyBranch', '戌');
    expect(originalSurpalaces?.career).toHaveProperty('name', '福德');
    expect(originalSurpalaces?.career).toHaveProperty('heavenlyStem', '甲');
    expect(originalSurpalaces?.career).toHaveProperty('earthlyBranch', '申');
    expect(originalSurpalaces?.wealth).toHaveProperty('name', '迁移');
    expect(originalSurpalaces?.wealth).toHaveProperty('heavenlyStem', '戊');
    expect(originalSurpalaces?.wealth).toHaveProperty('earthlyBranch', '子');

    const yearlyPalace = horoscope.palace('命宫', 'yearly');

    expect(yearlyPalace).toHaveProperty('name', '子女');
    expect(yearlyPalace).toHaveProperty('heavenlyStem', '己');
    expect(yearlyPalace).toHaveProperty('earthlyBranch', '卯');

    const monthlyPalace = horoscope.palace('命宫', 'monthly');

    expect(monthlyPalace).toHaveProperty('name', '兄弟');
    expect(monthlyPalace).toHaveProperty('heavenlyStem', '辛');
    expect(monthlyPalace).toHaveProperty('earthlyBranch', '巳');

    const dailyPalace = horoscope.palace('命宫', 'daily');

    expect(dailyPalace).toHaveProperty('name', '福德');
    expect(dailyPalace).toHaveProperty('heavenlyStem', '甲');
    expect(dailyPalace).toHaveProperty('earthlyBranch', '申');

    const hourlyPalace = horoscope.palace('命宫', 'hourly');

    expect(hourlyPalace).toHaveProperty('name', '官禄');
    expect(hourlyPalace).toHaveProperty('heavenlyStem', '丙');
    expect(hourlyPalace).toHaveProperty('earthlyBranch', '戌');

    const horoscope2 = result.horoscope('2023-10-19 3:12');

    expect(horoscope2.age).toHaveProperty('index', 9);
    expect(horoscope2.age).toHaveProperty('nominalAge', 24);

    const agePalace2 = horoscope2.agePalace();

    expect(agePalace2).toHaveProperty('name', '仆役');
    expect(agePalace2).toHaveProperty('heavenlyStem', '丁');
    expect(agePalace2).toHaveProperty('earthlyBranch', '亥');
  });

  test('horoscope()', () => {
    const result = astro.bySolar('1991-3-7', 6, '女', true);

    const horoscope = result.horoscope('2025-3-26');

    expect(horoscope).toHaveProperty('solarDate', '2025-3-26');
    expect(horoscope.decadal).toHaveProperty('index', 8);
    expect(horoscope.decadal).toHaveProperty('heavenlyStem', '戊');
    expect(horoscope.decadal).toHaveProperty('earthlyBranch', '戌');
    expect(horoscope.yearly).toHaveProperty('index', 3);
    expect(horoscope.yearly).toHaveProperty('heavenlyStem', '乙');
    expect(horoscope.yearly).toHaveProperty('earthlyBranch', '巳');
    expect(horoscope.monthly).toHaveProperty('index', 10);
    expect(horoscope.monthly).toHaveProperty('heavenlyStem', '己');
    expect(horoscope.monthly).toHaveProperty('earthlyBranch', '卯');
    expect(horoscope.daily).toHaveProperty('index', 0);
    expect(horoscope.daily).toHaveProperty('heavenlyStem', '甲');
    expect(horoscope.daily).toHaveProperty('earthlyBranch', '午');
  });

  test('bySolar() Korean', () => {
    const result = astro.bySolar('2000-8-16', 2, '女', true, 'ko-KR');

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
    expect(
      horoscope.decadal?.stars?.map((stars) =>
        stars.map((star) => ({ name: star.name, type: star.type, scope: star.scope })),
      ),
    ).toStrictEqual([
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
    expect(horoscope.age).toHaveProperty('index', 9);
    expect(horoscope.age).toHaveProperty('nominalAge', 24);
    expect(horoscope.yearly).toHaveProperty('index', 1);
    expect(horoscope.yearly).toHaveProperty('heavenlyStem', '계');
    expect(horoscope.yearly).toHaveProperty('earthlyBranch', '묘');
    expect(
      horoscope.yearly?.stars?.map((stars) =>
        stars.map((star) => ({ name: star.name, type: star.type, scope: star.scope })),
      ),
    ).toStrictEqual([
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

  test('bySolar() Vietnamese', () => {
    const result = astro.bySolar('2000-8-16', 2, '女', true, 'vi-VN');

    expect(result).toHaveProperty('solarDate', '2000-8-16');
    expect(result).toHaveProperty('lunarDate', '二〇〇〇年七月十七');
    expect(result).toHaveProperty('chineseDate', 'Canh Thìn - Giáp Thân - Bính Ngọ - Canh Dần');
    expect(result).toHaveProperty('time', 'Giờ dần');
    expect(result).toHaveProperty('sign', 'Cung Sư Tử');
    expect(result).toHaveProperty('zodiac', 'Rồng');
    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', 'Ngọ');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', 'Tuất');
    expect(result).toHaveProperty('soul', 'Phá Quân');
    expect(result).toHaveProperty('body', 'Văn Xương');
    expect(result).toHaveProperty('fiveElementsClass', 'Mộc Tam Cục');

    const horoscope = result.horoscope('2023-8-19 3:12');

    expect(horoscope).toHaveProperty('solarDate', '2023-8-19');
    expect(horoscope.decadal).toHaveProperty('index', 2);
    expect(horoscope.decadal).toHaveProperty('heavenlyStem', 'Canh');
    expect(horoscope.decadal).toHaveProperty('earthlyBranch', 'Thìn');
    expect(
      horoscope.decadal?.stars?.map((stars) =>
        stars.map((star) => ({ name: star.name, type: star.type, scope: star.scope })),
      ),
    ).toStrictEqual([
      [{ name: 'Vận Mã', type: 'tianma', scope: 'decadal' }],
      [{ name: 'Vận Khúc', type: 'soft', scope: 'decadal' }],
      [],
      [{ name: 'Vận Hỷ', type: 'flower', scope: 'decadal' }],
      [],
      [
        { name: 'Vận Việt', type: 'soft', scope: 'decadal' },
        { name: 'Vận Đà', type: 'tough', scope: 'decadal' },
      ],
      [{ name: 'Vận Lộc', type: 'lucun', scope: 'decadal' }],
      [{ name: 'Vận Dương', type: 'tough', scope: 'decadal' }],
      [],
      [
        { name: 'Vận Xương', type: 'soft', scope: 'decadal' },
        { name: 'Vận Loan', type: 'flower', scope: 'decadal' },
      ],
      [],
      [{ name: 'Vận Khôi', type: 'soft', scope: 'decadal' }],
    ]);
    expect(horoscope.decadal).toHaveProperty('palaceNames', [
      'Phu Thê',
      'Huynh Đệ',
      'Mệnh',
      'Phụ Mẫu',
      'Phúc Đức',
      'Điền Trạch',
      'Quan Lộc',
      'Nô Bộc',
      'Thiên Di',
      'Tật Ách',
      'Tài Bạch',
      'Tử Nữ',
    ]);
    expect(horoscope.decadal).toHaveProperty('mutagen', ['Thái Dương', 'Vũ Khúc', 'Thái Âm', 'Thiên Đồng']);
    expect(horoscope.age).toHaveProperty('index', 9);
    expect(horoscope.age).toHaveProperty('nominalAge', 24);
    expect(horoscope.yearly).toHaveProperty('index', 1);
    expect(horoscope.yearly).toHaveProperty('heavenlyStem', 'Quý');
    expect(horoscope.yearly).toHaveProperty('earthlyBranch', 'Mão');
    expect(
      horoscope.yearly?.stars?.map((stars) =>
        stars.map((star) => ({ name: star.name, type: star.type, scope: star.scope })),
      ),
    ).toStrictEqual([
      [],
      [
        { name: 'Lưu Khôi', type: 'soft', scope: 'yearly' },
        { name: 'Lưu Xương', type: 'soft', scope: 'yearly' },
      ],
      [],
      [
        { name: 'Lưu Việt', type: 'soft', scope: 'yearly' },
        { name: 'Lưu Mã', type: 'tianma', scope: 'yearly' },
      ],
      [{ name: 'Lưu Hỷ', type: 'flower', scope: 'yearly' }],
      [{ name: 'Niên Giải', type: 'helper', scope: 'yearly' }],
      [],
      [],
      [],
      [
        { name: 'Lưu Khúc', type: 'soft', scope: 'yearly' },
        { name: 'Lưu Đà', type: 'tough', scope: 'yearly' },
      ],
      [
        { name: 'Lưu Lộc', type: 'lucun', scope: 'yearly' },
        { name: 'Lưu Loan', type: 'flower', scope: 'yearly' },
      ],
      [{ name: 'Lưu Dương', type: 'tough', scope: 'yearly' }],
    ]);
    expect(horoscope.yearly).toHaveProperty('palaceNames', [
      'Huynh Đệ',
      'Mệnh',
      'Phụ Mẫu',
      'Phúc Đức',
      'Điền Trạch',
      'Quan Lộc',
      'Nô Bộc',
      'Thiên Di',
      'Tật Ách',
      'Tài Bạch',
      'Tử Nữ',
      'Phu Thê',
    ]);
    expect(horoscope.yearly).toHaveProperty('mutagen', ['Phá Quân', 'Cự Môn', 'Thái Âm', 'Tham Lang']);
    expect(horoscope.monthly).toHaveProperty('index', 3);
    expect(horoscope.monthly).toHaveProperty('heavenlyStem', 'Canh');
    expect(horoscope.monthly).toHaveProperty('earthlyBranch', 'Thân');
    expect(horoscope.monthly).toHaveProperty('palaceNames', [
      'Tử Nữ',
      'Phu Thê',
      'Huynh Đệ',
      'Mệnh',
      'Phụ Mẫu',
      'Phúc Đức',
      'Điền Trạch',
      'Quan Lộc',
      'Nô Bộc',
      'Thiên Di',
      'Tật Ách',
      'Tài Bạch',
    ]);
    expect(horoscope.monthly).toHaveProperty('mutagen', ['Thái Dương', 'Vũ Khúc', 'Thái Âm', 'Thiên Đồng']);
    expect(horoscope.daily).toHaveProperty('index', 6);
    expect(horoscope.daily).toHaveProperty('heavenlyStem', 'Kỷ');
    expect(horoscope.daily).toHaveProperty('earthlyBranch', 'Dậu');
    expect(horoscope.daily).toHaveProperty('palaceNames', [
      'Thiên Di',
      'Tật Ách',
      'Tài Bạch',
      'Tử Nữ',
      'Phu Thê',
      'Huynh Đệ',
      'Mệnh',
      'Phụ Mẫu',
      'Phúc Đức',
      'Điền Trạch',
      'Quan Lộc',
      'Nô Bộc',
    ]);
    expect(horoscope.daily).toHaveProperty('mutagen', ['Vũ Khúc', 'Tham Lang', 'Thiên Lương', 'Văn Khúc']);
    expect(horoscope.hourly).toHaveProperty('index', 8);
    expect(horoscope.hourly).toHaveProperty('heavenlyStem', 'Bính');
    expect(horoscope.hourly).toHaveProperty('earthlyBranch', 'Dần');
    expect(horoscope.hourly).toHaveProperty('palaceNames', [
      'Quan Lộc',
      'Nô Bộc',
      'Thiên Di',
      'Tật Ách',
      'Tài Bạch',
      'Tử Nữ',
      'Phu Thê',
      'Huynh Đệ',
      'Mệnh',
      'Phụ Mẫu',
      'Phúc Đức',
      'Điền Trạch',
    ]);
    expect(horoscope.hourly).toHaveProperty('mutagen', ['Thiên Đồng', 'Thiên Cơ', 'Văn Xương', 'Liêm Trinh']);
  });

  test('byLunar()', () => {
    const result = astro.byLunar('2000-7-17', 2, '女', true, true);

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

  test('byLunar() with `exact` year divider', () => {
    astro.config({ yearDivide: 'exact' });

    const result = astro.byLunar('1999-12-29', 2, '女', true, true);

    expect(result).toHaveProperty('solarDate', '2000-2-4');
    expect(result).toHaveProperty('lunarDate', '一九九九年腊月廿九');
    expect(result).toHaveProperty('chineseDate', '庚辰 丁丑 壬辰 壬寅');
    expect(result).toHaveProperty('time', '寅时');
    expect(result).toHaveProperty('zodiac', '龙');
    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '卯');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '文昌');
    expect(result).toHaveProperty('fiveElementsClass', '土五局');
  });

  test('byLunar() with `normal` year divider', () => {
    astro.config({ yearDivide: 'normal' });

    const result = astro.byLunar('1999-12-29', 2, '女', true, true);

    expect(result).toHaveProperty('solarDate', '2000-2-4');
    expect(result).toHaveProperty('lunarDate', '一九九九年腊月廿九');
    expect(result).toHaveProperty('chineseDate', '己卯 丁丑 壬辰 壬寅');
    expect(result).toHaveProperty('time', '寅时');
    expect(result).toHaveProperty('zodiac', '兔');
    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '卯');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '火六局');
  });

  test('bySolar() with `normal` year divider', () => {
    astro.config({ yearDivide: 'normal' });

    const result = astro.bySolar('1980-2-14', 0, 'male', true);

    expect(result).toHaveProperty('solarDate', '1980-2-14');
    expect(result).toHaveProperty('lunarDate', '一九七九年腊月廿八');
    expect(result).toHaveProperty('chineseDate', '己未 戊寅 丁巳 庚子');
    expect(result).toHaveProperty('time', '早子时');
    expect(result).toHaveProperty('zodiac', '羊');
    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '丑');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '丑');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '天相');
    expect(result).toHaveProperty('fiveElementsClass', '水二局');

    expect(result.palaces[0].decadal).toHaveProperty('range', [112, 121]);
    const horoscope = result.horoscope('1980-2-14');

    expect(horoscope.yearly).toHaveProperty('earthlyBranch', '申');
    expect(horoscope.yearly).toHaveProperty('heavenlyStem', '庚');
  });

  test('check special date `1995-3-30`', () => {
    astro.config({ yearDivide: 'normal' });

    const result = astro.bySolar('1995-03-30', 0, 'male', true);

    expect(result).toHaveProperty('solarDate', '1995-03-30');
    expect(result).toHaveProperty('lunarDate', '一九九五年二月三十');

    const result2 = astro.byLunar('1995-2-30', 0, 'male', true);

    expect(result2).toHaveProperty('solarDate', '1995-3-30');
    expect(result2).toHaveProperty('lunarDate', '一九九五年二月三十');
  });

  test('withOptions()', () => {
    const result = astro.withOptions({
      type: 'lunar',
      dateStr: '1999-12-29',
      timeIndex: 2,
      gender: 'female',
      isLeapMonth: false,
      fixLeap: true,
      language: 'zh-CN',
      config: {
        yearDivide: 'normal',
      },
    });

    expect(result).toHaveProperty('solarDate', '2000-2-4');
    expect(result).toHaveProperty('lunarDate', '一九九九年腊月廿九');
    expect(result).toHaveProperty('chineseDate', '己卯 丁丑 壬辰 壬寅');
    expect(result).toHaveProperty('time', '寅时');
    expect(result).toHaveProperty('zodiac', '兔');
    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '卯');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '火六局');
  });

  test('withOptions() 2', () => {
    const result = astro.withOptions({
      type: 'lunar',
      dateStr: '1999-12-29',
      timeIndex: 2,
      gender: 'female',
      isLeapMonth: false,
      fixLeap: true,
      language: 'zh-CN',
      config: {
        yearDivide: 'exact',
      },
    });

    expect(result).toHaveProperty('solarDate', '2000-2-4');
    expect(result).toHaveProperty('lunarDate', '一九九九年腊月廿九');
    expect(result).toHaveProperty('chineseDate', '庚辰 丁丑 壬辰 壬寅');
    expect(result).toHaveProperty('time', '寅时');
    expect(result).toHaveProperty('zodiac', '龙');
    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '卯');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '文昌');
    expect(result).toHaveProperty('fiveElementsClass', '土五局');
  });

  test('withOptions() 3', () => {
    const result = astro.withOptions({
      type: 'lunar',
      dateStr: '1979-12-28',
      timeIndex: 0,
      gender: 'female',
      isLeapMonth: false,
      fixLeap: true,
      language: 'zh-CN',
      config: {
        yearDivide: 'normal',
        horoscopeDivide: 'normal',
      },
    });

    expect(result).toHaveProperty('solarDate', '1980-2-14');
    expect(result).toHaveProperty('lunarDate', '一九七九年腊月廿八');
    expect(result).toHaveProperty('chineseDate', '己未 戊寅 丁巳 庚子');
    expect(result).toHaveProperty('time', '早子时');
    expect(result).toHaveProperty('zodiac', '羊');
    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '丑');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '丑');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '天相');
    expect(result).toHaveProperty('fiveElementsClass', '水二局');

    const horoscope = result.horoscope('1980-2-14');

    expect(horoscope.yearly.earthlyBranch).toBe('未');

    const result2 = astro.withOptions({
      type: 'lunar',
      dateStr: '1979-12-28',
      timeIndex: 0,
      gender: 'female',
      isLeapMonth: false,
      fixLeap: true,
      language: 'zh-CN',
      config: {
        yearDivide: 'normal',
        horoscopeDivide: 'exact',
      },
    });

    const horoscope2 = result2.horoscope('1980-2-14');

    expect(horoscope2.yearly.earthlyBranch).toBe('申');
  });

  test('bySolar() fix leap month', () => {
    const result = astro.bySolar('2023-4-10', 4, '女', true);

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '子');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '申');
    expect(result).toHaveProperty('soul', '贪狼');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '金四局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '迁移');
  });

  test('bySolar() use default fixLeap', () => {
    const result = astro.bySolar('2023-4-10', 4, '女');

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '子');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '申');
    expect(result).toHaveProperty('soul', '贪狼');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '金四局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '迁移');
  });

  test('bySolar() do not fix leap month', () => {
    const result = astro.bySolar('2023-4-10', 4, '女', false);

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '未');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '水二局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '命宫');
  });

  test('byLunar() fix leap month', () => {
    const result = astro.byLunar('2023-2-20', 4, '女', true, true);

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '子');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '申');
    expect(result).toHaveProperty('soul', '贪狼');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '金四局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '迁移');
  });

  test('byLunar() use default isLeapMonth', () => {
    const result = astro.byLunar('2023-2-20', 4, '女');

    expect(result).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(result).toHaveProperty('earthlyBranchOfBodyPalace', '未');
    expect(result).toHaveProperty('soul', '巨门');
    expect(result).toHaveProperty('body', '天同');
    expect(result).toHaveProperty('fiveElementsClass', '水二局');
    expect(result.star('紫微').palace()).toHaveProperty('name', '命宫');
  });

  test('byLunar() do not fix leap month', () => {
    const result = astro.byLunar('2023-2-20', 4, '女', true, false);

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

  test('childhood', () => {
    const astrolabe = astro.bySolar('2023-10-18', 4, 'female');
    const horo1 = astrolabe.horoscope('2023-12-19');

    expect(horo1.decadal.name).toEqual('童限');
    expect(horo1.decadal.index).toEqual(astrolabe.palace('命宫')?.index);

    const horo2 = astrolabe.horoscope('2024-12-29');

    expect(horo2.decadal.name).toEqual('童限');
    expect(horo2.decadal.index).toEqual(astrolabe.palace('财帛')?.index);

    const horo3 = astrolabe.horoscope('2025-12-29');

    expect(horo3.decadal.name).toEqual('童限');
    expect(horo3.decadal.index).toEqual(astrolabe.palace('疾厄')?.index);
  });

  test('nominalAge: nomal', () => {
    const astrolabe = astro.withOptions({
      type: 'solar',
      dateStr: '2000-8-16',
      timeIndex: 2,
      gender: 'female',
      config: {
        ageDivide: 'normal',
      },
    });

    const horo1 = astrolabe.horoscope('2023-8-19 3:12');

    expect(horo1.age.index).toEqual(9);
    expect(horo1.age.nominalAge).toEqual(24);
  });

  test('nominalAge: birthday', () => {
    const astrolabe = astro.withOptions({
      type: 'solar',
      dateStr: '2000-8-16',
      timeIndex: 2,
      gender: 'female',
      config: {
        ageDivide: 'birthday',
      },
    });

    const horo1 = astrolabe.horoscope('2023-8-19 3:12');

    expect(horo1.age.index).toEqual(10);
    expect(horo1.age.nominalAge).toEqual(23);
  });

  test('withOptions() with earth type', () => {
    astro.config({ algorithm: 'zhongzhou' });

    const result = withOptions({
      dateStr: '1979-08-21',
      type: 'solar',
      timeIndex: 7,
      gender: 'male',
      astroType: 'earth',
    });

    const soulPalace = result.palace('命宫');

    expect(soulPalace).toHaveProperty('index', 1);
    expect(soulPalace).toHaveProperty('heavenlyStem', '丁');
    expect(soulPalace).toHaveProperty('earthlyBranch', '卯');
    expect(soulPalace?.majorStars[0]).toHaveProperty('name', '天相');
    expect(soulPalace?.minorStars[0]).toHaveProperty('name', '文昌');
    expect(result).toHaveProperty('fiveElementsClass', '火六局');
    expect(soulPalace?.decadal).toStrictEqual({ range: [6, 15], heavenlyStem: '丁', earthlyBranch: '卯' });
  });

  test('withOptions() with human type', () => {
    astro.config({ algorithm: 'zhongzhou' });

    const result = withOptions({
      dateStr: '1979-08-21',
      type: 'solar',
      timeIndex: 8,
      gender: 'male',
      astroType: 'human',
    });

    const soulPalace = result.palace('命宫');

    expect(soulPalace).toHaveProperty('index', 0);
    expect(soulPalace).toHaveProperty('heavenlyStem', '丙');
    expect(soulPalace).toHaveProperty('earthlyBranch', '寅');
    expect(soulPalace?.majorStars[0]).toHaveProperty('name', '太阳');
    expect(soulPalace?.minorStars[0]).toHaveProperty('name', '文昌');
    expect(result).toHaveProperty('fiveElementsClass', '火六局');
    expect(soulPalace?.decadal).toStrictEqual({ range: [6, 15], heavenlyStem: '丙', earthlyBranch: '寅' });
  });
});
