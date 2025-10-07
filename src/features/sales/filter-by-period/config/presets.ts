import type { SelectOption } from '~/src/shared/ui';

export const createPresets = (onCustomClick: () => void): SelectOption[] => [
  { value: 'all', title: 'Все' },
  { value: 'today', title: 'Сегодня' },
  { value: 'week', title: 'Неделя' },
  { value: 'month', title: 'Месяц' },
  { value: 'custom', title: 'Произвольный', onClick: onCustomClick },
];
