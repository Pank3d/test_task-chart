import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTheme } from './useTheme';
import type { Theme } from '~/src/shared/config/types';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should return default theme on initialization', () => {
    const { currentTheme } = useTheme();
    expect(currentTheme.value).toBe('light');
  });

  it('should change theme', () => {
    const { currentTheme, setTheme } = useTheme();

    setTheme('dark' as Theme);

    expect(currentTheme.value).toBe('dark');
  });

  it('should save theme to localStorage', () => {
    const { setTheme } = useTheme();

    setTheme('dark' as Theme);

    expect(localStorage.getItem('app-theme')).toBe('dark');
  });

  it('should load saved theme from localStorage', () => {
    localStorage.setItem('app-theme', 'dark');

    const { currentTheme } = useTheme();

    expect(currentTheme.value).toBe('dark');
  });

  it('should provide available themes', () => {
    const { availableThemes } = useTheme();

    expect(availableThemes.length).toBeGreaterThan(0);
    expect(availableThemes[0]).toHaveProperty('id');
    expect(availableThemes[0]).toHaveProperty('name');
  });

  it('should provide theme options for select', () => {
    const { themeOptions } = useTheme();

    expect(themeOptions.value.length).toBeGreaterThan(0);
    expect(themeOptions.value[0]).toHaveProperty('title');
    expect(themeOptions.value[0]).toHaveProperty('value');
  });

  it('should get current theme config', () => {
    const { currentThemeConfig } = useTheme();

    expect(currentThemeConfig.value).toHaveProperty('id');
    expect(currentThemeConfig.value).toHaveProperty('name');
    expect(currentThemeConfig.value).toHaveProperty('colors');
  });

  it('should fallback to default theme on invalid theme', () => {
    const { setTheme, currentTheme } = useTheme();

    setTheme('invalid-theme' as Theme);

    expect(currentTheme.value).toBe('light');
  });
});
