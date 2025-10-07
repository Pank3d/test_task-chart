<script setup lang="ts">
import { BaseSwitch } from '~/src/shared/ui';
import { useTheme } from '../model/useTheme';

const { currentTheme, setTheme, themeOptions, currentThemeConfig } = useTheme();
</script>

<template>
  <BaseSwitch
    :model-value="currentTheme"
    :items="themeOptions"
    :prepend-inner-icon="currentThemeConfig.icon"
    @update:model-value="setTheme"
  />
</template>
