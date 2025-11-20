/**
 * Script to check blog API and analyze available posts and languages
 * This script fetches all blog posts and analyzes their language availability
 */

const https = require("https");
const http = require("http");

// Configuration
// Use production server by default, can be overridden with environment variable
const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://api.flowxtra.com";
const SITE = "flowxtra.com";

console.log("🔧 Configuration:");
console.log(`   API Base URL: ${API_BASE_URL}`);
console.log(`   Site: ${SITE}`);
console.log(`   Use --env API_URL=<url> to override\n`);

// Helper function to make HTTP/HTTPS requests
function fetch(url) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith("https://");
    const client = isHttps ? https : http;

    client
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            // Remove BOM (Byte Order Mark) if present
            let cleanData = data;
            if (data.charCodeAt(0) === 0xfeff) {
              cleanData = data.slice(1);
            }
            // Also try removing UTF-8 BOM
            if (data.startsWith("\uFEFF")) {
              cleanData = data.replace(/^\uFEFF/, "");
            }
            const json = JSON.parse(cleanData);
            resolve({ status: res.statusCode, data: json });
          } catch (e) {
            resolve({ status: res.statusCode, data: data });
          }
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Get all blog posts for a specific locale
async function getBlogPosts(locale = "en", page = 1, limit = 100) {
  const url = `${API_BASE_URL}/api/blog?locale=${locale}&site=${SITE}&page=${page}&limit=${limit}`;
  console.log(`\n📡 Fetching posts for locale: ${locale} (page ${page})...`);
  console.log(`   URL: ${url}`);

  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      console.error(`   ❌ Error: Status ${response.status}`);
      return null;
    }

    if (!response.data || !response.data.success) {
      if (response.data && response.data.data) {
        // Sometimes the API returns data even if success is false
        return response.data.data;
      }
      console.error(`   ❌ API Error:`, response.data);
      return null;
    }

    return response.data.data;
  } catch (error) {
    console.error(`   ❌ Request failed:`, error.message);
    return null;
  }
}

// Get a single blog post
async function getBlogPost(slug, locale) {
  const url = `${API_BASE_URL}/api/blog/${slug}?locale=${locale}&site=${SITE}`;

  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      return null;
    }

    if (!response.data.success) {
      return null;
    }

    return response.data.data.post;
  } catch (error) {
    return null;
  }
}

// Main analysis function
async function analyzeBlogAPI() {
  console.log("🔍 Blog API Analysis");
  console.log("=".repeat(60));
  console.log(`API Base URL: ${API_BASE_URL}`);
  console.log(`Site: ${SITE}`);

  // Supported locales
  const locales = ["en", "de", "es", "fr", "it", "nl", "ar"];

  // Store all posts by slug
  const postsMap = new Map();
  const postsByLocale = {};

  // Fetch posts for each locale
  for (const locale of locales) {
    console.log(`\n🌍 Checking locale: ${locale}`);
    postsByLocale[locale] = [];

    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await getBlogPosts(locale, page, 100);

      if (!data || !data.posts) {
        console.log(`   ⚠️  No posts found for ${locale}`);
        break;
      }

      const posts = data.posts || [];
      console.log(`   ✅ Found ${posts.length} posts (page ${page})`);
      console.log(
        `   📊 Total posts: ${data.pagination?.totalPosts || posts.length}`
      );

      postsByLocale[locale].push(...posts);

      // Check if there are more pages
      hasMore = data.pagination?.hasNextPage || false;
      page++;

      // Process each post
      for (const post of posts) {
        // Use ID as primary key, slug as secondary
        const key = post.id || post.slug;

        if (!postsMap.has(key)) {
          postsMap.set(key, {
            id: post.id,
            slug: post.slug,
            title: post.title,
            primaryLanguage: post.primaryLanguage,
            availableLanguages: post.availableLanguages || [],
            locales: new Set(),
            slugs: new Map(), // Map locale to slug
          });
        }

        const postInfo = postsMap.get(key);
        postInfo.locales.add(locale);
        postInfo.slugs.set(locale, post.slug);

        // Update available languages if not set
        if (post.availableLanguages && post.availableLanguages.length > 0) {
          postInfo.availableLanguages = post.availableLanguages;
        }

        // Update title if we have a better one
        if (post.title && post.title.length > postInfo.title?.length) {
          postInfo.title = post.title;
        }
      }

      // Break if no more pages
      if (!hasMore || posts.length === 0) {
        break;
      }
    }

    console.log(
      `   📝 Total posts for ${locale}: ${postsByLocale[locale].length}`
    );
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 SUMMARY");
  console.log("=".repeat(60));

  console.log(`\n📚 Total Unique Posts: ${postsMap.size}`);

  // Count posts by locale
  console.log("\n📖 Posts by Locale:");
  for (const locale of locales) {
    const count = postsByLocale[locale]?.length || 0;
    console.log(`   ${locale.padEnd(5)}: ${count} posts`);
  }

  // Analyze language availability
  console.log("\n🌐 Language Availability Analysis:");
  const languageCounts = {};
  const postsByLanguageCount = {};

  for (const [slug, postInfo] of postsMap) {
    const langCount =
      postInfo.availableLanguages.length || postInfo.locales.size;

    if (!languageCounts[langCount]) {
      languageCounts[langCount] = 0;
    }
    languageCounts[langCount]++;

    if (!postsByLanguageCount[langCount]) {
      postsByLanguageCount[langCount] = [];
    }
    postsByLanguageCount[langCount].push(postInfo);
  }

  // Display language distribution
  console.log("\n   Posts by number of available languages:");
  const sortedCounts = Object.keys(languageCounts).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );
  for (const count of sortedCounts) {
    const postCount = languageCounts[count];
    const percentage = ((postCount / postsMap.size) * 100).toFixed(1);
    console.log(`   ${count} language(s): ${postCount} posts (${percentage}%)`);
  }

  // Show detailed breakdown for each post
  console.log("\n📋 Detailed Post Information:");
  console.log("-".repeat(80));

  let index = 1;
  for (const [key, postInfo] of postsMap) {
    const availableLangs =
      postInfo.availableLanguages.length > 0
        ? postInfo.availableLanguages.join(", ")
        : Array.from(postInfo.locales).join(", ");

    console.log(`\n${index}. ${postInfo.title || postInfo.slug || "Untitled"}`);
    console.log(`   ID: ${postInfo.id || "N/A"}`);
    console.log(`   Primary Slug: ${postInfo.slug || "N/A"}`);
    console.log(`   Primary Language: ${postInfo.primaryLanguage || "N/A"}`);
    console.log(
      `   Available Languages: ${availableLangs} (${
        postInfo.availableLanguages.length || postInfo.locales.size
      } languages)`
    );
    console.log(
      `   Found in locales: ${Array.from(postInfo.locales).join(", ")}`
    );

    // Show slugs for each locale
    if (postInfo.slugs && postInfo.slugs.size > 0) {
      console.log(`   Slugs by locale:`);
      for (const [loc, slug] of postInfo.slugs) {
        console.log(`      ${loc}: ${slug}`);
      }
    }

    index++;
  }

  // Language coverage
  console.log("\n" + "=".repeat(60));
  console.log("🎯 Language Coverage:");
  console.log("=".repeat(60));

  for (const locale of locales) {
    const postsInLocale = postsByLocale[locale]?.length || 0;
    const coverage = ((postsInLocale / postsMap.size) * 100).toFixed(1);
    console.log(
      `   ${locale.padEnd(5)}: ${postsInLocale
        .toString()
        .padStart(3)} posts (${coverage}% coverage)`
    );
  }

  console.log("\n✅ Analysis complete!");
}

// Run the analysis
analyzeBlogAPI().catch((error) => {
  console.error("\n❌ Error running analysis:", error);
  process.exit(1);
});
