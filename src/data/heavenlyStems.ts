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
 *    - 甲: 廉破武阳
 *    - 乙: 机梁紫月
 *    - 丙: 同机昌廉
 *    - 丁: 阴同机巨
 *    - 戊: 贪月弼机
 *    - 己: 武贪梁曲
 *    - 庚: 阳武阴同
 *    - 辛: 巨日曲昌
 *    - 壬: 梁紫左武
 *    - 癸: 破巨阴贪
 */
export const heavenlyStems = {
  甲: {
    yinYang: '阳',
    fiveElements: '木',
    crash: '庚',
    mutagen: ['廉贞', '破军', '武曲', '太阳'],
  },
  乙: {
    yinYang: '阴',
    fiveElements: '木',
    crash: '辛',
    mutagen: ['天机', '天梁', '紫微', '太阴'],
  },
  丙: {
    yinYang: '阳',
    fiveElements: '火',
    crash: '壬',
    mutagen: ['天同', '天机', '文昌', '廉贞'],
  },
  丁: {
    yinYang: '阴',
    fiveElements: '火',
    crash: '癸',
    mutagen: ['太阴', '天同', '天机', '巨门'],
  },
  戊: {
    yinYang: '阳',
    fiveElements: '土',
    mutagen: ['贪狼', '太阴', '右弼', '天机'],
  },
  己: {
    yinYang: '阴',
    fiveElements: '土',
    mutagen: ['武曲', '贪狼', '天梁', '文曲'],
  },
  庚: {
    yinYang: '阳',
    fiveElements: '金',
    crash: '甲',
    mutagen: ['太阳', '武曲', '太阴', '天同'],
  },
  辛: {
    yinYang: '阴',
    fiveElements: '金',
    crash: '乙',
    mutagen: ['巨门', '太阳', '文曲', '文昌'],
  },
  壬: {
    yinYang: '阳',
    fiveElements: '水',
    crash: '丙',
    mutagen: ['天梁', '紫微', '左辅', '武曲'],
  },
  癸: {
    yinYang: '阴',
    fiveElements: '水',
    crash: '丁',
    mutagen: ['破军', '巨门', '太阴', '贪狼'],
  },
} as const;
