import React from "react";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";

interface HeaderProps {
  language: Language;
}

// Header component - Shows the official AH logo and compact title
const Header: React.FC<HeaderProps> = React.memo(({ language }) => {
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
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
