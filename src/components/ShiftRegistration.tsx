import React, { useState, useCallback, useMemo } from "react";
import { getTranslation } from "../utils/translations";
import {
  Shift,
  WeekShifts,
  Language,
  AddShiftFunction,
  UpdateShiftFunction,
  DeleteShiftFunction,
  CopyWeekFunction,
} from "../types";
import {
  generateShiftId,
  isNightShift,
  validateShift,
  calculateShiftHours,
  calculateAutomaticBreak,
} from "../utils/shiftCalculations";
import { decimalToTime } from "../utils/calculations";
import {
  getPeriodStatus,
  getWeekDatesForPeriod,
  formatDateRange,
  formatFullDate,
} from "../utils/periods";
import {
  CalendarIcon,
  ClockIcon,
  EditIcon,
  DeleteIcon,
  PlusIcon,
} from "./Icons";

interface ShiftRegistrationProps {
  weekShifts: WeekShifts[];
  addShift: AddShiftFunction;
  updateShift: UpdateShiftFunction;
  deleteShift: DeleteShiftFunction;
  copyWeek: CopyWeekFunction;
  language: Language;
  ageGroup: string;
}

// Shift Registration component - Manages shift input
const ShiftRegistration: React.FC<ShiftRegistrationProps> = React.memo(
  ({
    weekShifts,
    addShift,
    updateShift,
    deleteShift,
    copyWeek,
    language,
    ageGroup,
  }) => {
    // Get the current period status (includes pending payout window)
    const periodStatus = useMemo(() => getPeriodStatus(), []);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [editingShift, setEditingShift] = useState<Shift | null>(null);
    const [manualBreakEdited, setManualBreakEdited] = useState<boolean>(false);
    const [shiftData, setShiftData] = useState<Partial<Shift>>({
      startTime: "",
      endTime: "",
      breakMinutes: undefined,
      isNightShift: false,
      isSunday: false,
      isHoliday: false,
    });
    const [errors, setErrors] = useState<string[]>([]);

    const handleAddShift = useCallback((weekIndex: number): void => {
      setSelectedWeek(weekIndex);
      setEditingShift(null);
      setManualBreakEdited(false);
      setShiftData({
        startTime: "",
        endTime: "",
        breakMinutes: undefined,
        isNightShift: false,
        isSunday: false,
        isHoliday: false,
      });
      setErrors([]);
      setShowPopup(true);
    }, []);

    const handleEditShift = useCallback(
      (weekIndex: number, shift: Shift): void => {
        setSelectedWeek(weekIndex);
        setEditingShift(shift);
        setManualBreakEdited(true);
        setShiftData({
          startTime: shift.startTime,
          endTime: shift.endTime,
          breakMinutes: shift.breakMinutes,
          isNightShift: shift.isNightShift,
          isSunday: shift.isSunday,
          isHoliday: shift.isHoliday,
        });
        setErrors([]);
        setShowPopup(true);
      },
      []
    );

    const handleDeleteShift = useCallback(
      (weekIndex: number, shiftId: string): void => {
        if (
          window.confirm("Weet je zeker dat je deze shift wilt verwijderen?")
        ) {
          deleteShift(weekIndex, shiftId);
        }
      },
      [deleteShift]
    );

    const handleSaveShift = useCallback((): void => {
      if (selectedWeek === null) return;

      // Validate shift data
      const validationErrors = validateShift(shiftData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Auto-detect night shift
      const isNightShiftShift =
        shiftData.startTime && shiftData.endTime
          ? isNightShift(shiftData.startTime, shiftData.endTime)
          : false;

      // Automatically calculate break time based on age group
      const automaticBreakMinutes =
        shiftData.startTime && shiftData.endTime
          ? calculateAutomaticBreak(
              shiftData.startTime,
              shiftData.endTime,
              ageGroup
            )
          : 0;

      const breakMinutes =
        shiftData.breakMinutes !== undefined
          ? shiftData.breakMinutes
          : automaticBreakMinutes;

      const finalShiftData: Shift = {
        id: editingShift?.id || generateShiftId(),
        startTime: shiftData.startTime!,
        endTime: shiftData.endTime!,
        breakMinutes,
        isSunday: shiftData.isSunday || false,
        isHoliday: shiftData.isHoliday || false,
        isNightShift: isNightShiftShift,
      };

      if (editingShift) {
        updateShift(selectedWeek, editingShift.id, finalShiftData);
      } else {
        addShift(selectedWeek, finalShiftData);
      }

      setShowPopup(false);
      setSelectedWeek(null);
      setEditingShift(null);
      setShiftData({});
      setManualBreakEdited(false);
      setErrors([]);
    }, [selectedWeek, shiftData, editingShift, addShift, updateShift]);

    const handleCancelShift = useCallback((): void => {
      setShowPopup(false);
      setSelectedWeek(null);
      setEditingShift(null);
      setShiftData({});
      setErrors([]);
    }, []);

    const handleTimeChange = useCallback(
      (startTime: string, endTime: string): void => {
        const isNightShiftShift = isNightShift(startTime, endTime);

        const autoBreak =
          startTime && endTime
            ? calculateAutomaticBreak(startTime, endTime, ageGroup)
            : undefined;

        setShiftData(prev => ({
          ...prev,
          startTime,
          endTime,
          isNightShift: isNightShiftShift,
          breakMinutes:
            !manualBreakEdited && autoBreak !== undefined
              ? autoBreak
              : prev.breakMinutes,
        }));
      },
      [ageGroup, manualBreakEdited]
    );

    const getShiftSummary = (shift: Shift): string => {
      const hours = calculateShiftHours(shift, ageGroup);
      const totalHours =
        hours.regularHours + hours.allowance50 + hours.allowance100;

      let summary = `${shift.startTime}-${shift.endTime} (${decimalToTime(totalHours)})`;

      if (shift.isNightShift) {
        summary += " 🌙";
      }
      if (shift.isSunday) {
        summary += " ☀️";
      }
      if (shift.isHoliday) {
        summary += " 🎉";
      }

      return summary;
    };

    // Calculate automatic break time for display
    const getAutomaticBreakTime = (): string => {
      if (shiftData.startTime && shiftData.endTime) {
        const breakMinutes = calculateAutomaticBreak(
          shiftData.startTime,
          shiftData.endTime,
          ageGroup
        );
        return `${breakMinutes} minuten`;
      }
      return "Niet beschikbaar";
    };

    return (
      <>
        <div className="mt-6 sm:mt-8 card">
          <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 text-center flex items-center justify-center gap-2">
            <CalendarIcon className="text-blue-500" size={24} />
            {getTranslation("shiftRegistration", language)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {weekShifts.map((week, index) => {
              const weekDates = getWeekDatesForPeriod(
                periodStatus.currentPeriod.periodNumber,
                periodStatus.currentPeriod.year
              );
              const weekStart = weekDates[index];
              const weekEnd = weekDates[index]
                ? new Date(weekDates[index])
                : null;
              if (weekEnd) {
                weekEnd.setDate(weekEnd.getDate() + 6); // Sunday of that week
              }

              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 text-center mb-2">
                      Week {week.weekNumber}
                      {weekStart && weekEnd ? (
                        <>
                          <br />
                          <span className="text-sm text-gray-600">
                            ({formatDateRange(weekStart, weekEnd)})
                          </span>
                        </>
                      ) : null}
                    </h3>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAddShift(index)}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600 transition-colors flex items-center gap-1"
                        title={getTranslation("addShift", language)}
                      >
                        <PlusIcon className="text-white" size={12} />
                        Shift Toevoegen
                      </button>
                      {index > 0 && (
                        <button
                          onClick={() => copyWeek(index - 1, index)}
                          className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-200 text-gray-800 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
                          title={getTranslation("copyWeek", language)}
                        >
                          {getTranslation("copyWeek", language)}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {week.shifts.length === 0 ? (
                      <div className="text-center text-gray-500 text-sm py-4">
                        Geen shiften ingevoerd
                      </div>
                    ) : (
                      week.shifts.map(shift => (
                        <div
                          key={shift.id}
                          className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                        >
                          <div className="text-center mb-2">
                            <div className="text-sm text-gray-900 font-medium">
                              {getShiftSummary(shift)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {shift.breakMinutes === 0 ? (
                                <span>Geen pauze in deze shift</span>
                              ) : (
                                <span>Pauze: {shift.breakMinutes} min</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {shift.isSunday && "☀️ Zondag "}
                              {shift.isHoliday && "🎉 Feestdag "}
                              {shift.isNightShift && "🌙 Nachtwerk"}
                            </div>
                          </div>
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleEditShift(index, shift)}
                              className="w-6 h-6 bg-blue-500 text-white rounded text-sm flex items-center justify-center hover:bg-blue-600 transition-colors"
                              title={getTranslation("edit", language)}
                            >
                              <EditIcon className="text-white" size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteShift(index, shift.id)}
                              className="w-6 h-6 bg-red-500 text-white rounded text-sm flex items-center justify-center hover:bg-red-600 transition-colors"
                              title={getTranslation("delete", language)}
                            >
                              <DeleteIcon className="text-white" size={12} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shift Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full border border-gray-200 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingShift
                  ? getTranslation("editShift", language)
                  : getTranslation("addShift", language)}{" "}
                - Week {(selectedWeek || 0) + 1}
              </h3>

              {errors.length > 0 && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm text-red-600">
                    {errors.map((error, index) => (
                      <div key={index}>• {error}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starttijd
                  </label>
                  <input
                    type="time"
                    value={shiftData.startTime || ""}
                    onChange={e =>
                      handleTimeChange(e.target.value, shiftData.endTime || "")
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eindtijd
                  </label>
                  <input
                    type="time"
                    value={shiftData.endTime || ""}
                    onChange={e =>
                      handleTimeChange(
                        shiftData.startTime || "",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                </div>

                {/* Sunday and Holiday Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isSunday"
                      checked={shiftData.isSunday || false}
                      onChange={e =>
                        setShiftData(prev => ({
                          ...prev,
                          isSunday: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="isSunday"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Zondag
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isHoliday"
                      checked={shiftData.isHoliday || false}
                      onChange={e =>
                        setShiftData(prev => ({
                          ...prev,
                          isHoliday: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="isHoliday"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Feestdag
                    </label>
                  </div>
                </div>

                {/* Manual Break Override */}
                {shiftData.startTime && shiftData.endTime && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pauze (minuten) - handmatig aanpassen
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="5"
                      value={
                        shiftData.breakMinutes !== undefined
                          ? shiftData.breakMinutes
                          : calculateAutomaticBreak(
                              shiftData.startTime,
                              shiftData.endTime,
                              ageGroup
                            )
                      }
                      onChange={e =>
                        setShiftData(prev => ({
                          ...prev,
                          breakMinutes: parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder={`Automatisch: ${calculateAutomaticBreak(
                        shiftData.startTime,
                        shiftData.endTime,
                        ageGroup
                      )} min`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Laat leeg voor automatische berekening (
                      {calculateAutomaticBreak(
                        shiftData.startTime,
                        shiftData.endTime,
                        ageGroup
                      )}{" "}
                      min)
                    </p>
                  </div>
                )}

                {/* Automatic Break Display */}
                {shiftData.startTime &&
                  shiftData.endTime &&
                  (() => {
                    const breakMinutes = calculateAutomaticBreak(
                      shiftData.startTime,
                      shiftData.endTime,
                      ageGroup
                    );

                    if (breakMinutes === 0) {
                      return (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="text-sm text-amber-800 font-medium mb-1">
                            ⏸️ Geen pauzes in deze shift
                          </div>
                          <div className="text-sm text-amber-700">
                            Deze shift is korter dan 4 uur, dus geen pauze
                            volgens CAO regels.
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm text-green-800 font-medium mb-1">
                          Automatische Pauze:
                        </div>
                        <div className="text-sm text-green-700">
                          {getAutomaticBreakTime()} (volgens CAO regels)
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          {ageGroup === "13-15" ||
                          ageGroup === "16" ||
                          ageGroup === "17"
                            ? "Pauze profiel: Jonger dan 18 jaar"
                            : "Pauze profiel: 18 jaar en ouder"}
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          {ageGroup === "13-15" ||
                          ageGroup === "16" ||
                          ageGroup === "17" ? (
                            <>
                              • &lt; 4 uur: 0 minuten
                              <br />
                              • 4-4.5 uur: 15 minuten
                              <br />
                              • 4.5-5.5 uur: 30 minuten
                              <br />• 5.5+ uur: 45 minuten
                            </>
                          ) : (
                            <>
                              • &lt; 4 uur: 0 minuten
                              <br />
                              • 4-5.5 uur: 15 minuten
                              <br />
                              • 5.5-6 uur: 30 minuten
                              <br />• 6+ uur: 45 minuten
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                {/* Auto-detected allowances */}
                {(shiftData.isNightShift ||
                  shiftData.isSunday ||
                  shiftData.isHoliday) && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-800 font-medium mb-2">
                      Automatisch gedetecteerde toeslagen:
                    </div>
                    <div className="space-y-1 text-sm text-blue-700">
                      {shiftData.isNightShift && (
                        <div>• Nachtwerk (50% toeslag)</div>
                      )}
                      {shiftData.isSunday && <div>• Zondag (100% toeslag)</div>}
                      {shiftData.isHoliday && (
                        <div>• Feestdag (100% toeslag)</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-3 mt-6">
                <button
                  onClick={handleCancelShift}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {getTranslation("cancel", language)}
                </button>
                <button
                  onClick={handleSaveShift}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {editingShift
                    ? getTranslation("save", language)
                    : getTranslation("addShift", language)}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

ShiftRegistration.displayName = "ShiftRegistration";

export default ShiftRegistration;
