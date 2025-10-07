<script setup lang="ts">
import { computed } from 'vue';
import { BaseSwitch } from '~/src/shared/ui';
import { useTheme } from '../model/useTheme';
import { getThemeConfig } from '~/src/shared/config/themes';

const { currentTheme, setTheme, availableThemes } = useTheme();

const themeOptions = computed(() =>
  availableThemes.map((theme) => ({
    title: theme.name,
    value: theme.id,
    icon: theme.icon,
  }))
);

const currentThemeConfig = computed(() => getThemeConfig(currentTheme.value));
</script>

<template>
  <BaseSwitch
    :model-value="currentTheme"
    :items="themeOptions"
    :prepend-inner-icon="currentThemeConfig.icon"
    @update:model-value="setTheme"
  />
</template>
