import { Shift, WeekShifts } from "../types";
import { timeToDecimal, decimalToTime } from "./calculations";

// Function to check if a shift is a night shift (22:00-06:00)
export const isNightShift = (startTime: string, endTime: string): boolean => {
  const startHour = parseInt(startTime.split(":")[0]);
  const endHour = parseInt(endTime.split(":")[0]);

  // Night shift: any hours between 22:00 and 06:00
  if (startHour >= 22 || startHour < 6) return true;
  if (endHour >= 22 || endHour < 6) return true;

  // Handle shifts that span midnight
  if (startHour > endHour) return true;

  return false;
};

// Function to automatically calculate break time based on shift duration and age group
export const calculateAutomaticBreak = (
  startTime: string,
  endTime: string,
  ageGroup?: string
): number => {
  const startDecimal = timeToDecimal(startTime);
  let endDecimal = timeToDecimal(endTime);

  // Handle shifts that span midnight
  if (endDecimal < startDecimal) {
    endDecimal += 24;
  }

  const totalHours = endDecimal - startDecimal;

  // NIEUW: Geen pauze als de shift korter is dan 4 uur
  if (totalHours < 4) {
    return 0;
  }

  // Determine if employee is under 18 (minor) or 18+
  const isMinor =
    ageGroup === "13-15" || ageGroup === "16" || ageGroup === "17";

  if (isMinor) {
    // CAO break rules for minors (under 18) - Albert Heijn:
    // < 4 uur: 0 minuten (hierboven afgehandeld)
    // 4-4.5 uur: 15 minuten
    // 4.5-5.5 uur: 30 minuten
    // 5.5+ uur: 45 minuten
    if (totalHours <= 4.5) {
      return 15; // 15 minuten
    } else if (totalHours <= 5.5) {
      return 30; // 30 minuten
    } else {
      return 45; // 45 minuten
    }
  } else {
    // CAO break rules for adults (18+) - Albert Heijn:
    // < 4 uur: 0 minuten (hierboven afgehandeld)
    // 4-5.5 uur: 15 minuten (vaak doorbetaald bij AH korte diensten)
    // 5.5-6 uur: 30 minuten
    // 6+ uur: 45 minuten
    if (totalHours <= 5.5) {
      return 15; // 15 minuten
    } else if (totalHours <= 6) {
      return 30; // 30 minuten
    } else {
      return 45; // 45 minuten
    }
  }
};

// Function to calculate shift duration in hours
export const calculateShiftDuration = (
  startTime: string,
  endTime: string,
  breakMinutes: number
): number => {
  const startDecimal = timeToDecimal(startTime);
  let endDecimal = timeToDecimal(endTime);

  // Handle shifts that span midnight
  if (endDecimal < startDecimal) {
    endDecimal += 24;
  }

  const totalHours = endDecimal - startDecimal;
  const breakHours = breakMinutes / 60;

  return Math.max(0, totalHours - breakHours);
};

// Function to calculate hours for each allowance category
export const calculateShiftHours = (
  shift: Shift,
  ageGroup?: string
): {
  regularHours: number;
  paidBreaks: number;
  allowance50: number;
  allowance100: number;
} => {
  // Automatically calculate break time if not provided
  // Let op: we gebruiken hier een check op undefined omdat 0 een geldige waarde is
  const breakMinutes =
    shift.breakMinutes !== undefined
      ? shift.breakMinutes
      : calculateAutomaticBreak(shift.startTime, shift.endTime, ageGroup);

  const totalHours = calculateShiftDuration(
    shift.startTime,
    shift.endTime,
    breakMinutes
  );

  // NIEUWE LOGICA VOOR BETAALDE PAUZES:
  // - 15 min pauze = 15 min (0.25 uur) doorbetaald
  // - 30 min pauze = 0 min doorbetaald (volledig eigen tijd)
  // - 45 min pauze = 15 min (0.25 uur) doorbetaald (en 30 min eigen tijd)
  let paidBreaks = 0;

  if (breakMinutes === 15) {
    paidBreaks = 0.25; // 15 minuten
  } else if (breakMinutes === 45) {
    paidBreaks = 0.25; // 15 minuten (van de 45)
  }
  // Bij 30 minuten (of 0) blijft paidBreaks 0.

  let regularHours = totalHours;
  let allowance50 = 0;
  let allowance100 = 0;

  // Apply night shift allowance (50%) - only automatic detection
  if (shift.isNightShift) {
    // Calculate night hours (22:00-06:00)
    const nightHours = calculateNightHours(shift.startTime, shift.endTime);
    if (nightHours > 0) {
      allowance50 += nightHours;
      regularHours -= nightHours;
    }
  }

  // Apply Sunday allowance (50%) and holiday allowances (100%)
  if (shift.isSunday) {
    // Sunday allowance is 50%
    allowance50 += totalHours;
    regularHours = 0; // All hours go to 50% allowance
  } else if (shift.isHoliday) {
    // Holiday allowance is 100%
    allowance100 += totalHours;
    regularHours = 0; // All hours go to 100% allowance
    allowance50 = 0; // Reset 50% allowance as 100% takes precedence
  }

  return {
    regularHours: Math.max(0, regularHours),
    paidBreaks,
    allowance50,
    allowance100,
  };
};

// Function to calculate night hours within a shift
export const calculateNightHours = (
  startTime: string,
  endTime: string
): number => {
  const startHour = parseInt(startTime.split(":")[0]);
  const startMinute = parseInt(startTime.split(":")[1]);
  const endHour = parseInt(endTime.split(":")[0]);
  const endMinute = parseInt(endTime.split(":")[1]);

  let nightHours = 0;

  // Convert to decimal hours
  const startDecimal = startHour + startMinute / 60;
  let endDecimal = endHour + endMinute / 60;

  // Handle shifts that span midnight
  if (endDecimal < startDecimal) {
    endDecimal += 24;
  }

  // Calculate night hours (22:00-06:00 = 22:00-30:00 in decimal)
  const nightStart = 22;
  const nightEnd = 30; // 6:00 next day = 30:00

  // Calculate overlap with night period
  const overlapStart = Math.max(startDecimal, nightStart);
  const overlapEnd = Math.min(endDecimal, nightEnd);

  if (overlapEnd > overlapStart) {
    nightHours = overlapEnd - overlapStart;
  }

  return nightHours;
};

// Function to convert shifts to weekly hours format (for backward compatibility)
export const convertShiftsToWeekHours = (
  weekShifts: WeekShifts[],
  ageGroup?: string
): {
  totalRegularHours: string;
  totalPaidBreaks: string;
  totalAllowance50: string;
  totalAllowance100: string;
} => {
  let totalRegularHours = 0;
  let totalPaidBreaks = 0;
  let totalAllowance50 = 0;
  let totalAllowance100 = 0;

  weekShifts.forEach(week => {
    week.shifts.forEach(shift => {
      const hours = calculateShiftHours(shift, ageGroup);
      totalRegularHours += hours.regularHours;
      totalPaidBreaks += hours.paidBreaks;
      totalAllowance50 += hours.allowance50;
      totalAllowance100 += hours.allowance100;
    });
  });

  return {
    totalRegularHours: decimalToTime(totalRegularHours),
    totalPaidBreaks: decimalToTime(totalPaidBreaks),
    totalAllowance50: decimalToTime(totalAllowance50),
    totalAllowance100: decimalToTime(totalAllowance100),
  };
};

// Function to generate a unique shift ID
export const generateShiftId = (): string => {
  return `shift_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Function to validate shift data
export const validateShift = (shift: Partial<Shift>): string[] => {
  const errors: string[] = [];

  if (!shift.startTime) {
    errors.push("Starttijd is verplicht");
  }

  if (!shift.endTime) {
    errors.push("Eindtijd is verplicht");
  }

  if (shift.startTime && shift.endTime) {
    const startDecimal = timeToDecimal(shift.startTime);
    let endDecimal = timeToDecimal(shift.endTime);

    // Handle shifts that span midnight
    if (endDecimal < startDecimal) {
      endDecimal += 24;
    }

    if (endDecimal <= startDecimal) {
      errors.push("Eindtijd moet na starttijd liggen");
    }
  }

  return errors;
};
