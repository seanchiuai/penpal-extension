// Import Clerk from bundled local file
import { Clerk } from '@clerk/clerk-js';

// Wait for Clerk to load
window.addEventListener('load', async () => {
    try {
        // Check if config is loaded
        if (typeof window.CONFIG === 'undefined') {
            throw new Error('Config file not loaded. Please create config.js');
        }

        // Initialize Clerk with publishable key
        const clerk = new Clerk(window.CONFIG.CLERK_PUBLISHABLE_KEY);

        // Wait for Clerk to be ready
        await clerk.load();

        // Check if user is already signed in
        if (clerk.user) {
            showAppSection(clerk.user);
        } else {
            showAuthSection();
        }

        // Mount Clerk components
        mountClerkComponents(clerk);

        // Listen for sign-in events
        clerk.addListener(({ user }) => {
            if (user) {
                showAppSection(user);
            } else {
                showAuthSection();
            }
        });

        // Set up sign-out button
        document.getElementById('sign-out-btn').addEventListener('click', async () => {
            await clerk.signOut();
            showAuthSection();
        });

    } catch (error) {
        console.error('Error initializing Clerk:', error);
        showError('Failed to initialize authentication. Please refresh the popup.');
    }
});

function mountClerkComponents(clerk) {
    // Mount the sign-in component
    const clerkMountDiv = document.getElementById('clerk-mounted');

    if (clerkMountDiv) {
        clerk.mountSignIn(clerkMountDiv, {
            appearance: {
                elements: {
                    rootBox: 'clerk-root-box',
                    card: 'clerk-card'
                },
                layout: {
                    socialButtonsPlacement: 'bottom',
                    socialButtonsVariant: 'iconButton'
                }
            },
            redirectUrl: chrome.runtime.getURL('sidebar.html')
        });
    }
}

function showAppSection(user) {
    // Hide auth section
    document.getElementById('auth-section').style.display = 'none';

    // Show app section
    const appSection = document.getElementById('app-section');
    appSection.style.display = 'block';

    // Display user information
    const userName = user.firstName || user.username || 'User';
    const userEmail = user.primaryEmailAddress?.emailAddress || '';

    document.getElementById('user-name').textContent = userName;
    document.getElementById('user-email').textContent = userEmail;
}

function showAuthSection() {
    // Show auth section
    document.getElementById('auth-section').style.display = 'block';

    // Hide app section
    document.getElementById('app-section').style.display = 'none';
}

function showError(message) {
    const clerkMountDiv = document.getElementById('clerk-mounted');
    if (clerkMountDiv) {
        clerkMountDiv.innerHTML = `
            <div style="text-align: center; color: #d32f2f; padding: 20px;">
                <p style="font-size: 12px;">${message}</p>
            </div>
        `;
    }
}

// Optional: Add loading state
document.addEventListener('DOMContentLoaded', () => {
    const clerkMountDiv = document.getElementById('clerk-mounted');
    if (clerkMountDiv) {
        clerkMountDiv.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div class="loading"></div>
                <p style="margin-top: 12px; color: #666; font-size: 12px;">Loading...</p>
            </div>
        `;
    }
});
