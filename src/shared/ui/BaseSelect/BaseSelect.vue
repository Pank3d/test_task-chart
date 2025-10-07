<script setup lang="ts">
import { VSelect } from 'vuetify/components';
import type { SelectOption } from './types';

interface Props {
  modelValue: string | null;
  items: SelectOption[];
  prependInnerIcon?: string;
  placeholder?: string;
  density?: 'compact' | 'comfortable' | 'default';
  variant?: 'outlined' | 'filled' | 'solo' | 'underlined';
  hideDetails?: boolean;
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  prependInnerIcon: undefined,
  placeholder: undefined,
  density: 'compact',
  variant: 'outlined',
  hideDetails: true,
  maxWidth: '200px',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleChange = (value: string) => {
  const selectedItem = props.items.find((item) => item.value === value);

  emit('update:modelValue', value);

  if (selectedItem?.onClick) {
    selectedItem.onClick();
  }
};
</script>

<template>
  <VSelect
    :model-value="modelValue"
    :items="items"
    :prepend-inner-icon="prependInnerIcon"
    :placeholder="placeholder"
    :density="density"
    :variant="variant"
    :hide-details="hideDetails"
    :style="{ maxWidth }"
    class="base-select"
    @update:model-value="handleChange"
  />
</template>

<style scoped lang="scss">
@use '~/src/shared/ui/styles/vars' as *;

.base-select {
  transition:
    background-color $transition-duration $transition-timing,
    color $transition-duration $transition-timing,
    border-color $transition-duration $transition-timing;

  :deep(.v-field) {
    background-color: var(--color-background-card);
    color: var(--color-text-primary);
    border-color: var(--color-border);
    transition:
      background-color $transition-duration $transition-timing,
      color $transition-duration $transition-timing,
      border-color $transition-duration $transition-timing;
  }

  :deep(.v-field__outline) {
    color: var(--color-border);
    transition: color $transition-duration $transition-timing;
  }

  :deep(.v-field__input) {
    color: var(--color-text-primary);
    transition: color $transition-duration $transition-timing;
  }

  :deep(.v-icon) {
    color: var(--color-text-primary);
    transition: color $transition-duration $transition-timing;
  }
}
</style>
