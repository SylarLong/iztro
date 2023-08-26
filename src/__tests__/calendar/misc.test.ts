import { getTerm, lunarDayToStr, lunarMonthToStr } from '../../calendar';

describe('calendar/misc', () => {
  test('getTerm()', () => {
    try {
      getTerm(1988, 0);
    } catch (err) {
      expect((err as Error).message).toBe('termNo should be between 1 and 24.');
    }

    try {
      getTerm(2101, 0);
    } catch (err) {
      expect((err as Error).message).toBe('Year should be greater or equal then 1900.');
    }

    try {
      getTerm(2023, 0);
    } catch (err) {
      expect((err as Error).message).toBe('termNo should be between 1 and 24.');
    }

    try {
      getTerm(2023, 25);
    } catch (err) {
      expect((err as Error).message).toBe('termNo should be between 1 and 24.');
    }
  });

  test('lunarMonthToStr()', () => {
    try {
      lunarMonthToStr(0);
    } catch (err) {
      expect((err as Error).message).toBe('lunarMonth should be between 1 and 12.');
    }
  });

  test('lunarDayToStr()', () => {
    const data = [
      { key: 10, value: '初十' },
      { key: 20, value: '二十' },
      { key: 30, value: '三十' },
      { key: 14, value: '十四' },
      { key: 25, value: '廿五' },
      { key: 31, value: '卅一' },
    ];

    data.forEach((item) => {
      expect(lunarDayToStr(item.key)).toBe(item.value);
    });
  });
});
