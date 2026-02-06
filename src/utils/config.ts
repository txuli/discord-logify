/**
 * Configuration utilities
 * Handles logger configuration file management
 */

import fs from 'node:fs';
import path from 'node:path';

const configPath = path.join(process.cwd(), 'logger-config.json');

/**
 * Get the current configuration
 */
export function getConfig(): Record<string, any> {
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify({ logFile: false }));
    }
    
    const data = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(data);
}

/**
 * Toggle file logging on/off
 */
export function toggleLogFile(): boolean {
    const config = getConfig();
    config.logFile = !config.logFile;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return config.logFile;
}

/**
 * Set file logging enabled/disabled
 */
export function setLogFile(enabled: boolean): void {
    const config = getConfig();
    config.logFile = enabled;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

/**
 * Check if file logging is enabled
 */
export function isLogFileEnabled(): boolean {
    const config = getConfig();
    return config.logFile === true;
}

/**
 * Add or update a custom log level
 */
export function addLogLevel(prefix: string, color: string, text: string): void {
    const config = getConfig();
    config[prefix] = { color, prefix, text };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

/**
 * Remove a log level
 */
export function removeLogLevel(prefix: string): void {
    const config = getConfig();
    delete config[prefix];
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

/**
 * Get all log levels (excluding logFile setting)
 */
export function getLogLevels(): Record<string, any> {
    const config = getConfig();
    const { logFile, ...logLevels } = config;
    return logLevels;
}

