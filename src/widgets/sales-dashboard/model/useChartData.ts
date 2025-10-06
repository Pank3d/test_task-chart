import { computed, type ComputedRef } from 'vue';
import type { ChartData } from 'chart.js';
import { chartColors } from '../config';
import type { SalesMetrics } from '../types';

export const useChartData = (metrics: ComputedRef<SalesMetrics>) => {
  const chartData = computed<ChartData<'line'>>(() => {
    const metricsValue = metrics.value;

    if (!metricsValue.dates.value.length) {
      return { labels: [], datasets: [] };
    }

    const datasets = metricsValue.categories.value.map((category: string, index: number) => {
      const dataPoints = metricsValue.dates.value.map((date: string) => {
        const dateGroup = metricsValue.groupedByDate.value.get(date);
        return dateGroup?.get(category) || 0;
      });

      return {
        label: category,
        data: dataPoints,
        borderColor: chartColors[index % chartColors.length],
        backgroundColor: chartColors[index % chartColors.length] + '20',
        tension: 0.3,
      };
    });

    return {
      labels: metricsValue.dates.value,
      datasets,
    };
  });

  return { chartData };
};
