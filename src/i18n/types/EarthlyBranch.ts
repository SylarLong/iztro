import earthlyBranchEnUS from '../locales/en-US/earthlyBranch';
import earthlyBranchJaJP from '../locales/ja-JP/earthlyBranch';
import earthlyBranchKoKR from '../locales/ko-KR/earthlyBranch';
import earthlyBranchZhCN from '../locales/zh-CN/earthlyBranch';
import earthlyBranchZhTW from '../locales/zh-TW/earthlyBranch';
import earthlyBranchViVN from '../locales/vi-VN/earthlyBranch';

type EarthlyBranchEnUS = (typeof earthlyBranchEnUS)[keyof typeof earthlyBranchEnUS];
type EarthlyBranchJaJP = (typeof earthlyBranchJaJP)[keyof typeof earthlyBranchJaJP];
type EarthlyBranchKoKR = (typeof earthlyBranchKoKR)[keyof typeof earthlyBranchKoKR];
type EarthlyBranchZhCN = (typeof earthlyBranchZhCN)[keyof typeof earthlyBranchZhCN];
type EarthlyBranchZhTW = (typeof earthlyBranchZhTW)[keyof typeof earthlyBranchZhTW];
type EarthlyBranchViVN = (typeof earthlyBranchViVN)[keyof typeof earthlyBranchViVN];

export type EarthlyBranchName =
  | EarthlyBranchEnUS
  | EarthlyBranchJaJP
  | EarthlyBranchKoKR
  | EarthlyBranchZhCN
  | EarthlyBranchZhTW
  | EarthlyBranchViVN;

export type EarthlyBranchKey = keyof typeof earthlyBranchZhCN;
