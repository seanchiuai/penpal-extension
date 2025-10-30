// Background service worker for Penpal extension
// Handles sidebar opening when extension icon is clicked

chrome.action.onClicked.addListener((tab) => {
    // Open the side panel when the extension icon is clicked
    chrome.sidePanel.open({ windowId: tab.windowId });
});

// Optional: Enable side panel on specific URLs (e.g., Google Docs)
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (!tab.url) return;

    const url = new URL(tab.url);

    // Enable side panel for Google Docs
    if (url.hostname === 'docs.google.com') {
        chrome.sidePanel.setOptions({
            tabId,
            path: 'sidebar.html',
            enabled: true
        });
    }
});

// Listen for installation or update
chrome.runtime.onInstalled.addListener(() => {
    console.log('Penpal extension installed/updated');
});
