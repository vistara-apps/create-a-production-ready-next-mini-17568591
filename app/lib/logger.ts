/**
 * Logging utilities for the application
 */

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * Log entry
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

/**
 * Logger configuration
 */
export interface LoggerConfig {
  minLevel: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
}

/**
 * Default logger configuration
 */
const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: true,
  enableRemote: process.env.NODE_ENV === 'production',
};

/**
 * Logger class for application logging
 */
export class Logger {
  private config: LoggerConfig;
  
  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  
  /**
   * Logs a debug message
   * 
   * @param message - Log message
   * @param context - Additional context
   */
  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context);
  }
  
  /**
   * Logs an info message
   * 
   * @param message - Log message
   * @param context - Additional context
   */
  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context);
  }
  
  /**
   * Logs a warning message
   * 
   * @param message - Log message
   * @param context - Additional context
   */
  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context);
  }
  
  /**
   * Logs an error message
   * 
   * @param message - Log message
   * @param error - Error object
   * @param context - Additional context
   */
  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, {
      ...context,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : undefined,
    });
  }
  
  /**
   * Logs a message
   * 
   * @param level - Log level
   * @param message - Log message
   * @param context - Additional context
   */
  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    // Skip if level is below minimum level
    if (!this.shouldLog(level)) {
      return;
    }
    
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
    
    // Log to console
    if (this.config.enableConsole) {
      this.logToConsole(entry);
    }
    
    // Log to remote service
    if (this.config.enableRemote) {
      this.logToRemote(entry);
    }
  }
  
  /**
   * Checks if a log level should be logged
   * 
   * @param level - Log level
   * @returns True if the level should be logged, false otherwise
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const minLevelIndex = levels.indexOf(this.config.minLevel);
    const levelIndex = levels.indexOf(level);
    
    return levelIndex >= minLevelIndex;
  }
  
  /**
   * Logs an entry to the console
   * 
   * @param entry - Log entry
   */
  private logToConsole(entry: LogEntry): void {
    const { level, message, context } = entry;
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`[DEBUG] ${message}`, context);
        break;
      case LogLevel.INFO:
        console.info(`[INFO] ${message}`, context);
        break;
      case LogLevel.WARN:
        console.warn(`[WARN] ${message}`, context);
        break;
      case LogLevel.ERROR:
        console.error(`[ERROR] ${message}`, context);
        break;
    }
  }
  
  /**
   * Logs an entry to a remote service
   * 
   * @param entry - Log entry
   */
  private logToRemote(entry: LogEntry): void {
    // In a real application, this would send the log to a remote service
    // This is a placeholder implementation
    if (typeof window !== 'undefined') {
      // Browser environment
      // Example: Send to a monitoring service
    } else {
      // Server environment
      // Example: Write to a log file or send to a logging service
    }
  }
}

// Create a default logger instance
export const logger = new Logger();

