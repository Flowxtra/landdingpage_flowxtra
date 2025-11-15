const fs = require('fs');

// Read CompareFeatures.tsx
const content = fs.readFileSync('components/CompareFeatures.tsx', 'utf8');

// Extract all icon definitions
const iconPattern = /icon:\s*['"](fas|far|fab)\s+(fa-[a-z-]+)['"]/g;
const matches = [...content.matchAll(iconPattern)];

// Get unique icons
const icons = new Set();
matches.forEach(m => {
  icons.add(m[1] + ' ' + m[2]);
});

// Output sorted list
const sortedIcons = Array.from(icons).sort();
console.log('Icons found:');
sortedIcons.forEach(icon => console.log(icon));
console.log(`\nTotal: ${sortedIcons.length} unique icons`);

// Save to file
fs.writeFileSync('used-icons.txt', sortedIcons.join('\n'));
console.log('\nSaved to used-icons.txt');

