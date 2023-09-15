import i18next from 'i18next';
import transZhCN from './locales/zh-CN';
import transZhTW from './locales/zh-TW';
import transKoKR from './locales/ko-KR';
import transJaJP from './locales/ja-JP';
import transEnUS from './locales/en-US';
import transViVN from './locales/vi-VN';
import { Language } from '../data/types';

const resources: { [key: Language]: { translation: { [key: string]: string } } } = {
  'en-US': {
    translation: transEnUS,
  },
  'ja-JP': {
    translation: transJaJP,
  },
  'ko-KR': {
    translation: transKoKR,
  },
  'zh-CN': {
    translation: transZhCN,
  },
  'zh-TW': {
    translation: transZhTW,
  },
  'vi-VN': {
    translation: transViVN,
  },
};

// 设置默认语言和加载翻译文件
i18next.init({ lng: 'zh-CN', resources });

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
export const kot = <T>(value: string, k?: string) => {
  let res = value;

  for (const [, item] of Object.entries(resources)) {
    for (const [transKey, trans] of Object.entries(item.translation)) {
      if (((k && transKey.includes(k)) || !k) && trans === value) {
        res = transKey;
        return res as T;
      }
    }
  }

  return res as T;
};

export * from './types';

export default i18next;
