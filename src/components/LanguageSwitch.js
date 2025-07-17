import React from "react";
import { getTranslation } from "../utils/translations";

// Language Switch component - Allows users to toggle between languages by clicking the flag
const LanguageSwitch = ({ language, onLanguageChange }) => {
  const handleLanguageToggle = () => {
    const newLanguage = language === "nl" ? "en" : "nl";
    onLanguageChange(newLanguage);
  };

  return (
    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
      <button
        onClick={handleLanguageToggle}
        className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 touch-target hover:bg-gray-50 transition-colors min-w-[44px] sm:min-w-auto"
        title={
          language === "nl" ? "Switch to English" : "Wissel naar Nederlands"
        }
      >
        <span className="text-base sm:text-lg">
          {language === "nl" ? "🇳🇱" : "🇬🇧"}
        </span>
        <span className="hidden sm:inline">
          {language === "nl" ? "NL" : "EN"}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitch;
