<script setup lang="ts">
import { VSelect } from 'vuetify/components';

interface SelectOption {
  title: string;
  value: string;
  icon?: string;
}

interface Props {
  modelValue: string;
  items: SelectOption[];
  prependInnerIcon?: string;
  placeholder?: string;
  density?: 'compact' | 'comfortable' | 'default';
  variant?: 'outlined' | 'filled' | 'solo' | 'underlined';
  hideDetails?: boolean;
  maxWidth?: string;
}

withDefaults(defineProps<Props>(), {
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
  emit('update:modelValue', value);
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
    class="base-switch"
    @update:model-value="handleChange"
  />
</template>

<style scoped lang="scss">
@use '~/src/shared/ui/styles/vars' as *;

.base-switch {
  background-color: var(--color-background-card);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  transition:
    background-color $transition-duration $transition-timing,
    color $transition-duration $transition-timing,
    border-color $transition-duration $transition-timing;
}

:deep(.v-field) {
  background-color: var(--color-background-card);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

:deep(.v-field__input) {
  color: var(--color-text-primary);
}

:deep(.v-icon) {
  color: var(--color-text-primary);
}

:deep(.v-list) {
  background-color: var(--color-background-card);
}

:deep(.v-list-item) {
  color: var(--color-text-primary);

  &:hover {
    background-color: var(--color-background-secondary);
  }
}
</style>
