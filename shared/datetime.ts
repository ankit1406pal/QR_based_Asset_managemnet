import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

/**
 * Formats a date-only value to DD-MM-YY | 12:00 AM format WITHOUT timezone conversion.
 * Use this for date fields that represent a calendar day (not a specific moment in time).
 * 
 * @param timestamp - ISO string or Date object representing a date
 * @returns Formatted string like "12-11-25 | 12:00 AM"
 * @example
 * formatDate("2025-11-12T00:00:00.000Z") // "12-11-25 | 12:00 AM" (preserves day)
 * formatDate(new Date("2025-11-12")) // "12-11-25 | 12:00 AM" (preserves day)
 */
export function formatDate(timestamp: string | Date): string {
  try {
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    
    // Extract UTC date components to preserve the calendar day
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    
    // Construct local Date with extracted components (no timezone shift)
    const localDate = new Date(year, month, day, 0, 0, 0);
    
    // Format without timezone conversion
    return format(localDate, "dd-MM-yy | hh:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

/**
 * Formats a full timestamp to DD-MM-YY | hh:mm AM/PM format WITH local timezone conversion.
 * Use this for timestamp fields that represent a specific moment in time.
 * 
 * @param timestamp - ISO string or Date object
 * @returns Formatted string like "12-11-25 | 10:30 AM" (in local time)
 * @example
 * formatTimestamp("2025-11-12T08:09:54.138Z") // "12-11-25 | 10:30 AM" (converted to local)
 */
export function formatTimestamp(timestamp: string | Date): string {
  try {
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    
    // Format with local timezone conversion
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return formatInTimeZone(date, localTimezone, "dd-MM-yy | hh:mm a");
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "Invalid date";
  }
}
