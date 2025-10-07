import { ref, computed, onMounted } from 'vue';
import type { Theme } from '~/src/shared/config/types';
import { getAvailableThemes, getThemeConfig, DEFAULT_THEME } from '~/src/shared/config/themes';

const THEME_STORAGE_KEY = 'app-theme';

const getSavedTheme = (): Theme => {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  return savedTheme || DEFAULT_THEME;
};

const currentTheme = ref<Theme>(getSavedTheme());

const availableThemes = getAvailableThemes();

const themeOptions = computed(() =>
  availableThemes.map((theme) => ({
    title: theme.name,
    value: theme.id,
    icon: theme.icon,
  }))
);

const currentThemeConfig = computed(() => getThemeConfig(currentTheme.value));

const setTheme = (theme: Theme) => {
  try {
    getThemeConfig(theme);
    currentTheme.value = theme;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch (error) {
    console.error(`Invalid theme: ${theme}`, error);
    if (theme !== DEFAULT_THEME) {
      setTheme(DEFAULT_THEME);
    }
  }
};

const initTheme = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', currentTheme.value);
  }
};

export const useTheme = () => {
  onMounted(() => {
    initTheme();
  });

  return {
    currentTheme,
    setTheme,
    availableThemes,
    themeOptions,
    currentThemeConfig,
  };
};
