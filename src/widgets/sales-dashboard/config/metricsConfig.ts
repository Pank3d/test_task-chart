export interface MetricCardConfig {
  key: string;
  subtitle: string;
  formatter: (value: number) => string;
}

export const metricsCards: MetricCardConfig[] = [
  {
    key: 'totalRevenue',
    subtitle: 'Общий доход',
    formatter: (value: number) => `${value} ₽`,
  },
  {
    key: 'ordersCount',
    subtitle: 'Количество заказов',
    formatter: (value: number) => String(value),
  },
  {
    key: 'averageCheck',
    subtitle: 'Средний чек',
    formatter: (value: number) => `${Math.round(value)} ₽`,
  },
];
