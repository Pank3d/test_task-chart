import { salesData } from '../../fakeApi';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const startDate = query.startDate ? new Date(query.startDate as string) : null;
  const endDate = query.endDate ? new Date(query.endDate as string) : null;

  if (!startDate && !endDate) {
    return salesData;
  }

  return salesData.filter((item) => {
    const itemDate = new Date(item.date);

    if (startDate && endDate) {
      return itemDate >= startDate && itemDate <= endDate;
    }

    if (startDate) {
      return itemDate >= startDate;
    }

    if (endDate) {
      return itemDate <= endDate;
    }

    return true;
  });
});
