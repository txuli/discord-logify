/**
 * Core Logger class
 * Handles logging to console, file, and Discord webhook
 */

import { existsSync, writeFileSync, readFileSync, appendFile } from 'node:fs';
import * as path from 'node:path';
import { edit, send } from './webhook';

export type logLevel = {
    color: string;
    prefix: string;
    text: string;
};

let buffer: string[] = [];
let timer: NodeJS.Timeout | null = null;
let lastMessageId: string | null = null;
const timeOut = 1000;

export class log {
    private logFile = false;
    private configPath = path.join(process.cwd(), 'logger-config.json');
    private logPath = path.join(process.cwd(), 'logify.log');
    public config = new Map<string, logLevel | undefined | boolean>([]);

    constructor() {
        this.loadConfig();
    }

    private loadConfig() {
        if (!existsSync(this.configPath)) {
            writeFileSync(this.configPath, '{"logFile":false}');
        } else {
            const data = readFileSync(this.configPath, 'utf-8');
            const parsedData = JSON.parse(data) as Record<string, logLevel | boolean>;
            this.config = new Map(Object.entries(parsedData));
            const check = this.config.get('logFile');
            this.logFile = typeof check === 'boolean' ? check : false;
        }

        if (this.logFile && !existsSync(this.logPath)) {
            writeFileSync(this.logPath, '');
        }
    }

    
    private date(): string {
        const d = new Date();
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        const hour = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        const sec = String(d.getSeconds()).padStart(2, '0');

        return `[${day}/${month}/${year} ${hour}:${min}:${sec}]`;
    }

    
    public Info(msg: string) {
        process.stdout.write(`${this.date()} \x1b[36m[INFO]\x1b[0m ${msg}\n`);
        buffer.push(`${this.date()} \x1b[36m[INFO]\x1b[0m ${msg}\n`);
        this.writeLogFile(`${this.date()} [INFO] ${msg}\\n`);
        this.sendMessage();
    }

   
    public Alert(msg: string) {
        process.stdout.write(`${this.date()} \x1b[33m[WARN]\x1b[0m ${msg}\n`);
        buffer.push(`${this.date()} \x1b[33m[WARN]\x1b[0m ${msg}\n`);
        this.writeLogFile(`${this.date()} [WARN] ${msg}\n`);
        this.sendMessage();
    }

    public Error(msg: string) {
        process.stdout.write(`${this.date()} \x1b[31m[ERROR]\x1b[0m ${msg}\n`);
        buffer.push(`${this.date()} \x1b[31m[ERROR]\x1b[0m ${msg}\n`);
        this.writeLogFile(`${this.date()} [ERROR] ${msg}\n`);
        this.sendMessage();
    }

   
    public Log(msg: string, prefix: string) {
        const selected = this.config.get(prefix);
        if (typeof selected === 'object' && selected !== null) {
            process.stdout.write(`${this.date()} \x1b[${selected.color}${selected.text}\x1b[0m ${msg}\n`);
            buffer.push(`${this.date()} \x1b[${selected.color}${selected.text}\x1b[0m ${msg}\n`);
            this.writeLogFile(`${this.date()} ${selected.text} ${msg}\n`);
        }
        this.sendMessage();
    }

   
    public addLogLevel(prefix: string, logColor: string, logTag: string): void {
        this.config.set(prefix, { color: logColor, prefix: prefix, text: logTag });
        writeFileSync(this.configPath, JSON.stringify(Object.fromEntries(this.config)), 'utf-8');
    }

    /**
     * Send buffered messages to Discord
     * Uses message editing to reduce spam
     */
    private async sendMessage(): Promise<void> {
        if (timer) clearTimeout(timer);
        timer = setTimeout(async () => {
            const payload = buffer.join('');
            buffer = [];
            if (!payload) return;

            try {
                if (lastMessageId) {
                    await edit(lastMessageId, payload);
                } else {
                    lastMessageId = await send(payload);
                }
            } catch (error) {
                console.error('Failed to send message to Discord:', error);
            }
        }, timeOut);
    }

    /**
     * Write log to file if enabled
     */
    private writeLogFile(log: string) {
        if (this.logFile) {
            appendFile(this.logPath, log, (err) => {
                if (err) {
                    console.error('Failed to write to log file:', err);
                }
            });
        }
    }
}
