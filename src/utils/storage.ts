import { Config, WeekShifts } from "../types";
import { STORAGE_KEYS } from "../constants";

// Helper function to check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && window.localStorage !== null;
  } catch {
    return false;
  }
};

// Storage utilities for the salary calculator

// Save configuration to localStorage
export const saveConfig = (config: Config): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  } catch (error) {
    console.error("Error saving config:", error);
  }
};

// Load configuration from localStorage
export const loadConfig = (): Config | null => {
  if (!isLocalStorageAvailable()) return null;
  try {
    const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return savedConfig ? JSON.parse(savedConfig) : null;
  } catch (error) {
    console.error("Error loading config:", error);
    return null;
  }
};

// Save shifts per week to localStorage
export const saveShifts = (weekShifts: WeekShifts[]): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(
      "salary_calculator_shifts",
      JSON.stringify(weekShifts)
    );
  } catch (error) {
    console.error("Error saving shifts:", error);
  }
};

// Load shifts per week from localStorage
export const loadShifts = (): WeekShifts[] | null => {
  if (!isLocalStorageAvailable()) return null;
  try {
    const savedShifts = localStorage.getItem("salary_calculator_shifts");
    return savedShifts ? JSON.parse(savedShifts) : null;
  } catch (error) {
    console.error("Error loading shifts:", error);
    return null;
  }
};

// Save language preference to localStorage
export const saveLanguage = (language: string): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  } catch (error) {
    console.error("Error saving language:", error);
  }
};

// Load language preference from localStorage
export const loadLanguage = (): string | null => {
  if (!isLocalStorageAvailable()) return null;
  try {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  } catch (error) {
    console.error("Error loading language:", error);
    return null;
  }
};

// Clear all data from localStorage
export const clearAllData = (): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem("salary_calculator_shifts");
    localStorage.removeItem(STORAGE_KEYS.LANGUAGE);
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};
