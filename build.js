const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');

// Files to bundle
const entryPoints = {
  'dist/sidebar': 'extension/sidebar.js',
  'dist/background': 'extension/background.js',
};

// Files to copy as-is
const filesToCopy = [
  'manifest.json',
  'sidebar.html',
  'sidebar.css',
  'config.js',
];

// Directories to copy
const dirsToCopy = ['icons'];

async function build() {
  try {
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }

    // Bundle JavaScript files
    const buildOptions = {
      entryPoints,
      bundle: true,
      outdir: '.',
      format: 'iife',
      platform: 'browser',
      target: 'chrome100',
      sourcemap: isWatch ? 'inline' : false,
      minify: !isWatch,
    };

    if (isWatch) {
      const ctx = await esbuild.context(buildOptions);
      await ctx.watch();
      console.log('Watching for changes...');
    } else {
      await esbuild.build(buildOptions);
    }

    // Copy static files from extension/
    filesToCopy.forEach(file => {
      const src = path.join('extension', file);
      const dest = path.join('dist', file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied: ${file}`);
      }
    });

    // Copy directories from extension/
    dirsToCopy.forEach(dir => {
      const src = path.join('extension', dir);
      const dest = path.join('dist', dir);
      if (fs.existsSync(src)) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        const files = fs.readdirSync(src);
        files.forEach(file => {
          fs.copyFileSync(
            path.join(src, file),
            path.join(dest, file)
          );
        });
        console.log(`Copied directory: ${dir}`);
      }
    });

    if (!isWatch) {
      console.log('Build complete!');
    }
  } catch (error) {
    console.error('Build error:', error);
    process.exit(1);
  }
}

build();
