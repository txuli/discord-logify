#!/usr/bin/env node
import { Command } from 'commander';
import { log } from '../src/index.ts';

import { setup } from '../src/webhook.ts';
const program = new Command();
const logger = new log()


program
    .name('logger-cli')
    .description('CLI for managing custom logs');

program
    .command('add-log')
    .description('Add a personalized log')
    .argument('<logName>', 'logs name')
    .requiredOption('-c, --color <string>')
    .requiredOption('-t, --logTag <string>')
    .action((logName, options) => {
    logger.addLogLevel(logName, options.color, options.logTag)
    
  });


  program
      .command('setup')
      .description('setup the webhook')
      .argument('<id>', 'webhook id')
      .requiredOption('-t, --token <string>')
     
      .action((id, options) => {
      const isCreated=setup(id, options.token)
      if(isCreated) {
        console.log("created Succesfully")
      }else{
        console.error("something went wrong")
      }
    });


program.parse();
