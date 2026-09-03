/**
 * 星曜名称别名。
 *
 * 部分语言中的不同星曜具有完全相同的译名，带汉字的别名用于在反查时明确指定目标星曜。
 */
export const STAR_ALIASES = {
  // 韩文
  '천상(天相)': 'tianxiangMaj',
  '천상(天傷)': 'tianshang',
  '천월(天鉞)': 'tianyueMin',
  '천월(天月)': 'tianyue',
  '겁살(劫殺)': 'jieshaAdj',
  '겁살(劫煞)': 'jiesha',
  '비렴(蜚廉)': 'feilian',
  '비렴(飛廉)': 'faylian',
  '관부(官府)': 'guanfu',
  '관부(官符)': 'gwanfu',
  // 越南语
  'Kiếp Sát(劫殺)': 'jieshaAdj',
  'Kiếp Sát(劫煞)': 'jiesha',
  'Phi Liêm(蜚廉)': 'feilian',
  'Phi Liêm(飛廉)': 'faylian',
} as const;

export type StarAlias = keyof typeof STAR_ALIASES;
