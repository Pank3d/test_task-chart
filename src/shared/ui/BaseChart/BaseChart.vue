<script setup lang="ts">
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { VCard, VCardTitle, VCardText } from 'vuetify/components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  title?: string;
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

defineProps<Props>();
</script>

<template>
  <VCard class="base-chart">
    <VCardTitle v-if="title" class="base-chart__title">
      {{ title }}
    </VCardTitle>
    <VCardText class="base-chart__content">
      <Line :data="data" :options="options" />
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">
.base-chart {
  background-color: var(--color-background-card);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;

  &__title {
    color: var(--color-text-primary);
  }

  &__content {
    color: var(--color-text-primary);
    min-height: 500px;
    display: flex;
    align-items: center;

    canvas {
      height: 100%;
    }
  }
}
</style>
