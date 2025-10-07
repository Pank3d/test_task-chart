import { reactive, computed, ref } from 'vue';
import type { DateRange } from '~/src/shared';
import type { PeriodPreset, PeriodFilterState } from './types';
import { createPresets } from '../config/presets';

export const usePeriodFilter = (onCustomClick?: () => void) => {
  const state = reactive<PeriodFilterState>({
    preset: 'all',
    dateRange: {
      start: null,
      end: null,
    },
  });

  const hasPickedCustom = ref(false);

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
    state.preset = 'all';
    state.dateRange = {
      start: null,
      end: null,
    };
  };

  const setToday = () => {
    const today = new Date();
    state.preset = 'today';
    state.dateRange = {
      start: getStartOfDay(today),
      end: getEndOfDay(today),
    };
  };

  const setWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    state.preset = 'week';
    state.dateRange = {
      start: getStartOfDay(monday),
      end: getEndOfDay(today),
    };
  };

  const setMonth = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    state.preset = 'month';
    state.dateRange = {
      start: getStartOfDay(firstDay),
      end: getEndOfDay(today),
    };
  };

  const setCustomRange = (dateRange: DateRange) => {
    state.preset = 'pickedCustom';
    state.dateRange = {
      start: dateRange.start ? getStartOfDay(dateRange.start) : null,
      end: dateRange.end ? getEndOfDay(dateRange.end) : null,
    };
    hasPickedCustom.value = true;
  };

  const presetHandlers: Record<PeriodPreset, () => void> = {
    all: setAll,
    today: setToday,
    week: setWeek,
    month: setMonth,
    custom: () => {
      onCustomClick?.();
    },
    pickedCustom: () => {},
  };

  const setPreset = (preset: PeriodPreset) => {
    if (preset !== 'custom' && preset !== 'pickedCustom') {
      hasPickedCustom.value = false;
    }
    presetHandlers[preset]?.();
  };

  const formattedRange = computed(() => {
    if (state.preset === 'all') {
      return 'Все данные';
    }

    const { start, end } = state.dateRange;
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

  const presets = computed(() => {
    const basePresets = createPresets(onCustomClick || (() => {}));

    if (hasPickedCustom.value) {
      return [
        ...basePresets.filter((p) => p.value !== 'custom'),
        {
          title: formattedRange.value || 'Выбранный период',
          value: 'pickedCustom',
        },
        {
          title: 'Произвольный',
          value: 'custom',
          onClick: onCustomClick,
        },
      ];
    }

    return basePresets;
  });

  setAll();

  return {
    state,
    setPreset,
    setCustomRange,
    formattedRange,
    presets,
  };
};
