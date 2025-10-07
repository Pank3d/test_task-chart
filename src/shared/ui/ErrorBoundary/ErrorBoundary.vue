<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

interface Props {
  fallback?: string;
  onError?: (error: Error) => void;
}

const props = withDefaults(defineProps<Props>(), {
  fallback: 'Произошла ошибка при загрузке компонента',
  onError: undefined,
});

const hasError = ref(false);
const error = ref<Error | null>(null);

onErrorCaptured((err: Error) => {
  hasError.value = true;
  error.value = err;

  if (props.onError) {
    props.onError(err);
  }

  return false;
});

const retry = () => {
  hasError.value = false;
  error.value = null;
};
</script>

<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-boundary__content">
      <h3 class="error-boundary__title">
        {{ fallback }}
      </h3>
      <p v-if="error" class="error-boundary__message">
        {{ error.message }}
      </p>
      <button class="error-boundary__retry" @click="retry">Попробовать снова</button>
    </div>
  </div>
  <slot v-else />
</template>

<style scoped lang="scss">
@use '~/src/shared/ui/styles/vars' as *;

.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: $spacing-lg;

  &__content {
    text-align: center;
    max-width: 400px;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: $spacing-sm;
    transition: color $transition-duration $transition-timing;
  }

  &__message {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-bottom: $spacing-lg;
    transition: color $transition-duration $transition-timing;
  }

  &__retry {
    padding: $spacing-sm $spacing-lg;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition:
      background-color $transition-duration $transition-timing,
      opacity $transition-duration $transition-timing;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 0.8;
    }
  }
}
</style>
