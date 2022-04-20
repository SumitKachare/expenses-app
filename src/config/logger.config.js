import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
import fs from "fs"
import dotenv from "dotenv"

// load env vars
dotenv.config()

const { combine, timestamp, printf , colorize } = format;
let logger = null

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  });

// logger for development mode
const devLogger = () => {

    return createLogger({
        level: 'debug',
        format: combine(
            colorize(),
            timestamp({format : "HH:mm:ss"}),
            myFormat
          ),
        transports: [
          new transports.Console()
        ],
      });
}


// logger for production mode
const prodLogger = () => {

  console.log("process.env.LOGS_DIRECTORY" , process.env.EMAIL_SERVICE);

    const logDir = process.env.LOGS_DIRECTORY || './logs-server/';

    // Create the log directory if it does not exist
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    const dailyRotateFileTransport = new transports.DailyRotateFile({
        filename: `${logDir}/%DATE%.log`,
        datePattern: "YYYY-MM-DD",
        json: true,
        handleExceptions: true,
        maxSize: "10m",
        maxFiles: "14d",
      });

    return createLogger({
        level: 'info',
        format: combine(
            timestamp(),
            myFormat
          ),
        transports: [
          new transports.Console(),
          dailyRotateFileTransport,
          new transports.DailyRotateFile({
            filename: `${logDir}/%DATE%_error.log`,
            level: "error",
          }),
        ],
      });
}

if (process.env.NODE_ENV === "development") {
    logger = devLogger()
}else{
    logger = prodLogger()
}

logger.stream = {
    write: function (message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
  };

export default logger

