import React, { useMemo, useCallback } from "react";
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
const Configuration: React.FC<ConfigurationProps> = React.memo(
  ({ config, updateConfig, language }) => {
    const handleReset = useCallback((): void => {
      if (
        window.confirm(
          "Weet je zeker dat je alle instellingen wilt resetten? Dit zal de app herladen."
        )
      ) {
        clearAllData();
        window.location.reload();
      }
    }, []);

    // Memoize the selected hourly rate calculation
    const selectedHourlyRate = useMemo(() => {
      return config.useFunctionBasedRate
        ? getHourlyRate(
            config.jobFunction,
            config.ageGroup,
            config.yearsOfService
          )
        : config.allInHourlyRate;
    }, [
      config.useFunctionBasedRate,
      config.jobFunction,
      config.ageGroup,
      config.yearsOfService,
      config.allInHourlyRate,
    ]);

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
      updateConfig,
    ]);

    // Auto-switch to vakkenvuller if shiftleader is not available for selected age group
    React.useEffect(() => {
      if (
        config.jobFunction === "shiftleader" &&
        AGE_GROUPS_WITHOUT_SHIFTLEADER.includes(config.ageGroup as any)
      ) {
        updateConfig("jobFunction", "vakkenvuller");
      }
    }, [config.ageGroup, config.jobFunction, updateConfig]);

    const handleRateTypeChange = useCallback(
      (isFunctionBased: boolean): void => {
        updateConfig("useFunctionBasedRate", isFunctionBased);
      },
      [updateConfig]
    );

    return (
      <div className="bg-white rounded-xl shadow-xl border border-blue-200 p-6 lg:p-8">
        <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-6 flex items-center text-center justify-center">
          {getTranslation("configuration", language)}
        </h2>

        <div className="space-y-6">
          {/* Function-based or Custom Rate Selection */}
          <div className="text-center">
            <div className="text-xs text-blue-600 mb-4 bg-blue-100 p-2 rounded border border-blue-200">
              {getTranslation("allInRatesInfo", language)}
            </div>

            <div className="space-y-4">
              {/* Beautiful Radio Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer text-center ${
                    config.useFunctionBasedRate === true
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                  onClick={() => handleRateTypeChange(true)}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-200 ${
                        config.useFunctionBasedRate === true
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {config.useFunctionBasedRate === true && (
                        <div className="w-2 h-2 rounded-full bg-white transition-all duration-200"></div>
                      )}
                    </div>
                    <div className="text-center">
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
                  className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer text-center ${
                    config.useFunctionBasedRate === false
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                  onClick={() => handleRateTypeChange(false)}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-200 ${
                        config.useFunctionBasedRate === false
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {config.useFunctionBasedRate === false && (
                        <div className="w-2 h-2 rounded-full bg-white transition-all duration-200"></div>
                      )}
                    </div>
                    <div className="text-center">
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
                <div className="space-y-4">
                  {/* Age Group Selection */}
                  <div>
                    <label
                      htmlFor="age-group"
                      className="block text-sm font-medium text-gray-700 mb-2 text-center"
                    >
                      {getTranslation("ageGroup", language)}
                    </label>
                    <div className="flex justify-center">
                      <select
                        id="age-group"
                        value={config.ageGroup}
                        onChange={e => updateConfig("ageGroup", e.target.value)}
                        className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                      >
                        {getAgeGroups().map(age => (
                          <option key={age} value={age}>
                            {age} {getTranslation("years", language)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Job Function Selection */}
                  <div>
                    <label
                      htmlFor="job-function"
                      className="block text-sm font-medium text-gray-700 mb-2 text-center"
                    >
                      {getTranslation("jobFunction", language)}
                    </label>
                    <div className="flex justify-center">
                      <select
                        id="job-function"
                        value={config.jobFunction}
                        onChange={e =>
                          updateConfig("jobFunction", e.target.value)
                        }
                        className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                      >
                        {getJobFunctions(config.ageGroup).map(func => (
                          <option key={func} value={func}>
                            {getTranslation(func, language)}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Show warning for shiftleader availability */}
                    {config.ageGroup === "13-15" ||
                    config.ageGroup === "16" ||
                    config.ageGroup === "17" ? (
                      <div
                        className="text-xs text-orange-600 mt-2 bg-orange-50 p-2 rounded border border-orange-200 text-center"
                        role="alert"
                      >
                        {getTranslation("shiftleaderWarning", language)}
                      </div>
                    ) : null}
                  </div>

                  {/* Years of Service (only for shiftleader) */}
                  {config.jobFunction === "shiftleader" && (
                    <div>
                      <label
                        htmlFor="years-service"
                        className="block text-sm font-medium text-gray-700 mb-2 text-center"
                      >
                        {getTranslation("yearsOfService", language)}
                      </label>
                      <div className="flex justify-center">
                        <select
                          id="years-service"
                          value={config.yearsOfService}
                          onChange={e =>
                            updateConfig(
                              "yearsOfService",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                        >
                          {getYearsOfServiceOptions(
                            config.ageGroup,
                            language
                          ).map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Selected Rate Display */}
                  <div
                    className="bg-green-50 p-4 rounded-lg border border-green-200 text-center"
                    role="status"
                  >
                    <div className="text-sm text-green-700 font-medium mb-2">
                      {getTranslation("selectedRate", language)}:
                    </div>
                    <div className="text-xl font-bold text-green-900">
                      € {selectedHourlyRate.toFixed(2)}
                    </div>
                  </div>
                </div>
              ) : (
                /* Custom Rate Input */
                <div>
                  <label
                    htmlFor="custom-rate"
                    className="block text-sm font-medium text-gray-700 mb-2 text-center"
                  >
                    {getTranslation("hourlyRate", language)}
                  </label>
                  <div className="flex justify-center">
                    <input
                      id="custom-rate"
                      type="number"
                      step="0.01"
                      min="0"
                      value={config.allInHourlyRate}
                      onChange={e =>
                        updateConfig(
                          "allInHourlyRate",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                      placeholder="0.00"
                    />
                  </div>
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
  }
);

Configuration.displayName = "Configuration";

export default Configuration;
