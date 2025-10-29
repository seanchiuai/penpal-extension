# Detailed Setup Guide - Penpal with Clerk Authentication

This guide will walk you through setting up Clerk authentication for your Penpal application step by step.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Creating a Clerk Account](#creating-a-clerk-account)
3. [Setting Up Your Clerk Application](#setting-up-your-clerk-application)
4. [Configuring Your Code](#configuring-your-code)
5. [Testing Locally](#testing-locally)
6. [Deploying to Production](#deploying-to-production)
7. [Advanced Configuration](#advanced-configuration)

## Prerequisites

Before you begin, make sure you have:

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor (VS Code, Sublime Text, etc.)
- Basic understanding of HTML, CSS, and JavaScript
- (Optional) Node.js installed for local development server

## Creating a Clerk Account

### Step 1: Sign Up

1. Visit https://clerk.com/
2. Click "Sign Up" or "Get Started"
3. Choose your sign-up method:
   - Email and password
   - GitHub
   - Google
4. Complete the sign-up process

### Step 2: Verify Your Email

1. Check your email for a verification link
2. Click the link to verify your account
3. You'll be redirected to the Clerk dashboard

## Setting Up Your Clerk Application

### Step 1: Create a New Application

1. In the Clerk dashboard, click "Add application"
2. Give your application a name (e.g., "Penpal")
3. Select your preferred sign-in methods:
   - **Email**: Enable email/password authentication
   - **Social**: Add Google, GitHub, etc. (optional)
   - **Phone**: Enable phone number authentication (optional)
4. Click "Create application"

### Step 2: Get Your API Keys

1. After creating the application, you'll see the "API Keys" section
2. You'll need two pieces of information:

   **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   ```
   Example: pk_test_Y2xlcmsuaW5jbHVkZWQua2l0dGVuLTI4LmxjbC5kZXYk
   ```

   **Frontend API**
   ```
   Example: jolly-penguin-28.clerk.accounts.dev
   ```

3. Copy both of these - you'll need them in the next step

### Step 3: Configure Authentication Options

1. In the left sidebar, click "User & Authentication"
2. Click "Email, Phone, Username"
3. Configure what you want to collect:
   - ✅ Email address (required)
   - Name (optional but recommended)
   - Username (optional)
4. Click "Save"

### Step 4: Configure Social Providers (Optional)

To add Google or GitHub sign-in:

1. Click "Social Connections" in the left sidebar
2. Toggle on the providers you want (e.g., Google, GitHub)
3. For each provider, you'll need to:
   - Create an OAuth application in their developer console
   - Copy the Client ID and Client Secret
   - Paste them into Clerk
4. Click "Save"

**Google OAuth Setup**:
- Go to https://console.cloud.google.com/
- Create a new project or select existing
- Enable Google+ API
- Create OAuth 2.0 credentials
- Add authorized redirect URIs from Clerk

**GitHub OAuth Setup**:
- Go to https://github.com/settings/developers
- Click "New OAuth App"
- Fill in the details with URLs from Clerk
- Copy Client ID and Client Secret

## Configuring Your Code

### Step 1: Update index.html

Open `index.html` in your text editor and find this section (around line 48):

```html
<script
    async
    crossorigin="anonymous"
    data-clerk-publishable-key="YOUR_CLERK_PUBLISHABLE_KEY"
    src="https://[your-clerk-frontend-api].clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js"
    type="text/javascript"
></script>
```

Replace:
1. `YOUR_CLERK_PUBLISHABLE_KEY` with your actual publishable key
2. `[your-clerk-frontend-api]` with your Frontend API

**Example**:
```html
<script
    async
    crossorigin="anonymous"
    data-clerk-publishable-key="pk_test_Y2xlcmsuaW5jbHVkZWQua2l0dGVuLTI4LmxjbC5kZXYk"
    src="https://jolly-penguin-28.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js"
    type="text/javascript"
></script>
```

### Step 2: Verify Other Files

Make sure these files exist in your project directory:
- `index.html` - Main HTML file
- `styles.css` - CSS styling
- `app.js` - JavaScript logic

## Testing Locally

### Option 1: Simple HTTP Server with Python

```bash
# Navigate to your project directory
cd /Users/seanchiu/Desktop/penpal

# Start the server (Python 3)
python3 -m http.server 8000

# Open your browser to:
http://localhost:8000
```

### Option 2: Node.js HTTP Server

```bash
# Install http-server globally (one time only)
npm install -g http-server

# Navigate to your project directory
cd /Users/seanchiu/Desktop/penpal

# Start the server
http-server -p 8000

# Open your browser to:
http://localhost:8000
```

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your browser will open automatically

### Step 3: Configure Clerk for Local Development

1. Go back to your Clerk dashboard
2. Click "Paths" in the left sidebar
3. Add your local URL to allowed origins:
   ```
   http://localhost:8000
   ```
4. Click "Save"

### Step 4: Test the Authentication Flow

1. Open your application in the browser
2. You should see the Clerk sign-in component
3. Try signing up with a new account
4. Check your email for verification
5. After verification, you should see the welcome screen
6. Try signing out and signing back in

## Deploying to Production

### Option 1: Deploy to Netlify

1. **Prepare your repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to https://netlify.com
   - Click "New site from Git"
   - Connect to GitHub
   - Select your repository
   - Click "Deploy site"

3. **Update Clerk settings**:
   - Copy your Netlify URL (e.g., `https://your-app.netlify.app`)
   - Add it to Clerk's allowed origins and redirect URLs

### Option 2: Deploy to Vercel

1. **Prepare your repository** (same as above)

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Update Clerk settings**:
   - Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
   - Add it to Clerk's allowed origins and redirect URLs

### Option 3: Deploy to GitHub Pages

1. **Prepare your repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings"
   - Scroll to "Pages"
   - Select "main" branch
   - Click "Save"

3. **Update Clerk settings**:
   - Your URL will be `https://<username>.github.io/<repository-name>`
   - Add it to Clerk's allowed origins and redirect URLs

### Important: Update Production URLs in Clerk

After deploying, you MUST update Clerk:

1. Go to Clerk Dashboard
2. Click "Paths" in the left sidebar
3. Add your production URL to:
   - **Allowed Origins**: Your production domain
   - **Allowed Redirect URLs**: Your production domain
4. Click "Save"

## Advanced Configuration

### Customizing Appearance

Edit the Clerk mounting options in `app.js`:

```javascript
clerk.mountSignIn(clerkMountDiv, {
    appearance: {
        baseTheme: undefined,
        variables: {
            colorPrimary: '#667eea',
            colorBackground: '#ffffff',
            colorText: '#1a1a1a'
        },
        elements: {
            rootBox: 'custom-clerk-root',
            card: 'custom-clerk-card',
            formButtonPrimary: 'custom-submit-button'
        }
    },
    routing: 'path',
    redirectUrl: window.location.origin
});
```

### Adding User Metadata

To store additional user information:

```javascript
// After authentication, update user metadata
async function updateUserMetadata(clerk, data) {
    await clerk.user.update({
        unsafeMetadata: {
            preferences: data.preferences,
            theme: data.theme
        }
    });
}
```

### Implementing Session Management

```javascript
// Check session status
async function checkSession(clerk) {
    const session = await clerk.session;
    if (session) {
        console.log('User is signed in');
        console.log('Session expires at:', session.expireAt);
    } else {
        console.log('No active session');
    }
}

// Manually refresh session
async function refreshSession(clerk) {
    await clerk.session.touch();
}
```

### Adding Multi-Factor Authentication

1. In Clerk Dashboard, go to "User & Authentication"
2. Click "Multi-factor"
3. Enable TOTP (Time-based One-Time Password)
4. Users can enable MFA in their user profile

### Using Clerk Organizations (Teams)

```javascript
// Enable organizations in Clerk dashboard first
// Then use in your app:

async function listUserOrganizations(clerk) {
    const organizations = await clerk.user.organizationMemberships;
    return organizations;
}

async function switchOrganization(clerk, orgId) {
    await clerk.setActive({ organization: orgId });
}
```

## Troubleshooting

### Common Issues and Solutions

#### Issue: Clerk SDK not loading

**Symptoms**: Infinite "Loading authentication..." message

**Solutions**:
1. Check browser console for errors
2. Verify publishable key is correct
3. Ensure Frontend API URL matches your Clerk app
4. Try using a different browser
5. Clear browser cache and cookies

#### Issue: CORS errors

**Symptoms**: Cross-origin request errors in console

**Solutions**:
1. Don't use `file://` protocol - use a web server
2. Add your URL to Clerk's allowed origins
3. Make sure you're using HTTPS in production
4. Check that URLs in Clerk match exactly (including protocol)

#### Issue: Redirect loop

**Symptoms**: Page keeps redirecting after sign-in

**Solutions**:
1. Verify redirect URL in Clerk matches your app URL
2. Check that you're not calling `clerk.signOut()` unintentionally
3. Clear browser localStorage: `localStorage.clear()`
4. Remove any conflicting redirect logic

#### Issue: Social sign-in not working

**Symptoms**: Error when clicking Google/GitHub button

**Solutions**:
1. Verify OAuth credentials in provider console
2. Check redirect URLs match Clerk's requirements
3. Ensure OAuth app is not in testing mode
4. Add your email to test users if in development

## Security Best Practices

1. **Never expose secret keys**: Only use publishable keys in frontend code
2. **Use HTTPS in production**: Required for secure authentication
3. **Enable MFA**: For sensitive applications
4. **Regular updates**: Keep Clerk SDK up to date
5. **Monitor sessions**: Set appropriate session timeouts
6. **Validate on backend**: Always verify tokens on your backend

## Next Steps

Now that authentication is set up, you can:

1. **Create protected pages**: Build routes that require authentication
2. **Add user profiles**: Show and edit user information
3. **Integrate backend**: Connect to your API with Clerk tokens
4. **Add AI features**: Implement document editing with Claude
5. **Store user data**: Use databases to persist user content

## Resources

- **Clerk Documentation**: https://clerk.com/docs
- **Clerk JavaScript SDK Reference**: https://clerk.com/docs/references/javascript/overview
- **Clerk Dashboard**: https://dashboard.clerk.com/
- **Clerk Discord Community**: https://clerk.com/discord
- **Clerk Support**: https://clerk.com/support

## Getting Help

If you're stuck:

1. Check browser console for errors
2. Review Clerk dashboard settings
3. Search Clerk documentation
4. Ask in Clerk Discord community
5. Contact Clerk support

---

Good luck with your Penpal application! 🚀
