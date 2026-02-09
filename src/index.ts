/**
 * Discord Logify - Main entry point
 * Exports the log class for easy integration
 */

import 'dotenv/config';
import { log } from './core/logger';

export { log };
export type { logLevel } from './core/logger';
