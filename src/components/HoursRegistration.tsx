import React, { useState, useCallback } from "react";
import { getTranslation } from "../utils/translations";
import TimeInput from "./TimeInput";
import { WeekHours, Language, UpdateHoursPerWeekFunction } from "../types";

interface HoursRegistrationProps {
  hoursPerWeek: WeekHours[];
  updateHoursPerWeek: UpdateHoursPerWeekFunction;
  language: Language;
}

// Hours Registration component - Manages weekly hours input
const HoursRegistration: React.FC<HoursRegistrationProps> = React.memo(
  ({ hoursPerWeek, updateHoursPerWeek, language }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [selectedPercentage, setSelectedPercentage] = useState<string>("25");
    const [allowanceHours, setAllowanceHours] = useState<string>("0:00");
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleAddAllowance = useCallback((weekIndex: number): void => {
      setSelectedWeek(weekIndex);
      setSelectedPercentage("25");
      setAllowanceHours("0:00");
      setIsEditing(false);
      setShowPopup(true);
    }, []);

    const handleEditAllowance = useCallback(
      (weekIndex: number, percentage: string): void => {
        setSelectedWeek(weekIndex);
        setSelectedPercentage(percentage);
        setAllowanceHours(
          hoursPerWeek[weekIndex][
            `allowance${percentage}` as keyof WeekHours
          ] || "0:00"
        );
        setIsEditing(true);
        setShowPopup(true);
      },
      [hoursPerWeek]
    );

    const handleDeleteAllowance = useCallback(
      (weekIndex: number, percentage: string): void => {
        updateHoursPerWeek(
          weekIndex,
          `allowance${percentage}` as keyof WeekHours,
          "0:00"
        );
      },
      [updateHoursPerWeek]
    );

    const handleSaveAllowance = useCallback((): void => {
      if (selectedWeek !== null) {
        const fieldName = `allowance${selectedPercentage}` as keyof WeekHours;
        updateHoursPerWeek(selectedWeek, fieldName, allowanceHours);
      }
      setShowPopup(false);
      setSelectedWeek(null);
      setSelectedPercentage("25");
      setAllowanceHours("0:00");
      setIsEditing(false);
    }, [selectedWeek, selectedPercentage, allowanceHours, updateHoursPerWeek]);

    const handleCancelAllowance = useCallback((): void => {
      setShowPopup(false);
      setSelectedWeek(null);
      setSelectedPercentage("25");
      setAllowanceHours("0:00");
      setIsEditing(false);
    }, []);

    return (
      <>
        <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-xl border border-blue-200 p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4 sm:mb-6 flex items-center text-center justify-center">
            {getTranslation("hoursRegistration", language)}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {hoursPerWeek.map((week, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-blue-200 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-blue-800 text-center mb-2">
                    {getTranslation("week", language)} {index + 1}
                  </h3>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleAddAllowance(index)}
                      className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600 transition-colors"
                      title={getTranslation("addAllowance", language)}
                    >
                      {getTranslation("addAllowance", language)}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Regular hours input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                      {getTranslation("regularHours", language)}
                    </label>
                    <div className="flex justify-center">
                      <TimeInput
                        value={week.regularHours}
                        onChange={value =>
                          updateHoursPerWeek(index, "regularHours", value)
                        }
                      />
                    </div>
                  </div>

                  {/* Paid breaks input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                      {getTranslation("paidBreaks", language)}
                    </label>
                    <div className="flex justify-center">
                      <TimeInput
                        value={week.paidBreaks}
                        onChange={value =>
                          updateHoursPerWeek(index, "paidBreaks", value)
                        }
                      />
                    </div>
                  </div>

                  {/* Display existing allowances with edit/delete options */}
                  {week.allowance25 && week.allowance25 !== "0:00" && (
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 text-center">
                      <div className="flex flex-col items-center">
                        <div className="text-center mb-2">
                          <div className="text-sm text-blue-700 font-medium mb-1">
                            {getTranslation("allowance25", language)}
                          </div>
                          <div className="text-base text-blue-900 font-semibold">
                            {week.allowance25}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditAllowance(index, "25")}
                            className="w-6 h-6 bg-blue-500 text-white rounded-lg text-sm flex items-center justify-center hover:bg-blue-600 transition-colors"
                            title={getTranslation("edit", language)}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteAllowance(index, "25")}
                            className="w-6 h-6 bg-red-500 text-white rounded-lg text-sm flex items-center justify-center hover:bg-red-600 transition-colors"
                            title={getTranslation("delete", language)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {week.allowance50 && week.allowance50 !== "0:00" && (
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 text-center">
                      <div className="flex flex-col items-center">
                        <div className="text-center mb-2">
                          <div className="text-sm text-blue-700 font-medium mb-1">
                            {getTranslation("allowance50", language)}
                          </div>
                          <div className="text-base text-blue-900 font-semibold">
                            {week.allowance50}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditAllowance(index, "50")}
                            className="w-6 h-6 bg-blue-500 text-white rounded-lg text-sm flex items-center justify-center hover:bg-blue-600 transition-colors"
                            title={getTranslation("edit", language)}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteAllowance(index, "50")}
                            className="w-6 h-6 bg-red-500 text-white rounded-lg text-sm flex items-center justify-center hover:bg-red-600 transition-colors"
                            title={getTranslation("delete", language)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {week.allowance100 && week.allowance100 !== "0:00" && (
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 text-center">
                      <div className="flex flex-col items-center">
                        <div className="text-center mb-2">
                          <div className="text-sm text-blue-700 font-medium mb-1">
                            {getTranslation("allowance100", language)}
                          </div>
                          <div className="text-base text-blue-900 font-semibold">
                            {week.allowance100}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditAllowance(index, "100")}
                            className="w-6 h-6 bg-blue-500 text-white rounded-lg text-sm flex items-center justify-center hover:bg-blue-600 transition-colors"
                            title={getTranslation("edit", language)}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteAllowance(index, "100")}
                            className="w-6 h-6 bg-red-500 text-white rounded-lg text-sm flex items-center justify-center hover:bg-red-600 transition-colors"
                            title={getTranslation("delete", language)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Allowance Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isEditing
                  ? getTranslation("editAllowance", language)
                  : getTranslation("addAllowance", language)}{" "}
                - {getTranslation("week", language)} {selectedWeek! + 1}
              </h3>

              <div className="space-y-4">
                {/* Percentage Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation("allowancePercentage", language)}
                  </label>
                  <select
                    value={selectedPercentage}
                    onChange={e => setSelectedPercentage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="25">25%</option>
                    <option value="50">50%</option>
                    <option value="100">100%</option>
                  </select>
                </div>

                {/* Hours Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation("allowanceHours", language)}
                  </label>
                  <TimeInput
                    value={allowanceHours}
                    onChange={setAllowanceHours}
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-3 mt-6">
                <button
                  onClick={handleCancelAllowance}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {getTranslation("cancel", language)}
                </button>
                <button
                  onClick={handleSaveAllowance}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isEditing
                    ? getTranslation("save", language)
                    : getTranslation("addAllowance", language)}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

HoursRegistration.displayName = "HoursRegistration";

export default HoursRegistration;
