import { SurroundedPalaces } from '../data/types';
import { Mutagen, StarName } from '../i18n';
import { isSurroundedByOneOfStars, isSurroundedByStars, notSurroundedByStars } from './analyzer';

export interface IFunctionalSurpalaces extends SurroundedPalaces {
  /**
   * 判断某一个宫位三方四正是否包含目标星耀，必须要全部包含才会返回true
   *
   * @version v1.2.0
   *
   * @param stars 星耀名称，可以包含主星、辅星、杂耀
   * @returns true | false
   */
  have: (stars: StarName[]) => boolean;

  /**
   * 判断某一个宫位三方四正是否不含目标星耀，必须要全部都不在三方四正内含才会返回true
   *
   * @version v1.2.0
   *
   * @param stars 星耀名称，可以包含主星、辅星、杂耀
   * @returnstrue | false
   */
  notHave: (stars: StarName[]) => boolean;

  /**
   * 判断三方四正内是否有传入星耀的其中一个，只要命中一个就会返回true
   *
   * @version v1.2.0
   *
   * @param stars 星耀名称，可以包含主星、辅星、杂耀
   * @returns true | false
   */
  haveOneOf: (stars: StarName[]) => boolean;

  /**
   * 判断某一个宫位三方四正是否有四化
   *
   * @version v1.2.0
   *
   * @param mutagen 四化名称【禄｜权｜科｜忌】
   * @returns true | false
   */
  haveMutagen: (mutagen: Mutagen) => boolean;

  /**
   * 判断某一个宫位三方四正是否没有四化
   *
   * @version v1.2.0
   *
   * @param mutagen 四化名称【禄｜权｜科｜忌】
   * @returns true | false
   */
  notHaveMutagen: (mutagen: Mutagen) => boolean;
}

export class FunctionalSurpalaces implements IFunctionalSurpalaces {
  target;
  opposite;
  wealth;
  career;

  constructor({ target, opposite, wealth, career }: SurroundedPalaces) {
    this.target = target;
    this.opposite = opposite;
    this.wealth = wealth;
    this.career = career;
  }

  have = (stars: StarName[]): boolean => isSurroundedByStars(this, stars);
  notHave = (stars: StarName[]): boolean => notSurroundedByStars(this, stars);
  haveOneOf = (stars: StarName[]): boolean => isSurroundedByOneOfStars(this, stars);
  haveMutagen = (mutagen: Mutagen): boolean =>
    this.target.hasMutagen(mutagen) ||
    this.opposite.hasMutagen(mutagen) ||
    this.wealth.hasMutagen(mutagen) ||
    this.career.hasMutagen(mutagen);
  notHaveMutagen = (mutagen: Mutagen) => !this.haveMutagen(mutagen);
}
