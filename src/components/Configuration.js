import React from "react";
import { getTranslation } from "../utils/translations";

// Configuration component - Manages all settings
const Configuration = ({ config, updateConfig, language }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
        {getTranslation("configuration", language)}
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {/* All-in Hourly Rate - ONLY EDITABLE FIELD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {getTranslation("hourlyRate", language)}
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={config.allInHourlyRate}
            onChange={(e) => updateConfig("allInHourlyRate", e.target.value)}
            className="w-full px-3 py-3 sm:py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 touch-target"
            inputMode="decimal"
          />
        </div>

        {/* Overtime Percentage - FIXED */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            {getTranslation("overtimePercentage", language)}
          </label>
          <div className="w-full px-3 py-3 sm:py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700">
            {config.overtimePercentage}%
          </div>
        </div>

        {/* Number of Weeks - FIXED */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            {getTranslation("numberOfWeeks", language)}
          </label>
          <div className="w-full px-3 py-3 sm:py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700">
            {config.numberOfWeeks} {getTranslation("weeks", language)}
          </div>
        </div>

        {/* Pension/SPAWW Percentage - FIXED */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            {getTranslation("pensionPercentage", language)}
          </label>
          <div className="w-full px-3 py-3 sm:py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700">
            {config.pensionPercentage}%
          </div>
        </div>

        {/* Tax/WGA Percentage - FIXED */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            {getTranslation("estimatedTax", language)}
          </label>
          <div className="w-full px-3 py-3 sm:py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700">
            {config.taxPercentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
