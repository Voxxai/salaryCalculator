import React, { useState, useEffect } from "react";

// Import all components
import Header from "./components/Header";
import DesktopLayout from "./components/DesktopLayout";
import MobileLayout from "./components/MobileLayout";
import PWAInstallPrompt from "./components/PWAInstallPrompt";

// Import custom hooks
import { useScreenSize } from "./hooks/useScreenSize";

// Import utility functions
import { calculateSalary, validateTimeInput } from "./utils/calculations";
import {
  saveConfig,
  loadConfig,
  saveHours,
  loadHours,
  saveLanguage,
  loadLanguage,
} from "./utils/storage";

function App() {
  // State for language selection (load from storage)
  const [language, setLanguage] = useState(() => loadLanguage());

  // Detect screen size for layout selection
  const { isMobile } = useScreenSize();

  // State for configuration settings (load from storage)
  const [config, setConfig] = useState(() => {
    const savedConfig = loadConfig();
    return (
      savedConfig || {
        allInHourlyRate: 19.18, // All-in hourly rate in euros
        overtimePercentage: 50, // Overtime percentage (e.g. 50 for 50%)
        numberOfWeeks: 4, // Number of weeks in salary period
        pensionPercentage: 1.69, // Pension/SPAWW percentage
        taxPercentage: 8.28, // Tax/WGA percentage
      }
    );
  });

  // State for hours registration per week (load from storage)
  const [hoursPerWeek, setHoursPerWeek] = useState(() => {
    const savedHours = loadHours();
    return savedHours || [{ regularHours: "0:00", overtimeHours: "0:00" }];
  });

  // State for calculated results
  const [results, setResults] = useState({
    totalRegularHours: "0:00",
    totalOvertimeHours: "0:00",
    estimatedGrossSalary: 0,
    estimatedPension: 0,
    estimatedTax: 0,
    estimatedNetSalary: 0,
  });

  // Effect to adjust hours registration when number of weeks changes
  useEffect(() => {
    const newHoursPerWeek = [];
    for (let i = 0; i < config.numberOfWeeks; i++) {
      newHoursPerWeek.push({
        regularHours: hoursPerWeek[i]?.regularHours || "0:00",
        overtimeHours: hoursPerWeek[i]?.overtimeHours || "0:00",
      });
    }
    setHoursPerWeek(newHoursPerWeek);
  }, [config.numberOfWeeks]);

  // Effect to recalculate salary when configuration or hours change
  useEffect(() => {
    const newResults = calculateSalary(config, hoursPerWeek);
    setResults(newResults);
  }, [config, hoursPerWeek]);

  // Effect to save config to local storage when it changes
  useEffect(() => {
    saveConfig(config);
  }, [config]);

  // Effect to save hours to local storage when they change
  useEffect(() => {
    saveHours(hoursPerWeek);
  }, [hoursPerWeek]);

  // Effect to save language to local storage when it changes
  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  // Function to update configuration
  const updateConfig = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  // Function to update hours per week
  const updateHoursPerWeek = (weekIndex, field, value) => {
    setHoursPerWeek((prev) => {
      const newHours = [...prev];
      newHours[weekIndex] = {
        ...newHours[weekIndex],
        [field]: value,
      };
      return newHours;
    });
  };

  // Function to handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-white font-inter safe-area-top safe-area-bottom">
      {/* Header component */}
      <Header language={language} onLanguageChange={handleLanguageChange} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Choose layout based on screen size */}
        {isMobile ? (
          <MobileLayout
            config={config}
            updateConfig={updateConfig}
            results={results}
            hoursPerWeek={hoursPerWeek}
            updateHoursPerWeek={updateHoursPerWeek}
            language={language}
          />
        ) : (
          <DesktopLayout
            config={config}
            updateConfig={updateConfig}
            results={results}
            hoursPerWeek={hoursPerWeek}
            updateHoursPerWeek={updateHoursPerWeek}
            language={language}
          />
        )}
      </div>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt language={language} />
    </div>
  );
}

export default App;
