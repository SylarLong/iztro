import { version } from '../index';
import { version as packageVersion } from '../../package.json';

describe('版本信息', () => {
  test('通过公共入口导出 package.json 中的版本号', () => {
    expect(typeof version).toBe('string');
    expect(version).toBe(packageVersion);
  });
});
