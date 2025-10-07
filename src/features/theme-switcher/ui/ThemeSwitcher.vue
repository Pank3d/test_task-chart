<script setup lang="ts">
import { BaseSelect } from '~/src/shared/ui';
import { useTheme } from '../model/useTheme';

const { currentTheme, setTheme, themeOptions, currentThemeConfig } = useTheme();
</script>

<template>
  <BaseSelect
    :model-value="currentTheme"
    :items="themeOptions"
    :prepend-inner-icon="currentThemeConfig.icon"
    @update:model-value="setTheme"
  />
</template>
