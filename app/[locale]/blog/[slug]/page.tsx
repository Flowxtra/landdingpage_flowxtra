'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { generateBlogPostSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { getBlogPost, getBlogCategories, getImageUrl, formatDate, formatReadingTime, type BlogPost, type Category } from '@/lib/blogApi';

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog post from API
  useEffect(() => {
    let isMounted = true;
    
    const fetchPost = async (forceRefresh: boolean = false) => {
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
            forceRefresh,
            timestamp: new Date().toISOString(),
          });
        }
        
        // Force fresh data by using cache: "no-store" option
        // This ensures we always get the latest content from API
        // Add forceRefresh flag to add timestamp to URL and prevent any caching
        // Always use forceRefresh=true to ensure we get the latest content from API
        const response = await getBlogPost(slug, currentLocale, {
          cache: "no-store",
          forceRefresh: true, // Always force refresh to get latest content
        });
        
        // Only update state if component is still mounted
        if (!isMounted) return;
        
        if (response.success && response.data) {
          setPost(response.data.post);
          setRelatedPosts(response.data.relatedPosts || []);
        } else {
          setError('Post not found');
        }

        // Fetch categories (optional - don't fail if endpoint doesn't exist)
        try {
          const categoriesResponse = await getBlogCategories(currentLocale);
          if (isMounted && categoriesResponse.success && categoriesResponse.data) {
            setCategories(categoriesResponse.data.categories);
          }
        } catch (categoriesError) {
          // Categories endpoint might not exist - this is optional
          console.warn('[Blog Post Page] Could not fetch categories (endpoint may not exist):', categoriesError);
          // Continue without categories - not critical
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

    // Initial fetch
    fetchPost();

    // Refresh on window focus (when user comes back to tab)
    // This ensures fresh content when user returns to the page
    const handleFocus = () => {
      // Only refresh if page is visible
      if (document.visibilityState === 'visible') {
        fetchPost(true);
      }
    };

    // Refresh on visibility change (when tab becomes visible)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchPost(true);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [slug, currentLocale, pathname, params]);

  // Get category name
  const categoryName = post ? (
    categories.find(cat => cat.id === post.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
    categories.find(cat => cat.id === post.categoryId)?.name || 
    post.category
  ) : '';

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
  // Adapt post data to match schema generator's expected format
  const blogPostSchema = generateBlogPostSchema({
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
            <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Link href={`/${currentLocale}`} className="hover:text-primary dark:hover:text-secondary transition-colors">
                Home
              </Link>
              {' / '}
              <Link href={`/${currentLocale}/blog`} className="hover:text-primary dark:hover:text-secondary transition-colors">
                Blog
              </Link>
              {' / '}
              <span className="text-gray-700 dark:text-gray-300">{post.title}</span>
            </nav>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
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
      <section className="w-full py-12 md:py-16 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Post Content */}
            <article 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || '' }}
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
                        unoptimized
                      />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {post.author.name}
                    </h3>
                    {post.author.shortBio && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {post.author.shortBio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
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
                const relatedCategoryName = categories.find(cat => cat.id === relatedPost.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
                                           categories.find(cat => cat.id === relatedPost.categoryId)?.name || 
                                           relatedPost.category;
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
                          unoptimized
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
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {relatedCategoryName}
                        </span>
                      </div>

                      <Link href={`/${currentLocale}/blog/${relatedPost.slug}`}>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 hover:text-primary dark:hover:text-secondary transition-colors cursor-pointer text-lg">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                        {relatedPost.excerpt}
                      </p>
                      
                      {/* Date and Time */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <span>{formatDate(relatedPost.date)}</span>
                        <span>•</span>
                        <span>{formatReadingTime(relatedPost.readingTime)}</span>
                      </div>

                      <Link
                        href={`/${currentLocale}/blog/${relatedPost.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors"
                      >
                        {t('readMore')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
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

