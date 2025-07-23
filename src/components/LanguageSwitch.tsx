import React from "react";
import { getTranslation } from "../utils/translations";
import { Language, HandleLanguageChangeFunction } from "../types";

interface LanguageSwitchProps {
  language: Language;
  onLanguageChange: HandleLanguageChangeFunction;
}

// Language Switch component - Toggle between Dutch and English
const LanguageSwitch: React.FC<LanguageSwitchProps> = React.memo(
  ({ language, onLanguageChange }) => {
    const handleLanguageChange = (): void => {
      const newLanguage: Language = language === "nl" ? "en" : "nl";
      onLanguageChange(newLanguage);
    };

    return (
      <button
        onClick={handleLanguageChange}
        className="text-white hover:text-blue-100 transition-colors p-2"
        title={getTranslation("languageSwitch", language)}
        aria-label={getTranslation("languageSwitch", language)}
      >
        <span aria-hidden="true" className="text-xl sm:text-2xl">
          🌍
        </span>
      </button>
    );
  }
);

LanguageSwitch.displayName = "LanguageSwitch";

export default LanguageSwitch;
