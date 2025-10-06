import type { FetchSalesDataParams, SalesDataItem } from './types';

export const fetchSalesData = async (params?: FetchSalesDataParams): Promise<SalesDataItem[]> => {
  const queryParams = new URLSearchParams();

  if (params?.startDate) {
    queryParams.append('startDate', params.startDate.toISOString());
  }

  if (params?.endDate) {
    queryParams.append('endDate', params.endDate.toISOString());
  }

  const query = queryParams.toString();
  const url = query ? `/api/sales?${query}` : '/api/sales';

  const data = await $fetch<SalesDataItem[]>(url);
  return data;
};
