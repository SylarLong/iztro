import type brightnessEnUS from "../locales/en-US/brightness";
import type brightnessJaJP from "../locales/ja-JP/brightness";
import type brightnessKoKR from "../locales/ko-KR/brightness";
import type brightnessViVN from "../locales/vi-VN/brightness";
import type brightnessZhCN from "../locales/zh-CN/brightness";
import type brightnessZhTW from "../locales/zh-TW/brightness";

type BrightnessEnUS = (typeof brightnessEnUS)[keyof typeof brightnessEnUS];
type BrightnessJaJP = (typeof brightnessJaJP)[keyof typeof brightnessJaJP];
type BrightnessKoKR = (typeof brightnessKoKR)[keyof typeof brightnessKoKR];
type BrightnessZhCN = (typeof brightnessZhCN)[keyof typeof brightnessZhCN];
type BrightnessZhTW = (typeof brightnessZhTW)[keyof typeof brightnessZhTW];
type BrightnessViVN = (typeof brightnessViVN)[keyof typeof brightnessViVN];

export type Brightness =
  | ""
  | BrightnessEnUS
  | BrightnessJaJP
  | BrightnessKoKR
  | BrightnessZhCN
  | BrightnessZhTW
  | BrightnessViVN;
export type BrightnessKey = keyof typeof brightnessZhCN;
