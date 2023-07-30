import { getSoulAndBody } from '../../astro';

describe('astro/palace', () => {
  test('getSoulAndBody()', () => {
    const data = [
      {
        date: '2023-1-22',
        timeIndex: 5,
        result: {
          soulIndex: 7,
          bodyIndex: 5,
          heavenlyStemOfSoul: '辛',
          earthlyBranchOfSoul: '酉',
        },
      },
      {
        date: '2023-1-22',
        timeIndex: 6,
        result: {
          soulIndex: 6,
          bodyIndex: 6,
          heavenlyStemOfSoul: '庚',
          earthlyBranchOfSoul: '申',
        },
      },
    ];

    data.forEach((item) => {
      expect(getSoulAndBody(item.date, item.timeIndex)).toStrictEqual(item.result);
    });
  });
});
