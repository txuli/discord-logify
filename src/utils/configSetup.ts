
import fs from 'node:fs';
import path from 'node:path';

const route = path.join(process.cwd(), '.env')
const configPath = path.join(process.cwd(), 'logger-config.json');
export function webHookSecretSetup(url: string) {
    if (fs.existsSync(route)) {
        fs.appendFile(route, `\nWEBHOOK_URL=${url}`, function (err) {
            if (err) return false;
            return true;
        })
    } else {
        fs.writeFileSync(route, `\nWEBHOOK_URL=${url}`)
    }
    return true
}
export function toggleLogFile() {
    
    const info = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    info['logFile']= !info['logFile']
    fs.writeFileSync(configPath, JSON.stringify(info))
}