import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
export type logLevel = {
    color: string;
    prefix: string;
    text: string
}
export class log {
    private configPath = path.join(process.cwd(), 'logger-config.json');
    private level = new Map<string, logLevel>([

    ])
    constructor() {
        this.loadFromFile()
        console.log("a")
    }
    private loadFromFile() {
        if (fs.existsSync(this.configPath)) {
            const data = fs.readFileSync(this.configPath, 'utf-8');
            const parsedData = JSON.parse(data) as Record<string, logLevel>;
            this.level = new Map(Object.entries(parsedData));
            console.log(this.level)
        }
    }
    private date() {
        const d = new Date();
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // +1 porque enero = 0
        const year = d.getFullYear();

        const hour = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        const sec = String(d.getSeconds()).padStart(2, '0');

        return `[${day}/${month}/${year} ${hour}:${min}:${sec}]`;
        ;
    }
    Info(msg: string) {
        process.stdout.write(`${this.date()} \x1b[36m[INFO]\x1b[0m ${msg}\n`);
    }
    Alert(msg: string) {
        process.stdout.write(`${this.date()} \x1b[33m[WARN]\x1b[0m ${msg}\n`);
    }
    Error(msg: string) {
        process.stdout.write(`${this.date()} \x1b[31m[ERROR]\x1b[0m ${msg}\n`);
    }
    public addLogLevel(prefix: string, logColor: string, logTag: string): void {
        /* if(!fs.existsSync(this.configPath)){ */
           
            this.level.set(prefix, { color: logColor, prefix: prefix, text: logTag })
            
            fs.writeFileSync(this.configPath, JSON.stringify(Object.fromEntries(this.level)), 'utf-8');
      /*   } */
        
        
    }
}


