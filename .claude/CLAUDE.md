# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Penpal is an AI-powered document editor project that consists of:
1. A simple authentication demo page using Clerk
2. Documentation and guides for building a Google Docs AI editor Chrome extension (TypeOS recreation)

**Current State**: The project contains a working authentication demo and comprehensive documentation, but the Chrome extension itself is not present in this repository (it's referenced in documentation as being in a `docs-ai-editor-extension/` folder that doesn't exist here).

## Project Structure

```
/
├── index.html              # Authentication demo page
├── app.js                  # Clerk authentication logic
├── styles.css              # Styling for auth page
├── QUICK-START.md          # 5-minute quick start guide for the Chrome extension
├── PROJECT-SUMMARY.md      # Technical breakdown of TypeOS recreation
└── google-docs-ai-editor-implementation.md  # Detailed implementation guide
```

## Core Technologies

- **Frontend**: Vanilla HTML/CSS/JavaScript (no build system)
- **Authentication**: Clerk JavaScript SDK
- **Intended Extension Stack** (per documentation):
  - Chrome Extension API (Manifest V3)
  - Anthropic Claude API for AI processing
  - Google Docs API for document manipulation
  - diff-match-patch library for computing text changes

## Key Architecture Concepts

### Authentication Flow (Current Implementation)
The `app.js` file implements a Clerk-based authentication flow:
1. Waits for Clerk SDK to load on page
2. Checks if user is already authenticated
3. Mounts Clerk sign-in component into `#clerk-mounted` div
4. Toggles between auth section and app section based on user state
5. Handles sign-out via button click

**Important**: The Clerk publishable key in `index.html:53` is a placeholder and needs to be replaced with an actual key.

### Chrome Extension Architecture (Per Documentation)

The documentation describes a three-part Chrome extension architecture:

1. **Content Script** (`content.js`):
   - Extracts text from Google Docs DOM (`.kix-lineview` elements)
   - Orchestrates AI processing flow
   - Applies suggestions to the document

2. **Sidebar UI** (`sidebar/`):
   - User interface for entering instructions
   - Displays diff results and suggestions
   - "Keep All" / "Undo All" action buttons

3. **Background Worker** (`background.js`):
   - Manages extension lifecycle
   - Handles message passing between components

### AI Processing Pipeline (Per Documentation)

```
User Input → Extract Document Text → Claude API Processing →
Diff Computation (diff-match-patch) → Create Google Docs Suggestions →
Display in Sidebar
```

The diff algorithm uses Google's diff-match-patch library to compute:
- Deletions (operation: -1, shown in red)
- Insertions (operation: 1, shown in blue)
- Unchanged text (operation: 0, no highlighting)

## Development Notes

### Working with the Authentication Demo

**To run the demo**:
1. Replace the placeholder Clerk publishable key in `index.html:53`
2. Update the Clerk frontend API URL in `index.html:54`
3. Open `index.html` directly in a browser (no build step required)

**Key files**:
- `app.js:11-14`: Clerk initialization
- `app.js:47-66`: Clerk component mounting configuration
- `app.js:68-82`: User state display logic

### Google Docs Text Extraction Approach

Per the documentation (google-docs-ai-editor-implementation.md:108-120), Google Docs uses a complex canvas-based editor. Two approaches are described:

**Option A (Recommended)**: Use Google Docs API with OAuth
- Requires Google Cloud Project setup
- Proper OAuth 2.0 credentials
- Uses structured document format (preserves formatting)

**Option B**: Parse internal Kix model from DOM
- Fragile and undocumented
- Only extracts plain text
- No formatting preservation

### Diff Algorithm Implementation

The documentation describes using diff-match-patch (google-docs-ai-editor-implementation.md:128-168):
```javascript
const dmp = new DiffMatchPatch();
const diffs = dmp.diff_main(originalText, newText);
dmp.diff_cleanupSemantic(diffs); // Makes diffs human-readable
```

Each diff operation is converted to a suggestion object with:
- `type`: 'delete' or 'insert'
- `startIndex`: Character position
- `endIndex`: End position (for deletions)
- `text`: The text content

### Creating Individual Suggestions

The documentation emphasizes (PROJECT-SUMMARY.md:112-128) that TypeOS creates **individual suggestion objects**, not bulk changes. This allows users to accept/reject each change independently.

Implementation approach:
1. Sort suggestions in reverse order (to maintain indices)
2. Apply each suggestion separately via Google Docs API
3. Add small delays (100ms) between suggestions to ensure proper ordering

## Important Limitations

**Current Demo Limitations**:
- Clerk API keys are hardcoded placeholders
- No backend server (all client-side)
- No actual Chrome extension code in this repository

**Chrome Extension Limitations** (per QUICK-START.md:110-126):
- Text extraction works but doesn't preserve formatting
- Suggestions are computed but not yet applied to Google Docs
- Requires Google Cloud Project setup for production
- No support for tables, images, or complex layouts
- Document size limited to ~10k words

## Google Docs API Integration

To make suggestions actually appear in Google Docs (the missing piece), implement:

1. **OAuth 2.0 Setup** (manifest.json):
```json
{
  "oauth2": {
    "client_id": "YOUR_CLIENT_ID.apps.googleusercontent.com",
    "scopes": [
      "https://www.googleapis.com/auth/documents",
      "https://www.googleapis.com/auth/drive.file"
    ]
  }
}
```

2. **Batch Update API Call** (google-docs-ai-editor-implementation.md:286-321):
```javascript
POST https://docs.googleapis.com/v1/documents/{docId}:batchUpdate
{
  "requests": [{ /* insert/delete operations */ }],
  "writeControl": { "requiredRevisionId": "current_revision" }
}
```

## Security Considerations

Per documentation (google-docs-ai-editor-implementation.md:436-439):
1. Store API keys using Chrome's storage API with encryption
2. Implement proper Google OAuth 2.0 for Docs API access
3. Validate all inputs before AI processing
4. Implement rate limiting for AI requests

**Current demo**: Stores nothing persistently; Clerk handles auth tokens.

## Testing Strategy

The documentation recommends (google-docs-ai-editor-implementation.md:442-451):
- Unit tests for diff algorithm with edge cases
- Integration tests for Google Docs API interactions
- E2E tests with Puppeteer for full flow
- Test large documents, complex formatting, concurrent edits, network failures

## Common Development Scenarios

**Adding new Clerk configuration**:
Edit `app.js:52-64` to modify appearance and behavior of auth components.

**Debugging auth flow**:
Check browser console for Clerk errors. The error handler is at `app.js:41-44`.

**Implementing the Chrome extension**:
Follow the comprehensive guide in `google-docs-ai-editor-implementation.md` which provides complete code examples for all components.

## Alternative Approaches

The documentation (PROJECT-SUMMARY.md:368-381) suggests alternatives to Chrome extensions:
1. **Google Workspace Add-on**: Better integration, requires Marketplace approval
2. **Standalone Web App**: No Chrome dependency, manual copy/paste workflow
3. **Electron Desktop App**: More control, platform-specific builds required

## References to External Documentation

- Chrome Extension Manifest V3 API
- Google Docs API: https://developers.google.com/docs/api
- Anthropic Claude API: https://docs.anthropic.com/
- diff-match-patch: https://github.com/google/diff-match-patch
- Clerk Auth: https://clerk.com/docs
