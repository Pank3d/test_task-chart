<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import type { DateRange } from '~/src/shared/model/DateRangePicker/useDateRangePicker';
import { useDateRange } from '~/src/shared/model/DateRangePicker';

interface Props {
  modelValue?: DateRange;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Выберите период',
  placeholder: 'Выберите даты',
});

const emit = defineEmits<{
  'update:modelValue': [value: DateRange];
}>();

const { dateRange } = useDateRange(props.modelValue || { start: null, end: null }, emit);
</script>

<template>
  <div class="date-range-picker">
    <label v-if="label" class="date-range-picker__label">{{ label }}</label>
    <VueDatePicker
      v-model="dateRange"
      range
      :placeholder="placeholder"
      :disabled="disabled"
      locale="ru"
      :format="'dd.MM.yyyy'"
      auto-apply
      teleport="body"
    />
  </div>
</template>

<style>
.dp__menu {
  z-index: 9999;
}
</style>

<style scoped lang="scss">
@use '~/src/shared/ui/styles/vars' as *;

.date-range-picker {
  &__label {
    display: block;
    margin-bottom: 4px;
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    transition: color $transition-duration $transition-timing;
  }
}

:deep(.dp__input_wrap) {
  .dp__input {
    background-color: var(--color-background-card);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    border-radius: $border-radius-sm;
    padding: 12px;
    font-size: 16px;
    transition:
      background-color $transition-duration $transition-timing,
      color $transition-duration $transition-timing,
      border-color $transition-duration $transition-timing;

    &:hover {
      border-color: var(--color-primary);
    }

    &:focus {
      border-color: var(--color-primary);
      outline: none;
    }

    &::placeholder {
      color: var(--color-text-disabled);
    }
  }
}

:deep(.dp__menu) {
  background-color: var(--color-background-card);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
}

:deep(.dp__calendar_header),
:deep(.dp__calendar_header_item),
:deep(.dp__cell_inner),
:deep(.dp__month_year_select),
:deep(.dp__calendar_item) {
  color: var(--color-text-primary);
}

:deep(.dp__calendar_header_separator) {
  background-color: var(--color-divider);
}

:deep(.dp__cell_inner:hover) {
  background-color: var(--color-background-secondary);
}

:deep(.dp__active_date),
:deep(.dp__range_start),
:deep(.dp__range_end) {
  background-color: var(--color-primary);
  color: var(--color-white);
}

:deep(.dp__range_between) {
  background-color: var(--color-background-secondary);
}

:deep(.dp__today) {
  border: 1px solid var(--color-primary);
}

:deep(.dp__button) {
  color: var(--color-primary);

  &:hover {
    background-color: var(--color-background-secondary);
  }
}

:deep(.dp__disabled) {
  color: var(--color-text-disabled);
}
</style>
