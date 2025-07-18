import React from "react";
import Configuration from "./Configuration";
import Results from "./Results";
import HoursRegistration from "./HoursRegistration";
import Footer from "./Footer";
import {
  Config,
  Results as ResultsType,
  WeekHours,
  Language,
  UpdateConfigFunction,
  UpdateHoursPerWeekFunction,
} from "../types";

interface MobileLayoutProps {
  config: Config;
  updateConfig: UpdateConfigFunction;
  results: ResultsType;
  hoursPerWeek: WeekHours[];
  updateHoursPerWeek: UpdateHoursPerWeekFunction;
  language: Language;
}

// Mobile Layout component - Logical flow: Config → Hours → Results
const MobileLayout: React.FC<MobileLayoutProps> = ({
  config,
  updateConfig,
  results,
  hoursPerWeek,
  updateHoursPerWeek,
  language,
}) => {
  return (
    <>
      {/* Logical mobile flow: Configuration first */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Configuration component */}
        <Configuration
          config={config}
          updateConfig={updateConfig}
          language={language}
        />

        {/* Hours registration component */}
        <HoursRegistration
          hoursPerWeek={hoursPerWeek}
          updateHoursPerWeek={updateHoursPerWeek}
          language={language}
        />

        {/* Results component */}
        <Results results={results} language={language} />
      </div>

      {/* Footer component */}
      <Footer language={language} />
    </>
  );
};

export default MobileLayout;
