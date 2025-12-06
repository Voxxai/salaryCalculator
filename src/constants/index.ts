// Constants for the salary calculator application

export const ALLOWANCE_MULTIPLIERS = {
  TWENTY_FIVE: 1.25,
  FIFTY: 1.5,
  HUNDRED: 2.0,
} as const;

export const DEFAULT_CONFIG = {
  allInHourlyRate: 6.15,
  ageGroup: "13-15" as const,
  jobFunction: "vakkenvuller" as const,
  yearsOfService: 0,
  useFunctionBasedRate: true,
  overtimePercentage: 50,
  percentagePensioenPremie: 1.59,
  percentageSpaww: 0.1,
  percentagePremieWGAWerknemer: 0.49,
  percentageLoonheffing: 7.81,
} as const;

export const STORAGE_KEYS = {
  CONFIG: "salary_calculator_config",
  LANGUAGE: "salary_calculator_language",
} as const;

export const TIME_REGEX = /^([0-9]|[1-9][0-9]):([0-5][0-9])$/;
