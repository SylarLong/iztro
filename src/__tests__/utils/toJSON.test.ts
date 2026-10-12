import { serialize } from '../../utils/toJSON';

describe('JSON 转换边界', () => {
  test('非有限数字转换为 null，不支持的值被忽略或在数组中占位', () => {
    const result = serialize({
      finite: 0,
      nan: NaN,
      infinity: Infinity,
      negativeInfinity: -Infinity,
      nothing: null,
      missing: undefined,
      symbol: Symbol('value'),
      bigint: BigInt(1),
      callback: () => 'value',
      array: [undefined, Symbol('value'), BigInt(1), () => 'value', NaN, 0, false, ''],
    });
    expect(result).toEqual({
      finite: 0,
      nan: null,
      infinity: null,
      negativeInfinity: null,
      nothing: null,
      array: [null, null, null, null, null, 0, false, ''],
    });
    expect(() => JSON.stringify(result)).not.toThrow();
  });

  test('数组循环使用 null 占位，重复引用保持完整数据且不修改源对象', () => {
    const cycle: unknown[] = [];
    cycle.push(cycle);
    const shared = { value: 'shared' };
    const source = { cycle, left: shared, right: shared };
    const result = serialize<typeof source>(source);
    expect(result).toEqual({ cycle: [null], left: { value: 'shared' }, right: { value: 'shared' } });
    expect(result.left).not.toBe(result.right);
    expect(result.left).not.toBe(shared);
    expect(source.cycle[0]).toBe(cycle);
  });

  test('过滤内部字段和 __proto__，其他特殊属性不改变结果原型', () => {
    const source = JSON.parse('{"__proto__":{"polluted":true},"_cache":1,"constructor":"value","safe":1}');
    const result = serialize<Record<string, unknown>>(source);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.prototype.hasOwnProperty.call(result, '__proto__')).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(result, '_cache')).toBe(false);
    expect(result.polluted).toBeUndefined();
    expect(result.constructor).toBe('value');
    expect(Object.prototype.hasOwnProperty.call(result, 'constructor')).toBe(true);
    expect(JSON.parse(JSON.stringify(result))).toEqual({ constructor: 'value', safe: 1 });
  });
});
