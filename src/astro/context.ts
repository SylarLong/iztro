import { getLanguage, withLanguage } from '../i18n';
import { getConfig, withConfig } from './config';

const functionalPrototypes = new WeakSet<object>();
/**
 * 注册需要绑定排盘上下文的功能类原型，不依赖压缩后的类名。
 *
 * @internal
 * @version 2.6.2
 * @param prototype 功能类的原型对象
 */
export const registerContextClass = (prototype: object): void => {
  functionalPrototypes.add(prototype);
};

/**
 * 将功能对象及其返回的功能对象绑定到生成时的配置和语言。
 *
 * @internal
 * @version 2.6.2
 * @param root 需要绑定上下文的功能对象
 * @returns 原功能对象
 */
export const bindContext = <T extends object>(root: T): T => {
  const config = getConfig();
  const language = getLanguage();
  const bound = new WeakSet<object>();
  const wrapped = new WeakSet<object>();
  const bind = (value: unknown): void => {
    if (!value || typeof value !== 'object' || bound.has(value)) return;
    if (Array.isArray(value)) {
      bound.add(value);
      value.forEach(bind);
      return;
    }
    let prototype = Object.getPrototypeOf(value);
    while (prototype && !functionalPrototypes.has(prototype)) prototype = Object.getPrototypeOf(prototype);
    if (!prototype) return;
    bound.add(value);
    const object = value as Record<string, unknown>;
    const keys = new Set([...Object.keys(object), ...Object.getOwnPropertyNames(prototype)]);
    keys.forEach((key) => {
      if (key === 'constructor' || key.startsWith('_') || key === 'plugins') return;
      const member = object[key];
      if (typeof member === 'function') {
        if (wrapped.has(member)) return;
        const method = (...args: unknown[]) =>
          withConfig(config, () =>
            withLanguage(language, () => {
              const result = member.apply(value, args);
              bind(result);
              // 插件和重排可能新增方法或星曜。
              bound.delete(value);
              bind(value);
              return result;
            }),
          );
        wrapped.add(method);
        object[key] = method;
      } else {
        bind(member);
      }
    });
  };
  bind(root);
  return root;
};
