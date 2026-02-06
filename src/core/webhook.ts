/**
 * Discord Webhook utilities
 * Handles sending and editing messages via Discord webhooks
 */

async function send(log: string): Promise<string | null> {
    const msg = await fetch(`${process.env.WEBHOOK_URL}?wait=true`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: '```ansi\n' + log + '\n```',
            username: 'logify',
        }),
    });
    
    if (!msg.ok) {
        const errorText = await msg.text();
        throw new Error(`Discord webhook error: ${msg.status} - ${errorText}`);
    }
    
    const response = await msg.json();
    return response.id;
}

async function edit(id: string, log: string): Promise<void> {
    const url = `${process.env.WEBHOOK_URL}/messages/${id}`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: '```ansi\n' + log + '\n```',
        }),
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Discord webhook error: ${response.status} - ${errorText}`);
    }
}

export { send, edit };
