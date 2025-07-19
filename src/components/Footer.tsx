import React from "react";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";

interface FooterProps {
  language: Language;
}

// Footer component - Shows tips, information and credits
const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 px-4">
      <div className="space-y-4">
        {/* Tips */}
        <div>
          <p className="leading-relaxed text-gray-600">
            {getTranslation("tip", language)}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-3">
          <p className="leading-relaxed">
            {language === "nl" ? (
              <>💻 Ontwikkeld door Voxxai</>
            ) : (
              <>💻 Developed by Voxxai</>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
