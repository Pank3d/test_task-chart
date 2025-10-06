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

// Регистрация компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  title?: string;
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

defineProps<Props>();
</script>

<template>
  <VCard>
    <VCardTitle v-if="title">
      {{ title }}
    </VCardTitle>
    <VCardText>
      <Line :data="data" :options="options" />
    </VCardText>
  </VCard>
</template>
