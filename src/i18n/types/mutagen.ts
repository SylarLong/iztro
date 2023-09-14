import mutagenEnUS from '../locales/en-US/mutagen';
import mutagenJaJP from '../locales/ja-JP/mutagen';
import mutagenKoKR from '../locales/ko-KR/mutagen';
import mutagenZhCN from '../locales/zh-CN/mutagen';
import mutagenZhTW from '../locales/zh-TW/mutagen';
import mutagenViVN from '../locales/vi-VN/mutagen';

type MutagenEnUS = (typeof mutagenEnUS)[keyof typeof mutagenEnUS];
type MutagenJaJP = (typeof mutagenJaJP)[keyof typeof mutagenJaJP];
type MutagenKoKR = (typeof mutagenKoKR)[keyof typeof mutagenKoKR];
type MutagenZhCN = (typeof mutagenZhCN)[keyof typeof mutagenZhCN];
type MutagenZhTW = (typeof mutagenZhTW)[keyof typeof mutagenZhTW];
type MutagenViVN = (typeof mutagenViVN)[keyof typeof mutagenViVN];

export type Mutagen = MutagenEnUS | MutagenJaJP | MutagenKoKR | MutagenZhCN | MutagenZhTW | MutagenViVN;
export type MutagenKey = keyof typeof mutagenZhCN;
