// Utility functions for salary calculations

// Function to convert HH:MM format to decimal hours
export const timeToDecimal = (timeString) => {
  if (!timeString || timeString === "0:00") return 0;

  const [hours, minutes] = timeString.split(":").map(Number);
  return hours + minutes / 60;
};

// Function to convert decimal hours to HH:MM format
export const decimalToTime = (decimalHours) => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

// Function to calculate salary according to the specified logic
export const calculateSalary = (config, hoursPerWeek) => {
  // Calculate total hours
  let totalRegularHoursDecimal = 0;
  let totalOvertimeHoursDecimal = 0;

  hoursPerWeek.forEach((week) => {
    totalRegularHoursDecimal += timeToDecimal(week.regularHours);
    totalOvertimeHoursDecimal += timeToDecimal(week.overtimeHours);
  });

  // Calculate hourly rate for overtime
  const overtimeHourlyRate =
    config.allInHourlyRate * (1 + config.overtimePercentage / 100);

  // Calculate income
  const regularHoursIncome = totalRegularHoursDecimal * config.allInHourlyRate;
  const overtimeHoursIncome = totalOvertimeHoursDecimal * overtimeHourlyRate;

  // Calculate gross salary
  const grossSalary = regularHoursIncome + overtimeHoursIncome;

  // Calculate deductions
  const pensionDeduction = grossSalary * (config.pensionPercentage / 100);
  const salaryForTaxCalculation = grossSalary - pensionDeduction;
  const taxDeduction = salaryForTaxCalculation * (config.taxPercentage / 100);

  // Calculate net salary
  const netSalary = grossSalary - pensionDeduction - taxDeduction;

  // Return results
  return {
    totalRegularHours: decimalToTime(totalRegularHoursDecimal),
    totalOvertimeHours: decimalToTime(totalOvertimeHoursDecimal),
    estimatedGrossSalary: Math.round(grossSalary * 100) / 100,
    estimatedPension: Math.round(pensionDeduction * 100) / 100,
    estimatedTax: Math.round(taxDeduction * 100) / 100,
    estimatedNetSalary: Math.round(netSalary * 100) / 100,
  };
};

// Function to validate time input (HH:MM format)
export const validateTimeInput = (value) => {
  const timeRegex = /^([0-9]|[0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  return timeRegex.test(value) || value === "";
};
