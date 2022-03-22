import { createLogger, format } from 'winston';
import { existsSync, mkdirSync } from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file'
import 'date-utils';

declare global {
	interface Date {
		toFormat (format: string): string
	}
}

enum Level {
	DEBUG	= 'debug',
	INFO	= 'info',
	WARN	= 'warn',
	ERROR	= 'error'
}

const log = (fileName: string, message: any, level: Level): void => {
	const logMessage: string = (typeof message === 'string') ? message : JSON.stringify(message);
	const logDir = './logs';
	const logLevel = level || 'info';
	!existsSync(logDir) && mkdirSync(logDir);
	const logger = createLogger({
			level: 'debug',
			transports: [
				new DailyRotateFile({
					filename: `${logDir}/${fileName}.log`,
						zippedArchive: true,
						format: format.printf( info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
				})
			]
		});

	switch(logLevel) {
		case Level.DEBUG:
			logger.debug(logMessage);
			break;
		case Level.INFO:
			logger.info(logMessage);
			break;
		case Level.WARN:
			logger.warn(logMessage);
			break;
		case Level.ERROR:
			logger.error(logMessage);
			break;
	}
}

export default log;