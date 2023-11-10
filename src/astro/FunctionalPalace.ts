import { Palace } from '../data/types';
import { Mutagen, StarName } from '../i18n';
import { hasMutagenInPlace, hasOneOfStars, hasStars, notHaveMutagenInPalce, notHaveStars } from './analyzer';

/**
 * 宫位类的接口定义。
 *
 * 文档地址：https://docs.iztro.com/posts/palace.html#functionalastrolabe
 */
export interface IFunctionalPalace extends Palace {
  /**
   * 判断某个宫位内是否有传入的星耀，要所有星耀都在宫位内才会返回true
   *
   * @version v1.0.0
   *
   * @param stars 星耀名称，可以包含主星、辅星、杂耀
   * @returns true | false
   */
  has: (stars: StarName[]) => boolean;

  /**
   * 判断某个宫位内是否有传入的星耀，要所有星耀都不在宫位内才会返回true
   *
   * @version v1.0.0
   *
   * @param stars 星耀名称，可以包含主星、辅星、杂耀
   * @returnstrue | false
   */
  notHave: (stars: StarName[]) => boolean;

  /**
   * 判断某个宫位内是否有传入星耀的其中一个，只要命中一个就会返回true
   *
   * @version v1.0.0
   *
   * @param stars 星耀名称，可以包含主星、辅星、杂耀
   * @returns true | false
   */
  hasOneOf: (stars: StarName[]) => boolean;

  /**
   * 判断宫位内是否有生年四化
   *
   * @version v1.2.0
   *
   * @param mutagen 四化名称【禄｜权｜科｜忌】
   * @returns true | false
   */
  hasMutagen: (mutagen: Mutagen) => boolean;

  /**
   * 判断宫位内是否没有生年四化
   *
   * @version v1.2.0
   *
   * @param mutagen 四化名称【禄｜权｜科｜忌】
   * @returns true | false
   */
  notHaveMutagen: (mutagen: Mutagen) => boolean;

  /**
   * 判断一个宫位是否为空宫（没有主星），
   * 有些派别在宫位内有某些星耀的情况下，
   * 是不会将该宫位判断为空宫的。
   * 所以加入一个参数来传入星耀。
   *
   * @version v2.0.6
   *
   * @param excludeStars 星耀名称数组
   *
   * @returns {boolean}  true | false
   */
  isEmpty: (excludeStars?: StarName[]) => boolean;
}

/**
 * 宫位类。
 *
 * 文档地址：https://docs.iztro.com/posts/palace.html#functionalastrolabe
 */
export default class FunctionalPalace implements IFunctionalPalace {
  name;
  isBodyPalace;
  isOriginalPalace;
  heavenlyStem;
  earthlyBranch;
  majorStars;
  minorStars;
  adjectiveStars;
  changsheng12;
  boshi12;
  jiangqian12;
  suiqian12;
  decadal;
  ages;

  constructor(data: Palace) {
    this.name = data.name;
    this.isBodyPalace = data.isBodyPalace;
    this.isOriginalPalace = data.isOriginalPalace;
    this.heavenlyStem = data.heavenlyStem;
    this.earthlyBranch = data.earthlyBranch;
    this.majorStars = data.majorStars;
    this.minorStars = data.minorStars;
    this.adjectiveStars = data.adjectiveStars;
    this.changsheng12 = data.changsheng12;
    this.boshi12 = data.boshi12;
    this.jiangqian12 = data.jiangqian12;
    this.suiqian12 = data.suiqian12;
    this.decadal = data.decadal;
    this.ages = data.ages;

    return this;
  }

  has = (stars: StarName[]): boolean => hasStars(this, stars);
  notHave = (stars: StarName[]): boolean => notHaveStars(this, stars);
  hasOneOf = (stars: StarName[]): boolean => hasOneOfStars(this, stars);
  hasMutagen = (mutagen: Mutagen): boolean => hasMutagenInPlace(this, mutagen);
  notHaveMutagen = (mutagen: Mutagen): boolean => notHaveMutagenInPalce(this, mutagen);
  isEmpty = (excludeStars?: StarName[]) => {
    if (this.majorStars?.filter((star) => star.type === 'major').length) {
      return false;
    }

    if (excludeStars?.length && this.hasOneOf(excludeStars)) {
      return false;
    }

    return true;
  };
}
