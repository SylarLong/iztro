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
import starEnUS from './locales/en-US/star';
import starJaJP from './locales/ja-JP/star';
import starKoKR from './locales/ko-KR/star';
import starZhCN from './locales/zh-CN/star';
import starZhTW from './locales/zh-TW/star';
import { Language } from '../data/types';

// 设置默认语言和加载翻译文件
const resources: { [key: Language]: any } = {
  'en-US': { translation: { ...commonEnUS, ...brightnessEnUS, ...mutagenEnUS, ...starEnUS, ...palaceEnUS } },
  'ja-JP': { translation: { ...commonJaJP, ...brightnessJaJP, ...mutagenJaJP, ...starJaJP, ...palaceJaJP } },
  'ko-KR': { translation: { ...commonKoKR, ...brightnessKoKR, ...mutagenKoKR, ...starKoKR, ...palaceKoKR } },
  'zh-CN': { translation: { ...commonZhCN, ...brightnessZhCN, ...mutagenZhCN, ...starZhCN, ...palaceZhCN } },
  'zh-TW': { translation: { ...commonZhTW, ...brightnessZhTW, ...mutagenZhTW, ...starZhTW, ...palaceZhTW } },
};

i18next.init({ lng: 'zh-CN', resources });

type StarEnUS = (typeof starEnUS)[keyof typeof starEnUS];
type StarJaJP = (typeof starJaJP)[keyof typeof starJaJP];
type StarKoKR = (typeof starKoKR)[keyof typeof starKoKR];
type StarZhCN = (typeof starZhCN)[keyof typeof starZhCN];
type StarZhTW = (typeof starZhTW)[keyof typeof starZhTW];

export type StarName = StarEnUS | StarJaJP | StarKoKR | StarZhCN | StarZhTW;

type MutagenEnUS = (typeof mutagenEnUS)[keyof typeof mutagenEnUS];
type MutagenJaJP = (typeof mutagenJaJP)[keyof typeof mutagenJaJP];
type MutagenKoKR = (typeof mutagenKoKR)[keyof typeof mutagenKoKR];
type MutagenZhCN = (typeof mutagenZhCN)[keyof typeof mutagenZhCN];
type MutagenZhTW = (typeof mutagenZhTW)[keyof typeof mutagenZhTW];

export type Mutagen = MutagenEnUS | MutagenJaJP | MutagenKoKR | MutagenZhCN | MutagenZhTW;

type BrightnessEnUS = (typeof brightnessEnUS)[keyof typeof brightnessEnUS];
type BrightnessJaJP = (typeof brightnessJaJP)[keyof typeof brightnessJaJP];
type BrightnessKoKR = (typeof brightnessKoKR)[keyof typeof brightnessKoKR];
type BrightnessZhCN = (typeof brightnessZhCN)[keyof typeof brightnessZhCN];
type BrightnessZhTW = (typeof brightnessZhTW)[keyof typeof brightnessZhTW];

export type Brightness = '' | BrightnessEnUS | BrightnessJaJP | BrightnessKoKR | BrightnessZhCN | BrightnessZhTW;

type PalaceEnUS = (typeof palaceEnUS)[keyof typeof palaceEnUS];
type PalaceJaJP = (typeof palaceJaJP)[keyof typeof palaceJaJP];
type PalaceKoKR = (typeof palaceKoKR)[keyof typeof palaceKoKR];
type PalaceZhCN = (typeof palaceZhCN)[keyof typeof palaceZhCN];
type PalaceZhTW = (typeof palaceZhTW)[keyof typeof palaceZhTW];

export type PalaceName = PalaceEnUS | PalaceJaJP | PalaceKoKR | PalaceZhCN | PalaceZhTW;

export const setLanguage = (language: Language) => {
  i18next.changeLanguage(language);
};

export const t = (str: string) => {
  if (!str) {
    return '';
  }

  return i18next.t(str);
};

export const kt = <T>(value: string) => {
  const res = resources[i18next.language].translation;

  for (const key in res) {
    if (res.hasOwnProperty(key) && res[key] === value) {
      return key as T;
    }
  }

  return value as T;
};

export default i18next;
