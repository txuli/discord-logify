/**
 * Discord Logify - Main entry point
 * Exports the log class for easy integration
 */

import 'dotenv/config';
import { log } from './core/logger.ts';

export { log };
export type { logLevel } from './core/logger.ts';


const logger= new log()
logger.Alert("aaaa")
