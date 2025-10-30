// Configuration file for API keys and settings
//
// SETUP INSTRUCTIONS:
// 1. Copy this file to 'config.js' (already in .gitignore)
// 2. Replace the placeholder values with your actual API keys
// 3. Never commit config.js to version control
//
// Usage in your code:
// <script src="config.js"></script>
// Then access via: window.CONFIG.CLERK_PUBLISHABLE_KEY

window.CONFIG = {
    // Clerk Authentication
    CLERK_PUBLISHABLE_KEY: 'pk_test_your_key_here',
    CLERK_FRONTEND_API: 'your-frontend-api.clerk.accounts.dev',

    // Anthropic Claude API (for AI features)
    ANTHROPIC_API_KEY: 'sk-ant-your_key_here',

    // Optional: Other settings
    DEBUG_MODE: false,
    API_TIMEOUT: 30000, // 30 seconds
};

// Validate that keys are set
if (window.CONFIG.CLERK_PUBLISHABLE_KEY === 'pk_test_your_key_here') {
    console.warn('⚠️ Please set your Clerk API keys in config.js');
}
