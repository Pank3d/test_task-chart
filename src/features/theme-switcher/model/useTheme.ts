import { ref, watch, onMounted } from 'vue';
import type { Theme } from '~/src/shared/config/types';
import { getAvailableThemes, getThemeConfig, DEFAULT_THEME } from '~/src/shared/config/themes';

const THEME_STORAGE_KEY = 'app-theme';

const currentTheme = ref<Theme>(DEFAULT_THEME);

export const useTheme = () => {
  const setTheme = (theme: Theme) => {
    try {
      getThemeConfig(theme);
      currentTheme.value = theme;
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error(`Invalid theme: ${theme}`, error);
      setTheme(DEFAULT_THEME);
    }
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const theme = savedTheme || DEFAULT_THEME;
    setTheme(theme);
  };

  onMounted(() => {
    initTheme();
  });

  watch(currentTheme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
  });

  return {
    currentTheme,
    setTheme,
    availableThemes: getAvailableThemes(),
  };
};
