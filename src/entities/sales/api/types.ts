export interface SalesDataItem {
  date: string;
  amount: number;
  category: string;
}

export interface FetchSalesDataParams {
  startDate?: Date | null;
  endDate?: Date | null;
}
