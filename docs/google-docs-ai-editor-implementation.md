# Google Docs AI Editor - TypeOS Recreation Guide

## System Architecture

```
User Input (Sidebar) → Chrome Extension → AI Processing → Diff Algorithm → Google Docs Suggestions API
```

## Core Components

### 1. Chrome Extension Structure

```
extension/
├── manifest.json
├── background.js (service worker)
├── content.js (injected into Google Docs)
├── sidebar/
│   ├── sidebar.html
│   ├── sidebar.js
│   └── sidebar.css
├── scripts/
│   ├── diff-algorithm.js
│   ├── docs-api-handler.js
│   └── ai-client.js
└── assets/
```

### 2. Key Technologies

- **Chrome Extension APIs**: For sidebar and document manipulation
- **Google Docs API**: For reading/writing document content
- **Diff Algorithm**: Myers diff, Google's diff-match-patch, or similar
- **AI Integration**: Anthropic Claude API (via your MCP)
- **Google Apps Script** (optional): For deeper Docs integration

## Implementation Steps

### Step 1: Chrome Extension Setup

**manifest.json**
```json
{
  "manifest_version": 3,
  "name": "AI Docs Editor",
  "version": "1.0",
  "permissions": [
    "activeTab",
    "storage",
    "sidePanel"
  ],
  "host_permissions": [
    "https://docs.google.com/*"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://docs.google.com/document/*"],
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ],
  "side_panel": {
    "default_path": "sidebar/sidebar.html"
  },
  "action": {
    "default_title": "AI Docs Editor"
  }
}
```

### Step 2: Extract Document Content

Google Docs doesn't expose a simple DOM API. You need to either:

**Option A: Use Google Docs API (Recommended)**
```javascript
// docs-api-handler.js
async function getDocumentContent(docId) {
  const token = await getAuthToken();
  const response = await fetch(
    `https://docs.googleapis.com/v1/documents/${docId}`,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
  return await response.json();
}

function extractPlainText(document) {
  let text = '';
  for (const element of document.body.content) {
    if (element.paragraph) {
      for (const elem of element.paragraph.elements) {
        if (elem.textRun) {
          text += elem.textRun.content;
        }
      }
    }
  }
  return text;
}
```

**Option B: Parse Google Docs Internal Structure**
```javascript
// content.js
function extractDocumentText() {
  // Google Docs uses a canvas-based editor with hidden text
  // You need to access the internal Kix model
  const kixApp = document.querySelector('.kix-appview-editor');
  
  // This is complex and fragile, but possible
  // Better to use Option A with proper API access
  
  return extractedText;
}
```

### Step 3: Implement Diff Algorithm

Using the popular **diff-match-patch** library:

```javascript
// diff-algorithm.js
import DiffMatchPatch from 'diff-match-patch';

function computeChanges(originalText, newText) {
  const dmp = new DiffMatchPatch();
  const diffs = dmp.diff_main(originalText, newText);
  dmp.diff_cleanupSemantic(diffs); // Makes diffs more human-readable
  
  return convertDiffsToSuggestions(diffs);
}

function convertDiffsToSuggestions(diffs) {
  const suggestions = [];
  let position = 0;
  
  for (const [operation, text] of diffs) {
    if (operation === -1) {
      // Deletion
      suggestions.push({
        type: 'delete',
        startIndex: position,
        endIndex: position + text.length,
        text: text
      });
      position += text.length;
    } else if (operation === 1) {
      // Insertion
      suggestions.push({
        type: 'insert',
        startIndex: position,
        text: text
      });
      // Don't increment position for insertions
    } else {
      // No change
      position += text.length;
    }
  }
  
  return suggestions;
}
```

### Step 4: AI Integration

```javascript
// ai-client.js
async function processWithAI(originalText, userInstructions) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'your-api-key', // Store securely
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Here is the current document text:

${originalText}

User instructions: ${userInstructions}

Please rewrite the document according to the instructions. Return ONLY the updated document text, with no explanations or markdown formatting.`
      }]
    })
  });
  
  const data = await response.json();
  return data.content[0].text;
}
```

### Step 5: Create Google Docs Suggestions

**Using Google Docs API:**
```javascript
// docs-api-handler.js
async function applySuggestions(docId, suggestions) {
  const token = await getAuthToken();
  const requests = [];
  
  for (const suggestion of suggestions) {
    if (suggestion.type === 'delete') {
      requests.push({
        deleteContentRange: {
          range: {
            startIndex: suggestion.startIndex,
            endIndex: suggestion.endIndex
          }
        }
      });
    } else if (suggestion.type === 'insert') {
      requests.push({
        insertText: {
          location: {
            index: suggestion.startIndex
          },
          text: suggestion.text
        }
      });
    }
  }
  
  // Apply as suggestions (not direct edits)
  await fetch(
    `https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: requests,
        writeControl: {
          // This makes them suggestions, not direct edits
          requiredRevisionId: await getCurrentRevisionId(docId)
        }
      })
    }
  );
}
```

**Using Chrome Extension Direct Manipulation:**
```javascript
// content.js
function applySuggestionsDirectly(suggestions) {
  // This is tricky - you need to simulate the Google Docs suggestion UI
  // TypeOS likely uses a combination of:
  // 1. Creating a new suggestion mode
  // 2. Applying each change individually
  // 3. Using Google's internal APIs
  
  // Access the Google Docs internal editor
  const editorFrame = document.querySelector('.docs-editor');
  
  for (const suggestion of suggestions) {
    // Trigger suggestion mode
    // This requires reverse-engineering Google Docs' internal APIs
    createSuggestion(suggestion);
  }
}
```

### Step 6: Sidebar UI

```html
<!-- sidebar/sidebar.html -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="sidebar.css">
</head>
<body>
  <div class="sidebar-container">
    <h2>AI Document Editor</h2>
    
    <div class="chat-history" id="chatHistory">
      <!-- Messages appear here -->
    </div>
    
    <div class="input-container">
      <textarea id="userInput" placeholder="Tell me what changes to make..."></textarea>
      <button id="submitBtn">Generate</button>
    </div>
    
    <div class="actions" id="actions" style="display: none;">
      <button id="undoAll">Undo All</button>
      <button id="keepAll">Keep All</button>
    </div>
  </div>
  
  <script src="sidebar.js"></script>
</body>
</html>
```

```javascript
// sidebar/sidebar.js
document.getElementById('submitBtn').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  
  // Show loading state
  addMessage('user', userInput);
  addMessage('assistant', 'Processing...', true);
  
  // Send message to content script
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, {
    type: 'PROCESS_CHANGES',
    instructions: userInput
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'CHANGES_APPLIED') {
    // Update UI to show success
    removeLoadingMessage();
    addMessage('assistant', 'Changes applied! Review suggestions in the document.');
    
    // Show action buttons
    document.getElementById('actions').style.display = 'flex';
  }
});
```

### Step 7: Main Content Script Orchestration

```javascript
// content.js
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'PROCESS_CHANGES') {
    try {
      // 1. Extract current document content
      const docId = extractDocIdFromUrl();
      const documentData = await getDocumentContent(docId);
      const originalText = extractPlainText(documentData);
      
      // 2. Process with AI
      const newText = await processWithAI(originalText, message.instructions);
      
      // 3. Compute differences
      const suggestions = computeChanges(originalText, newText);
      
      // 4. Apply as suggestions in Google Docs
      await applySuggestions(docId, suggestions);
      
      // 5. Notify sidebar
      chrome.runtime.sendMessage({
        type: 'CHANGES_APPLIED',
        suggestionCount: suggestions.length
      });
      
    } catch (error) {
      console.error('Error processing changes:', error);
      chrome.runtime.sendMessage({
        type: 'ERROR',
        message: error.message
      });
    }
  }
});

function extractDocIdFromUrl() {
  const match = window.location.href.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}
```

## Advanced Features

### Individual Suggestion Tracking

To create individual suggestions (not one bulk change):

```javascript
function createIndividualSuggestions(suggestions) {
  // Sort suggestions by position (reverse order to maintain indices)
  suggestions.sort((a, b) => b.startIndex - a.startIndex);
  
  for (const suggestion of suggestions) {
    // Create each suggestion separately
    // This allows Google Docs to track them individually
    createSingleSuggestion(suggestion);
    
    // Small delay to ensure proper ordering
    await sleep(100);
  }
}
```

### Handling Complex Formatting

```javascript
function preserveFormatting(originalDoc, suggestions) {
  // Extract formatting from original document
  const formatting = extractFormattingInfo(originalDoc);
  
  // Apply formatting to suggestions
  return suggestions.map(suggestion => ({
    ...suggestion,
    textStyle: getFormattingAtPosition(formatting, suggestion.startIndex)
  }));
}
```

### Undo All / Keep All Implementation

```javascript
// Handle bulk actions
document.getElementById('undoAll').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'REJECT_ALL_SUGGESTIONS' });
});

document.getElementById('keepAll').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'ACCEPT_ALL_SUGGESTIONS' });
});
```

## Security Considerations

1. **API Key Storage**: Use Chrome's storage API with encryption
2. **OAuth 2.0**: Implement proper Google OAuth for Docs API access
3. **Content Security**: Validate all inputs before processing
4. **Rate Limiting**: Implement rate limiting for AI requests

## Testing Strategy

1. **Unit Tests**: Test diff algorithm with various text scenarios
2. **Integration Tests**: Test Google Docs API interactions
3. **E2E Tests**: Use Puppeteer to test the full flow
4. **Edge Cases**: 
   - Very large documents
   - Documents with complex formatting
   - Multiple simultaneous edits
   - Network failures

## Deployment

1. Package extension using Chrome Web Store guidelines
2. Set up backend service for AI API calls (to hide API keys)
3. Implement analytics and error tracking
4. Create user onboarding flow

## Challenges & Solutions

### Challenge 1: Google Docs Internal Structure
**Solution**: Use official Google Docs API instead of DOM manipulation

### Challenge 2: Maintaining Formatting
**Solution**: Work with structured document format, not plain text

### Challenge 3: Individual Suggestions
**Solution**: Apply suggestions one at a time with proper timing

### Challenge 4: Real-time Collaboration
**Solution**: Use revision IDs to handle conflicts

## Alternative Approach: Google Apps Script Add-on

For better integration, consider building as a Google Workspace Add-on:

```javascript
// Code.gs
function onOpen() {
  DocumentApp.getUi()
    .createMenu('AI Editor')
    .addItem('Open Sidebar', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('AI Editor');
  DocumentApp.getUi().showSidebar(html);
}

function processDocument(instructions) {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const originalText = body.getText();
  
  // Call AI service
  const newText = callAIService(originalText, instructions);
  
  // Compute and apply suggestions
  const suggestions = computeDiff(originalText, newText);
  applySuggestionsToDoc(body, suggestions);
}
```

## Performance Optimization

1. **Debounce user input**: Wait for user to finish typing
2. **Cache API responses**: Reduce redundant AI calls
3. **Lazy load suggestions**: Apply in batches for large documents
4. **Background processing**: Use web workers for diff computation

## Next Steps

1. Set up development environment
2. Implement basic Chrome extension structure
3. Integrate Google Docs API
4. Implement diff algorithm
5. Connect AI service
6. Build suggestion application logic
7. Create UI polish and animations
8. Test extensively
9. Deploy to Chrome Web Store

## Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Google Docs API](https://developers.google.com/docs/api)
- [diff-match-patch Library](https://github.com/google/diff-match-patch)
- [Anthropic Claude API](https://docs.anthropic.com/)
