import React from "react";
import Configuration from "./Configuration";
import Results from "./Results";
import HoursRegistration from "./HoursRegistration";
import Footer from "./Footer";

// Mobile Layout component - Logical flow: Config → Hours → Results
const MobileLayout = ({
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
