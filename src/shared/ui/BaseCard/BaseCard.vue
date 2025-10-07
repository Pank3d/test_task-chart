<script setup lang="ts">
import { VCard, VCardText } from 'vuetify/components';

interface Props {
  title?: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<template>
  <VCard class="base-card">
    <VCardText>
      <div v-if="subtitle" class="text-caption base-card__subtitle">
        {{ subtitle }}
      </div>
      <div v-if="title" class="text-h5 base-card__title">
        {{ title }}
      </div>
      <slot />
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">
.base-card {
  background-color: var(--color-background-card);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;

  &__subtitle {
    color: var(--color-text-secondary);
  }

  &__title {
    color: var(--color-text-primary);
  }
}
</style>
