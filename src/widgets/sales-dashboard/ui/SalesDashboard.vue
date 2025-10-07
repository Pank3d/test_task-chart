<script setup lang="ts">
import { computed } from 'vue';
import { VContainer, VRow, VCol, VAlert } from 'vuetify/components';
import { useSalesData, useSalesMetrics } from '~/src/entities';
import { BaseCard, BaseChart, BaseLoader } from '~/src/shared/ui';
import { SalesPeriodFilter } from '~/src/features/sales/filter-by-period';
import { ThemeSwitcher, useTheme } from '~/src/features/theme-switcher';
import { useChartData, useSalesDashboard, getMetricValue } from '../model';
import { getChartOptions, metricsCards } from '../config';

const { currentTheme } = useTheme();
const { salesParams, handlePeriodUpdate } = useSalesDashboard();

const { data, isLoading, error } = useSalesData(salesParams);
const metrics = computed(() => useSalesMetrics(data.value || []));
const { chartData } = useChartData(metrics);
const chartOptions = computed(() => getChartOptions(currentTheme.value));
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
            :title="card.formatter(getMetricValue(metrics, card.key))"
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
