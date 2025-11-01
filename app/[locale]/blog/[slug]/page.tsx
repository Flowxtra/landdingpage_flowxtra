'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { generateBlogPostSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

function BlogPostContent() {
  const t = useTranslations('blog');
  const params = useParams();
  const pathname = usePathname();
  const slug = params?.slug as string;
  
  // Get current locale from pathname
  const currentLocale = pathname?.startsWith('/de') ? 'de' : pathname?.startsWith('/en') ? 'en' : 'en';

  // Mock post data - Replace with API call later
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`);
  // const post = await response.json();

  // Mock categories from backend
  const categoriesFromAPI = [
    { id: 1, name: "Productivity", slug: "productivity", translations: { en: "Productivity", de: "Produktivität" } },
    { id: 2, name: "Accessibility", slug: "accessibility", translations: { en: "Accessibility", de: "Barrierefreiheit" } },
    { id: 3, name: "Performance", slug: "performance", translations: { en: "Performance", de: "Leistung" } },
  ];

  // Mock post data based on slug
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`);
  // const postData = await response.json();
  
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
      author: "John Doe",
      authorImage: "/img/blog/author.jpg",
      content: `<p>Artificial Intelligence is revolutionizing the way we build web applications. From code generation to design assistance, AI tools are becoming essential for modern developers.</p><h2>The Rise of AI Coding Assistants</h2><p>GitHub Copilot and similar tools have transformed the coding experience. Developers can now generate boilerplate code, write tests, and even debug issues faster than ever before.</p><h3>Key Benefits</h3><ul><li>Faster code generation</li><li>Improved code quality</li><li>Reduced development time</li><li>Better documentation</li></ul><h2>AI Design Tools</h2><p>Design generators powered by AI can create layouts, color schemes, and even entire design systems. This allows developers and designers to focus on creativity rather than repetitive tasks.</p><h3>Popular Tools</h3><ol><li>GitHub Copilot</li><li>ChatGPT for Code</li><li>Figma AI plugins</li><li>Design system generators</li></ol><h2>Future Implications</h2><p>As AI continues to evolve, we can expect even more sophisticated tools that understand context better and provide more accurate suggestions. The future of frontend development is exciting!</p><p>In conclusion, AI is not replacing developers—it's empowering them to build better applications faster.</p>`
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
      author: "Jane Smith",
      authorImage: "/img/blog/author.jpg",
      content: `<p>VS Code extensions can dramatically improve your development workflow. Here are 5 must-have extensions every developer should install.</p><h2>1. Prettier - Code Formatter</h2><p>Prettier automatically formats your code, ensuring consistent style across your project. It saves hours of manual formatting.</p><h2>2. ESLint</h2><p>Catch errors before they reach production. ESLint helps maintain code quality and enforces coding standards.</p><h2>3. GitLens</h2><p>Supercharge Git with detailed history, blame annotations, and powerful search capabilities directly in VS Code.</p><h2>4. Live Server</h2><p>Launch a local development server with live reload. Perfect for frontend development and quick testing.</p><h2>5. Auto Rename Tag</h2><p>Automatically rename paired HTML/XML tags. A small feature that saves significant time when refactoring.</p>`
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
      content: `<p>Time management is crucial for developers. Learn effective strategies to manage your workload and avoid burnout.</p>`
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
      content: `<p>Automation is key to efficient development. Discover how to automate your workflow.</p>`
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
      content: `<p>Accessibility is essential for modern web applications. Learn how to build accessible websites.</p>`
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
      content: `<p>Performance optimization is crucial for user experience. Discover techniques to improve your application's performance.</p>`
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
      content: `<p>Modern CSS offers powerful features for styling. Learn about Grid, Flexbox, and CSS custom properties.</p>`
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
      content: `<p>TypeScript is essential for large-scale projects. Learn best practices for organizing your TypeScript codebase.</p>`
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
      content: `<p>React Hooks revolutionized React development. Deep dive into hooks and advanced patterns.</p>`
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
      content: `<p>Testing accessibility is important. Discover tools and methods for accessibility testing.</p>`
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
      content: `<p>Screen readers are essential tools. Learn how to optimize your site for screen readers.</p>`
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
      content: `<p>Color contrast is crucial for accessibility. Learn about contrast ratios and accessibility standards.</p>`
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
      content: `<p>Website speed is crucial for user experience. Discover strategies to optimize your site's performance.</p>`
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
      content: `<p>Lazy loading can significantly improve performance. Learn how to implement lazy loading for images.</p>`
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
      content: `<p>Code splitting improves performance. Discover techniques for bundle optimization.</p>`
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
      content: `<p>Choosing between GraphQL and REST can be challenging. Compare both approaches to make the right choice.</p>`
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
      content: `<p>Database optimization is crucial for performance. Learn techniques to optimize your database queries.</p>`
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
      content: `<p>Responsive design is essential for modern websites. Learn best practices for creating responsive layouts.</p>`
    },
  ];

  const post = allPosts.find(p => p.slug === slug) || allPosts[0];
  const categoryName = categoriesFromAPI.find(cat => cat.id === post.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
                       categoriesFromAPI.find(cat => cat.id === post.categoryId)?.name || 
                       post.category;

  // Get previous and next posts
  const currentPostIndex = allPosts.findIndex(p => p.id === post.id);
  const previousPost = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < allPosts.length - 1 ? allPosts[currentPostIndex + 1] : null;

  // Get related posts (same category, exclude current)
  const relatedPosts = allPosts
    .filter(p => p.categoryId === post.categoryId && p.id !== post.id)
    .slice(0, 3);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
          <Link href="/blog" className="text-primary dark:text-secondary hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  // Generate JSON-LD schema for SEO
  const blogPostSchema = generateBlogPostSchema({
    post,
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
              <Link href="/" className="hover:text-primary dark:hover:text-secondary transition-colors">
                Home
              </Link>
              {' / '}
              <Link href="/blog" className="hover:text-primary dark:hover:text-secondary transition-colors">
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
                <span>{post.time}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{post.author}</span>
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
              className="prose prose-lg max-w-none
                !prose-headings:!text-gray-900 dark:!prose-headings:!text-white
                !prose-p:!text-gray-900 dark:!prose-p:!text-gray-100 !prose-p:!leading-relaxed !prose-p:!mb-6
                !prose-strong:!text-gray-900 dark:!prose-strong:!text-white !prose-strong:!font-semibold
                !prose-em:!text-gray-700 dark:!prose-em:!text-gray-300
                !prose-a:!text-primary dark:!prose-a:!text-secondary !prose-a:!no-underline hover:!prose-a:!underline !prose-a:!font-medium
                !prose-ul:!text-gray-900 dark:!prose-ul:!text-gray-100 !prose-ul:!mb-6 !prose-ul:!ml-6
                !prose-ol:!text-gray-900 dark:!prose-ol:!text-gray-100 !prose-ol:!mb-6 !prose-ol:!ml-6
                !prose-li:!text-gray-900 dark:!prose-li:!text-gray-100 !prose-li:!mb-2
                !prose-h1:!text-4xl md:!prose-h1:!text-5xl !prose-h1:!font-bold !prose-h1:!mt-12 !prose-h1:!mb-6 !prose-h1:!text-gray-900 dark:!prose-h1:!text-white
                !prose-h2:!text-2xl md:!prose-h2:!text-3xl !prose-h2:!font-bold !prose-h2:!mt-12 !prose-h2:!mb-6 !prose-h2:!text-gray-900 dark:!prose-h2:!text-white
                !prose-h3:!text-xl md:!prose-h3:!text-2xl !prose-h3:!font-bold !prose-h3:!mt-8 !prose-h3:!mb-4 !prose-h3:!text-gray-900 dark:!prose-h3:!text-white
                !prose-h4:!text-lg md:!prose-h4:!text-xl !prose-h4:!font-bold !prose-h4:!mt-6 !prose-h4:!mb-3 !prose-h4:!text-gray-900 dark:!prose-h4:!text-white
                prose-img:rounded-lg prose-img:my-8 prose-img:w-full prose-img:h-auto
                prose-figure:my-8
                prose-figcaption:text-sm prose-figcaption:text-gray-500 dark:prose-figcaption:text-gray-400 prose-figcaption:text-center prose-figcaption:italic
                !prose-blockquote:!border-l-4 !prose-blockquote:!border-primary dark:!prose-blockquote:!border-secondary !prose-blockquote:!pl-4 !prose-blockquote:!italic !prose-blockquote:!text-gray-700 dark:!prose-blockquote:!text-gray-300 !prose-blockquote:!my-6
                !prose-code:!text-primary dark:!prose-code:!text-secondary !prose-code:!bg-gray-100 dark:!prose-code:!bg-gray-800 !prose-code:!px-1 !prose-code:!py-0.5 !prose-code:!rounded !prose-code:!text-sm !prose-code:!font-mono
                !prose-pre:!bg-gray-900 dark:!prose-pre:!bg-gray-800 !prose-pre:!text-gray-100 !prose-pre:!rounded-lg !prose-pre:!p-4 !prose-pre:!overflow-x-auto !prose-pre:!my-6
                prose-table:w-full prose-table:my-6 prose-table:border-collapse
                prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:bg-gray-50 dark:prose-th:bg-gray-800 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 dark:prose-th:text-white
                prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:px-4 prose-td:py-2 prose-td:text-gray-900 dark:prose-td:text-gray-100
                prose-hr:border-gray-300 dark:prose-hr:border-gray-600 prose-hr:my-8
              "
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            {/* Author Section (if available) */}
            {post.author && (
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {post.authorImage ? (
                      <Image
                        src={post.authorImage}
                        alt={post.author}
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
                      {post.author}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('post.writtenBy', { author: post.author })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation - Previous and Next Posts */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Previous Post */}
                {previousPost ? (
                  <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <Link
                      href={`/blog/${previousPost.slug}`}
                      className="text-base font-semibold text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors line-clamp-2"
                    >
                      {previousPost.title}
                    </Link>
                  </div>
                ) : (
                  <div></div>
                )}

                {/* Next Post */}
                {nextPost ? (
                  <div className="flex items-center gap-4 md:justify-end md:flex-row-reverse">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="text-base font-semibold text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors line-clamp-2"
                    >
                      {nextPost.title}
                    </Link>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
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
                const relatedCategoryName = categoriesFromAPI.find(cat => cat.id === relatedPost.categoryId)?.translations?.[currentLocale as 'en' | 'de'] || 
                                           categoriesFromAPI.find(cat => cat.id === relatedPost.categoryId)?.name || 
                                           relatedPost.category;
                return (
                  <article
                    key={relatedPost.id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Image */}
                    <Link 
                      href={`/blog/${relatedPost.slug}`} 
                      className="block cursor-pointer"
                    >
                      <div className="relative w-full aspect-[16/10] mt-3 rounded-lg overflow-hidden">
                        <Image
                          src={relatedPost.image}
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

                      <Link href={`/blog/${relatedPost.slug}`}>
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
                        <span>{relatedPost.time}</span>
                      </div>

                      <Link
                        href={`/blog/${relatedPost.slug}`}
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

