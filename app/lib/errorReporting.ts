/**
 * Error reporting utilities for the application
 */

import { logger } from './logger';

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Error report
 */
export interface ErrorReport {
  message: string;
  stack?: string;
  severity: ErrorSeverity;
  context?: Record<string, unknown>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

/**
 * Error reporting configuration
 */
export interface ErrorReportingConfig {
  enabled: boolean;
  dsn?: string;
  environment: 'development' | 'staging' | 'production';
  sampleRate: number;
}

/**
 * Default error reporting configuration
 */
const DEFAULT_CONFIG: ErrorReportingConfig = {
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.NEXT_PUBLIC_ERROR_REPORTING_DSN,
  environment: (process.env.NODE_ENV as 'development' | 'staging' | 'production') || 'development',
  sampleRate: 1.0, // Report 100% of errors
};

/**
 * Error reporter class for application error reporting
 */
export class ErrorReporter {
  private config: ErrorReportingConfig;
  private sessionId: string;
  
  constructor(config: Partial<ErrorReportingConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.sessionId = this.generateSessionId();
  }
  
  /**
   * Reports an error
   * 
   * @param error - Error object or message
   * @param severity - Error severity
   * @param context - Additional context
   */
  report(
    error: Error | string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context?: Record<string, unknown>
  ): void {
    if (!this.config.enabled || !this.shouldSample()) {
      return;
    }
    
    const message = typeof error === 'string' ? error : error.message;
    const stack = typeof error === 'string' ? undefined : error.stack;
    
    const report: ErrorReport = {
      message,
      stack,
      severity,
      context,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.getUserId(),
    };
    
    // Log the error
    logger.error(message, typeof error === 'string' ? new Error(error) : error, context);
    
    // Send to error reporting service
    this.sendToService(report);
  }
  
  /**
   * Reports an error with high severity
   * 
   * @param error - Error object or message
   * @param context - Additional context
   */
  reportCritical(error: Error | string, context?: Record<string, unknown>): void {
    this.report(error, ErrorSeverity.CRITICAL, context);
  }
  
  /**
   * Sets the user ID for error reports
   * 
   * @param userId - User ID
   */
  setUserId(userId: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('error_reporting_user_id', userId);
    }
  }
  
  /**
   * Gets the user ID for error reports
   * 
   * @returns User ID or undefined
   */
  private getUserId(): string | undefined {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('error_reporting_user_id') || undefined;
    }
    return undefined;
  }
  
  /**
   * Generates a session ID
   * 
   * @returns Session ID
   */
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
  
  /**
   * Checks if an error should be sampled based on the sample rate
   * 
   * @returns True if the error should be sampled, false otherwise
   */
  private shouldSample(): boolean {
    return Math.random() < this.config.sampleRate;
  }
  
  /**
   * Sends an error report to the error reporting service
   * 
   * @param report - Error report
   */
  private sendToService(report: ErrorReport): void {
    // In a real application, this would send the error to a reporting service
    // This is a placeholder implementation
    if (typeof window !== 'undefined' && this.config.dsn) {
      // Browser environment
      // Example: Send to a monitoring service
      console.log('Sending error report to service:', report);
    }
  }
}

// Create a default error reporter instance
export const errorReporter = new ErrorReporter();

