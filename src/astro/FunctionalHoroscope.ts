import { Horoscope, Scope } from '../data/types';
import { Mutagen, MutagenKey, PalaceName, StarKey, StarName, kot } from '../i18n';
import { IFunctionalAstrolabe } from './FunctionalAstrolabe';
import { IFunctionalSurpalaces } from './FunctionalSurpalaces';
import { IFunctionalPalace } from './FunctionalPalace';
import { mergeStars } from '../utils';
import { MUTAGEN } from '../data';

const _getHoroscopePalaceIndex = ($: IFunctionalHoroscope, scope: Scope, palaceName: PalaceName) => {
  let palaceIndex = -1;

  if (scope === 'origin') {
    $.astrolabe.palaces.some((p, idx) => {
      if (p.name === palaceName) {
        palaceIndex = idx;

        return true;
      }

      return false;
    });
  } else {
    palaceIndex = $[scope].palaceNames.indexOf(palaceName);
  }

  return palaceIndex;
};

export interface IFunctionalHoroscope extends Horoscope {
  astrolabe: IFunctionalAstrolabe;
  /**
   * 获取小限宫位
   *
   * @version v1.3.0
   *
   * @returns {IFunctionalPalace | undefined} 小限宫位
   */
  agePalace: () => IFunctionalPalace | undefined;

  /**
   * 获取运限宫位
   *
   * @version v1.3.0
   *
   * @param palaceName 宫位名称
   * @param scope 指定获取哪个运限的宫位
   * @returns {IFunctionalPalace | undefined} 指定宫位
   */
  palace: (palaceName: PalaceName, scope: Scope) => IFunctionalPalace | undefined;

  /**
   * 获取运限指定宫位的三方四正宫位
   *
   * @version v1.3.0
   *
   * @param palaceName 宫位名称
   * @param scope 指定获取哪个运限的宫位
   * @returns {IFunctionalSurpalaces | undefined} 指定宫位的三方四正
   */
  surroundPalaces: (palaceName: PalaceName, scope: Scope) => IFunctionalSurpalaces | undefined;

  /**
   * 判断在指定运限的宫位内是否包含流耀，需要全部包含才返回true
   *
   * @version v1.3.0
   *
   * @param palaceName 宫位名称
   * @param scope 指定获取哪个运限的宫位
   * @param horoscopeStar 流耀
   * @returns {boolean} 是否包含指定流耀
   */
  hasHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;

  /**
   * 判断指定运限宫位内是否不含流耀，需要全部不包含才返回true
   *
   * @version v1.3.2
   *
   * @param palaceName 宫位名称
   * @param scope 指定获取哪个运限的宫位
   * @param horoscope 流耀
   * @returns {boolean} 是否不含指定流耀
   */
  notHaveHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscope: StarName[]) => boolean;

  /**
   * 判断指定运限宫位内是否含有指定流耀，只要包含其中一颗就返回true
   *
   * @version v1.3.3
   *
   * @param palaceName 宫位名称
   * @param scope 指定获取哪个运限的宫位
   * @param horoscope 流耀
   * @returns {boolean} 是否含有（部分）指定流耀中
   */
  hasOneOfHoroscopeStars: (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => boolean;

  /**
   * 判断指定运限宫位内是否存在运限四化
   *
   * @version v1.3.4
   *
   * @param palaceName 宫位名称
   * @param scope 指定获取哪个运限的宫位
   * @param horoscopeMutagen 运限四化
   * @returns {boolean} 是否含有运限四化
   */
  hasHoroscopeMutagen: (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => boolean;
}

export default class FunctionalHoroscope implements IFunctionalHoroscope {
  lunarDate;
  solarDate;
  decadal;
  age;
  yearly;
  monthly;
  daily;
  hourly;
  astrolabe;

  constructor(data: Horoscope, astrolabe: IFunctionalAstrolabe) {
    this.lunarDate = data.lunarDate;
    this.solarDate = data.solarDate;
    this.decadal = data.decadal;
    this.age = data.age;
    this.yearly = data.yearly;
    this.monthly = data.monthly;
    this.daily = data.daily;
    this.hourly = data.hourly;
    this.astrolabe = astrolabe;

    return this;
  }

  agePalace = () => {
    return this.astrolabe.palace(this.age.index);
  };

  palace = (palaceName: PalaceName, scope: Scope) => {
    if (scope === 'origin') {
      return this.astrolabe.palace(palaceName);
    }

    const targetPalaceindex = this[scope].palaceNames.indexOf(palaceName);

    return this.astrolabe.palace(targetPalaceindex);
  };

  surroundPalaces = (palaceName: PalaceName, scope: Scope) => {
    if (scope === 'origin') {
      return this.astrolabe.surroundedPalaces(palaceName);
    }

    const targetPalaceindex = this[scope].palaceNames.indexOf(palaceName);

    return this.astrolabe.surroundedPalaces(targetPalaceindex);
  };

  hasHoroscopeStars = (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => {
    if (!this.decadal.stars || !this.yearly.stars) {
      return false;
    }

    const palaceIndex = _getHoroscopePalaceIndex(this, scope, palaceName);
    const stars = mergeStars(this.decadal.stars, this.yearly.stars)[palaceIndex];
    const starKeys = stars.map((item) => kot<StarKey>(item.name));
    const horoscopeStarKeys = horoscopeStar.map((item) => kot<StarKey>(item));

    return horoscopeStarKeys.every((star) => starKeys.includes(star));
  };

  notHaveHoroscopeStars = (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => {
    if (!this.decadal.stars || !this.yearly.stars) {
      return false;
    }

    const palaceIndex = _getHoroscopePalaceIndex(this, scope, palaceName);
    const stars = mergeStars(this.decadal.stars, this.yearly.stars)[palaceIndex];
    const starKeys = stars.map((item) => kot<StarKey>(item.name));
    const horoscopeStarKeys = horoscopeStar.map((item) => kot<StarKey>(item));

    return horoscopeStarKeys.every((star) => !starKeys.includes(star));
  };

  hasOneOfHoroscopeStars = (palaceName: PalaceName, scope: Scope, horoscopeStar: StarName[]) => {
    if (!this.decadal.stars || !this.yearly.stars) {
      return false;
    }

    const palaceIndex = _getHoroscopePalaceIndex(this, scope, palaceName);
    const stars = mergeStars(this.decadal.stars, this.yearly.stars)[palaceIndex];
    const starKeys = stars.map((item) => kot<StarKey>(item.name));
    const horoscopeStarKeys = horoscopeStar.map((item) => kot<StarKey>(item));

    return horoscopeStarKeys.some((star) => starKeys.includes(star));
  };

  hasHoroscopeMutagen = (palaceName: PalaceName, scope: Scope, horoscopeMutagen: Mutagen) => {
    if (scope === 'origin') {
      return false;
    }

    const palaceIndex = _getHoroscopePalaceIndex(this, scope, palaceName);
    const majorStars = this.astrolabe.palace(palaceIndex)?.majorStars ?? [];
    const minorStars = this.astrolabe.palace(palaceIndex)?.minorStars ?? [];
    const stars = mergeStars([majorStars], [minorStars])[0].map((star) => kot<StarKey>(star.name));
    const mutagenIndex = MUTAGEN.indexOf(kot<MutagenKey>(horoscopeMutagen));

    return stars.includes(kot<StarKey>(this[scope].mutagen[mutagenIndex]));
  };
}
