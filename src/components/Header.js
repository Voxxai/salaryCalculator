import React from "react";
import { getTranslation } from "../utils/translations";
import LanguageSwitch from "./LanguageSwitch";

// Header component - Shows the title and description of the application
const Header = ({ language, onLanguageChange }) => {
  return (
    <header className="bg-white shadow-lg border-b-2 border-gray-200 relative safe-area-top">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
          {getTranslation("title", language)}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 text-center mt-2 px-2">
          {getTranslation("subtitle", language)}
        </p>
      </div>

      {/* Language Switch */}
      <LanguageSwitch language={language} onLanguageChange={onLanguageChange} />
    </header>
  );
};

export default Header;
