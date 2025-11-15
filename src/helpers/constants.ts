import type { Env } from "../abstracts/Env.ts";
import { type LogLevel } from "../abstracts/LogLevel.ts";

export const ENV: Env = process.env["APP_ENV"] as Env;
export const VERSION = process.env["APP_VERSION"] as string;
export const LOG_LEVEL = process.env["APP_LOG_LEVEL"] as LogLevel;
export const HTTPS = process.env["HTTPS"] === "true";

export const PORT = Number(process.env["PORT"]);
export const BACKEND_BASE_URL = `http://${process.env["BACKEND_HOST"]}:${process.env["BACKEND_PORT"]}`;
export const BACKEND_MAPPING = process.env["BACKEND_MAPPING"];

export const FROTNEND_BASE_URL = `http://${process.env["FRONTEND_HOST"]}:${process.env["FRONTEND_PORT"]}`;
export const FROTNEND_MAPPING = process.env["FRONTEND_MAPPING"];

export const SSL_CRT_FILE = process.env["SSL_CRT_FILE"] as string;
export const SSL_KEY_FILE = process.env["SSL_KEY_FILE"] as string;