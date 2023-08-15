import { getHeavenlyStemAndEarthlyBranchBySolarDate, getSign, getZodiac, solar2lunar } from '../calendar';
import { BIRTH_TIME, EARTHLY_BRANCHES, GENDER, HEAVENLY_STEMS, TIME_RANGE, earthlyBranches } from '../data';
import { getAdjectiveStar, getBoShi12, getchangsheng12, getMajorStar, getMinorStar, getYearly12 } from '../star';
import { fixIndex } from '../utils';
import { getPalaceNames, getSoulAndBody, getHoroscope, getFiveElementsClass } from './palace';

export * from './palace';

export const astrolableBySolarDate = (
  solarDateStr: string,
  timeIndex: number,
  gender: keyof typeof GENDER,
  fixLeap: boolean = true,
) => {
  const palaces = [];
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex);
  const { bodyIndex, soulIndex, heavenlyStemOfSoul, earthlyBranchOfSoul } = getSoulAndBody(
    solarDateStr,
    timeIndex,
    fixLeap,
  );
  const palaceNames = getPalaceNames(soulIndex);
  const majorStars = getMajorStar(solarDateStr, timeIndex, fixLeap);
  const minorStars = getMinorStar(solarDateStr, timeIndex, fixLeap);
  const adjectiveStars = getAdjectiveStar(solarDateStr, timeIndex, fixLeap);
  const changsheng12 = getchangsheng12(solarDateStr, timeIndex, gender, fixLeap);
  const boshi12 = getBoShi12(solarDateStr, gender);
  const { jiangqian12, suiqian12 } = getYearly12(solarDateStr);
  const { stages, ages } = getHoroscope(solarDateStr, timeIndex, gender, fixLeap);

  for (let i = 0; i < 12; i++) {
    const heavenlyStemOfPalace =
      HEAVENLY_STEMS[fixIndex(HEAVENLY_STEMS.indexOf(heavenlyStemOfSoul) - soulIndex + i, 10)];
    const earthlyBranchOfPalace = EARTHLY_BRANCHES[fixIndex(2 + i)];

    palaces.push({
      // 宫名
      name: palaceNames[i],
      // 是否身宫
      isBodyPalace: bodyIndex === i,
      // 是否来因宫
      isOriginalPalace: !['子', '丑'].includes(earthlyBranchOfPalace) && heavenlyStemOfPalace === yearly[0],
      // 宫位天干
      heavenlyStem: heavenlyStemOfPalace,
      // 宫位地支
      earthlyBranch: earthlyBranchOfPalace,
      // 主星
      majorStars: majorStars[i].concat(minorStars[i].filter((star) => ['lucun', 'tianma'].includes(star.type))),
      // 辅星
      minorStars: minorStars[i].filter((star) => !['lucun', 'tianma'].includes(star.type)),
      // 杂耀
      adjectiveStars: adjectiveStars[i],
      // 长生12神
      changsheng12: changsheng12[i],
      // 博士12神
      boshi12: boshi12[i],
      // 流年将前12神
      jiangqian12: jiangqian12[i],
      // 流年岁前12神
      suiqian12: suiqian12[i],
      // 大限
      stage: stages[i],
      // 小限
      ages: ages[i],
    });
  }

  const earthlyBranchOfSoulPalace = EARTHLY_BRANCHES[fixIndex(soulIndex + 2)];
  const earthlyBranchOfBodyPalace = EARTHLY_BRANCHES[fixIndex(bodyIndex + 2)];

  const result = {
    // 阳历日期
    solarDate: solarDateStr,
    // 农历日期
    lunarDate: solar2lunar(solarDateStr).toString(true),
    // 四柱
    chineseDate: getHeavenlyStemAndEarthlyBranchBySolarDate(solarDateStr, timeIndex).toString(),
    // 时辰
    time: BIRTH_TIME[timeIndex],
    // 时辰对应的时间段
    timeRange: TIME_RANGE[timeIndex],
    // 星座
    sign: getSign(solarDateStr),
    // 生肖
    zodiac: getZodiac(yearly[1]),
    // 命宫地支
    earthlyBranchOfSoulPalace,
    // 身宫地支
    earthlyBranchOfBodyPalace,
    // 命主
    soul: earthlyBranches[earthlyBranchOfSoulPalace].soul,
    // 身主
    body: earthlyBranches[yearly[1]].body,
    // 五行局
    fiveElementsClass: getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul),
    // 十二宫数据
    palaces,
  };

  return result;
};
