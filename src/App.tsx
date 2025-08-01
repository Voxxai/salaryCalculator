import React, { useState, useEffect, useMemo, useCallback } from "react";

// Import all components
import Header from "./components/Header";
import DesktopLayout from "./components/DesktopLayout";
import MobileLayout from "./components/MobileLayout";
import ErrorBoundary from "./components/ErrorBoundary";

// Import custom hooks
import { useScreenSize } from "./hooks/useScreenSize";

// Import utility functions
import { calculateSalaryFromShifts } from "./utils/calculations";
import {
  saveConfig,
  loadConfig,
  saveShifts,
  loadShifts,
} from "./utils/storage";
import { DEFAULT_CONFIG } from "./constants";

// Import types
import {
  Config,
  WeekShifts,
  Results,
  Language,
  UpdateConfigFunction,
  AddShiftFunction,
  UpdateShiftFunction,
  DeleteShiftFunction,
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

  // State for shifts per week (load from storage)
  const [weekShifts, setWeekShifts] = useState<WeekShifts[]>(() => {
    const savedShifts = loadShifts();
    return (
      savedShifts ||
      Array.from({ length: config.numberOfWeeks }, (_, i) => ({
        weekNumber: i + 1,
        shifts: [],
      }))
    );
  });

  // Memoize the salary calculation to prevent unnecessary recalculations
  const results = useMemo(() => {
    return calculateSalaryFromShifts(config, weekShifts);
  }, [config, weekShifts]);

  // Effect to adjust shifts when number of weeks changes
  useEffect(() => {
    if (weekShifts.length !== config.numberOfWeeks) {
      const newWeekShifts: WeekShifts[] = [];
      for (let i = 0; i < config.numberOfWeeks; i++) {
        newWeekShifts.push({
          weekNumber: i + 1,
          shifts: weekShifts[i]?.shifts || [],
        });
      }
      setWeekShifts(newWeekShifts);
    }
  }, [config.numberOfWeeks, weekShifts.length]);

  // Effect to save config to local storage when it changes
  useEffect(() => {
    saveConfig(config);
  }, [config]);

  // Effect to save shifts to local storage when they change
  useEffect(() => {
    saveShifts(weekShifts);
  }, [weekShifts]);

  // Memoize update functions to prevent unnecessary re-renders
  const updateConfig: UpdateConfigFunction = useCallback((field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Shift management functions
  const addShift: AddShiftFunction = useCallback((weekIndex, shift) => {
    setWeekShifts(prev => {
      const newShifts = [...prev];
      newShifts[weekIndex] = {
        ...newShifts[weekIndex],
        shifts: [...newShifts[weekIndex].shifts, shift],
      };
      return newShifts;
    });
  }, []);

  const updateShift: UpdateShiftFunction = useCallback(
    (weekIndex, shiftId, updatedShift) => {
      setWeekShifts(prev => {
        const newShifts = [...prev];
        newShifts[weekIndex] = {
          ...newShifts[weekIndex],
          shifts: newShifts[weekIndex].shifts.map(shift =>
            shift.id === shiftId ? { ...shift, ...updatedShift } : shift
          ),
        };
        return newShifts;
      });
    },
    []
  );

  const deleteShift: DeleteShiftFunction = useCallback((weekIndex, shiftId) => {
    setWeekShifts(prev => {
      const newShifts = [...prev];
      newShifts[weekIndex] = {
        ...newShifts[weekIndex],
        shifts: newShifts[weekIndex].shifts.filter(
          shift => shift.id !== shiftId
        ),
      };
      return newShifts;
    });
  }, []);

  return (
    <ErrorBoundary language={language}>
      <div className="min-h-screen bg-gray-50 font-inter">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Header component */}
        <Header language={language} />

        <div
          id="main-content"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
        >
          {/* Choose layout based on screen size */}
          {isMobile ? (
            <MobileLayout
              config={config}
              updateConfig={updateConfig}
              results={results}
              weekShifts={weekShifts}
              addShift={addShift}
              updateShift={updateShift}
              deleteShift={deleteShift}
              language={language}
            />
          ) : (
            <DesktopLayout
              config={config}
              updateConfig={updateConfig}
              results={results}
              weekShifts={weekShifts}
              addShift={addShift}
              updateShift={updateShift}
              deleteShift={deleteShift}
              language={language}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
