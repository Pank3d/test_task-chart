import { computed } from 'vue';
import type { SalesDataItem } from '../api/types';

export const useSalesMetrics = (data: SalesDataItem[]) => {
  const totalRevenue = computed(() => {
    return data.reduce((sum, item) => sum + item.amount, 0);
  });

  const ordersCount = computed(() => {
    return data.length;
  });

  const averageCheck = computed(() => {
    return data.length > 0 ? totalRevenue.value / data.length : 0;
  });

  const groupedByDate = computed(() => {
    const grouped = new Map<string, Map<string, number>>();

    data.forEach((item) => {
      if (!grouped.has(item.date)) {
        grouped.set(item.date, new Map());
      }
      const dateGroup = grouped.get(item.date)!;
      const currentAmount = dateGroup.get(item.category) || 0;
      dateGroup.set(item.category, currentAmount + item.amount);
    });

    return grouped;
  });

  const categories = computed(() => {
    return [...new Set(data.map((item) => item.category))];
  });

  const dates = computed(() => {
    return [...new Set(data.map((item) => item.date))].sort();
  });

  return {
    totalRevenue,
    ordersCount,
    averageCheck,
    groupedByDate,
    categories,
    dates,
  };
};
