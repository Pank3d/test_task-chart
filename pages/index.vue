<script lang="ts" setup>
import { SalesDashboard } from '~/src/widgets/sales-dashboard';
import { ErrorBoundary } from '~/src/shared/ui';
</script>

<template>
  <ErrorBoundary fallback="Не удалось загрузить дашборд продаж">
    <SalesDashboard />
  </ErrorBoundary>
</template>
