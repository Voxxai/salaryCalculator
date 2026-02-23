'use client';

import React from "react";
import Image from "next/image";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";

interface HeaderProps {
  language: Language;
}

// Header component - Minimalistic design with clean styling
const Header: React.FC<HeaderProps> = React.memo(({ language }) => {
  return (
    <header
      className="bg-white border-b border-gray-200 safe-area-top"
      role="banner"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* AH Logo - Left */}
          <div className="flex items-center">
            <Image
              src="/Albert_Heijn_Logo.svg.png"
              alt="Albert Heijn Logo"
              width={48}
              height={48}
              className="h-10 sm:h-12 w-auto opacity-80"
              aria-hidden="true"
              priority
            />
          </div>

          {/* App Title - Center */}
          <div className="text-center flex-1">
            <h1 className="text-lg sm:text-xl font-medium text-gray-900">
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
