import type { ChartOptions } from 'chart.js';
import type { Theme } from '~/src/shared/config/types';
import { getThemeConfig } from '~/src/shared/config/themes';

export const chartColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];

export const getChartOptions = (theme: Theme): ChartOptions<'line'> => {
  const themeConfig = getThemeConfig(theme);
  const { textColor, gridColor, tooltipBg, tooltipBorder } = themeConfig.colors;

  return {
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
        labels: {
          color: textColor,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        position: 'nearest',
        backgroundColor: tooltipBg,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: tooltipBorder,
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        cornerRadius: 4,
        caretSize: 6,
        caretPadding: 10,
        callbacks: {
          title: (tooltipItems) => {
            if (tooltipItems.length > 0 && tooltipItems[0]) {
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
          color: textColor,
          font: {
            size: 12,
          },
          callback: (value: string | number) => {
            return typeof value === 'number' ? value.toLocaleString('ru-RU') + ' ₽' : value + ' ₽';
          },
        },
        grid: {
          color: gridColor,
        },
      },
      x: {
        ticks: {
          color: textColor,
          font: {
            size: 12,
          },
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };
};
