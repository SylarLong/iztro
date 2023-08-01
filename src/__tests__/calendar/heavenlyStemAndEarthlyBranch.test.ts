import { getHeavenlyStemAndEarthlyBranchByLunarDate, getHeavenlyStemAndEarthlyBranchBySolarDate } from '../../calendar';

describe('calendar/heavenlyStemAndEarthlyBranch', () => {
  test('getHeavenlyStemAndEarthlyBranchByLunarDate()', () => {
    const data = [
      {
        date: '2023-6-13',
        timeIndex: 1,
        isLeap: false,
        result: '癸卯 己未 己丑 乙丑',
      },
      {
        date: '2023-6-13',
        timeIndex: 12,
        isLeap: false,
        result: '癸卯 己未 庚寅 丙子',
      },
      {
        date: '2023-2-11',
        timeIndex: 1,
        isLeap: true,
        result: '癸卯 乙卯 己丑 乙丑',
      },
      {
        date: '2023-2-11',
        timeIndex: 1,
        isLeap: false,
        result: '癸卯 甲寅 己未 乙丑',
      },
      {
        date: '2023-1-1',
        timeIndex: 1,
        isLeap: false,
        result: '癸卯 癸丑 庚辰 丁丑',
      },
      {
        date: '2022-12-30',
        timeIndex: 1,
        isLeap: false,
        result: '壬寅 癸丑 己卯 乙丑',
      },
      {
        date: '2023-1-29',
        timeIndex: 12,
        isLeap: false,
        result: '癸卯 甲寅 己酉 甲子',
      },
    ];

    data.forEach(({ date, timeIndex, isLeap, result }) => {
      expect(getHeavenlyStemAndEarthlyBranchByLunarDate(date, timeIndex, isLeap).toString()).toBe(result);
    });
  });

  test('getHeavenlyStemAndEarthlyBranchBySolarDate()', () => {
    const data = [
      {
        date: '2023-1-21',
        timeIndex: 1,
        result: '壬寅 癸丑 己卯 乙丑',
      },
      {
        date: '2023-1-21',
        timeIndex: 12,
        result: '壬寅 癸丑 庚辰 丙子',
      },
      {
        date: '2023-03-09',
        timeIndex: 5,
        result: '癸卯 乙卯 丙寅 癸巳',
      },
      {
        date: '2023-4-8',
        timeIndex: 5,
        result: '癸卯 丙辰 丙申 癸巳',
      },
      {
        date: '2023-1-22',
        timeIndex: 5,
        result: '癸卯 癸丑 庚辰 辛巳',
      },
      {
        date: '2023-2-19',
        timeIndex: 12,
        isLeap: false,
        result: '癸卯 甲寅 己酉 甲子',
      },
    ];

    data.forEach(({ date, timeIndex, result }) => {
      expect(getHeavenlyStemAndEarthlyBranchBySolarDate(date, timeIndex).toString()).toBe(result);
    });
  });
});
