import { MUTAGEN } from '../data';
import { Star, SurroundedPalaces } from '../data/types';
import { HeavenlyStemName, kot, Mutagen, MutagenKey, PalaceKey, PalaceName, StarKey, StarName } from '../i18n';
import { fixEarthlyBranchIndex, fixIndex, getMutagensByHeavenlyStem } from '../utils';
import { IFunctionalAstrolabe } from './FunctionalAstrolabe';
import { IFunctionalPalace } from './FunctionalPalace';
import { FunctionalSurpalaces, IFunctionalSurpalaces } from './FunctionalSurpalaces';

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

const _includeMutagen = (stars: Star[], mutagen: Mutagen) => {
  const mutagenKey = kot<MutagenKey>(mutagen);

  return stars.some((star) => star.mutagen && kot<MutagenKey>(star.mutagen) === mutagenKey);
};

const _getAllStarsInSurroundedPalaces = ({ target, opposite, wealth, career }: SurroundedPalaces) =>
  _concatStars(
    target.majorStars,
    target.minorStars,
    target.adjectiveStars,
    opposite.majorStars,
    opposite.minorStars,
    opposite.adjectiveStars,
    wealth.majorStars,
    wealth.minorStars,
    wealth.adjectiveStars,
    career.majorStars,
    career.minorStars,
    career.adjectiveStars,
  );

/**
 * 获取三方四正宫位，所谓三方四正就是传入的目标宫位，以及其对宫，财帛位和官禄位，总共四个宫位
 *
 * @version v1.1.0
 *
 * @param $ 星盘实例
 * @param indexOrName 宫位索引或者宫位名称
 * @returns 三方四正宫位
 */
export const getSurroundedPalaces = (
  $: IFunctionalAstrolabe,
  indexOrName: number | PalaceName,
): IFunctionalSurpalaces => {
  // 获取目标宫位
  const palace = getPalace($, indexOrName);

  if (!palace) {
    throw new Error('indexOrName is inccorrect.');
  }
  // 获取目标宫位索引
  const palaceIndex = fixEarthlyBranchIndex(palace.earthlyBranch);
  // 获取对宫
  const palace6 = getPalace($, fixIndex(palaceIndex + 6));
  // 官禄位
  const palace4 = getPalace($, fixIndex(palaceIndex + 4));
  // 财帛位
  const palace8 = getPalace($, fixIndex(palaceIndex + 8));

  if (!palace4 || !palace6 || !palace8) {
    throw new Error('indexOrName is inccorrect.');
  }

  return new FunctionalSurpalaces({
    target: palace,
    wealth: palace8,
    opposite: palace6,
    career: palace4,
  });
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
  let palace: IFunctionalPalace | undefined;

  if (typeof indexOrName === 'number') {
    if (indexOrName < 0 || indexOrName > 11) {
      throw new Error('invalid palace index.');
    }

    palace = $.palaces[indexOrName];
  } else {
    palace = $.palaces.find((item) => {
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
  }

  palace?.setAstrolabe($);

  return palace;
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
 * 判断指定宫位内是否有生年四化
 *
 * @version v1.2.0
 *
 * @param $ 宫位实例
 * @param mutagen 四化名称【禄｜权｜科｜忌】
 * @returns true | false
 */
export const hasMutagenInPlace = ($: IFunctionalPalace, mutagen: Mutagen): boolean => {
  const allStarsInPalace = [...$.majorStars, ...$.minorStars];

  return _includeMutagen(allStarsInPalace, mutagen);
};

/**
 * 判断指定宫位内是否没有生年四化
 *
 * @version v1.2.0
 *
 * @param $ 宫位实例
 * @param mutagen 四化名称【禄｜权｜科｜忌】
 * @returns true | false
 */
export const notHaveMutagenInPalce = ($: IFunctionalPalace, mutagen: Mutagen): boolean => {
  return !hasMutagenInPlace($, mutagen);
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
 * @param $ 三方四正的实例
 * @param stars 星耀名称数组
 * @returns true | false
 */
export const isSurroundedByStars = ($: IFunctionalSurpalaces, stars: StarName[]): boolean => {
  const allStarsInPalace = _getAllStarsInSurroundedPalaces($);

  return _includeAll(allStarsInPalace, stars);
};

/**
 * 判断三方四正内是否有传入星耀的其中一个，只要命中一个就会返回true
 *
 * @param $ 三方四正的实例
 * @param stars 星耀名称数组
 * @returns true | false
 */
export const isSurroundedByOneOfStars = ($: IFunctionalSurpalaces, stars: StarName[]) => {
  const allStarsInPalace = _getAllStarsInSurroundedPalaces($);

  return _includeOneOf(allStarsInPalace, stars);
};

/**
 * 判断某一个宫位三方四正是否不含目标星耀，必须要全部都不在三方四正内含才会返回true
 *
 * @param $ 三方四正的实例
 * @param stars 星耀名称数组
 * @returns true | false
 */
export const notSurroundedByStars = ($: IFunctionalSurpalaces, stars: StarName[]) => {
  const allStarsInPalace = _getAllStarsInSurroundedPalaces($);

  return _excludeAll(allStarsInPalace, stars);
};

export const mutagensToStars = (heavenlyStem: HeavenlyStemName, mutagens: Mutagen | Mutagen[]) => {
  const muts = Array.isArray(mutagens) ? mutagens : [mutagens];
  const stars: StarName[] = [];
  const mutagenStars = getMutagensByHeavenlyStem(heavenlyStem);

  muts.forEach((withMutagen) => {
    const mutagenIndex = MUTAGEN.indexOf(kot<MutagenKey>(withMutagen));

    if (!mutagenStars[mutagenIndex]) {
      return;
    }

    stars.push(mutagenStars[mutagenIndex]);
  });

  return stars;
};
