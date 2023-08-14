import { EARTHLY_BRANCHES, GENDER, HEAVENLY_STEMS } from '../data';
import { getAdjectiveStar, getBoShi12, getchangsheng12, getMajorStar, getMinorStar, getYearly12 } from '../star';
import { fixIndex } from '../utils';
import { getPalaceNames, getSoulAndBody } from './palace';

export * from './palace';

export const astrolableBySolarDate = (
  solarDateStr: string,
  timeIndex: number,
  gender: keyof typeof GENDER,
  fixLeap?: boolean,
) => {
  const palaces = [];
  const { bodyIndex, soulIndex, heavenlyStemOfSoul } = getSoulAndBody(solarDateStr, timeIndex, fixLeap);
  const palaceNames = getPalaceNames(soulIndex);
  const majorStars = getMajorStar(solarDateStr, timeIndex, fixLeap);
  const minorStars = getMinorStar(solarDateStr, timeIndex, fixLeap);
  const adjectiveStars = getAdjectiveStar(solarDateStr, timeIndex, fixLeap);
  const changsheng12 = getchangsheng12(solarDateStr, timeIndex, gender, fixLeap);
  const boshi12 = getBoShi12(solarDateStr, gender);
  const { jiangqian12, suiqian12 } = getYearly12(solarDateStr);

  for (let i = 0; i < 12; i++) {
    palaces.push({
      name: palaceNames[i],
      heavenlyStem: HEAVENLY_STEMS[fixIndex(soulIndex - HEAVENLY_STEMS.indexOf(heavenlyStemOfSoul) + i, 10)],
      earthlyBranch: EARTHLY_BRANCHES[fixIndex(2 + i)],
      majorStars: majorStars[i],
      minorStars: minorStars[i],
      adjectiveStars: adjectiveStars[i],
      changsheng12: changsheng12[i],
      boshi12: boshi12[i],
      jiangqian12: jiangqian12[i],
      suiqian12: suiqian12[i],
    });
  }

  console.log(palaces);

  return {
    soulIndex,
    bodyIndex,
    palaces,
  };
};
