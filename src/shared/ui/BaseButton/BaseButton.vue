<script setup lang="ts">
import { VBtn } from 'vuetify/components';

interface Props {
  variant?: 'text' | 'outlined' | 'flat' | 'elevated' | 'tonal' | 'plain';
  color?: string;
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large';
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'elevated',
  color: undefined,
  size: 'default',
  icon: undefined,
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<template>
  <VBtn
    :variant="variant"
    :color="color"
    :size="size"
    :icon="icon"
    :disabled="disabled"
    :loading="loading"
    class="base-button"
    @click="handleClick"
  >
    <slot />
  </VBtn>
</template>

<style scoped lang="scss">
@use '~/src/shared/ui/styles/vars' as *;

.base-button {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  transition:
    background-color $transition-duration $transition-timing,
    color $transition-duration $transition-timing,
    border-color $transition-duration $transition-timing;

  &:hover {
    background-color: var(--color-primary-hover);
  }
}
</style>
