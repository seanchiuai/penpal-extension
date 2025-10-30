# Icons

This extension requires icon files in PNG format at three sizes:
- `icon16.png` - 16x16 pixels
- `icon48.png` - 48x48 pixels
- `icon128.png` - 128x128 pixels

## Generating Icons

You have several options:

### Option 1: Convert the provided SVG
Use the provided `icon.svg` file and convert it using an online tool:
1. Go to https://cloudconvert.com/svg-to-png
2. Upload `icon.svg`
3. Convert to PNG at 128x128, 48x48, and 16x16 sizes
4. Save as `icon128.png`, `icon48.png`, and `icon16.png` in this directory

### Option 2: Use ImageMagick (if installed)
```bash
# Install ImageMagick first if needed
brew install imagemagick

# Convert SVG to different sizes
convert icon.svg -resize 16x16 icon16.png
convert icon.svg -resize 48x48 icon48.png
convert icon.svg -resize 128x128 icon128.png
```

### Option 3: Create your own icons
Create PNG files at the required sizes using any image editor (Photoshop, GIMP, Figma, etc.)

## Temporary Placeholder
Until you add proper icons, the extension will show Chrome's default extension icon.
