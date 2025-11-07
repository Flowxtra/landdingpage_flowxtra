# Blog API - Frontend Integration Guide

## 📋 Overview

This document provides a complete guide for frontend developers to integrate with the Blog API. It includes all endpoints, request/response formats, examples, and best practices.

**API Version:** 1.0.0  
**Last Updated:** 2025-11-07

---

## 🔗 Base URL

```
Development: http://localhost:8765/api
Production:  https://app.flowxtra.com/api
```

**Note:** All endpoints are public (no authentication required).

---

## 🌐 Site/Domain Filtering

The Blog API automatically filters content by site/domain. You can specify the site in two ways:

1. **Host Header** (Recommended): The API automatically detects the site from the request's Host header
2. **Query Parameter**: Use `?site=flowxtra.com` to explicitly specify the site

**Example:**
```javascript
// Automatic detection from Host header
fetch('https://flowxtra.com/api/blog', {
  headers: {
    'Host': 'flowxtra.com'
  }
});

// Or use query parameter
fetch('https://api.flowxtra.com/api/blog?site=flowxtra.com');
```

---

## 📡 API Endpoints

### 1. Get Blog Posts List

**Endpoint:** `GET /api/blog`

**Description:** Retrieves a paginated list of published blog posts with optional filtering.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | No | `1` | Page number (starts at 1) |
| `limit` | number | No | `9` | Number of posts per page (max: 100) |
| `category` | string | No | - | Filter by category slug (must match locale) |
| `tag` | string | No | - | Filter by tag slug (can use multiple times) |
| `search` | string | No | - | Search query (searches in title, excerpt, category) |
| `locale` | string | No | `en` | Language code (ISO 639-1, e.g., `en`, `de`) |
| `minimal` | boolean | No | `false` | If `true`, returns minimal fields only |
| `fields` | string | No | - | Comma-separated field names to include |
| `site` | string | No | - | Site domain (if not using Host header) |

#### Example Request

```javascript
// Get first page of posts
const response = await fetch('https://flowxtra.com/api/blog?page=1&limit=9&locale=en');

// Get posts by category
const response = await fetch('https://flowxtra.com/api/blog?category=productivity&locale=en');

// Get posts by tag
const response = await fetch('https://flowxtra.com/api/blog?tag=ai&locale=en');

// Search posts
const response = await fetch('https://flowxtra.com/api/blog?search=AI&locale=en');

// Get minimal response (faster, smaller)
const response = await fetch('https://flowxtra.com/api/blog?minimal=true&page=1&limit=9');

// Get specific fields only
const response = await fetch('https://flowxtra.com/api/blog?fields=id,title,slug,date,image');
```

#### Response Format

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "How AI is Transforming Frontend Development",
        "slug": "how-ai-is-transforming-frontend-development",
        "excerpt": "Explore how tools like GitHub Copilot...",
        "category": "Productivity",
        "categoryId": 1,
        "categorySlug": "productivity",
        "image": "/storage/blog/featured-images/image.jpg",
        "date": "2024-01-15",
        "datePublished": "2024-01-15T00:00:00+00:00",
        "updatedAt": "2024-01-20",
        "dateModified": "2024-01-20T00:00:00+00:00",
        "readingTime": 5,
        "primaryLanguage": "en",
        "availableLanguages": ["en", "de"],
        "tags": [
          {
            "id": 1,
            "name": "AI",
            "slug": "ai"
          },
          {
            "id": 2,
            "name": "Frontend",
            "slug": "frontend"
          }
        ],
        "author": {
          "id": 1,
          "name": "John Doe",
          "slug": "john-doe",
          "photo": "/storage/blog/authors/john-doe.jpg",
          "shortBio": "AI Strategist & Writer",
          "bio": "John has 10+ years in AI..."
        },
        "content": "<p>Full HTML content...</p>",
        "keywords": "AI, Frontend Development, GitHub Copilot"
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
    "structuredData": {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "BlogPosting",
            "headline": "How AI is Transforming Frontend Development",
            "url": "https://flowxtra.com/en/blog/how-ai-is-transforming-frontend-development",
            "datePublished": "2024-01-15T00:00:00+00:00"
          }
        }
      ]
    }
  }
}
```

**Minimal Response (`?minimal=true`):**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "How AI is Transforming Frontend Development",
        "slug": "how-ai-is-transforming-frontend-development",
        "date": "2024-01-15",
        "image": "/storage/blog/featured-images/image.jpg"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalPosts": 18,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "structuredData": {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [...]
    }
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique post ID |
| `title` | string | Post title (in requested locale) |
| `slug` | string | URL-friendly identifier (in requested locale) |
| `excerpt` | string | Post excerpt/summary |
| `category` | string | Category name (in requested locale) |
| `categoryId` | number | Category ID |
| `categorySlug` | string | Category slug (in requested locale) |
| `image` | string | Featured image URL (relative or absolute) |
| `date` | string | Publication date (YYYY-MM-DD) |
| `datePublished` | string | Publication date (ISO 8601 with timezone) |
| `updatedAt` | string | Last update date (YYYY-MM-DD) |
| `dateModified` | string | Last update date (ISO 8601 with timezone) |
| `readingTime` | number | Reading time in minutes |
| `primaryLanguage` | string | Primary language code (e.g., "en") |
| `availableLanguages` | array | Array of available language codes |
| `tags` | array | Array of tag objects (only if not minimal) |
| `author` | object | Author object (only if not minimal) |
| `content` | string | Full HTML content (only if not minimal) |
| `keywords` | string | Comma-separated keywords (only if not minimal) |

#### Tag Object

```json
{
  "id": 1,
  "name": "AI",
  "slug": "ai"
}
```

#### Author Object

```json
{
  "id": 1,
  "name": "John Doe",
  "slug": "john-doe",
  "photo": "/storage/blog/authors/john-doe.jpg",
  "shortBio": "AI Strategist & Writer",
  "bio": "John has 10+ years in AI..."
}
```

#### Category Object

```json
{
  "id": 1,
  "name": "Productivity",
  "slug": "productivity",
  "translations": {
    "en": "Productivity",
    "de": "Produktivität"
  }
}
```

#### Pagination Object

```json
{
  "currentPage": 1,
  "totalPages": 3,
  "totalPosts": 18,
  "hasNextPage": true,
  "hasPreviousPage": false
}
```

---

### 2. Get Single Blog Post

**Endpoint:** `GET /api/blog/{slug}`

**Description:** Retrieves a single blog post with full content, related posts, and structured data.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `locale` | string | No | `en` | Language code (ISO 639-1) |
| `site` | string | No | - | Site domain (if not using Host header) |

**Important:** The `{slug}` parameter must match the slug for the requested locale:
- If `locale=en` → use English slug
- If `locale=de` → use German slug (different from English)

#### Example Request

```javascript
// Get post by slug (English)
const response = await fetch('https://flowxtra.com/api/blog/how-ai-is-transforming-frontend-development?locale=en');

// Get post by slug (German - different slug)
const response = await fetch('https://flowxtra.com/api/blog/wie-ki-die-frontend-entwicklung-transformiert?locale=de');
```

#### Response Format

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "post": {
      "id": 1,
      "title": "How AI is Transforming Frontend Development",
      "slug": "how-ai-is-transforming-frontend-development",
      "excerpt": "Explore how tools like GitHub Copilot...",
      "category": "Productivity",
      "categoryId": 1,
      "categorySlug": "productivity",
      "image": "/storage/blog/featured-images/image.jpg",
      "date": "2024-01-15",
      "datePublished": "2024-01-15T00:00:00+00:00",
      "updatedAt": "2024-01-20",
      "dateModified": "2024-01-20T00:00:00+00:00",
      "readingTime": 5,
      "primaryLanguage": "en",
      "availableLanguages": ["en", "de"],
      "tags": [
        {
          "id": 1,
          "name": "AI",
          "slug": "ai"
        }
      ],
      "author": {
        "id": 1,
        "name": "John Doe",
        "slug": "john-doe",
        "photo": "/storage/blog/authors/john-doe.jpg",
        "shortBio": "AI Strategist & Writer",
        "bio": "John has 10+ years in AI..."
      },
      "content": "<p>Full HTML content...</p>",
      "keywords": "AI, Frontend Development, GitHub Copilot"
    },
    "relatedPosts": [
      {
        "id": 2,
        "title": "5 VS Code Extensions That Will Save You Hours",
        "slug": "5-vs-code-extensions",
        "excerpt": "Discover must-have extensions...",
        "category": "Productivity",
        "categoryId": 1,
        "categorySlug": "productivity",
        "image": "/storage/blog/featured-images/image2.jpg",
        "date": "2024-01-10",
        "readingTime": 3
      }
    ],
    "structuredData": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How AI is Transforming Frontend Development",
      "description": "Explore how tools like GitHub Copilot...",
      "image": [
        "https://flowxtra.com/storage/blog/featured-images/image.jpg"
      ],
      "datePublished": "2024-01-15T00:00:00+00:00",
      "dateModified": "2024-01-20T00:00:00+00:00",
      "author": {
        "@type": "Person",
        "name": "John Doe",
        "image": "https://flowxtra.com/storage/blog/authors/john-doe.jpg"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Flowxtra",
        "logo": {
          "@type": "ImageObject",
          "url": "https://flowxtra.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://flowxtra.com/en/blog/how-ai-is-transforming-frontend-development"
      },
      "articleSection": "Productivity",
      "articleBody": "<p>Full HTML content...</p>",
      "keywords": "AI, Frontend Development, GitHub Copilot",
      "timeRequired": "PT5M",
      "wordCount": 1200
    }
  }
}
```

#### Response Fields

All fields from the list endpoint, plus:

| Field | Type | Description |
|-------|------|-------------|
| `content` | string | Full post content in HTML format |
| `relatedPosts` | array | Array of related posts (same category, max 3) |
| `structuredData` | object | JSON-LD structured data for SEO |

---

### 3. Get Categories

**Endpoint:** `GET /api/blog/categories`

**Description:** Retrieves all blog categories with translations.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `locale` | string | No | `en` | Language code (ISO 639-1) |
| `site` | string | No | - | Site domain (if not using Host header) |

#### Example Request

```javascript
const response = await fetch('https://flowxtra.com/api/blog/categories?locale=en');
```

#### Response Format

**Success Response (200 OK):**

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
      }
    ]
  }
}
```

---

## 🚨 Error Handling

### 400 Bad Request

**Invalid Locale:**
```json
{
  "success": false,
  "error": "Language 'fr' is not enabled"
}
```

**Site Not Found:**
```json
{
  "success": false,
  "error": "Site not found for domain: example.com"
}
```

### 404 Not Found

**Post Not Found:**
```json
{
  "success": false,
  "error": "Post not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## 📝 Frontend Integration Examples

### React/Next.js Example

```typescript
// types/blog.ts
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categoryId: number;
  categorySlug: string;
  image: string;
  date: string;
  datePublished: string;
  updatedAt: string;
  dateModified: string;
  readingTime: number;
  primaryLanguage: string;
  availableLanguages: string[];
  tags?: Tag[];
  author?: Author;
  content?: string;
  keywords?: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  photo?: string;
  shortBio?: string;
  bio?: string;
}

export interface BlogResponse {
  success: boolean;
  data: {
    posts: BlogPost[];
    categories?: Category[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalPosts: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    structuredData?: any;
  };
}

// services/blogApi.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.flowxtra.com/api';

export async function getBlogPosts(params: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  locale?: string;
  minimal?: boolean;
}): Promise<BlogResponse> {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.category) queryParams.append('category', params.category);
  if (params.tag) queryParams.append('tag', params.tag);
  if (params.search) queryParams.append('search', params.search);
  if (params.locale) queryParams.append('locale', params.locale);
  if (params.minimal) queryParams.append('minimal', 'true');

  const response = await fetch(`${API_BASE_URL}/blog?${queryParams.toString()}`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function getBlogPost(slug: string, locale: string = 'en'): Promise<{
  success: boolean;
  data: {
    post: BlogPost;
    relatedPosts: BlogPost[];
    structuredData?: any;
  };
}> {
  const response = await fetch(`${API_BASE_URL}/blog/${slug}?locale=${locale}`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function getBlogCategories(locale: string = 'en'): Promise<{
  success: boolean;
  data: {
    categories: Category[];
  };
}> {
  const response = await fetch(`${API_BASE_URL}/blog/categories?locale=${locale}`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Usage in component
import { getBlogPosts, getBlogPost } from '@/services/blogApi';

// Get posts list
const { data } = await getBlogPosts({
  page: 1,
  limit: 9,
  locale: 'en',
});

// Get single post
const { data: postData } = await getBlogPost('how-ai-is-transforming-frontend-development', 'en');
```

### Vue.js Example

```javascript
// composables/useBlog.js
import { ref } from 'vue';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://app.flowxtra.com/api';

export function useBlog() {
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPosts = async (params = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${API_BASE_URL}/blog?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      posts.value = data.data.posts;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
  };
}

// Usage in component
<script setup>
import { useBlog } from '@/composables/useBlog';

const { posts, loading, error, fetchPosts } = useBlog();

onMounted(() => {
  fetchPosts({
    page: 1,
    limit: 9,
    locale: 'en',
  });
});
</script>
```

---

## 🎯 Best Practices

### 1. Caching

The API responses are cached for 15 minutes. Implement client-side caching to reduce API calls:

```javascript
// Simple cache implementation
const cache = new Map();

async function getCachedPosts(params) {
  const cacheKey = JSON.stringify(params);
  
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (Date.now() - cached.timestamp < 15 * 60 * 1000) {
      return cached.data;
    }
  }

  const data = await getBlogPosts(params);
  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
}
```

### 2. Error Handling

Always handle errors gracefully:

```javascript
try {
  const response = await getBlogPosts({ page: 1 });
  // Handle success
} catch (error) {
  if (error.message.includes('404')) {
    // Post not found
  } else if (error.message.includes('400')) {
    // Bad request (e.g., invalid locale)
  } else {
    // Other errors
  }
}
```

### 3. Loading States

Show loading indicators while fetching data:

```javascript
const [loading, setLoading] = useState(false);
const [posts, setPosts] = useState([]);

useEffect(() => {
  setLoading(true);
  getBlogPosts({ page: 1 })
    .then(data => setPosts(data.data.posts))
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
}, []);
```

### 4. Pagination

Implement pagination controls:

```javascript
const [currentPage, setCurrentPage] = useState(1);
const [pagination, setPagination] = useState(null);

const loadPage = async (page) => {
  const response = await getBlogPosts({ page, limit: 9 });
  setPagination(response.data.pagination);
  setCurrentPage(page);
};
```

### 5. Structured Data (JSON-LD)

Use the `structuredData` from API responses for SEO:

```javascript
// Next.js example
import Head from 'next/head';

function BlogPostPage({ post, structuredData }) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      {/* Post content */}
    </>
  );
}
```

---

## 🌍 Locale Handling

### Supported Locales

The API supports any enabled language. Common locales:
- `en` - English (default)
- `de` - German
- `fr` - French
- `ar` - Arabic
- `es` - Spanish

### Locale Validation

The API validates the requested locale against enabled languages. If a disabled language is requested, it returns a 400 error.

### Fallback Behavior

- If requested locale translation is missing → falls back to primary language
- If requested locale is disabled → returns 400 error

### Example: Multi-language Support

```javascript
// Get posts in different languages
const englishPosts = await getBlogPosts({ locale: 'en' });
const germanPosts = await getBlogPosts({ locale: 'de' });

// Get post with language switching
const post = await getBlogPost('post-slug', currentLocale);
```

---

## 🔍 Search Functionality

The search parameter searches across:
- Post titles
- Post excerpts
- Category names
- Tag names

**Example:**
```javascript
const results = await getBlogPosts({
  search: 'AI',
  locale: 'en',
});
```

---

## 📊 Filtering

### By Category

```javascript
const posts = await getBlogPosts({
  category: 'productivity',
  locale: 'en',
});
```

**Note:** Category slug must match the locale (e.g., `productivity` for English, `produktivitat` for German).

### By Tag

```javascript
// Single tag
const posts = await getBlogPosts({
  tag: 'ai',
  locale: 'en',
});

// Multiple tags (posts that have ALL tags)
const posts = await getBlogPosts({
  tag: ['ai', 'frontend'],
  locale: 'en',
});
```

**Note:** Tag slug must match the locale.

---

## 🖼️ Image URLs

### Image Path Format

Images are returned as relative paths or absolute URLs:
- Relative: `/storage/blog/featured-images/image.jpg`
- Absolute: `https://flowxtra.com/storage/blog/featured-images/image.jpg`

### Building Absolute URLs

```javascript
function getImageUrl(imagePath) {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath; // Already absolute
  }
  
  // Build absolute URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://flowxtra.com';
  return `${baseUrl}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
}

// Usage
const imageUrl = getImageUrl(post.image);
```

---

## 📅 Date Formatting

### Date Fields

- `date`: `"2024-01-15"` (YYYY-MM-DD) - for display
- `datePublished`: `"2024-01-15T00:00:00+00:00"` (ISO 8601) - for structured data
- `updatedAt`: `"2024-01-20"` (YYYY-MM-DD) - for display
- `dateModified`: `"2024-01-20T00:00:00+00:00"` (ISO 8601) - for structured data

### Formatting Dates

```javascript
// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Usage
const formattedDate = formatDate(post.date); // "January 15, 2024"
```

---

## 🏷️ Tags Handling

Tags are returned as an array of objects with `id`, `name`, and `slug`. Use slugs for filtering and URLs.

```javascript
// Display tags
post.tags?.map(tag => (
  <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
    {tag.name}
  </Link>
));

// Filter by tag
const posts = await getBlogPosts({
  tag: selectedTag.slug,
  locale: 'en',
});
```

---

## 👤 Author Information

Author information is optional. Always check if author exists:

```javascript
{post.author && (
  <div className="author">
    {post.author.photo && (
      <img src={getImageUrl(post.author.photo)} alt={post.author.name} />
    )}
    <h3>{post.author.name}</h3>
    {post.author.shortBio && <p>{post.author.shortBio}</p>}
  </div>
)}
```

---

## 🔗 URL Building

### Post URLs

Build post URLs using the slug and locale:

```javascript
function getPostUrl(post, locale) {
  return `/${locale}/blog/${post.slug}`;
}

// Usage
const postUrl = getPostUrl(post, 'en');
// Result: /en/blog/how-ai-is-transforming-frontend-development
```

### Category URLs

```javascript
function getCategoryUrl(category, locale) {
  return `/${locale}/blog?category=${category.slug}`;
}
```

### Tag URLs

```javascript
function getTagUrl(tag, locale) {
  return `/${locale}/blog?tag=${tag.slug}`;
}
```

---

## 📱 Responsive Images

Use the `image` field for featured images. For responsive images, you may need to implement image optimization:

```javascript
// Next.js Image component
import Image from 'next/image';

<Image
  src={getImageUrl(post.image)}
  alt={post.title}
  width={1200}
  height={600}
  layout="responsive"
/>
```

---

## 🎨 Content Rendering

### HTML Content

The `content` field contains HTML. Render it safely:

```javascript
// React
<div dangerouslySetInnerHTML={{ __html: post.content }} />

// Vue
<div v-html="post.content"></div>
```

### Content Images

Images in content are included in the HTML. Ensure they are accessible:

```javascript
// Process content images
function processContentImages(html) {
  // Replace relative image paths with absolute URLs
  return html.replace(
    /src="([^"]+)"/g,
    (match, path) => `src="${getImageUrl(path)}"`
  );
}
```

---

## 🗺️ Sitemap Generation

Use the API to generate sitemaps:

```javascript
async function generateSitemap() {
  const allPosts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await getBlogPosts({
      page,
      limit: 100,
      locale: 'en',
    });

    allPosts.push(...response.data.posts);
    hasMore = response.data.pagination.hasNextPage;
    page++;
  }

  // Generate sitemap XML
  const sitemap = generateSitemapXML(allPosts);
  return sitemap;
}
```

---

## 🧪 Testing

### Test API Connection

```javascript
// Test if API is accessible
async function testApiConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/blog?page=1&limit=1`);
    return response.ok;
  } catch (error) {
    console.error('API connection failed:', error);
    return false;
  }
}
```

---

## 📚 Additional Resources

- **API Documentation**: See `BLOG_API_REQUIREMENTS.md` for complete backend specifications
- **Swagger UI**: Available at `/api-docs/` (if configured)
- **Structured Data**: See [Schema.org BlogPosting](https://schema.org/BlogPosting)

---

## 🆘 Support

For issues or questions:
- Check API response errors for detailed messages
- Verify locale is enabled in Blog Settings
- Ensure site/domain is correctly configured
- Check Laravel logs for server-side errors

---

**Last Updated:** 2025-11-07  
**API Version:** 1.0.0

