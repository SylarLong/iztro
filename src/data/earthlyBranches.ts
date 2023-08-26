/**
 * 十二地支信息
 * 其中包含：
 * 1. 阴阳（yinYang）
 * 2. 五行（fiveElements）
 * 3. 六冲（crash）
 *    - 子午相冲
 *    - 丑未相冲
 *    - 寅申相冲
 *    - 卯酉相冲
 *    - 辰戌相冲
 *    - 巳亥相冲
 * 4. 紫微斗数命主（soul）
 *    - 命主以命宫所在宫位地支定之
 * 5. 紫微斗数身主（body）
 *    - 身主以生年年支定之
 * 6. 身体部位【内】（inside）
 * 7. 身体部位【外】（outside）
 * 8. 健康提示（healthTip）
 */
export const earthlyBranches = {
  ziEarthly: {
    yinYang: '阳',
    fiveElements: '水',
    crash: 'wuEarthly',
    soul: 'tanlangMaj',
    body: 'huoxingMin',
    inside: '胆',
    outside: '下体',
    healthTip: '生殖系统、膀胱、尿道之疾病，听觉障碍',
  },
  chouEarthly: {
    yinYang: '阴',
    fiveElements: '土',
    crash: 'weiEarthly',
    soul: 'jumenMaj',
    body: 'tianxiangMaj',
    inside: '肝',
    outside: '小腿、脚（右）',
    healthTip: '胸部、肋膜炎、胃病、脚部',
  },
  yinEarthly: {
    yinYang: '阳',
    fiveElements: '木',
    crash: 'shenEarthly',
    soul: 'lucunMin',
    body: 'tianliangMaj',
    inside: '肺',
    outside: '大腿（右）',
    healthTip: '胆囊、关节、胫部、神经痛、风湿',
  },
  maoEarthly: {
    yinYang: '阴',
    fiveElements: '木',
    crash: 'youEarthly',
    soul: 'wenquMin',
    body: 'tiantongMaj',
    inside: '大肠',
    outside: '腰（右）、背',
    healthTip: '肝病、颜面神经、失眠、神经衰弱',
  },
  chenEarthly: {
    yinYang: '阳',
    fiveElements: '土',
    crash: 'xuEarthly',
    soul: 'lianzhenMaj',
    body: 'wenchangMin',
    inside: '胃',
    outside: '胸、胳膊（右）',
    healthTip: '消化系统、脊椎、皮肤疾病',
  },
  siEarthly: {
    yinYang: '阴',
    fiveElements: '火',
    crash: 'haiEarthly',
    soul: 'wuquMaj',
    body: 'tianjiMaj',
    inside: '脾',
    outside: '左肩',
    healthTip: '喉头、牙病、感冒',
  },
  wuEarthly: {
    yinYang: '阳',
    fiveElements: '火',
    crash: 'ziEarthly',
    soul: 'pojunMaj',
    body: 'huoxingMin',
    inside: '心',
    outside: '头',
    healthTip: '心脏、视觉、味觉障碍、火难',
  },
  weiEarthly: {
    yinYang: '阴',
    fiveElements: '土',
    crash: 'chouEarthly',
    soul: 'wuquMaj',
    body: 'tianxiangMaj',
    inside: '小肠',
    outside: '脸',
    healthTip: '消化系统、胰脏、健忘症、疲倦、手腕、嘴唇',
  },
  shenEarthly: {
    yinYang: '阳',
    fiveElements: '金',
    crash: 'yinEarthly',
    soul: 'lianzhenMaj',
    body: 'tianliangMaj',
    inside: '膀胱',
    outside: '胸、胳膊（左）',
    healthTip: '呼吸系统、肺部、消化系统、大肠',
  },
  youEarthly: {
    yinYang: '阴',
    fiveElements: '金',
    crash: 'maoEarthly',
    soul: 'wenquMin',
    body: 'tiantongMaj',
    inside: '肾',
    outside: '腰（左）、腹',
    healthTip: '吐血、痢血、小肠之疾、脑出血、头腕部',
  },
  xuEarthly: {
    yinYang: '阳',
    fiveElements: '土',
    crash: 'chenEarthly',
    soul: 'lucunMin',
    body: 'wenchangMin',
    inside: '心包',
    outside: '大腿（左）',
    healthTip: '下半身之疾、子宫、痔疮、脚部',
  },
  haiEarthly: {
    yinYang: '阴',
    fiveElements: '水',
    crash: 'siEarthly',
    soul: 'jumenMaj',
    body: 'tianjiMaj',
    inside: '三焦',
    outside: '小腿、脚（左）',
    healthTip: '排泄机能障碍、肾脏、尿道、偏头痛',
  },
} as const;
