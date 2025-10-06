<script setup lang="ts">
import { VProgressCircular } from 'vuetify/components';

interface Props {
  color?: string;
  size?: number | string;
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 64,
});
</script>

<template>
  <div class="d-flex justify-center align-center">
    <VProgressCircular :color="color" :size="size" indeterminate />
  </div>
</template>
