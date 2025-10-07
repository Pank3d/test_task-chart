<script lang="ts" setup>
import { LazyLoader } from '~/src/shared/ui';

const SalesDashboard = () => import('~/src/widgets/sales-dashboard/ui/SalesDashboard.vue');
</script>

<template>
  <LazyLoader :loader="SalesDashboard" />
</template>
