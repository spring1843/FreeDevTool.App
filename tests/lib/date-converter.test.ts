import { describe, it, expect } from "vitest";

// Replicate the parseInputDate function from the component with format parameter
const parseInputDate = (input: string, format: string = "auto"): Date | null => {
  const trimmed = input.trim();

  // Parse based on selected format
  if (format === "unix") {
    const num = parseInt(trimmed, 10);
    if (isNaN(num)) return null;
    return new Date(num * 1000);
  }

  if (format === "unixms") {
    const num = parseInt(trimmed, 10);
    if (isNaN(num)) return null;
    return new Date(num);
  }

  if (format === "iso") {
    const date = new Date(trimmed);
    return isNaN(date.getTime()) ? null : date;
  }

  if (format === "isodate") {
    const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const [, y, m, d] = match.map(Number);
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() !== y ||
      date.getMonth() + 1 !== m ||
      date.getDate() !== d
    ) {
      return null;
    }
    return date;
  }

  if (format === "us") {
    const match = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!match) return null;
    const [, m, d, y] = match.map(Number);
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() !== y ||
      date.getMonth() + 1 !== m ||
      date.getDate() !== d
    ) {
      return null;
    }
    return date;
  }

  if (format === "eu") {
    const match = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!match) return null;
    const [, d, m, y] = match.map(Number);
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() !== y ||
      date.getMonth() + 1 !== m ||
      date.getDate() !== d
    ) {
      return null;
    }
    return date;
  }

  if (format === "sql") {
    const match = trimmed.match(
      /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/
    );
    if (!match) return null;
    const [, y, mo, d, h, mi, s] = match.map(Number);
    const date = new Date(y, mo - 1, d, h, mi, s);
    if (
      date.getFullYear() !== y ||
      date.getMonth() + 1 !== mo ||
      date.getDate() !== d
    ) {
      return null;
    }
    return date;
  }

  if (format === "sqldate") {
    const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const [, y, m, d] = match.map(Number);
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() !== y ||
      date.getMonth() + 1 !== m ||
      date.getDate() !== d
    ) {
      return null;
    }
    return date;
  }

  if (format === "rfc2822" || format === "rfc3339") {
    const date = new Date(trimmed);
    return isNaN(date.getTime()) ? null : date;
  }

  if (format === "shorttext") {
    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const match = trimmed.match(/^([A-Za-z]{3})\s+(\d{1,2}),?\s+(\d{4})$/);
    if (!match) return null;
    const [, monthStr, dayStr, yearStr] = match;
    const monthIdx = months.indexOf(monthStr.toLowerCase());
    if (monthIdx === -1) return null;
    const date = new Date(parseInt(yearStr), monthIdx, parseInt(dayStr));
    return isNaN(date.getTime()) ? null : date;
  }

  if (format === "fulltext") {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    const match = trimmed.match(
      /^[A-Za-z]+,?\s+([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/
    );
    if (!match) return null;
    const [, monthStr, dayStr, yearStr] = match;
    const monthIdx = months.indexOf(monthStr.toLowerCase());
    if (monthIdx === -1) return null;
    const date = new Date(parseInt(yearStr), monthIdx, parseInt(dayStr));
    return isNaN(date.getTime()) ? null : date;
  }

  // Auto-detect mode
  if (/^-?\d{10}$/.test(trimmed)) {
    return new Date(parseInt(trimmed) * 1000);
  }

  if (/^-?\d{13}$/.test(trimmed)) {
    return new Date(parseInt(trimmed));
  }

  const date = new Date(trimmed);
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split("-").map(Number);
    if (
      date.getUTCFullYear() !== y ||
      date.getUTCMonth() + 1 !== m ||
      date.getUTCDate() !== d
    ) {
      return null;
    }
  }
  return isNaN(date.getTime()) ? null : date;
};

const formatDate = (date: Date, format: string): string => {
  const pad = (n: number) => String(n).padStart(2, "0");

  switch (format) {
    case "unix":
      return Math.floor(date.getTime() / 1000).toString();
    case "unixms":
      return date.getTime().toString();
    case "iso":
      return date.toISOString();
    case "isodate":
      return date.toISOString().split("T")[0];
    case "isotime":
      return date.toISOString().split("T")[1];
    case "rfc822": {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const year2 = String(date.getUTCFullYear()).slice(-2);
      return `${pad(date.getUTCDate())} ${months[date.getUTCMonth()]} ${year2} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} GMT`;
    }
    case "rfc822z": {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const year2 = String(date.getUTCFullYear()).slice(-2);
      return `${pad(date.getUTCDate())} ${months[date.getUTCMonth()]} ${year2} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} +0000`;
    }
    case "rfc850": {
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const year2 = String(date.getUTCFullYear()).slice(-2);
      return `${weekdays[date.getUTCDay()]}, ${pad(date.getUTCDate())}-${months[date.getUTCMonth()]}-${year2} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} GMT`;
    }
    case "rfc1123": {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${weekdays[date.getUTCDay()]}, ${pad(date.getUTCDate())} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} GMT`;
    }
    case "rfc1123z": {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${weekdays[date.getUTCDay()]}, ${pad(date.getUTCDate())} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} +0000`;
    }
    case "rfc2822":
      return date.toUTCString();
    case "rfc3339":
      return date.toISOString().replace(/\.\d{3}Z$/, "Z");
    case "rfc3339nano": {
      const iso = date.toISOString();
      return iso.replace(
        /\.\d{3}Z$/,
        `.${String(date.getMilliseconds()).padStart(3, "0")}000000Z`
      );
    }
    case "ansic": {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day = date.getDate();
      const dayStr = day < 10 ? ` ${day}` : String(day);
      return `${weekdays[date.getDay()]} ${months[date.getMonth()]} ${dayStr} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${date.getFullYear()}`;
    }
    case "unixdate": {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day = date.getDate();
      const dayStr = day < 10 ? ` ${day}` : String(day);
      return `${weekdays[date.getDay()]} ${months[date.getMonth()]} ${dayStr} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} Local ${date.getFullYear()}`;
    }
    case "rubydate": {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? "+" : "-";
      const absOffset = Math.abs(offset);
      const offsetHours = pad(Math.floor(absOffset / 60));
      const offsetMins = pad(absOffset % 60);
      return `${weekdays[date.getDay()]} ${months[date.getMonth()]} ${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${sign}${offsetHours}${offsetMins} ${date.getFullYear()}`;
    }
    case "us":
      return `${pad(date.getUTCMonth() + 1)}/${pad(date.getUTCDate())}/${date.getUTCFullYear()}`;
    case "eu":
      return `${pad(date.getUTCDate())}/${pad(date.getUTCMonth() + 1)}/${date.getUTCFullYear()}`;
    case "numeric":
      return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
    case "sql":
      return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
    case "sqldate":
      return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
    case "objectid": {
      const timestamp = Math.floor(date.getTime() / 1000).toString(16);
      return `${timestamp.padStart(8, "0")}f1a2b3c4d5e6f789`;
    }
    case "full":
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
    case "short":
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      });
    case "time12":
      return date.toLocaleTimeString("en-US", {
        hour12: true,
        timeZone: "UTC",
      });
    case "time24":
      return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
    case "http":
      return date.toUTCString();
    case "json":
      return date.toISOString();
    case "cookie":
      return date.toUTCString().replace(/GMT/, "GMT");
    default:
      return date.toString();
  }
};

describe("Date Converter", () => {
  const testDate = new Date("2024-01-15T14:30:45.123Z");

  describe("Input Format Parsing", () => {
    describe("Unix Timestamps", () => {
      it("should parse Unix timestamp (seconds) with auto-detect", () => {
        const result = parseInputDate("1699123456");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2023);
      });

      it("should parse Unix timestamp (seconds) with explicit format", () => {
        const result = parseInputDate("1705329045", "unix");
        expect(result).toBeInstanceOf(Date);
        expect(result!.toISOString()).toContain("2024-01-15");
      });

      it("should parse Unix timestamp (milliseconds) with explicit format", () => {
        const result = parseInputDate("1705329045123", "unixms");
        expect(result).toBeInstanceOf(Date);
        expect(result!.toISOString()).toBe("2024-01-15T14:30:45.123Z");
      });

      it("should parse negative Unix timestamp for pre-epoch dates", () => {
        const result = parseInputDate("-1000000000");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(1938);
      });
    });

    describe("ISO 8601 Format", () => {
      it("should parse full ISO 8601 with explicit format", () => {
        const result = parseInputDate("2024-01-15T14:30:45.123Z", "iso");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
        expect(result!.getUTCMonth()).toBe(0);
        expect(result!.getUTCDate()).toBe(15);
      });

      it("should parse ISO date only with explicit format", () => {
        const result = parseInputDate("2024-06-20", "isodate");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
        expect(result!.getMonth()).toBe(5);
        expect(result!.getDate()).toBe(20);
      });

      it("should reject malformed ISO date format", () => {
        const result = parseInputDate("2024/01/15", "isodate");
        expect(result).toBeNull();
      });
    });

    describe("Regional Formats", () => {
      it("should parse US format (MM/DD/YYYY)", () => {
        const result = parseInputDate("01/15/2024", "us");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
        expect(result!.getMonth()).toBe(0);
        expect(result!.getDate()).toBe(15);
      });

      it("should parse EU format (DD/MM/YYYY)", () => {
        const result = parseInputDate("15/01/2024", "eu");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
        expect(result!.getMonth()).toBe(0);
        expect(result!.getDate()).toBe(15);
      });

      it("should distinguish US vs EU format for ambiguous dates", () => {
        const usResult = parseInputDate("03/04/2024", "us");
        const euResult = parseInputDate("03/04/2024", "eu");

        expect(usResult!.getMonth()).toBe(2);
        expect(usResult!.getDate()).toBe(4);

        expect(euResult!.getMonth()).toBe(3);
        expect(euResult!.getDate()).toBe(3);
      });
    });

    describe("SQL Formats", () => {
      it("should parse SQL datetime format", () => {
        const result = parseInputDate("2024-01-15 14:30:45", "sql");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
        expect(result!.getHours()).toBe(14);
        expect(result!.getMinutes()).toBe(30);
        expect(result!.getSeconds()).toBe(45);
      });

      it("should parse SQL date format", () => {
        const result = parseInputDate("2024-01-15", "sqldate");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
        expect(result!.getMonth()).toBe(0);
        expect(result!.getDate()).toBe(15);
      });

      it("should reject invalid SQL datetime format", () => {
        const result = parseInputDate("2024-01-15T14:30:45", "sql");
        expect(result).toBeNull();
      });
    });

    describe("RFC Formats", () => {
      it("should parse RFC 2822 format", () => {
        const result = parseInputDate("Mon, 15 Jan 2024 14:30:45 GMT", "rfc2822");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
      });

      it("should parse RFC 3339 format", () => {
        const result = parseInputDate("2024-01-15T14:30:45Z", "rfc3339");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
      });
    });

    describe("Human Readable Formats", () => {
      it("should parse short text format (Mon DD, YYYY)", () => {
        const result = parseInputDate("Jan 15, 2024", "shorttext");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
        expect(result!.getMonth()).toBe(0);
        expect(result!.getDate()).toBe(15);
      });

      it("should parse short text without comma", () => {
        const result = parseInputDate("Jan 15 2024", "shorttext");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
      });

      it("should parse full text format (Weekday, Month DD, YYYY)", () => {
        const result = parseInputDate("Monday, January 15, 2024", "fulltext");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
        expect(result!.getMonth()).toBe(0);
        expect(result!.getDate()).toBe(15);
      });

      it("should parse full text without weekday comma", () => {
        const result = parseInputDate("Monday January 15, 2024", "fulltext");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getFullYear()).toBe(2024);
      });

      it("should reject invalid month names", () => {
        const result = parseInputDate("Foo 15, 2024", "shorttext");
        expect(result).toBeNull();
      });
    });
  });

  describe("Invalid Date Handling", () => {
    describe("Invalid Leap Years", () => {
      it("should reject Feb 29 in non-leap year (2023)", () => {
        const result = parseInputDate("2023-02-29", "isodate");
        expect(result).toBeNull();
      });

      it("should reject Feb 29 in century non-leap year (2100)", () => {
        const result = parseInputDate("2100-02-29", "isodate");
        expect(result).toBeNull();
      });

      it("should reject Feb 29 in century non-leap year (1900)", () => {
        const result = parseInputDate("1900-02-29", "isodate");
        expect(result).toBeNull();
      });

      it("should accept Feb 29 in leap year (2024)", () => {
        const result = parseInputDate("2024-02-29", "isodate");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getMonth()).toBe(1);
        expect(result!.getDate()).toBe(29);
      });

      it("should accept Feb 29 in century leap year (2000)", () => {
        const result = parseInputDate("2000-02-29", "isodate");
        expect(result).toBeInstanceOf(Date);
        expect(result!.getDate()).toBe(29);
      });
    });

    describe("Invalid Day of Month", () => {
      it("should reject Feb 30", () => {
        const result = parseInputDate("2024-02-30", "isodate");
        expect(result).toBeNull();
      });

      it("should reject Feb 31", () => {
        const result = parseInputDate("2024-02-31", "isodate");
        expect(result).toBeNull();
      });

      it("should reject Apr 31 (April has 30 days)", () => {
        const result = parseInputDate("2024-04-31", "isodate");
        expect(result).toBeNull();
      });

      it("should reject Jun 31 (June has 30 days)", () => {
        const result = parseInputDate("2024-06-31", "isodate");
        expect(result).toBeNull();
      });

      it("should reject Sep 31 (September has 30 days)", () => {
        const result = parseInputDate("2024-09-31", "isodate");
        expect(result).toBeNull();
      });

      it("should reject Nov 31 (November has 30 days)", () => {
        const result = parseInputDate("2024-11-31", "isodate");
        expect(result).toBeNull();
      });

      it("should reject day 0", () => {
        const result = parseInputDate("2024-01-00", "isodate");
        expect(result).toBeNull();
      });

      it("should reject day 32", () => {
        const result = parseInputDate("2024-01-32", "isodate");
        expect(result).toBeNull();
      });
    });

    describe("Invalid Month", () => {
      it("should reject month 0", () => {
        const result = parseInputDate("2024-00-15", "isodate");
        expect(result).toBeNull();
      });

      it("should reject month 13", () => {
        const result = parseInputDate("2024-13-15", "isodate");
        expect(result).toBeNull();
      });
    });

    describe("Invalid Input Strings", () => {
      it("should reject empty string", () => {
        const result = parseInputDate("");
        expect(result).toBeNull();
      });

      it("should reject random text", () => {
        const result = parseInputDate("not-a-date");
        expect(result).toBeNull();
      });

      it("should reject partial dates", () => {
        const result = parseInputDate("2024-01", "isodate");
        expect(result).toBeNull();
      });

      it("should reject wrong format delimiter", () => {
        const result = parseInputDate("2024/01/15", "isodate");
        expect(result).toBeNull();
      });
    });
  });

  describe("Output Format Conversion", () => {
    describe("Timestamp Formats", () => {
      it("should format Unix timestamp correctly", () => {
        const result = formatDate(testDate, "unix");
        expect(result).toBe("1705329045");
      });

      it("should format Unix milliseconds correctly", () => {
        const result = formatDate(testDate, "unixms");
        expect(result).toBe("1705329045123");
      });
    });

    describe("ISO Standards", () => {
      it("should format ISO 8601 correctly", () => {
        const result = formatDate(testDate, "iso");
        expect(result).toBe("2024-01-15T14:30:45.123Z");
      });

      it("should format ISO date only correctly", () => {
        const result = formatDate(testDate, "isodate");
        expect(result).toBe("2024-01-15");
      });

      it("should format ISO time only correctly", () => {
        const result = formatDate(testDate, "isotime");
        expect(result).toBe("14:30:45.123Z");
      });
    });

    describe("RFC Standards", () => {
      it("should format RFC 822 correctly", () => {
        const result = formatDate(testDate, "rfc822");
        expect(result).toBe("15 Jan 24 14:30 GMT");
      });

      it("should format RFC 822Z correctly", () => {
        const result = formatDate(testDate, "rfc822z");
        expect(result).toBe("15 Jan 24 14:30 +0000");
      });

      it("should format RFC 850 correctly", () => {
        const result = formatDate(testDate, "rfc850");
        expect(result).toBe("Monday, 15-Jan-24 14:30:45 GMT");
      });

      it("should format RFC 1123 correctly", () => {
        const result = formatDate(testDate, "rfc1123");
        expect(result).toBe("Mon, 15 Jan 2024 14:30:45 GMT");
      });

      it("should format RFC 1123Z correctly", () => {
        const result = formatDate(testDate, "rfc1123z");
        expect(result).toBe("Mon, 15 Jan 2024 14:30:45 +0000");
      });

      it("should format RFC 2822 correctly", () => {
        const result = formatDate(testDate, "rfc2822");
        expect(result).toBe("Mon, 15 Jan 2024 14:30:45 GMT");
      });

      it("should format RFC 3339 correctly", () => {
        const result = formatDate(testDate, "rfc3339");
        expect(result).toBe("2024-01-15T14:30:45Z");
      });

      it("should format RFC 3339 Nano correctly", () => {
        const result = formatDate(testDate, "rfc3339nano");
        expect(result).toBe("2024-01-15T14:30:45.123000000Z");
      });
    });

    describe("Unix-style Formats", () => {
      it("should format ANSIC correctly", () => {
        const result = formatDate(testDate, "ansic");
        expect(result).toMatch(/^[A-Z][a-z]{2} [A-Z][a-z]{2} \s?\d{1,2} \d{2}:\d{2}:\d{2} \d{4}$/);
      });

      it("should format Unix Date correctly", () => {
        const result = formatDate(testDate, "unixdate");
        expect(result).toMatch(/^[A-Z][a-z]{2} [A-Z][a-z]{2} \s?\d{1,2} \d{2}:\d{2}:\d{2} \w+ \d{4}$/);
      });

      it("should format Ruby Date correctly", () => {
        const result = formatDate(testDate, "rubydate");
        expect(result).toMatch(
          /^[A-Z][a-z]{2} [A-Z][a-z]{2} \d{2} \d{2}:\d{2}:\d{2} [+-]\d{4} \d{4}$/
        );
      });
    });

    describe("Regional Formats", () => {
      it("should format US format correctly", () => {
        const result = formatDate(testDate, "us");
        expect(result).toBe("01/15/2024");
      });

      it("should format European format correctly", () => {
        const result = formatDate(testDate, "eu");
        expect(result).toBe("15/01/2024");
      });

      it("should format ISO numeric correctly", () => {
        const result = formatDate(testDate, "numeric");
        expect(result).toBe("2024-01-15");
      });
    });

    describe("Database Formats", () => {
      it("should format SQL datetime correctly", () => {
        const result = formatDate(testDate, "sql");
        expect(result).toBe("2024-01-15 14:30:45");
      });

      it("should format SQL date correctly", () => {
        const result = formatDate(testDate, "sqldate");
        expect(result).toBe("2024-01-15");
      });

      it("should format MongoDB ObjectId correctly", () => {
        const result = formatDate(testDate, "objectid");
        expect(result).toMatch(/^[0-9a-f]{8}f1a2b3c4d5e6f789$/);
        expect(result.length).toBe(24);
      });
    });

    describe("Human Readable Formats", () => {
      it("should format full text correctly", () => {
        const result = formatDate(testDate, "full");
        expect(result).toBe("Monday, January 15, 2024");
      });

      it("should format short text correctly", () => {
        const result = formatDate(testDate, "short");
        expect(result).toBe("Jan 15, 2024");
      });

      it("should format 12-hour time correctly", () => {
        const result = formatDate(testDate, "time12");
        expect(result).toMatch(/2:30:45\s?PM/i);
      });

      it("should format 24-hour time correctly", () => {
        const result = formatDate(testDate, "time24");
        expect(result).toBe("14:30:45");
      });
    });

    describe("Web/API Formats", () => {
      it("should format HTTP date correctly", () => {
        const result = formatDate(testDate, "http");
        expect(result).toBe("Mon, 15 Jan 2024 14:30:45 GMT");
      });

      it("should format JSON date correctly", () => {
        const result = formatDate(testDate, "json");
        expect(result).toBe("2024-01-15T14:30:45.123Z");
      });

      it("should format cookie expires correctly", () => {
        const result = formatDate(testDate, "cookie");
        expect(result).toBe("Mon, 15 Jan 2024 14:30:45 GMT");
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle epoch start correctly", () => {
      const epoch = new Date(0);
      expect(formatDate(epoch, "unix")).toBe("0");
      expect(formatDate(epoch, "isodate")).toBe("1970-01-01");
    });

    it("should handle leap year Feb 29 correctly", () => {
      const leapDay = new Date("2024-02-29T12:00:00Z");
      expect(formatDate(leapDay, "numeric")).toBe("2024-02-29");
      expect(formatDate(leapDay, "us")).toBe("02/29/2024");
      expect(formatDate(leapDay, "eu")).toBe("29/02/2024");
    });

    it("should handle year boundaries correctly", () => {
      const newYear = new Date("2024-01-01T00:00:00Z");
      expect(formatDate(newYear, "rfc2822")).toBe("Mon, 01 Jan 2024 00:00:00 GMT");
    });

    it("should handle single digit dates with padding", () => {
      const earlyDate = new Date("2024-01-05T09:05:05Z");
      expect(formatDate(earlyDate, "us")).toBe("01/05/2024");
      expect(formatDate(earlyDate, "eu")).toBe("05/01/2024");
      expect(formatDate(earlyDate, "time24")).toBe("09:05:05");
    });

    it("should handle midnight correctly", () => {
      const midnight = new Date("2024-01-15T00:00:00Z");
      expect(formatDate(midnight, "time24")).toBe("00:00:00");
    });

    it("should handle noon correctly", () => {
      const noon = new Date("2024-01-15T12:00:00Z");
      expect(formatDate(noon, "time24")).toBe("12:00:00");
    });

    it("should handle end of day correctly", () => {
      const endOfDay = new Date("2024-01-15T23:59:59Z");
      expect(formatDate(endOfDay, "time24")).toBe("23:59:59");
    });

    it("should return valid string for unknown format", () => {
      const result = formatDate(testDate, "unknown-format");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("Round-trip Conversion", () => {
    it("should preserve date through Unix timestamp round-trip", () => {
      const original = new Date("2024-06-15T10:30:00.000Z");
      const unixStr = formatDate(original, "unix");
      const parsed = parseInputDate(unixStr, "unix");
      expect(parsed!.getTime()).toBe(original.getTime());
    });

    it("should preserve date through ISO round-trip", () => {
      const original = new Date("2024-06-15T10:30:45.123Z");
      const isoStr = formatDate(original, "iso");
      const parsed = parseInputDate(isoStr, "iso");
      expect(parsed!.toISOString()).toBe(original.toISOString());
    });
  });
});
