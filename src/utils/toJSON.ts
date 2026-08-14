const _clone = (value: unknown, references: WeakSet<object>): unknown => {
  if (
    typeof value === 'function' ||
    typeof value === 'undefined' ||
    typeof value === 'symbol' ||
    typeof value === 'bigint'
  ) {
    return undefined;
  }

  if (value === null || typeof value !== 'object') {
    return typeof value === 'number' && !Number.isFinite(value) ? null : value;
  }

  if (references.has(value)) {
    return undefined;
  }

  references.add(value);

  if (Array.isArray(value)) {
    const result = value.map((item) => _clone(item, references) ?? null);

    references.delete(value);

    return result;
  }

  const result: Record<string, unknown> = {};

  Object.entries(value).forEach(([key, item]) => {
    if (key === 'plugins' || key === 'astrolabe' || key.startsWith('_')) {
      return;
    }

    const clonedItem = _clone(item, references);

    if (typeof clonedItem !== 'undefined') {
      // 避免特殊属性名（例如 __proto__）改变结果对象的原型。
      Object.defineProperty(result, key, {
        value: clonedItem,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
  });

  references.delete(value);

  return result;
};

/**
 * 将功能类实例转换为普通 JSON 对象。
 *
 * @param instance 功能类实例
 * 循环引用会被忽略，数组中的循环项会按照 JSON 规则转换为 null。
 * 转换过程不会调用嵌套对象的 toJSON 方法。
 *
 * @returns 不包含方法、循环引用和运行时引用的普通对象
 */
export const serialize = <T extends object>(instance: object): T => _clone(instance, new WeakSet()) as T;
