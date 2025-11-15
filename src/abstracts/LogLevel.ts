export const logLevelDef = {
    'FATAL': 0,
    'ERROR': 1,
    'WARN': 2,
    'INFO': 3,
    'DEBUG': 4,
    'TRACE': 5
};

export type LogLevel = keyof typeof logLevelDef;

export function isLogLevelType(str: string): str is LogLevel {
    return Object.keys(logLevelDef).includes(str);
}
