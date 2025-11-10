/**
 * Build Script: Create Single-File HTML from Modular Site
 * 
 * This script combines site/index.html, site/style.css, site/app.js, 
 * site/roadmap.json, and validator.js into a single dist/index.html file
 * that can be deployed directly to GitHub Pages.
 */

const fs = require('fs');
const path = require('path');

console.log('🔨 Building single-file distribution...\n');

// Read all source files
const indexHtml = fs.readFileSync('site/index.html', 'utf8');
const css = fs.readFileSync('site/style.css', 'utf8');
const appJs = fs.readFileSync('site/app.js', 'utf8');
const roadmapJson = fs.readFileSync('site/roadmap.json', 'utf8');
const validatorJs = fs.readFileSync('validator.js', 'utf8');

// Parse and minify JSON (remove extra whitespace)
const roadmapData = JSON.parse(roadmapJson);
const minifiedRoadmap = JSON.stringify(roadmapData);

console.log('✅ Loaded source files:');
console.log(`   - index.html: ${(indexHtml.length / 1024).toFixed(1)} KB`);
console.log(`   - style.css: ${(css.length / 1024).toFixed(1)} KB`);
console.log(`   - app.js: ${(appJs.length / 1024).toFixed(1)} KB`);
console.log(`   - roadmap.json: ${(roadmapJson.length / 1024).toFixed(1)} KB (minified to ${(minifiedRoadmap.length / 1024).toFixed(1)} KB)`);
console.log(`   - validator.js: ${(validatorJs.length / 1024).toFixed(1)} KB\n`);

// Replace external CSS link with inline style
let singleFile = indexHtml.replace(
  '<link rel="stylesheet" href="style.css">',
  `<style>\n${css}\n    </style>`
);

// Replace external JS script tags with inline scripts
singleFile = singleFile.replace(
  '<script src="../validator.js"></script>',
  `<script>\n${validatorJs}\n    </script>`
);

singleFile = singleFile.replace(
  '<script src="app.js"></script>',
  `<script>\n// Inline roadmap data\nconst INLINE_ROADMAP_DATA = ${minifiedRoadmap};\n\n${appJs.replace('await fetch(\'roadmap.json\')', 'Promise.resolve({ json: async () => INLINE_ROADMAP_DATA })')}\n    </script>`
);

// Add build timestamp
const buildInfo = `\n<!-- Built: ${new Date().toISOString()} -->\n<!-- Source: site/ directory (modular) -->\n<!-- Build: Single-file for GitHub Pages deployment -->\n`;
singleFile = singleFile.replace('</head>', `    ${buildInfo}</head>`);

// Write the single file
fs.writeFileSync('dist/index.html', singleFile);

const finalSize = singleFile.length;
console.log('✅ Build complete!');
console.log(`   - Output: dist/index.html`);
console.log(`   - Size: ${(finalSize / 1024).toFixed(1)} KB`);
console.log(`   - Target: <500 KB ${finalSize < 500 * 1024 ? '✅' : '⚠️'}\n`);

// Validate the build
if (finalSize > 500 * 1024) {
  console.log('⚠️  Warning: File size exceeds 500 KB target.');
  console.log('   Consider: Minifying CSS/JS or removing comments\n');
}

console.log('📦 Distribution ready for deployment!');
console.log('   To deploy: Copy dist/index.html to GitHub Pages root\n');
