#!/usr/bin/env node
import { Command } from 'commander';
import { log } from '../src/index.ts';
import fs from "fs"
const program = new Command();
const logger = new log()
interface AddLogOptions {
    color?: boolean;
}
/* prefix:string, logColor:string, logTag:string */
program
    .name('logger-cli')
    .description('CLI para gestionar logs personalizados');

program
    .command('add-log')
    .description('Añade un log personalizado')
    .argument('<logName>', 'logs name')
    .requiredOption('-c, --color <string>')
    .requiredOption('-t, --logTag <string>')
    .action((logName, options) => {
    logger.addLogLevel(logName, options.color, options.logTag)
  });


program.parse();







/* const args = process.argv.slice(2);
console.log(args)
const command = args[0];
const options = program.opts();
const limit = options.color ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit)); */

/* function getFlag(flag:string) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

if (command === "add-log") {
    const color= getFlag("--color")
  if(color== null){
    console.log("you need to add --color")
  }
  console.log(color)
  process.exit(0);
}

console.log("Comando no reconocido");
process.exit(1); */

//TODO buscar info commander si es veneficioso 