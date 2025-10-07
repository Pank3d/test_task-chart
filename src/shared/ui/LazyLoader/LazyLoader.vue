<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue';
import { BaseLoader } from '../BaseLoader';

interface Props {
  loader: () => Promise<Component | { default: Component }>;
  errorComponent?: Component;
  delay?: number;
  timeout?: number;
}

const props = withDefaults(defineProps<Props>(), {
  errorComponent: undefined,
  delay: 200,
  timeout: 30000,
});

const AsyncComponent = defineAsyncComponent({
  loader: props.loader as () => Promise<Component>,
  loadingComponent: BaseLoader,
  errorComponent: props.errorComponent,
  delay: props.delay,
  timeout: props.timeout,
});
</script>

<template>
  <Suspense>
    <template #default>
      <AsyncComponent v-bind="$attrs" />
    </template>
    <template #fallback>
      <BaseLoader />
    </template>
  </Suspense>
</template>
