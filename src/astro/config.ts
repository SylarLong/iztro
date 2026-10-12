import { Config } from '../data/types';
import { BrightnessKey, HeavenlyStemKey, StarKey, kot } from '../i18n';

type ResolvedConfig = {
  mutagens: Partial<Record<HeavenlyStemKey, StarKey[]>>;
  brightness: Partial<Record<StarKey, BrightnessKey[]>>;
} & Required<Omit<Config, 'mutagens' | 'brightness'>>;

/**
 * 创建默认配置。
 * @internal
 * @version 2.6.2
 */
const defaults = (): ResolvedConfig => ({
  mutagens: {},
  brightness: {},
  yearDivide: 'normal',
  horoscopeDivide: 'normal',
  ageDivide: 'normal',
  dayDivide: 'forward',
  algorithm: 'default',
});

/**
 * 复制配置表及其数组。
 * @internal
 * @version 2.6.2
 */
const cloneTable = <T extends string>(table: Partial<Record<T, string[]>>) => {
  const result: Partial<Record<T, string[]>> = {};
  Object.entries<string[] | undefined>(table).forEach(([key, values]) => {
    if (values) result[key as T] = [...values];
  });
  return result;
};

/**
 * 创建完整配置的独立副本。
 * @internal
 * @version 2.6.2
 */
const clone = (value: ResolvedConfig): ResolvedConfig => ({
  ...value,
  mutagens: cloneTable(value.mutagens) as ResolvedConfig['mutagens'],
  brightness: cloneTable(value.brightness) as ResolvedConfig['brightness'],
});

let globalConfig = defaults();
let activeConfig: ResolvedConfig | undefined;

/**
 * 获取配置的独立副本，修改返回值不会影响库。
 *
 * @version 2.3.0
 * @since 2.6.2 返回深拷贝
 * @returns 当前生效配置的独立副本
 */
export const getConfig = (): ResolvedConfig => clone(activeConfig ?? globalConfig);

/**
 * 将配置恢复为出厂默认值，并清除自定义四化和亮度表。
 * 已经生成的星盘不受影响。
 *
 * @version 2.6.2
 */
export const resetConfig = (): void => {
  globalConfig = defaults();
};

/**
 * 将单次排盘配置合并到当前配置，返回独立副本。
 *
 * @internal
 * @version 2.6.2
 * @param options 配置覆盖项
 * @param base 基础配置，默认使用当前生效配置
 */
export const resolveConfig = (options: Config = {}, base = activeConfig ?? globalConfig): ResolvedConfig => {
  const result = clone(base);
  const choices = {
    yearDivide: ['normal', 'exact'],
    horoscopeDivide: ['normal', 'exact'],
    ageDivide: ['normal', 'birthday'],
    dayDivide: ['current', 'forward'],
    algorithm: ['default', 'zhongzhou'],
  };
  (Object.keys(choices) as (keyof typeof choices)[]).forEach((key) => {
    const value = options[key];
    if (value !== undefined) {
      if (!choices[key].includes(value)) throw new Error(`invalid ${key}.`);
      Object.assign(result, { [key]: value });
    }
  });
  if (options.mutagens) {
    Object.entries(options.mutagens).forEach(([key, stars]) => {
      result.mutagens[kot<HeavenlyStemKey>(key)] = stars.map((star) => kot<StarKey>(star));
    });
  }
  if (options.brightness) {
    Object.entries(options.brightness).forEach(([key, levels]) => {
      result.brightness[kot<StarKey>(key)] = levels.map((level) => kot<BrightnessKey>(level));
    });
  }
  return result;
};

/**
 * 设置后续排盘的全局默认配置；不会修改已经生成的星盘。
 *
 * @version 2.3.0
 * @since 2.6.2 已有星盘保留生成时的配置
 * @param options 全局默认配置覆盖项
 */
export const config = (options: Config): void => {
  globalConfig = resolveConfig(options, globalConfig);
};

/**
 * 在同步计算中使用指定配置，嵌套调用和异常退出时恢复上一层上下文。
 *
 * @internal
 * @version 2.6.2
 * @param snapshot 当前计算使用的配置
 * @param calculate 同步计算方法
 */
export const withConfig = <T>(snapshot: ResolvedConfig, calculate: () => T): T => {
  const previous = activeConfig;
  activeConfig = snapshot;
  try {
    return calculate();
  } finally {
    activeConfig = previous;
  }
};
