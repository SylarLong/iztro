import { astro } from '../..';
import { PalaceName } from '../../i18n';

describe('astro/analyzer', () => {
  test('getPalace()', () => {
    const result = astro.bySolar('2023-8-15', 0, '女', true);

    const palaceNames: PalaceName[] = [
      '疾厄',
      '财帛',
      '子女',
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
      '迁移',
    ];
    palaceNames.forEach((item, index) => {
      expect(result.palace(index)).toHaveProperty('name', item);
      expect(result.palace(item)).toHaveProperty('name', item);
    });

    expect(result.palace('来因')).toHaveProperty('name', '官禄');
    expect(result.palace('身宫')).toHaveProperty('name', '命宫');

    try {
      result.palace(-1);
    } catch (err) {
      expect(err as Error).toHaveProperty('message', 'invalid palace index.');
    }

    try {
      result.palace(12);
    } catch (err) {
      expect(err as Error).toHaveProperty('message', 'invalid palace index.');
    }
  });

  test('hasStars()', () => {
    const result = astro.bySolar('2023-8-15', 0, '女', true);

    expect(result.palace(1)?.has(['太阳'])).toBe(false);
    expect(result.palace(1)?.has(['天相'])).toBe(true);
    expect(result.palace(2)?.has(['天机', '天梁'])).toBe(true);
    expect(result.palace(3)?.has(['紫微', '天梁'])).toBe(false);
    expect(result.palace(4)?.has(['天喜', '天姚', '天官', '台辅'])).toBe(true);
    expect(result.palace(7)?.has(['廉贞', '破军', '左辅', '火星'])).toBe(true);
    expect(result.palace(9)?.has(['天府', '陀罗', '地空', '地劫', '天厨'])).toBe(true);

    expect(result.palace('命宫')?.has(['武曲'])).toBe(false);
    expect(result.palace('迁移')?.has(['武曲', '贪狼', '擎羊', '三台', '八座'])).toBe(true);
    expect(result.palace('财帛')?.has(['天相'])).toBe(true);
    expect(result.palace('子女')?.has(['天机', '天梁', '文曲', '天空', '阴煞'])).toBe(true);
  });

  test('notHaveStars()', () => {
    const result = astro.bySolar('2023-8-15', 0, '女', true);

    expect(result.palace(1)?.notHave(['太阳'])).toBe(true);
    expect(result.palace(1)?.notHave(['天相'])).toBe(false);
    expect(result.palace(2)?.notHave(['天机', '天梁'])).toBe(false);
    expect(result.palace(3)?.notHave(['紫微', '天梁'])).toBe(false);
    expect(result.palace(4)?.notHave(['天喜', '天姚', '天官', '台辅'])).toBe(false);
    expect(result.palace(7)?.notHave(['廉贞', '破军', '左辅', '火星'])).toBe(false);
    expect(result.palace(9)?.notHave(['天府', '陀罗', '地空', '地劫', '天厨'])).toBe(false);

    expect(result.palace('命宫')?.notHave(['武曲'])).toBe(true);
    expect(result.palace('迁移')?.notHave(['武曲', '贪狼', '擎羊', '三台', '八座'])).toBe(false);
    expect(result.palace('财帛')?.notHave(['天相'])).toBe(false);
    expect(result.palace('子女')?.notHave(['天机', '天梁', '文曲', '天空', '阴煞'])).toBe(false);
  });

  test('hasOneOfStars()', () => {
    const result = astro.bySolar('2023-8-15', 0, '女', true);

    expect(result.palace(1)?.hasOneOf(['太阳', '天相'])).toBe(true);
    expect(result.palace(2)?.hasOneOf(['天机', '天梁'])).toBe(true);
    expect(result.palace(3)?.hasOneOf(['紫微', '天梁'])).toBe(true);
    expect(result.palace(7)?.hasOneOf(['天喜', '天姚', '天官', '台辅'])).toBe(false);
    expect(result.palace(9)?.hasOneOf(['太阳', '天梁', '天官', '天姚', '天厨'])).toBe(true);

    expect(result.palace('命宫')?.hasOneOf(['武曲', '天贵'])).toBe(true);
    expect(result.palace('父母')?.hasOneOf(['月德', '天巫', '巨门'])).toBe(true);
  });

  test('have() in surrounded palaces', () => {
    const result = astro.bySolar('2023-8-15', 0, '女', true);

    expect(
      result.surroundedPalaces('命宫').have(['武曲', '贪狼', '擎羊', '天相', '天魁', '天月', '地空', '地劫']),
    ).toBe(true);
    expect(result.isSurrounded('命宫', ['武曲', '贪狼', '擎羊', '天相', '天魁', '天月', '地空', '地劫'])).toBe(true);
    expect(
      result.surroundedPalaces('命宫').have(['武曲', '擎羊', '天相', '天魁', '天月', '地空', '地劫', '太阴']),
    ).toBe(false);
    expect(
      result
        .surroundedPalaces('命宫')
        .have([
          '太阳',
          '巨门',
          '月德',
          '天巫',
          '天喜',
          '天姚',
          '天官',
          '台辅',
          '文昌',
          '铃星',
          '天才',
          '天寿',
          '天刑',
          '天使',
          '封诰',
        ]),
    ).toBe(false);
    expect(
      result
        .surroundedPalaces('命宫')
        .have([
          '天机',
          '天梁',
          '文曲',
          '天空',
          '阴煞',
          '旬空',
          '文昌',
          '铃星',
          '天才',
          '天寿',
          '月德',
          '天巫',
          '天同',
          '太阴',
          '禄存',
          '解神',
          '红鸾',
          '咸池',
          '天伤',
          '天德',
          '截空',
        ]),
    ).toBe(false);
  });

  test('getSurroundedPalaces() by palace index', () => {
    const result = astro.bySolar('2023-8-15', 0, '女', true);

    const { target, opposite, wealth, career } = result.surroundedPalaces(0);

    expect(target).toHaveProperty('name', '疾厄');
    expect(opposite).toHaveProperty('name', '父母');
    expect(wealth).toHaveProperty('name', '田宅');
    expect(career).toHaveProperty('name', '兄弟');
  });

  test('getSurroundedPalaces() by palace name', () => {
    const result = astro.bySolar('2023-8-15', 0, '女', true);

    const { target, opposite, wealth, career } = result.surroundedPalaces('命宫');

    expect(target).toHaveProperty('name', '命宫');
    expect(opposite).toHaveProperty('name', '迁移');
    expect(wealth).toHaveProperty('name', '财帛');
    expect(career).toHaveProperty('name', '官禄');
  });

  test('haveOneOf() in surrounded palaces', () => {
    const result = astro.bySolar('2023-8-16', 2, '女', true);

    expect(result.surroundedPalaces('命宫').haveOneOf(['太阳', '文曲'])).toBe(true);
    expect(result.isSurroundedOneOf('命宫', ['太阳', '文曲'])).toBe(true);
    expect(result.surroundedPalaces('命宫').haveOneOf(['天喜', '天钺'])).toBe(true);
    expect(result.surroundedPalaces('命宫').haveOneOf(['天梁', '禄存'])).toBe(true);
    expect(result.surroundedPalaces('命宫').haveOneOf(['左辅', '右弼'])).toBe(true);
    expect(result.surroundedPalaces('命宫').haveOneOf(['地空', '地劫'])).toBe(false);

    expect(result.surroundedPalaces(3).haveOneOf(['武曲', '天马'])).toBe(true);
    expect(result.surroundedPalaces(3).haveOneOf(['火星', '贪狼'])).toBe(true);
    expect(result.surroundedPalaces(3).haveOneOf(['天空', '天官'])).toBe(false);
  });

  test('notHave() in surrounded palaces', () => {
    const result = astro.bySolar('2023-8-16', 2, '女', true);

    expect(result.surroundedPalaces('命宫').notHave(['太阳', '文曲'])).toBe(false);
    expect(result.notSurrounded('命宫', ['太阳', '文曲'])).toBe(false);
    expect(result.surroundedPalaces('命宫').notHave(['天喜', '天钺'])).toBe(false);
    expect(result.surroundedPalaces('命宫').notHave(['天梁', '禄存'])).toBe(false);
    expect(result.surroundedPalaces('命宫').notHave(['左辅', '右弼'])).toBe(false);
    expect(result.surroundedPalaces('命宫').notHave(['地空', '地劫'])).toBe(true);

    expect(result.surroundedPalaces(3).notHave(['武曲', '天马'])).toBe(false);
    expect(result.surroundedPalaces(3).notHave(['火星', '贪狼'])).toBe(false);
    expect(result.surroundedPalaces(3).notHave(['天魁', '天官'])).toBe(true);
  });

  test('hasMutagenInPlace()', () => {
    const result = astro.bySolar('2013-8-21', 4, '女', true);

    expect(result.palace('迁移')?.hasMutagen('禄')).toBe(true);
    expect(result.palace('兄弟')?.hasMutagen('权')).toBe(true);
    expect(result.palace('子女')?.hasMutagen('科')).toBe(true);
    expect(result.palace('夫妻')?.hasMutagen('忌')).toBe(true);
    expect(result.palace('命宫')?.hasMutagen('忌')).toBe(false);
  });

  test('notHaveMutagenInPlace()', () => {
    const result = astro.bySolar('2013-8-21', 4, '女', true);

    expect(result.palace('迁移')?.notHaveMutagen('禄')).toBe(false);
    expect(result.palace('兄弟')?.notHaveMutagen('权')).toBe(false);
    expect(result.palace('子女')?.notHaveMutagen('科')).toBe(false);
    expect(result.palace('夫妻')?.notHaveMutagen('忌')).toBe(false);
    expect(result.palace('命宫')?.notHaveMutagen('忌')).toBe(true);
  });

  test('hasMutagen() In Opposite Palace', () => {
    const result = astro.bySolar('2013-8-21', 4, '女', true);

    expect(result.surroundedPalaces('命宫').opposite.hasMutagen('禄')).toBe(true);
    expect(result.surroundedPalaces('官禄').opposite.hasMutagen('忌')).toBe(true);
    expect(result.surroundedPalaces('仆役').opposite.hasMutagen('权')).toBe(true);
    expect(result.surroundedPalaces('田宅').opposite.hasMutagen('科')).toBe(true);
    expect(result.surroundedPalaces('福德').opposite.hasMutagen('科')).toBe(false);
  });

  test('haveMutagen() In Surrounded Palace', () => {
    const result = astro.bySolar('2013-8-21', 4, '女', true);

    expect(result.surroundedPalaces('福德').haveMutagen('禄')).toBe(true);
    expect(result.surroundedPalaces('福德').haveMutagen('忌')).toBe(true);
    expect(result.surroundedPalaces('迁移').haveMutagen('禄')).toBe(true);
    expect(result.surroundedPalaces('迁移').haveMutagen('忌')).toBe(true);
    expect(result.surroundedPalaces('疾厄').haveMutagen('权')).toBe(true);
    expect(result.surroundedPalaces('财帛').haveMutagen('科')).toBe(false);
    expect(result.surroundedPalaces('身宫').haveMutagen('忌')).toBe(false);
  });

  test('withMutagen() In FunctionalStar', () => {
    const result = astro.bySolar('2013-8-21', 4, '女', true);

    expect(result.star('紫微').withMutagen('禄')).toBe(false);
    expect(result.star('破军').withMutagen('禄')).toBe(true);
    expect(result.star('巨门').withMutagen('权')).toBe(true);
    expect(result.star('太阴').withMutagen('科')).toBe(true);
    expect(result.star('贪狼').withMutagen('忌')).toBe(true);
    expect(result.star('贪狼').withMutagen(['忌', '权'])).toBe(true);
    expect(result.star('贪狼').withMutagen(['科', '权'])).toBe(false);
  });

  test('withBrightness() In FunctionalStar', () => {
    const result = astro.bySolar('2013-8-21', 4, '女', true);

    expect(result.star('紫微').withBrightness('庙')).toBe(false);
    expect(result.star('紫微').withBrightness(['庙', '得'])).toBe(true);
    expect(result.star('巨门').withBrightness('庙')).toBe(true);
    expect(result.star('太阴').withBrightness(['不', '陷'])).toBe(false);
    expect(result.star('贪狼').withBrightness('平')).toBe(true);
  });

  test('oppositePalace() In FunctionalStar', () => {
    const result = astro.bySolar('2013-8-21', 4, '女', true);

    expect(result.star('紫微').oppositePalace()).toHaveProperty('name', '迁移');
    expect(result.star('天同').oppositePalace()).toHaveProperty('name', '父母');
    expect(result.star('巨门').oppositePalace()).toHaveProperty('name', '仆役');
    expect(result.star('太阴').oppositePalace()).toHaveProperty('name', '田宅');
    expect(result.star('贪狼').oppositePalace()).toHaveProperty('name', '官禄');
    expect(result.star('廉贞').oppositePalace()?.hasMutagen('忌')).toBe(true);
    expect(result.star('天相').oppositePalace()?.hasMutagen('禄')).toBe(true);
    expect(result.star('火星').oppositePalace()?.hasMutagen('科')).toBe(true);
    expect(result.star('天才').oppositePalace()?.hasMutagen('权')).toBe(true);
    expect(result.star('文昌').oppositePalace()?.hasMutagen('禄')).toBe(false);
  });

  test('surroundedPalaces()  In FunctionalStar', () => {
    const result = astro.bySolar('2013-8-21', 4, '女', true);

    expect(result.star('咸池').surroundedPalaces()?.target).toHaveProperty('name', '福德');
    expect(result.star('咸池').surroundedPalaces()?.target).toHaveProperty('earthlyBranch', '午');
    expect(result.star('咸池').surroundedPalaces()?.haveMutagen('禄')).toBe(true);
    expect(result.star('左辅').surroundedPalaces()?.haveMutagen('忌')).toBe(true);
    expect(result.star('紫微').surroundedPalaces()?.haveMutagen('忌')).toBe(false);
  });
});
