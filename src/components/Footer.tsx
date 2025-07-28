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
              <>
                💻 Ontwikkeld door{" "}
                <a
                  href="https://github.com/voxxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  Voxxai
                </a>
              </>
            ) : (
              <>
                💻 Developed by{" "}
                <a
                  href="https://github.com/voxxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  Voxxai
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
