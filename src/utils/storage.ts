import { Config, WeekHours, Language } from "../types";
import { STORAGE_KEYS } from "../constants";

// Local Storage utilities for the salary calculator

// Debounce utility for storage operations
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

// Debounced storage functions to prevent excessive writes
const debouncedSaveConfig = debounce((config: Config) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  } catch (error) {
    console.warn("Failed to save config to localStorage:", error);
  }
}, 300);

const debouncedSaveHours = debounce((hours: WeekHours[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.HOURS, JSON.stringify(hours));
  } catch (error) {
    console.warn("Failed to save hours to localStorage:", error);
  }
}, 300);

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

// Load config from local storage
export const loadConfig = (): Config | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return migrateConfig(parsed);
  } catch (error) {
    console.warn("Failed to load config from localStorage:", error);
    return null;
  }
};

// Save config to local storage (debounced)
export const saveConfig = (config: Config): boolean => {
  debouncedSaveConfig(config);
  return true;
};

// Load hours from local storage
export const loadHours = (): WeekHours[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HOURS);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn("Failed to load hours from localStorage:", error);
    return null;
  }
};

// Save hours to local storage (debounced)
export const saveHours = (hours: WeekHours[]): boolean => {
  debouncedSaveHours(hours);
  return true;
};

// Clear all data from local storage
export const clearAllData = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.HOURS);
    localStorage.removeItem(STORAGE_KEYS.LANGUAGE);
    return true;
  } catch (error) {
    console.warn("Failed to clear localStorage:", error);
    return false;
  }
};
