import { IFunctionalPalace } from '../../astro/FunctionalPalace';
import { EarthlyBranchName, HeavenlyStemName, PalaceName, StarName } from '../../i18n';
import FunctionalStar from '../../star/FunctionalStar';
import { Decadal } from './astro';

/**
 * 命宫、身宫对象
 *
 * @property
 * - soulIndex 命宫索引
 * - bodyIndex 身宫索引
 * - heavenlyStemOfSoul 命宫天干
 * - earthlyBranchOfSoul 命宫地支
 */
export type SoulAndBody = {
  /** 命宫索引 */
  soulIndex: number;
  /** 身宫索引 */
  bodyIndex: number;
  /** 命宫天干 */
  heavenlyStemOfSoul: HeavenlyStemName;
  /** 命宫地支 */
  earthlyBranchOfSoul: EarthlyBranchName;
};

/**
 * 宫位对象
 *
 * @property
 * - name 宫位名称
 * - isBodyPalace 是否身宫
 * - isOriginalPalace 是否来因宫
 * - heavenlyStem 宫位天干
 * - earthlyBranch 宫位地支
 * - majorStars 主星
 * - minorStars 辅星
 * - adjectiveStars 杂耀
 * - changsheng12 长生12神之一
 * - boshi12 博士12神之一
 * - jiangqian12 将前12神之一
 * - suiqian12 岁前12神之一
 * - decadal 大限
 * - ages 小限
 */
export type Palace = {
  /** 宫位索引 */
  index: number;
  /** 宫位名称 */
  name: PalaceName;
  /** 是否身宫 */
  isBodyPalace: boolean;
  /** 是否来因宫 */
  isOriginalPalace: boolean;
  /** 宫位天干 */
  heavenlyStem: HeavenlyStemName;
  /** 宫位地支 */
  earthlyBranch: EarthlyBranchName;
  /** 主星 */
  majorStars: FunctionalStar[];
  /** 辅星 */
  minorStars: FunctionalStar[];
  /** 杂耀 */
  adjectiveStars: FunctionalStar[];
  /** 长生12神 */
  changsheng12: StarName;
  /** 博士12神 */
  boshi12: StarName;
  /** 流年将前12神 */
  jiangqian12: StarName;
  /** 流年岁前12神 */
  suiqian12: StarName;
  /** 大限 */
  decadal: Decadal;
  /** 小限 */
  ages: number[];
};

/**
 * 三方四正宫位
 *
 * @property
 * - target 目标宫位
 * - career 三方位（官禄位）
 * - opposite 对宫
 * - wealth 三方位（财帛位）
 */
export type SurroundedPalaces = {
  /** 本宫 */
  target: IFunctionalPalace;
  /** 对宫 */
  opposite: IFunctionalPalace;
  /** 财帛位 */
  wealth: IFunctionalPalace;
  /** 官禄位 */
  career: IFunctionalPalace;
};
