# Discord Logify

A lightweight and powerful logging system that sends formatted logs to Discord via webhooks, with zero external dependencies for Discord integration.

## 🚀 Features

- 📝 Multiple predefined log levels (Info, Alert, Error)
- 🎨 Customizable log levels with ANSI colors and tags
- 🔄 Automatic log buffering and batching for Discord
- 💾 Optional local file logging
- 🎯 Message editing to reduce Discord spam
- 🕒 Automatic timestamps on all logs
- 🛠️ CLI for easy configuration
- 🌈 ANSI color support in Discord and terminal

## 📦 Installation

```bash
npm install discord-logify
```

## ⚙️ Configuration

### Get Your Webhook URL

1. Go to your Discord server
2. Right-click on a channel → **Edit Channel**
3. Go to **Integrations** → **Webhooks**
4. Click **New Webhook** or copy an existing one
5. Copy the **Webhook URL**

### Enable File Logging (Optional)

Edit `logger-config.json` in your project root:

```json
{
  "logFile": true
}
```

Logs will be saved to `logify.log` in your project root.

## 💻 Usage

### Import and Create Instance

```typescript
import { log } from 'discord-logify';

const logger = new log();
```

### Predefined Log Levels

```typescript
// Information log (cyan)
logger.Info('Application started successfully');

// Warning log (yellow)
logger.Alert('Warning: Slow connection detected');

// Error log (red)
logger.Error('Error processing request');
```

**Output example:**
```
[06/02/2026 15:30:45] [INFO] Application started successfully
[06/02/2026 15:30:46] [WARN] Warning: Slow connection detected
[06/02/2026 15:30:47] [ERROR] Error processing request
```

### Custom Log Levels

```typescript
// Add a custom log level
logger.addLogLevel('debug', '35m', '[DEBUG]');

// Use the custom level
logger.Log('Debug message', 'debug');
```

## 🎨 ANSI Color Codes

When adding custom log levels, use these color codes (without `\x1b[`):

- `31m` - Red (Error)
- `33m` - Yellow (Warning)
- `36m` - Cyan (Info)
- `35m` - Magenta
- `32m` - Green
- `34m` - Blue
- `37m` - White

**Example:**
```typescript
logger.addLogLevel('success', '32m', '[SUCCESS]'); // Green
logger.addLogLevel('critical', '31m', '[CRITICAL]'); // Red
```

## 🛠️ CLI

### Setup Webhook (Manual)

```bash
logify setup <webhook_url>
```

This creates a `.env` file with your webhook credentials if one doesn't already exist.

### Add a Custom Log Level

```bash
logify add-log <prefix> -c <color_code> -t <tag>
```

**Example:**
```bash
logify add-log debug -c "35m" -t "[DEBUG]"
logify add-log success -c "32m" -t "[SUCCESS]"
```

### View Configuration

```bash
logify config
```

Shows all custom log levels in your `logger-config.json`.

### Toggle File Logging

```bash
logify logFile
```

Toggles the file logging feature on/off.

## 📁 Configuration File

Custom log levels are stored in `logger-config.json`:

```json
{
  "logFile": true,
  "debug": {
    "color": "35m",
    "prefix": "debug",
    "text": "[DEBUG]"
  },
  "success": {
    "color": "32m",
    "prefix": "success",
    "text": "[SUCCESS]"
  }
}
```

## 🔄 How It Works

1. **Buffering**: Logs are added to an internal buffer
2. **Batching**: After 1 second of inactivity, all buffered logs are sent to Discord
3. **Message Editing**: Subsequent log batches edit the previous Discord message to reduce spam
4. **ANSI Rendering**: Discord renders ANSI color codes using markdown code blocks
5. **Local Logging**: Optionally writes logs to `logify.log` (without ANSI codes)
6. **No Dependencies**: Uses native Node.js `fetch` API (Node 18+)

## 📋 Full API Reference

### `log` Class

#### Methods

- `Info(msg: string)`: Log an info message (cyan)
- `Alert(msg: string)`: Log a warning message (yellow)
- `Error(msg: string)`: Log an error message (red)
- `Log(msg: string, prefix: string)`: Log with a custom level
- `addLogLevel(prefix: string, color: string, tag: string)`: Add a custom log level

### Environment Variables

- `WEBHOOK_URL`: Full Discord webhook URL (required)

## 📝 Complete Example

```typescript
import { log } from 'discord-logify';

const logger = new log();

// Add custom levels
logger.addLogLevel('success', '32m', '[✓]');
logger.addLogLevel('debug', '35m', '[DEBUG]');
logger.addLogLevel('critical', '31m', '[ CRITICAL]');

// Use different log levels
logger.Info('Server started on port 3000');
logger.Log('User authenticated successfully', 'success');
logger.Log('Debugging user session', 'debug');
logger.Alert('RAM usage at 80%');
logger.Error('Database connection failed');
logger.Log('CRITICAL: System overload!', 'critical');
```

**Discord Output:**
```ansi
[06/02/2026 15:30:45] [INFO] Server started on port 3000
[06/02/2026 15:30:45] [✓] User authenticated successfully
[06/02/2026 15:30:45] [DEBUG] Debugging user session
[06/02/2026 15:30:46] [WARN] RAM usage at 80%
[06/02/2026 15:30:47] [ERROR] Database connection failed
[06/02/2026 15:30:47] [ CRITICAL] CRITICAL: System overload!
```

## 💡 Use Cases

- 🖥️ **Server Monitoring**: Track application health and errors
- 🔍 **Debugging**: Real-time debug logs in Discord
- 📊 **Event Tracking**: Log important business events
- 🚨 **Alert System**: Get notified of critical issues
- 📈 **Analytics**: Track user actions and metrics
- 🛡️ **Security**: Monitor suspicious activities

## Requirements

- Node.js 18+ (for native `fetch` API)
- Discord webhook URL
- `dotenv` package (included as dependency)

## FAQ & Troubleshooting

### Logs not appearing in Discord?

1. Verify your `WEBHOOK_URL` in `.env`
2. Check the webhook still exists in Discord
3. Ensure your Node.js version is 18+


### Message rate limiting?

Discord webhooks have rate limits. The 1-second buffer helps batch logs to avoid hitting limits.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

ISC

## 👤 Author

**txuli**

- GitHub: [@txuli](https://github.com/txuli)
- Repository: [discord-logify](https://github.com/txuli/discord-logify)

## Report Bugs

If you find a bug, please open an issue at:
https://github.com/txuli/discord-logify/issues


⭐ If you like this project, give it a star on GitHub!

