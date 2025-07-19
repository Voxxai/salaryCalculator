import { Config, WeekHours, Language } from "../types";
import { STORAGE_KEYS } from "../constants";

// Local Storage utilities for the salary calculator

// Migrate old config format to new 2025 format with function-based rates
const migrateConfig = (oldConfig: any): Config | null => {
  if (!oldConfig) return null;

  // Check if this is the old format (has pensionPercentage and taxPercentage)
  if (
    oldConfig.pensionPercentage !== undefined ||
    oldConfig.taxPercentage !== undefined
  ) {
    // Migrating old config to 2025 format

    return {
      allInHourlyRate: oldConfig.allInHourlyRate || 19.18,
      overtimePercentage: oldConfig.overtimePercentage || 50,
      numberOfWeeks: oldConfig.numberOfWeeks || 4,
      // New 2025 percentages
      percentagePensioenPremie: 1.59,
      percentageSpaww: 0.1,
      percentagePremieWGAWerknemer: 0.47,
      percentageLoonheffing: 7.81,
      // New function-based rate fields
      ageGroup: "21+",
      jobFunction: "vakkenvuller",
      yearsOfService: 0,
      useFunctionBasedRate: false,
    };
  }

  // Check if this is missing the new function-based fields
  if (oldConfig.ageGroup === undefined) {
    // Adding missing function-based rate fields
    return {
      ...oldConfig,
      ageGroup: "21+",
      jobFunction: "vakkenvuller",
      yearsOfService: 0,
      useFunctionBasedRate: false,
    };
  }

  return oldConfig;
};

// Save configuration to local storage
export const saveConfig = (config: Config): boolean => {
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    return true;
  } catch (error) {
    return false;
  }
};

// Load configuration from local storage
export const loadConfig = (): Config | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    const parsed = saved ? JSON.parse(saved) : null;
    return migrateConfig(parsed);
  } catch (error) {
    return null;
  }
};

// Save hours data to local storage
export const saveHours = (hours: WeekHours[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEYS.HOURS, JSON.stringify(hours));
    return true;
  } catch (error) {
    return false;
  }
};

// Load hours data from local storage
export const loadHours = (): WeekHours[] | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.HOURS);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    return null;
  }
};

// Save language preference to local storage
export const saveLanguage = (language: Language): boolean => {
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    return true;
  } catch (error) {
    return false;
  }
};

// Load language preference from local storage
export const loadLanguage = (): Language => {
  try {
    return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language) || "nl";
  } catch (error) {
    return "nl";
  }
};

// Clear all stored data
export const clearAllData = (): boolean => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    return false;
  }
};
