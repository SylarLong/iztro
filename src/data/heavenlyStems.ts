/**
 * 十天干信息
 * 其中包含：
 * 1. 阴阳（yinYang）
 * 2. 五行（fiveElements）
 * 3. 天干相冲（crash），其中戊己为中庸，不与任何天干相冲
 * 4. 紫微斗数四化，顺序为【禄，权，科，忌】
 */
export const heavenlyStems = {
  甲: {
    yinYang: '阳',
    fiveElements: '木',
    crash: '庚',
    transform: ['廉贞', '破军', '武曲', '太阳'],
  },
  乙: {
    yinYang: '阴',
    fiveElements: '木',
    crash: '辛',
    transform: ['天机', '天梁', '紫微', '太阴'],
  },
  丙: {
    yinYang: '阳',
    fiveElements: '火',
    crash: '壬',
    transform: ['天同', '天机', '文昌', '廉贞'],
  },
  丁: {
    yinYang: '阴',
    fiveElements: '火',
    crash: '癸',
    transform: ['太阴', '天同', '天机', '巨门'],
  },
  戊: {
    yinYang: '阳',
    fiveElements: '土',
    transform: ['贪狼', '太阴', '右弼', '天机'],
  },
  己: {
    yinYang: '阴',
    fiveElements: '土',
    transform: ['武曲', '贪狼', '天梁', '文曲'],
  },
  庚: {
    yinYang: '阳',
    fiveElements: '金',
    crash: '甲',
    transform: ['太阳', '武曲', '太阴', '天同'],
  },
  辛: {
    yinYang: '阴',
    fiveElements: '金',
    crash: '乙',
    transform: ['巨门', '太阳', '文曲', '文昌'],
  },
  壬: {
    yinYang: '阳',
    fiveElements: '水',
    crash: '丙',
    transform: ['天梁', '紫微', '左辅', '武曲'],
  },
  癸: {
    yinYang: '阴',
    fiveElements: '水',
    crash: '丁',
    transform: ['破军', '巨门', '太阴', '贪狼'],
  },
} as const;
