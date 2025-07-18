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

// Import types
import {
  Config,
  WeekHours,
  Results,
  Language,
  UpdateConfigFunction,
  UpdateHoursPerWeekFunction,
  HandleLanguageChangeFunction,
} from "./types";

function App(): JSX.Element {
  // State for language selection (load from storage)
  const [language, setLanguage] = useState<Language>(() => loadLanguage());

  // Detect screen size for layout selection
  const { isMobile } = useScreenSize();

  // State for configuration settings (load from storage)
  const [config, setConfig] = useState<Config>(() => {
    const savedConfig = loadConfig();
    return (
      savedConfig || {
        allInHourlyRate: 19.18, // All-in hourly rate in euros
        ageGroup: "21+", // Age group for function-based rates (default to highest rate)
        jobFunction: "vakkenvuller", // Job function (vakkenvuller or shiftleader)
        yearsOfService: 0, // Years of service for shiftleader
        useFunctionBasedRate: false, // Whether to use function-based rate or custom rate
        overtimePercentage: 50, // Overtime percentage (e.g. 50 for 50%)
        numberOfWeeks: 4, // Number of weeks in salary period
        percentagePensioenPremie: 1.59, // Pensioen premie percentage (2025)
        percentageSpaww: 0.1, // SPAWW.nl percentage (2025)
        percentagePremieWGAWerknemer: 0.47, // Premie WGA werknemer percentage (2025)
        percentageLoonheffing: 7.81, // Loonheffing percentage (2025 - OPTIONAL)
      }
    );
  });

  // State for hours registration per week (load from storage)
  const [hoursPerWeek, setHoursPerWeek] = useState<WeekHours[]>(() => {
    const savedHours = loadHours();
    return (
      savedHours || [
        {
          regularHours: "0:00",
          paidBreaks: "0:00",
          allowance25: "0:00",
          allowance50: "0:00",
          allowance100: "0:00",
        },
      ]
    );
  });

  // State for calculated results
  const [results, setResults] = useState<Results>({
    totalRegularHours: "0:00",
    totalPaidBreaks: "0:00",
    totalAllowance25: "0:00",
    totalAllowance50: "0:00",
    totalAllowance100: "0:00",
    estimatedGrossSalary: 0,
    estimatedPensioenPremie: 0,
    estimatedSpaww: 0,
    estimatedPremieWGAWerknemer: 0,
    estimatedLoonheffing: 0,
    estimatedNetSalary: 0,
  });

  // Effect to adjust hours registration when number of weeks changes
  useEffect(() => {
    const newHoursPerWeek: WeekHours[] = [];
    for (let i = 0; i < config.numberOfWeeks; i++) {
      newHoursPerWeek.push({
        regularHours: hoursPerWeek[i]?.regularHours || "0:00",
        paidBreaks: hoursPerWeek[i]?.paidBreaks || "0:00",
        allowance25: hoursPerWeek[i]?.allowance25 || "0:00",
        allowance50: hoursPerWeek[i]?.allowance50 || "0:00",
        allowance100: hoursPerWeek[i]?.allowance100 || "0:00",
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
  const updateConfig: UpdateConfigFunction = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to update hours per week
  const updateHoursPerWeek: UpdateHoursPerWeekFunction = (
    weekIndex,
    field,
    value
  ) => {
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
  const handleLanguageChange: HandleLanguageChangeFunction = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header component */}
      <Header language={language} onLanguageChange={handleLanguageChange} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
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
