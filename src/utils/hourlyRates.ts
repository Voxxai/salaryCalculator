// Hourly rate tables for Albert Heijn employees (2025) - All-in rates for contracts <12 hours
// Source: https://ahuitbetaaldata.nl/salaris-albert-heijn/

export type AgeGroup = "13-15" | "16" | "17" | "18" | "19" | "20" | "21+";
export type JobFunction =
  | "vakkenvuller"
  | "caissiere"
  | "verkoopmedewerker"
  | "kwaliteitsmedewerker"
  | "shiftleader";
export type ServiceBracket = "0" | "1" | "2" | "3" | "4" | "5";

type BaseHourlyRates = Record<AgeGroup, number>;

type ShiftleaderRates = Partial<
  Record<AgeGroup, Partial<Record<ServiceBracket, number>>>
>;

interface HourlyRatesData {
  vakkenvuller: BaseHourlyRates;
  caissiere: BaseHourlyRates;
  verkoopmedewerker: BaseHourlyRates;
  kwaliteitsmedewerker: BaseHourlyRates;
  shiftleader: ShiftleaderRates;
}

export const hourlyRates: HourlyRatesData = {
  // Vakkenvuller rates by age group (All-in rates including 32.97% bonus)
  vakkenvuller: {
    "13-15": 6.15,
    16: 7.1,
    17: 8.11,
    18: 9.59,
    19: 11.51,
    20: 15.34,
    "21+": 19.18,
  },

  caissiere: {
    "13-15": 6.35,
    16: 7.35,
    17: 8.4,
    18: 9.95,
    19: 11.95,
    20: 15.9,
    "21+": 19.85,
  },

  verkoopmedewerker: {
    "13-15": 6.35,
    16: 7.35,
    17: 8.4,
    18: 9.95,
    19: 11.95,
    20: 15.9,
    "21+": 19.85,
  },

  kwaliteitsmedewerker: {
    "13-15": 6.6,
    16: 7.65,
    17: 8.75,
    18: 10.4,
    19: 12.5,
    20: 16.65,
    "21+": 20.8,
  },

  // Shiftleader rates by age group and years of service (All-in rates)
  // Note: Shiftleider functie is alleen beschikbaar vanaf 18 jaar
  shiftleader: {
    18: {
      "0": 12.5,
    },
    19: {
      "0": 13.84,
    },
    20: {
      "0": 15.87,
    },
    "21+": {
      "0": 19.97,
      "1": 21.4,
      "2": 21.76,
      "3": 22.12,
      "4": 22.48,
      "5": 23.2,
    },
  },
};

// Function to get hourly rate based on function, age group, and years of service
export const getHourlyRate = (
  functionType: JobFunction,
  ageGroup: AgeGroup,
  yearsOfService: number = 0
): number => {
  if (functionType === "shiftleader") {
    if (ageGroup === "13-15" || ageGroup === "16" || ageGroup === "17") {
      return 0;
    }

    const ageRates = hourlyRates.shiftleader[ageGroup];
    if (!ageRates) return 0;

    let serviceBracket: ServiceBracket = "0";
    if (yearsOfService >= 1 && yearsOfService <= 5) {
      serviceBracket = yearsOfService.toString() as ServiceBracket;
    }

    return ageRates[serviceBracket] || 0;
  }

  return hourlyRates[functionType]?.[ageGroup] ?? 0;
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
  const basicFunctions: JobFunction[] = [
    "vakkenvuller",
    "caissiere",
    "verkoopmedewerker",
    "kwaliteitsmedewerker",
  ];

  if (!ageGroup || ["13-15", "16", "17"].includes(ageGroup)) {
    return basicFunctions;
  }

  return [...basicFunctions, "shiftleader"];
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
