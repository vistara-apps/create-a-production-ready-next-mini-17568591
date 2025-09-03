import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes properly.
 * Uses clsx for conditional class names and tailwind-merge to handle Tailwind class conflicts.
 * 
 * @param inputs - Class names to combine
 * @returns Merged class string
 * 
 * @example
 * ```tsx
 * <div className={cn('text-red-500', isActive && 'bg-blue-500', 'p-4')}>
 *   Content
 * </div>
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

