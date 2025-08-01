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

  // Shift Registration (new)
  shiftRegistration: string;
  addShift: string;
  editShift: string;
  deleteShift: string;
  shiftDate: string;
  shiftStartTime: string;
  shiftEndTime: string;
  shiftBreakMinutes: string;
  shiftDuration: string;
  shiftAllowances: string;

  // Footer
  tip: string;
  disclaimer: string;
  privacyDisclaimer: string;

  // Error Boundary
  errorTitle: string;
  errorMessage: string;
  calculationError: string;
  storageError: string;
  networkError: string;
  reloadPage: string;
  clearStorageAndReload: string;
  showErrorDetails: string;
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Header
    title: "Salary Calculator",
    subtitle: "Calculate your salary with overtime and deductions",

    // Configuration
    configuration: "Your Pay Rate",
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
      "All-in tarieven: Dit zijn de complete uurloontarieven inclusief alle toeslagen. Voor contracten onder 12 uur per week.",
    resetAllSettings: "Reset All Settings",
    years: "years",
    year: "year",

    // Results
    results: "Results",
    totalRegularHours: "Total Regular Hours",
    totalOvertimeHours: "Total Overtime Hours 50",
    estimatedGrossSalary: "Estimated Gross Salary",
    estimatedPension: "Estimated Pension/SPAWW",
    estimatedTax: "Estimated Tax/WGA",
    estimatedNetSalary: "Estimated Net Salary",

    // Hours Registration

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

    // Shift Registration (new)
    shiftRegistration: "Shift Registration",
    addShift: "Add Shift",
    editShift: "Edit Shift",
    deleteShift: "Delete Shift",
    shiftDate: "Date",
    shiftStartTime: "Start Time",
    shiftEndTime: "End Time",
    shiftBreakMinutes: "Break (minutes)",
    shiftDuration: "Duration",
    shiftAllowances: "Allowances",

    // Footer
    tip: "Tip: Type hours (1-99) and select minutes from dropdown (00, 15, 30, 45)",
    disclaimer:
      "These are estimates only. Actual salary may vary. Always verify with your employer.",
    privacyDisclaimer:
      "PRIVACY: Your salary data stays on your device. No personal information is collected or stored.",

    // Error Boundary
    errorTitle: "Something went wrong",
    errorMessage:
      "An unexpected error occurred. Please try reloading the page.",
    calculationError:
      "A calculation error occurred. Please check your input values.",
    storageError: "A storage error occurred. Your data may be corrupted.",
    networkError: "A network error occurred. Please check your connection.",
    reloadPage: "Reload Page",
    clearStorageAndReload: "Clear Storage & Reload",
    showErrorDetails: "Show Error Details",
  },

  nl: {
    // Header
    title: "Salariscalculator",
    subtitle: "Bereken je salaris met toeslagen en aftrekposten",

    // Configuration
    configuration: "Jouw Uurloon",
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
      "All-in tarieven: Dit zijn de complete uurloontarieven inclusief alle toeslagen. Voor contracten onder 12 uur per week.",
    resetAllSettings: "Reset Alle Instellingen",
    years: "jaar",
    year: "jaar",

    // Results
    results: "Resultaten",
    totalRegularHours: "Totaal Reguliere Uren",
    totalOvertimeHours: "Totaal Toeslaguren 50",
    estimatedGrossSalary: "Geschat Bruto Salaris",
    estimatedPension: "Geschatte Pensioen/SPAWW",
    estimatedTax: "Geschatte Loonheffing/WGA",
    estimatedNetSalary: "Geschat Netto Salaris",

    // Hours Registration

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

    // Shift Registration (new)
    shiftRegistration: "Shiftregistratie",
    addShift: "Shift Toevoegen",
    editShift: "Shift Bewerken",
    deleteShift: "Shift Verwijderen",
    shiftDate: "Datum",
    shiftStartTime: "Starttijd",
    shiftEndTime: "Eindtijd",
    shiftBreakMinutes: "Pauze (minuten)",
    shiftDuration: "Duur",
    shiftAllowances: "Toeslagen",

    // Footer
    tip: "Tip: Type uren (1-99) en selecteer minuten uit dropdown (00, 15, 30, 45)",
    disclaimer:
      "Dit zijn slechts schattingen. Daadwerkelijk salaris kan afwijken. Controleer altijd bij je werkgever.",
    privacyDisclaimer:
      "PRIVACY: Je salarisgegevens blijven op je apparaat. Er worden geen persoonlijke gegevens verzameld of opgeslagen.",

    // Error Boundary
    errorTitle: "Er is iets misgegaan",
    errorMessage:
      "Er is een onverwachte fout opgetreden. Probeer de pagina opnieuw te laden.",
    calculationError:
      "Er is een berekeningsfout opgetreden. Controleer je invoerwaarden.",
    storageError:
      "Er is een opslagfout opgetreden. Je gegevens kunnen beschadigd zijn.",
    networkError: "Er is een netwerkfout opgetreden. Controleer je verbinding.",
    reloadPage: "Pagina Herladen",
    clearStorageAndReload: "Opslag Wissen & Herladen",
    showErrorDetails: "Toon Foutdetails",
  },
};

// Translation cache for performance optimization
const translationCache = new Map<string, string>();

// Function to get translation for a specific key and language
export const getTranslation = (
  key: keyof TranslationKeys,
  language: Language
): string => {
  const cacheKey = `${language}:${key}`;

  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // Get translation and cache it
  const translation = translations[language]?.[key] || key;
  translationCache.set(cacheKey, translation);

  return translation;
};
