// Local Storage utilities for the salary calculator

const STORAGE_KEYS = {
  CONFIG: "salary_calculator_config",
  HOURS: "salary_calculator_hours",
  LANGUAGE: "salary_calculator_language",
};

// Save configuration to local storage
export const saveConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error("Error saving config:", error);
    return false;
  }
};

// Load configuration from local storage
export const loadConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Error loading config:", error);
    return null;
  }
};

// Save hours data to local storage
export const saveHours = (hours) => {
  try {
    localStorage.setItem(STORAGE_KEYS.HOURS, JSON.stringify(hours));
    return true;
  } catch (error) {
    console.error("Error saving hours:", error);
    return false;
  }
};

// Load hours data from local storage
export const loadHours = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.HOURS);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Error loading hours:", error);
    return null;
  }
};

// Save language preference to local storage
export const saveLanguage = (language) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    return true;
  } catch (error) {
    console.error("Error saving language:", error);
    return false;
  }
};

// Load language preference from local storage
export const loadLanguage = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || "nl";
  } catch (error) {
    console.error("Error loading language:", error);
    return "nl";
  }
};

// Clear all stored data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error("Error clearing data:", error);
    return false;
  }
};
