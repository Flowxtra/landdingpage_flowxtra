# 🔌 API Requirements for Blog System

## 📋 Overview

This document specifies **EXACTLY** what the Backend/API team needs to implement to integrate with the Blog system on the frontend.

**Status:** Frontend is 100% ready. Backend API endpoints need to be created.

---

## 🎯 Required API Endpoints

You need to create **3 main API endpoints**:

1. **Get Blog Posts List** - `/api/blog`
2. **Get Single Blog Post** - `/api/blog/{slug}`
3. **Get Categories** - `/api/blog/categories` (optional, can be included in posts endpoint)

---

## 📡 API Endpoint Specifications

### 1. Get Blog Posts List

#### Endpoint Details

```
Method:  GET
URL:     /api/blog
Headers: Content-Type: application/json
Auth:    Not required (public endpoint)
Query Parameters:
  - page: number (optional, default: 1)
  - limit: number (optional, default: 9 for grid, 6 for list)
  - category: string (optional, category slug to filter by)
  - search: string (optional, search query)
  - locale: string (optional, 'en' or 'de', default: 'en')
```

#### Response Format (JSON)

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "How AI is Transforming Frontend Development",
        "excerpt": "Explore how tools like GitHub Copilot, AI design generators...",
        "category": "Productivity",
        "categoryId": 1,
        "categorySlug": "productivity",
        "image": "/img/blog/post-1.jpg",
        "slug": "how-ai-is-transforming-frontend-development",
        "date": "2024-01-15",
        "time": "5 min read",
        "author": "John Doe",
        "authorImage": "/img/blog/author.jpg"
      }
    ],
    "categories": [
      {
        "id": 1,
        "name": "Productivity",
        "slug": "productivity",
        "translations": {
          "en": "Productivity",
          "de": "Produktivität"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalPosts": 18,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "latestPost": {
      "id": 1,
      "title": "How AI is Transforming Frontend Development",
      "excerpt": "Explore how tools like GitHub Copilot...",
      "category": "Innovation Spotlight",
      "image": "/img/blog/latest-post.jpg",
      "slug": "how-ai-is-transforming-frontend-development",
      "date": "2024-01-15"
    }
  }
}
```

#### Field Descriptions

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | Number | ✅ Yes | Unique post ID | `1` |
| `title` | String | ✅ Yes | Post title | `"How AI is Transforming..."` |
| `excerpt` | String | ✅ Yes | Post excerpt/summary | `"Explore how tools..."` |
| `category` | String | ✅ Yes | Category name | `"Productivity"` |
| `categoryId` | Number | ✅ Yes | Category ID for filtering | `1` |
| `categorySlug` | String | ✅ Yes | Category slug | `"productivity"` |
| `image` | String | ✅ Yes | Featured image URL | `"/img/blog/post-1.jpg"` |
| `slug` | String | ✅ Yes | URL-friendly post identifier | `"how-ai-is-transforming..."` |
| `date` | String (ISO 8601) | ✅ Yes | Publication date | `"2024-01-15"` |
| `time` | String | ✅ Yes | Reading time estimate | `"5 min read"` |
| `author` | String | ❌ No | Author name | `"John Doe"` |
| `authorImage` | String | ❌ No | Author image URL | `"/img/blog/author.jpg"` |

#### Categories Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Number | ✅ Yes | Category ID |
| `name` | String | ✅ Yes | Category name (default/English) |
| `slug` | String | ✅ Yes | Category slug for URLs |
| `translations` | Object | ✅ Yes | Translations object with `en` and `de` keys |

#### Pagination Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `currentPage` | Number | ✅ Yes | Current page number |
| `totalPages` | Number | ✅ Yes | Total number of pages |
| `totalPosts` | Number | ✅ Yes | Total number of posts |
| `hasNextPage` | Boolean | ✅ Yes | Whether there's a next page |
| `hasPreviousPage` | Boolean | ✅ Yes | Whether there's a previous page |

#### Query Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `page` | Number | ❌ No | Page number (starts at 1) | `1`, `2`, `3` |
| `limit` | Number | ❌ No | Posts per page | `9` (grid), `6` (list) |
| `category` | String | ❌ No | Filter by category slug | `"productivity"` |
| `search` | String | ❌ No | Search query | `"AI development"` |
| `locale` | String | ❌ No | Language code | `"en"`, `"de"` |

#### Example Requests

```bash
# Get first page of all posts
GET /api/blog?page=1&limit=9

# Get posts by category
GET /api/blog?category=productivity&page=1

# Search posts
GET /api/blog?search=AI&page=1

# Get posts with locale
GET /api/blog?locale=de&page=1
```

---

### 2. Get Single Blog Post

#### Endpoint Details

```
Method:  GET
URL:     /api/blog/{slug}
Headers: Content-Type: application/json
Auth:    Not required (public endpoint)
Query Parameters:
  - locale: string (optional, 'en' or 'de', default: 'en')
```

#### Response Format (JSON)

```json
{
  "success": true,
  "data": {
    "post": {
      "id": 1,
      "title": "How AI is Transforming Frontend Development",
      "excerpt": "Explore how tools like GitHub Copilot...",
      "category": "Productivity",
      "categoryId": 1,
      "categorySlug": "productivity",
      "image": "/img/blog/post-1.jpg",
      "slug": "how-ai-is-transforming-frontend-development",
      "date": "2024-01-15",
      "time": "5 min read",
      "author": "John Doe",
      "authorImage": "/img/blog/author.jpg",
      "content": "<p>Artificial Intelligence is revolutionizing...</p><h2>The Rise of AI Coding Assistants</h2><p>GitHub Copilot...</p>"
    },
    "relatedPosts": [
      {
        "id": 2,
        "title": "5 VS Code Extensions That Will Save You Hours",
        "excerpt": "Discover must-have extensions...",
        "category": "Productivity",
        "categoryId": 1,
        "categorySlug": "productivity",
        "image": "/img/blog/post-2.jpg",
        "slug": "5-vs-code-extensions",
        "date": "2024-01-10",
        "time": "3 min read"
      }
    ],
    "previousPost": {
      "id": 18,
      "title": "Responsive Design Best Practices",
      "slug": "responsive-design-best-practices"
    },
    "nextPost": {
      "id": 2,
      "title": "5 VS Code Extensions That Will Save You Hours",
      "slug": "5-vs-code-extensions"
    }
  }
}
```

#### Field Descriptions

All fields from the posts list endpoint are required, plus:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `content` | String (HTML) | ✅ Yes | Full post content in HTML format | `"<p>Artificial Intelligence...</p>"` |
| `relatedPosts` | Array | ✅ Yes | Array of related posts (same category, max 3) | See posts list format |
| `previousPost` | Object | ❌ No | Previous post in chronological order | `{ id, title, slug }` |
| `nextPost` | Object | ❌ No | Next post in chronological order | `{ id, title, slug }` |

#### Important Notes

- **Content Format**: The `content` field should return **raw HTML** that will be rendered using `dangerouslySetInnerHTML`
- **Related Posts**: Should be from the same category, excluding the current post, limited to 3 posts
- **Previous/Next Posts**: Based on publication date order (newest first typically)

#### Example Request

```bash
# Get post by slug
GET /api/blog/how-ai-is-transforming-frontend-development?locale=en

# Get post with German locale
GET /api/blog/how-ai-is-transforming-frontend-development?locale=de
```

---

### 3. Get Categories (Optional)

This can be included in the blog posts endpoint, but if you want a separate endpoint:

```
Method:  GET
URL:     /api/blog/categories
Headers: Content-Type: application/json
Auth:    Not required (public endpoint)
Query Parameters:
  - locale: string (optional, 'en' or 'de', default: 'en')
```

#### Response Format (JSON)

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": 1,
        "name": "Productivity",
        "slug": "productivity",
        "translations": {
          "en": "Productivity",
          "de": "Produktivität"
        }
      },
      {
        "id": 2,
        "name": "Accessibility",
        "slug": "accessibility",
        "translations": {
          "en": "Accessibility",
          "de": "Barrierefreiheit"
        }
      },
      {
        "id": 3,
        "name": "Performance",
        "slug": "performance",
        "translations": {
          "en": "Performance",
          "de": "Leistung"
        }
      }
    ]
  }
}
```

---

## 🔍 Search Functionality

The search should filter posts by:
- **Title** (case-insensitive partial match)
- **Excerpt** (case-insensitive partial match)
- **Category name** (case-insensitive partial match)

Example:
```
GET /api/blog?search=AI
```

Should return all posts where:
- Title contains "AI"
- OR Excerpt contains "AI"
- OR Category name contains "AI"

---

## 🌍 Internationalization (i18n)

### Supported Locales

- `en` - English (default)
- `de` - German (Deutsch)

### Localization Requirements

1. **Post Titles**: Should be returned in the requested locale
2. **Post Content**: Should be returned in the requested locale
3. **Category Names**: Use `translations` object for multi-language support
4. **Dates**: Return as ISO 8601 string, frontend will format

### Locale Handling

The API should:
- Accept `locale` query parameter
- Return content in the requested language
- Default to English if locale not specified or invalid
- Return translations for category names

---

## 📊 Data Requirements

### Image URLs

- Image URLs should be **absolute paths** starting with `/` or full URLs
- All images must be accessible via HTTP/HTTPS
- Recommended image dimensions:
  - Featured images: 1200x600px minimum
  - Author images: 200x200px (square)

### Content Format

- **HTML Content**: Post content must be valid HTML
- **Supported HTML tags**: 
  - Headings: `<h1>`, `<h2>`, `<h3>`, `<h4>`
  - Paragraphs: `<p>`
  - Lists: `<ul>`, `<ol>`, `<li>`
  - Links: `<a>`
  - Images: `<img>`, `<figure>`, `<figcaption>`
  - Formatting: `<strong>`, `<em>`, `<code>`, `<pre>`
  - Blockquotes: `<blockquote>`
  - Tables: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
  - Horizontal rules: `<hr>`

### Date Format

- Use **ISO 8601** format: `YYYY-MM-DD`
- Example: `"2024-01-15"`

### Reading Time

- Format: `"{number} min read"`
- Example: `"5 min read"`, `"10 min read"`

---

## 🚨 Error Handling

### 404 - Post Not Found

```json
{
  "success": false,
  "error": {
    "code": "POST_NOT_FOUND",
    "message": "Post with slug 'invalid-slug' not found"
  }
}
```

### 400 - Bad Request

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid page number"
  }
}
```

### 500 - Server Error

```json
{
  "success": false,
  "error": {
    "code": "SERVER_ERROR",
    "message": "Internal server error"
  }
}
```

---

## 📝 Implementation Notes

### Pagination Logic

- Default page size: 9 posts per page (for grid view)
- List view uses 6 posts per page
- Page numbers start at 1 (not 0)
- Return empty array if no posts found for a page

### Category Filtering

- Multiple categories can be selected (send as comma-separated or array)
- If no categories selected, return all posts
- Filter should be case-insensitive for category slugs

### Search Functionality

- Search should be case-insensitive
- Should search across title, excerpt, and category
- Empty search should return all posts
- Special characters should be handled properly

### Related Posts Logic

- Find posts with same `categoryId`
- Exclude current post
- Sort by date (newest first)
- Limit to 3 posts maximum

### Previous/Next Posts Logic

- Sort all posts by date (newest first)
- Find current post index
- Previous post = index + 1
- Next post = index - 1
- Return `null` if no previous/next exists

---

## ✅ Testing Checklist

Before deployment, test:

- [ ] Get all posts without filters
- [ ] Get posts with pagination
- [ ] Get posts filtered by category
- [ ] Search functionality
- [ ] Get single post by slug
- [ ] Related posts are correct (same category)
- [ ] Previous/Next posts navigation works
- [ ] English locale returns English content
- [ ] German locale returns German content
- [ ] Image URLs are accessible
- [ ] HTML content renders correctly
- [ ] 404 error for non-existent post
- [ ] Empty search returns all posts
- [ ] Invalid page number handling

---

## 💾 Database Schema

### Blog Posts Table

```sql
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title_en VARCHAR(500) NOT NULL,
    title_de VARCHAR(500),
    excerpt_en TEXT,
    excerpt_de TEXT,
    content_en LONGTEXT,
    content_de LONGTEXT,
    category_id INT NOT NULL,
    featured_image VARCHAR(500),
    author_name VARCHAR(255),
    author_image VARCHAR(500),
    published_date DATE NOT NULL,
    reading_time VARCHAR(50) DEFAULT '5 min read',
    status ENUM('draft', 'published', 'archived') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category_id),
    INDEX idx_slug (slug),
    INDEX idx_published_date (published_date),
    INDEX idx_status (status),
    FOREIGN KEY (category_id) REFERENCES blog_categories(id)
);
```

### Blog Categories Table

```sql
CREATE TABLE blog_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_de VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
);
```

### Schema Fields Description

#### blog_posts Table

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | INT | ✅ Yes | Primary key, auto-increment | `1` |
| `slug` | VARCHAR(255) | ✅ Yes | URL-friendly identifier (unique) | `"how-ai-is-transforming-frontend-development"` |
| `title_en` | VARCHAR(500) | ✅ Yes | Post title in English | `"How AI is Transforming Frontend Development"` |
| `title_de` | VARCHAR(500) | ❌ No | Post title in German | `"Wie KI die Frontend-Entwicklung transformiert"` |
| `excerpt_en` | TEXT | ✅ Yes | Post excerpt in English | `"Explore how tools like GitHub Copilot..."` |
| `excerpt_de` | TEXT | ❌ No | Post excerpt in German | `"Erkunden Sie, wie Tools wie GitHub Copilot..."` |
| `content_en` | LONGTEXT | ✅ Yes | Full post content in English (HTML) | `"<p>Artificial Intelligence...</p>"` |
| `content_de` | LONGTEXT | ❌ No | Full post content in German (HTML) | `"<p>Künstliche Intelligenz...</p>"` |
| `category_id` | INT | ✅ Yes | Foreign key to blog_categories | `1` |
| `featured_image` | VARCHAR(500) | ✅ Yes | Featured image URL/path | `"/img/blog/post-1.jpg"` |
| `author_name` | VARCHAR(255) | ❌ No | Author name | `"John Doe"` |
| `author_image` | VARCHAR(500) | ❌ No | Author image URL/path | `"/img/blog/author.jpg"` |
| `published_date` | DATE | ✅ Yes | Publication date (ISO format) | `"2024-01-15"` |
| `reading_time` | VARCHAR(50) | ✅ Yes | Estimated reading time | `"5 min read"` |
| `status` | ENUM | ✅ Yes | Post status | `"published"`, `"draft"`, `"archived"` |
| `created_at` | TIMESTAMP | ✅ Yes | Record creation timestamp | Auto-generated |
| `updated_at` | TIMESTAMP | ✅ Yes | Record update timestamp | Auto-generated |

#### blog_categories Table

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | INT | ✅ Yes | Primary key, auto-increment | `1` |
| `slug` | VARCHAR(255) | ✅ Yes | URL-friendly identifier (unique) | `"productivity"` |
| `name_en` | VARCHAR(255) | ✅ Yes | Category name in English | `"Productivity"` |
| `name_de` | VARCHAR(255) | ❌ No | Category name in German | `"Produktivität"` |
| `created_at` | TIMESTAMP | ✅ Yes | Record creation timestamp | Auto-generated |
| `updated_at` | TIMESTAMP | ✅ Yes | Record update timestamp | Auto-generated |

### Important Notes

1. **Slug Format**: Should be URL-friendly (lowercase, hyphens instead of spaces)
   - Example: `"how-ai-is-transforming-frontend-development"`
   - Must be unique

2. **Multilingual Content**: 
   - Store separate fields for English (`_en`) and German (`_de`)
   - If German content is not available, API should return English content

3. **Content Format**:
   - Store HTML content as-is in `content_en` and `content_de`
   - Frontend will render using `dangerouslySetInnerHTML`

4. **Image Paths**:
   - Store relative paths starting with `/` or full URLs
   - Example: `"/img/blog/post-1.jpg"` or `"https://cdn.flowxtra.com/blog/post-1.jpg"`

5. **Status Field**:
   - Only return posts with `status = 'published'`
   - Draft and archived posts should not appear in public API

6. **Indexing**:
   - Index on `category_id` for filtering
   - Index on `slug` for single post lookup
   - Index on `published_date` for sorting
   - Index on `status` for filtering

---

## 📞 Integration Example

### Frontend Implementation

```typescript
// Get blog posts
const response = await fetch(`${API_URL}/api/blog?page=1&limit=9&locale=en`);
const data = await response.json();
const posts = data.data.posts;

// Get single post
const postResponse = await fetch(`${API_URL}/api/blog/${slug}?locale=en`);
const postData = await postResponse.json();
const post = postData.data.post;
```

---

## 🔗 API Base URL

```
Production:  https://api.flowxtra.com
Development: http://localhost:8765 (or your dev server)
```

---

## 🗺️ Sitemap Requirements

### Overview

The sitemap automatically includes all published blog posts for SEO. The frontend generates `sitemap.xml` dynamically by fetching all blog posts from the API.

### API Requirements for Sitemap

#### 1. Pagination Support

The sitemap generator uses pagination to fetch all blog posts. The API **MUST** support:

- **Pagination parameters**: `page` and `limit`
- **Complete pagination metadata** in response
- **Efficient page fetching** (recommended limit: 100 posts per page)

#### 2. Required Response Format

For sitemap generation, the API endpoint `/api/blog` must return:

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": 1,
        "slug": "how-ai-is-transforming-frontend-development",
        "date": "2024-01-15",
        "updatedAt": "2024-01-20"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalPosts": 987,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

#### 3. Critical Fields for Sitemap

Each post in the `posts` array **MUST** include:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Number | ✅ Yes | Unique post identifier |
| `slug` | String | ✅ Yes | URL-friendly identifier |
| `date` | String (ISO 8601) | ✅ Yes | Publication date: `YYYY-MM-DD` |
| `updatedAt` | String (ISO 8601) | ❌ No | Last update date: `YYYY-MM-DD` (falls back to `date` if not provided) |

#### 4. Pagination Metadata Requirements

The `pagination` object **MUST** include:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `currentPage` | Number | ✅ Yes | Current page number (starts at 1) |
| `totalPages` | Number | ✅ Yes | Total number of pages |
| `totalPosts` | Number | ✅ Yes | Total number of published posts |
| `hasNextPage` | Boolean | ✅ Yes | Whether there's a next page |
| `hasPreviousPage` | Boolean | ✅ Yes | Whether there's a previous page |

#### 5. Sitemap Generation Logic

The frontend sitemap generator:

1. **Fetches posts page by page** (starting from page 1)
2. **Collects all posts** until `hasNextPage = false`
3. **Creates sitemap entries** for each post in all locales (en, de)
4. **URL format**: `https://flowxtra.com/{locale}/blog/{slug}`
5. **Updates every hour** (revalidation: 3600 seconds)

#### 6. Performance Considerations

- **Limit per request**: API should support `limit=100` or higher for efficient pagination
- **Timeout handling**: API should respond within 5 seconds per request
- **Caching**: API responses are cached for 1 hour to reduce server load
- **Error handling**: If API fails, sitemap still includes static pages

#### 7. Example API Calls for Sitemap

```bash
# Page 1 (first 100 posts)
GET /api/blog?page=1&limit=100

# Page 2 (next 100 posts)
GET /api/blog?page=2&limit=100

# Continue until hasNextPage = false
```

#### 8. Important Notes

- **Published posts only**: API should only return posts with `status = 'published'`
- **All locales**: Each post appears in sitemap for both `en` and `de` locales
- **Automatic updates**: Sitemap regenerates automatically when posts are added/updated
- **No authentication required**: Sitemap endpoint is public

---

## 📅 Priority

**High Priority** - Required for blog functionality and SEO

---

**Last Updated**: January 2024
**Version**: 1.0.0

