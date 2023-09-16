import heavenlyStemEnUS from '../locales/en-US/heavenlyStem';
import heavenlyStemJaJP from '../locales/ja-JP/heavenlyStem';
import heavenlyStemKoKR from '../locales/ko-KR/heavenlyStem';
import heavenlyStemZhCN from '../locales/zh-CN/heavenlyStem';
import heavenlyStemZhTW from '../locales/zh-TW/heavenlyStem';
import heavenlyStemViVN from '../locales/vi-VN/heavenlyStem';

type HeavenlyStemEnUS = (typeof heavenlyStemEnUS)[keyof typeof heavenlyStemEnUS];
type HeavenlyStemJaJP = (typeof heavenlyStemJaJP)[keyof typeof heavenlyStemJaJP];
type HeavenlyStemKoKR = (typeof heavenlyStemKoKR)[keyof typeof heavenlyStemKoKR];
type HeavenlyStemZhCN = (typeof heavenlyStemZhCN)[keyof typeof heavenlyStemZhCN];
type HeavenlyStemZhTW = (typeof heavenlyStemZhTW)[keyof typeof heavenlyStemZhTW];
type HeavenlyStemViVN = (typeof heavenlyStemViVN)[keyof typeof heavenlyStemViVN];

export type HeavenlyStemName =
  | HeavenlyStemEnUS
  | HeavenlyStemJaJP
  | HeavenlyStemKoKR
  | HeavenlyStemZhCN
  | HeavenlyStemZhTW
  | HeavenlyStemViVN;

export type HeavenlyStemKey = keyof typeof heavenlyStemZhCN;
