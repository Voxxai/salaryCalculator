import { AgeGroup, JobFunction } from "../utils/hourlyRates";

// Type definitions for the salary calculator application

export interface Config {
  allInHourlyRate: number;
  ageGroup: AgeGroup;
  jobFunction: JobFunction;
  yearsOfService: number;
  useFunctionBasedRate: boolean;
  overtimePercentage: number;
  percentagePensioenPremie: number;
  percentageSpaww: number;
  percentagePremieWGAWerknemer: number;
  percentageLoonheffing: number;
}

// New shift-based types
export interface Shift {
  id: string;
  date?: string; // YYYY-MM-DD format (optional since we removed date input)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  breakMinutes?: number; // Break time in minutes (automatically calculated)
  isSunday: boolean;
  isHoliday: boolean;
  isNightShift: boolean; // 22:00-06:00
}

export interface WeekShifts {
  weekNumber: number;
  shifts: Shift[];
}

export interface Results {
  totalRegularHours: string;
  totalPaidBreaks: string;
  totalAllowance25: string;
  totalAllowance50: string;
  totalAllowance100: string;
  estimatedGrossSalary: number;
  estimatedPensioenPremie: number;
  estimatedSpaww: number;
  estimatedPremieWGAWerknemer: number;
  estimatedLoonheffing: number;
  estimatedNetSalary: number;
}

export type Language = "nl" | "en";

export interface UpdateConfigFunction {
  (field: keyof Config, value: string | number | boolean): void;
}

// New shift-based update functions
export interface UpdateWeekShiftsFunction {
  (weekIndex: number, shifts: Shift[]): void;
}

export interface AddShiftFunction {
  (weekIndex: number, shift: Shift): void;
}

export interface UpdateShiftFunction {
  (weekIndex: number, shiftId: string, shift: Partial<Shift>): void;
}

export interface DeleteShiftFunction {
  (weekIndex: number, shiftId: string): void;
}
