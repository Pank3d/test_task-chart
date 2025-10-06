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
    <VCard>
      <VCardText>
        <div class="d-flex flex-column ga-4">
          <VBtnToggle
            :model-value="state.preset"
            mandatory
            color="primary"
            variant="outlined"
            divided
            @update:model-value="handlePresetChange"
          >
            <VBtn v-for="preset in presets" :key="preset.value" :value="preset.value" size="small">
              {{ preset.label }}
            </VBtn>
          </VBtnToggle>

          <div v-if="formattedRange" class="text-caption text-grey">
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
