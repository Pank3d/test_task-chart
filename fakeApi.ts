export const salesData = [
  // Сентябрь 2025 (месяц назад)
  { date: '2025-09-01', amount: 1100, category: 'Электроника' },
  { date: '2025-09-01', amount: 750, category: 'Одежда' },
  { date: '2025-09-05', amount: 1300, category: 'Электроника' },
  { date: '2025-09-05', amount: 550, category: 'Книги' },
  { date: '2025-09-10', amount: 850, category: 'Одежда' },
  { date: '2025-09-10', amount: 1900, category: 'Электроника' },
  { date: '2025-09-15', amount: 650, category: 'Книги' },
  { date: '2025-09-15', amount: 1400, category: 'Электроника' },
  { date: '2025-09-20', amount: 900, category: 'Одежда' },
  { date: '2025-09-20', amount: 700, category: 'Книги' },
  { date: '2025-09-25', amount: 1600, category: 'Электроника' },
  { date: '2025-09-25', amount: 800, category: 'Одежда' },
  { date: '2025-09-30', amount: 1200, category: 'Электроника' },

  // Октябрь 2025 (текущий месяц)
  { date: '2025-10-01', amount: 1200, category: 'Электроника' },
  { date: '2025-10-01', amount: 800, category: 'Одежда' },
  { date: '2025-10-02', amount: 1500, category: 'Электроника' },
  { date: '2025-10-02', amount: 600, category: 'Книги' },
  { date: '2025-10-03', amount: 900, category: 'Одежда' },
  { date: '2025-10-03', amount: 2000, category: 'Электроника' },
  { date: '2025-10-04', amount: 700, category: 'Книги' },
  { date: '2025-10-05', amount: 1100, category: 'Одежда' },
  { date: '2025-10-06', amount: 1800, category: 'Электроника' },
  { date: '2025-10-07', amount: 950, category: 'Книги' },
  { date: '2025-10-08', amount: 1300, category: 'Электроника' },
  { date: '2025-10-08', amount: 750, category: 'Одежда' },
  { date: '2025-10-10', amount: 2200, category: 'Электроника' },
  { date: '2025-10-10', amount: 850, category: 'Одежда' },
  { date: '2025-10-12', amount: 1400, category: 'Электроника' },
  { date: '2025-10-12', amount: 600, category: 'Книги' },
  { date: '2025-10-15', amount: 1700, category: 'Электроника' },
  { date: '2025-10-15', amount: 900, category: 'Одежда' },
  { date: '2025-10-18', amount: 1250, category: 'Электроника' },
  { date: '2025-10-18', amount: 700, category: 'Книги' },
  { date: '2025-10-20', amount: 1900, category: 'Электроника' },
  { date: '2025-10-22', amount: 1050, category: 'Одежда' },
  { date: '2025-10-25', amount: 1600, category: 'Электроника' },
  { date: '2025-10-25', amount: 800, category: 'Книги' },
  { date: '2025-10-28', amount: 2100, category: 'Электроника' },
  { date: '2025-10-28', amount: 950, category: 'Одежда' },

  // Ноябрь 2025 (месяц вперед)
  { date: '2025-11-01', amount: 1300, category: 'Электроника' },
  { date: '2025-11-01', amount: 850, category: 'Одежда' },
  { date: '2025-11-05', amount: 1450, category: 'Электроника' },
  { date: '2025-11-05', amount: 700, category: 'Книги' },
  { date: '2025-11-08', amount: 1200, category: 'Одежда' },
  { date: '2025-11-08', amount: 1800, category: 'Электроника' },
  { date: '2025-11-10', amount: 650, category: 'Книги' },
  { date: '2025-11-10', amount: 1550, category: 'Электроника' },
  { date: '2025-11-15', amount: 950, category: 'Одежда' },
  { date: '2025-11-15', amount: 2000, category: 'Электроника' },
  { date: '2025-11-18', amount: 750, category: 'Книги' },
  { date: '2025-11-20', amount: 1700, category: 'Электроника' },
  { date: '2025-11-20', amount: 900, category: 'Одежда' },
  { date: '2025-11-25', amount: 1400, category: 'Электроника' },
  { date: '2025-11-25', amount: 800, category: 'Книги' },
  { date: '2025-11-28', amount: 1900, category: 'Электроника' },
  { date: '2025-11-28', amount: 1000, category: 'Одежда' },
  { date: '2025-11-30', amount: 1600, category: 'Электроника' },
];

export const fetchSalesData = (): Promise<typeof salesData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(salesData);
    }, 300);
  });
};
