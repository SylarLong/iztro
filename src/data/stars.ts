/** 紫微斗数四化 */
export const MUTAGEN = ['sihuaLu', 'sihuaQuan', 'sihuaKe', 'sihuaJi'] as const;

/**
 * 星耀信息
 * 其中包含：
 * 1. 亮度（bright）, 按照宫位地支排序（从寅开始）
 * 2. 五行（fiveElements）
 * 3. 阴阳（yinYang）
 */
export const STARS_INFO = {
  ziweiMaj: {
    brightness: ['wang', 'wang', 'de', 'wang', 'miao', 'miao', 'wang', 'wang', 'de', 'wang', 'ping', 'miao'],
    fiveElements: '土',
    yinYang: '阴',
  },
  tianjiMaj: {
    brightness: ['de', 'wang', 'li', 'ping', 'miao', 'xian', 'de', 'wang', 'li', 'ping', 'miao', 'xian'],
    fiveElements: '木',
    yinYang: '阴',
  },
  taiyangMaj: {
    brightness: ['wang', 'miao', 'wang', 'wang', 'wang', 'de', 'de', 'xian', 'bu', 'xian', 'xian', 'bu'],
    fiveElements: '',
    yinYang: '',
  },
  wuquMaj: {
    brightness: ['de', 'li', 'miao', 'ping', 'wang', 'miao', 'de', 'li', 'miao', 'ping', 'wang', 'miao'],
    fiveElements: '金',
    yinYang: '阴',
  },
  tiantongMaj: {
    brightness: ['li', 'ping', 'ping', 'miao', 'xian', 'bu', 'wang', 'ping', 'ping', 'miao', 'wang', 'bu'],
    fiveElements: '水',
    yinYang: '阳',
  },
  lianzhenMaj: {
    brightness: ['miao', 'ping', 'li', 'xian', 'ping', 'li', 'miao', 'ping', 'li', 'xian', 'ping', 'li'],
    fiveElements: '火',
    yinYang: '阴',
  },
  tianfuMaj: {
    brightness: ['miao', 'de', 'miao', 'de', 'wang', 'miao', 'de', 'wang', 'miao', 'de', 'miao', 'miao'],
    fiveElements: '土',
    yinYang: '阳',
  },
  taiyinMaj: {
    brightness: ['wang', 'xian', 'xian', 'xian', 'bu', 'bu', 'li', 'bu', 'wang', 'miao', 'miao', 'miao'],
    fiveElements: '水',
    yinYang: '阴',
  },
  tanlangMaj: {
    brightness: ['ping', 'li', 'miao', 'xian', 'wang', 'miao', 'ping', 'li', 'miao', 'xian', 'wang', 'miao'],
    fiveElements: '水',
    yinYang: '',
  },
  jumenMaj: {
    brightness: ['miao', 'miao', 'xian', 'wang', 'wang', 'bu', 'miao', 'miao', 'xian', 'wang', 'wang', 'bu'],
    fiveElements: '土',
    yinYang: '阴',
  },
  tianxiangMaj: {
    brightness: ['miao', 'xian', 'de', 'de', 'miao', 'de', 'miao', 'xian', 'de', 'de', 'miao', 'miao'],
    fiveElements: '水',
    yinYang: '',
  },
  tianliangMaj: {
    brightness: ['miao', 'miao', 'miao', 'xian', 'miao', 'wang', 'xian', 'de', 'miao', 'xian', 'miao', 'wang'],
    fiveElements: '土',
    yinYang: '',
  },
  qishaMaj: {
    brightness: ['miao', 'wang', 'miao', 'ping', 'wang', 'miao', 'miao', 'miao', 'miao', 'ping', 'wang', 'miao'],
    fiveElements: '',
    yinYang: '',
  },
  pojunMaj: {
    brightness: ['de', 'xian', 'wang', 'ping', 'miao', 'wang', 'de', 'xian', 'wang', 'ping', 'miao', 'wang'],
    fiveElements: '水',
    yinYang: '',
  },
  wenchangMin: {
    brightness: ['xian', 'li', 'de', 'miao', 'xian', 'li', 'de', 'miao', 'xian', 'li', 'de', 'miao'],
  },
  wenquMin: {
    brightness: ['ping', 'wang', 'de', 'miao', 'xian', 'wang', 'de', 'miao', 'xian', 'wang', 'de', 'miao'],
  },
  huoxingMin: {
    brightness: ['miao', 'li', 'xian', 'de', 'miao', 'li', 'xian', 'de', 'miao', 'li', 'xian', 'de'],
  },
  lingxingMin: {
    brightness: ['miao', 'li', 'xian', 'de', 'miao', 'li', 'xian', 'de', 'miao', 'li', 'xian', 'de'],
  },
  qingyangMin: {
    brightness: ['', 'xian', 'miao', '', 'xian', 'miao', '', 'xian', 'miao', '', 'xian', 'miao'],
  },
  tuoluoMin: {
    brightness: ['xian', '', 'miao', 'xian', '', 'miao', 'xian', '', 'miao', 'xian', '', 'miao'],
  },
} as const;
