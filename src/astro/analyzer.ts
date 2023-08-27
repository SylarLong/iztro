import { Star } from '../data/types';
import { kot, PalaceKey, PalaceName, StarKey, StarName } from '../i18n';
import { fixEarthlyBranchIndex, fixIndex } from '../utils';
import { IFunctionalAstrolabe } from './FunctionalAstrolabe';
import { IFunctionalPalace } from './FunctionalPalace';

const _concatStars = (...stars: Star[][]): StarKey[] =>
  Array.from(stars)
    .reduce((prev, next) => {
      return [...prev, ...next];
    }, [])
    .map((item) => kot<StarKey>(item.name));

const _includeAll = (allStarsInPalace: StarKey[], targetStars: StarName[]) => {
  const starKeys = targetStars.map((item) => kot<StarKey>(item));

  return starKeys.every((star) => allStarsInPalace.includes(star));
};

const _excludeAll = (allStarsInPalace: StarKey[], targetStars: StarName[]) => {
  const starKeys = targetStars.map((item) => kot<StarKey>(item));

  return starKeys.every((star) => !allStarsInPalace.includes(star));
};

const _includeOneOf = (allStarsInPalace: StarKey[], targetStars: StarName[]) => {
  const starKeys = targetStars.map((item) => kot<StarKey>(item));

  return starKeys.some((star) => allStarsInPalace.includes(star));
};

/**
 * 获取星盘的某一个宫位
 *
 * @version v1.0.0
 *
 * @param $ 星盘实例
 * @param indexOrName 宫位索引或者宫位名称
 * @returns 宫位实例
 */
export const getPalace = ($: IFunctionalAstrolabe, indexOrName: number | PalaceName): IFunctionalPalace | undefined => {
  if (typeof indexOrName === 'number') {
    if (indexOrName < 0 || indexOrName > 11) {
      throw new Error('invalid palace index.');
    }

    return $.palaces[indexOrName];
  }

  return $.palaces.find((item) => {
    if (kot<PalaceKey>(indexOrName) === 'originalPalace' && item.isOriginalPalace) {
      return item;
    }

    if (kot<PalaceKey>(indexOrName) === 'bodyPalace' && item.isBodyPalace) {
      return item;
    }

    if (kot<PalaceName>(item.name) === kot<PalaceName>(indexOrName)) {
      return item;
    }
  });
};

/**
 * 判断某个宫位内是否有传入的星耀，要所有星耀都在宫位内才会返回true
 *
 * @version v1.0.0
 *
 * @param $ 宫位实例
 * @param stars 星耀
 * @returns true | false
 */
export const hasStars = ($: IFunctionalPalace, stars: StarName[]): boolean => {
  const allStarsInPalace = _concatStars($.majorStars, $.minorStars, $.adjectiveStars);

  return _includeAll(allStarsInPalace, stars);
};

/**
 * 判断某个宫位内是否有传入的星耀，要所有星耀都不在宫位内才会返回true
 *
 * @version v1.0.0
 *
 * @param $ 宫位实例
 * @param stars 星耀
 * @returns true | false
 */
export const notHaveStars = ($: IFunctionalPalace, stars: StarName[]): boolean => {
  const allStarsInPalace = _concatStars($.majorStars, $.minorStars, $.adjectiveStars);

  return _excludeAll(allStarsInPalace, stars);
};

/**
 * 判断某个宫位内是否有传入星耀的其中一个，只要命中一个就会返回true
 *
 * @version v1.0.0
 *
 * @param $ 宫位实例
 * @param stars 星耀
 * @returns true | false
 */
export const hasOneOfStars = ($: IFunctionalPalace, stars: StarName[]): boolean => {
  const allStarsInPalace = _concatStars($.majorStars, $.minorStars, $.adjectiveStars);

  return _includeOneOf(allStarsInPalace, stars);
};

/**
 * 判断某一个宫位三方四正是否包含目标星耀，必须要全部包含才会返回true
 *
 * @param $ 星盘实例
 * @param indexOrName 宫位索引或者宫位名称
 * @param stars 星耀名称数组
 * @returns true | false
 */
export const isSurroundedByStars = (
  $: IFunctionalAstrolabe,
  indexOrName: number | PalaceName,
  stars: StarName[],
): boolean => {
  // 获取目标宫位
  const palace = getPalace($, indexOrName);

  if (!palace) {
    return false;
  }
  // 获取目标宫位索引
  const palaceIndex = fixEarthlyBranchIndex(palace.earthlyBranch);
  // 获取对宫
  const palace6 = getPalace($, fixIndex(palaceIndex + 6));
  // 获取三方宫位
  const palace4 = getPalace($, fixIndex(palaceIndex + 4));
  const palace8 = getPalace($, fixIndex(palaceIndex + 8));

  if (!palace4 || !palace6 || !palace8) {
    return false;
  }

  const allStarsInPalace = _concatStars(
    palace.majorStars,
    palace.minorStars,
    palace.adjectiveStars,
    palace4.majorStars,
    palace4.minorStars,
    palace4.adjectiveStars,
    palace6.majorStars,
    palace6.minorStars,
    palace6.adjectiveStars,
    palace8.majorStars,
    palace8.minorStars,
    palace8.adjectiveStars,
  );

  return _includeAll(allStarsInPalace, stars);
};
