
import fs from 'node:fs';
import path from 'node:path';
import { WebhookClient } from 'discord.js'

console.log(process.env.WEBHOOK_ID)
const webhookClient = new WebhookClient({ id: process.env.WEBHOOK_ID??"", token: process.env.WEBHOOK_TOKEN??"" });
const route = path.join(process.cwd(), '.env')
async function send(log: string) {
    const msg = await webhookClient.send({
        content: '```ansi\n' + log + '\n```',
        username: "log",
        

    });
    return msg.id
}

async function edit(id: string, log: string) {
    webhookClient.editMessage(id, {
        content: "```js\nconsole.log('hola')\n```",

    });
}
function setup(id: string, token: string) {
    if (fs.existsSync(route)) {
        fs.appendFile(route, `\nWEBHOOK_ID=${id}\nWEBHOOK_TOKEN=${token}`, function (err) {
            if (err) return false;
            return true;
        })
    }else{
        fs.writeFileSync(route,`\nWEBHOOK_ID=${id}\nWEBHOOK_TOKEN=${token}`)
    }
    return true
}
export { send, edit, setup }