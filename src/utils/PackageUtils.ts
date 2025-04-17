
/**
 * Utility functions for working with Package data
 */

/**
 * Formats a date into a human-readable string
 * @param date The date to format
 * @returns Formatted date string (e.g. "Apr 15, 2023")
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

/**
 * Checks if start and end dates are the same day
 * @param start Start date 
 * @param end End date
 * @returns Boolean indicating if dates are the same day
 */
export const isSameDay = (start: Date, end: Date): boolean => {
  return start.getTime() === end.getTime();
};

/**
 * Returns a formatted date range string
 * @param start Start date
 * @param end End date
 * @returns Formatted date range or single date if dates are the same
 */
export const formatDateRange = (start: Date, end: Date): string => {
  if (isSameDay(start, end)) {
    return formatDate(start);
  }
  return `${formatDate(start)} - ${formatDate(end)}`;
};
