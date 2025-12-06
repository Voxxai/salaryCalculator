// Utility functions for date handling

/**
 * Calculate the start date of a week given a start date and week index
 * @param startDate - ISO date string (YYYY-MM-DD) or undefined
 * @param weekIndex - 0-based week index
 * @returns Array of dates for that week (Monday to Sunday)
 */
export const getWeekDates = (
  startDate: string | undefined,
  weekIndex: number
): Date[] => {
  if (!startDate) {
    return [];
  }

  const date = new Date(startDate + "T00:00:00Z");

  // Ensure we start on a Monday
  const day = date.getUTCDay();
  const diff = date.getUTCDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  date.setUTCDate(diff);

  // Add weeks
  date.setUTCDate(date.getUTCDate() + weekIndex * 7);

  const weekDates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(date);
    dayDate.setUTCDate(dayDate.getUTCDate() + i);
    weekDates.push(dayDate);
  }

  return weekDates;
};

/**
 * Get a formatted string for week display
 * @param startDate - ISO date string (YYYY-MM-DD) or undefined
 * @param weekIndex - 0-based week index (weekNumber - 1)
 * @returns Formatted string like "Mon Dec 6 - Sun Dec 12" or "Week X"
 */
export const getWeekDisplayText = (
  startDate: string | undefined,
  weekIndex: number,
  weekNumber: number
): string => {
  if (!startDate) {
    return `Week ${weekNumber}`;
  }

  const weekDates = getWeekDates(startDate, weekIndex);
  if (weekDates.length === 0) {
    return `Week ${weekNumber}`;
  }

  const startDay = weekDates[0];
  const endDay = weekDates[6];

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  const startStr = startDay.toLocaleDateString("nl-NL", options);
  const endStr = endDay.toLocaleDateString("nl-NL", options);

  return `${startStr} - ${endStr}`;
};
