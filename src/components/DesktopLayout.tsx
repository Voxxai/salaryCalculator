'use client';

import React from "react";
import Configuration from "./Configuration";
import Results from "./Results";
import ShiftRegistration from "./ShiftRegistration";
import Footer from "./Footer";
import {
  Config,
  Results as ResultsType,
  WeekShifts,
  Language,
  UpdateConfigFunction,
  AddShiftFunction,
  UpdateShiftFunction,
  DeleteShiftFunction,
  CopyWeekFunction,
} from "../types";

interface DesktopLayoutProps {
  config: Config;
  updateConfig: UpdateConfigFunction;
  results: ResultsType;
  weekShifts: WeekShifts[];
  addShift: AddShiftFunction;
  updateShift: UpdateShiftFunction;
  deleteShift: DeleteShiftFunction;
  copyWeek: CopyWeekFunction;
  language: Language;
}

// Desktop Layout component - Optimized for large screens
const DesktopLayout: React.FC<DesktopLayoutProps> = React.memo(
  ({
    config,
    updateConfig,
    results,
    weekShifts,
    addShift,
    updateShift,
    deleteShift,
    copyWeek,
    language,
  }) => {
    return (
      <>
        {/* Top section: Configuration and Results side by side with equal width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Configuration component */}
          <Configuration
            config={config}
            updateConfig={updateConfig}
            language={language}
          />

          {/* Results component */}
          <Results results={results} language={language} />
        </div>

        {/* Registration component - full width below */}
        <div className="mt-6 lg:mt-8">
          <ShiftRegistration
            weekShifts={weekShifts}
            addShift={addShift}
            updateShift={updateShift}
            deleteShift={deleteShift}
            copyWeek={copyWeek}
            language={language}
            ageGroup={config.ageGroup}
          />
        </div>

        {/* Footer component */}
        <Footer language={language} />
      </>
    );
  }
);

DesktopLayout.displayName = "DesktopLayout";

export default DesktopLayout;
