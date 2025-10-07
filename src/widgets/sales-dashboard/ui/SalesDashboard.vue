<script setup lang="ts">
import { ref, computed } from 'vue';
import { VContainer, VRow, VCol, VAlert } from 'vuetify/components';
import { useSalesData, useSalesMetrics } from '~/src/entities';
import { BaseCard, BaseChart, BaseLoader } from '~/src/shared/ui';
import { SalesPeriodFilter } from '~/src/features/sales/filter-by-period';
import { ThemeSwitcher, useTheme } from '~/src/features/theme-switcher';
import { useChartData } from '../model';
import { getChartOptions, metricsCards } from '../config';

const { currentTheme } = useTheme();

const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);

const salesParams = computed(() => ({
  startDate: startDate.value,
  endDate: endDate.value,
}));

const { data, isLoading, error } = useSalesData(salesParams);

const metrics = computed(() => useSalesMetrics(data.value || []));

const { chartData } = useChartData(metrics);

const chartOptions = computed(() => getChartOptions(currentTheme.value));

const handlePeriodUpdate = (start: Date | null, end: Date | null) => {
  startDate.value = start;
  endDate.value = end;
};
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12" class="d-flex justify-space-between align-center">
        <h1 class="text-h4 mb-4">Дашборд продаж</h1>
        <ThemeSwitcher />
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <SalesPeriodFilter @update:period="handlePeriodUpdate" />
      </VCol>
    </VRow>

    <VRow v-if="isLoading">
      <VCol cols="12">
        <BaseLoader />
      </VCol>
    </VRow>

    <VRow v-else-if="error">
      <VCol cols="12">
        <VAlert type="error">
          {{ error }}
        </VAlert>
      </VCol>
    </VRow>

    <template v-else-if="data">
      <VRow>
        <VCol v-for="card in metricsCards" :key="card.key" cols="12" md="3">
          <BaseCard
            :subtitle="card.subtitle"
            :title="card.formatter((metrics as any)[card.key]?.value || 0)"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12">
          <BaseChart
            title="Динамика продаж по категориям"
            :data="chartData"
            :options="chartOptions"
          />
        </VCol>
      </VRow>
    </template>
  </VContainer>
</template>
