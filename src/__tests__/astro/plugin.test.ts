import { astro } from '../..';
import FunctionalAstrolabe from '../../astro/FunctionalAstrolabe';

export interface IAstrolabe extends FunctionalAstrolabe {
  myNewFunc: () => string;
}

// 创建一个插件函数
export function myTestPlugin(this: IAstrolabe): void {
  // 实现插件应用逻辑
  this.myNewFunc = () => {
    return this.fiveElementsClass;
  };
}

astro.loadPlugins([myTestPlugin]);

describe('plugin test', () => {
  test('plugin', () => {
    const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

    expect(astrolabe.myNewFunc()).toEqual('火六局');
  });
});
