/** 紫微斗数四化 */
export const MUTAGEN = ['sihuaLu', 'sihuaQuan', 'sihuaKe', 'sihuaJi'] as const;

/**
 * 星耀信息
 * 其中包含：
 * 1. 亮度（bright）, 按照宫位地支排序（从寅开始）
 * 2. 五行（fiveElements）
 * 3. 阴阳（yinYang）
 * 4. 健康提示（healthTip）
 */
export const STARS_INFO = {
  ziweiMaj: {
    brightness: ['wang', 'wang', 'de', 'wang', 'miao', 'miao', 'wang', 'wang', 'de', 'wang', 'ping', 'miao'],
    fiveElements: '土',
    yinYang: '阴',
    healthTip: '胰脏、脾脏、大脑中枢',
  },
  tianjiMaj: {
    brightness: ['de', 'wang', 'li', 'ping', 'miao', 'xian', 'de', 'wang', 'li', 'ping', 'miao', 'xian'],
    fiveElements: '木',
    yinYang: '阴',
    healthTip: '肝 胆、神经系统、手指尖神经末梢',
  },
  taiyangMaj: {
    brightness: ['miao', 'miao', 'wang', 'wang', 'miao', 'de', 'de', 'ping', 'xian', 'xian', 'xian', 'bu'],
    fiveElements: '',
    yinYang: '',
    healthTip: '心、脑、眼睛、心血管系统',
  },
  wuquMaj: {
    brightness: ['de', 'li', 'miao', 'ping', 'wang', 'miao', 'de', 'li', 'miao', 'ping', 'wang', 'miao'],
    fiveElements: '金',
    yinYang: '阴',
    healthTip: '呼吸系统、鼻、气管、支气管及肺部',
  },
  tiantongMaj: {
    brightness: ['li', 'ping', 'ping', 'miao', 'xian', 'bu', 'wang', 'ping', 'ping', 'miao', 'wang', 'bu'],
    fiveElements: '水',
    yinYang: '阳',
    healthTip: '膀胱、肾水系统、耳朵听力',
  },
  lianzhenMaj: {
    brightness: ['miao', 'ping', 'li', 'xian', 'ping', 'li', 'miao', 'ping', 'li', 'xian', 'ping', 'li'],
    fiveElements: '火',
    yinYang: '阴',
    healthTip: '血液血管，免疫力、生殖系统（子宫、卵巢、输卵管、输精管）、青春痘',
  },
  tianfuMaj: {
    brightness: ['miao', 'de', 'miao', 'de', 'wang', 'miao', 'de', 'wang', 'miao', 'de', 'miao', 'miao'],
    fiveElements: '土',
    yinYang: '阳',
    healthTip: '胃脏、十二指肠、小肠',
  },
  taiyinMaj: {
    brightness: ['wang', 'xian', 'xian', 'xian', 'xian', 'bu', 'li', 'wang', 'wang', 'miao', 'miao', 'miao'],
    fiveElements: '水',
    yinYang: '阴',
    healthTip: '肾脏、肾水系统、眼睛视力',
  },
  tanlangMaj: {
    brightness: ['ping', 'li', 'miao', 'xian', 'wang', 'miao', 'ping', 'li', 'miao', 'xian', 'wang', 'miao'],
    fiveElements: '水',
    yinYang: '',
    healthTip: '生殖器官',
  },
  jumenMaj: {
    brightness: ['miao', 'miao', 'ping', 'wang', 'wang', 'bu', 'miao', 'miao', 'ping', 'wang', 'wang', 'bu'],
    fiveElements: '土',
    yinYang: '阴',
    healthTip: '食道、喉管、口、通道管状部位',
  },
  tianxiangMaj: {
    brightness: ['miao', 'xian', 'de', 'de', 'wang', 'de', 'miao', 'xian', 'de', 'de', 'miao', 'miao'],
    fiveElements: '水',
    yinYang: '',
    healthTip: '面部、脸',
  },
  tianliangMaj: {
    brightness: ['miao', 'miao', 'wang', 'xian', 'miao', 'miao', 'miao', 'de', 'miao', 'xian', 'miao', 'wang'],
    fiveElements: '土',
    yinYang: '',
    healthTip: '肌肉、肋骨',
  },
  qishaMaj: {
    brightness: ['miao', 'wang', 'miao', 'ping', 'wang', 'miao', 'miao', 'wang', 'miao', 'ping', 'wang', 'miao'],
    fiveElements: '',
    yinYang: '',
    healthTip: '骨头、脊椎骨、直肠大肠',
  },
  pojunMaj: {
    brightness: ['de', 'xian', 'wang', 'ping', 'miao', 'wang', 'de', 'xian', 'wang', 'ping', 'miao', 'wang'],
    fiveElements: '水',
    yinYang: '',
    healthTip: '生殖器官、肾脏、脑神经、皮肤',
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
