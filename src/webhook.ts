
import fs from 'node:fs';
import path from 'node:path';
import { WebhookClient } from 'discord.js'



const route = path.join(process.cwd(), '.env')
let webhookClient: WebhookClient | null = null;

function getWebhookClient(): WebhookClient {
    if (!webhookClient) {
        webhookClient = new WebhookClient({
            id: process.env.WEBHOOK_ID ?? "",
            token: process.env.WEBHOOK_TOKEN ?? "",
        });
    }
    return webhookClient;
}

async function send(log: string) {
    const client = getWebhookClient();
    const msg = await client.send({
        content: '```ansi\n' + log + '\n```',
        username: "log",


    });
    return msg.id
}

async function edit(id: string, log: string) {
    const client = getWebhookClient();
    client.editMessage(id, {
        content: '```ansi\n' + log + '\n```',

    });
}
function setup(id: string, token: string) {
    if (fs.existsSync(route)) {
        fs.appendFile(route, `\nWEBHOOK_ID=${id}\nWEBHOOK_TOKEN=${token}`, function (err) {
            if (err) return false;
            return true;
        })
    } else {
        fs.writeFileSync(route, `\nWEBHOOK_ID=${id}\nWEBHOOK_TOKEN=${token}`)
    }
    return true
}
export { send, edit, setup }