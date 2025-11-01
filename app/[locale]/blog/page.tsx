'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo, Suspense } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function BlogContent() {
  const t = useTranslations('blog');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Get page from URL params for SEO
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const postsPerPage = viewMode === 'grid' ? 9 : 6; // 3 columns × 3 rows for grid, 6 for list

  // Get current locale from pathname
  const currentLocale = pathname.startsWith('/de') ? 'de' : pathname.startsWith('/en') ? 'en' : 'en';

  // Hide footer on blog page
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }
    return () => {
      // Show footer again when leaving blog page
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  // Mock data for latest post - Replace with API call later
  const latestPost = {
    id: 1,
    title: "How AI is Transforming Frontend Development",
    excerpt: "Explore how tools like GitHub Copilot, AI design generators, and code assistants are changing the way developers build UIs and ship features faster.",
    category: "Innovation Spotlight",
    image: "/img/blog/latest-post.jpg", // Placeholder - replace with actual image
    slug: "how-ai-is-transforming-frontend-development",
    date: "2024-01-15",
  };

  // Mock data for blog posts - Replace with API call later
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`);
  // const data = await response.json();
  // const allPosts = data.posts;
  // const categoriesFromAPI = data.categories; // Should include { id, name, slug } from backend

  const allPosts = [
    {
      id: 1,
      title: "How AI is Transforming Frontend Development",
      excerpt: "Explore how tools like GitHub Copilot, AI design generators, and code assistants are changing the way developers build UIs and ship features faster.",
      category: "Productivity",
      categoryId: 1,
      image: "/img/blog/post-1.jpg",
      slug: "how-ai-is-transforming-frontend-development",
      date: "2024-01-15",
      time: "5 min read",
    },
    {
      id: 2,
      title: "5 VS Code Extensions That Will Save You Hours",
      excerpt: "Discover must-have extensions to boost your coding efficiency and streamline your workflow.",
      category: "Productivity",
      categoryId: 1,
      image: "/img/blog/post-2.jpg",
      slug: "5-vs-code-extensions",
      date: "2024-01-10",
      time: "3 min read",
    },
    {
      id: 3,
      title: "Time Management for Developers: What Really Works",
      excerpt: "Learn proven strategies to avoid burnout and stay on top of your tasks without stress.",
      category: "Productivity",
      categoryId: 1,
      image: "/img/blog/post-3.jpg",
      slug: "time-management-for-developers",
      date: "2024-01-05",
      time: "7 min read",
    },
    {
      id: 4,
      title: "Automate Your Workflow with Task Runners",
      excerpt: "Use tools like Gulp, npm scripts, and GitHub Actions to automate repetitive development tasks.",
      category: "Productivity",
      categoryId: 1,
      image: "/img/blog/post-4.jpg",
      slug: "automate-your-workflow",
      date: "2023-12-28",
      time: "6 min read",
    },
    {
      id: 5,
      title: "Building Accessible Web Applications",
      excerpt: "A comprehensive guide to making your websites accessible to all users, following WCAG guidelines.",
      category: "Accessibility",
      categoryId: 2,
      image: "/img/blog/post-5.jpg",
      slug: "building-accessible-web-applications",
      date: "2023-12-20",
      time: "10 min read",
    },
    {
      id: 6,
      title: "Performance Optimization Techniques",
      excerpt: "Learn how to optimize your applications for better performance and faster load times.",
      category: "Performance",
      categoryId: 3,
      image: "/img/blog/post-6.jpg",
      slug: "performance-optimization-techniques",
      date: "2023-12-15",
      time: "8 min read",
    },
    {
      id: 7,
      title: "Modern CSS Techniques You Should Know",
      excerpt: "Discover the latest CSS features including Grid, Flexbox, and CSS custom properties that make styling easier.",
      category: "Productivity",
      categoryId: 1,
      image: "/img/blog/post-7.jpg",
      slug: "modern-css-techniques",
      date: "2023-12-10",
      time: "6 min read",
    },
    {
      id: 8,
      title: "TypeScript Best Practices for Large Projects",
      excerpt: "Learn how to structure your TypeScript codebase for scalability and maintainability in enterprise applications.",
      category: "Productivity",
      categoryId: 1,
      image: "/img/blog/post-8.jpg",
      slug: "typescript-best-practices",
      date: "2023-12-05",
      time: "9 min read",
    },
    {
      id: 9,
      title: "Understanding React Hooks Deep Dive",
      excerpt: "A comprehensive guide to React Hooks, from useState to custom hooks and advanced patterns.",
      category: "Productivity",
      categoryId: 1,
      image: "/img/blog/post-9.jpg",
      slug: "react-hooks-deep-dive",
      date: "2023-11-30",
      time: "12 min read",
    },
    {
      id: 10,
      title: "Accessibility Testing Tools and Methods",
      excerpt: "Explore the best tools and techniques for testing web accessibility and ensuring WCAG compliance.",
      category: "Accessibility",
      categoryId: 2,
      image: "/img/blog/post-10.jpg",
      slug: "accessibility-testing-tools",
      date: "2023-11-25",
      time: "7 min read",
    },
    {
      id: 11,
      title: "Screen Reader Optimization Guide",
      excerpt: "Learn how to optimize your websites for screen readers and improve the experience for visually impaired users.",
      category: "Accessibility",
      categoryId: 2,
      image: "/img/blog/post-11.jpg",
      slug: "screen-reader-optimization",
      date: "2023-11-20",
      time: "8 min read",
    },
    {
      id: 12,
      title: "Color Contrast and Web Accessibility",
      excerpt: "Understanding color contrast ratios and how to ensure your designs meet accessibility standards.",
      category: "Accessibility",
      categoryId: 2,
      image: "/img/blog/post-12.jpg",
      slug: "color-contrast-accessibility",
      date: "2023-11-15",
      time: "5 min read",
    },
    {
      id: 13,
      title: "Website Speed Optimization Strategies",
      excerpt: "Essential techniques to improve your website's loading speed and overall performance metrics.",
      category: "Performance",
      categoryId: 3,
      image: "/img/blog/post-13.jpg",
      slug: "website-speed-optimization",
      date: "2023-11-10",
      time: "10 min read",
    },
    {
      id: 14,
      title: "Lazy Loading Images for Better Performance",
      excerpt: "Implement lazy loading strategies to reduce initial page load time and improve user experience.",
      category: "Performance",
      categoryId: 3,
      image: "/img/blog/post-14.jpg",
      slug: "lazy-loading-images",
      date: "2023-11-05",
      time: "6 min read",
    },
    {
      id: 15,
      title: "Code Splitting and Bundle Optimization",
      excerpt: "Learn how to split your JavaScript bundles effectively to reduce load times and improve performance.",
      category: "Performance",
      categoryId: 3,
      image: "/img/blog/post-15.jpg",
      slug: "code-splitting-bundle-optimization",
      date: "2023-10-30",
      time: "9 min read",
    },
    {
      id: 16,
      title: "GraphQL vs REST API: Making the Right Choice",
      excerpt: "A detailed comparison of GraphQL and REST APIs to help you choose the right approach for your project.",
      category: "Productivity",
      categoryId: 1,
      image: "/img/blog/post-16.jpg",
      slug: "graphql-vs-rest-api",
      date: "2023-10-25",
      time: "11 min read",
    },
    {
      id: 17,
      title: "Database Optimization Techniques",
      excerpt: "Essential strategies for optimizing database queries and improving application performance.",
      category: "Performance",
      categoryId: 3,
      image: "/img/blog/post-17.jpg",
      slug: "database-optimization-techniques",
      date: "2023-10-20",
      time: "8 min read",
    },
    {
      id: 18,
      title: "Responsive Design Best Practices",
      excerpt: "Modern approaches to creating responsive layouts that work seamlessly across all device sizes.",
      category: "Accessibility",
      categoryId: 2,
      image: "/img/blog/post-18.jpg",
      slug: "responsive-design-best-practices",
      date: "2023-10-15",
      time: "7 min read",
    },
  ];

  // Mock categories from backend - Replace with API call
  // Expected API response format:
  // { id: number, name: string, slug: string, translations: { en: string, de: string } }
  const categoriesFromAPI = [
    { id: 1, name: "Productivity", slug: "productivity", translations: { en: "Productivity", de: "Produktivität" } },
    { id: 2, name: "Accessibility", slug: "accessibility", translations: { en: "Accessibility", de: "Barrierefreiheit" } },
    { id: 3, name: "Performance", slug: "performance", translations: { en: "Performance", de: "Leistung" } },
  ];

  // Get categories list with "All" option
  const categories = ['all', ...categoriesFromAPI.map(cat => cat.slug)];

  // Filter posts by selected categories
  const filteredPosts = useMemo(() => {
    if (selectedCategories.includes('all')) {
      return allPosts;
    }
    return allPosts.filter(post => {
      const categorySlug = categoriesFromAPI.find(cat => cat.id === post.categoryId)?.slug;
      return categorySlug && selectedCategories.includes(categorySlug);
    });
  }, [selectedCategories, allPosts]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when categories change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      router.replace(`${pathname}?page=1`);
    }
  }, [selectedCategories, currentPage, totalPages, pathname, router]);

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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
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
          <div className="lg:col-span-5">
            {/* Latest Post Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-md mx-auto lg:mx-0">
              {/* Category Badge */}
              <div className="px-4 pt-4">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {latestPost.category}
                </span>
              </div>

              {/* Image */}
              <Link href={`/blog/${latestPost.slug}`} className="block cursor-pointer">
                <div className="relative w-full h-48 md:h-56 lg:h-64 mt-3">
                  <Image
                    src={latestPost.image}
                    alt={latestPost.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    quality={100}
                    unoptimized
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23e5e7eb" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="24" fill="%239ca3af"%3EImage%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-4 md:p-5">
                <Link href={`/blog/${latestPost.slug}`}>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary dark:hover:text-secondary transition-colors cursor-pointer">
                    {latestPost.title}
                  </h2>
                </Link>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {latestPost.excerpt}
                </p>
                <Link
                  href={`/blog/${latestPost.slug}`}
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

          {/* Category Filters and View Mode */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
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
                    : categoriesFromAPI.find(cat => cat.slug === category)?.translations?.[currentLocale as 'en' | 'de'] || 
                      categoriesFromAPI.find(cat => cat.slug === category)?.name || 
                      category
                  }
                </button>
              );
            })}
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

          {/* Blog Posts - Grid or List View */}
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
                  href={`/blog/${post.slug}`} 
                  className={viewMode === 'list' ? 'block cursor-pointer flex-shrink-0' : 'block cursor-pointer'}
                >
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-56 h-40 flex-shrink-0 rounded-lg' : 'w-full aspect-[16/10]'} ${viewMode === 'grid' ? 'mt-3 rounded-lg' : ''}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      quality={100}
                      unoptimized
                      sizes={viewMode === 'list' ? '224px' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect fill="%23e5e7eb" width="800" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="24" fill="%239ca3af"%3EImage%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className={`${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''} ${viewMode === 'grid' ? 'p-4' : 'px-0 py-2'}`}>
                  {/* Category Badge */}
                  <div className="mb-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {categoriesFromAPI.find(cat => cat.id === post.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
                       categoriesFromAPI.find(cat => cat.id === post.categoryId)?.name || 
                       post.category}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
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
                    <span>{post.time}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors"
                  >
                    {t('readMore')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
              {/* Previous Button */}
              {currentPage > 1 ? (
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = 
                    page === 1 || 
                    page === totalPages || 
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
              {currentPage < totalPages ? (
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

