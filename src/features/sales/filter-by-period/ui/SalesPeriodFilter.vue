<script setup lang="ts">
import { ref } from 'vue';
import { VCard, VCardText, VBtnToggle, VBtn } from 'vuetify/components';
import { DateRangePicker, BaseDialog } from '~/src/shared/ui';
import { usePeriodFilter, type PeriodPreset } from '../model/usePeriodFilter';

const emit = defineEmits<{
  'update:period': [start: Date | null, end: Date | null];
}>();

const isDialogOpen = ref(false);

const openCustomDialog = () => {
  isDialogOpen.value = true;
};

const { state, setPreset, setCustomRange, formattedRange } = usePeriodFilter(openCustomDialog);

const presets: Array<{ value: PeriodPreset; label: string }> = [
  { value: 'all', label: 'Все' },
  { value: 'today', label: 'Сегодня' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
  { value: 'custom', label: 'Произвольный' },
];

const handlePresetChange = (preset: PeriodPreset) => {
  const prevPreset = state.value.preset;

  // Если нажали на "Произвольный" повторно, открываем модалку снова
  if (preset === 'custom' && prevPreset === 'custom') {
    openCustomDialog();
    return;
  }

  setPreset(preset);

  if (preset !== 'custom' && prevPreset !== preset) {
    emit('update:period', state.value.dateRange.start, state.value.dateRange.end);
  }
};

const handleCustomRangeChange = (dateRange: { start: Date | null; end: Date | null }) => {
  setCustomRange(dateRange);
  emit('update:period', state.value.dateRange.start, state.value.dateRange.end);
  isDialogOpen.value = false;
};
</script>

<template>
  <ClientOnly>
    <VCard class="period-filter">
      <VCardText>
        <div class="d-flex flex-column ga-4">
          <VBtnToggle
            :model-value="state.preset"
            mandatory
            color="primary"
            variant="outlined"
            divided
            class="period-filter__toggle"
            @update:model-value="handlePresetChange"
          >
            <VBtn v-for="preset in presets" :key="preset.value" :value="preset.value" size="small">
              {{ preset.label }}
            </VBtn>
          </VBtnToggle>

          <div v-if="formattedRange" class="period-filter__range-text">
            Выбран период: {{ formattedRange }}
          </div>
        </div>
      </VCardText>
    </VCard>

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
  background-color: var(--color-background-card);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  transition:
    background-color $transition-duration $transition-timing,
    color $transition-duration $transition-timing,
    border-color $transition-duration $transition-timing;

  &__toggle {
    :deep(.v-btn) {
      color: var(--color-text-primary);
      border-color: var(--color-border);
      transition:
        background-color $transition-duration $transition-timing,
        color $transition-duration $transition-timing,
        border-color $transition-duration $transition-timing;

      &:hover {
        background-color: var(--color-background-secondary);
      }

      &.v-btn--active {
        background-color: var(--color-primary);
        color: var(--color-white);
      }
    }
  }

  &__range-text {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    transition: color $transition-duration $transition-timing;
  }
}
</style>
