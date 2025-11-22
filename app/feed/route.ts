import { NextResponse } from "next/server";

/**
 * RSS Feed Index
 * 
 * This route provides a simple HTML page listing all available RSS feeds
 * Users can visit /feed to see all available feeds
 * 
 * Alternative: Could redirect to main feed (e.g., /feed/en.xml)
 */

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const feeds = [
    { locale: "en", name: "English", url: "/feed/en.xml" },
    { locale: "de", name: "Deutsch", url: "/feed/de.xml" },
    { locale: "fr", name: "Français", url: "/feed/fr.xml" },
    { locale: "es", name: "Español", url: "/feed/es.xml" },
    { locale: "it", name: "Italiano", url: "/feed/it.xml" },
    { locale: "nl", name: "Nederlands", url: "/feed/nl.xml" },
    { locale: "ar", name: "العربية", url: "/feed/ar.xml" },
  ];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flowxtra Blog RSS Feeds</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    h1 {
      color: #003f4d;
      border-bottom: 3px solid #00A8CD;
      padding-bottom: 10px;
    }
    .feed-list {
      list-style: none;
      padding: 0;
      margin: 30px 0;
    }
    .feed-item {
      background: white;
      margin: 15px 0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .feed-item a {
      color: #00A8CD;
      text-decoration: none;
      font-weight: 500;
      font-size: 18px;
    }
    .feed-item a:hover {
      text-decoration: underline;
    }
    .feed-locale {
      color: #666;
      font-size: 14px;
    }
    .info {
      background: #e8f4f8;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
      border-left: 4px solid #00A8CD;
    }
    .rss-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <h1>📡 Flowxtra Blog RSS Feeds</h1>
  
  <div class="info">
    <p><strong>Subscribe to our blog updates!</strong></p>
    <p>Choose your preferred language and subscribe to our RSS feed to stay updated with the latest articles about ATS software, recruitment, HR management, and talent acquisition.</p>
  </div>

  <ul class="feed-list">
    ${feeds.map(feed => `
      <li class="feed-item">
        <div>
          <a href="${feed.url}" rel="alternate" type="application/rss+xml">
            <span class="rss-icon">📡</span>
            ${feed.name} RSS Feed
          </a>
          <div class="feed-locale">Locale: ${feed.locale}</div>
        </div>
        <a href="${feed.url}" rel="alternate" type="application/rss+xml" style="font-size: 14px;">View Feed →</a>
      </li>
    `).join('')}
  </ul>

  <div class="info">
    <p><strong>How to use RSS feeds:</strong></p>
    <ul>
      <li>Copy the RSS feed URL</li>
      <li>Add it to your RSS reader (Feedly, Inoreader, etc.)</li>
      <li>Or use it in your browser's RSS reader</li>
      <li>Get automatic updates when we publish new articles!</li>
    </ul>
  </div>

  <p style="text-align: center; color: #666; margin-top: 40px;">
    <a href="${baseUrl}" style="color: #00A8CD;">← Back to Flowxtra</a>
  </p>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

