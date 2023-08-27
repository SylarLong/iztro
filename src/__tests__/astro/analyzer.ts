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
});
