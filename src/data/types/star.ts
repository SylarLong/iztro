import { Brightness, Mutagen, StarName } from '../../i18n';
import { Scope, StarType } from './general';

/**
 * 紫微斗数星耀
 *
 * @property
 * - name 星耀名字
 * - type 星耀类型
 * - scope 作用范围
 * - brightness 星耀亮度
 * - mutagen 四化
 */
export type Star = {
  /** 星耀名字 */
  name: StarName;
  /** 星耀类型（主星 | 吉星 | 煞星 | 杂耀 | 桃花星 | 解神 | 禄存 | 天马） */
  type: StarType;
  /** 作用范围（本命盘 | 大限盘 | 流年盘） */
  scope: Scope;
  /** 星耀亮度，若没有亮度数据则此字段为`空字符串`或者 `undefined` */
  brightness?: Brightness;
  /** 四化，若未产生四化则此字段为 `undefined` */
  mutagen?: Mutagen;
};
