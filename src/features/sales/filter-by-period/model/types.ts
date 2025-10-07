import type { DateRange } from '~/src/shared';

export type PeriodPreset = 'all' | 'today' | 'week' | 'month' | 'custom' | 'pickedCustom';

export interface PeriodFilterState {
  preset: PeriodPreset | null;
  dateRange: DateRange;
}
