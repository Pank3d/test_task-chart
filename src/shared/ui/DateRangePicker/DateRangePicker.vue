<script setup lang="ts">
import { computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { DateRange } from '~/src/shared/model/DateRangePicker/useDateRangePicker';

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

const dateRange = computed({
  get: () => {
    if (!props.modelValue?.start) return null;
    if (!props.modelValue?.end) return [props.modelValue.start];
    return [props.modelValue.start, props.modelValue.end];
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
</script>

<template>
  <div>
    <label v-if="label" class="text-caption text-grey mb-1 d-block">{{ label }}</label>
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
  z-index: 9999 !important;
}
</style>

<style scoped>
:deep(.dp__input) {
  border: 1px solid rgba(0, 0, 0, 0.38);
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
}

:deep(.dp__input:hover) {
  border-color: rgba(0, 0, 0, 0.87);
}

:deep(.dp__input:focus) {
  border-color: rgb(var(--v-theme-primary));
  outline: none;
}
</style>
