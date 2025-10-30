const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');

// Files to bundle
const entryPoints = {
  'dist/sidebar': 'sidebar.js',
  'dist/background': 'background.js',
};

// Files to copy as-is
const filesToCopy = [
  'manifest.json',
  'sidebar.html',
  'sidebar.css',
  'config.js',
  'index.html',
  'app.js',
  'styles.css',
];

// Directories to copy
const dirsToCopy = [
  'icons',
];

async function build() {
  try {
    // Create dist directory
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }

    // Bundle JavaScript files with esbuild
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

    // Copy static files
    filesToCopy.forEach(file => {
      if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join('dist', file));
        console.log(`Copied: ${file}`);
      }
    });

    // Copy directories
    dirsToCopy.forEach(dir => {
      if (fs.existsSync(dir)) {
        const destDir = path.join('dist', dir);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        const files = fs.readdirSync(dir);
        files.forEach(file => {
          fs.copyFileSync(
            path.join(dir, file),
            path.join(destDir, file)
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
