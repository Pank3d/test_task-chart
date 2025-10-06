import { useQuery } from '@pinia/colada';
import { fetchSalesData } from '../api/salesApi';
import { toValue, type MaybeRefOrGetter } from 'vue';
import type { FetchSalesDataParams } from '../api';

export const useSalesData = (params?: MaybeRefOrGetter<FetchSalesDataParams | undefined>) => {
  return useQuery({
    key: () => {
      const resolvedParams = toValue(params);
      return [
        'sales-data',
        resolvedParams?.startDate?.toISOString() ?? null,
        resolvedParams?.endDate?.toISOString() ?? null,
      ];
    },
    query: () => fetchSalesData(toValue(params)),
  });
};
