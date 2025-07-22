import React from "react";
import { getTranslation } from "../utils/translations";
import { Language, HandleLanguageChangeFunction } from "../types";

interface LanguageSwitchProps {
  language: Language;
  onLanguageChange: HandleLanguageChangeFunction;
}

// Language Switch component - Allows users to toggle between languages by clicking the flag
const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  language,
  onLanguageChange,
}) => {
  const handleLanguageToggle = (): void => {
    const newLanguage: Language = language === "nl" ? "en" : "nl";

    onLanguageChange(newLanguage);
  };

  return (
    <button
      onClick={handleLanguageToggle}
      className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 text-xs sm:text-sm border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-700 touch-target hover:bg-blue-50 transition-colors min-w-[44px] sm:min-w-auto"
      title={language === "nl" ? "Switch to English" : "Wissel naar Nederlands"}
      aria-label={language === "nl" ? "Switch to English" : "Wissel naar Nederlands"}
      aria-pressed={false}
    >
      <span className="text-base sm:text-lg" aria-hidden="true">
        {language === "nl" ? "🇳🇱" : "🇬🇧"}
      </span>
      <span className="hidden sm:inline">
        {language === "nl" ? "NL" : "EN"}
      </span>
    </button>
  );
};

export default LanguageSwitch;
