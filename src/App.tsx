import React, { useState, useEffect, useMemo, useCallback } from "react";

// Import all components
import Header from "./components/Header";
import DesktopLayout from "./components/DesktopLayout";
import MobileLayout from "./components/MobileLayout";
import ErrorBoundary from "./components/ErrorBoundary";

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
import { DEFAULT_CONFIG, DEFAULT_WEEK_HOURS } from "./constants";

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
  // State for language selection (always Dutch)
  const [language, setLanguage] = useState<Language>("nl");

  // Detect screen size for layout selection
  const { isMobile } = useScreenSize();

  // State for configuration settings (load from storage)
  const [config, setConfig] = useState<Config>(() => {
    const savedConfig = loadConfig();
    return savedConfig || DEFAULT_CONFIG;
  });

  // State for hours registration per week (load from storage)
  const [hoursPerWeek, setHoursPerWeek] = useState<WeekHours[]>(() => {
    const savedHours = loadHours();
    return savedHours || [DEFAULT_WEEK_HOURS];
  });

  // Memoize the salary calculation to prevent unnecessary recalculations
  const results = useMemo(() => {
    return calculateSalary(config, hoursPerWeek);
  }, [config, hoursPerWeek]);

  // Effect to adjust hours registration when number of weeks changes
  useEffect(() => {
    if (hoursPerWeek.length !== config.numberOfWeeks) {
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
    }
  }, [config.numberOfWeeks, hoursPerWeek.length]);

  // Effect to save config to local storage when it changes
  useEffect(() => {
    saveConfig(config);
  }, [config]);

  // Effect to save hours to local storage when they change
  useEffect(() => {
    saveHours(hoursPerWeek);
  }, [hoursPerWeek]);



  // Memoize update functions to prevent unnecessary re-renders
  const updateConfig: UpdateConfigFunction = useCallback((field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateHoursPerWeek: UpdateHoursPerWeekFunction = useCallback(
    (weekIndex, field, value) => {
      setHoursPerWeek(prev => {
        const newHours = [...prev];
        newHours[weekIndex] = {
          ...newHours[weekIndex],
          [field]: value,
        };
        return newHours;
      });
    },
    []
  );

  const handleLanguageChange: HandleLanguageChangeFunction = useCallback(
    newLanguage => {
      setLanguage(newLanguage);
    },
    []
  );

  return (
    <ErrorBoundary language={language}>
      <div className="min-h-screen bg-gray-50 font-inter">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Header component */}
        <Header language={language} onLanguageChange={handleLanguageChange} />

        <div
          id="main-content"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
        >
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
      </div>
    </ErrorBoundary>
  );
}

export default App;
