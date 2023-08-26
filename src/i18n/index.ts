import i18next from 'i18next';
import commonEnUS from './locales/en-US/common.json';
import commonJaJP from './locales/ja-JP/common.json';
import commonKoKR from './locales/ko-KR/common.json';
import commonZhCN from './locales/zh-CN/common.json';
import commonZhTW from './locales/zh-TW/common.json';
import brightnessEnUS from './locales/en-US/brightness';
import brightnessJaJP from './locales/ja-JP/brightness';
import brightnessKoKR from './locales/ko-KR/brightness';
import brightnessZhCN from './locales/zh-CN/brightness';
import brightnessZhTW from './locales/zh-TW/brightness';
import mutagenEnUS from './locales/en-US/mutagen';
import mutagenJaJP from './locales/ja-JP/mutagen';
import mutagenKoKR from './locales/ko-KR/mutagen';
import mutagenZhCN from './locales/zh-CN/mutagen';
import mutagenZhTW from './locales/zh-TW/mutagen';
import palaceEnUS from './locales/en-US/palace';
import palaceJaJP from './locales/ja-JP/palace';
import palaceKoKR from './locales/ko-KR/palace';
import palaceZhCN from './locales/zh-CN/palace';
import palaceZhTW from './locales/zh-TW/palace';
import heavenlyStemEnUS from './locales/en-US/heavenlyStem';
import heavenlyStemJaJP from './locales/ja-JP/heavenlyStem';
import heavenlyStemKoKR from './locales/ko-KR/heavenlyStem';
import heavenlyStemZhCN from './locales/zh-CN/heavenlyStem';
import heavenlyStemZhTW from './locales/zh-TW/heavenlyStem';
import earthlyBranchEnUS from './locales/en-US/earthlyBranch';
import earthlyBranchJaJP from './locales/ja-JP/earthlyBranch';
import earthlyBranchKoKR from './locales/ko-KR/earthlyBranch';
import earthlyBranchZhCN from './locales/zh-CN/earthlyBranch';
import earthlyBranchZhTW from './locales/zh-TW/earthlyBranch';
import fiveElementsClassEnUS from './locales/en-US/fiveElementsClass';
import fiveElementsClassJaJP from './locales/ja-JP/fiveElementsClass';
import fiveElementsClassKoKR from './locales/ko-KR/fiveElementsClass';
import fiveElementsClassZhCN from './locales/zh-CN/fiveElementsClass';
import fiveElementsClassZhTW from './locales/zh-TW/fiveElementsClass';
import starEnUS from './locales/en-US/star';
import starJaJP from './locales/ja-JP/star';
import starKoKR from './locales/ko-KR/star';
import starZhCN from './locales/zh-CN/star';
import starZhTW from './locales/zh-TW/star';
import { Language } from '../data/types';

const resources: { [key: Language]: { translation: { [key: string]: string } } } = {
  'en-US': {
    translation: {
      ...commonEnUS,
      ...fiveElementsClassEnUS,
      ...heavenlyStemEnUS,
      ...earthlyBranchEnUS,
      ...brightnessEnUS,
      ...mutagenEnUS,
      ...starEnUS,
      ...palaceEnUS,
    },
  },
  'ja-JP': {
    translation: {
      ...commonJaJP,
      ...fiveElementsClassJaJP,
      ...heavenlyStemJaJP,
      ...earthlyBranchJaJP,
      ...brightnessJaJP,
      ...mutagenJaJP,
      ...starJaJP,
      ...palaceJaJP,
    },
  },
  'ko-KR': {
    translation: {
      ...commonKoKR,
      ...fiveElementsClassKoKR,
      ...heavenlyStemKoKR,
      ...earthlyBranchKoKR,
      ...brightnessKoKR,
      ...mutagenKoKR,
      ...starKoKR,
      ...palaceKoKR,
    },
  },
  'zh-CN': {
    translation: {
      ...commonZhCN,
      ...fiveElementsClassZhCN,
      ...heavenlyStemZhCN,
      ...earthlyBranchZhCN,
      ...brightnessZhCN,
      ...mutagenZhCN,
      ...starZhCN,
      ...palaceZhCN,
    },
  },
  'zh-TW': {
    translation: {
      ...commonZhTW,
      ...fiveElementsClassZhTW,
      ...heavenlyStemZhTW,
      ...earthlyBranchZhTW,
      ...brightnessZhTW,
      ...mutagenZhTW,
      ...starZhTW,
      ...palaceZhTW,
    },
  },
};

// 设置默认语言和加载翻译文件
i18next.init({ lng: 'zh-CN', resources });

type StarEnUS = (typeof starEnUS)[keyof typeof starEnUS];
type StarJaJP = (typeof starJaJP)[keyof typeof starJaJP];
type StarKoKR = (typeof starKoKR)[keyof typeof starKoKR];
type StarZhCN = (typeof starZhCN)[keyof typeof starZhCN];
type StarZhTW = (typeof starZhTW)[keyof typeof starZhTW];

export type StarName = StarEnUS | StarJaJP | StarKoKR | StarZhCN | StarZhTW;
export type StarKey = keyof typeof starZhCN;

type MutagenEnUS = (typeof mutagenEnUS)[keyof typeof mutagenEnUS];
type MutagenJaJP = (typeof mutagenJaJP)[keyof typeof mutagenJaJP];
type MutagenKoKR = (typeof mutagenKoKR)[keyof typeof mutagenKoKR];
type MutagenZhCN = (typeof mutagenZhCN)[keyof typeof mutagenZhCN];
type MutagenZhTW = (typeof mutagenZhTW)[keyof typeof mutagenZhTW];

export type Mutagen = MutagenEnUS | MutagenJaJP | MutagenKoKR | MutagenZhCN | MutagenZhTW;
export type MutagenKey = keyof typeof mutagenZhCN;

type BrightnessEnUS = (typeof brightnessEnUS)[keyof typeof brightnessEnUS];
type BrightnessJaJP = (typeof brightnessJaJP)[keyof typeof brightnessJaJP];
type BrightnessKoKR = (typeof brightnessKoKR)[keyof typeof brightnessKoKR];
type BrightnessZhCN = (typeof brightnessZhCN)[keyof typeof brightnessZhCN];
type BrightnessZhTW = (typeof brightnessZhTW)[keyof typeof brightnessZhTW];

export type Brightness = '' | BrightnessEnUS | BrightnessJaJP | BrightnessKoKR | BrightnessZhCN | BrightnessZhTW;
export type BrightnessKey = keyof typeof brightnessZhCN;

type PalaceEnUS = (typeof palaceEnUS)[keyof typeof palaceEnUS];
type PalaceJaJP = (typeof palaceJaJP)[keyof typeof palaceJaJP];
type PalaceKoKR = (typeof palaceKoKR)[keyof typeof palaceKoKR];
type PalaceZhCN = (typeof palaceZhCN)[keyof typeof palaceZhCN];
type PalaceZhTW = (typeof palaceZhTW)[keyof typeof palaceZhTW];

export type PalaceName = PalaceEnUS | PalaceJaJP | PalaceKoKR | PalaceZhCN | PalaceZhTW;
export type PalaceKey = keyof typeof palaceZhCN;

type HeavenlyStemEnUS = (typeof heavenlyStemEnUS)[keyof typeof heavenlyStemEnUS];
type HeavenlyStemJaJP = (typeof heavenlyStemJaJP)[keyof typeof heavenlyStemJaJP];
type HeavenlyStemKoKR = (typeof heavenlyStemKoKR)[keyof typeof heavenlyStemKoKR];
type HeavenlyStemZhCN = (typeof heavenlyStemZhCN)[keyof typeof heavenlyStemZhCN];
type HeavenlyStemZhTW = (typeof heavenlyStemZhTW)[keyof typeof heavenlyStemZhTW];

export type HeavenlyStemName =
  | HeavenlyStemEnUS
  | HeavenlyStemJaJP
  | HeavenlyStemKoKR
  | HeavenlyStemZhCN
  | HeavenlyStemZhTW;
export type HeavenlyStemKey = keyof typeof heavenlyStemZhCN;

type EarthlyBranchEnUS = (typeof earthlyBranchEnUS)[keyof typeof earthlyBranchEnUS];
type EarthlyBranchJaJP = (typeof earthlyBranchJaJP)[keyof typeof earthlyBranchJaJP];
type EarthlyBranchKoKR = (typeof earthlyBranchKoKR)[keyof typeof earthlyBranchKoKR];
type EarthlyBranchZhCN = (typeof earthlyBranchZhCN)[keyof typeof earthlyBranchZhCN];
type EarthlyBranchZhTW = (typeof earthlyBranchZhTW)[keyof typeof earthlyBranchZhTW];

export type EarthlyBranchName =
  | EarthlyBranchEnUS
  | EarthlyBranchJaJP
  | EarthlyBranchKoKR
  | EarthlyBranchZhCN
  | EarthlyBranchZhTW;
export type EarthlyBranchKey = keyof typeof earthlyBranchZhCN;

type FiveElementsClassEnUS = (typeof fiveElementsClassEnUS)[keyof typeof fiveElementsClassEnUS];
type FiveElementsClassJaJP = (typeof fiveElementsClassJaJP)[keyof typeof fiveElementsClassJaJP];
type FiveElementsClassKoKR = (typeof fiveElementsClassKoKR)[keyof typeof fiveElementsClassKoKR];
type FiveElementsClassZhCN = (typeof fiveElementsClassZhCN)[keyof typeof fiveElementsClassZhCN];
type FiveElementsClassZhTW = (typeof fiveElementsClassZhTW)[keyof typeof fiveElementsClassZhTW];

export type FiveElementsClassName =
  | FiveElementsClassEnUS
  | FiveElementsClassJaJP
  | FiveElementsClassKoKR
  | FiveElementsClassZhCN
  | FiveElementsClassZhTW;
export type FiveElementsClassKey = keyof typeof fiveElementsClassZhCN;

/**
 * 设置国际化语言。
 * 支持的语言见 type.ts -> Language
 *
 * @param language 需要设置的语言【默认为zh-CN】
 */
export const setLanguage = (language: Language) => {
  i18next.changeLanguage(language);
};

/**
 * 输出国际化文本。
 *
 * @param str 待翻译的字符串
 * @returns 翻译后的字符串
 */
export const t = <T>(str: string) => {
  if (!str) {
    return '' as T;
  }

  return i18next.t(str) as T;
};

/**
 * kot(Key of Translation).
 *
 * 通过翻译文本反查Key的值，用于各种计算。
 * 若没有找到则会返回Value本身。
 *
 * @param value 翻译后的字符串
 * @returns 翻译文本的Key值
 */
export const kot = <T>(value: string) => {
  for (const lng in resources) {
    const res = resources[lng].translation;
    for (const key in res) {
      if (Object.prototype.hasOwnProperty.call(res, key) && res[key] === value) {
        return key as T;
      }
    }
  }

  return value as T;
};

export default i18next;
