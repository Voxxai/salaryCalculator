/**
 * Utility functions for calculating Albert Heijn 13-period salary system
 * Based on anchor point: December 8, 2025 (Monday) = Payout Date for Period 12
 * Work Period End: November 30, 2025 (Sunday)
 * Work Period Start: November 3, 2025 (Monday)
 * Pattern repeats every 364 days (52 weeks * 7 days)
 */

export interface Period {
  id: string;
  periodNumber: number; // 1-13
  startDate: Date;
  endDate: Date;
  payoutDate: Date; // Monday 1 week after endDate
  year: number;
}

export interface PeriodStatus {
  currentPeriod: Period;
  pendingPayout?: {
    periodNumber: number;
    payoutDate: Date;
    isProcessingWeek: boolean;
  };
}

/**
 * ANCHOR POINT: December 8, 2025 is the payout date for Period 12
 * This is our reference point for all calculations
 */
const ANCHOR_PAYOUT_DATE = new Date(2025, 11, 8); // December 8, 2025 (Monday)
const ANCHOR_PERIOD_NUMBER = 12;
const PERIOD_DURATION_DAYS = 28; // 4 weeks
// Gap between period end (Sunday) and payout (following Monday)
const PROCESSING_GAP_DAYS = 8;

/**
 * Calculate the payout date for a given period number in a year
 * @param periodNumber - Period number (1-13)
 * @param year - The year
 * @returns The payout date (Monday)
 */
export const getPayoutDateForPeriod = (
  periodNumber: number,
  year: number
): Date => {
  // Calculate days offset from anchor point
  // Anchor is Period 12 of 2025
  const yearDiff = year - 2025;
  const periodDiff = periodNumber - ANCHOR_PERIOD_NUMBER;

  // Total days from anchor: (years * 364) + (period differences * 28)
  const totalDaysDiff = yearDiff * 364 + periodDiff * PERIOD_DURATION_DAYS;

  const payoutDate = new Date(ANCHOR_PAYOUT_DATE);
  payoutDate.setDate(payoutDate.getDate() + totalDaysDiff);

  return payoutDate;
};

/**
 * Calculate the work period end date (Sunday) for a given period
 * Payout is 1 week (7 days) after the period ends
 * @param periodNumber - Period number (1-13)
 * @param year - The year
 * @returns The end date of work period (Sunday)
 */
export const getWorkPeriodEndDate = (
  periodNumber: number,
  year: number
): Date => {
  const payoutDate = getPayoutDateForPeriod(periodNumber, year);
  const endDate = new Date(payoutDate);
  // Work period ends on the Sunday before the payout week
  endDate.setDate(endDate.getDate() - PROCESSING_GAP_DAYS);
  return endDate;
};

/**
 * Calculate the work period start date (Monday) for a given period
 * 4 weeks (28 days) before the period ends
 * @param periodNumber - Period number (1-13)
 * @param year - The year
 * @returns The start date of work period (Monday)
 */
export const getWorkPeriodStartDate = (
  periodNumber: number,
  year: number
): Date => {
  const endDate = getWorkPeriodEndDate(periodNumber, year);
  const startDate = new Date(endDate);
  // Period is 28 days, so start is 27 days before end (end date is inclusive)
  startDate.setDate(startDate.getDate() - PERIOD_DURATION_DAYS + 1);
  return startDate;
};

/**
 * Get a complete Period object
 * @param periodNumber - Period number (1-13)
 * @param year - The year
 * @returns Period object with all calculated dates
 */
export const getPeriod = (periodNumber: number, year: number): Period => {
  if (periodNumber < 1 || periodNumber > 13) {
    throw new Error("Period number must be between 1 and 13");
  }

  const startDate = getWorkPeriodStartDate(periodNumber, year);
  const endDate = getWorkPeriodEndDate(periodNumber, year);
  const payoutDate = getPayoutDateForPeriod(periodNumber, year);

  return {
    id: `period_${year}_${periodNumber}`,
    periodNumber,
    startDate,
    endDate,
    payoutDate,
    year,
  };
};

/**
 * Get all 13 periods for a given year
 * @param year - The year
 * @returns Array of 13 Period objects
 */
export const getPeriodsForYear = (year: number): Period[] => {
  const periods: Period[] = [];
  for (let i = 1; i <= 13; i++) {
    periods.push(getPeriod(i, year));
  }
  return periods;
};

/**
 * Determine the current working period and any pending payout in the processing gap.
 * Gap rule: previousPeriod.endDate < today <= previousPeriod.payoutDate
 * @returns PeriodStatus with currentPeriod and optional pendingPayout
 */
export const getPeriodStatus = (): PeriodStatus => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  // Check both current year and adjacent years (for year crossovers)
  const currentYear = today.getFullYear();
  let workingPeriod: Period | null = null;

  for (const year of [currentYear - 1, currentYear, currentYear + 1]) {
    for (let periodNum = 1; periodNum <= 13; periodNum++) {
      const period = getPeriod(periodNum, year);

      // Check if today falls within this period's work dates
      if (today >= period.startDate && today <= period.endDate) {
        workingPeriod = period;
        break;
      }
    }

    if (workingPeriod) {
      break;
    }
  }

  // Fallback (should not reach here): use period 1 of the current year
  const current = workingPeriod || getPeriod(1, currentYear);

  // Determine previous period for gap detection
  const prevPeriodNumber =
    current.periodNumber === 1 ? 13 : current.periodNumber - 1;
  const prevPeriodYear =
    current.periodNumber === 1 ? current.year - 1 : current.year;
  const previousPeriod = getPeriod(prevPeriodNumber, prevPeriodYear);

  const inProcessingGap =
    today > previousPeriod.endDate && today <= previousPeriod.payoutDate;

  return {
    currentPeriod: current,
    pendingPayout: inProcessingGap
      ? {
          periodNumber: previousPeriod.periodNumber,
          payoutDate: previousPeriod.payoutDate,
          isProcessingWeek: true,
        }
      : undefined,
  };
};

/**
 * MAIN FUNCTION (backwards compatible): returns only the current working period.
 */
export const getCurrentPeriod = (): Period => getPeriodStatus().currentPeriod;

/**
 * Get the 4 week boundaries for a given period
 * Returns the start date of each of the 4 weeks (Mondays)
 * @param periodNumber - Period number (1-13)
 * @param year - The year
 * @returns Array of 4 dates (week starts)
 */
export const getWeekDatesForPeriod = (
  periodNumber: number,
  year: number
): Date[] => {
  const period = getPeriod(periodNumber, year);
  const weekDates: Date[] = [];

  for (let week = 0; week < 4; week++) {
    const weekStart = new Date(period.startDate);
    weekStart.setDate(weekStart.getDate() + week * 7);
    weekDates.push(weekStart);
  }

  return weekDates;
};

/**
 * Format a date range for display (e.g., "3 nov - 9 nov")
 * @param startDate - Start date
 * @param endDate - End date
 * @param locale - Locale code (default: 'nl-NL')
 * @returns Formatted string
 */
export const formatDateRange = (
  startDate: Date,
  endDate: Date,
  locale: string = "nl-NL"
): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  const startStr = startDate.toLocaleDateString(locale, options);
  const endStr = endDate.toLocaleDateString(locale, options);

  return `${startStr} - ${endStr}`;
};

/**
 * Format a date as full date string (e.g., "Maandag 3 februari 2025")
 * @param date - Date to format
 * @param locale - Locale code (default: 'nl-NL')
 * @returns Formatted string
 */
export const formatFullDate = (
  date: Date,
  locale: string = "nl-NL"
): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString(locale, options);
};

/**
 * Format a date as short date string (e.g., "3 nov")
 * @param date - Date to format
 * @param locale - Locale code (default: 'nl-NL')
 * @returns Formatted string
 */
export const formatShortDate = (
  date: Date,
  locale: string = "nl-NL"
): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };

  return date.toLocaleDateString(locale, options);
};
