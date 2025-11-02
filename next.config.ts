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
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
  // swcMinify is enabled by default in Next.js 15+
  experimental: {
    // optimizeCss requires 'critters' package - commented out to avoid build errors
    // optimizeCss: true,
    optimizePackageImports: ["framer-motion", "lucide-react"],
    // Reduce bundle size
    optimizeServerReact: true,
  },
  // Reduce JavaScript bundle size and improve code splitting
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        // Better code splitting
        splitChunks: {
          chunks: "all",
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk - React, Next.js core
            framework: {
              name: "framework",
              chunks: "all",
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
              minChunks: 1,
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
            },
            // lucide-react icons
            lucideReact: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: "lucide-react",
              priority: 45,
              enforce: true,
              chunks: "all",
            },
            // Other node_modules libraries
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
              minSize: 30000,
            },
            // Common shared code
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
              minSize: 20000,
            },
          },
        },
        // Reduce chunk size
        chunkIds: "deterministic",
        // Optimize runtime chunk
        runtimeChunk: {
          name: "runtime",
        },
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
