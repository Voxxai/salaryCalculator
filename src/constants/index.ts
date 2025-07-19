// Constants for the salary calculator application

export const ALLOWANCE_MULTIPLIERS = {
  TWENTY_FIVE: 1.25,
  FIFTY: 1.5,
  HUNDRED: 2.0,
} as const;

export const DEFAULT_CONFIG = {
  allInHourlyRate: 19.18,
  ageGroup: "21+" as const,
  jobFunction: "vakkenvuller" as const,
  yearsOfService: 0,
  useFunctionBasedRate: false,
  overtimePercentage: 50,
  numberOfWeeks: 4,
  percentagePensioenPremie: 1.59,
  percentageSpaww: 0.1,
  percentagePremieWGAWerknemer: 0.47,
  percentageLoonheffing: 7.81,
} as const;

export const DEFAULT_WEEK_HOURS = {
  regularHours: "0:00",
  paidBreaks: "0:00",
  allowance25: "0:00",
  allowance50: "0:00",
  allowance100: "0:00",
} as const;

export const STORAGE_KEYS = {
  CONFIG: "salary_calculator_config",
  HOURS: "salary_calculator_hours",
  LANGUAGE: "salary_calculator_language",
} as const;

export const TIME_REGEX = /^([0-9]|[0-1][0-9]|2[0-3]):([0-5][0-9])$/;

export const MIN_AGE_FOR_SHIFTLEADER = 18;

export const AGE_GROUPS_WITHOUT_SHIFTLEADER = ["13-15", "16", "17"] as const;
