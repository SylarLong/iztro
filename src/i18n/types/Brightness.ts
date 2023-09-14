import brightnessEnUS from '../locales/en-US/brightness';
import brightnessJaJP from '../locales/ja-JP/brightness';
import brightnessKoKR from '../locales/ko-KR/brightness';
import brightnessZhCN from '../locales/zh-CN/brightness';
import brightnessZhTW from '../locales/zh-TW/brightness';
import brightnessViVN from '../locales/vi-VN/brightness';

type BrightnessEnUS = (typeof brightnessEnUS)[keyof typeof brightnessEnUS];
type BrightnessJaJP = (typeof brightnessJaJP)[keyof typeof brightnessJaJP];
type BrightnessKoKR = (typeof brightnessKoKR)[keyof typeof brightnessKoKR];
type BrightnessZhCN = (typeof brightnessZhCN)[keyof typeof brightnessZhCN];
type BrightnessZhTW = (typeof brightnessZhTW)[keyof typeof brightnessZhTW];
type BrightnessViVN = (typeof brightnessViVN)[keyof typeof brightnessViVN];

export type Brightness =
  | ''
  | BrightnessEnUS
  | BrightnessJaJP
  | BrightnessKoKR
  | BrightnessZhCN
  | BrightnessZhTW
  | BrightnessViVN;
export type BrightnessKey = keyof typeof brightnessZhCN;
