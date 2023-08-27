import { kot, PalaceKey, PalaceName, StarName } from '../i18n';
import { IFunctionalAstrolabe } from './FunctionalAstrolabe';
import { IFunctionalPalace } from './FunctionalPalace';

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
  const allStarsInPalace = [...$.majorStars, ...$.minorStars, ...$.adjectiveStars].map((item) =>
    kot<StarName>(item.name),
  );
  const starKeys = stars.map((item) => kot<StarName>(item));

  return starKeys.every((star) => allStarsInPalace.includes(star));
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
  const allStarsInPalace = [...$.majorStars, ...$.minorStars, ...$.adjectiveStars].map((item) =>
    kot<StarName>(item.name),
  );
  const starKeys = stars.map((item) => kot<StarName>(item));

  return starKeys.some((star) => allStarsInPalace.includes(star));
};
