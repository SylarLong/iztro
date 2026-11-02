import { normalizeDateStr } from 'lunar-lite';
import { Solar } from 'lunar-typescript';
import { getConfig } from '../astro/config';
import { validateDate } from './validation';

/**
 * 在历法转换和安星之前统一处理晚子时；返回的早子时索引避免下游重复进日。
 * 使用底层历法进日，保持跨月、跨年及历史历法切换的规则一致。
 * @internal
 */
export const normalizeDayBoundary = (date: string | Date, timeIndex: number) => {
  const solarDate = typeof date === 'string' ? date : normalizeDateStr(date).slice(0, 3).join('-');
  if (timeIndex !== 12) return { solarDate, timeIndex };
  if (getConfig().dayDivide === 'current') return { solarDate, timeIndex: 0 };

  const [year, month, day] = normalizeDateStr(date);
  const nextDate = Solar.fromYmd(year, month, day).next(1).toYmd();
  validateDate(nextDate);
  return { solarDate: nextDate, timeIndex: 0 };
};
