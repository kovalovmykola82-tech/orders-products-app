import { describe, expect, it } from "vitest";

import { calculateTotalsByCurrency, formatCurrencyTotal } from "../calculateTotals";

describe("calculateTotals utilities", () => {
  it("calculates totals grouped by currency", () => {
    const products = [
      {
        prices: [
          { value: "100", symbol: "USD" },
          { value: "2600", symbol: "UAH" },
        ],
      },
      {
        prices: [
          { value: "120", symbol: "USD" },
          { value: "3120", symbol: "UAH" },
        ],
      },
    ];

    expect(calculateTotalsByCurrency(products)).toEqual({
      USD: 220,
      UAH: 5720,
    });
  });

  it("returns empty object for empty products list", () => {
    expect(calculateTotalsByCurrency([])).toEqual({});
  });

  it("formats currency total with ru-RU locale", () => {
    const result = formatCurrencyTotal(5720, "UAH");

    expect(result).toContain("UAH");
    expect(result.replace(/\s/g, "")).toBe("5720UAH");
  });
});
