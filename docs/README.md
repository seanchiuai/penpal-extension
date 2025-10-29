# Penpal - AI Document Editor

A simple web application with Clerk authentication for AI-powered document editing.

## Features

- Simple, clean authentication interface using Clerk
- User sign-in/sign-up flow
- Protected content after authentication
- Modern, responsive design
- Easy to set up and deploy

## Quick Start

### Prerequisites

1. A Clerk account (sign up at https://clerk.com/)
2. A web browser
3. A simple web server (or just open the HTML file)

### Setup Instructions

#### Step 1: Create a Clerk Application

1. Go to https://dashboard.clerk.com/
2. Click "Add application" or select an existing one
3. Note your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
4. Note your **Frontend API** URL (looks like `your-app-name.clerk.accounts.dev`)

#### Step 2: Configure the Application

Open `index.html` and replace the following placeholders:

```html
<!-- Find this line around line 48 -->
<script
    async
    crossorigin="anonymous"
    data-clerk-publishable-key="YOUR_CLERK_PUBLISHABLE_KEY"
    src="https://[your-clerk-frontend-api].clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js"
    type="text/javascript"
></script>
```

Replace:
- `YOUR_CLERK_PUBLISHABLE_KEY` with your actual Clerk publishable key
- `[your-clerk-frontend-api]` with your Clerk Frontend API (e.g., `jolly-penguin-12.clerk.accounts.dev`)

#### Step 3: Run the Application

**Option A: Simple File Open (for testing)**
```bash
# Just open the file in your browser
open index.html
```

**Option B: Using Python's HTTP Server**
```bash
# Python 3
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

**Option C: Using Node.js http-server**
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000

# Then open http://localhost:8000 in your browser
```

**Option D: Using VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Step 4: Test Authentication

1. Open the application in your browser
2. You'll see the Clerk sign-in component
3. Sign up with email or social providers (Google, GitHub, etc.)
4. After authentication, you'll see the welcome screen
5. Click "Sign Out" to return to the login screen

## Project Structure

```
penpal/
├── index.html              # Main HTML file with Clerk integration
├── styles.css              # CSS styling for the UI
├── app.js                  # JavaScript for Clerk authentication flow
├── README.md               # This file
├── SETUP.md                # Detailed setup guide
├── PROJECT-SUMMARY.md      # Original Chrome extension documentation
├── QUICK-START.md          # Original quick start guide
└── google-docs-ai-editor-implementation.md  # Technical implementation guide
```

## Configuration

### Clerk Dashboard Settings

1. **Allowed Redirect URLs**: Add your application URL
   - For local development: `http://localhost:8000`
   - For production: `https://yourdomain.com`

2. **Authentication Options**: Configure in Clerk Dashboard
   - Email/Password
   - Social Providers (Google, GitHub, etc.)
   - Phone number
   - Multi-factor authentication

3. **User Profile**: Customize what information to collect
   - Name
   - Email
   - Profile picture
   - Custom fields

## Customization

### Styling

Edit `styles.css` to customize:
- Color scheme (currently purple gradient)
- Typography
- Card layout
- Button styles
- Responsive breakpoints

### Authentication Options

Edit the Clerk mount options in `app.js`:

```javascript
clerk.mountSignIn(clerkMountDiv, {
    appearance: {
        elements: {
            rootBox: 'clerk-root-box',
            card: 'clerk-card'
        },
        layout: {
            socialButtonsPlacement: 'bottom',  // or 'top'
            socialButtonsVariant: 'iconButton' // or 'blockButton'
        }
    },
    redirectUrl: window.location.origin
});
```

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your repository
5. Deploy!

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Deploy!

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select branch and folder
4. Save and visit your site

**Important**: Update your Clerk redirect URLs after deployment!

## Troubleshooting

### Clerk not loading

**Problem**: You see "Loading authentication..." forever

**Solutions**:
- Check that your Clerk publishable key is correct
- Verify the Frontend API URL is correct
- Check browser console for errors
- Ensure you're using HTTPS in production

### CORS Errors

**Problem**: Cross-origin request errors in console

**Solutions**:
- Use a proper web server (not `file://` protocol)
- Add your domain to Clerk's allowed origins
- Check that URLs in Clerk dashboard match your app URL

### Sign-in component not appearing

**Problem**: Blank authentication section

**Solutions**:
- Verify Clerk SDK loaded successfully
- Check browser console for JavaScript errors
- Ensure `clerk-mounted` div exists in HTML
- Try clearing browser cache

### After sign-in, nothing happens

**Problem**: User signs in but page doesn't update

**Solutions**:
- Check redirect URL configuration in Clerk
- Verify `showAppSection()` function is being called
- Look for JavaScript errors in console
- Ensure event listeners are properly set up

## Security Notes

- Never commit your Clerk secret key (only use publishable key in frontend)
- Always use HTTPS in production
- Keep Clerk SDK up to date
- Review Clerk security settings regularly
- Enable multi-factor authentication for sensitive applications

## Next Steps

Now that you have authentication working, you can:

1. **Add Protected Routes**: Create different pages for authenticated users
2. **Integrate AI Features**: Connect to Claude API for document editing
3. **Add User Profiles**: Show and edit user information
4. **Implement Teams**: Use Clerk organizations for team features
5. **Add Database**: Store user documents and settings
6. **Build the Editor**: Create the actual document editing interface

## Resources

- **Clerk Documentation**: https://clerk.com/docs
- **Clerk Dashboard**: https://dashboard.clerk.com/
- **Clerk JavaScript SDK**: https://clerk.com/docs/references/javascript/overview
- **Clerk Component Customization**: https://clerk.com/docs/components/customization/overview

## Support

- For Clerk-specific issues: https://clerk.com/support
- For application issues: Check the browser console for errors

## License

MIT License - Feel free to use this as a starting point for your projects!

---

**Built with Clerk Authentication** - The complete authentication solution for modern web applications.
