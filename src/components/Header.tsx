import React, { useState } from "react";
import { getTranslation } from "../utils/translations";
import LanguageSwitch from "./LanguageSwitch";
import FeedbackForm from "./FeedbackForm";
import FeedbackAdmin from "./FeedbackAdmin";
import { Language, HandleLanguageChangeFunction } from "../types";

interface HeaderProps {
  language: Language;
  onLanguageChange: HandleLanguageChangeFunction;
}

// Header component - Shows the official AH logo and compact title
const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if user is admin (development mode only)
  const isAdmin = process.env.NODE_ENV === "development";
  return (
    <header
      className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg border-b-2 border-blue-800 relative safe-area-top"
      role="banner"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* AH Logo - Left */}
          <div className="flex items-center">
            <img
              src={process.env.PUBLIC_URL + "/Albert_Heijn_Logo.svg.png"}
              alt="Albert Heijn Logo"
              className="h-12 sm:h-14 w-auto"
              aria-hidden="true"
            />
          </div>

          {/* App Title - Center */}
          <div className="text-center flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white">
              {getTranslation("title", language)}
            </h1>
            <p className="text-sm text-blue-200">
              {getTranslation("subtitle", language)}
            </p>
          </div>

          {/* Language Switch, Feedback and Admin - Right */}
          <div
            className="flex items-center space-x-2"
            role="toolbar"
            aria-label="App controls"
          >
            <button
              onClick={() => setShowFeedback(true)}
              className="text-white hover:text-blue-100 transition-colors p-2"
              title={getTranslation("feedbackButton", language)}
              aria-label={getTranslation("feedbackButton", language)}
            >
              <span aria-hidden="true">💬</span>
            </button>
            {isAdmin && (
              <button
                onClick={() => setShowAdmin(true)}
                className="text-white hover:text-blue-100 transition-colors p-2"
                title={getTranslation("adminButton", language)}
                aria-label={getTranslation("adminButton", language)}
              >
                <span aria-hidden="true">⚙️</span>
              </button>
            )}
            <LanguageSwitch
              language={language}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>
      </div>

      {/* Feedback Form Modal */}
      {showFeedback && (
        <FeedbackForm
          language={language}
          onClose={() => setShowFeedback(false)}
        />
      )}

      {/* Admin Panel Modal */}
      {showAdmin && (
        <FeedbackAdmin
          language={language}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </header>
  );
};

export default Header;
