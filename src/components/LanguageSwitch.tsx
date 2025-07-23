import React from "react";
import { getTranslation } from "../utils/translations";
import { Language, HandleLanguageChangeFunction } from "../types";

interface LanguageSwitchProps {
  language: Language;
  onLanguageChange: HandleLanguageChangeFunction;
}

// Language Switch component - Disabled, always returns Dutch
const LanguageSwitch: React.FC<LanguageSwitchProps> = React.memo(
  ({ language, onLanguageChange }) => {
    const handleLanguageChange = (): void => {
      // Always set to Dutch when clicked (disabled functionality)
      onLanguageChange("nl");
    };

    return (
      <button
        onClick={handleLanguageChange}
        className="text-white opacity-50 cursor-not-allowed transition-colors p-2"
        title="Taal switch is uitgeschakeld"
        aria-label="Taal switch is uitgeschakeld"
        disabled
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
