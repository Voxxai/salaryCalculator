import React from "react";
import { getTranslation } from "../utils/translations";
import TimeSelector from "./TimeSelector";

// Hours Registration component - Manages weekly hours input
const HoursRegistration = ({ hoursPerWeek, updateHoursPerWeek, language }) => {
  return (
    <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
        {getTranslation("hoursRegistration", language)}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {hoursPerWeek.map((week, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200"
          >
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {getTranslation("week", language)} {index + 1}
            </h3>

            <div className="space-y-3">
              {/* Regular hours input */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  {getTranslation("regularHours", language)}
                </label>
                <TimeSelector
                  value={week.regularHours}
                  onChange={(value) =>
                    updateHoursPerWeek(index, "regularHours", value)
                  }
                />
              </div>

              {/* Overtime hours input */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  {getTranslation("overtimeHours", language)}
                </label>
                <TimeSelector
                  value={week.overtimeHours}
                  onChange={(value) =>
                    updateHoursPerWeek(index, "overtimeHours", value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoursRegistration;
