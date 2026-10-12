import { astro } from '../../index';
import { getLanguage, setLanguage, withLanguage, t } from '../../i18n';
import { validateBoolean, validateDate, validateGender } from '../../utils/validation';

describe('日期边界与运行时参数校验', () => {
  afterEach(() => setLanguage('zh-CN'));

  test.each(['2000/8/16', '2000.8.16', '2000-08-16 23:59', '2000-8-16 23:59:59'])('接受支持的日期格式 %s', (date) =>
    expect(() => validateDate(date)).not.toThrow(),
  );

  test.each(['2000-8-16 23:60', '2000-8-16 23:59:60', '2000-8-16 24:00:00', '2000/8-16', '-2000-8-16'])(
    '拒绝无效时间或混合格式 %s',
    (date) => expect(() => validateDate(date)).toThrow(),
  );

  test('Date 对象同样校验年份范围和有效性', () => {
    const date = new Date(2026, 9, 12);
    expect(() => validateDate(date)).not.toThrow();
    date.setFullYear(10000);
    expect(() => validateDate(date)).toThrow('invalid date.');
    date.setFullYear(0);
    expect(() => validateDate(date)).toThrow('invalid date.');
    expect(() => validateDate(new Date(NaN))).toThrow('invalid date.');
  });

  test('历史历法切换前后的日期边界', () => {
    expect(() => validateDate('1500-2-29')).not.toThrow();
    expect(() => validateDate('1700-2-29')).toThrow('invalid solar date.');
    expect(() => validateDate('1582-10-4')).not.toThrow();
    expect(() => validateDate('1582-10-15')).not.toThrow();
    expect(() => validateDate('1582-10-31')).not.toThrow();
    expect(() => validateDate('1582-10-5')).toThrow('invalid solar date.');
    expect(() => validateDate('1582-10-14')).toThrow('invalid solar date.');
  });

  test('农历普通月和闰月分别按实际天数校验', () => {
    expect(() => validateDate('2023-2-30', 'lunar')).not.toThrow();
    expect(() => validateDate('2023-2-29', 'lunar', true)).not.toThrow();
    expect(() => validateDate('2023-2-30', 'lunar', true)).toThrow('invalid lunar date.');
    expect(() => validateDate('2023-2-31', 'lunar')).toThrow('invalid lunar date.');
    expect(() => validateDate('2023-3-1', 'lunar', true)).not.toThrow();
  });

  test.each([null, undefined, 123, {}])('拒绝非字符串的日期和性别 %s', (value) => {
    expect(() => validateDate(value as unknown as string)).toThrow('invalid date.');
    expect(() => validateGender(value as unknown as string)).toThrow('invalid gender.');
  });

  test.each(['true', 'false', 0, 1, null])('布尔选项不会隐式接受 %s', (value) => {
    expect(() => validateBoolean(value as unknown as boolean, 'fixLeap')).toThrow('invalid fixLeap');
    expect(() => astro.bySolar('2000-8-16', 3, '男', value as unknown as boolean)).toThrow('invalid fixLeap');
    expect(() => astro.byLunar('2000-7-17', 3, '男', value as unknown as boolean)).toThrow('invalid isLeapMonth');
  });

  test('拒绝不支持的全局和临时语言且恢复原语言', () => {
    setLanguage('en-US');
    expect(() => setLanguage('unknown')).toThrow('invalid language.');
    expect(() => withLanguage('unknown', () => t('yearly'))).toThrow('invalid language.');
    expect(getLanguage()).toBe('en-US');
    expect(t('yearly')).toBe('yearly');
  });
});
