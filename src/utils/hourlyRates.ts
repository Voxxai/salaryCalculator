// Hourly rate tables for Albert Heijn employees (2025) - All-in rates for contracts <12 hours
// Source: https://ahuitbetaaldata.nl/salaris-albert-heijn/

export type AgeGroup = "13-15" | "16" | "17" | "18" | "19" | "20" | "21+";
export type JobFunction = "vakkenvuller" | "shiftleader";
export type ServiceBracket = "0-1" | "1-2" | "2-3" | "3+";

interface VakkenvullerRates {
  [key: string]: number;
}

interface ShiftleaderRates {
  [key: string]: {
    [key: string]: number;
  };
}

interface HourlyRatesData {
  vakkenvuller: VakkenvullerRates;
  shiftleader: ShiftleaderRates;
}

export const hourlyRates: HourlyRatesData = {
  // Vakkenvuller rates by age group (All-in rates including 32.97% bonus)
  vakkenvuller: {
    "13-15": 6.15, // 4.62 + 32.97% = 6.15 euro per uur
    16: 7.1, // 5.33 + 32.97% = 7.10 euro per uur
    17: 8.11, // 6.09 + 32.97% = 8.11 euro per uur
    18: 9.59, // 7.20 + 32.97% = 9.59 euro per uur
    19: 11.51, // 8.64 + 32.97% = 11.51 euro per uur
    20: 15.34, // 11.52 + 32.97% = 15.34 euro per uur
    "21+": 19.18, // 14.40 + 32.97% = 19.18 euro per uur
  },

  // Shiftleader rates by age group and years of service (All-in rates including 32.97% bonus)
  // Note: Shiftleader rates are typically higher than vakkenvuller rates
  shiftleader: {
    "13-15": {
      "0-1": 6.5, // Base rate + 32.97% + shiftleader bonus
      "1-2": 6.75,
      "2-3": 7.0,
      "3+": 7.25,
    },
    16: {
      "0-1": 7.5,
      "1-2": 7.75,
      "2-3": 8.0,
      "3+": 8.25,
    },
    17: {
      "0-1": 8.5,
      "1-2": 8.75,
      "2-3": 9.0,
      "3+": 9.25,
    },
    18: {
      "0-1": 10.0,
      "1-2": 10.25,
      "2-3": 10.5,
      "3+": 10.75,
    },
    19: {
      "0-1": 12.0,
      "1-2": 12.25,
      "2-3": 12.5,
      "3+": 12.75,
    },
    20: {
      "0-1": 16.0,
      "1-2": 16.25,
      "2-3": 16.5,
      "3+": 16.75,
    },
    "21+": {
      "0-1": 20.0,
      "1-2": 20.25,
      "2-3": 20.5,
      "3+": 20.75,
    },
  },
};

// Function to get hourly rate based on function, age group, and years of service
export const getHourlyRate = (
  functionType: JobFunction,
  ageGroup: AgeGroup,
  yearsOfService: number = 0
): number => {
  if (functionType === "vakkenvuller") {
    return hourlyRates.vakkenvuller[ageGroup] || 0;
  } else if (functionType === "shiftleader") {
    const ageRates = hourlyRates.shiftleader[ageGroup];
    if (!ageRates) return 0;

    // Determine years of service bracket
    let serviceBracket: ServiceBracket = "0-1";
    if (yearsOfService >= 1 && yearsOfService < 2) serviceBracket = "1-2";
    else if (yearsOfService >= 2 && yearsOfService < 3) serviceBracket = "2-3";
    else if (yearsOfService >= 3) serviceBracket = "3+";

    return ageRates[serviceBracket] || 0;
  }

  return 0;
};

// Function to get available age groups
export const getAgeGroups = (): AgeGroup[] => {
  return Object.keys(hourlyRates.vakkenvuller) as AgeGroup[];
};

// Function to get available job functions
export const getJobFunctions = (): JobFunction[] => {
  return ["vakkenvuller", "shiftleader"];
};

// Function to get years of service options
export const getYearsOfServiceOptions = (): Array<{
  value: number;
  label: string;
}> => {
  return [
    { value: 0, label: "0-1 jaar" },
    { value: 1, label: "1-2 jaar" },
    { value: 2, label: "2-3 jaar" },
    { value: 3, label: "3+ jaar" },
  ];
};
