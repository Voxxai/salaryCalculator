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
  privacyDisclaimer: string;

  // Language Switch
  languageSwitch: string;

  // Error Boundary
  errorTitle: string;
  errorMessage: string;
  calculationError: string;
  storageError: string;
  networkError: string;
  reloadPage: string;
  clearStorageAndReload: string;
  showErrorDetails: string;

  // Feedback Form
  feedbackButton: string;
  feedbackTitle: string;
  feedbackSubtitle: string;
  feedbackType: string;
  featureRequest: string;
  bugReport: string;
  improvement: string;
  other: string;
  feature: string;
  bug: string;
  feedbackTitleLabel: string;
  feedbackTitlePlaceholder: string;
  feedbackDescription: string;
  feedbackDescriptionPlaceholder: string;
  feedbackPriority: string;
  low: string;
  medium: string;
  high: string;
  feedbackEmail: string;
  optional: string;
  feedbackEmailPlaceholder: string;
  submitFeedback: string;
  submitting: string;
  feedbackSubmitted: string;
  feedbackThankYou: string;

  // Admin Panel
  adminButton: string;
  feedbackAdminTitle: string;
  feedbackAdminSubtitle: string;
  filterByType: string;
  allTypes: string;
  sortBy: string;
  sortByDate: string;
  sortByPriority: string;
  noFeedback: string;
  deleteFeedback: string;
  clearAllFeedback: string;
  close: string;
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Header
    title: "Salary Calculator",
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
      "💡 All-in tarieven: Dit zijn de complete uurloontarieven inclusief alle toeslagen. Voor contracten onder 12 uur per week.",
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
    tip: "💡 Tip: Type hours (1-99) and select minutes from dropdown (00, 15, 30, 45)",
    disclaimer:
      "⚠️ IMPORTANT: All calculations are estimates only. Your actual salary may differ due to individual circumstances, collective agreements, or company policies. Always verify with your employer or payslip.",
    privacyDisclaimer:
      "🔒 PRIVACY: Your salary data stays on your device. Only feedback submissions are sent to me. No personal information is collected or stored.",

    // Language Switch
    languageSwitch: "🌍 Language",

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

    // Feedback Form
    feedbackButton: "Send Feedback",
    feedbackTitle: "Send Feedback",
    feedbackSubtitle: "Help us improve the app with your suggestions",
    feedbackType: "Feedback Type",
    featureRequest: "Feature Request",
    bugReport: "Bug Report",
    improvement: "Improvement",
    other: "Other",
    feature: "Feature",
    bug: "Bug",
    feedbackTitleLabel: "Title",
    feedbackTitlePlaceholder: "Brief description of your feedback",
    feedbackDescription: "Description",
    feedbackDescriptionPlaceholder:
      "Please provide detailed information about your feedback...",
    feedbackPriority: "Priority",
    low: "Low",
    medium: "Medium",
    high: "High",
    feedbackEmail: "Contact Email (Optional)",
    optional: "Optional",
    feedbackEmailPlaceholder: "your.email@example.com",
    submitFeedback: "Submit Feedback",
    submitting: "Submitting...",
    feedbackSubmitted: "Feedback Submitted!",
    feedbackThankYou:
      "Thank you for your feedback. We'll review it and get back to you if needed.",

    // Admin Panel
    adminButton: "Admin Panel",
    feedbackAdminTitle: "Feedback Management",
    feedbackAdminSubtitle: "View and manage user feedback",
    filterByType: "Filter by Type",
    allTypes: "All Types",
    sortBy: "Sort By",
    sortByDate: "Date",
    sortByPriority: "Priority",
    noFeedback: "No feedback submitted yet",
    deleteFeedback: "Delete Feedback",
    clearAllFeedback: "Clear All Feedback",
    close: "Close",
  },

  nl: {
    // Header
    title: "Salariscalculator",
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
      "💡 All-in tarieven: Dit zijn de complete uurloontarieven inclusief alle toeslagen. Voor contracten onder 12 uur per week.",
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
    tip: "💡 Tip: Type uren (1-99) en selecteer minuten uit dropdown (00, 15, 30, 45)",
    disclaimer:
      "⚠️ BELANGRIJK: Alle berekeningen zijn slechts schattingen. Je daadwerkelijke salaris kan afwijken door individuele omstandigheden, cao's of bedrijfsbeleid. Controleer altijd bij je werkgever of salarisstrook.",
    privacyDisclaimer:
      "🔒 PRIVACY: Je salarisgegevens blijven op je apparaat. Alleen feedback wordt naar mij verzonden. Er worden geen persoonlijke gegevens verzameld of opgeslagen.",

    // Language Switch
    languageSwitch: "🌍 Taal",

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

    // Feedback Form
    feedbackButton: "Feedback Sturen",
    feedbackTitle: "Feedback Sturen",
    feedbackSubtitle: "Help ons de app te verbeteren met je suggesties",
    feedbackType: "Type Feedback",
    featureRequest: "Feature Verzoek",
    bugReport: "Bug Rapport",
    improvement: "Verbetering",
    other: "Anders",
    feature: "Feature",
    bug: "Bug",
    feedbackTitleLabel: "Titel",
    feedbackTitlePlaceholder: "Korte beschrijving van je feedback",
    feedbackDescription: "Beschrijving",
    feedbackDescriptionPlaceholder:
      "Geef gedetailleerde informatie over je feedback...",
    feedbackPriority: "Prioriteit",
    low: "Laag",
    medium: "Gemiddeld",
    high: "Hoog",
    feedbackEmail: "Contact Email (Optioneel)",
    feedbackEmailPlaceholder: "jouw.email@voorbeeld.nl",
    optional: "Optioneel",
    submitFeedback: "Feedback Versturen",
    submitting: "Versturen...",
    feedbackSubmitted: "Feedback Verstuurd!",
    feedbackThankYou:
      "Bedankt voor je feedback. We bekijken het en nemen contact op indien nodig.",

    // Admin Panel
    adminButton: "Admin Paneel",
    feedbackAdminTitle: "Feedback Beheer",
    feedbackAdminSubtitle: "Bekijk en beheer gebruikersfeedback",
    filterByType: "Filter op Type",
    allTypes: "Alle Types",
    sortBy: "Sorteer Op",
    sortByDate: "Datum",
    sortByPriority: "Prioriteit",
    noFeedback: "Nog geen feedback ingediend",
    deleteFeedback: "Feedback Verwijderen",
    clearAllFeedback: "Alle Feedback Wissen",
    close: "Sluiten",
  },
};

// Function to get translation for a specific key and language
export const getTranslation = (
  key: keyof TranslationKeys,
  language: Language
): string => {
  return translations[language]?.[key] || key;
};
