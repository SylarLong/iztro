import { astro } from '../..';
import { PalaceName } from '../../i18n';

describe('astro/analyzer', () => {
  test('getPalace()', () => {
    const result = astro.astrolabeBySolarDate('2023-8-15', 0, '女', true);

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

    expect(result.palace('来因')).toHaveProperty('name', '财帛');
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
    const result = astro.astrolabeBySolarDate('2023-8-15', 0, '女', true);

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
    const result = astro.astrolabeBySolarDate('2023-8-15', 0, '女', true);

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
    const result = astro.astrolabeBySolarDate('2023-8-15', 0, '女', true);

    expect(result.palace(1)?.hasOneOf(['太阳', '天相'])).toBe(true);
    expect(result.palace(2)?.hasOneOf(['天机', '天梁'])).toBe(true);
    expect(result.palace(3)?.hasOneOf(['紫微', '天梁'])).toBe(true);
    expect(result.palace(7)?.hasOneOf(['天喜', '天姚', '天官', '台辅'])).toBe(false);
    expect(result.palace(9)?.hasOneOf(['太阳', '天梁', '天官', '天姚', '天厨'])).toBe(true);

    expect(result.palace('命宫')?.hasOneOf(['武曲', '天贵'])).toBe(true);
    expect(result.palace('父母')?.hasOneOf(['月德', '天巫', '巨门'])).toBe(true);
  });

  test('isSurroundedByStars()', () => {
    const result = astro.astrolabeBySolarDate('2023-8-15', 0, '女', true);

    expect(result.isSurrounded('命宫', ['武曲', '贪狼', '擎羊', '天相', '天魁', '天月', '地空', '地劫'])).toBe(true);
    expect(result.isSurrounded('命宫', ['武曲', '擎羊', '天相', '天魁', '天月', '地空', '地劫', '太阴'])).toBe(false);
    expect(
      result.isSurrounded(0, [
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
    ).toBe(true);
    expect(
      result.isSurrounded(2, [
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
        '截路',
      ]),
    ).toBe(true);
  });
});
