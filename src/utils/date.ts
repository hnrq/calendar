import { addDays, startOfWeek } from "date-fns";

export const getDaysOfCalendarMonth = (
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0,
  rows: number = 6,
  columns: number = 7
): Date[] => {
  const days: Date[] = [];
  const date = new Date(year, month);
  const firstDay = startOfWeek(date, { weekStartsOn });

  (Array.from({ length: rows * columns }) as Date[]).forEach((_, index) => {
    days[index] = index === 0 ? firstDay : addDays(days[index - 1], 1);
  });

  return days;
};
