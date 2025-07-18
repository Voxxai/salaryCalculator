// Hourly rate tables for Albert Heijn employees (2025) - All-in rates for contracts <12 hours
// Source: https://ahuitbetaaldata.nl/salaris-albert-heijn/

export type AgeGroup = "13-15" | "16" | "17" | "18" | "19" | "20" | "21+";
export type JobFunction = "vakkenvuller" | "shiftleader";
export type ServiceBracket = "0" | "1" | "2" | "3" | "4" | "5";

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

  // Shiftleader rates by age group and years of service (All-in rates)
  // Source: https://ahuitbetaaldata.nl/salaris-shiftleider-albert-heijn/
  // Note: Shiftleider functie is alleen beschikbaar vanaf 18 jaar
  shiftleader: {
    18: {
      "0": 12.5, // All-in loon voor 18 jaar
    },
    19: {
      "0": 13.84, // All-in loon voor 19 jaar
    },
    20: {
      "0": 15.87, // All-in loon voor 20 jaar
    },
    "21+": {
      "0": 19.97, // 21 jaar en ouder (geen functiejaren)
      "1": 21.4, // 21 jaar (en een functiejaar)
      "2": 21.76, // 21 jaar (en twee functiejaren)
      "3": 22.12, // 21 jaar (en drie functiejaren)
      "4": 22.48, // 21 jaar (en vier functiejaren)
      "5": 23.2, // 21 jaar (en vijf functiejaren)
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
    // Check if age group is valid for shiftleader (18+ only)
    if (ageGroup === "13-15" || ageGroup === "16" || ageGroup === "17") {
      return 0; // Shiftleider niet beschikbaar voor deze leeftijdsgroepen
    }

    const ageRates = hourlyRates.shiftleader[ageGroup];
    if (!ageRates) return 0;

    // Determine years of service bracket
    let serviceBracket: ServiceBracket = "0";
    if (yearsOfService >= 1 && yearsOfService <= 5) {
      serviceBracket = yearsOfService.toString() as ServiceBracket;
    }

    return ageRates[serviceBracket] || 0;
  }

  return 0;
};

// Function to get available age groups
export const getAgeGroups = (): AgeGroup[] => {
  const ageGroups = Object.keys(hourlyRates.vakkenvuller) as AgeGroup[];

  // Sort age groups in logical order: 13-15, 16, 17, 18, 19, 20, 21+
  return ageGroups.sort((a, b) => {
    if (a === "13-15") return -1;
    if (b === "13-15") return 1;
    if (a === "21+") return 1;
    if (b === "21+") return -1;
    return parseInt(a) - parseInt(b);
  });
};

// Function to get available job functions based on age group
export const getJobFunctions = (ageGroup?: AgeGroup): JobFunction[] => {
  if (!ageGroup) {
    return ["vakkenvuller", "shiftleader"];
  }

  // Shiftleider is alleen beschikbaar vanaf 18 jaar
  if (ageGroup === "13-15" || ageGroup === "16" || ageGroup === "17") {
    return ["vakkenvuller"];
  }

  return ["vakkenvuller", "shiftleader"];
};

// Function to get years of service options
export const getYearsOfServiceOptions = (
  ageGroup?: AgeGroup,
  language?: string
): Array<{
  value: number;
  label: string;
}> => {
  const yearLabel = language === "en" ? "year" : "jaar";

  // For age groups 18, 19, 20: only 0 years of service
  if (ageGroup === "18" || ageGroup === "19" || ageGroup === "20") {
    return [{ value: 0, label: `0 ${yearLabel}` }];
  }

  // For 21+: 0 to 5 years of service
  if (ageGroup === "21+") {
    return [
      { value: 0, label: `0 ${yearLabel}` },
      { value: 1, label: `1 ${yearLabel}` },
      { value: 2, label: `2 ${yearLabel}` },
      { value: 3, label: `3 ${yearLabel}` },
      { value: 4, label: `4 ${yearLabel}` },
      { value: 5, label: `5 ${yearLabel}` },
    ];
  }

  // Default for other age groups
  return [{ value: 0, label: `0 ${yearLabel}` }];
};
