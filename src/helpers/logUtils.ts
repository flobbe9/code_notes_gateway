import type { CustomResponseFormat } from '../abstracts/CustomResponseFormat.ts';
import { logLevelDef, type LogLevel } from '../abstracts/LogLevel.ts';
import { ENV, LOG_LEVEL } from './constants.ts';
import { getTimeStamp } from './utils.ts';

/**
 * Call the corresponding `console[logLevel]` method.
 *
 * NOTE: not touching `conosle.log`
 *
 * @param logLevel
 * @param optionalParams
 * @returns
 */
function logByLogLevel(logLevel: LogLevel, ...optionalParams: any[]): void {
    if (!isLogLevel(logLevel)) return;

    let jsLogLevel = logLevel.toLowerCase();
    if (logLevel === "FATAL")
        jsLogLevel = "ERROR".toLowerCase();
    
    // prevent annoying stack trace
    if (logLevel === "TRACE")
        jsLogLevel = "DEBUG".toLowerCase();

    (console[jsLogLevel as "info"])(getLogStartOfLine(logLevel), ...optionalParams);
}

export function logError(message?: any, ...optionalParams: any[]): void {
    if (message instanceof Error) message = message.message;

    logByLogLevel("ERROR", message, ...optionalParams);
}

export function logWarn(message?: any, ...optionalParams: any[]): void {
    logByLogLevel("WARN", message, ...optionalParams);
}

export function logInfo(message?: any, ...optionalParams: any[]): void {
    logByLogLevel("INFO", message, ...optionalParams);
}

export function logDebug(message?: any, ...optionalParams: any[]): void {
    logByLogLevel("DEBUG", message, ...optionalParams);
}

export function logTrace(message?: any, ...optionalParams: any[]): void {
    logByLogLevel("TRACE", message, ...optionalParams);
}

export function log(...optionalParams: any[]): void {
    console.log(...optionalParams);
}

/**
 * Log the all props of given {@link CustomResponseFormat} response and include the stacktrace.
 *
 * @param response idealy formatted as {@link CustomResponseFormat}
 */
export function logApiResponse(response: CustomResponseFormat): void {
    logError(response.timestamp + ' (' + response.status + '): ' + response.message + (response.path ? ' ' + response.path : ''));
}

/**
 * Indicates whether `logLevel` is matching {@link LOG_LEVEL}, meaning that logs with that level would
 * be enabled.
 *
 * Make sure not to debug or trace in production (use {@link APP_ENV})
 *
 * NOTE: dont use custom log methods here to prevent cycle.
 *
 * @param logLevel
 * @returns `true` if `logLevel` ordianl value is less than equal {@link LOG_LEVEL}
 */
function isLogLevel(logLevel: LogLevel): boolean {
    if (isNonProductionLogLevel(logLevel) && ENV === 'production')
        return false;

    return logLevelDef[LOG_LEVEL] >= logLevelDef[logLevel];
}

function isNonProductionLogLevel(logLevel: LogLevel): boolean {
    const nonProductionLogLevels = new Set(["DEBUG", "TRACE"]);

    return nonProductionLogLevels.has(logLevel);
}

/**
 * Log the timestamp before every log entry.
 *
 * @param logLevel
 * @returns the string the log entry should start with
 */
export function getLogStartOfLine(logLevel: LogLevel): string {
    return `[${logLevel}] ${getTimeStamp()}`;
}
