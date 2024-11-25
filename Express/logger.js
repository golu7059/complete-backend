import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, colorize, json } = format;

// Custom format for console logging with colors
const consoleLogFormate = format.combine(
    colorize(),
    printf(({ level, message, timestamp }) => {
        return `${timestamp} : ${level} : ${message}`;
    })
);

// Create a winston logger
const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),      
        timestamp(),
        json()
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: consoleLogFormate
        }),
        new transports.File({ filename: 'app.log' })
    ],
});

export default logger;
