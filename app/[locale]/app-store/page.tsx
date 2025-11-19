"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState, useMemo, Suspense, useRef, type SyntheticEvent } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { getApps, getAppCategories, getImageUrl, type App, type AppCategory, type AppsResponse } from '@/lib/appStoreApi';

type AppsQueryParams = Parameters<typeof getApps>[0];
type PaginationInfo = AppsResponse["data"]["pagination"];

function AppStoreContent() {
  const t = useTranslations('appStore');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchModalInputRef = useRef<HTMLInputElement>(null);
  const getPlaceholderSvg = (size: number) =>
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Crect fill='%23e5e7eb' width='${size}' height='${size}'/%3E%3C/svg%3E`;
  const handleIconError = (event: SyntheticEvent<HTMLImageElement>, size: number) => {
    event.currentTarget.src = getPlaceholderSvg(size);
  };
  
  // API State
  const [apps, setApps] = useState<App[]>([]);
  const [categories, setCategories] = useState<AppCategory[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get page from URL params for SEO
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const appsPerPage = 9; // 9 apps per page

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

  // Fetch apps and categories from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check if "all" is selected
        const isAllSelected = selectedCategories.includes('all');
        
        const apiParams: AppsQueryParams = {
          page: currentPage,
          locale: currentLocale,
        };

        // When "all" is selected on first page, use a higher limit to show all apps
        // Otherwise, use pagination with normal limit
        if (isAllSelected && currentPage === 1 && !searchQuery.trim()) {
          // Show all apps on first page when "all" is selected
          // Use a very high limit to ensure we get all apps
          apiParams.limit = 1000; // High limit to get all apps
        } else {
          // Use normal pagination limit
          apiParams.limit = appsPerPage;
        }

        // Add category filter if not 'all'
        const selectedCategory = selectedCategories.find(cat => cat !== 'all');
        if (selectedCategory) {
          apiParams.category = selectedCategory;
        }

        // Add search query if exists
        if (searchQuery.trim()) {
          apiParams.search = searchQuery.trim();
        }

        // Fetch apps
        const appsResponse = await getApps(apiParams);
        
        if (appsResponse.success && appsResponse.data) {
          const fetchedApps = appsResponse.data.apps || [];
          setApps(fetchedApps);
          setPagination(appsResponse.data.pagination);
          
          // Set categories if provided
          if (appsResponse.data.categories) {
            setCategories(appsResponse.data.categories);
          }
        }

        // Fetch categories separately if not included in apps response
        if (!appsResponse.data?.categories) {
          try {
            const categoriesResponse = await getAppCategories(currentLocale);
            if (categoriesResponse.success && categoriesResponse.data) {
              setCategories(categoriesResponse.data.categories);
            }
          } catch (categoriesError) {
            // Categories endpoint might not exist - this is optional
            console.warn('[App Store] Could not fetch categories (endpoint may not exist):', categoriesError);
          }
        }
      } catch (err) {
        console.error('Error fetching app store data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load apps');
        setApps([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, appsPerPage, currentLocale, selectedCategories, searchQuery]);

  // Get featured/popular app (first app from API)
  const featuredApp = apps.length > 0 ? apps[0] : null;

  // Filter apps by search query for modal
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || apps.length === 0) {
      return [];
    }
    const query = searchQuery.toLowerCase().trim();
    return apps.filter(app => 
      app.name.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query) ||
      app.category.toLowerCase().includes(query)
    ).slice(0, 6); // Limit to 6 results in modal
  }, [searchQuery, apps]);

  // Use apps directly from API (already filtered by API)
  const currentApps = apps;
  
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
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
                      {searchResults.map((app) => {
                        const categoryName = categories.find(cat => cat.id === app.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
                                            categories.find(cat => cat.id === app.categoryId)?.name || 
                                            app.category;
                        return (
                          <Link
                            key={app.id}
                            href={`/${currentLocale}/app-store/${app.slug}`}
                            onClick={() => setShowSearchModal(false)}
                            className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              {/* App Icon */}
                              <div className="flex-shrink-0">
                                {app.icon ? (
                                  <Image
                                    src={getImageUrl(app.icon)}
                                    alt={app.name}
                                    width={48}
                                    height={48}
                                    quality={75}
                                    className="w-12 h-12 rounded-lg object-cover"
                                    sizes="48px"
                                    loading="lazy"
                                    onError={(event) => handleIconError(event, 48)}
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    {categoryName}
                                  </span>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-1">
                                  {app.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                  {app.shortDescription || app.description}
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

      {/* First Section - Hero */}
      <section className="w-full pt-2.5 pb-16 md:pb-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-[#f4f6f8] dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Side - App Store Intro */}
              <div className="lg:col-span-7 flex items-center">
                <div className="w-full">
                  {/* Breadcrumbs */}
                  <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <Link href="/" className="hover:text-primary dark:hover:text-secondary transition-colors">
                      Home
                    </Link>
                    {' / '}
                    <span className="text-gray-700 dark:text-gray-300">App Store</span>
                  </nav>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('title')}
                  </h1>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('description')}
                  </p>
                </div>
              </div>

              {/* Right Side - Featured App */}
              {featuredApp && (
                <div className="lg:col-span-5">
                  {/* Featured App Card */}
                  <Link
                    href={`/${currentLocale}/app-store/${featuredApp.slug}`}
                    className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6"
                  >
                    <div className="flex items-start gap-4">
                      {/* App Icon */}
                      <div className="flex-shrink-0">
                        {featuredApp.icon ? (
                          <Image
                            src={getImageUrl(featuredApp.icon)}
                            alt={featuredApp.name}
                            width={80}
                            height={80}
                            quality={75}
                            className="w-20 h-20 object-contain rounded-lg"
                            sizes="80px"
                            loading="lazy"
                            onError={(event) => handleIconError(event, 80)}
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary dark:hover:text-secondary transition-colors">
                          {featuredApp.name}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {featuredApp.shortDescription || featuredApp.description}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {categories.find(cat => cat.id === featuredApp.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
                           categories.find(cat => cat.id === featuredApp.categoryId)?.name || 
                           featuredApp.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* All Apps Section */}
      <section className="w-full py-16 md:py-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {t('allApps')}
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
                className="px-4 py-2 rounded-lg bg-primary dark:bg-secondary text-white hover:bg-button-hover transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Apps - Grid or List View */}
          {!loading && !error && currentApps.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
              : 'flex flex-col gap-4'
            }>
              {currentApps.map((app) => {
                const iconSize = viewMode === 'list' ? 56 : 64;
                const iconClass = viewMode === 'list' ? 'w-14 h-14' : 'w-16 h-16';

                return (
              <Link
                key={app.id}
                href={`/${currentLocale}/app-store/${app.slug}`}
                className={`
                  bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all
                  ${viewMode === 'list' ? 'flex flex-row gap-4' : 'flex flex-col'}
                `}
              >
                {/* App Icon */}
                <div className={`flex-shrink-0 ${viewMode === 'list' ? '' : 'mb-3'}`}>
                  {app.icon ? (
                    <Image
                      src={getImageUrl(app.icon)}
                      alt={app.name}
                      width={iconSize}
                      height={iconSize}
                      quality={75}
                      className={`${iconClass} object-contain rounded-lg`}
                      sizes={`${iconSize}px`}
                      loading="lazy"
                      onError={(event) => handleIconError(event, iconSize)}
                    />
                  ) : (
                    <div className={`${iconClass} bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center`}>
                      <svg className={`${viewMode === 'list' ? 'w-8 h-8' : 'w-10 h-10'} text-gray-400 dark:text-gray-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 min-w-0 ${viewMode === 'list' ? 'flex flex-col justify-center' : ''}`}>
                  {/* App Name */}
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 hover:text-primary dark:hover:text-secondary transition-colors text-base line-clamp-1">
                    {app.name}
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-gray-600 dark:text-gray-400 leading-snug ${viewMode === 'list' ? 'text-sm line-clamp-1' : 'text-sm line-clamp-2'} mb-2`}>
                    {app.shortDescription || app.description}
                  </p>
                  
                  {/* Category */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {categories.find(cat => cat.id === app.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
                       categories.find(cat => cat.id === app.categoryId)?.name || 
                       app.category}
                    </span>
                  </div>
                </div>
              </Link>
                );
              })}
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-primary dark:bg-secondary text-white hover:bg-button-hover"
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

export default function AppStorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    }>
      <AppStoreContent />
    </Suspense>
  );
}

