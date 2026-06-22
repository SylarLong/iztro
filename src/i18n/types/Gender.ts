import type genderEnUS from "../locales/en-US/gender";
import type genderJaJP from "../locales/ja-JP/gender";
import type genderKoKR from "../locales/ko-KR/gender";
import type genderViVN from "../locales/vi-VN/gender";
import type genderZhCN from "../locales/zh-CN/gender";
import type genderZhTW from "../locales/zh-TW/gender";

type GenderEnUS = (typeof genderEnUS)[keyof typeof genderEnUS];
type GenderJaJP = (typeof genderJaJP)[keyof typeof genderJaJP];
type GenderKoKR = (typeof genderKoKR)[keyof typeof genderKoKR];
type GenderZhCN = (typeof genderZhCN)[keyof typeof genderZhCN];
type GenderZhTW = (typeof genderZhTW)[keyof typeof genderZhTW];
type GenderViVN = (typeof genderViVN)[keyof typeof genderViVN];

export type GenderName =
  | GenderEnUS
  | GenderJaJP
  | GenderKoKR
  | GenderZhCN
  | GenderZhTW
  | GenderViVN;
export type GenderKey = keyof typeof genderZhCN;
