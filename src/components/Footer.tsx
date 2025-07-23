import React from "react";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";

interface FooterProps {
  language: Language;
}

// Footer component - Shows tips, information and credits
const Footer: React.FC<FooterProps> = React.memo(({ language }) => {
  return (
    <footer className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 px-4">
      <div className="space-y-3">
        {/* Tips */}
        <div>
          <p className="leading-relaxed text-gray-600 text-center">
            {getTranslation("tip", language)}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-3">
          <p className="leading-relaxed text-center">
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
});

Footer.displayName = "Footer";

export default Footer;
