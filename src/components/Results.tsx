import React from "react";
import { getTranslation } from "../utils/translations";
import { Results as ResultsType, Language } from "../types";

interface ResultsProps {
  results: ResultsType;
  language: Language;
}

// Results component - Displays only the final net salary result
const Results: React.FC<ResultsProps> = ({ results, language }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-blue-200 p-6 lg:p-8 flex flex-col h-full"
      role="region"
      aria-labelledby="results-heading"
    >
      <h2
        id="results-heading"
        className="text-lg sm:text-xl font-semibold text-blue-800 mb-6 flex items-center"
      >
        {getTranslation("results", language)}
      </h2>

      <div className="space-y-6 flex-grow flex flex-col justify-center">
        {/* Net salary - Het hoofdresultaat */}
        <div
          className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border-2 border-orange-300 text-center"
          role="status"
        >
          <p className="text-sm text-orange-700 mb-2">
            {getTranslation("estimatedNetSalary", language)}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-orange-900">
            € {results.estimatedNetSalary.toFixed(2)}
          </p>
        </div>

        {/* Disclaimer direct onder het resultaat voor maximale duidelijkheid */}
        <div
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4"
          role="note"
        >
          <p className="text-yellow-800 font-medium leading-relaxed text-xs text-center">
            {getTranslation("disclaimer", language)}
          </p>
        </div>

        {/* Privacy Notice */}
        <div
          className="bg-blue-50 border border-blue-200 rounded-lg p-3"
          role="note"
        >
          <p className="text-blue-800 font-medium leading-relaxed text-xs text-center">
            {getTranslation("privacyDisclaimer", language)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
