import { Language } from "../types";

// Translation utilities for the salary calculator

interface TranslationKeys {
  // Header
  title: string;
  subtitle: string;

  // Configuration
  configuration: string;
  hourlyRate: string;
  overtimePercentage: string;
  numberOfWeeks: string;
  pensionPercentage: string;
  weeks: string;

  // Function-based hourly rate
  selectFunction: string;
  ageGroup: string;
  jobFunction: string;
  yearsOfService: string;
  vakkenvuller: string;
  shiftleader: string;
  customRate: string;
  selectedRate: string;
  functionBased: string;
  automaticCalculation: string;
  customHourlyRate: string;
  manualInput: string;
  allInRatesInfo: string;
  shiftleaderWarning: string;
  resetAllSettings: string;
  years: string;
  year: string;

  // Results
  results: string;
  totalRegularHours: string;
  totalOvertimeHours: string;
  estimatedGrossSalary: string;
  estimatedPension: string;
  estimatedTax: string;
  estimatedNetSalary: string;

  // Hours Registration
  hoursRegistration: string;
  week: string;
  regularHours: string;
  overtimeHours: string;
  paidBreaks: string;
  allowance25: string;
  allowance50: string;
  allowance100: string;
  addAllowance: string;
  editAllowance: string;
  deleteAllowance: string;
  allowancePercentage: string;
  allowanceHours: string;
  save: string;
  cancel: string;
  edit: string;
  delete: string;

  // Footer
  tip: string;
  disclaimer: string;

  // Language Switch
  languageSwitch: string;
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Header
    title: "💰 Salary Calculator",
    subtitle: "Calculate your salary with overtime and deductions",

    // Configuration
    configuration: "⚙️ Configuration",
    hourlyRate: "Your All-in Hourly Rate (€)",
    overtimePercentage: "Overtime Percentage (%)",
    numberOfWeeks: "Number of weeks in salary period",
    pensionPercentage: "Pension/SPAWW Percentage (%)",
    weeks: "weeks",

    // Function-based hourly rate
    selectFunction: "Select Function & Age",
    ageGroup: "Age Group",
    jobFunction: "Job Function",
    yearsOfService: "Years of Service",
    vakkenvuller: "Shelf Stocker",
    shiftleader: "Shift Leader",
    customRate: "Custom Rate",
    selectedRate: "Selected Hourly Rate",
    functionBased: "Function-based",
    automaticCalculation: "Automatic calculation",
    customHourlyRate: "Custom hourly rate",
    manualInput: "Manual input",
    allInRatesInfo:
      "💡 All wages are all-in rates for contracts under 12 hours per week (including 32.97% allowance)",
    shiftleaderWarning:
      "ℹ️ Shift leader function is only available from age 18",
    resetAllSettings: "Reset All Settings",
    years: "years",
    year: "year",

    // Results
    results: "📊 Results",
    totalRegularHours: "Total Regular Hours",
    totalOvertimeHours: "Total Overtime Hours 50",
    estimatedGrossSalary: "Estimated Gross Salary",
    estimatedPension: "Estimated Pension/SPAWW",
    estimatedTax: "Estimated Tax/WGA",
    estimatedNetSalary: "Estimated Net Salary",

    // Hours Registration
    hoursRegistration: "⏰ Hours Registration",
    week: "Week",
    regularHours: "Regular Hours",
    overtimeHours: "Overtime Hours 50",
    paidBreaks: "Paid Breaks",
    allowance25: "Allowance 25%",
    allowance50: "Allowance 50%",
    allowance100: "Allowance 100%",
    addAllowance: "Add Allowance",
    editAllowance: "Edit Allowance",
    deleteAllowance: "Delete Allowance",
    allowancePercentage: "Allowance Percentage",
    allowanceHours: "Allowance Hours",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",

    // Footer
    tip: "💡 Tip: Enter hours in HH:MM format (e.g. 8:30 for 8 hours and 30 minutes)",
    disclaimer:
      "All calculations are estimates and may differ from your actual payslip.",

    // Language Switch
    languageSwitch: "🌍 Language",
  },

  nl: {
    // Header
    title: "💰 Salariscalculator",
    subtitle: "Bereken je salaris met toeslagen en aftrekposten",

    // Configuration
    configuration: "⚙️ Configuratie",
    hourlyRate: "Jouw All-in Uurloon (€)",
    overtimePercentage: "Toeslagpercentage (%)",
    numberOfWeeks: "Aantal weken in salarisperiode",
    pensionPercentage: "Percentage Pensioen/SPAWW (%)",
    weeks: "weken",

    // Function-based hourly rate
    selectFunction: "Selecteer Functie & Leeftijd",
    ageGroup: "Leeftijdsgroep",
    jobFunction: "Functie",
    yearsOfService: "Functiejaren",
    vakkenvuller: "Vakkenvuller",
    shiftleader: "Shiftleader",
    customRate: "Aangepast Uurloon",
    selectedRate: "Geselecteerd Uurloon",
    functionBased: "Functie-gebaseerd",
    automaticCalculation: "Automatische berekening",
    customHourlyRate: "Aangepast uurloon",
    manualInput: "Handmatige invoer",
    allInRatesInfo:
      "💡 Alle lonen zijn all-in tarieven voor contracten onder 12 uur per week (inclusief 32.97% toeslag)",
    shiftleaderWarning:
      "ℹ️ Shiftleider functie is alleen beschikbaar vanaf 18 jaar",
    resetAllSettings: "Reset Alle Instellingen",
    years: "jaar",
    year: "jaar",

    // Results
    results: "📊 Resultaten",
    totalRegularHours: "Totaal Reguliere Uren",
    totalOvertimeHours: "Totaal Toeslaguren 50",
    estimatedGrossSalary: "Geschat Bruto Salaris",
    estimatedPension: "Geschatte Pensioen/SPAWW",
    estimatedTax: "Geschatte Loonheffing/WGA",
    estimatedNetSalary: "Geschat Netto Salaris",

    // Hours Registration
    hoursRegistration: "⏰ Urenregistratie",
    week: "Week",
    regularHours: "Reguliere Uren",
    overtimeHours: "Toeslaguren 50",
    paidBreaks: "Betaalde Pauze",
    allowance25: "Toeslag 25%",
    allowance50: "Toeslag 50%",
    allowance100: "Toeslag 100%",
    addAllowance: "Toeslag Toevoegen",
    editAllowance: "Toeslag Bewerken",
    deleteAllowance: "Toeslag Verwijderen",
    allowancePercentage: "Toeslag Percentage",
    allowanceHours: "Toeslag Uren",
    save: "Opslaan",
    cancel: "Annuleren",
    edit: "Bewerken",
    delete: "Verwijderen",

    // Footer
    tip: "💡 Tip: Voer uren in het formaat HH:MM in (bijv. 8:30 voor 8 uur en 30 minuten)",
    disclaimer:
      "Alle berekeningen zijn geschat en kunnen afwijken van je daadwerkelijke salarisstrook.",

    // Language Switch
    languageSwitch: "🌍 Taal",
  },
};

// Function to get translation for a specific key and language
export const getTranslation = (
  key: keyof TranslationKeys,
  language: Language
): string => {
  return translations[language]?.[key] || key;
};
