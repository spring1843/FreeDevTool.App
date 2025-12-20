import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Clock } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import {
  ResetButton,
  ClearButton,
  NowButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";

import { SecurityBanner } from "@/components/ui/security-banner";
import { useToast } from "@/hooks/use-toast";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

interface DateFormat {
  name: string;
  value: string;
  description: string;
  pattern: string;
  category: string;
}

// Input format options with detailed patterns
const INPUT_FORMATS = [
  {
    value: "auto",
    label: "Auto-detect",
    description: "Automatically detect input format",
  },
  // Timestamps
  {
    value: "unix",
    label: "Unix Epoch (seconds)",
    description: "e.g., 1699123456",
  },
  {
    value: "unixms",
    label: "Unix Epoch (milliseconds)",
    description: "e.g., 1699123456000",
  },
  // ISO Standards
  {
    value: "iso",
    label: "ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)",
    description: "e.g., 2024-01-15T14:30:45.123Z",
  },
  {
    value: "isodate",
    label: "ISO 8601 Date (YYYY-MM-DD)",
    description: "e.g., 2024-01-15",
  },
  // Regional
  {
    value: "us",
    label: "US Format (MM/DD/YYYY)",
    description: "e.g., 01/15/2024",
  },
  {
    value: "eu",
    label: "EU Format (DD/MM/YYYY)",
    description: "e.g., 15/01/2024",
  },
  // SQL/Database
  {
    value: "sql",
    label: "SQL DateTime (YYYY-MM-DD HH:mm:ss)",
    description: "e.g., 2024-01-15 14:30:45",
  },
  {
    value: "sqldate",
    label: "SQL Date (YYYY-MM-DD)",
    description: "e.g., 2024-01-15",
  },
  // RFC Standards
  {
    value: "rfc2822",
    label: "RFC 2822 (ddd, DD MMM YYYY HH:mm:ss GMT)",
    description: "e.g., Mon, 15 Jan 2024 14:30:45 GMT",
  },
  {
    value: "rfc3339",
    label: "RFC 3339 (YYYY-MM-DDTHH:mm:ssZ)",
    description: "e.g., 2024-01-15T14:30:45Z",
  },
  // Shamsi/Jalali
  {
    value: "shamsi",
    label: "Shamsi/Jalali (YYYY/MM/DD)",
    description: "e.g., 1402/10/25 (Persian calendar)",
  },
  // Human Readable
  {
    value: "shorttext",
    label: "Short Text (Mon DD, YYYY)",
    description: "e.g., Jan 15, 2024",
  },
  {
    value: "fulltext",
    label: "Full Text (Weekday, Month DD, YYYY)",
    description: "e.g., Monday, January 15, 2024",
  },
];

// 20 Essential Date Formats for Developers
const DATE_FORMATS = [
  // Unix & Timestamps
  {
    name: "Unix Timestamp",
    format: "unix",
    pattern: "Epoch (seconds)",
    description: "Seconds since Jan 1, 1970",
    category: "Timestamp",
  },
  {
    name: "Unix Milliseconds",
    format: "unixms",
    pattern: "Epoch (milliseconds)",
    description: "Milliseconds since Jan 1, 1970",
    category: "Timestamp",
  },

  // ISO Standards
  {
    name: "ISO 8601",
    format: "iso",
    pattern: "YYYY-MM-DDTHH:mm:ss.sssZ",
    description: "International standard format",
    category: "ISO Standards",
  },
  {
    name: "ISO Date Only",
    format: "isodate",
    pattern: "YYYY-MM-DD",
    description: "Date portion only",
    category: "ISO Standards",
  },
  {
    name: "ISO Time Only",
    format: "isotime",
    pattern: "HH:mm:ss.sssZ",
    description: "Time portion with timezone",
    category: "ISO Standards",
  },

  // RFC Standards
  {
    name: "RFC 822",
    format: "rfc822",
    pattern: "DD MMM YY HH:mm TZ",
    description: "Original email date format",
    category: "RFC Standards",
  },
  {
    name: "RFC 822Z",
    format: "rfc822z",
    pattern: "DD MMM YY HH:mm -0700",
    description: "RFC 822 with numeric zone",
    category: "RFC Standards",
  },
  {
    name: "RFC 850",
    format: "rfc850",
    pattern: "Weekday, DD-Mon-YY HH:mm:ss TZ",
    description: "Usenet date format",
    category: "RFC Standards",
  },
  {
    name: "RFC 1123",
    format: "rfc1123",
    pattern: "ddd, DD MMM YYYY HH:mm:ss TZ",
    description: "HTTP/1.1 date format",
    category: "RFC Standards",
  },
  {
    name: "RFC 1123Z",
    format: "rfc1123z",
    pattern: "ddd, DD MMM YYYY HH:mm:ss -0700",
    description: "RFC 1123 with numeric zone",
    category: "RFC Standards",
  },
  {
    name: "RFC 2822",
    format: "rfc2822",
    pattern: "ddd, DD MMM YYYY HH:mm:ss GMT",
    description: "Email/HTTP date format",
    category: "RFC Standards",
  },
  {
    name: "RFC 3339",
    format: "rfc3339",
    pattern: "YYYY-MM-DDTHH:mm:ssZ",
    description: "Internet date/time format",
    category: "RFC Standards",
  },
  {
    name: "RFC 3339 Nano",
    format: "rfc3339nano",
    pattern: "YYYY-MM-DDTHH:mm:ss.nnnnnnnnnZ",
    description: "RFC 3339 with nanoseconds",
    category: "RFC Standards",
  },

  // Unix-style Formats
  {
    name: "ANSIC",
    format: "ansic",
    pattern: "ddd Mon _D HH:mm:ss YYYY",
    description: "C library asctime() format",
    category: "Unix-style",
  },
  {
    name: "Unix Date",
    format: "unixdate",
    pattern: "ddd Mon _D HH:mm:ss TZ YYYY",
    description: "Unix date command format",
    category: "Unix-style",
  },
  {
    name: "Ruby Date",
    format: "rubydate",
    pattern: "ddd Mon DD HH:mm:ss -0700 YYYY",
    description: "Ruby Time.to_s format",
    category: "Unix-style",
  },

  // Common International
  {
    name: "US Format",
    format: "us",
    pattern: "MM/DD/YYYY",
    description: "Month-Day-Year",
    category: "Regional",
  },
  {
    name: "European Format",
    format: "eu",
    pattern: "DD/MM/YYYY",
    description: "Day-Month-Year",
    category: "Regional",
  },
  {
    name: "ISO Numeric",
    format: "numeric",
    pattern: "YYYY-MM-DD",
    description: "Year-Month-Day",
    category: "Regional",
  },
  {
    name: "Shamsi (Persian)",
    format: "shamsi",
    pattern: "YYYY/MM/DD",
    description: "Persian/Jalali calendar",
    category: "Regional",
  },

  // Developer Friendly
  {
    name: "SQL DateTime",
    format: "sql",
    pattern: "YYYY-MM-DD HH:mm:ss",
    description: "Database datetime format",
    category: "Database",
  },
  {
    name: "SQL Date",
    format: "sqldate",
    pattern: "YYYY-MM-DD",
    description: "Database date format",
    category: "Database",
  },
  {
    name: "MongoDB ObjectId",
    format: "objectid",
    pattern: "Hex timestamp + random",
    description: "First 8 chars encode timestamp",
    category: "Database",
  },

  // Human Readable
  {
    name: "Full Text",
    format: "full",
    pattern: "Weekday, Month DD, YYYY",
    description: "Full written date",
    category: "Human Readable",
  },
  {
    name: "Short Text",
    format: "short",
    pattern: "Mon DD, YYYY",
    description: "Abbreviated month",
    category: "Human Readable",
  },
  {
    name: "Time 12-hour",
    format: "time12",
    pattern: "h:mm:ss AM/PM",
    description: "12-hour clock format",
    category: "Human Readable",
  },
  {
    name: "Time 24-hour",
    format: "time24",
    pattern: "HH:mm:ss",
    description: "24-hour clock format",
    category: "Human Readable",
  },

  // Web/API
  {
    name: "HTTP Date",
    format: "http",
    pattern: "ddd, DD MMM YYYY HH:mm:ss GMT",
    description: "HTTP header date format",
    category: "Web/API",
  },
  {
    name: "JSON Date",
    format: "json",
    pattern: "YYYY-MM-DDTHH:mm:ss.sssZ",
    description: "JSON serialized date",
    category: "Web/API",
  },
  {
    name: "Cookie Expires",
    format: "cookie",
    pattern: "ddd, DD-Mon-YYYY HH:mm:ss GMT",
    description: "Cookie expiration format",
    category: "Web/API",
  },
];

export default function DateConverter() {
  const tool = getToolByPath("/tools/date-converter");
  const [inputDate, setInputDate] = useState("1699123456");
  const [inputFormat, setInputFormat] = useState("auto");
  const [formats, setFormats] = useState<DateFormat[]>([]);
  const { toast } = useToast();

  const parseInputDate = (input: string, format: string): Date | null => {
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
      // YYYY-MM-DD
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
      // MM/DD/YYYY
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
      // DD/MM/YYYY
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
      // YYYY-MM-DD HH:mm:ss
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
      // YYYY-MM-DD (same as isodate)
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
      // Let JavaScript's Date parser handle these RFC formats
      const date = new Date(trimmed);
      return isNaN(date.getTime()) ? null : date;
    }

    if (format === "shorttext") {
      // Mon DD, YYYY (e.g., Jan 15, 2024)
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
      // Weekday, Month DD, YYYY (e.g., Monday, January 15, 2024)
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

    if (format === "shamsi") {
      // YYYY/MM/DD Jalali format
      const match = trimmed.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
      if (!match) return null;
      const [, jy, jm, jd] = match.map(Number);
      // Convert Jalali to Gregorian
      const jalaliToGregorian = (
        jy: number,
        jm: number,
        jd: number
      ): [number, number, number] => {
        let gy: number;
        if (jy > 979) {
          gy = 1600;
          jy -= 979;
        } else {
          gy = 621;
        }
        let days =
          365 * jy +
          Math.floor(jy / 33) * 8 +
          Math.floor(((jy % 33) + 3) / 4) +
          78 +
          jd +
          (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
        gy += 400 * Math.floor(days / 146097);
        days %= 146097;
        if (days > 36524) {
          gy += 100 * Math.floor(--days / 36524);
          days %= 36524;
          if (days >= 365) days++;
        }
        gy += 4 * Math.floor(days / 1461);
        days %= 1461;
        if (days > 365) {
          gy += Math.floor((days - 1) / 365);
          days = (days - 1) % 365;
        }
        let gd = days + 1;
        const sal_a = [
          0,
          31,
          (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31,
        ];
        let gm = 0;
        for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) {
          gd -= sal_a[gm];
        }
        return [gy, gm, gd];
      };
      const [gy, gm, gd] = jalaliToGregorian(jy, jm, jd);
      const date = new Date(gy, gm - 1, gd);
      return isNaN(date.getTime()) ? null : date;
    }

    // Auto-detect mode
    // Try Unix timestamp (seconds) - supports negative values for pre-epoch dates
    if (/^-?\d{10}$/.test(trimmed)) {
      return new Date(parseInt(trimmed) * 1000);
    }

    // Try Unix timestamp (milliseconds) - supports negative values for pre-epoch dates
    if (/^-?\d{13}$/.test(trimmed)) {
      return new Date(parseInt(trimmed));
    }

    // Try standard date parsing
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

  const gregorianToJalali = (
    gy: number,
    gm: number,
    gd: number
  ): [number, number, number] => {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = gy <= 1600 ? 0 : 979;
    gy = gy <= 1600 ? gy - 621 : gy - 1600;
    const gy2 = gm > 2 ? gy + 1 : gy;
    let days =
      365 * gy +
      Math.floor((gy2 + 3) / 4) -
      Math.floor((gy2 + 99) / 100) +
      Math.floor((gy2 + 399) / 400) -
      80 +
      gd +
      g_d_m[gm - 1];
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    const jm =
      days < 186
        ? 1 + Math.floor(days / 31)
        : 7 + Math.floor((days - 186) / 30);
    const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
    return [jy, jm, jd];
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
        const tz =
          Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop() ||
          "Local";
        return `${weekdays[date.getDay()]} ${months[date.getMonth()]} ${dayStr} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${tz} ${date.getFullYear()}`;
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
        return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`;
      case "eu":
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
      case "numeric":
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
      case "shamsi": {
        const [jy, jm, jd] = gregorianToJalali(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        );
        return `${jy}/${pad(jm)}/${pad(jd)}`;
      }
      case "sql":
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      case "sqldate":
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
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
        });
      case "short":
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      case "time12":
        return date.toLocaleTimeString("en-US", { hour12: true });
      case "time24":
        return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
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

  const convertDate = useCallback(() => {
    const date = parseInputDate(inputDate, inputFormat);

    if (!date) {
      const selectedFormat = INPUT_FORMATS.find(f => f.value === inputFormat);
      setFormats([
        {
          name: "Error",
          value: "Invalid date input",
          description:
            inputFormat === "auto"
              ? "Supported: Unix timestamps (seconds/milliseconds), ISO 8601, or any standard date format"
              : `Expected format: ${selectedFormat?.description || inputFormat}`,
          pattern: "",
          category: "Error",
        },
      ]);
      return;
    }

    const newFormats = DATE_FORMATS.map(fmt => ({
      name: fmt.name,
      value: formatDate(date, fmt.format),
      description: fmt.description,
      pattern: fmt.pattern,
      category: fmt.category,
    }));

    setFormats(newFormats);
  }, [inputDate, inputFormat]);

  const handleReset = () => {
    setInputDate("1699123456");
    setInputFormat("auto");
    setFormats([]);
  };

  const handleClear = () => {
    setInputDate("");
    setFormats([]);
  };

  const DEFAULT_DATE = "1699123456";
  const hasModifiedData = inputDate !== DEFAULT_DATE && inputDate.trim() !== "";
  const isAtDefault = inputDate === DEFAULT_DATE;

  const handleCurrentTime = () => {
    const now = new Date();
    // Use the user's timezone for current time display
    setInputDate(Math.floor(now.getTime() / 1000).toString());
  };

  useEffect(() => {
    convertDate();
  }, [convertDate]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Date format copied to clipboard",
      });
    } catch (error: unknown) {
      toast({
        title: "Copy failed",
        description: `Could not copy to clipboard: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              Date Converter
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Convert between 20 essential date formats: Unix timestamps, ISO
              standards, RFC formats, regional formats, and database formats
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <NowButton
            onClick={handleCurrentTime}
            tooltip="Set to current time"
            toastTitle="Time updated"
            toastDescription="Set to current timestamp"
          />
        </ActionButtonGroup>
        <DataButtonGroup>
          <ResetButton
            onClick={handleReset}
            tooltip="Reset to default example"
            hasModifiedData={hasModifiedData}
            disabled={isAtDefault}
          />
          <ClearButton
            onClick={handleClear}
            tooltip="Clear date input"
            hasModifiedData={hasModifiedData}
            disabled={inputDate.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Input Date</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="input-date">Date Input</Label>
              <Input
                id="input-date"
                value={inputDate}
                onChange={e => setInputDate(e.target.value)}
                placeholder="Enter date value..."
                data-testid="date-input"
                className="font-mono"
                autoFocus={true}
                data-default-input="true"
              />
            </div>
            <div>
              <Label htmlFor="input-format">Input Format</Label>
              <Select value={inputFormat} onValueChange={setInputFormat}>
                <SelectTrigger
                  id="input-format"
                  data-testid="input-format-select"
                >
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {INPUT_FORMATS.map(fmt => (
                    <SelectItem key={fmt.value} value={fmt.value}>
                      {fmt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {inputFormat === "auto"
              ? "Auto-detect: Unix timestamps (seconds/milliseconds), ISO 8601, RFC formats, human-readable dates"
              : INPUT_FORMATS.find(f => f.value === inputFormat)?.description ||
                ""}
          </p>
        </CardContent>
      </Card>

      {formats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Converted Formats
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Group formats by category */}
            {[
              "Timestamp",
              "ISO Standards",
              "RFC Standards",
              "Unix-style",
              "Regional",
              "Database",
              "Human Readable",
              "Web/API",
            ].map(category => {
              const categoryFormats = formats.filter(
                f => f.category === category
              );
              if (categoryFormats.length === 0) return null;

              return (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-blue-600 dark:text-blue-400">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {categoryFormats.map((format, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {format.name}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            >
                              {format.pattern}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(format.value)}
                            className="text-xs h-6 px-2"
                            data-testid={`copy-${format.name.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded mb-2 break-all">
                          {format.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {format.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Show error formats if any */}
            {formats
              .filter(f => f.category === "Error")
              .map((format, index) => (
                <div
                  key={index}
                  className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20"
                >
                  <div className="text-red-600 dark:text-red-400 font-medium">
                    {format.name}
                  </div>
                  <div className="text-red-700 dark:text-red-300 text-sm mt-1">
                    {format.value}
                  </div>
                  <div className="text-xs text-red-600 dark:text-red-400 mt-2">
                    {format.description}
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
