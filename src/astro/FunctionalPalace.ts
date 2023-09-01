import { Palace } from '../data/types';
import { StarName } from '../i18n';
import { hasOneOfStars, hasStars, notHaveStars } from './analyzer';

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
}

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
}
