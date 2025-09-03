import { isAddress } from 'viem';

/**
 * Validates an Ethereum address.
 * 
 * @param address - The address to validate
 * @returns True if the address is valid, false otherwise
 * 
 * @example
 * ```ts
 * const isValid = validateAddress('0x1234567890abcdef1234567890abcdef12345678');
 * // Returns: true
 * ```
 */
export function validateAddress(address: string): boolean {
  return isAddress(address);
}

/**
 * Validates transaction parameters before sending.
 * 
 * @param params - Transaction parameters
 * @returns True if valid, or an error object if invalid
 * 
 * @example
 * ```ts
 * const validation = validateTransaction({
 *   to: '0x1234567890abcdef1234567890abcdef12345678',
 *   value: parseEther('0.1'),
 * });
 * 
 * if (validation !== true) {
 *   console.error(validation.error);
 * }
 * ```
 */
export function validateTransaction({
  to,
  value,
  data,
}: {
  to: string;
  value: bigint;
  data?: string;
}): true | { valid: false; error: string } {
  if (!to) {
    return { valid: false, error: 'Recipient address is required' };
  }
  
  if (!validateAddress(to)) {
    return { valid: false, error: 'Invalid recipient address' };
  }
  
  if (value < 0n) {
    return { valid: false, error: 'Value cannot be negative' };
  }
  
  return true;
}

/**
 * Validates an email address.
 * 
 * @param email - The email to validate
 * @returns True if the email is valid, false otherwise
 * 
 * @example
 * ```ts
 * const isValid = validateEmail('user@example.com');
 * // Returns: true
 * ```
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a URL.
 * 
 * @param url - The URL to validate
 * @returns True if the URL is valid, false otherwise
 * 
 * @example
 * ```ts
 * const isValid = validateUrl('https://example.com');
 * // Returns: true
 * ```
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Validates a form field based on its type.
 * 
 * @param params.value - The value to validate
 * @param params.type - The type of validation to perform
 * @param params.required - Whether the field is required
 * @param params.min - Minimum value (for number type)
 * @param params.max - Maximum value (for number type)
 * @param params.minLength - Minimum length (for string type)
 * @param params.maxLength - Maximum length (for string type)
 * @param params.pattern - Regex pattern to match (for string type)
 * @returns True if valid, or an error message if invalid
 * 
 * @example
 * ```ts
 * const validation = validateField({
 *   value: 'user@example.com',
 *   type: 'email',
 *   required: true,
 * });
 * 
 * if (validation !== true) {
 *   console.error(validation);
 * }
 * ```
 */
export function validateField({
  value,
  type,
  required = false,
  min,
  max,
  minLength,
  maxLength,
  pattern,
}: {
  value: string | number;
  type: 'text' | 'email' | 'url' | 'number' | 'address';
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}): true | string {
  // Check if required
  if (required && (value === undefined || value === null || value === '')) {
    return 'This field is required';
  }
  
  // Skip validation if empty and not required
  if (!required && (value === undefined || value === null || value === '')) {
    return true;
  }
  
  // Type-specific validation
  switch (type) {
    case 'email':
      if (!validateEmail(String(value))) {
        return 'Invalid email address';
      }
      break;
      
    case 'url':
      if (!validateUrl(String(value))) {
        return 'Invalid URL';
      }
      break;
      
    case 'number':
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return 'Must be a number';
      }
      if (min !== undefined && numValue < min) {
        return `Must be at least ${min}`;
      }
      if (max !== undefined && numValue > max) {
        return `Must be at most ${max}`;
      }
      break;
      
    case 'address':
      if (!validateAddress(String(value))) {
        return 'Invalid Ethereum address';
      }
      break;
      
    case 'text':
    default:
      const strValue = String(value);
      if (minLength !== undefined && strValue.length < minLength) {
        return `Must be at least ${minLength} characters`;
      }
      if (maxLength !== undefined && strValue.length > maxLength) {
        return `Must be at most ${maxLength} characters`;
      }
      if (pattern && !pattern.test(strValue)) {
        return 'Invalid format';
      }
      break;
  }
  
  return true;
}

