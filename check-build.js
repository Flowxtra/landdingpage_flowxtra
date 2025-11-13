// Quick script to check if .next folder exists and has required files
const fs = require("fs");
const path = require("path");

console.log("Checking Next.js build...\n");

const nextDir = path.join(process.cwd(), ".next");
const staticDir = path.join(nextDir, "static");

// Check if .next exists
if (!fs.existsSync(nextDir)) {
  console.error("❌ .next folder does not exist!");
  console.error("   Run: npm run build");
  process.exit(1);
}

console.log("✅ .next folder exists");

// Check if .next/static exists
if (!fs.existsSync(staticDir)) {
  console.error("❌ .next/static folder does not exist!");
  console.error("   Run: npm run build");
  process.exit(1);
}

console.log("✅ .next/static folder exists");

// Check for required subdirectories
const requiredDirs = ["chunks", "css", "media"];
requiredDirs.forEach((dir) => {
  const dirPath = path.join(staticDir, dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    console.log(`✅ .next/static/${dir} exists (${files.length} files)`);
  } else {
    console.warn(`⚠️  .next/static/${dir} does not exist`);
  }
});

// Check for server files
const serverDir = path.join(nextDir, "server");
if (fs.existsSync(serverDir)) {
  console.log("✅ .next/server folder exists");
} else {
  console.warn("⚠️  .next/server folder does not exist");
}

console.log("\n✅ Build check complete!");
