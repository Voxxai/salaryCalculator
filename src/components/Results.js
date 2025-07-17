import React from "react";
import { getTranslation } from "../utils/translations";

// Results component - Displays all calculated salary information
const Results = ({ results, language }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
        {getTranslation("results", language)}
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {/* Total hours overview */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">
              {getTranslation("totalRegularHours", language)}
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900">
              {results.totalRegularHours}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">
              {getTranslation("totalOvertimeHours", language)}
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900">
              {results.totalOvertimeHours}
            </p>
          </div>
        </div>

        {/* Gross salary */}
        <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-blue-200">
          <p className="text-xs sm:text-sm text-blue-700">
            {getTranslation("estimatedGrossSalary", language)}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-blue-900">
            € {results.estimatedGrossSalary.toFixed(2)}
          </p>
        </div>

        {/* Deductions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-red-200">
            <p className="text-xs sm:text-sm text-red-700">
              {getTranslation("estimatedPension", language)}
            </p>
            <p className="text-base sm:text-lg font-semibold text-red-900">
              € {results.estimatedPension.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-red-200">
            <p className="text-xs sm:text-sm text-red-700">
              {getTranslation("estimatedTax", language)}
            </p>
            <p className="text-base sm:text-lg font-semibold text-red-900">
              € {results.estimatedTax.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Net salary */}
        <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-green-200">
          <p className="text-xs sm:text-sm text-green-700">
            {getTranslation("estimatedNetSalary", language)}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-green-900">
            € {results.estimatedNetSalary.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
