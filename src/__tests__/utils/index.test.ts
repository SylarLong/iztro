import { EARTHLY_BRANCHES } from '../../data';
import { fixIndex, getBrightness } from '../../utils';

describe('Utils', () => {
  test('fixIndex() should return correct index.', () => {
    expect(fixIndex(1)).toBe(1);
    expect(fixIndex(11)).toBe(11);
    expect(fixIndex(15, 20)).toBe(15);
    expect(fixIndex(-2)).toBe(10);
    expect(fixIndex(-3)).toBe(9);
    expect(fixIndex(-13)).toBe(11);
    expect(fixIndex(-2, 10)).toBe(8);
    expect(fixIndex(-3, 10)).toBe(7);
    expect(fixIndex(-15, 10)).toBe(5);
    expect(fixIndex(-27, 10)).toBe(3);
    expect(fixIndex(12)).toBe(0);
    expect(fixIndex(13)).toBe(1);
    expect(fixIndex(23)).toBe(11);
    expect(fixIndex(23, 10)).toBe(3);
    expect(fixIndex(37, 10)).toBe(7);
  });

  test('getPalaceNames() should return correct value', () => {
    expect(getBrightness('破军', EARTHLY_BRANCHES.indexOf('午'))).toBe('庙');
    expect(getBrightness('太阴', EARTHLY_BRANCHES.indexOf('酉'))).toBe('旺');
    expect(getBrightness('天机', EARTHLY_BRANCHES.indexOf('未'))).toBe('陷');
    expect(getBrightness('天府', EARTHLY_BRANCHES.indexOf('申'))).toBe('得');
    expect(getBrightness('廉贞', EARTHLY_BRANCHES.indexOf('子'))).toBe('平');
    expect(getBrightness('陀罗', EARTHLY_BRANCHES.indexOf('亥'))).toBe('陷');
    expect(getBrightness('擎羊', EARTHLY_BRANCHES.indexOf('亥'))).toBe('');
    expect(getBrightness('擎羊', EARTHLY_BRANCHES.indexOf('酉'))).toBe('陷');
  });
});
