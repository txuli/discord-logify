#!/usr/bin/env node
import { Command } from 'commander';
import { log } from '../src/index';
import { setup } from '../src/commands/setup';
import { toggleLogFile, setLogFile, getConfig } from '../src/utils/config';

const program = new Command();
const logger = new log();

program
  .name('logify')
  .description('Advanced logging system for Discord')
  .version('0.1.3');

/**
 * Setup webhook credentials
 */
program
  .command('setup <url>')
  .description('Setup Discord webhook credentials')
  .action((url) => {
    const isCreated = setup(url);
    if (isCreated) {
      console.log(' Webhook setup successfully!');
    } else {
      console.error(' Failed to setup webhook');
    }
  });

/**
 * Add custom log level
 */
program
  .command('add-log <prefix>')
  .description('Add a custom log level')
  .requiredOption('-c, --color <code>', 'ANSI color code (e.g., 32m for green)')
  .requiredOption('-t, --tag <tag>', 'Log tag (e.g., [SUCCESS])')
  .action((prefix, options) => {
    logger.addLogLevel(prefix, options.color, options.tag);
    console.log(` Log level "${prefix}" added successfully!`);
  });

/**
 * Toggle file logging
 */
program
  .command('logFile')
  .description('Toggle file logging on/off')
  .action(() => {
    const enabled = toggleLogFile();
    console.log(` File logging ${enabled ? 'enabled' : 'disabled'}`);
  });

/**
 * Show configuration
 */
program
  .command('config')
  .description('Show current configuration')
  .action(() => {
    const config = getConfig();
    console.log(' Current configuration:');
    console.log(JSON.stringify(config, null, 2));
  });

program.parse();
