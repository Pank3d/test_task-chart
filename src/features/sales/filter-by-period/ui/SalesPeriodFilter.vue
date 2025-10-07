<script setup lang="ts">
import { ref } from 'vue';
import { DateRangePicker, BaseDialog, BaseSelect } from '~/src/shared/ui';
import { usePeriodFilter } from '../model/usePeriodFilter';
import type { PeriodPreset } from '../model/types';

const emit = defineEmits<{
  'update:period': [start: Date | null, end: Date | null];
}>();

const isDialogOpen = ref(false);

const openCustomDialog = () => {
  isDialogOpen.value = true;
};

const { state, setPreset, setCustomRange, formattedRange, presets } =
  usePeriodFilter(openCustomDialog);

const handlePresetChange = (value: string) => {
  if (value === 'pickedCustom') {
    return;
  }

  const preset = value as PeriodPreset;

  if (preset === 'custom') {
    setPreset(preset);
    return;
  }

  setPreset(preset);
  emit('update:period', state.dateRange.start, state.dateRange.end);
};

const handleCustomRangeChange = (dateRange: { start: Date | null; end: Date | null }) => {
  setCustomRange(dateRange);
  emit('update:period', state.dateRange.start, state.dateRange.end);
  isDialogOpen.value = false;
};
</script>

<template>
  <ClientOnly>
    <div class="period-filter">
      <div class="d-flex flex-column ga-4">
        <BaseSelect
          :model-value="state.preset"
          :items="presets"
          @update:model-value="handlePresetChange"
        />

        <div v-if="formattedRange" class="period-filter__range-text">
          Выбран период: {{ formattedRange }}
        </div>
      </div>
    </div>

    <BaseDialog v-model="isDialogOpen" title="Выберите период" max-width="500" max-heigth="600">
      <DateRangePicker
        :model-value="state.dateRange"
        mode="range"
        label="Выберите период"
        @update:model-value="handleCustomRangeChange"
      />
    </BaseDialog>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '~/src/shared/ui/styles/vars' as *;

.period-filter {
  &__range-text {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    transition: color $transition-duration $transition-timing;
    text-align: center;
  }
}
</style>
