import { EARTHLY_BRANCHES } from '../../data';
import { fixEarthlyBranchIndex, fixIndex, getBrightness } from '../../utils';

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

  test('getBrightness() should return correct value', () => {
    expect(getBrightness('破军', fixEarthlyBranchIndex('午'))).toBe('庙');
    expect(getBrightness('太阴', fixEarthlyBranchIndex('酉'))).toBe('旺');
    expect(getBrightness('天机', fixEarthlyBranchIndex('未'))).toBe('陷');
    expect(getBrightness('天府', fixEarthlyBranchIndex('申'))).toBe('得');
    expect(getBrightness('廉贞', fixEarthlyBranchIndex('子'))).toBe('平');
    expect(getBrightness('陀罗', fixEarthlyBranchIndex('亥'))).toBe('陷');
    expect(getBrightness('擎羊', fixEarthlyBranchIndex('亥'))).toBe('');
    expect(getBrightness('擎羊', fixEarthlyBranchIndex('酉'))).toBe('陷');
  });
});
