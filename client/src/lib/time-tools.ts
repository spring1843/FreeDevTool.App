import type { WorldClockCity } from "@/types/tools";

// Format time for timer display (MM:SS, HH:MM:SS, or DD:HH:MM:SS)
export function formatTimerTime(totalSeconds: number): string {
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (days > 0) {
    return `${days.toString().padStart(2, "0")}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Default world clock cities (shown by default)
export const defaultWorldClockCities: WorldClockCity[] = [
  { name: "New York", timezone: "America/New_York", country: "USA" },
  { name: "Los Angeles", timezone: "America/Los_Angeles", country: "USA" },
  { name: "London", timezone: "Europe/London", country: "UK" },
  { name: "Paris", timezone: "Europe/Paris", country: "France" },
  { name: "Berlin", timezone: "Europe/Berlin", country: "Germany" },
  { name: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" },
  { name: "Sydney", timezone: "Australia/Sydney", country: "Australia" },
  { name: "Mumbai", timezone: "Asia/Kolkata", country: "India" },
  { name: "Dubai", timezone: "Asia/Dubai", country: "UAE" },
  { name: "Singapore", timezone: "Asia/Singapore", country: "Singapore" },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong", country: "Hong Kong" },
  { name: "Toronto", timezone: "America/Toronto", country: "Canada" },
  { name: "São Paulo", timezone: "America/Sao_Paulo", country: "Brazil" },
  { name: "Moscow", timezone: "Europe/Moscow", country: "Russia" },
  { name: "Beijing", timezone: "Asia/Shanghai", country: "China" },
];

// Comprehensive list of world timezones organized by region
export const allTimezones: WorldClockCity[] = [
  // Africa
  { name: "Abidjan", timezone: "Africa/Abidjan", country: "Ivory Coast" },
  { name: "Accra", timezone: "Africa/Accra", country: "Ghana" },
  { name: "Addis Ababa", timezone: "Africa/Addis_Ababa", country: "Ethiopia" },
  { name: "Algiers", timezone: "Africa/Algiers", country: "Algeria" },
  { name: "Asmara", timezone: "Africa/Asmara", country: "Eritrea" },
  { name: "Cairo", timezone: "Africa/Cairo", country: "Egypt" },
  { name: "Casablanca", timezone: "Africa/Casablanca", country: "Morocco" },
  {
    name: "Dar es Salaam",
    timezone: "Africa/Dar_es_Salaam",
    country: "Tanzania",
  },
  { name: "Harare", timezone: "Africa/Harare", country: "Zimbabwe" },
  {
    name: "Johannesburg",
    timezone: "Africa/Johannesburg",
    country: "South Africa",
  },
  { name: "Lagos", timezone: "Africa/Lagos", country: "Nigeria" },
  { name: "Nairobi", timezone: "Africa/Nairobi", country: "Kenya" },
  { name: "Tunis", timezone: "Africa/Tunis", country: "Tunisia" },

  // America
  { name: "Anchorage", timezone: "America/Anchorage", country: "USA" },
  {
    name: "Buenos Aires",
    timezone: "America/Argentina/Buenos_Aires",
    country: "Argentina",
  },
  { name: "Caracas", timezone: "America/Caracas", country: "Venezuela" },
  { name: "Chicago", timezone: "America/Chicago", country: "USA" },
  { name: "Denver", timezone: "America/Denver", country: "USA" },
  {
    name: "Guatemala City",
    timezone: "America/Guatemala",
    country: "Guatemala",
  },
  { name: "Halifax", timezone: "America/Halifax", country: "Canada" },
  { name: "Havana", timezone: "America/Havana", country: "Cuba" },
  { name: "Lima", timezone: "America/Lima", country: "Peru" },
  { name: "Los Angeles", timezone: "America/Los_Angeles", country: "USA" },
  { name: "Mexico City", timezone: "America/Mexico_City", country: "Mexico" },
  { name: "Montreal", timezone: "America/Montreal", country: "Canada" },
  { name: "New York", timezone: "America/New_York", country: "USA" },
  { name: "Panama City", timezone: "America/Panama", country: "Panama" },
  { name: "Phoenix", timezone: "America/Phoenix", country: "USA" },
  { name: "Santiago", timezone: "America/Santiago", country: "Chile" },
  { name: "São Paulo", timezone: "America/Sao_Paulo", country: "Brazil" },
  { name: "Toronto", timezone: "America/Toronto", country: "Canada" },
  { name: "Vancouver", timezone: "America/Vancouver", country: "Canada" },

  // Asia
  { name: "Almaty", timezone: "Asia/Almaty", country: "Kazakhstan" },
  { name: "Baghdad", timezone: "Asia/Baghdad", country: "Iraq" },
  { name: "Bangkok", timezone: "Asia/Bangkok", country: "Thailand" },
  { name: "Beijing", timezone: "Asia/Shanghai", country: "China" },
  { name: "Colombo", timezone: "Asia/Colombo", country: "Sri Lanka" },
  { name: "Damascus", timezone: "Asia/Damascus", country: "Syria" },
  { name: "Dhaka", timezone: "Asia/Dhaka", country: "Bangladesh" },
  { name: "Dubai", timezone: "Asia/Dubai", country: "UAE" },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong", country: "Hong Kong" },
  { name: "Jakarta", timezone: "Asia/Jakarta", country: "Indonesia" },
  { name: "Jerusalem", timezone: "Asia/Jerusalem", country: "Israel" },
  { name: "Kabul", timezone: "Asia/Kabul", country: "Afghanistan" },
  { name: "Karachi", timezone: "Asia/Karachi", country: "Pakistan" },
  { name: "Kathmandu", timezone: "Asia/Kathmandu", country: "Nepal" },
  { name: "Kolkata", timezone: "Asia/Kolkata", country: "India" },
  { name: "Kuala Lumpur", timezone: "Asia/Kuala_Lumpur", country: "Malaysia" },
  { name: "Manila", timezone: "Asia/Manila", country: "Philippines" },
  { name: "Riyadh", timezone: "Asia/Riyadh", country: "Saudi Arabia" },
  { name: "Seoul", timezone: "Asia/Seoul", country: "South Korea" },
  { name: "Singapore", timezone: "Asia/Singapore", country: "Singapore" },
  { name: "Taipei", timezone: "Asia/Taipei", country: "Taiwan" },
  { name: "Tehran", timezone: "Asia/Tehran", country: "Iran" },
  { name: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" },
  { name: "Ulaanbaatar", timezone: "Asia/Ulaanbaatar", country: "Mongolia" },
  { name: "Yangon", timezone: "Asia/Yangon", country: "Myanmar" },
  { name: "Yerevan", timezone: "Asia/Yerevan", country: "Armenia" },

  // Atlantic
  { name: "Azores", timezone: "Atlantic/Azores", country: "Portugal" },
  {
    name: "Cape Verde",
    timezone: "Atlantic/Cape_Verde",
    country: "Cape Verde",
  },
  { name: "Reykjavik", timezone: "Atlantic/Reykjavik", country: "Iceland" },

  // Australia
  { name: "Adelaide", timezone: "Australia/Adelaide", country: "Australia" },
  { name: "Brisbane", timezone: "Australia/Brisbane", country: "Australia" },
  { name: "Darwin", timezone: "Australia/Darwin", country: "Australia" },
  { name: "Melbourne", timezone: "Australia/Melbourne", country: "Australia" },
  { name: "Perth", timezone: "Australia/Perth", country: "Australia" },
  { name: "Sydney", timezone: "Australia/Sydney", country: "Australia" },

  // Europe
  { name: "Amsterdam", timezone: "Europe/Amsterdam", country: "Netherlands" },
  { name: "Athens", timezone: "Europe/Athens", country: "Greece" },
  { name: "Berlin", timezone: "Europe/Berlin", country: "Germany" },
  { name: "Brussels", timezone: "Europe/Brussels", country: "Belgium" },
  { name: "Bucharest", timezone: "Europe/Bucharest", country: "Romania" },
  { name: "Budapest", timezone: "Europe/Budapest", country: "Hungary" },
  { name: "Copenhagen", timezone: "Europe/Copenhagen", country: "Denmark" },
  { name: "Dublin", timezone: "Europe/Dublin", country: "Ireland" },
  { name: "Helsinki", timezone: "Europe/Helsinki", country: "Finland" },
  { name: "Istanbul", timezone: "Europe/Istanbul", country: "Turkey" },
  { name: "Lisbon", timezone: "Europe/Lisbon", country: "Portugal" },
  { name: "London", timezone: "Europe/London", country: "UK" },
  { name: "Madrid", timezone: "Europe/Madrid", country: "Spain" },
  { name: "Moscow", timezone: "Europe/Moscow", country: "Russia" },
  { name: "Oslo", timezone: "Europe/Oslo", country: "Norway" },
  { name: "Paris", timezone: "Europe/Paris", country: "France" },
  { name: "Prague", timezone: "Europe/Prague", country: "Czech Republic" },
  { name: "Rome", timezone: "Europe/Rome", country: "Italy" },
  { name: "Stockholm", timezone: "Europe/Stockholm", country: "Sweden" },
  { name: "Vienna", timezone: "Europe/Vienna", country: "Austria" },
  { name: "Warsaw", timezone: "Europe/Warsaw", country: "Poland" },
  { name: "Zurich", timezone: "Europe/Zurich", country: "Switzerland" },

  // Indian
  {
    name: "Chagos",
    timezone: "Indian/Chagos",
    country: "British Indian Ocean Territory",
  },
  { name: "Maldives", timezone: "Indian/Maldives", country: "Maldives" },
  { name: "Mauritius", timezone: "Indian/Mauritius", country: "Mauritius" },

  // Pacific
  { name: "Auckland", timezone: "Pacific/Auckland", country: "New Zealand" },
  { name: "Fiji", timezone: "Pacific/Fiji", country: "Fiji" },
  { name: "Guam", timezone: "Pacific/Guam", country: "Guam" },
  { name: "Honolulu", timezone: "Pacific/Honolulu", country: "USA" },
  { name: "Samoa", timezone: "Pacific/Samoa", country: "American Samoa" },
  { name: "Tahiti", timezone: "Pacific/Tahiti", country: "French Polynesia" },
  { name: "Tonga", timezone: "Pacific/Tongatapu", country: "Tonga" },
];

// Get timezone offset information
export function getTimezoneOffset(timezone: string): string {
  try {
    // Calculate timezone offset for display purposes
    const offset = getTimezoneOffsetMinutes(timezone) / 60;
    const sign = offset >= 0 ? "+" : "";
    return `UTC${sign}${offset}`;
  } catch {
    return "UTC+0";
  }
}

function getTimezoneOffsetMinutes(timezone: string): number {
  try {
    const now = new Date();
    const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
    const target = new Date(
      now.toLocaleString("en-US", { timeZone: timezone })
    );
    return (target.getTime() - utc.getTime()) / 60000;
  } catch {
    return 0;
  }
}

// Continental representatives - comprehensive timezone coverage per continent
export const continentalCities = {
  Africa: [
    {
      name: "Cape Verde",
      timezone: "Atlantic/Cape_Verde",
      country: "Cape Verde",
    }, // UTC-1
    { name: "Casablanca", timezone: "Africa/Casablanca", country: "Morocco" }, // UTC+0/+1
    { name: "Lagos", timezone: "Africa/Lagos", country: "Nigeria" }, // UTC+1
    { name: "Cairo", timezone: "Africa/Cairo", country: "Egypt" }, // UTC+2
    { name: "Nairobi", timezone: "Africa/Nairobi", country: "Kenya" }, // UTC+3
    { name: "Mauritius", timezone: "Indian/Mauritius", country: "Mauritius" }, // UTC+4
    {
      name: "Johannesburg",
      timezone: "Africa/Johannesburg",
      country: "South Africa",
    }, // UTC+2
  ],
  Asia: [
    { name: "Riyadh", timezone: "Asia/Riyadh", country: "Saudi Arabia" }, // UTC+3
    { name: "Tehran", timezone: "Asia/Tehran", country: "Iran" }, // UTC+3:30
    { name: "Dubai", timezone: "Asia/Dubai", country: "UAE" }, // UTC+4
    { name: "Kabul", timezone: "Asia/Kabul", country: "Afghanistan" }, // UTC+4:30
    { name: "Karachi", timezone: "Asia/Karachi", country: "Pakistan" }, // UTC+5
    { name: "Mumbai", timezone: "Asia/Kolkata", country: "India" }, // UTC+5:30
    { name: "Kathmandu", timezone: "Asia/Kathmandu", country: "Nepal" }, // UTC+5:45
    { name: "Dhaka", timezone: "Asia/Dhaka", country: "Bangladesh" }, // UTC+6
    { name: "Yangon", timezone: "Asia/Yangon", country: "Myanmar" }, // UTC+6:30
    { name: "Bangkok", timezone: "Asia/Bangkok", country: "Thailand" }, // UTC+7
    { name: "Singapore", timezone: "Asia/Singapore", country: "Singapore" }, // UTC+8
    { name: "Shanghai", timezone: "Asia/Shanghai", country: "China" }, // UTC+8
    { name: "Manila", timezone: "Asia/Manila", country: "Philippines" }, // UTC+8
    { name: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" }, // UTC+9
    { name: "Seoul", timezone: "Asia/Seoul", country: "South Korea" }, // UTC+9
  ],
  Europe: [
    { name: "Reykjavik", timezone: "Atlantic/Reykjavik", country: "Iceland" }, // UTC+0
    { name: "London", timezone: "Europe/London", country: "UK" }, // UTC+0/+1
    { name: "Paris", timezone: "Europe/Paris", country: "France" }, // UTC+1/+2
    { name: "Berlin", timezone: "Europe/Berlin", country: "Germany" }, // UTC+1/+2
    { name: "Rome", timezone: "Europe/Rome", country: "Italy" }, // UTC+1/+2
    { name: "Athens", timezone: "Europe/Athens", country: "Greece" }, // UTC+2/+3
    { name: "Helsinki", timezone: "Europe/Helsinki", country: "Finland" }, // UTC+2/+3
    { name: "Moscow", timezone: "Europe/Moscow", country: "Russia" }, // UTC+3
    { name: "Istanbul", timezone: "Europe/Istanbul", country: "Turkey" }, // UTC+3
  ],
  "North America": [
    { name: "Anchorage", timezone: "America/Anchorage", country: "USA" }, // UTC-9/-8
    { name: "Los Angeles", timezone: "America/Los_Angeles", country: "USA" }, // UTC-8/-7
    { name: "Phoenix", timezone: "America/Phoenix", country: "USA" }, // UTC-7 (no DST)
    { name: "Denver", timezone: "America/Denver", country: "USA" }, // UTC-7/-6
    { name: "Chicago", timezone: "America/Chicago", country: "USA" }, // UTC-6/-5
    { name: "Mexico City", timezone: "America/Mexico_City", country: "Mexico" }, // UTC-6/-5
    { name: "New York", timezone: "America/New_York", country: "USA" }, // UTC-5/-4
    { name: "Toronto", timezone: "America/Toronto", country: "Canada" }, // UTC-5/-4
    { name: "Halifax", timezone: "America/Halifax", country: "Canada" }, // UTC-4/-3
  ],
  "South America": [
    { name: "Lima", timezone: "America/Lima", country: "Peru" }, // UTC-5
    { name: "Caracas", timezone: "America/Caracas", country: "Venezuela" }, // UTC-4
    { name: "Santiago", timezone: "America/Santiago", country: "Chile" }, // UTC-4/-3
    { name: "São Paulo", timezone: "America/Sao_Paulo", country: "Brazil" }, // UTC-3/-2
    {
      name: "Buenos Aires",
      timezone: "America/Argentina/Buenos_Aires",
      country: "Argentina",
    }, // UTC-3
  ],
  Oceania: [
    { name: "Samoa", timezone: "Pacific/Samoa", country: "American Samoa" }, // UTC-11
    { name: "Honolulu", timezone: "Pacific/Honolulu", country: "USA" }, // UTC-10
    { name: "Perth", timezone: "Australia/Perth", country: "Australia" }, // UTC+8
    { name: "Darwin", timezone: "Australia/Darwin", country: "Australia" }, // UTC+9:30
    { name: "Adelaide", timezone: "Australia/Adelaide", country: "Australia" }, // UTC+9:30/+10:30
    { name: "Brisbane", timezone: "Australia/Brisbane", country: "Australia" }, // UTC+10
    {
      name: "Melbourne",
      timezone: "Australia/Melbourne",
      country: "Australia",
    }, // UTC+10/+11
    { name: "Sydney", timezone: "Australia/Sydney", country: "Australia" }, // UTC+10/+11
    { name: "Auckland", timezone: "Pacific/Auckland", country: "New Zealand" }, // UTC+12/+13
    { name: "Fiji", timezone: "Pacific/Fiji", country: "Fiji" }, // UTC+12/+13
  ],
};

// Get user's current timezone
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC"; // Fallback to UTC if unable to detect
  }
}

// Get current time for a timezone
export function getTimeForTimezone(timezone: string): string {
  try {
    return new Date().toLocaleString("en-US", {
      timeZone: timezone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return "Invalid timezone";
  }
}

// Get current date for a timezone
export function getDateForTimezone(timezone: string): string {
  try {
    return new Date().toLocaleDateString("en-US", {
      timeZone: timezone,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Invalid timezone";
  }
}

// Create timer sound
export function createTimerSound(): AudioContext | null {
  try {
    const audioContext = new (window.AudioContext ||
      ((window as unknown as Record<string, unknown>)
        .webkitAudioContext as typeof AudioContext))();
    return audioContext;
  } catch {
    console.warn("Audio context not supported");
    return null;
  }
}

// Play timer beep sound
export function playTimerBeep(audioContext: AudioContext | null): void {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.5
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}
