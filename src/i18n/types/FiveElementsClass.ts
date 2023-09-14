import fiveElementsClassEnUS from '../locales/en-US/fiveElementsClass';
import fiveElementsClassJaJP from '../locales/ja-JP/fiveElementsClass';
import fiveElementsClassKoKR from '../locales/ko-KR/fiveElementsClass';
import fiveElementsClassZhCN from '../locales/zh-CN/fiveElementsClass';
import fiveElementsClassZhTW from '../locales/zh-TW/fiveElementsClass';
import fiveElementsClassViVN from '../locales/vi-VN/fiveElementsClass';

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
