/**
 * Formats an Ethereum address for display
 * @param address - The Ethereum address to format
 * @param startChars - Number of characters to show at the start
 * @param endChars - Number of characters to show at the end
 * @returns Formatted address string
 */
export function formatAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address) return '';
  if (address.length < startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Formats a timestamp to a human-readable date string
 * @param timestamp - Unix timestamp in seconds or milliseconds
 * @returns Formatted date string
 */
export function formatDate(timestamp: number): string {
  // Convert to milliseconds if in seconds
  const timestampMs = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
  return new Date(timestampMs).toLocaleString();
}

/**
 * Formats a wei value to ETH with specified decimal places
 * @param wei - Wei value as string or number
 * @param decimals - Number of decimal places to display
 * @returns Formatted ETH value
 */
export function formatEth(wei: string | number, decimals = 4): string {
  if (!wei) return '0';
  const weiNum = typeof wei === 'string' ? BigInt(wei) : BigInt(wei.toString());
  const ethValue = Number(weiNum) / 1e18;
  return ethValue.toFixed(decimals);
}

/**
 * Validates an Ethereum address
 * @param address - The address to validate
 * @returns Boolean indicating if address is valid
 */
export function isValidEthAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Safely access localStorage with fallbacks for SSR and permissions issues
 * @param key - The localStorage key
 * @returns The stored value or null
 */
export function getLocalStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
}

/**
 * Safely set localStorage with fallbacks for SSR and permissions issues
 * @param key - The localStorage key
 * @param value - The value to store
 * @returns Boolean indicating success
 */
export function setLocalStorage(key: string, value: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Error setting localStorage:', error);
    return false;
  }
}

/**
 * Debounce function to limit how often a function can be called
 * @param func - The function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
