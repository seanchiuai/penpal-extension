# Quick Start Guide - 5 Minutes to Working Extension

## Step 1: Get Your API Key (2 minutes)

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Click "API Keys" in the left sidebar
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-...`)

## Step 2: Load Extension in Chrome (1 minute)

1. Open Chrome
2. Go to `chrome://extensions/`
3. Toggle "Developer mode" ON (top right corner)
4. Click "Load unpacked" button
5. Navigate to and select the `docs-ai-editor-extension` folder
6. Extension should appear in your list with a puzzle piece icon

## Step 3: Configure API Key (1 minute)

1. Open any Google Docs document (or create a new one)
2. Click the extension icon in Chrome toolbar (puzzle piece icon)
   - If you don't see it, click the puzzle piece, then pin the extension
3. Sidebar opens on the right
4. Click the ⚙️ (settings) icon in the top right of sidebar
5. Paste your API key in the input field
6. Click "Save"

## Step 4: Test It Out (1 minute)

1. Type some text in your Google Doc:
   ```
   The quick brown fox jumped over the lazy dog. This is a test document 
   with some basic content that we will use to test the AI editing features.
   ```

2. In the sidebar, type an instruction:
   ```
   Make this more formal and professional
   ```

3. Click "Generate" ✨

4. Wait 5-10 seconds while:
   - ✅ Text is extracted from doc
   - ✅ AI processes your request
   - ✅ Differences are computed
   - ✅ Suggestions appear in sidebar

5. Review the suggestions shown in the sidebar

6. Click "Keep All" or "Undo All"

## Example Instructions to Try

### Style Changes
- "Make this more casual and friendly"
- "Rewrite in a professional tone"
- "Simplify the language for a 10-year-old"
- "Make it more persuasive"

### Grammar & Mechanics
- "Fix all grammar and spelling errors"
- "Improve the punctuation"
- "Fix run-on sentences"
- "Make verb tenses consistent"

### Content Changes
- "Add more details to each paragraph"
- "Make this more concise"
- "Remove redundant information"
- "Add examples to support the main points"

### Structure Changes
- "Break this into shorter paragraphs"
- "Add bullet points for the main ideas"
- "Reorganize for better flow"
- "Add section headers"

## Troubleshooting

### "Failed to load resources" Error
**Solution:** The extension is trying to fetch files that were blocked by network restrictions. This is expected - the core functionality still works.

### Sidebar Won't Open
**Solution:** 
- Make sure you're on a Google Docs page (not Google Drive)
- Try refreshing the page
- Click the extension icon again

### "Please set your API key" Message
**Solution:**
- Click the ⚙️ settings icon
- Enter your Anthropic API key
- Click Save

### No Text Extracted
**Solution:**
- Make sure there's actually text in your document
- Try typing some text first
- Refresh the Google Docs page

### API Error
**Solution:**
- Verify your API key is correct
- Check that your API key has credits
- Try a shorter instruction

## Current Limitations

⚠️ **Important:** This is a proof-of-concept. The extension:

✅ **DOES:**
- Extract text from Google Docs
- Process with Claude AI
- Compute differences
- Show suggestions in sidebar

❌ **DOES NOT (YET):**
- Create actual suggestions in Google Docs
- Preserve formatting (bold, italic, etc.)
- Work with very large documents (>10k words)
- Handle tables, images, or complex layouts

The suggestions are computed and displayed in the sidebar, but not automatically applied to the document. To see the changes, you'll need to manually copy the new text.

## What You're Seeing

When you use the extension, here's what happens:

1. **Original Text** → Extracted from your doc
2. **AI Processing** → Claude rewrites according to instructions
3. **Diff Computation** → Algorithm finds what changed
4. **Sidebar Display** → Shows you:
   - 🗑️ Red suggestions = Text to delete
   - ➕ Blue suggestions = Text to add
   - Summary of total changes

## Making It Production-Ready

To get suggestions actually appearing in the Google Doc (like TypeOS does), you'd need to:

1. Set up Google Cloud Project
2. Enable Google Docs API
3. Add OAuth 2.0 credentials
4. Implement API integration
5. Use API to create suggestions

This requires additional setup beyond the scope of this demo.

## Next Steps

### For Learning
- Read `PROJECT-SUMMARY.md` for technical details
- Check `google-docs-ai-editor-implementation.md` for full guide
- Explore the code files to understand how it works

### For Development
- Set up Google Cloud Project
- Implement OAuth flow
- Add Google Docs API integration
- Test with various document types

### For Use
- Try different instructions
- Test on different documents
- Explore what Claude can do with your content

## Tips for Best Results

1. **Be Specific**: 
   - ❌ "Make this better"
   - ✅ "Make this more professional and add specific examples"

2. **One Change at a Time**:
   - ❌ "Fix grammar, add details, change tone, and restructure"
   - ✅ "Fix all grammar and spelling errors"

3. **Give Context**:
   - ❌ "Change the tone"
   - ✅ "Make this sound like a formal business proposal"

4. **Iterate**:
   - Make one change
   - Review results
   - Make another change

## Security Notes

- Your API key is stored locally in your browser
- It's never sent anywhere except directly to Anthropic
- All processing happens in your browser
- No third-party servers involved

## Support

- Check the README in the extension folder
- Review troubleshooting section above
- Inspect browser console for errors (F12)
- Check Anthropic API status if having issues

## Have Fun!

You now have AI-powered document editing in Google Docs! 

Try asking Claude to:
- Rewrite your email in different tones
- Clean up meeting notes
- Improve essay drafts
- Simplify complex documents
- Add creativity to boring content

The possibilities are endless! 🚀
