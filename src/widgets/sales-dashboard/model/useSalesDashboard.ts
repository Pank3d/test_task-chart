import { ref, computed } from 'vue';

export const useSalesDashboard = () => {
  const startDate = ref<Date | null>(null);
  const endDate = ref<Date | null>(null);

  const salesParams = computed(() => ({
    startDate: startDate.value,
    endDate: endDate.value,
  }));

  const handlePeriodUpdate = (start: Date | null, end: Date | null) => {
    startDate.value = start;
    endDate.value = end;
  };

  return {
    startDate,
    endDate,
    salesParams,
    handlePeriodUpdate,
  };
};
