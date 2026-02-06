/**
 * Setup command
 * Handles webhook configuration
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * Setup webhook credentials in .env file
 */
export function setup(url: string): boolean {
    const envPath = path.join(process.cwd(), '.env');
    
    
    try {
        const envContent = `WEBHOOK_URL=${url}\n`;
        
        if (fs.existsSync(envPath)) {
           
            fs.appendFileSync(envPath, `\n${envContent}`);
        } else {
            
            fs.writeFileSync(envPath, envContent);
        }
        
        return true;
    } catch (error) {
        console.error('Failed to setup webhook:', error);
        return false;
    }
}
