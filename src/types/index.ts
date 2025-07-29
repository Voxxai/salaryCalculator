import { AgeGroup, JobFunction } from "../utils/hourlyRates";

// Type definitions for the salary calculator application

export interface Config {
  allInHourlyRate: number;
  ageGroup: AgeGroup;
  jobFunction: JobFunction;
  yearsOfService: number;
  useFunctionBasedRate: boolean;
  overtimePercentage: number;
  numberOfWeeks: number;
  percentagePensioenPremie: number;
  percentageSpaww: number;
  percentagePremieWGAWerknemer: number;
  percentageLoonheffing: number;
}

export interface WeekHours {
  regularHours: string;
  paidBreaks: string;
  allowance25: string;
  allowance50: string;
  allowance100: string;
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

export interface UpdateHoursPerWeekFunction {
  (weekIndex: number, field: keyof WeekHours, value: string): void;
}
