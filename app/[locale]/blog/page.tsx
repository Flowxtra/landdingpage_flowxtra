'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState, useMemo, Suspense, useRef } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { generateBlogListingSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { getBlogPosts, getBlogCategories, getImageUrl, formatDate, formatReadingTime, type BlogPost, type Category } from '@/lib/blogApi';

// Get API base URL for logging
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return 'N/A';
  return process.env.NEXT_PUBLIC_API_URL || 
         (process.env.NODE_ENV === 'development' 
           ? process.env.NEXT_PUBLIC_developemant_BACKEND_URL 
           : process.env.NEXT_PUBLIC_BACKEND_URL) || 'N/A';
};

function BlogContent() {
  const t = useTranslations('blog');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchModalInputRef = useRef<HTMLInputElement>(null);
  
  // API State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get page from URL params for SEO
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const postsPerPage = viewMode === 'grid' ? 9 : 6; // 3 columns × 3 rows for grid, 6 for list

  // Get current locale from pathname
  const currentLocale = pathname.startsWith('/de') ? 'de' : pathname.startsWith('/en') ? 'en' : 'en';

  // Handle Command/Ctrl+K keyboard shortcut for search modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if K is pressed with modifier keys (Cmd/Ctrl+K)
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setShowSearchModal(true);
      }
      // Close modal on Escape
      if (event.key === 'Escape' && showSearchModal) {
        event.preventDefault();
        setShowSearchModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSearchModal]);

  // Focus search input when modal opens
  useEffect(() => {
    if (showSearchModal && searchModalInputRef.current) {
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        searchModalInputRef.current?.focus();
      }, 100);
    }
  }, [showSearchModal]);

  // Fetch blog posts and categories from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check if "all" is selected
        const isAllSelected = selectedCategories.includes('all');
        
        // If "all" is selected, we need to fetch posts without category filter
        // However, if API has a bug and returns only 1 post, we'll try a workaround
        let apiParams: any = {
          page: currentPage,
          limit: postsPerPage,
          locale: currentLocale,
        };

        // Add category filter if not 'all'
        const selectedCategory = selectedCategories.find(cat => cat !== 'all');
        if (selectedCategory) {
          apiParams.category = selectedCategory;
        }
        // Note: When 'all' is selected, we don't add category filter
        // This should return all posts from API
        // If API returns only 1 post when no category is specified, 
        // this is a backend API issue that needs to be fixed

        // Add search query if exists
        if (searchQuery.trim()) {
          apiParams.search = searchQuery.trim();
        }

        // Debug: Log API params (always log to help debug)
        console.log("[Blog List] Fetching posts with params:", {
          ...apiParams,
          selectedCategories,
          isAllSelected,
          postsPerPage,
          currentPage,
        });

        // Fetch posts
        let postsResponse = await getBlogPosts(apiParams);
        
        // Workaround: If "all" is selected but API returns only 1 post,
        // try fetching with a higher limit or without pagination
        if (isAllSelected && 
            postsResponse.success && 
            postsResponse.data?.posts?.length === 1 && 
            postsResponse.data?.pagination?.totalPosts === 1) {
          console.warn("[Blog List] ⚠️ API returned only 1 post when 'all' is selected. Trying workaround...");
          
          // Try fetching with a much higher limit
          const workaroundParams = {
            ...apiParams,
            limit: 100, // Try to get more posts
            page: 1, // Start from page 1
          };
          
          console.log("[Blog List] Workaround: Fetching with higher limit:", workaroundParams);
          const workaroundResponse = await getBlogPosts(workaroundParams);
          
          if (workaroundResponse.success && 
              workaroundResponse.data?.posts && 
              workaroundResponse.data.posts.length > 1) {
            console.log("[Blog List] ✅ Workaround successful! Got", workaroundResponse.data.posts.length, "posts");
            postsResponse = workaroundResponse;
          } else {
            console.warn("[Blog List] ❌ Workaround failed. API still returns limited posts.");
            console.warn("[Blog List] This is a backend API issue. Please check the API endpoint.");
          }
        }
        
        if (postsResponse.success && postsResponse.data) {
          const fetchedPosts = postsResponse.data.posts || [];
          
          // Debug: Log first post to verify slug format and image
          if (fetchedPosts.length > 0) {
            const firstPost = fetchedPosts[0];
            console.log("[Blog List] First post sample:", {
              id: firstPost.id,
              title: firstPost.title,
              slug: firstPost.slug,
              locale: currentLocale,
              categorySlug: firstPost.categorySlug,
              image: firstPost.image,
              imageUrl: getImageUrl(firstPost.image || ''),
              hasImage: !!firstPost.image,
            });
            
            // Log all posts images for debugging
            console.log("[Blog List] All posts images:", fetchedPosts.map(post => ({
              id: post.id,
              title: post.title,
              image: post.image,
              imageUrl: getImageUrl(post.image || ''),
            })));
          }
          
          setPosts(fetchedPosts);
          setPagination(postsResponse.data.pagination);
          
          // Debug: Log fetched results (always log to help debug)
          console.log("[Blog List] Fetched posts:", {
            count: fetchedPosts.length,
            totalPosts: postsResponse.data.pagination?.totalPosts,
            currentPage: postsResponse.data.pagination?.currentPage,
            totalPages: postsResponse.data.pagination?.totalPages,
            hasNextPage: postsResponse.data.pagination?.hasNextPage,
            hasPreviousPage: postsResponse.data.pagination?.hasPreviousPage,
            selectedCategories,
            isAllSelected: selectedCategories.includes('all'),
            requestedLimit: postsPerPage,
            requestedPage: currentPage,
          });
          
          // Warning: If "all" is selected but API returns only 1 post, this is a backend issue
          if (selectedCategories.includes('all') && 
              fetchedPosts.length === 1 && 
              postsResponse.data.pagination?.totalPosts === 1) {
            console.warn("[Blog List] ⚠️ API returned only 1 post when 'all' is selected. This indicates a backend API issue.");
            console.warn("[Blog List] Expected: All posts. Got: 1 post only.");
            const apiBaseUrl = getApiBaseUrl();
            console.warn("[Blog List] API URL:", `${apiBaseUrl}/blog?page=${currentPage}&limit=${postsPerPage}&locale=${currentLocale}`);
          }
          
          // Log first few posts for debugging
          if (fetchedPosts.length > 0) {
            console.log("[Blog List] Sample posts:", fetchedPosts.slice(0, 3).map(p => ({
              id: p.id,
              title: p.title,
              slug: p.slug,
              category: p.category,
              categorySlug: p.categorySlug,
            })));
          }
          
          // Set categories if provided
          if (postsResponse.data.categories) {
            setCategories(postsResponse.data.categories);
          }
        }

        // Fetch categories separately if not included in posts response (optional)
        if (!postsResponse.data?.categories) {
          try {
            const categoriesResponse = await getBlogCategories(currentLocale);
            if (categoriesResponse.success && categoriesResponse.data) {
              setCategories(categoriesResponse.data.categories);
            }
          } catch (categoriesError) {
            // Categories endpoint might not exist - this is optional
            console.warn('[Blog List] Could not fetch categories (endpoint may not exist):', categoriesError);
            // Continue without categories - not critical
            // Categories will be empty, which is fine
          }
        }
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
        setPosts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, postsPerPage, currentLocale, selectedCategories, searchQuery]);

  // Get first post (oldest post from API - last in array)
  // The API returns posts sorted by date (newest first), so the oldest is the last one
  const latestPost = posts.length > 0 ? posts[posts.length - 1] : null;

  // Filter posts by search query for modal (all posts from API)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || posts.length === 0) {
      return [];
    }
    const query = searchQuery.toLowerCase().trim();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    ).slice(0, 6); // Limit to 6 results in modal
  }, [searchQuery, posts]);

  // Use posts directly from API (already filtered by API)
  const currentPosts = posts;
  
  // Get categories list with "All" option
  const categoriesList = ['all', ...categories.map(cat => cat.slug)];

  // Reset to page 1 when categories or search query change
  useEffect(() => {
    if (pagination && currentPage > pagination.totalPages && pagination.totalPages > 0) {
      router.replace(`${pathname}?page=1`);
    }
  }, [selectedCategories, searchQuery, currentPage, pagination, pathname, router]);

  // Handle category toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (category === 'all') {
        // If "All" is clicked, toggle it alone
        return prev.includes('all') ? [] : ['all'];
      } else {
        // Remove "all" if it's selected
        let newCategories = prev.filter(cat => cat !== 'all');
        
        // Toggle the category
        if (newCategories.includes(category)) {
          newCategories = newCategories.filter(cat => cat !== category);
        } else {
          newCategories = [...newCategories, category];
        }
        
        // If no categories selected, select "all"
        return newCategories.length === 0 ? ['all'] : newCategories;
      }
    });
    router.replace(`${pathname}?page=1`);
  };

  // Check if category is selected
  const isCategorySelected = (category: string) => {
    if (category === 'all') {
      return selectedCategories.includes('all');
    }
    return selectedCategories.includes(category);
  };

  // Generate page URL for SEO
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    const queryString = params.toString();
    return `${pathname}${queryString ? `?${queryString}` : ''}`;
  };


  // Generate JSON-LD schema for blog listing page
  // Adapt posts data to match schema generator's expected format
  const blogListingSchema = generateBlogListingSchema({
    posts: posts.map(post => ({
      ...post,
      author: post.author?.name,
      authorImage: post.author?.photo,
      time: formatReadingTime(post.readingTime),
    })),
    locale: currentLocale,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* JSON-LD Schema for SEO */}
      <JsonLd data={blogListingSchema} />
      {/* Search Modal */}
      {showSearchModal && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSearchModal(false);
            }
          }}
        >
          <div className="relative w-full max-w-2xl transform transition-all animate-in zoom-in-95 duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-[80vh] flex flex-col">
              {/* Search Input */}
              <div className="relative border-b border-gray-200 dark:border-gray-700">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={searchModalInputRef}
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-20 py-4 text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none border-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setShowSearchModal(false);
                    }
                  }}
                  autoFocus
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
                    Esc
                  </kbd>
                </div>
              </div>

              {/* Search Results */}
              <div className="overflow-y-auto flex-1 max-h-[60vh]">
                {searchQuery.trim() ? (
                  searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((post) => {
                        const categoryName = categories.find(cat => cat.id === post.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
                                            categories.find(cat => cat.id === post.categoryId)?.name || 
                                            post.category;
                        return (
                          <Link
                            key={post.id}
                            href={`/${currentLocale}/blog/${post.slug}`}
                            onClick={() => setShowSearchModal(false)}
                            className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    {categoryName}
                                  </span>
                                  <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                                  <span className="text-xs text-gray-400 dark:text-gray-500">
                                    {formatDate(post.date)}
                                  </span>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-1">
                                  {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                  {post.excerpt}
                                </p>
                              </div>
                              <svg 
                                className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1 group-hover:text-primary dark:group-hover:text-secondary transition-colors" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        {t('search.noResults', { query: searchQuery })}
                      </p>
                    </div>
                  )
                ) : (
                  <div className="p-8 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      {t('search.startTyping')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* First Section - Same background as homepage hero */}
      <section className="w-full pt-2.5 pb-16 md:pb-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-[#f4f6f8] dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Side - Blog Intro */}
          <div className="lg:col-span-7 flex items-center">
            <div className="w-full">
              {/* Breadcrumbs */}
              <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                <Link href="/" className="hover:text-primary dark:hover:text-secondary transition-colors">
                  Home
                </Link>
                {' / '}
                <span className="text-gray-700 dark:text-gray-300">Blogs</span>
              </nav>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t('title')}
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('description')}
              </p>
            </div>
          </div>

          {/* Right Side - Latest Post */}
          {latestPost && (
            <div className="lg:col-span-5">
              {/* Latest Post Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-md mx-auto lg:mx-0">
                {/* Category Badge */}
                <div className="px-4 pt-4">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {categories.find(cat => cat.id === latestPost.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
                     categories.find(cat => cat.id === latestPost.categoryId)?.name || 
                     latestPost.category}
                  </span>
                </div>

                {/* Image */}
                <Link href={`/${currentLocale}/blog/${latestPost.slug}`} className="block cursor-pointer">
                  <div className="relative w-full h-48 md:h-56 lg:h-64 mt-3 overflow-hidden rounded-lg">
                    {latestPost.image ? (
                      <img
                        src={getImageUrl(latestPost.image)}
                        alt={latestPost.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23e5e7eb" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="24" fill="%239ca3af"%3EImage%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <svg className="w-20 h-20 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4 md:p-5">
                  <Link href={`/${currentLocale}/blog/${latestPost.slug}`}>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary dark:hover:text-secondary transition-colors cursor-pointer">
                      {latestPost.title}
                    </h2>
                  </Link>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {latestPost.excerpt}
                  </p>
                  <Link
                    href={`/${currentLocale}/blog/${latestPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors"
                  >
                    {t('discoverFuture')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
          </div>
        </div>
      </section>

      {/* All Blogs Section */}
      <section className="w-full py-16 md:py-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {t('allBlogs')}
          </h2>

          {/* Category Filters, Search, and View Mode */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
            {categoriesList.map((category) => {
              const isSelected = isCategorySelected(category);
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isSelected
                        ? 'bg-primary dark:bg-secondary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {/* Checkbox */}
                  <div className={`
                    w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                    ${
                      isSelected
                        ? 'bg-white border-white'
                        : 'bg-transparent border-gray-400 dark:border-gray-500'
                    }
                  `}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {category === 'all' 
                    ? t('categories.all')
                    : categories.find(cat => cat.slug === category)?.translations?.[currentLocale as 'en' | 'de'] || 
                      categories.find(cat => cat.slug === category)?.name || 
                      category
                  }
                </button>
              );
            })}
            </div>

            {/* Search and View Mode */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Search Input */}
              <div className="relative w-full sm:w-auto">
                <div className="relative flex items-center">
                  <svg
                    className="absolute left-3 w-4 h-4 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={t('search.placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-20 py-2 w-full sm:w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent transition-colors"
                  />
                  <div 
                    className="absolute right-2 flex items-center gap-1 cursor-pointer"
                    onClick={() => setShowSearchModal(true)}
                    title="Press ⌘K to search"
                  >
                    <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
                      ⌘
                    </kbd>
                    <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
                      K
                    </kbd>
                  </div>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('viewMode')}
                </span>
                <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
                  {/* List View Button */}
                  <button
                    onClick={() => setViewMode('list')}
                    className={`
                      p-2 rounded-md transition-colors
                      ${viewMode === 'list'
                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                    `}
                    aria-label={t('viewModeList')}
                  >
                    <svg 
                      className={`w-5 h-5 ${viewMode === 'list' ? 'text-primary dark:text-secondary' : 'text-gray-500 dark:text-gray-400'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  
                  {/* Grid View Button */}
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`
                      p-2 rounded-md transition-colors
                      ${viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                    `}
                    aria-label={t('viewModeGrid')}
                  >
                    <svg 
                      className={`w-5 h-5 ${viewMode === 'grid' ? 'text-primary dark:text-secondary' : 'text-gray-500 dark:text-gray-400'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-16 text-center">
              <div className="text-gray-500 dark:text-gray-400">Loading...</div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="py-16 text-center">
              <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg bg-primary dark:bg-secondary text-white hover:bg-secondary-light dark:hover:bg-secondary-hover transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Blog Posts - Grid or List View */}
          {!loading && !error && currentPosts.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-6'
            }>
              {currentPosts.map((post) => (
              <article
                key={post.id}
                className={`
                  bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow
                  ${viewMode === 'list' ? 'flex flex-row gap-6 p-4' : ''}
                `}
              >
                {/* Image */}
                <Link 
                  href={`/${currentLocale}/blog/${post.slug}`} 
                  className={viewMode === 'list' ? 'block cursor-pointer flex-shrink-0' : 'block cursor-pointer'}
                >
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-56 h-40 flex-shrink-0 rounded-lg' : 'w-full aspect-[16/10]'} ${viewMode === 'grid' ? 'mt-3 rounded-lg' : ''}`}>
                    {post.image ? (
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect fill="%23e5e7eb" width="800" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="24" fill="%239ca3af"%3EImage%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <div className={`${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''} ${viewMode === 'grid' ? 'p-4' : 'px-0 py-2'}`}>
                  {/* Category Badge */}
                  <div className="mb-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {categories.find(cat => cat.id === post.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
                       categories.find(cat => cat.id === post.categoryId)?.name || 
                       post.category}
                    </span>
                  </div>

                  <Link href={`/${currentLocale}/blog/${post.slug}`}>
                    <h3 className={`font-bold text-gray-900 dark:text-white mb-2 hover:text-primary dark:hover:text-secondary transition-colors cursor-pointer ${viewMode === 'list' ? 'text-xl' : 'text-lg'}`}>
                      {post.title}
                    </h3>
                  </Link>
                  <p className={`text-gray-600 dark:text-gray-300 mb-4 leading-relaxed ${viewMode === 'list' ? 'text-base' : 'text-sm'}`}>
                    {post.excerpt}
                  </p>
                  
                  {/* Date and Time */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{formatReadingTime(post.readingTime)}</span>
                  </div>

                  <Link
                    href={`/${currentLocale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors"
                  >
                    <span>
                      {t('readMore')}
                      <span className="sr-only">: {post.title}</span>
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('search.noResultsInPage')}
              </h3>
              {searchQuery && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {t('search.noResults', { query: searchQuery })}
                </p>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories(['all']);
                  router.replace(pathname);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-primary dark:bg-secondary text-white hover:bg-secondary-light dark:hover:bg-secondary-hover"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t('search.clearSearch')}
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && pagination && pagination.totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
              {/* Previous Button */}
              {pagination.hasPreviousPage ? (
                <Link
                  href={getPageUrl(currentPage - 1)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-secondary"
                  aria-label={t('pagination.previous')}
                >
                  {t('pagination.previous')}
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed">
                  {t('pagination.previous')}
                </span>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = 
                    page === 1 || 
                    page === pagination.totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  if (!showPage) {
                    // Show ellipsis
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2 text-gray-500 dark:text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <Link
                      key={page}
                      href={getPageUrl(page)}
                      className={`
                        min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                        ${currentPage === page
                          ? 'bg-primary dark:bg-secondary text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-secondary'
                        }
                      `}
                      aria-label={t('pagination.page', { page })}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </Link>
                  );
                })}
              </div>

              {/* Next Button */}
              {pagination.hasNextPage ? (
                <Link
                  href={getPageUrl(currentPage + 1)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-secondary"
                  aria-label={t('pagination.next')}
                >
                  {t('pagination.next')}
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed">
                  {t('pagination.next')}
                </span>
              )}
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}

