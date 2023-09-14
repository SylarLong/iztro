import starEnUS from '../locales/en-US/star';
import starJaJP from '../locales/ja-JP/star';
import starKoKR from '../locales/ko-KR/star';
import starZhCN from '../locales/zh-CN/star';
import starZhTW from '../locales/zh-TW/star';
import starViVN from '../locales/vi-VN/star';

type StarEnUS = (typeof starEnUS)[keyof typeof starEnUS];
type StarJaJP = (typeof starJaJP)[keyof typeof starJaJP];
type StarKoKR = (typeof starKoKR)[keyof typeof starKoKR];
type StarZhCN = (typeof starZhCN)[keyof typeof starZhCN];
type StarZhTW = (typeof starZhTW)[keyof typeof starZhTW];
type StarViVN = (typeof starViVN)[keyof typeof starViVN];

export type StarName = StarEnUS | StarJaJP | StarKoKR | StarZhCN | StarZhTW | StarViVN;
export type StarKey = keyof typeof starZhCN;
