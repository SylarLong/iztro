import { kot, setLanguage, StarKey, t, withLanguage } from '../../i18n';

describe('i18n', () => {
  afterEach(() => setLanguage('zh-CN'));

  test.each([
    ['영성', 'lingxingMin'],
    ['절공', 'jiekong'],
    ['세파', 'suipo'],
    ['천덕', 'tiande'],
    ['禄存', 'lucunMin'],
    ['限の鉞', 'yunyue'],
    ['年の鸞', 'liuluan'],
    ['Mộc Dục', 'muyu'],
    ['Thiên Việt(M)', 'yueyue'],
    ['Thiên Việt(d)', 'riyue'],
    ['Thiên Việt(H)', 'shiyue'],
  ])('corrected star name %s resolves unambiguously to %s', (name, key) => {
    expect(kot<StarKey>(name)).toBe(key);
  });

  test('Vietnamese moving Tian Yue stars remain distinct from Tian Yue (moon)', () => {
    withLanguage('vi-VN', () => {
      expect(kot(t('tianyue'))).toBe('tianyue');
      for (const key of ['yueyue', 'riyue', 'shiyue']) {
        expect(kot(t(key))).toBe(key);
        expect(t(key)).not.toContain(t('tianyue'));
      }
    });
  });

  test.each([
    ['천상(天相)', 'tianxiangMaj'],
    ['천상(天傷)', 'tianshang'],
    ['천월(天鉞)', 'tianyueMin'],
    ['천월(天月)', 'tianyue'],
    ['겁살(劫殺)', 'jieshaAdj'],
    ['겁살(劫煞)', 'jiesha'],
    ['비렴(蜚廉)', 'feilian'],
    ['비렴(飛廉)', 'faylian'],
    ['관부(官府)', 'guanfu'],
    ['관부(官符)', 'gwanfu'],
    ['Kiếp Sát(劫殺)', 'jieshaAdj'],
    ['Kiếp Sát(劫煞)', 'jiesha'],
    ['Phi Liêm(蜚廉)', 'feilian'],
    ['Phi Liêm(飛廉)', 'faylian'],
  ])('%s resolves to %s', (alias, key) => {
    expect(kot<StarKey>(alias)).toBe(key);
  });

  test('aliases do not change translated display names', () => {
    setLanguage('ko-KR');
    expect(t('tianxiangMaj')).toBe('천상');

    setLanguage('vi-VN');
    expect(t('jieshaAdj')).toBe('Kiếp Sát');
  });

  test.each([
    ['warrior', 'wuquMaj'],
    ['general', 'jiangjun'],
    ['breaker', 'suipo'],
    ['wastrel', 'dahao'],
  ])('English star name %s resolves to %s', (name, key) => {
    expect(kot<StarKey>(name)).toBe(key);
  });
});
