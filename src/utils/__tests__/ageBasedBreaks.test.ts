import { calculateAutomaticBreak } from "../shiftCalculations";

describe("Age-based break calculation", () => {
  describe("Employees under 18 years old", () => {
    const minorAgeGroups = ["13-15", "16", "17"];

    minorAgeGroups.forEach(ageGroup => {
      describe(`Age group: ${ageGroup}`, () => {
        test("should give 15 minutes break for shifts up to 4 hours", () => {
          expect(calculateAutomaticBreak("09:00", "12:00", ageGroup)).toBe(15);
          expect(calculateAutomaticBreak("14:00", "18:00", ageGroup)).toBe(15);
        });

        test("should give 30 minutes break for shifts between 4-5.5 hours", () => {
          expect(calculateAutomaticBreak("09:00", "13:30", ageGroup)).toBe(30);
          expect(calculateAutomaticBreak("14:00", "19:30", ageGroup)).toBe(30);
        });

        test("should give 45 minutes break for shifts over 5.5 hours", () => {
          expect(calculateAutomaticBreak("09:00", "15:00", ageGroup)).toBe(45);
          expect(calculateAutomaticBreak("08:00", "16:00", ageGroup)).toBe(45);
        });
      });
    });
  });

  describe("Employees 18 years and older", () => {
    const adultAgeGroups = ["18", "19", "20", "21+"];

    adultAgeGroups.forEach(ageGroup => {
      describe(`Age group: ${ageGroup}`, () => {
        test("should give 15 minutes break for shifts up to 4.5 hours", () => {
          expect(calculateAutomaticBreak("09:00", "13:00", ageGroup)).toBe(15);
          expect(calculateAutomaticBreak("14:00", "18:30", ageGroup)).toBe(15);
        });

        test("should give 30 minutes break for shifts between 4.5-6 hours", () => {
          expect(calculateAutomaticBreak("09:00", "14:00", ageGroup)).toBe(30);
          expect(calculateAutomaticBreak("14:00", "20:00", ageGroup)).toBe(30);
        });

        test("should give 45 minutes break for shifts over 6 hours", () => {
          expect(calculateAutomaticBreak("09:00", "16:00", ageGroup)).toBe(45);
          expect(calculateAutomaticBreak("08:00", "17:00", ageGroup)).toBe(45);
        });
      });
    });
  });

  describe("Edge cases", () => {
    test("should handle shifts spanning midnight", () => {
      expect(calculateAutomaticBreak("22:00", "06:00", "17")).toBe(45); // 8 hours for minor
      expect(calculateAutomaticBreak("22:00", "06:00", "18")).toBe(45); // 8 hours for adult
    });

    test("should default to adult rules when no age group is provided", () => {
      expect(calculateAutomaticBreak("09:00", "13:00")).toBe(15); // 4 hours = 15 min for adults
      expect(calculateAutomaticBreak("09:00", "14:00")).toBe(30); // 5 hours = 30 min for adults
    });

    test("should handle very short shifts", () => {
      expect(calculateAutomaticBreak("09:00", "10:00", "16")).toBe(15); // 1 hour for minor
      expect(calculateAutomaticBreak("09:00", "10:00", "18")).toBe(15); // 1 hour for adult
    });
  });
});
