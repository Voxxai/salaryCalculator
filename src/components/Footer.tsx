import React from "react";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";

interface FooterProps {
  language: Language;
}

// Footer component - Shows tips and information
const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 px-4">
      <p className="leading-relaxed">{getTranslation("tip", language)}</p>
      <p className="mt-2 leading-relaxed">
        {getTranslation("disclaimer", language)}
      </p>
    </div>
  );
};

export default Footer;
