# Penpal - Chrome Extension Template

A Chrome extension template with a sidebar panel, Clerk authentication, and a "Working" status indicator when authenticated.

## Project Structure

```
penpal/
├── manifest.json          # Chrome extension configuration
├── sidebar.html           # Extension sidebar interface
├── sidebar.js             # Sidebar logic and authentication
├── sidebar.css            # Sidebar styling
├── background.js          # Service worker for sidebar control
├── config.example.js      # API key configuration template
├── config.js              # Your API keys (git-ignored, create from example)
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules (includes config.js)
├── icons/                 # Extension icons
│   ├── generate-icons.html  # Tool to generate icon files
│   ├── icon.svg           # Source SVG icon
│   └── README.md          # Instructions for creating icons
├── docs/                  # Documentation files
│   ├── API-KEY-SECURITY.md  # API key security guide
│   ├── QUICK-START.md
│   ├── PROJECT-SUMMARY.md
│   ├── SETUP.md
│   └── google-docs-ai-editor-implementation.md
├── index.html            # Standalone auth demo page
├── app.js                # Standalone demo logic
└── styles.css            # Standalone demo styles
```

## Features

- **Sidebar Panel** - Full-height side panel that opens alongside web pages
- **Clerk Authentication** - Secure user authentication
- **"Working" Status** - Visual indicator when authenticated
- **User Information** - Display user name and email
- **Auto-activation** - Sidebar automatically available on Google Docs
- **Sign Out** - Easy authentication management

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

1. **Open the sidebar**: Click the Penpal extension icon in your Chrome toolbar
   - The sidebar panel will open on the right side of your browser

2. **Sign in**: Use the Clerk authentication form in the sidebar

3. **After successful authentication**, you should see:
   - A large green checkmark icon with animation
   - "Working" status message
   - Your name and email
   - Sign out button

4. **Auto-activation on Google Docs**: Visit any Google Docs page
   - The sidebar will automatically be available
   - Click the extension icon to open it

## Development

### Extension Sidebar

The sidebar is a full-height panel that opens alongside web pages:

- **sidebar.html** - HTML structure for the sidebar
- **sidebar.js** - Handles authentication and UI state
- **sidebar.css** - Styling optimized for sidebar layout
- **background.js** - Service worker that opens the sidebar on icon click

The sidebar uses Chrome's Side Panel API (Manifest V3) for a native side-by-side experience.

### Standalone Demo

For testing authentication outside the extension context:

1. Open `index.html` directly in your browser
2. This provides a full-page version of the authentication flow
3. Useful for debugging Clerk integration

## Key Files

### manifest.json

Defines the Chrome extension configuration:
- Extension metadata (name, version, description)
- Required permissions (storage, activeTab, sidePanel)
- Side panel configuration
- Background service worker
- Host permissions for Google Docs

### sidebar.js

Main logic including:
- Clerk SDK initialization
- Authentication state management
- User interface updates
- Sign out functionality

Key functions:
- `loadClerkSDK()` - Dynamically loads Clerk with config (sidebar.js:2)
- `mountClerkComponents()` - Sets up Clerk UI components (sidebar.js:75)
- `showAppSection()` - Displays authenticated state (sidebar.js:96)
- `showAuthSection()` - Shows login form (sidebar.js:113)

### background.js

Service worker that:
- Opens the sidebar when extension icon is clicked (background.js:4)
- Auto-enables sidebar on Google Docs pages (background.js:10)

## Customization

### Changing the Status Message

Edit `sidebar.html` line 23:
```html
<h2 class="status-message">Working</h2>
```

### Styling the Sidebar

Modify `sidebar.css` to customize:
- Colors (current gradient: #667eea to #764ba2)
- Layout and spacing
- Animations and transitions
- Font sizes and typography

The sidebar is designed to be full-height and uses flexible layout for optimal viewing.

### Adding New Features

The extension currently has minimal functionality. To extend it:

1. Add new UI elements to `sidebar.html`
2. Implement logic in `sidebar.js`
3. Style with `sidebar.css`
4. Update `manifest.json` if new permissions are needed
5. Add content scripts to interact with web pages
6. Use `background.js` to communicate between components

## Permissions

Current permissions in `manifest.json`:
- `storage` - Store user preferences and authentication state
- `activeTab` - Interact with the current browser tab
- `sidePanel` - Enable the side panel functionality
- `https://docs.google.com/*` - Access Google Docs pages (host permission)

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

### Sidebar doesn't open
- Make sure you're clicking the extension icon (not right-clicking)
- Check Chrome version supports Side Panel API (Chrome 114+)
- Right-click the extension icon and check if "Open side panel" appears
- Inspect the sidebar: Right-click inside sidebar → "Inspect"
- Check for JavaScript errors in the DevTools console
- Verify `sidebar.html`, `sidebar.js`, and `sidebar.css` paths are correct
- Check `background.js` is loaded: Go to `chrome://extensions/` → Details → Service worker

### Sidebar closes immediately
- Check for JavaScript errors in sidebar DevTools
- Verify `config.js` exists and is properly formatted
- Ensure Clerk credentials are valid

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
