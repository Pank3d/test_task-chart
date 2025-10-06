<script setup lang="ts">
import { VCard, VCardText } from 'vuetify/components';

interface Props {
  title?: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<template>
  <VCard>
    <VCardText>
      <div v-if="subtitle" class="text-caption text-grey">
        {{ subtitle }}
      </div>
      <div v-if="title" class="text-h5">
        {{ title }}
      </div>
      <slot />
    </VCardText>
  </VCard>
</template>
