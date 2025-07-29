import {
  timeToDecimal,
  decimalToTime,
  validateNumericInput,
  calculateSalary,
} from "../calculations";
import { Config, WeekHours } from "../../types";
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

  describe("calculateSalary", () => {
    const mockConfig: Config = {
      ...DEFAULT_CONFIG,
      allInHourlyRate: 20,
    };

    const mockHours: WeekHours[] = [
      {
        regularHours: "8:00",
        paidBreaks: "0:30",
        allowance25: "1:00",
        allowance50: "0:00",
        allowance100: "0:00",
      },
    ];

    it("should calculate correct gross salary", () => {
      const result = calculateSalary(mockConfig, mockHours);

      // Regular hours: 8 * 20 = 160
      // Paid breaks: 0.5 * 20 = 10
      // Allowance 25%: 1 * 20 * 1.25 = 25
      // Total: 160 + 10 + 25 = 195
      expect(result.estimatedGrossSalary).toBe(195);
    });

    it("should calculate correct deductions", () => {
      const result = calculateSalary(mockConfig, mockHours);

      // Gross salary: 195
      // Pensioen premie: 195 * 0.0159 = 3.10
      // SPAWW: 195 * 0.001 = 0.20
      // Salary before tax: 195 - 3.10 - 0.20 = 191.70
      // WGA: 191.70 * 0.0047 = 0.90
      // Loonheffing: 191.70 * 0.0781 = 14.97
      // Net salary: 195 - 3.10 - 0.20 - 0.90 - 14.97 = 175.83

      expect(result.estimatedPensioenPremie).toBe(3.1);
      expect(result.estimatedSpaww).toBe(0.2);
      expect(result.estimatedPremieWGAWerknemer).toBe(0.9);
      expect(result.estimatedLoonheffing).toBe(14.97);
      expect(result.estimatedNetSalary).toBe(175.83);
    });

    it("should handle multiple weeks", () => {
      const multipleWeeks: WeekHours[] = [
        { ...mockHours[0] },
        { ...mockHours[0] },
      ];

      const result = calculateSalary(mockConfig, multipleWeeks);

      // Double the hours, so double the salary
      expect(result.estimatedGrossSalary).toBe(390);
    });

    it("should handle zero hours", () => {
      const zeroHours: WeekHours[] = [
        {
          regularHours: "0:00",
          paidBreaks: "0:00",
          allowance25: "0:00",
          allowance50: "0:00",
          allowance100: "0:00",
        },
      ];

      const result = calculateSalary(mockConfig, zeroHours);

      expect(result.estimatedGrossSalary).toBe(0);
      expect(result.estimatedNetSalary).toBe(0);
    });

    it("should handle large hour values (0-99 range)", () => {
      const largeHours: WeekHours[] = [
        {
          regularHours: "99:00",
          paidBreaks: "0:00",
          allowance25: "0:00",
          allowance50: "0:00",
          allowance100: "0:00",
        },
      ];

      const result = calculateSalary(mockConfig, largeHours);

      // 99 hours * 20 = 1980
      expect(result.estimatedGrossSalary).toBe(1980);
      expect(result.totalRegularHours).toBe("99:00");
    });

    it("should handle all allowance types", () => {
      const allAllowances: WeekHours[] = [
        {
          regularHours: "8:00",
          paidBreaks: "0:30",
          allowance25: "1:00",
          allowance50: "2:00",
          allowance100: "3:00",
        },
      ];

      const result = calculateSalary(mockConfig, allAllowances);

      // Regular hours: 8 * 20 = 160
      // Paid breaks: 0.5 * 20 = 10
      // Allowance 25%: 1 * 20 * 1.25 = 25
      // Allowance 50%: 2 * 20 * 1.5 = 60
      // Allowance 100%: 3 * 20 * 2 = 120
      // Total: 160 + 10 + 25 + 60 + 120 = 375
      expect(result.estimatedGrossSalary).toBe(375);
    });

    it("should return all required result fields", () => {
      const result = calculateSalary(mockConfig, mockHours);

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
