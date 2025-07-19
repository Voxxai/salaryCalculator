import React from "react";
import { getTranslation } from "../utils/translations";
import LanguageSwitch from "./LanguageSwitch";
import { Language, HandleLanguageChangeFunction } from "../types";

interface HeaderProps {
  language: Language;
  onLanguageChange: HandleLanguageChangeFunction;
  onAnalyticsClick?: () => void;
}

// Header component - Shows the official AH logo and compact title
const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onAnalyticsClick,
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg border-b-2 border-blue-800 relative safe-area-top">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* AH Logo - Left */}
          <div className="flex items-center">
            <img
              src={process.env.PUBLIC_URL + "/Albert_Heijn_Logo.svg.png"}
              alt="Albert Heijn"
              className="h-12 sm:h-14 w-auto"
            />
          </div>

          {/* App Title - Center */}
          <div className="text-center flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white">
              {getTranslation("title", language)}
            </h1>
            <p className="text-sm text-blue-100">
              {getTranslation("subtitle", language)}
            </p>
          </div>

          {/* Language Switch and Analytics - Right */}
          <div className="flex items-center space-x-3">
            {onAnalyticsClick && (
              <button
                onClick={onAnalyticsClick}
                className="text-white hover:text-blue-100 transition-colors p-2"
                title="Analytics"
              >
                📊
              </button>
            )}
            <LanguageSwitch
              language={language}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
