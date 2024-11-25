/**
 * Capitalizes the first character of a string. Returns empty string if input is undefined or null.
 *
 * @param {string} [str] - The string to capitalize
 * @returns {string} The string with its first character converted to uppercase, or empty string if no input
 * @example
 * capitalize('hello')  // returns 'Hello'
 * capitalize()        // returns ''
 * capitalize(null)    // returns ''
 */
export const capitalize = (str?: string): string => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
