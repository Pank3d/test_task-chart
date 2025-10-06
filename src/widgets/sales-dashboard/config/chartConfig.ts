import type { ChartOptions } from 'chart.js';

export const chartColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];

export const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: true,
  interaction: {
    mode: 'nearest',
    intersect: true,
    axis: 'xy',
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: true,
      position: 'nearest',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      cornerRadius: 4,
      caretSize: 6,
      caretPadding: 10,
      callbacks: {
        title: (tooltipItems) => {
          if (tooltipItems.length > 0) {
            return `Дата: ${tooltipItems[0].label}`;
          }
          return '';
        },
        label: (context) => {
          const label = context.dataset.label || '';
          const value = context.parsed.y;
          return `${label}: ${value.toLocaleString('ru-RU')} ₽`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: string | number) => {
          return typeof value === 'number' ? value.toLocaleString('ru-RU') + ' ₽' : value + ' ₽';
        },
      },
    },
  },
};
