<script setup lang="ts">
import { computed } from 'vue';
import { VDialog, VCard, VCardTitle, VCardText, VCardActions } from 'vuetify/components';

interface Props {
  modelValue: boolean;
  title?: string;
  maxWidth?: string | number;
  maxHeight?: string | number;
  persistent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  maxWidth: '500',
  maxHeight: undefined,
  persistent: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <VDialog v-model="isOpen" :max-width="maxWidth" :persistent="persistent">
    <VCard :max-height="maxHeight" class="base-dialog">
      <VCardTitle v-if="title" class="base-dialog__title">
        {{ title }}
      </VCardTitle>
      <VCardText class="base-dialog__content">
        <slot />
      </VCardText>
      <VCardActions v-if="$slots.actions" class="base-dialog__actions">
        <slot name="actions" />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">
.base-dialog {
  background-color: var(--color-background-card);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;

  &__title {
    color: var(--color-text-primary);
    border-bottom: 1px solid var(--color-divider);
  }

  &__content {
    color: var(--color-text-primary);
  }

  &__actions {
    border-top: 1px solid var(--color-divider);
  }
}
</style>
