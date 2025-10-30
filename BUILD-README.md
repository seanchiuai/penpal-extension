# Build Instructions

This extension now bundles Clerk locally to avoid Chrome extension CSP issues.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the extension:**
   ```bash
   npm run build
   ```

   This creates a `dist/` folder with the bundled extension.

## Development

- **Watch mode** (auto-rebuild on changes):
  ```bash
  npm run watch
  ```

## Loading the Extension in Chrome

1. Build the extension first: `npm run build`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. **Select the `dist/` folder** (NOT the root folder)

## What Changed

### Before
- Loaded Clerk SDK from CDN: `https://${window.CONFIG.CLERK_FRONTEND_API}/...`
- Required CSP exceptions (not allowed in Chrome extensions)
- Double `https://` bug in the URL

### After
- Clerk is bundled locally via esbuild
- No external script loading required
- No CSP conflicts
- Cleaner, more reliable setup

## Files

- `sidebar.js` - Source file with ES6 imports
- `dist/sidebar.js` - Bundled file (2.4MB, includes Clerk)
- `build.js` - Build script that bundles JS and copies static files
- `package.json` - Dependencies and build scripts

## Notes

- Always load the `dist/` folder in Chrome, not the root folder
- The `dist/` folder is gitignored (build fresh on each machine)
- `config.js` contains your API keys (also gitignored)
