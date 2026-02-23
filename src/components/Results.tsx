'use client';

import React, { useMemo } from "react";
import { getTranslation } from "../utils/translations";
import { Results as ResultsType, Language } from "../types";
import { getPeriodStatus, formatFullDate } from "../utils/periods";
import { ChartIcon, WarningIcon } from "./Icons";

interface ResultsProps {
  results: ResultsType;
  language: Language;
}

// Results component - Displays only the final net salary result
const Results: React.FC<ResultsProps> = React.memo(({ results, language }) => {
  const periodStatus = useMemo(() => getPeriodStatus(), []);
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

        {/* Expected Payout Date */}
        {periodStatus.pendingPayout ? (
          <div className="space-y-3">
            <div
              className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
              role="status"
            >
              <p className="text-sm text-green-700 mb-1">
                Eerstvolgende uitbetaling (periode{" "}
                {periodStatus.pendingPayout.periodNumber})
              </p>
              <p className="text-lg font-semibold text-green-900">
                {formatFullDate(periodStatus.pendingPayout.payoutDate, "nl-NL")}
              </p>
            </div>
            <div
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center"
              role="status"
            >
              <p className="text-xs text-gray-600 mb-1">Huidige werkperiode</p>
              <p className="text-sm text-gray-800 font-medium">
                Periode {periodStatus.currentPeriod.periodNumber} - uitbetaling
                op{" "}
                {formatFullDate(periodStatus.currentPeriod.payoutDate, "nl-NL")}
              </p>
            </div>
          </div>
        ) : (
          <div
            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
            role="status"
          >
            <p className="text-sm text-green-700 mb-1">Volgende uitbetaling</p>
            <p className="text-lg font-semibold text-green-900">
              {formatFullDate(periodStatus.currentPeriod.payoutDate, "nl-NL")}
            </p>
          </div>
        )}

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
