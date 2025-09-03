/**
 * Formats an Ethereum address for display by showing only the first and last few characters.
 * 
 * @param params.address - The Ethereum address to format
 * @param params.length - The number of characters to show at the beginning and end (default: 4)
 * @returns Formatted address string (e.g., "0x1234...5678")
 * 
 * @example
 * ```ts
 * const displayAddress = formatAddress({
 *   address: '0x1234567890abcdef1234567890abcdef12345678',
 *   length: 4,
 * });
 * // Returns: "0x1234...5678"
 * ```
 */
export function formatAddress({
  address,
  length = 4,
}: {
  address: string;
  length?: number;
}): string {
  if (!address) return '';
  if (address.length <= length * 2 + 2) return address;
  
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}

/**
 * Formats a number as a currency string.
 * 
 * @param params.value - The number to format
 * @param params.currency - The currency code (default: "USD")
 * @param params.locale - The locale to use for formatting (default: "en-US")
 * @returns Formatted currency string
 * 
 * @example
 * ```ts
 * const formattedPrice = formatCurrency({
 *   value: 1234.56,
 *   currency: 'USD',
 * });
 * // Returns: "$1,234.56"
 * ```
 */
export function formatCurrency({
  value,
  currency = 'USD',
  locale = 'en-US',
}: {
  value: number;
  currency?: string;
  locale?: string;
}): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Formats a date as a string.
 * 
 * @param params.date - The date to format
 * @param params.format - The format to use (default: "medium")
 * @param params.locale - The locale to use for formatting (default: "en-US")
 * @returns Formatted date string
 * 
 * @example
 * ```ts
 * const formattedDate = formatDate({
 *   date: new Date(),
 *   format: 'long',
 * });
 * // Returns: "January 1, 2023"
 * ```
 */
export function formatDate({
  date,
  format = 'medium',
  locale = 'en-US',
}: {
  date: Date;
  format?: 'short' | 'medium' | 'long' | 'full';
  locale?: string;
}): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: format,
  }).format(date);
}

/**
 * Truncates a string to a specified length and adds an ellipsis if needed.
 * 
 * @param params.text - The string to truncate
 * @param params.length - The maximum length (default: 100)
 * @param params.ellipsis - The ellipsis string to append (default: "...")
 * @returns Truncated string
 * 
 * @example
 * ```ts
 * const truncatedText = truncateText({
 *   text: 'This is a very long text that needs to be truncated',
 *   length: 20,
 * });
 * // Returns: "This is a very long..."
 * ```
 */
export function truncateText({
  text,
  length = 100,
  ellipsis = '...',
}: {
  text: string;
  length?: number;
  ellipsis?: string;
}): string {
  if (!text) return '';
  if (text.length <= length) return text;
  
  return `${text.slice(0, length)}${ellipsis}`;
}

