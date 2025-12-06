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

interface MobileLayoutProps {
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

// Mobile Layout component - Logical flow: Config → Registration → Results
const MobileLayout: React.FC<MobileLayoutProps> = React.memo(
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
        {/* Logical mobile flow: Configuration first */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Configuration component */}
          <Configuration
            config={config}
            updateConfig={updateConfig}
            language={language}
          />

          {/* Registration component */}
          <ShiftRegistration
            weekShifts={weekShifts}
            addShift={addShift}
            updateShift={updateShift}
            deleteShift={deleteShift}
            copyWeek={copyWeek}
            language={language}
            ageGroup={config.ageGroup}
          />

          {/* Results component */}
          <Results results={results} language={language} />
        </div>

        {/* Footer component */}
        <Footer language={language} />
      </>
    );
  }
);

MobileLayout.displayName = "MobileLayout";

export default MobileLayout;
