import type { ComputedRef } from 'vue';

export interface SalesMetrics {
  totalRevenue: ComputedRef<number>;
  ordersCount: ComputedRef<number>;
  averageCheck: ComputedRef<number>;
  dates: ComputedRef<string[]>;
  categories: ComputedRef<string[]>;
  groupedByDate: ComputedRef<Map<string, Map<string, number>>>;
}
