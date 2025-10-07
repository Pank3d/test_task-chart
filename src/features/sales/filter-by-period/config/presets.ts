import type { PeriodPreset } from '../model/types';

export const presets: Array<{ value: PeriodPreset; title: string }> = [
  { value: 'all', title: 'Все' },
  { value: 'today', title: 'Сегодня' },
  { value: 'week', title: 'Неделя' },
  { value: 'month', title: 'Месяц' },
  { value: 'custom', title: 'Произвольный' },
];
