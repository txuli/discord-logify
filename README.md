# Discord Logify

A lightweight Discord logger that captures and forwards server events to webhooks for easy monitoring and auditing

## 🚀 Features

-  Multiple predefined log levels (Info, Alert, Error)
-  Customizable log levels with colors and tags
-  Automatic log sending to Discord
-  Buffer system to optimize message delivery
-  CLI for configuration management

## 📦 Installation

```bash
npm install discord-logify
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root of your project:

```env
WEBHOOK_ID=YOUR_WEBHOOK_ID
WEBHOOK_TOKEN=YOUR_WEBHOOK_TOKEN
```

## 💻 Usage

### Import and Create Instance

```typescript
import { log } from 'discord-logify';

const logger = new log();
```

### Predefined Log Levels

```typescript
// Information log
logger.Info('Application started successfully');

// Warning log
logger.Alert('Warning: Slow connection detected');

// Error log
logger.Error('Error processing request');
```

### Custom Log Levels

```typescript
// Add a custom log level
logger.addLogLevel('debug', '\x1b[35m', '[DEBUG]');

// Use the custom level
logger.Log('Debug message', 'debug');
```

## 🎨 ANSI Color Codes

- `\x1b[31m` - Red (Error)
- `\x1b[33m` - Yellow (Warning)
- `\x1b[36m` - Cyan (Info)
- `\x1b[35m` - Magenta
- `\x1b[32m` - Green
- `\x1b[0m` - Reset

## 🛠️ CLI

### Add a Log Level

```bash
logify add-log "prefix" -c "color_code" -t "[TAG]"
```

Example:
```bash
logify add-log "debug" -c "\x1b[35m" -t "[DEBUG]"
```

## 📁 Configuration File

Custom log levels are stored in `logger-config.json`:

```json
{
  "debug": {
    "color": "\x1b[35m",
    "prefix": "debug",
    "text": "[DEBUG]"
  }
}
```

## 🔄 How It Works

1. Messages are added to a buffer
2. After 1 second of inactivity, logs are sent to Discord
3. Subsequent messages edit the previous message to reduce spam
4. Logs are also displayed in the console with colors

## 📝 Complete Example

```typescript
import { log } from 'discord-logify';

const logger = new log();

// Add a custom level
logger.addLogLevel('success', '\x1b[32m', '[SUCCESS]');

// Use different log levels
logger.Info('Server started on port 3000');
logger.Log('User authenticated successfully', 'success');
logger.Alert('RAM usage at 80%');
logger.Error('Database connection failed');
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC

## 👤 Author

**txuli**

- GitHub: [@txuli](https://github.com/txuli)

## 🐛 Report Bugs

If you find a bug, please open an issue at:
https://github.com/txuli/discord-logify/issues

---

⭐ If you like this project, give it a star on GitHub!