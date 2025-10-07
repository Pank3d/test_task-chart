export type MetricKey = 'totalRevenue' | 'ordersCount' | 'averageCheck';

export interface MetricCardConfig {
  key: MetricKey;
  subtitle: string;
  formatter: (value: number) => string;
}
