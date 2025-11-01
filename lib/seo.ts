/**
 * SEO Helper Functions
 * Generate JSON-LD structured data for blog posts and blog listing
 */

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  slug: string;
  date: string;
  time?: string;
  author?: string;
  authorImage?: string;
  image: string;
  category: string;
  categoryId?: number;
}

interface BlogPostSchemaOptions {
  post: BlogPost;
  locale: string;
  baseUrl?: string;
}

interface BlogListingSchemaOptions {
  posts: BlogPost[];
  locale: string;
  baseUrl?: string;
}

/**
 * Generate JSON-LD schema for a single blog post
 */
export function generateBlogPostSchema({
  post,
  locale,
  baseUrl = "https://flowxtra.com",
}: BlogPostSchemaOptions) {
  const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${baseUrl}${post.image}`;

  const authorImageUrl = post.authorImage
    ? post.authorImage.startsWith("http")
      ? post.authorImage
      : `${baseUrl}${post.authorImage}`
    : undefined;

  // Format date to ISO 8601
  const datePublished = new Date(post.date).toISOString();
  const dateModified = datePublished; // You can update this when post is modified

  // Extract text from HTML content for articleBody
  const articleBody = post.content
    ? post.content.replace(/<[^>]*>/g, "").substring(0, 500)
    : post.excerpt;

  // Calculate word count
  const wordCount = post.content
    ? post.content.replace(/<[^>]*>/g, "").split(/\s+/).length
    : post.excerpt.split(/\s+/).length;

  // Parse reading time (e.g., "5 min read" -> "PT5M")
  const timeRequired = post.time
    ? post.time.replace(/(\d+)\s*min/i, "PT$1M").replace(/\s*read/i, "")
    : "PT5M";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [imageUrl],
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: post.author || "Flowxtra Team",
      ...(authorImageUrl && {
        image: authorImageUrl,
        url: `${baseUrl}/blog/author/${post.author
          ?.toLowerCase()
          .replace(/\s+/g, "-")}`,
      }),
    },
    publisher: {
      "@type": "Organization",
      name: "Flowxtra GmbH",
      legalName: "Flowxtra GmbH",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/wp-content/uploads/2025/02/Signature@2x.png`,
      },
    },
    description: post.excerpt,
    articleBody: articleBody,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
    articleSection: post.category,
    category: post.category,
    keywords: [
      post.category.toLowerCase(),
      ...post.title
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > 3),
      ...post.excerpt
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > 5)
        .slice(0, 5),
    ],
    wordCount: wordCount,
    timeRequired: timeRequired,
    about: {
      "@type": "Thing",
      name: post.category,
      description: `${post.category} articles and insights`,
    },
  };

  return schema;
}

/**
 * Generate JSON-LD schema for blog listing page
 */
export function generateBlogListingSchema({
  posts,
  locale,
  baseUrl = "https://flowxtra.com",
}: BlogListingSchemaOptions) {
  const blogUrl = `${baseUrl}/${locale}/blog`;

  const blogPosts = posts.slice(0, 10).map((post) => ({
    "@type": "BlogPosting" as const,
    headline: post.title,
    url: `${baseUrl}/${locale}/blog/${post.slug}`,
    datePublished: new Date(post.date).toISOString(),
    image: post.image.startsWith("http")
      ? post.image
      : `${baseUrl}${post.image}`,
    description: post.excerpt,
    author: {
      "@type": "Person" as const,
      name: post.author || "Flowxtra Team",
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Flowxtra Blog",
    description:
      "Discover insights on frontend development, productivity tools, accessibility, performance optimization, and modern web development practices.",
    url: blogUrl,
    inLanguage: locale === "de" ? ["de-DE", "en-US"] : ["en-US", "de-DE"],
    publisher: {
      "@type": "Organization",
      name: "Flowxtra GmbH",
      legalName: "Flowxtra GmbH",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/wp-content/uploads/2025/02/Signature@2x.png`,
      },
    },
    blogPost: blogPosts,
    keywords: [
      "web development blog",
      "frontend development articles",
      "developer productivity",
      "coding tips and tricks",
      "software development blog",
      "programming tutorials",
      "tech blog",
      "web development insights",
      "developer resources",
      "coding best practices",
    ],
  };

  return schema;
}
