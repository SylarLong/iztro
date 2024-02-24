import { astro } from '../..';
import FunctionalAstrolabe from '../../astro/FunctionalAstrolabe';

export interface IAstrolabe extends FunctionalAstrolabe {
  myNewFunc: () => string;
  majorStar: () => string;
}

// 创建一个插件函数
export function myTestPlugin(this: IAstrolabe): void {
  // 实现插件应用逻辑
  this.myNewFunc = () => {
    return this.fiveElementsClass;
  };
}

// 创建二个插件函数
export function myTestPlugin2(this: IAstrolabe): void {
  // 实现插件应用逻辑
  this.majorStar = () => {
    let stars = this.palace('命宫')
      ?.majorStars.filter((item) => item.type === 'major' && !['禄存', '天马'].includes(item.name))
      .map((item) => item.name)
      .join(',');

    if (!stars) {
      stars = this.palace('迁移')
        ?.majorStars.filter((item) => item.type === 'major' && !['禄存', '天马'].includes(item.name))
        .map((item) => item.name)
        .join(',');
    }

    return stars ?? '';
  };
}

astro.loadPlugins([myTestPlugin]);
astro.loadPlugin(myTestPlugin2);

describe('plugin test', () => {
  test('plugin', () => {
    const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

    expect(astrolabe.myNewFunc()).toEqual('火六局');
    expect(astrolabe.majorStar()).toEqual('七杀');
  });
});
