import genderEnUS from '../locales/en-US/gender';
import genderJaJP from '../locales/ja-JP/gender';
import genderKoKR from '../locales/ko-KR/gender';
import genderZhCN from '../locales/zh-CN/gender';
import genderZhTW from '../locales/zh-TW/gender';
import genderViVN from '../locales/vi-VN/gender';

type GenderEnUS = (typeof genderEnUS)[keyof typeof genderEnUS];
type GenderJaJP = (typeof genderJaJP)[keyof typeof genderJaJP];
type GenderKoKR = (typeof genderKoKR)[keyof typeof genderKoKR];
type GenderZhCN = (typeof genderZhCN)[keyof typeof genderZhCN];
type GenderZhTW = (typeof genderZhTW)[keyof typeof genderZhTW];
type GenderViVN = (typeof genderViVN)[keyof typeof genderViVN];

export type GenderName = GenderEnUS | GenderJaJP | GenderKoKR | GenderZhCN | GenderZhTW | GenderViVN;
export type GenderKey = keyof typeof genderZhCN;
