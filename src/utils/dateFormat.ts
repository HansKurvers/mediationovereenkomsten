// ============================================
// FILE: src/utils/dateFormat.ts
// Date formatting utilities
// ============================================

/**
 * Formats a date string from ISO format (YYYY-MM-DD) to Dutch long format (D maand YYYY)
 * @param dateStr - Date string in format YYYY-MM-DD
 * @returns Formatted date string like "1 oktober 2025"
 */
export const formatDateLong = (dateStr: string): string => {
  if (!dateStr) return '';

  const dutchMonths = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december'
  ];

  try {
    const [year, month, day] = dateStr.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const dayNum = parseInt(day, 10); // Remove leading zero

    if (monthIndex < 0 || monthIndex > 11) {
      return dateStr; // Return original if invalid
    }

    return `${dayNum} ${dutchMonths[monthIndex]} ${year}`;
  } catch (error) {
    return dateStr; // Return original on error
  }
};
