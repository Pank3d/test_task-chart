import { ref, computed } from 'vue';
import type { DateRange } from '~/src/shared';

export type PeriodPreset = 'all' | 'today' | 'week' | 'month' | 'custom';

export interface PeriodFilterState {
  preset: PeriodPreset;
  dateRange: DateRange;
}

export const usePeriodFilter = (onCustomClick?: () => void) => {
  const state = ref<PeriodFilterState>({
    preset: 'all',
    dateRange: {
      start: null,
      end: null,
    },
  });

  const getStartOfDay = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const getEndOfDay = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  };

  const setAll = () => {
    state.value = {
      preset: 'all',
      dateRange: {
        start: null,
        end: null,
      },
    };
  };

  const setToday = () => {
    const today = new Date();
    state.value = {
      preset: 'today',
      dateRange: {
        start: getStartOfDay(today),
        end: getEndOfDay(today),
      },
    };
  };

  const setWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    state.value = {
      preset: 'week',
      dateRange: {
        start: getStartOfDay(monday),
        end: getEndOfDay(today),
      },
    };
  };

  const setMonth = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    state.value = {
      preset: 'month',
      dateRange: {
        start: getStartOfDay(firstDay),
        end: getEndOfDay(today),
      },
    };
  };

  const setCustomRange = (dateRange: DateRange) => {
    state.value = {
      preset: 'custom',
      dateRange: {
        start: dateRange.start ? getStartOfDay(dateRange.start) : null,
        end: dateRange.end ? getEndOfDay(dateRange.end) : null,
      },
    };
  };

  const presetHandlers: Record<PeriodPreset, () => void> = {
    all: setAll,
    today: setToday,
    week: setWeek,
    month: setMonth,
    custom: () => {
      onCustomClick?.();
    },
  };

  const setPreset = (preset: PeriodPreset) => {
    presetHandlers[preset]?.();
  };

  const formattedRange = computed(() => {
    if (state.value.preset === 'all') {
      return 'Все данные';
    }

    const { start, end } = state.value.dateRange;
    if (!start) return '';

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    };

    if (!end || start.getTime() === end.getTime()) {
      return formatDate(start);
    }

    return `${formatDate(start)} - ${formatDate(end)}`;
  });

  setAll();

  return {
    state,
    setPreset,
    setCustomRange,
    formattedRange,
  };
};
