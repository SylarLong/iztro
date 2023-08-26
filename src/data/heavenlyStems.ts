/**
 * 十天干信息
 * 其中包含：
 * 1. 阴阳（yinYang）
 * 2. 五行（fiveElements）
 * 3. 天干相冲（crash）
 *    - 甲庚相冲
 *    - 乙辛相冲
 *    - 壬丙相冲
 *    - 癸丁相冲
 *    - 戊己土居中央，故无冲。
 * 4. 紫微斗数十天干四化(mutagen)
 *
 *    顺序为【禄，权，科，忌】
 *    - 甲:【廉，破，武，阳】
 *    - 乙:【机，梁，紫，月】
 *    - 丙:【同，机，昌，廉】
 *    - 丁:【阴，同，机，巨】
 *    - 戊:【贪，月，弼，机】
 *    - 己:【武，贪，梁，曲】
 *    - 庚:【阳，武，阴，同】
 *    - 辛:【巨，日，曲，昌】
 *    - 壬:【梁，紫，左，武】
 *    - 癸:【破，巨，阴，贪】
 */
export const heavenlyStems = {
  jiaHeavenly: {
    yinYang: '阳',
    fiveElements: '木',
    crash: 'gengHeavenly',
    mutagen: ['lianzhenMaj', 'pojunMaj', 'wuquMaj', 'taiyangMaj'],
  },
  yiHeavenly: {
    yinYang: '阴',
    fiveElements: '木',
    crash: 'xinHeavenly',
    mutagen: ['tianjiMaj', 'tianliangMaj', 'ziweiMaj', 'taiyinMaj'],
  },
  bingHeavenly: {
    yinYang: '阳',
    fiveElements: '火',
    crash: 'renHeavenly',
    mutagen: ['tiantongMaj', 'tianjiMaj', 'wenchangMin', 'lianzhenMaj'],
  },
  dingHeavenly: {
    yinYang: '阴',
    fiveElements: '火',
    crash: 'guiHeavenly',
    mutagen: ['taiyinMaj', 'tiantongMaj', 'tianjiMaj', 'jumenMaj'],
  },
  wuHeavenly: {
    yinYang: '阳',
    fiveElements: '土',
    mutagen: ['tanlangMaj', 'taiyinMaj', 'youbiMin', 'tianjiMaj'],
  },
  jiHeavenly: {
    yinYang: '阴',
    fiveElements: '土',
    mutagen: ['wuquMaj', 'tanlangMaj', 'tianliangMaj', 'wenquMin'],
  },
  gengHeavenly: {
    yinYang: '阳',
    fiveElements: '金',
    crash: 'jiaHeavenly',
    mutagen: ['taiyangMaj', 'wuquMaj', 'taiyinMaj', 'tiantongMaj'],
  },
  xinHeavenly: {
    yinYang: '阴',
    fiveElements: '金',
    crash: 'yiHeavenly',
    mutagen: ['jumenMaj', 'taiyangMaj', 'wenquMin', 'wenchangMin'],
  },
  renHeavenly: {
    yinYang: '阳',
    fiveElements: '水',
    crash: 'bingHeavenly',
    mutagen: ['tianliangMaj', 'ziweiMaj', 'zuofuMin', 'wuquMaj'],
  },
  guiHeavenly: {
    yinYang: '阴',
    fiveElements: '水',
    crash: 'dingHeavenly',
    mutagen: ['pojunMaj', 'jumenMaj', 'taiyinMaj', 'tanlangMaj'],
  },
} as const;
