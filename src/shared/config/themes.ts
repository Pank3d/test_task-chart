import type { ThemeConfig } from './types';

export const THEMES_CONFIG = new Map<string, ThemeConfig>([
  [
    'light',
    {
      id: 'light',
      name: 'Светлая',
      icon: 'mdi-weather-sunny',
      colors: {
        chartColors: [
          'rgb(29, 78, 216)', // Blue
          'rgb(124, 58, 237)', // Purple
          'rgb(245, 158, 11)', // Orange
        ],
        textColor: '#212121',
        gridColor: 'rgba(0, 0, 0, 0.1)',
        tooltipBg: 'rgba(0, 0, 0, 0.8)',
        tooltipBorder: 'rgba(255, 255, 255, 0.2)',
      },
    },
  ],
  [
    'dark',
    {
      id: 'dark',
      name: 'Темная',
      icon: 'mdi-weather-night',
      colors: {
        chartColors: [
          'rgb(167, 139, 250)', // Purple
          'rgb(59, 130, 246)', // Blue
          'rgb(251, 191, 36)', // Amber
        ],
        textColor: '#e6edf3',
        gridColor: 'rgba(48, 54, 61, 0.5)',
        tooltipBg: 'rgba(28, 33, 40, 0.95)',
        tooltipBorder: 'rgba(124, 58, 237, 0.5)',
      },
    },
  ],
]);

export const getThemeConfig = (theme: string): ThemeConfig => {
  const config = THEMES_CONFIG.get(theme);
  if (!config) {
    throw new Error(`Theme "${theme}" not found`);
  }
  return config;
};

export const getAvailableThemes = (): ThemeConfig[] => {
  return Array.from(THEMES_CONFIG.values());
};

export const DEFAULT_THEME = 'light';
