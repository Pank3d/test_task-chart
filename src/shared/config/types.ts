export interface ThemeConfig {
  id: string;
  name: string;
  icon: string;
  colors: {
    chartColors: string[];
    textColor: string;
    gridColor: string;
    tooltipBg: string;
    tooltipBorder: string;
  };
}

export type Theme = string;
