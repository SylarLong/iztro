import type palaceEnUS from "../locales/en-US/palace";
import type palaceJaJP from "../locales/ja-JP/palace";
import type palaceKoKR from "../locales/ko-KR/palace";
import type palaceViVN from "../locales/vi-VN/palace";
import type palaceZhCN from "../locales/zh-CN/palace";
import type palaceZhTW from "../locales/zh-TW/palace";

type PalaceEnUS = (typeof palaceEnUS)[keyof typeof palaceEnUS];
type PalaceJaJP = (typeof palaceJaJP)[keyof typeof palaceJaJP];
type PalaceKoKR = (typeof palaceKoKR)[keyof typeof palaceKoKR];
type PalaceZhCN = (typeof palaceZhCN)[keyof typeof palaceZhCN];
type PalaceZhTW = (typeof palaceZhTW)[keyof typeof palaceZhTW];
type PalaceViVN = (typeof palaceViVN)[keyof typeof palaceViVN];

export type PalaceName =
  | PalaceEnUS
  | PalaceJaJP
  | PalaceKoKR
  | PalaceZhCN
  | PalaceZhTW
  | PalaceViVN;
export type PalaceKey = keyof typeof palaceZhCN;
