import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.flowxtra.com",
      },
      {
        protocol: "https",
        hostname: "flowxtra.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    // Remove React DevTools in production
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? {
            properties: ["^data-testid$", "^data-cy$"],
          }
        : false,
  },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Enable bfcache for better performance
  async rewrites() {
    return [
      // Rewrite sitemap blog URLs to match desired format
      // /sitemap-en-blog-0.xml -> /sitemap/en/blog/0
      {
        source: "/sitemap-:locale-blog-:index.xml",
        destination: "/sitemap/:locale/blog/:index",
      },
      // Rewrite sitemap static URLs to match desired format
      // /sitemap-static-en.xml -> /sitemap-static/en
      {
        source: "/sitemap-static-:locale.xml",
        destination: "/sitemap-static/:locale",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      // Optimize CSS delivery - long cache for immutable CSS files
      {
        source: "/_next/static/css/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Optimize font delivery
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // swcMinify is enabled by default in Next.js 15+
  experimental: {
    // optimizeCss requires 'critters' package - commented out to avoid build errors
    // optimizeCss: true,
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "next-intl",
      "@radix-ui/react-icons",
    ],
    // Reduce bundle size
    optimizeServerReact: true,
    // Enable partial prerendering for better performance
    ppr: false, // Disable for now, can be enabled later
  },
  // Reduce JavaScript bundle size and improve code splitting
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      // Exclude next-devtools completely in production builds
      if (!dev && process.env.NODE_ENV === "production") {
        const webpack = require("webpack");
        config.plugins = config.plugins || [];
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(
            /next[\\/]dist[\\/]compiled[\\/]next-devtools/,
            require.resolve("./lib/empty-module.ts")
          )
        );
        // Also exclude any devtools-related modules
        config.resolve = config.resolve || {};
        config.resolve.alias = {
          ...config.resolve.alias,
          "next/dist/compiled/next-devtools": require.resolve(
            "./lib/empty-module.ts"
          ),
        };
      }

      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        // Tree shaking is already enabled by Next.js via SWC
        // usedExports conflicts with cacheUnaffected (used by Next.js)
        // DO NOT modify minimize or minimizer - Next.js 15 uses SWC minifier automatically
        // Modifying these settings can disable minification in production builds
        // Better code splitting
        splitChunks: {
          chunks: "all",
          maxInitialRequests: 25,
          maxAsyncRequests: 40,
          minSize: 20000, // Increased slightly to avoid too many small chunks
          maxSize: 120000, // Further reduced for faster parsing and execution
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk - Split React and React-DOM separately for better parsing
            react: {
              name: "react",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|scheduler)[\\/]/,
              priority: 50,
              enforce: true,
              maxSize: 55000, // Smaller chunk = faster parsing and execution
            },
            // React DOM in separate chunk - often parsed but not executed immediately
            reactDom: {
              name: "react-dom",
              chunks: "all",
              test: /[\\/]node_modules[\\/]react-dom[\\/]/,
              priority: 49,
              enforce: true,
              maxSize: 70000, // Reduced for faster parsing
            },
            // Split Next.js into smaller chunks - exclude devtools in production
            nextjsCore: {
              name: "nextjs-core",
              chunks: "all",
              test: /[\\/]node_modules[\\/]next[\\/]dist[\\/](client|shared-runtime|build)[\\/]/,
              priority: 48,
              enforce: true,
              maxSize: 55000, // Smaller chunks = faster parsing/execution
            },
            // Exclude next-devtools from nextjs chunk in production
            nextjs: {
              name: "nextjs",
              chunks: "all",
              test: /[\\/]node_modules[\\/]next[\\/](?!dist[\\/](client|shared-runtime|build|compiled[\\/]next-devtools)[\\/])/,
              priority: 45,
              enforce: true,
              maxSize: 90000, // Reduced for faster execution
            },
            // Large libraries in separate chunks for better caching
            shiki: {
              test: /[\\/]node_modules[\\/]shiki[\\/]/,
              name: "shiki",
              priority: 50,
              enforce: true,
              chunks: "all",
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: "framer-motion",
              priority: 50,
              enforce: true,
              chunks: "all",
            },
            // next-intl and other medium libraries
            nextIntl: {
              test: /[\\/]node_modules[\\/]next-intl[\\/]/,
              name: "next-intl",
              priority: 45,
              enforce: true,
              chunks: "all",
              maxSize: 80000, // Limit size for faster parsing
            },
            // lucide-react icons - split by usage to reduce bundle size
            lucideReact: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: "lucide-react",
              priority: 45,
              enforce: true,
              chunks: "async", // Load icons asynchronously - most icons are not critical
              maxSize: 50000, // Smaller chunks for icons
            },
            // Other node_modules libraries - split smaller to reduce unused code
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module: any) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1];
                return `lib-${packageName?.replace("@", "")}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
              minSize: 20000, // Increased to avoid too many tiny chunks
              maxSize: 80000, // Reduced limit for faster parsing
            },
            // Common shared code - only include if shared across multiple chunks
            commons: {
              name: "commons",
              minChunks: 4, // Increased to 4 - only truly shared code (reduces initial bundle)
              priority: 20,
              reuseExistingChunk: true,
              minSize: 20000, // Increased to avoid tiny chunks
            },
          },
        },
        // Reduce chunk size
        chunkIds: "deterministic",
        // Optimize runtime chunk - ensure it's minified
        runtimeChunk: {
          name: "runtime",
        },
        // Enable module concatenation for better tree shaking and smaller bundles
        concatenateModules: true,
      };

      // DO NOT modify minimizer - Next.js 15 automatically uses SWC minifier
      // Modifying minimizer can disable minification for runtime.js and other chunks
      // SWC minifier is enabled by default and works for all chunks including runtime

      // Tree shaking is handled by package.json sideEffects field
      // CSS files are marked as side effects to prevent removal
      // usedExports conflicts with cacheUnaffected (used by Next.js) - DO NOT enable
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
