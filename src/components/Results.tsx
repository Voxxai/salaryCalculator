import React from "react";
import { getTranslation } from "../utils/translations";
import { Results as ResultsType, Language } from "../types";
import { ChartIcon, WarningIcon } from "./Icons";

interface ResultsProps {
  results: ResultsType;
  language: Language;
}

// Results component - Displays only the final net salary result
const Results: React.FC<ResultsProps> = React.memo(({ results, language }) => {
  return (
    <div
      className="card flex flex-col h-full"
      role="region"
      aria-labelledby="results-heading"
    >
      <h2
        id="results-heading"
        className="text-lg sm:text-xl font-medium text-gray-900 mb-6 text-center flex items-center justify-center gap-2"
      >
        <ChartIcon className="text-blue-500" size={24} />
        {getTranslation("results", language)}
      </h2>

      <div className="space-y-6 flex-grow flex flex-col justify-center">
        {/* Net salary - Het hoofdresultaat */}
        <div
          className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center"
          role="status"
        >
          <p className="text-sm text-gray-600 mb-2">
            {getTranslation("estimatedNetSalary", language)}
          </p>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
            € {results.estimatedNetSalary.toFixed(2)}
          </p>
        </div>

        {/* Disclaimer direct onder het resultaat voor maximale duidelijkheid */}
        <div
          className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2"
          role="note"
        >
          <WarningIcon className="text-amber-600 flex-shrink-0" size={16} />
          <p className="text-amber-800 font-medium leading-relaxed text-sm">
            {getTranslation("disclaimer", language)}
          </p>
        </div>

        {/* Privacy Notice - Removed as it's unnecessary for a local app */}
      </div>
    </div>
  );
});

Results.displayName = "Results";

export default Results;
