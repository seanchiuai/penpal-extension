# API Key Security Guide

This guide explains how to safely store and manage API keys for the Penpal Chrome extension.

## Overview

**NEVER commit API keys to version control!** This repository uses a configuration file approach to keep your keys safe.

## Setup Process

### 1. Create Your Config File

```bash
# Copy the example config
cp config.example.js config.js
```

### 2. Add Your API Keys

Edit `config.js` and replace the placeholder values:

```javascript
window.CONFIG = {
    CLERK_PUBLISHABLE_KEY: 'pk_test_your_actual_key_here',
    CLERK_FRONTEND_API: 'your-actual-frontend-api.clerk.accounts.dev',
    ANTHROPIC_API_KEY: 'sk-ant-your_actual_key_here',
};
```

### 3. Verify .gitignore

Make sure `config.js` is listed in `.gitignore` (it already is by default):

```
# .gitignore
config.js
.env
```

## Storage Options Explained

### Option 1: config.js (Current Approach) ✅ RECOMMENDED

**How it works:**
- API keys stored in `config.js` (git-ignored)
- Loaded at runtime via `<script src="config.js">`
- Simple, no build process needed

**Pros:**
- Easy to set up
- No build tools required
- Works immediately for development

**Cons:**
- Keys are in plain text in the extension folder
- Anyone with file system access can read them
- Not suitable for production/distribution

**Best for:** Local development and personal use

### Option 2: Chrome Extension Storage API

**How it works:**
- Store keys in Chrome's encrypted storage
- User enters keys via options page
- Keys persist across browser sessions

**Pros:**
- Keys encrypted by Chrome
- User controls their own keys
- Safer than file-based storage

**Cons:**
- Requires additional UI for key entry
- Keys still accessible to extension code
- User must manually enter keys

**Best for:** Extensions distributed to others

**Implementation example:**

```javascript
// Save API key
chrome.storage.local.set({ apiKey: 'sk-ant-...' });

// Retrieve API key
chrome.storage.local.get(['apiKey'], (result) => {
    const apiKey = result.apiKey;
});
```

### Option 3: Environment Variables + Build Process

**How it works:**
- Keys in `.env` file (git-ignored)
- Build tool injects them at compile time
- Keys bundled into extension code

**Pros:**
- Professional workflow
- Keys not in repository
- Can have different keys per environment

**Cons:**
- Requires build tools (webpack, rollup, etc.)
- Keys still in final bundle (can be extracted)
- More complex setup

**Best for:** Team development, CI/CD pipelines

**Setup with webpack:**

```bash
npm install --save-dev webpack webpack-cli dotenv-webpack
```

```javascript
// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [new Dotenv()],
};
```

### Option 4: Backend Proxy Server

**How it works:**
- Extension calls your backend API
- Backend stores keys securely
- Backend makes actual API calls

**Pros:**
- Keys never in client code
- Full control over API usage
- Can implement rate limiting
- Most secure option

**Cons:**
- Requires backend infrastructure
- Additional complexity
- Hosting costs
- Network latency

**Best for:** Production extensions with many users

**Architecture:**

```
Extension → Your Backend API → Anthropic/Clerk APIs
           (keys stored here)
```

## Security Best Practices

### Development (Local Use)

1. ✅ Use `config.js` approach (current setup)
2. ✅ Never commit `config.js` or `.env` files
3. ✅ Keep keys in `.gitignore`
4. ✅ Use test/development keys when possible
5. ✅ Rotate keys regularly

### Distribution (Publishing Extension)

If you plan to publish this extension:

1. **Use Chrome Storage API**: Have users enter their own keys
2. **Create Options Page**: UI for users to manage their keys
3. **Add Backend**: Consider a backend proxy for sensitive operations
4. **Never bundle keys**: Don't include your keys in published extension
5. **Add encryption**: Encrypt keys before storing in Chrome storage

### Production Best Practices

1. **Use a backend proxy** for API calls
2. **Implement rate limiting** to prevent abuse
3. **Monitor API usage** for suspicious activity
4. **Use short-lived tokens** when possible
5. **Implement user authentication** before API access
6. **Add audit logging** for all API calls

## Current Implementation Details

### Where Keys Are Used

**popup.js** (line 13-14):
- Loads Clerk SDK with publishable key
- Constructs SDK URL from frontend API

```javascript
script.setAttribute('data-clerk-publishable-key', window.CONFIG.CLERK_PUBLISHABLE_KEY);
script.src = `https://${window.CONFIG.CLERK_FRONTEND_API}/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
```

### Loading Order

1. `popup.html` loads `config.js`
2. `popup.html` loads `popup.js`
3. `popup.js` reads `window.CONFIG`
4. `popup.js` dynamically loads Clerk SDK with keys

## Troubleshooting

### "Config file not loaded" Error

**Problem:** Extension shows error about missing config file

**Solution:**
```bash
# Make sure config.js exists
cp config.example.js config.js
# Then edit config.js with your keys
```

### Keys Not Working

**Checklist:**
- [ ] Copied `config.example.js` to `config.js`
- [ ] Replaced placeholder values with real keys
- [ ] Reloaded extension in Chrome (`chrome://extensions/`)
- [ ] Keys are valid and not expired
- [ ] Keys have correct permissions in provider dashboard

### "Failed to load Clerk SDK"

**Possible causes:**
1. Invalid Clerk publishable key format
2. Wrong frontend API URL
3. Network connectivity issues
4. Browser blocking third-party scripts

**Debug steps:**
1. Open DevTools (right-click extension → Inspect popup)
2. Check Console for errors
3. Verify config values: `console.log(window.CONFIG)`
4. Test Clerk dashboard to ensure keys are active

## Migration Guide

### Currently Using Hard-Coded Keys?

If you have keys directly in `popup.html`:

1. Create `config.js` from template
2. Move keys to `config.js`
3. Remove hard-coded keys from HTML
4. Test that extension still works

### Want to Use Chrome Storage Instead?

See `docs/CHROME-STORAGE-SETUP.md` for implementation guide (coming soon).

## Key Rotation

To rotate your API keys:

1. Generate new keys in provider dashboard
2. Update `config.js` with new keys
3. Reload extension
4. Revoke old keys in dashboard

## Questions?

- **Should I commit .env.example?** YES - it shows required keys
- **Should I commit config.example.js?** YES - it's a template
- **Should I commit config.js?** NO - contains real keys
- **Should I commit .env?** NO - contains real keys
- **Can I share config.js with my team?** Use a password manager or secure channel, never commit it

## Additional Resources

- [Clerk Security Best Practices](https://clerk.com/docs/security)
- [Chrome Extension Security](https://developer.chrome.com/docs/extensions/mv3/security/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
