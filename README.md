# Penpal - Chrome Extension Template

A Chrome extension template with Clerk authentication that displays a "Working" status when authenticated.

## Project Structure

```
penpal/
├── manifest.json          # Chrome extension configuration
├── popup.html            # Extension popup interface
├── popup.js              # Popup logic and authentication
├── popup.css             # Popup styling
├── config.example.js     # API key configuration template
├── config.js             # Your API keys (git-ignored, create from example)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules (includes config.js)
├── icons/                # Extension icons
│   ├── generate-icons.html  # Tool to generate icon files
│   ├── icon.svg          # Source SVG icon
│   └── README.md         # Instructions for creating icons
├── docs/                 # Documentation files
│   ├── API-KEY-SECURITY.md  # API key security guide
│   ├── QUICK-START.md
│   ├── PROJECT-SUMMARY.md
│   ├── SETUP.md
│   └── google-docs-ai-editor-implementation.md
├── index.html           # Standalone auth demo page
├── app.js               # Standalone demo logic
└── styles.css           # Standalone demo styles
```

## Features

- Simple Chrome extension popup interface
- Clerk authentication integration
- "Working" status indicator when authenticated
- User information display
- Sign out functionality

## Setup Instructions

### 1. Configure API Keys (IMPORTANT!)

**Never commit your API keys to version control!**

1. Create your configuration file:
   ```bash
   cp config.example.js config.js
   ```

2. Get your Clerk credentials:
   - Sign up at https://clerk.com
   - Create a new application
   - Copy your publishable key and frontend API URL

3. Edit `config.js` and add your keys:
   ```javascript
   window.CONFIG = {
       CLERK_PUBLISHABLE_KEY: 'pk_test_your_actual_key',
       CLERK_FRONTEND_API: 'your-app.clerk.accounts.dev',
       // ... other keys
   };
   ```

4. Verify `config.js` is in `.gitignore` (it already is)

**📖 For detailed security information, see [docs/API-KEY-SECURITY.md](docs/API-KEY-SECURITY.md)**

### 2. Generate Extension Icons

Before loading the extension, you need to generate the icon files:

1. Open `icons/generate-icons.html` in your browser
2. Click each download button to get:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`
3. Save all three files in the `icons/` directory

Alternatively, follow the instructions in `icons/README.md` for other methods.

### 3. Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `penpal` directory
5. The extension should now appear in your extensions list

### 4. Test the Extension

1. Click the Penpal extension icon in your Chrome toolbar
2. Sign in using the Clerk authentication form
3. After successful authentication, you should see:
   - A green checkmark icon
   - "Working" status message
   - Your name and email
   - Sign out button

## Development

### Extension Popup

The popup is a compact interface (320x400px) that appears when clicking the extension icon:

- **popup.html** - HTML structure for the popup
- **popup.js** - Handles authentication and UI state
- **popup.css** - Styling optimized for the popup size

### Standalone Demo

For testing authentication outside the extension context:

1. Open `index.html` directly in your browser
2. This provides a full-page version of the authentication flow
3. Useful for debugging Clerk integration

## Key Files

### manifest.json

Defines the Chrome extension configuration:
- Extension metadata (name, version, description)
- Required permissions (storage, activeTab)
- Popup configuration
- Host permissions for Google Docs

### popup.js

Main logic including:
- Clerk SDK initialization
- Authentication state management
- User interface updates
- Sign out functionality

Key functions:
- `mountClerkComponents()` - Sets up Clerk UI components (popup.js:47)
- `showAppSection()` - Displays authenticated state (popup.js:68)
- `showAuthSection()` - Shows login form (popup.js:85)

## Customization

### Changing the Status Message

Edit `popup.html` line 18:
```html
<h2 class="status-message">Working</h2>
```

### Styling the Popup

Modify `popup.css` to customize:
- Colors (current gradient: #667eea to #764ba2)
- Layout and spacing
- Animations and transitions

### Adding New Features

The extension currently has minimal functionality. To extend it:

1. Add new UI elements to `popup.html`
2. Implement logic in `popup.js`
3. Style with `popup.css`
4. Update `manifest.json` if new permissions are needed

## Permissions

Current permissions in `manifest.json`:
- `storage` - Store user preferences and authentication state
- `activeTab` - Interact with the current browser tab
- `https://docs.google.com/*` - Access Google Docs pages

## Troubleshooting

### Extension doesn't load
- Ensure all icon files are present in the `icons/` directory
- Check Chrome DevTools console for errors
- Verify `manifest.json` syntax is correct

### Authentication fails
- Verify `config.js` exists (copy from `config.example.js`)
- Check that your API keys are correctly set in `config.js`
- Verify Clerk publishable key format (should start with `pk_`)
- Check that Clerk frontend API URL is properly formatted
- Ensure your Clerk application is active
- Check browser console for Clerk-related errors

### "Config file not loaded" error
- Make sure you created `config.js` from `config.example.js`
- Verify `config.js` is in the root directory
- Check that `window.CONFIG` is defined (open DevTools console)
- Reload the extension after creating `config.js`

### Popup doesn't open
- Right-click the extension icon and select "Inspect popup"
- Check for JavaScript errors in the DevTools console
- Verify `popup.html`, `popup.js`, and `popup.css` paths are correct

## Next Steps

This is a basic template. Consider adding:

1. **Content Scripts** - Interact with web pages (e.g., Google Docs)
2. **Background Worker** - Handle background tasks and message passing
3. **Options Page** - User settings and configuration
4. **Storage** - Persist user preferences and data
5. **API Integration** - Connect to external services (AI, etc.)

See the documentation in the `docs/` folder for more advanced implementation ideas.

## Security

This template uses a file-based configuration approach for development:

- **API keys** are stored in `config.js` (git-ignored)
- **Never commit** `config.js` or `.env` to version control
- For production, consider using Chrome Storage API or a backend proxy
- See [docs/API-KEY-SECURITY.md](docs/API-KEY-SECURITY.md) for detailed security guidance

**⚠️ Important Security Notes:**
- The current setup is suitable for **local development only**
- If publishing this extension, **do not include your API keys**
- Consider having users enter their own keys via an options page
- For production use, implement a backend proxy to protect API keys

## Documentation

Additional documentation is available in the `docs/` folder:
- **`API-KEY-SECURITY.md`** - Comprehensive API key security guide
- `QUICK-START.md` - Quick start guide
- `PROJECT-SUMMARY.md` - Technical breakdown
- `SETUP.md` - Detailed setup instructions
- `google-docs-ai-editor-implementation.md` - Full implementation guide

## License

This is a template project. Add your own license as needed.
