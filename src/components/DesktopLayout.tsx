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

interface DesktopLayoutProps {
  config: Config;
  updateConfig: UpdateConfigFunction;
  results: ResultsType;
  hoursPerWeek: WeekHours[];
  updateHoursPerWeek: UpdateHoursPerWeekFunction;
  language: Language;
}

// Desktop Layout component - Optimized for large screens
const DesktopLayout: React.FC<DesktopLayoutProps> = React.memo(
  ({
    config,
    updateConfig,
    results,
    hoursPerWeek,
    updateHoursPerWeek,
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

        {/* Hours registration component - full width below */}
        <div className="mt-8 lg:mt-10">
          <HoursRegistration
            hoursPerWeek={hoursPerWeek}
            updateHoursPerWeek={updateHoursPerWeek}
            language={language}
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
