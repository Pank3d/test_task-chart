import { ref, computed } from 'vue';
import type { DateRange, DateRangeMode } from './types';

export const useDateRangePicker = (initialValue?: DateRange, mode: DateRangeMode = 'range') => {
  const internalDates = ref<Date[]>([]);
  const menu = ref(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const displayValue = computed(() => {
    if (!initialValue?.start) return '';

    if (mode === 'single') {
      return formatDate(initialValue.start);
    }

    if (initialValue.end) {
      return `${formatDate(initialValue.start)} - ${formatDate(initialValue.end)}`;
    }

    return formatDate(initialValue.start);
  });

  const handleDateChange = (dates: Date | Date[], emit: (value: DateRange) => void) => {
    const dateArray = Array.isArray(dates) ? dates : [dates];
    internalDates.value = dateArray;

    if (mode === 'single') {
      emit({
        start: dateArray[0] || null,
        end: null,
      });
      menu.value = false;
    } else {
      if (dateArray.length === 2) {
        const [start, end] = dateArray.sort((a, b) => a.getTime() - b.getTime());
        emit({ start: start || null, end: end || null });
        menu.value = false;
      } else if (dateArray.length === 1) {
        emit({
          start: dateArray[0] || null,
          end: null,
        });
      }
    }
  };

  return {
    internalDates,
    menu,
    displayValue,
    handleDateChange,
    formatDate,
  };
};

export const useDateRange = (
  modelValue: DateRange,
  emit: (event: 'update:modelValue', value: DateRange) => void
) => {
  const dateRange = computed({
    get: () => {
      if (!modelValue?.start) return null;
      if (!modelValue?.end) return [modelValue.start];
      return [modelValue.start, modelValue.end];
    },
    set: (value: Date[] | null) => {
      if (!value || value.length === 0) {
        emit('update:modelValue', { start: null, end: null });
        return;
      }

      if (value.length === 1) {
        emit('update:modelValue', { start: value[0] ?? null, end: null });
        return;
      }

      if (value.length === 2) {
        emit('update:modelValue', { start: value[0] ?? null, end: value[1] ?? null });
      }
    },
  });

  return {
    dateRange,
  };
};
