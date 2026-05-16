import { describe, expect, it } from "vitest";

import { formatDateTime, formatLongDate, formatShortDate } from "../formatDate";

describe("formatDate utilities", () => {
  const testDate = new Date(2017, 5, 29, 12, 9, 33);

  it("formats date in short ru-RU format", () => {
    expect(formatShortDate(testDate)).toBe("29.06.2017");
  });

  it("formats date in long ru-RU format", () => {
    const result = formatLongDate(testDate);

    expect(result).toContain("29");
    expect(result).toContain("2017");
    expect(result.toLowerCase()).toContain("июн");
  });

  it("formats date and time", () => {
    const result = formatDateTime(testDate);

    expect(result).toContain("29.06.2017");
    expect(result).toContain("12:09");
  });
});
