import type { SalesMetrics } from './types';
import type { MetricKey } from '../config/types';
import type { ComputedRef } from 'vue';

export const getMetricValue = (metrics: SalesMetrics, key: MetricKey): number => {
  const metric = metrics[key] as ComputedRef<number>;
  return metric.value;
};
