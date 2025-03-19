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

astro.config({
  mutagens: { 庚: ['太阳', '武曲', '天同', '天相'] },
  brightness: {
    贪狼: ['旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺', '旺'],
  },
});

describe('plugin test', () => {
  test('plugin::bySolar', () => {
    const astrolabe = astro.bySolar<IAstrolabe>('2023-10-18', 4, 'female');

    expect(astrolabe.myNewFunc()).toEqual('火六局');
    expect(astrolabe.majorStar()).toEqual('七杀');
  });

  test('plugin::byLunar', () => {
    const astrolabe = astro.byLunar<IAstrolabe>('2023-10-18', 4, 'female');

    expect(astrolabe.myNewFunc()).toEqual('火六局');
    expect(astrolabe.majorStar()).toEqual('太阳,太阴');
  });

  test('plugin::withOptions', () => {
    const astrolabe = astro.withOptions<IAstrolabe>({
      dateStr: '2023-10-18',
      timeIndex: 4,
      gender: 'female',
      type: 'lunar',
    });

    expect(astrolabe.myNewFunc()).toEqual('火六局');
    expect(astrolabe.majorStar()).toEqual('太阳,太阴');
  });

  test('changed configuration', () => {
    const astrolabe = astro.bySolar<IAstrolabe>('2010-10-18', 4, 'female');

    expect(astrolabe.palace('命宫')?.hasMutagen('忌')).toBeFalsy();
    expect(astrolabe.palace('夫妻')?.hasMutagen('忌')).toBeTruthy();
    expect(astrolabe.star('贪狼').withBrightness('旺')).toBeTruthy();
  });

  test('not changed configuration', () => {
    const astrolabe = astro.bySolar<IAstrolabe>('2011-10-18', 4, 'female');

    expect(astrolabe.palace('命宫')?.hasMutagen('权')).toBeTruthy();
    expect(astrolabe.palace('命宫')?.hasMutagen('忌')).toBeTruthy();
    expect(astrolabe.palace('福德')?.hasMutagen('科')).toBeTruthy();
    expect(astrolabe.palace('田宅')?.hasMutagen('禄')).toBeFalsy();
    expect(astrolabe.palace('财帛')?.fliesTo('夫妻', '科')).toBeTruthy();
    expect(astrolabe.palace('财帛')?.fliesTo('仆役', '忌')).toBeTruthy();
    expect(astrolabe.star('紫微').withBrightness('旺')).toBeTruthy();
  });
});
