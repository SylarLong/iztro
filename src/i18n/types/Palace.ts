import palaceEnUS from '../locales/en-US/palace';
import palaceJaJP from '../locales/ja-JP/palace';
import palaceKoKR from '../locales/ko-KR/palace';
import palaceZhCN from '../locales/zh-CN/palace';
import palaceZhTW from '../locales/zh-TW/palace';
import palaceViVN from '../locales/vi-VN/palace';

type PalaceEnUS = (typeof palaceEnUS)[keyof typeof palaceEnUS];
type PalaceJaJP = (typeof palaceJaJP)[keyof typeof palaceJaJP];
type PalaceKoKR = (typeof palaceKoKR)[keyof typeof palaceKoKR];
type PalaceZhCN = (typeof palaceZhCN)[keyof typeof palaceZhCN];
type PalaceZhTW = (typeof palaceZhTW)[keyof typeof palaceZhTW];
type PalaceViVN = (typeof palaceViVN)[keyof typeof palaceViVN];

export type PalaceName = PalaceEnUS | PalaceJaJP | PalaceKoKR | PalaceZhCN | PalaceZhTW | PalaceViVN;
export type PalaceKey = keyof typeof palaceZhCN;
