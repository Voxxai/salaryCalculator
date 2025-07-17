// Translation utilities for the salary calculator

export const translations = {
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
    regularHours: "Regular Hours (HH:MM)",
    overtimeHours: "Overtime Hours 50 (HH:MM)",

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
    regularHours: "Reguliere Uren (HH:MM)",
    overtimeHours: "Toeslaguren 50 (HH:MM)",

    // Footer
    tip: "💡 Tip: Voer uren in het formaat HH:MM in (bijv. 8:30 voor 8 uur en 30 minuten)",
    disclaimer:
      "Alle berekeningen zijn geschat en kunnen afwijken van je daadwerkelijke salarisstrook.",

    // Language Switch
    languageSwitch: "🌍 Taal",
  },
};

// Function to get translation for a specific key and language
export const getTranslation = (key, language) => {
  return translations[language]?.[key] || key;
};
