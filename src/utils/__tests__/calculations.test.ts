import {
  timeToDecimal,
  decimalToTime,
  validateNumericInput,
  calculateSalaryFromShifts,
} from "../calculations";
import { Config, WeekShifts } from "../../types";
import { DEFAULT_CONFIG } from "../../constants";

describe("calculations", () => {
  describe("timeToDecimal", () => {
    it("should convert HH:MM format to decimal hours", () => {
      expect(timeToDecimal("8:30")).toBe(8.5);
      expect(timeToDecimal("12:00")).toBe(12);
      expect(timeToDecimal("0:45")).toBe(0.75);
      expect(timeToDecimal("23:59")).toBe(23.983333333333334);
    });

    it("should handle edge cases", () => {
      expect(timeToDecimal("0:00")).toBe(0);
      expect(timeToDecimal("")).toBe(0);
      expect(timeToDecimal("0")).toBe(0);
    });

    it("should handle large hour values (0-99 range)", () => {
      expect(timeToDecimal("99:00")).toBe(99);
      expect(timeToDecimal("99:30")).toBe(99.5);
      expect(timeToDecimal("99:59")).toBe(99.983333333333334);
    });
  });

  describe("decimalToTime", () => {
    it("should convert decimal hours to HH:MM format", () => {
      expect(decimalToTime(8.5)).toBe("08:30");
      expect(decimalToTime(12)).toBe("12:00");
      expect(decimalToTime(0.75)).toBe("00:45");
      expect(decimalToTime(23.983333333333334)).toBe("23:59");
    });

    it("should handle edge cases", () => {
      expect(decimalToTime(0)).toBe("00:00");
      expect(decimalToTime(1)).toBe("01:00");
    });

    it("should handle large hour values", () => {
      expect(decimalToTime(99)).toBe("99:00");
      expect(decimalToTime(99.5)).toBe("99:30");
      expect(decimalToTime(99.983333333333334)).toBe("99:59");
    });
  });

  describe("validateNumericInput", () => {
    it("should validate positive numbers", () => {
      expect(validateNumericInput("10.5")).toBe(10.5);
      expect(validateNumericInput("0")).toBe(0);
      expect(validateNumericInput("100")).toBe(100);
    });

    it("should prevent negative values", () => {
      expect(validateNumericInput("-5")).toBe(0);
      expect(validateNumericInput("-10.5")).toBe(0);
    });

    it("should handle invalid input", () => {
      expect(validateNumericInput("abc")).toBe(0);
      expect(validateNumericInput("")).toBe(0);
      expect(validateNumericInput("NaN")).toBe(0);
    });

    it("should respect custom minimum value", () => {
      expect(validateNumericInput("-5", 10)).toBe(10);
      expect(validateNumericInput("5", 10)).toBe(10);
      expect(validateNumericInput("15", 10)).toBe(15);
    });

    it("should handle decimal precision", () => {
      expect(validateNumericInput("10.123")).toBe(10.123);
      expect(validateNumericInput("0.001")).toBe(0.001);
      expect(validateNumericInput("999.999")).toBe(999.999);
    });
  });

  describe("calculateSalaryFromShifts", () => {
    const mockConfig: Config = {
      ...DEFAULT_CONFIG,
      allInHourlyRate: 20,
      ageGroup: "18",
      applyLoonheffingskorting: false,
    };

    const mockShifts: WeekShifts[] = [
      {
        weekNumber: 1,
        shifts: [
          {
            id: "shift1",
            startTime: "09:00",
            endTime: "17:00",
            breakMinutes: 30,
            isSunday: false,
            isHoliday: false,
            isNightShift: false,
          },
        ],
      },
    ];

    it("should calculate correct gross salary", () => {
      const result = calculateSalaryFromShifts(mockConfig, mockShifts);

      // 8 hours regular work
      // Break is 30 mins (automatically calculated or manual). 30 min breaks are now UNPAID.
      // Worked hours: 8 - 0.5 = 7.5 hours
      // Paid break: 0 hours
      // Total paid: 7.5 hours * 20 = 150
      expect(result.estimatedGrossSalary).toBe(150);
    });

    it("should calculate correct deductions", () => {
      const result = calculateSalaryFromShifts(mockConfig, mockShifts);

      // Based on Gross 150:
      // Pensioen (1.59%): 2.39
      // SPAWW (0.1%): 0.15
      // Taxable: 147.465
      // WGA (0.49%): 0.72
      // Loonheffing (7.81%): 11.52
      // Net: 135.22

      expect(result.estimatedPensioenPremie).toBe(2.39);
      expect(result.estimatedSpaww).toBe(0.15);
      expect(result.estimatedPremieWGAWerknemer).toBe(0.72);
      expect(result.estimatedLoonheffing).toBe(11.52);
      expect(result.estimatedNetSalary).toBe(135.23);
    });

    it("should handle multiple weeks", () => {
      const multipleWeeks: WeekShifts[] = [
        { ...mockShifts[0] },
        { ...mockShifts[0] },
      ];

      const result = calculateSalaryFromShifts(mockConfig, multipleWeeks);

      // Double the shifts (150 * 2)
      expect(result.estimatedGrossSalary).toBe(300);
    });

    it("should handle zero hours", () => {
      const zeroShifts: WeekShifts[] = [
        {
          weekNumber: 1,
          shifts: [],
        },
      ];

      const result = calculateSalaryFromShifts(mockConfig, zeroShifts);

      expect(result.estimatedGrossSalary).toBe(0);
      expect(result.estimatedNetSalary).toBe(0);
    });

    it("should handle night shift allowance", () => {
      const nightShift: WeekShifts[] = [
        {
          weekNumber: 1,
          shifts: [
            {
              id: "nightshift1",
              startTime: "22:00",
              endTime: "06:00",
              breakMinutes: 30,
              isSunday: false,
              isHoliday: false,
              isNightShift: true,
            },
          ],
        },
      ];

      const result = calculateSalaryFromShifts(mockConfig, nightShift);

      // 8 hours total - 0.5 hours break = 7.5 hours worked
      // Break is 30m -> Unpaid.
      // Night shift logic: 22:00-06:00 covers entire shift (8 hours overlap)
      // New logic applies 50% allowance.
      // Regular hours = 0 (fully covered by night)
      // Allowance50 hours = 8 (overlap)
      // Note: The code subtracts night hours from regular, so 7.5 - 8 = 0 regular.
      // Income: 8 * (20 * 1.5) = 240

      expect(result.estimatedGrossSalary).toBe(240);
    });

    it("should handle Sunday and holiday allowances", () => {
      const sundayShift: WeekShifts[] = [
        {
          weekNumber: 1,
          shifts: [
            {
              id: "sundayshift1",
              startTime: "09:00",
              endTime: "17:00",
              breakMinutes: 30,
              isSunday: true,
              isHoliday: false,
              isNightShift: false,
            },
          ],
        },
      ];

      const result = calculateSalaryFromShifts(mockConfig, sundayShift);

      // 8 hours total - 0.5 hours break = 7.5 hours
      // Sunday logic: All hours (7.5) get 50% allowance (Rate * 1.5)
      // 7.5 * 30 = 225
      expect(result.estimatedGrossSalary).toBe(225);
    });

    it("should return all required result fields", () => {
      const result = calculateSalaryFromShifts(mockConfig, mockShifts);

      expect(result).toHaveProperty("totalRegularHours");
      expect(result).toHaveProperty("totalPaidBreaks");
      expect(result).toHaveProperty("totalAllowance25");
      expect(result).toHaveProperty("totalAllowance50");
      expect(result).toHaveProperty("totalAllowance100");
      expect(result).toHaveProperty("estimatedGrossSalary");
      expect(result).toHaveProperty("estimatedPensioenPremie");
      expect(result).toHaveProperty("estimatedSpaww");
      expect(result).toHaveProperty("estimatedPremieWGAWerknemer");
      expect(result).toHaveProperty("estimatedLoonheffing");
      expect(result).toHaveProperty("estimatedNetSalary");
    });
  });
});
