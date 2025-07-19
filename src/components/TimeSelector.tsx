import React from "react";

interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface ParsedTime {
  hours: number;
  minutes: number;
}

// Time Selector component with dropdowns for hours and minutes
const TimeSelector: React.FC<TimeSelectorProps> = React.memo(
  ({ value, onChange, placeholder = "0:00" }) => {
    // Parse current value or use 0:00 as default
    const parseTime = (timeString: string): ParsedTime => {
      if (!timeString || timeString === "0:00") {
        return { hours: 0, minutes: 0 };
      }
      const [hours, minutes] = timeString.split(":").map(Number);
      return { hours: hours || 0, minutes: minutes || 0 };
    };

    const { hours, minutes } = parseTime(value);

    // Generate options for hours (0-60)
    const hourOptions = Array.from({ length: 61 }, (_, i) => i);

    // Generate options for minutes (0, 15, 30, 45)
    const minuteOptions = [0, 15, 30, 45];

    const handleHourChange = (newHours: number): void => {
      const newTime = `${newHours}:${minutes.toString().padStart(2, "0")}`;
      onChange(newTime);
    };

    const handleMinuteChange = (newMinutes: number): void => {
      const newTime = `${hours}:${newMinutes.toString().padStart(2, "0")}`;
      onChange(newTime);
    };

    return (
      <div className="flex items-center space-x-2">
        {/* Hours dropdown */}
        <select
          value={hours}
          onChange={e => handleHourChange(parseInt(e.target.value))}
          className="flex-1 px-3 py-3 sm:py-2 text-sm border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 touch-target"
        >
          {hourOptions.map(hour => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        {/* Separator */}
        <span className="text-blue-500 font-medium">:</span>

        {/* Minutes dropdown */}
        <select
          value={minutes}
          onChange={e => handleMinuteChange(parseInt(e.target.value))}
          className="flex-1 px-3 py-3 sm:py-2 text-sm border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 touch-target"
        >
          {minuteOptions.map(minute => (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

TimeSelector.displayName = "TimeSelector";

export default TimeSelector;
