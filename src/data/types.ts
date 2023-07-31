import { EARTHLY_BRANCHES } from './constants';

/**
 * 十二地支信息
 * 其中包含：
 * 1. 阴阳（yinYang）
 * 2. 五行（fiveElements）
 * 3. 六冲（crash）
 * 4. 紫微斗数命主（soul）
 * 5. 紫微斗数身主（body）
 * 6. 身体部位【内】（inside）
 * 7. 身体部位【外】（outside）
 * 8. 健康提示（healthTip）
 */
export type EarthlyBranch = {
  [key in (typeof EARTHLY_BRANCHES)[number]]: {
    /** 阴阳 */
    yinYang: string;
    /** 五行 */
    fiveElements: string;
    /**
     * 六冲
     * - 子午相冲
     * - 丑未相冲
     * - 寅申相冲
     * - 卯酉相冲
     * - 辰戌相冲
     * - 巳亥相冲
     */
    crash: string;
    /**
     * 命主
     * - 命主以命宫所在宫位地支定之
     */
    soul: string;
    /**
     * 身主
     * - 身主以生年年支定之
     */
    body: string;
    /** 身体部位【内】 */
    inside: string;
    /** 身体部位【外】 */
    outside: string;
    /** 健康提示 */
    healthTip: string;
  };
};
