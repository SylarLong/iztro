import i18next from 'i18next';
import commonEnUS from './locales/en-US/common.json';
import commonJaJP from './locales/ja-JP/common.json';
import commonKoKR from './locales/ko-KR/common.json';
import commonZhCN from './locales/zh-CN/common.json';
import commonZhTW from './locales/zh-TW/common.json';
import commonViVN from './locales/vi-VN/common.json';
import brightnessEnUS from './locales/en-US/brightness';
import brightnessJaJP from './locales/ja-JP/brightness';
import brightnessKoKR from './locales/ko-KR/brightness';
import brightnessZhCN from './locales/zh-CN/brightness';
import brightnessZhTW from './locales/zh-TW/brightness';
import brightnessViVN from './locales/vi-VN/brightness';
import mutagenEnUS from './locales/en-US/mutagen';
import mutagenJaJP from './locales/ja-JP/mutagen';
import mutagenKoKR from './locales/ko-KR/mutagen';
import mutagenZhCN from './locales/zh-CN/mutagen';
import mutagenZhTW from './locales/zh-TW/mutagen';
import mutagenViVN from './locales/vi-VN/mutagen';
import palaceEnUS from './locales/en-US/palace';
import palaceJaJP from './locales/ja-JP/palace';
import palaceKoKR from './locales/ko-KR/palace';
import palaceZhCN from './locales/zh-CN/palace';
import palaceZhTW from './locales/zh-TW/palace';
import palaceViVN from './locales/vi-VN/palace';
import heavenlyStemEnUS from './locales/en-US/heavenlyStem';
import heavenlyStemJaJP from './locales/ja-JP/heavenlyStem';
import heavenlyStemKoKR from './locales/ko-KR/heavenlyStem';
import heavenlyStemZhCN from './locales/zh-CN/heavenlyStem';
import heavenlyStemZhTW from './locales/zh-TW/heavenlyStem';
import heavenlyStemViVN from './locales/vi-VN/heavenlyStem';
import earthlyBranchEnUS from './locales/en-US/earthlyBranch';
import earthlyBranchJaJP from './locales/ja-JP/earthlyBranch';
import earthlyBranchKoKR from './locales/ko-KR/earthlyBranch';
import earthlyBranchZhCN from './locales/zh-CN/earthlyBranch';
import earthlyBranchZhTW from './locales/zh-TW/earthlyBranch';
import earthlyBranchViVN from './locales/vi-VN/earthlyBranch';
import fiveElementsClassEnUS from './locales/en-US/fiveElementsClass';
import fiveElementsClassJaJP from './locales/ja-JP/fiveElementsClass';
import fiveElementsClassKoKR from './locales/ko-KR/fiveElementsClass';
import fiveElementsClassZhCN from './locales/zh-CN/fiveElementsClass';
import fiveElementsClassZhTW from './locales/zh-TW/fiveElementsClass';
import fiveElementsClassViVN from './locales/vi-VN/fiveElementsClass';
import starEnUS from './locales/en-US/star';
import starJaJP from './locales/ja-JP/star';
import starKoKR from './locales/ko-KR/star';
import starZhCN from './locales/zh-CN/star';
import starZhTW from './locales/zh-TW/star';
import starViVN from './locales/vi-VN/star';
import genderEnUS from './locales/en-US/gender';
import genderJaJP from './locales/ja-JP/gender';
import genderKoKR from './locales/ko-KR/gender';
import genderZhCN from './locales/zh-CN/gender';
import genderZhTW from './locales/zh-TW/gender';
import genderViVN from './locales/vi-VN/gender';
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
      ...genderEnUS,
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
      ...genderJaJP,
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
      ...genderKoKR,
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
      ...genderZhCN,
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
      ...genderZhTW,
    },
  },
  'vi-VN': {
    translation: {
      ...commonViVN,
      ...fiveElementsClassViVN,
      ...heavenlyStemViVN,
      ...earthlyBranchViVN,
      ...brightnessViVN,
      ...mutagenViVN,
      ...starViVN,
      ...palaceViVN,
      ...genderViVN,
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
type StarViVN = (typeof starViVN)[keyof typeof starViVN];

export type StarName = StarEnUS | StarJaJP | StarKoKR | StarZhCN | StarZhTW | StarViVN;
export type StarKey = keyof typeof starZhCN;

type MutagenEnUS = (typeof mutagenEnUS)[keyof typeof mutagenEnUS];
type MutagenJaJP = (typeof mutagenJaJP)[keyof typeof mutagenJaJP];
type MutagenKoKR = (typeof mutagenKoKR)[keyof typeof mutagenKoKR];
type MutagenZhCN = (typeof mutagenZhCN)[keyof typeof mutagenZhCN];
type MutagenZhTW = (typeof mutagenZhTW)[keyof typeof mutagenZhTW];
type MutagenViVN = (typeof mutagenViVN)[keyof typeof mutagenViVN];


export type Mutagen = MutagenEnUS | MutagenJaJP | MutagenKoKR | MutagenZhCN | MutagenZhTW | MutagenViVN;
export type MutagenKey = keyof typeof mutagenZhCN;

type BrightnessEnUS = (typeof brightnessEnUS)[keyof typeof brightnessEnUS];
type BrightnessJaJP = (typeof brightnessJaJP)[keyof typeof brightnessJaJP];
type BrightnessKoKR = (typeof brightnessKoKR)[keyof typeof brightnessKoKR];
type BrightnessZhCN = (typeof brightnessZhCN)[keyof typeof brightnessZhCN];
type BrightnessZhTW = (typeof brightnessZhTW)[keyof typeof brightnessZhTW];
type BrightnessViVN = (typeof brightnessViVN)[keyof typeof brightnessViVN];

export type Brightness = '' | BrightnessEnUS | BrightnessJaJP | BrightnessKoKR | BrightnessZhCN | BrightnessZhTW | BrightnessViVN;
export type BrightnessKey = keyof typeof brightnessZhCN;

type PalaceEnUS = (typeof palaceEnUS)[keyof typeof palaceEnUS];
type PalaceJaJP = (typeof palaceJaJP)[keyof typeof palaceJaJP];
type PalaceKoKR = (typeof palaceKoKR)[keyof typeof palaceKoKR];
type PalaceZhCN = (typeof palaceZhCN)[keyof typeof palaceZhCN];
type PalaceZhTW = (typeof palaceZhTW)[keyof typeof palaceZhTW];
type PalaceViVN = (typeof palaceViVN)[keyof typeof palaceViVN];

export type PalaceName = PalaceEnUS | PalaceJaJP | PalaceKoKR | PalaceZhCN | PalaceZhTW | PalaceViVN;
export type PalaceKey = keyof typeof palaceZhCN;

type HeavenlyStemEnUS = (typeof heavenlyStemEnUS)[keyof typeof heavenlyStemEnUS];
type HeavenlyStemJaJP = (typeof heavenlyStemJaJP)[keyof typeof heavenlyStemJaJP];
type HeavenlyStemKoKR = (typeof heavenlyStemKoKR)[keyof typeof heavenlyStemKoKR];
type HeavenlyStemZhCN = (typeof heavenlyStemZhCN)[keyof typeof heavenlyStemZhCN];
type HeavenlyStemZhTW = (typeof heavenlyStemZhTW)[keyof typeof heavenlyStemZhTW];
type HeavenlyStemViVN = (typeof heavenlyStemViVN)[keyof typeof heavenlyStemViVN];

export type HeavenlyStemName =
  | HeavenlyStemEnUS
  | HeavenlyStemJaJP
  | HeavenlyStemKoKR
  | HeavenlyStemZhCN
  | HeavenlyStemZhTW
  | HeavenlyStemViVN;
export type HeavenlyStemKey = keyof typeof heavenlyStemZhCN;

type EarthlyBranchEnUS = (typeof earthlyBranchEnUS)[keyof typeof earthlyBranchEnUS];
type EarthlyBranchJaJP = (typeof earthlyBranchJaJP)[keyof typeof earthlyBranchJaJP];
type EarthlyBranchKoKR = (typeof earthlyBranchKoKR)[keyof typeof earthlyBranchKoKR];
type EarthlyBranchZhCN = (typeof earthlyBranchZhCN)[keyof typeof earthlyBranchZhCN];
type EarthlyBranchZhTW = (typeof earthlyBranchZhTW)[keyof typeof earthlyBranchZhTW];
type EarthlyBranchViVN = (typeof earthlyBranchViVN)[keyof typeof earthlyBranchViVN];

export type EarthlyBranchName =
  | EarthlyBranchEnUS
  | EarthlyBranchJaJP
  | EarthlyBranchKoKR
  | EarthlyBranchZhCN
  | EarthlyBranchZhTW
  | EarthlyBranchViVN;
  
export type EarthlyBranchKey = keyof typeof earthlyBranchZhCN;

type FiveElementsClassEnUS = (typeof fiveElementsClassEnUS)[keyof typeof fiveElementsClassEnUS];
type FiveElementsClassJaJP = (typeof fiveElementsClassJaJP)[keyof typeof fiveElementsClassJaJP];
type FiveElementsClassKoKR = (typeof fiveElementsClassKoKR)[keyof typeof fiveElementsClassKoKR];
type FiveElementsClassZhCN = (typeof fiveElementsClassZhCN)[keyof typeof fiveElementsClassZhCN];
type FiveElementsClassZhTW = (typeof fiveElementsClassZhTW)[keyof typeof fiveElementsClassZhTW];
type FiveElementsClassViVN = (typeof fiveElementsClassViVN)[keyof typeof fiveElementsClassViVN];

export type FiveElementsClassName =
  | FiveElementsClassEnUS
  | FiveElementsClassJaJP
  | FiveElementsClassKoKR
  | FiveElementsClassZhCN
  | FiveElementsClassZhTW
  | FiveElementsClassViVN;

  
export type FiveElementsClassKey = keyof typeof fiveElementsClassZhCN;

type GenderEnUS = (typeof genderEnUS)[keyof typeof genderEnUS];
type GenderJaJP = (typeof genderJaJP)[keyof typeof genderJaJP];
type GenderKoKR = (typeof genderKoKR)[keyof typeof genderKoKR];
type GenderZhCN = (typeof genderZhCN)[keyof typeof genderZhCN];
type GenderZhTW = (typeof genderZhTW)[keyof typeof genderZhTW];
type GenderViVN = (typeof genderViVN)[keyof typeof genderViVN];

export type GenderName = GenderEnUS | GenderJaJP | GenderKoKR | GenderZhCN | GenderZhTW | GenderViVN;
export type GenderKey = keyof typeof genderZhCN;

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
export const kot = <T>(value: string, k?:string) => {
  for (const lng in resources) {
    const res = resources[lng].translation;
    for (const key in res) {
      if (k) {
        if (Object.prototype.hasOwnProperty.call(res, key) && res[key] === value && key.includes(k!)) {
          return key as T;
        }
      } else {
          if (Object.prototype.hasOwnProperty.call(res, key) && res[key] === value) {
        return key as T;
      }
      }
    
    }
  }

  return value as T;
};

export default i18next;
