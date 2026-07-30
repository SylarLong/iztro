import type heavenlyStemEnUS from "../locales/en-US/heavenlyStem";
import type heavenlyStemJaJP from "../locales/ja-JP/heavenlyStem";
import type heavenlyStemKoKR from "../locales/ko-KR/heavenlyStem";
import type heavenlyStemViVN from "../locales/vi-VN/heavenlyStem";
import type heavenlyStemZhCN from "../locales/zh-CN/heavenlyStem";
import type heavenlyStemZhTW from "../locales/zh-TW/heavenlyStem";

type HeavenlyStemEnUS =
  (typeof heavenlyStemEnUS)[keyof typeof heavenlyStemEnUS];
type HeavenlyStemJaJP =
  (typeof heavenlyStemJaJP)[keyof typeof heavenlyStemJaJP];
type HeavenlyStemKoKR =
  (typeof heavenlyStemKoKR)[keyof typeof heavenlyStemKoKR];
type HeavenlyStemZhCN =
  (typeof heavenlyStemZhCN)[keyof typeof heavenlyStemZhCN];
type HeavenlyStemZhTW =
  (typeof heavenlyStemZhTW)[keyof typeof heavenlyStemZhTW];
type HeavenlyStemViVN =
  (typeof heavenlyStemViVN)[keyof typeof heavenlyStemViVN];

export type HeavenlyStemName =
  | HeavenlyStemEnUS
  | HeavenlyStemJaJP
  | HeavenlyStemKoKR
  | HeavenlyStemZhCN
  | HeavenlyStemZhTW
  | HeavenlyStemViVN;

export type HeavenlyStemKey = keyof typeof heavenlyStemZhCN;
