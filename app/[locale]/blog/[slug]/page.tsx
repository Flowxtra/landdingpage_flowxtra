'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState, useRef, useMemo } from 'react';
import { generateBlogPostSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { getBlogPost, getBlogPosts, getImageUrl, formatDate, formatReadingTime, type BlogPost, type PreviousNextPost } from '@/lib/blogApi';
import TableOfContents from '@/components/TableOfContents';
import ProfessionalPlanSidebar from '@/components/ProfessionalPlanSidebar';

// Function to process HTML content and add alt attributes to images, fix heading order, and improve links
function processContentImages(html: string, postTitle: string): string {
  if (!html) return html;
  
  try {
    // Use DOMParser on client-side, or simple regex/string replacement on server-side
    if (typeof window !== 'undefined') {
      // Client-side: Use DOMParser for accurate HTML parsing
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
    
    // Find all images without alt attributes or with empty alt
    const images = doc.querySelectorAll('img');
    images.forEach((img) => {
      // If image doesn't have alt attribute or has empty alt, add descriptive alt
      if (!img.getAttribute('alt') || img.getAttribute('alt') === '') {
        // Try to get alt from title attribute, or use post title as fallback
        const altText = img.getAttribute('title') || 
                       img.getAttribute('aria-label') || 
                       `Image from ${postTitle}`;
        img.setAttribute('alt', altText);
      }
    });
    
    // Note: Heading order is handled by the content structure
    // We don't modify heading tags to preserve their original styling
    
    // Add underline to links for better accessibility
    const links = doc.querySelectorAll('a');
    links.forEach((link) => {
      if (!link.style.textDecoration && !link.className.includes('no-underline')) {
        link.style.textDecoration = 'underline';
        link.style.textDecorationThickness = '1px';
        link.style.textUnderlineOffset = '2px';
      }
    });
    
      return doc.body.innerHTML;
    } else {
      // Server-side: Process HTML without modifying heading tags
      // Heading order should be handled by the content structure
      let processedHtml = html;
      
      // Add alt attributes to images without alt (simple regex approach)
      processedHtml = processedHtml.replace(
        /<img([^>]*?)(?:\s+alt\s*=\s*["'][^"']*["'])?([^>]*?)>/gi,
        (match, before, after) => {
          if (!/<img[^>]*alt\s*=/i.test(match)) {
            // No alt attribute, add one
            return `<img${before} alt="Image from ${postTitle}"${after}>`;
          }
          return match;
        }
      );
      
      // Add underline to links (simple regex approach)
      processedHtml = processedHtml.replace(
        /<a([^>]*?)(?:\s+class\s*=\s*["']([^"']*?)["'])?([^>]*?)>/gi,
        (match, _before, classAttr) => {
          if (classAttr && classAttr.includes('no-underline')) {
            return match; // Skip links with no-underline class
          }
          // Add inline style for underline
          const styleMatch = match.match(/style\s*=\s*["']([^"']*?)["']/i);
          if (styleMatch) {
            // Append to existing style
            return match.replace(
              /style\s*=\s*["']([^"']*?)["']/i,
              `style="$1; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 2px;"`
            );
          } else {
            // Add new style attribute
            return match.replace(/>$/, ' style="text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 2px;">');
          }
        }
      );
      
      return processedHtml;
    }
  } catch (error) {
    // If parsing fails, return original HTML
    if (typeof window !== 'undefined') {
      console.warn('Failed to process content:', error);
    }
    return html;
  }
}

function BlogPostContent() {
  const t = useTranslations('blog');
  const params = useParams();
  const pathname = usePathname();
  const slug = params?.slug as string;
  
  // Get current locale from pathname
  const currentLocale = pathname?.startsWith('/de') ? 'de' : pathname?.startsWith('/en') ? 'en' : 'en';

  // API State
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [previousPost, setPreviousPost] = useState<PreviousNextPost | null>(null);
  const [nextPost, setNextPost] = useState<PreviousNextPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiStructuredData, setApiStructuredData] = useState<Record<string, unknown> | null>(null);
  
  // Ref to track if we've already fetched previous/next posts
  const hasFetchedPreviousNext = useRef<boolean>(false);

  // Fetch blog post from API
  useEffect(() => {
    let isMounted = true;
    
    // Reset previous/next posts when slug changes
    hasFetchedPreviousNext.current = false;
    setPreviousPost(null);
    setNextPost(null);
    
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Debug: Log the slug and locale being used
        if (process.env.NODE_ENV === "development") {
          console.log('[Blog Post Page] Fetching blog post:', { 
            slug, 
            locale: currentLocale,
            pathname,
            params: params,
            forceRefresh: true, // Always true - we always force refresh to get latest content
            timestamp: new Date().toISOString(),
          });
        }
        
        // Force fresh data by using cache: "no-store" option
        // This ensures we always get the latest content from API
        // Add forceRefresh flag to add timestamp to URL and prevent any caching
        // Always use forceRefresh=true to ensure we get the latest content from API
        // Add random query param to completely bypass any cache
        const response = await getBlogPost(slug, currentLocale, {
          cache: "no-store",
          forceRefresh: true, // Always force refresh to get latest content
          revalidate: 0, // No revalidation time - always fetch fresh
        });
        
        // Only update state if component is still mounted
        if (!isMounted) return;
        
        if (response.success && response.data) {
          setPost(response.data.post);
          setRelatedPosts(response.data.relatedPosts || []);
          
          // Store structured data from API if available
          if (response.data.structuredData) {
            setApiStructuredData(response.data.structuredData);
            console.log("[Blog Post] Structured data from API:", {
              type: response.data.structuredData["@type"] || "N/A",
              url: response.data.structuredData.url || "N/A",
              headline: response.data.structuredData.headline || "N/A",
              hasKeywords: !!response.data.structuredData.keywords,
              dateModified: response.data.structuredData.dateModified || "N/A",
            });
          }
          
          // If API provides previous/next posts, use them
          if (response.data.previousPost) {
            setPreviousPost(response.data.previousPost);
            hasFetchedPreviousNext.current = true; // Mark as fetched from API
          }
          if (response.data.nextPost) {
            setNextPost(response.data.nextPost);
            hasFetchedPreviousNext.current = true; // Mark as fetched from API
          }
        } else {
          setError('Post not found');
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching blog post:', err);
        console.error('Failed with slug:', slug, 'locale:', currentLocale);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Initial fetch only - no auto-refresh on tab switch
    // This prevents unnecessary API calls when user switches tabs
    // Data will only refresh when:
    // 1. Page is manually refreshed (F5 / Ctrl+R)
    // 2. User navigates to a different post (slug changes)
    fetchPost();

    // Cleanup
    return () => {
      isMounted = false;
    };
  }, [slug, currentLocale, pathname, params]);

  // Separate useEffect to fetch previous/next posts
  useEffect(() => {
    if (!post) return; // Skip if post not loaded
    if (hasFetchedPreviousNext.current) return; // Skip if already fetched (from API or manually)
    
    let isMounted = true;
    
    const fetchPreviousNextPosts = async () => {
      try {
        // Fetch all posts to find previous and next
        const postsResponse = await getBlogPosts({
          locale: currentLocale,
          limit: 100, // Get enough posts to find neighbors
        });
        
        if (!isMounted) return;
        
        if (postsResponse.success && postsResponse.data.posts) {
          const posts = postsResponse.data.posts;
          const currentIndex = posts.findIndex(p => p.id === post.id);
          
          if (currentIndex !== -1) {
            // Previous post (newer, index - 1)
            if (currentIndex > 0) {
              const prev = posts[currentIndex - 1];
              setPreviousPost({
                id: prev.id,
                title: prev.title,
                slug: prev.slug,
              });
            }
            
            // Next post (older, index + 1)
            if (currentIndex < posts.length - 1) {
              const next = posts[currentIndex + 1];
              setNextPost({
                id: next.id,
                title: next.title,
                slug: next.slug,
              });
            }
          }
        }
        
        // Mark as fetched
        hasFetchedPreviousNext.current = true;
      } catch (err) {
        console.error('Error fetching previous/next posts:', err);
      }
    };

    fetchPreviousNextPosts();
    
    return () => {
      isMounted = false;
    };
  }, [post, currentLocale]); // Only depend on post data and locale

  // Get category name (use post.category directly since categories endpoint doesn't exist)
  const categoryName = post?.category || '';

  // Process content to add alt attributes to images
  const processedContent = useMemo(() => {
    if (!post?.content) return '';
    return processContentImages(post.content, post.title);
  }, [post?.content, post?.title]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Post not found'}
          </h1>
          <Link href={`/${currentLocale}/blog`} className="text-primary dark:text-secondary hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }


  // Generate JSON-LD schema for SEO
  // Use structured data from API if available, otherwise generate it
  const blogPostSchema = apiStructuredData || generateBlogPostSchema({
    post: {
      ...post,
      author: post.author?.name,
      authorImage: post.author?.photo,
      time: formatReadingTime(post.readingTime),
    },
    locale: currentLocale,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* JSON-LD Schema for SEO */}
      <JsonLd data={blogPostSchema} />
      
      {/* First Section - Same background as blog page */}
      <section className="w-full pt-2.5 pb-16 md:pb-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-[#f4f6f8] dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              <Link href={`/${currentLocale}`} className="hover:text-primary dark:hover:text-secondary transition-colors underline decoration-1 underline-offset-2">
                Home
              </Link>
              {' / '}
              <Link href={`/${currentLocale}/blog`} className="hover:text-primary dark:hover:text-secondary transition-colors underline decoration-1 underline-offset-2">
                Blog
              </Link>
              {' / '}
              <span className="text-gray-700 dark:text-gray-200">{post.title}</span>
            </nav>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                {categoryName}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formatReadingTime(post.readingTime)}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{post.author.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-12 md:py-16 px-[10px] bg-white dark:bg-gray-900 transition-colors" aria-label="Blog post content">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
            {/* Table of Contents Sidebar - On the left */}
            {post.content && <TableOfContents content={post.content} />}
            
            {/* Main Content */}
            <div className="flex-1 min-w-0 max-w-4xl w-full lg:w-auto mx-auto">
              {/* Post Content */}
              <article
                className="prose prose-lg max-w-none blog-content dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary dark:prose-a:text-secondary"
                dangerouslySetInnerHTML={{ 
                  __html: processedContent || post.excerpt || '' 
                }}
                aria-label={`Blog post: ${post.title}`}
              />

              {/* Author Section (if available) */}
              {post.author && (
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {post.author.photo ? (
                        <Image
                          src={getImageUrl(post.author.photo)}
                          alt={post.author.name}
                          width={64}
                          height={64}
                          className="rounded-full"
                          quality={100}
                        />
                      ) : (
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {post.author.name}
                      </h2>
                      {post.author.shortBio && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {post.author.shortBio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Previous/Next Post Navigation */}
              {(previousPost || nextPost) && (
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    {/* Previous Post */}
                    {previousPost ? (
                      <Link
                        href={`/${currentLocale}/blog/${previousPost.slug}`}
                        className="flex-1 group flex items-center gap-3 underline decoration-1 underline-offset-2"
                      >
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-secondary transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                            {t('post.previousPost') || 'Previous Post'}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
                            {previousPost.title}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex-1"></div>
                    )}

                    {/* Next Post */}
                    {nextPost ? (
                      <Link
                        href={`/${currentLocale}/blog/${nextPost.slug}`}
                        className="flex-1 group flex items-center gap-3 underline decoration-1 underline-offset-2"
                      >
                        <div className="flex-1 min-w-0 text-right">
                          <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                            {t('post.nextPost') || 'Next Post'}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
                            {nextPost.title}
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-secondary transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <div className="flex-1"></div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Professional Plan Sidebar - On the right */}
            <ProfessionalPlanSidebar />
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="w-full py-16 md:py-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {t('post.relatedPosts')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => {
                const relatedCategoryName = relatedPost.category || '';
                return (
                  <article
                    key={relatedPost.id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Image */}
                    <Link 
                      href={`/${currentLocale}/blog/${relatedPost.slug}`} 
                      className="block cursor-pointer"
                    >
                      <div className="relative w-full aspect-[16/10] mt-3 rounded-lg overflow-hidden">
                        <Image
                          src={getImageUrl(relatedPost.image)}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                          quality={100}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect fill="%23e5e7eb" width="800" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="24" fill="%239ca3af"%3EImage%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-4">
                      {/* Category Badge */}
                      <div className="mb-2">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                          {relatedCategoryName}
                        </span>
                      </div>

                      <Link 
                        href={`/${currentLocale}/blog/${relatedPost.slug}`}
                        className="underline decoration-1 underline-offset-2"
                      >
                        <h2 className="font-bold text-gray-900 dark:text-white mb-2 hover:text-primary dark:hover:text-secondary transition-colors cursor-pointer text-lg">
                          {relatedPost.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                        {relatedPost.excerpt}
                      </p>
                      
                      {/* Date and Time */}
                      <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-300 mb-4">
                        <span>{formatDate(relatedPost.date)}</span>
                        <span>•</span>
                        <span>{formatReadingTime(relatedPost.readingTime)}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function BlogPostPage() {
  return <BlogPostContent />;
}

