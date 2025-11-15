const fs = require("fs");

// Read used icons
const usedIcons = fs
  .readFileSync("used-icons.txt", "utf8")
  .split("\n")
  .filter((line) => line.trim())
  .map((line) => line.trim());

console.log(`Processing ${usedIcons.length} icons...`);

// Read full Font Awesome CSS
const fullCSS = fs.readFileSync("public/fonts/fontawesome.min.css", "utf8");

// Extract base styles (everything before .fa-0:before)
const baseMatch = fullCSS.match(/^([\s\S]*?)(\.fa-0:before)/);
if (!baseMatch) {
  console.error("Could not find base styles");
  process.exit(1);
}

let baseStyles = baseMatch[1];

// Extract icon-specific CSS for each used icon
let iconCSS = "";
const iconNames = usedIcons.map((icon) => {
  const parts = icon.split(" ");
  return parts[1]; // Get icon name like 'fa-briefcase'
});

// Create regex pattern to match icon CSS
// Font Awesome CSS is minified, so we need to search in the minified format
iconNames.forEach((iconName) => {
  // Remove 'fa-' prefix if present
  const iconNameOnly = iconName.replace(/^fa-/, "");
  const escapedIcon = iconNameOnly.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Match patterns in minified CSS:
  // .fa-briefcase:before{content:"\f0b1"}
  // .fa-suitcase:before,.fa-briefcase:before{content:"\f0b1"}
  // .fa-calendar-alt:before,.fa-calendar-days:before{content:"\f073"}
  const pattern = new RegExp(
    `\\.fa-${escapedIcon}(?::before)?(?:,\\.fa-[^:]*:before)*\\{[^}]*content:[^}]*\\}`,
    "g"
  );

  const matches = fullCSS.match(pattern);
  if (matches && matches.length > 0) {
    iconCSS += matches.join("") + "";
  } else {
    console.warn(`Warning: Could not find CSS for ${iconName}`);
  }
});

// Extract brand icon CSS if needed
if (usedIcons.some((icon) => icon.startsWith("fab"))) {
  // Extract brand styles section
  const brandMatch = fullCSS.match(
    /(:host,:root\{--fa-style-family-brands[^}]*\}[^}]*\.fa-brands,\.fab\{[^}]*\}[^}]*\.fa-google:before\{[^}]*\})/
  );
  if (brandMatch) {
    iconCSS = brandMatch[1] + "\n" + iconCSS;
  }
}

// Combine everything
const customCSS = baseStyles + iconCSS;

// Write custom CSS file
fs.writeFileSync("public/fonts/fontawesome-custom.min.css", customCSS);

const originalSize = fs.statSync("public/fonts/fontawesome.min.css").size;
const customSize = fs.statSync("public/fonts/fontawesome-custom.min.css").size;

console.log(`\n✅ Custom CSS created!`);
console.log(`Original size: ${(originalSize / 1024).toFixed(2)} KiB`);
console.log(`Custom size: ${(customSize / 1024).toFixed(2)} KiB`);
console.log(
  `Reduction: ${((1 - customSize / originalSize) * 100).toFixed(1)}%`
);
console.log(`\nFile saved to: public/fonts/fontawesome-custom.min.css`);
