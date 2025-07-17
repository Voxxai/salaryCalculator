import React from "react";
import Configuration from "./Configuration";
import Results from "./Results";
import HoursRegistration from "./HoursRegistration";
import Footer from "./Footer";

// Desktop Layout component - Side by side configuration and results
const DesktopLayout = ({
  config,
  updateConfig,
  results,
  hoursPerWeek,
  updateHoursPerWeek,
  language,
}) => {
  return (
    <>
      {/* Configuration and Results side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Configuration component */}
        <Configuration
          config={config}
          updateConfig={updateConfig}
          language={language}
        />

        {/* Results component */}
        <Results results={results} language={language} />
      </div>

      {/* Hours registration component below */}
      <div className="mt-6 sm:mt-8 lg:mt-8">
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
};

export default DesktopLayout;
