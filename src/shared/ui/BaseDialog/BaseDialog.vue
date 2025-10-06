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
    <VCard :max-height="maxHeight">
      <VCardTitle v-if="title">
        {{ title }}
      </VCardTitle>
      <VCardText>
        <slot />
      </VCardText>
      <VCardActions v-if="$slots.actions">
        <slot name="actions" />
      </VCardActions>
    </VCard>
  </VDialog>
</template>
