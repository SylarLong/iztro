import type mutagenEnUS from "../locales/en-US/mutagen";
import type mutagenJaJP from "../locales/ja-JP/mutagen";
import type mutagenKoKR from "../locales/ko-KR/mutagen";
import type mutagenViVN from "../locales/vi-VN/mutagen";
import type mutagenZhCN from "../locales/zh-CN/mutagen";
import type mutagenZhTW from "../locales/zh-TW/mutagen";

type MutagenEnUS = (typeof mutagenEnUS)[keyof typeof mutagenEnUS];
type MutagenJaJP = (typeof mutagenJaJP)[keyof typeof mutagenJaJP];
type MutagenKoKR = (typeof mutagenKoKR)[keyof typeof mutagenKoKR];
type MutagenZhCN = (typeof mutagenZhCN)[keyof typeof mutagenZhCN];
type MutagenZhTW = (typeof mutagenZhTW)[keyof typeof mutagenZhTW];
type MutagenViVN = (typeof mutagenViVN)[keyof typeof mutagenViVN];

export type Mutagen =
  | MutagenEnUS
  | MutagenJaJP
  | MutagenKoKR
  | MutagenZhCN
  | MutagenZhTW
  | MutagenViVN;
export type MutagenKey = keyof typeof mutagenZhCN;
