import React from "react";
import { getTranslation } from "../utils/translations";
import { clearAllData } from "../utils/storage";
import {
  getHourlyRate,
  getAgeGroups,
  getJobFunctions,
  getYearsOfServiceOptions,
} from "../utils/hourlyRates";
import { Config, Language, UpdateConfigFunction } from "../types";
import { AGE_GROUPS_WITHOUT_SHIFTLEADER } from "../constants";

interface ConfigurationProps {
  config: Config;
  updateConfig: UpdateConfigFunction;
  language: Language;
}

// Configuration component - Manages all settings
const Configuration: React.FC<ConfigurationProps> = ({
  config,
  updateConfig,
  language,
}) => {
  const handleReset = (): void => {
    if (
      window.confirm(
        "Weet je zeker dat je alle instellingen wilt resetten? Dit zal de app herladen."
      )
    ) {
      clearAllData();
      window.location.reload();
    }
  };

  // Calculate the selected hourly rate
  const selectedHourlyRate = config.useFunctionBasedRate
    ? getHourlyRate(config.jobFunction, config.ageGroup, config.yearsOfService)
    : config.allInHourlyRate;

  // Update the hourly rate when function-based selection changes
  React.useEffect(() => {
    if (config.useFunctionBasedRate) {
      const newRate = getHourlyRate(
        config.jobFunction,
        config.ageGroup,
        config.yearsOfService
      );
      updateConfig("allInHourlyRate", newRate);
    }
  }, [
    config.useFunctionBasedRate,
    config.jobFunction,
    config.ageGroup,
    config.yearsOfService,
  ]);

  // Auto-switch to vakkenvuller if shiftleader is not available for selected age group
  React.useEffect(() => {
    if (
      config.jobFunction === "shiftleader" &&
      AGE_GROUPS_WITHOUT_SHIFTLEADER.includes(config.ageGroup as any)
    ) {
      updateConfig("jobFunction", "vakkenvuller");
    }
  }, [config.ageGroup, config.jobFunction]);

  const handleRateTypeChange = (isFunctionBased: boolean): void => {
    updateConfig("useFunctionBasedRate", isFunctionBased);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-200 p-6 lg:p-8">
      <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-6 flex items-center">
        {getTranslation("configuration", language)}
      </h2>

      <div className="space-y-6">
        {/* Function-based or Custom Rate Selection */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800 mb-3">
            {getTranslation("selectFunction", language)}
          </h3>
          <div className="text-xs text-blue-600 mb-3 bg-blue-100 p-2 rounded border border-blue-200">
            {getTranslation("allInRatesInfo", language)}
          </div>

          <div className="space-y-4">
            {/* Beautiful Radio Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  config.useFunctionBasedRate === true
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
                onClick={() => handleRateTypeChange(true)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200 ${
                      config.useFunctionBasedRate === true
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {config.useFunctionBasedRate === true && (
                      <div className="w-2 h-2 rounded-full bg-white transition-all duration-200"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {getTranslation("functionBased", language)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getTranslation("automaticCalculation", language)}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  config.useFunctionBasedRate === false
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
                onClick={() => handleRateTypeChange(false)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200 ${
                      config.useFunctionBasedRate === false
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {config.useFunctionBasedRate === false && (
                      <div className="w-2 h-2 rounded-full bg-white transition-all duration-200"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {getTranslation("customHourlyRate", language)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getTranslation("manualInput", language)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {config.useFunctionBasedRate ? (
              <div className="space-y-3">
                {/* Age Group Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation("ageGroup", language)}
                  </label>
                  <select
                    value={config.ageGroup}
                    onChange={e => updateConfig("ageGroup", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {getAgeGroups().map(age => (
                      <option key={age} value={age}>
                        {age} {getTranslation("years", language)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Function Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation("jobFunction", language)}
                  </label>
                  <select
                    value={config.jobFunction}
                    onChange={e => updateConfig("jobFunction", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {getJobFunctions(config.ageGroup).map(func => (
                      <option key={func} value={func}>
                        {getTranslation(func, language)}
                      </option>
                    ))}
                  </select>
                  {/* Show warning for shiftleader availability */}
                  {config.ageGroup === "13-15" ||
                  config.ageGroup === "16" ||
                  config.ageGroup === "17" ? (
                    <div className="text-xs text-orange-600 mt-1 bg-orange-50 p-2 rounded border border-orange-200">
                      {getTranslation("shiftleaderWarning", language)}
                    </div>
                  ) : null}
                </div>

                {/* Years of Service (only for shiftleader) */}
                {config.jobFunction === "shiftleader" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getTranslation("yearsOfService", language)}
                    </label>
                    <select
                      value={config.yearsOfService}
                      onChange={e =>
                        updateConfig("yearsOfService", parseInt(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {getYearsOfServiceOptions(config.ageGroup, language).map(
                        option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

                {/* Selected Rate Display */}
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">
                    {getTranslation("selectedRate", language)}:
                  </div>
                  <div className="text-lg font-bold text-green-900">
                    € {selectedHourlyRate.toFixed(2)}
                  </div>
                </div>
              </div>
            ) : (
              /* Custom Rate Input */
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation("hourlyRate", language)}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={config.allInHourlyRate}
                  onChange={e =>
                    updateConfig("allInHourlyRate", e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 touch-target text-lg"
                  inputMode="decimal"
                />
              </div>
            )}
          </div>
        </div>

        {/* Hidden fixed values - used for calculations but not displayed */}
        {/* 2025 Aftrekposten Percentages (hidden but used in calculations):
            - Pensioen premie: {config.percentagePensioenPremie?.toFixed(2) || "1.59"}%
            - SPAWW.nl: {config.percentageSpaww?.toFixed(2) || "0.10"}%
            - Premie WGA werknemer: {config.percentagePremieWGAWerknemer?.toFixed(2) || "0.47"}%
            - Loonheffing: {config.percentageLoonheffing?.toFixed(2) || "7.81"}% (indicatie)
        */}

        {/* Reset Button */}
        <div className="pt-2">
          <button
            onClick={handleReset}
            className="w-full px-4 py-3 text-sm text-red-600 border-2 border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            {getTranslation("resetAllSettings", language)}
          </button>
        </div>

        {/* Hidden fixed values - used for calculations but not displayed */}
        {/* Overtime Percentage: {config.overtimePercentage}% */}
        {/* Number of Weeks: {config.numberOfWeeks} */}
        {/* Aftrekposten percentages worden automatisch toegepast in de berekeningen */}
      </div>
    </div>
  );
};

export default Configuration;
