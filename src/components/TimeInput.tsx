import React, { useState, useEffect, useCallback } from "react";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TimeInput: React.FC<TimeInputProps> = React.memo(
  ({ value, onChange, placeholder = "8:30" }) => {
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
      // Parse current value
      const [h, m] = value.split(":");
      setHours(h || "0");
      setMinutes(m || "00");
    }, [value]);

    const handleHoursChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHours = e.target.value;
        setHours(newHours);
        // Don't format or validate while typing - let user type freely
      },
      []
    );

    const handleHoursBlur = useCallback(() => {
      // Only format and validate when user leaves the field
      let finalHours = hours;

      // If empty, set to 0
      if (finalHours === "") {
        finalHours = "0";
      }

      // If it's a number, validate range
      if (/^\d+$/.test(finalHours)) {
        const numHours = parseInt(finalHours);
        if (numHours < 0) {
          finalHours = "0";
        } else if (numHours > 99) {
          finalHours = "99";
        }
      } else {
        // If not a valid number, reset to current value
        const [h] = value.split(":");
        finalHours = h || "0";
      }

      setHours(finalHours);
      // Don't pad with zeros - keep natural format
      onChange(`${finalHours}:${minutes}`);
      setIsEditing(false);
    }, [hours, minutes, value, onChange]);

    const handleHoursFocus = useCallback(() => {
      setIsEditing(true);
    }, []);

    const handleMinutesChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMinutes = e.target.value;
        setMinutes(newMinutes);
        onChange(`${hours}:${newMinutes}`);
      },
      [hours, onChange]
    );

    return (
      <div className="flex items-center space-x-2">
        {/* Hours input */}
        <input
          type="text"
          value={hours}
          onChange={handleHoursChange}
          onFocus={handleHoursFocus}
          onBlur={handleHoursBlur}
          placeholder="8"
          className="w-20 px-3 py-3 sm:py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 touch-target border-blue-300 focus:border-blue-500 text-center"
          inputMode="decimal"
          aria-label="Hours"
          min="0"
          max="99"
        />

        {/* Separator */}
        <span className="text-gray-500 font-medium text-lg" aria-hidden="true">
          :
        </span>

        {/* Minutes dropdown */}
        <select
          value={minutes}
          onChange={handleMinutesChange}
          className="w-20 px-3 py-3 sm:py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 touch-target border-blue-300 focus:border-blue-500 text-center"
          aria-label="Minutes"
        >
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
      </div>
    );
  }
);

TimeInput.displayName = "TimeInput";

export default TimeInput;
