const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

const html = fs.readFileSync('index.html', 'utf8');

// Extract the script content between <script> and </script>
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error('No <script> block found in index.html');
  process.exit(1);
}

const originalJS = scriptMatch[1];

const obfuscated = JavaScriptObfuscator.obfuscate(originalJS, {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.5,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.3,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.7,
  renameGlobals: false,
  selfDefending: false,
  identifierNamesGenerator: 'hexadecimal',
}).getObfuscatedCode();

const result = html.replace(/<script>[\s\S]*?<\/script>/, `<script>${obfuscated}</script>`);
fs.writeFileSync('index.html', result, 'utf8');

console.log('Obfuscation complete.');
