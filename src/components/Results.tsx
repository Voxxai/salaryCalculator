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
    <div className="bg-white rounded-xl shadow-lg border border-blue-200 p-6 lg:p-8">
      <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-6 flex items-center">
        {getTranslation("results", language)}
      </h2>

      <div className="space-y-6">
        {/* Net salary - ONLY VISIBLE RESULT */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border-2 border-orange-300">
          <p className="text-sm text-orange-700 mb-2">
            {getTranslation("estimatedNetSalary", language)}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-orange-900">
            € {results.estimatedNetSalary.toFixed(2)}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            ⚠️ {getTranslation("disclaimer", language)}
          </p>
        </div>

        {/* Hidden intermediate calculations - used for calculations but not displayed */}
        {/* Total Regular Hours: {results.totalRegularHours} */}
        {/* Total Overtime Hours: {results.totalOvertimeHours} */}
        {/* Gross Salary: € {results.estimatedGrossSalary.toFixed(2)} */}
        {/* Pension Deduction: € {results.estimatedPension.toFixed(2)} */}
        {/* Tax Deduction: € {results.estimatedTax.toFixed(2)} */}
      </div>
    </div>
  );
};

export default Results;
