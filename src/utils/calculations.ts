import { Config, Results, WeekShifts } from "../types";
import { ALLOWANCE_MULTIPLIERS, TIME_REGEX } from "../constants";
import { convertShiftsToWeekHours } from "./shiftCalculations";

// Cache for time conversions to improve performance
const timeToDecimalCache = new Map<string, number>();
const decimalToTimeCache = new Map<number, string>();

// Function to convert HH:MM format to decimal hours
export const timeToDecimal = (timeString: string): number => {
  if (!timeString || timeString === "0:00" || timeString === "0") return 0;

  // Check cache first
  if (timeToDecimalCache.has(timeString)) {
    return timeToDecimalCache.get(timeString)!;
  }

  const [hours, minutes] = timeString.split(":").map(Number);
  const result = hours + minutes / 60;

  // Cache the result
  timeToDecimalCache.set(timeString, result);

  return result;
};

// Function to convert decimal hours to HH:MM format
export const decimalToTime = (decimalHours: number): string => {
  // Check cache first
  if (decimalToTimeCache.has(decimalHours)) {
    return decimalToTimeCache.get(decimalHours)!;
  }

  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  const result = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  // Cache the result
  decimalToTimeCache.set(decimalHours, result);

  return result;
};

// New function to calculate salary from shift data
export const calculateSalaryFromShifts = (
  config: Config,
  weekShifts: WeekShifts[]
): Results => {
  // Convert shifts to hours
  const hours = convertShiftsToWeekHours(weekShifts, config.ageGroup);

  const totalRegularHoursDecimal = timeToDecimal(hours.totalRegularHours);
  const totalPaidBreaksDecimal = timeToDecimal(hours.totalPaidBreaks);
  const totalAllowance50Decimal = timeToDecimal(hours.totalAllowance50);
  const totalAllowance100Decimal = timeToDecimal(hours.totalAllowance100);

  // Note: allowance25 is not used in shift-based system as per CAO 2025
  const totalAllowance25Decimal = 0;

  return calculateSalaryFromHours(
    config,
    totalRegularHoursDecimal,
    totalPaidBreaksDecimal,
    totalAllowance25Decimal,
    totalAllowance50Decimal,
    totalAllowance100Decimal
  );
};

// Core salary calculation function
const calculateSalaryFromHours = (
  config: Config,
  totalRegularHoursDecimal: number,
  totalPaidBreaksDecimal: number,
  totalAllowance25Decimal: number,
  totalAllowance50Decimal: number,
  totalAllowance100Decimal: number
): Results => {
  // Calculate hourly rates
  const regularHourlyRate = config.allInHourlyRate;
  const paidBreaksHourlyRate = config.allInHourlyRate; // Paid breaks are at regular rate
  const allowance25HourlyRate =
    config.allInHourlyRate * ALLOWANCE_MULTIPLIERS.TWENTY_FIVE;
  const allowance50HourlyRate =
    config.allInHourlyRate * ALLOWANCE_MULTIPLIERS.FIFTY;
  const allowance100HourlyRate =
    config.allInHourlyRate * ALLOWANCE_MULTIPLIERS.HUNDRED;

  // Calculate income for each category
  const regularHoursIncome = totalRegularHoursDecimal * regularHourlyRate;
  const paidBreaksIncome = totalPaidBreaksDecimal * paidBreaksHourlyRate;
  const allowance25Income = totalAllowance25Decimal * allowance25HourlyRate;
  const allowance50Income = totalAllowance50Decimal * allowance50HourlyRate;
  const allowance100Income = totalAllowance100Decimal * allowance100HourlyRate;

  // Calculate gross salary (2025 logic)
  const grossSalary =
    regularHoursIncome +
    paidBreaksIncome +
    allowance25Income +
    allowance50Income +
    allowance100Income;

  // Calculate deductions according to 2025 logic
  // 1. Pensioen premie (from gross salary)
  const deductionPensioenPremie =
    grossSalary * (config.percentagePensioenPremie / 100);

  // 2. SPAWW.nl (from gross salary)
  const deductionSpaww = grossSalary * (config.percentageSpaww / 100);

  // 3. Loon voor Loonheffing
  const salaryBeforeTax =
    grossSalary - deductionPensioenPremie - deductionSpaww;

  // 4. Premie WGA werknemer (from salary before tax)
  const deductionPremieWGAWerknemer =
    salaryBeforeTax * (config.percentagePremieWGAWerknemer / 100);

  // 5. Loonheffing (OPTIONAL - from salary before tax)
  let deductionLoonheffing = 0;
  if (!config.applyLoonheffingskorting) {
    deductionLoonheffing =
      salaryBeforeTax * (config.percentageLoonheffing / 100);
  }

  // Calculate net salary (with optional loonheffing)
  const netSalary =
    grossSalary -
    deductionPensioenPremie -
    deductionSpaww -
    deductionPremieWGAWerknemer -
    deductionLoonheffing;

  // Return results
  return {
    totalRegularHours: decimalToTime(totalRegularHoursDecimal),
    totalPaidBreaks: decimalToTime(totalPaidBreaksDecimal),
    totalAllowance25: decimalToTime(totalAllowance25Decimal),
    totalAllowance50: decimalToTime(totalAllowance50Decimal),
    totalAllowance100: decimalToTime(totalAllowance100Decimal),
    estimatedGrossSalary: Math.round(grossSalary * 100) / 100,
    estimatedPensioenPremie: Math.round(deductionPensioenPremie * 100) / 100,
    estimatedSpaww: Math.round(deductionSpaww * 100) / 100,
    estimatedPremieWGAWerknemer:
      Math.round(deductionPremieWGAWerknemer * 100) / 100,
    estimatedLoonheffing: Math.round(deductionLoonheffing * 100) / 100,
    estimatedNetSalary: Math.round(netSalary * 100) / 100,
  };
};

// Function to validate numeric input (prevent negative values)
export const validateNumericInput = (
  value: string,
  min: number = 0
): number => {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < min) {
    return min;
  }
  return numValue;
};
