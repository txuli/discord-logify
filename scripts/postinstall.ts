#!/usr/bin/env node

/**
 * Post-install script
 * Prompts user for webhook setup on first installation
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const envPath = path.join(process.cwd(), '.env');




const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('\n\x1b[34mWelcome to Discord Logify!\x1b[0m');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

rl.question('\n📝 Enter your Discord webhook URL:\n> ', (webhookUrl) => {
  if (!webhookUrl.trim()) {
    console.log('\n Webhook URL is required');
    rl.close();
    process.exit(1);
  }

 
  

  const envContent = `WEBHOOK_URL=${webhookUrl}`;

  if(fs.existsSync(envPath)){
    fs.appendFile(envPath, '\n'+envContent, 'utf-8', (err) => {
      if (err) {
        console.error('Error writing to .env file:', err);
        process.exit(1);
      }
    });
  }else{
    fs.writeFileSync(envPath, envContent, 'utf-8');
  }

  console.log('\n \x1b[32m Webhook configured successfully! \x1b[0m');
  console.log('\n \x1b[34m Next steps:');
  console.log('   1. Import: import { log } from "discord-logify"');
  console.log('   2. Create: const logger = new log()');
  console.log('   3. Log: logger.Info("Hello from Discord!")\x1b[0m');
  console.log('\n Learn more: https://github.com/txuli/discord-logify');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  rl.close();
});
