import { createLogger, format, transports, Logger } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Define custom log format with proper type annotations
const customFormat = printf((info) => {
  return `[${info.timestamp || 'N/A'}] ${info.level}: ${info.message}`;
});

// Create a Winston logger instance
const logger: Logger = createLogger({
  level: 'info', // Log level
  format: combine(
    colorize(), // Colorize console output
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamps
    customFormat,
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'logs/combined.log' }), // Log all messages to a file
  ],
});

export default logger;
