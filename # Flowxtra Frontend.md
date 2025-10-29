# Flowxtra Frontend

This is the **frontend** of the Flowxtra platform — a high-performance, SEO-optimized website built with **Next.js**, hosted directly on the same **LiteSpeed (WHM) server** as the Laravel backend.

---

## 🚀 Overview

The frontend provides:
- Public landing pages showcasing Flowxtra's AI-powered recruitment system.
- Blog section fetched dynamically from the Laravel API.
- Legal and compliance pages (GDPR, CCPA, CPRA).
- Optimized SEO performance with JSON-LD structured data.
- **Fully responsive design optimized for ALL devices** (Mobile, Tablet, iPad, Laptop, Desktop, Large Screens).
- Hosted on the same server as Laravel for minimal latency and full control.

---

## 🧩 Tech Stack

| Layer | Technology | Purpose |
|--------|-------------|----------|
| **Framework** | [Next.js 15](https://nextjs.org) | Core frontend framework (SSR + SSG) |
| **Styling** | [TailwindCSS](https://tailwindcss.com) | Utility-first CSS framework |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) | Reusable, accessible UI components |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth transitions and effects |
| **HTTP Client** | Axios / native fetch | Communicates with Laravel API |
| **SEO / Schema** | next-seo + JSON-LD | SEO metadata and structured data |
| **Hosting** | LiteSpeed (WHM) Node.js App | High-performance local hosting |

---

## 📱 Responsive Design - Multi-Device Support

> **🎯 Critical Requirement: The design MUST be fully responsive and optimized for Mobile, Tablet/iPad, and Desktop**

### Supported Devices

| Device Type | Screen Size | Description |
|-------------|-------------|-------------|
| **📱 Mobile** | 320px - 767px | All mobile phones (portrait & landscape) |
| **📲 Tablet / iPad** | 768px - 1023px | iPad and tablets (portrait & landscape) |
| **💻 Desktop / Laptop** | 1024px+ | All computers and large screens |

### Design Requirements

#### **Mobile-First Approach** 📱
- Design starts from mobile and scales up
- Touch-friendly buttons (minimum 44x44px)
- Readable text without zooming (minimum 16px)
- All features work perfectly on mobile

#### **Tablet & iPad Optimization** 📲
- Optimized for both portrait and landscape
- Touch gestures support
- Proper use of screen space

#### **Desktop Optimization** 💻
- Multi-column layouts
- Hover effects for interactive elements
- Maximum content width for readability

### Implementation Example

```jsx
<div className="
  w-full px-4           /* Mobile */
  md:w-3/4 md:px-8      /* Tablet/iPad */
  lg:w-2/3 lg:px-12     /* Desktop */
">
  <h1 className="
    text-2xl            /* Mobile */
    md:text-4xl         /* Tablet/iPad */
    lg:text-5xl         /* Desktop */
  ">
    Heading
  </h1>
</div>
```

---

## 📄 Main Pages & Routes

| Page | Path | Description |
|------|------|-------------|
| **Home / Features** | `/` or `/features/` | Main landing page introducing Flowxtra and showcasing all platform features. *(Both paths lead to the same homepage)* |
| **ATS Recruiting Software** | `/ats-recruiting-software/` | Detailed explanation of the ATS system. |
| **Social Media Management** | `/social-media-management/` | Overview of Flowxtra's social automation tools. |
| **Free Job Posting** | `/free-job-posting/` | Explains the free job posting feature. |
| **Pricing** | `/pricing/` | Subscription plans and pricing. |
| **About** | `/about/` | Company and team information. |
| **Contact** | `/contact-us/` | Contact and support page. |
| **Blog** | `/blog/` | Dynamic blog connected to the Laravel backend. |

---

## ⚖️ Legal & Compliance Pages

| Page | Path |
|------|------|
| Terms | `/terms/` |
| DPA | `/dpa/` |
| Imprint | `/imprint/` |
| Disclaimer | `/disclaimer/` |
| Privacy Policy | `/privacy-policy/` |
| Cookie Policy | `/cookie-policy/` |
| Terms of Use (Companies) | `/terms-of-use-companies/` |
| Terms of Use (Candidates) | `/terms-of-use-candidates/` |

All pages are static, multilingual (EN / DE / AR), and fully optimized for SEO.

---

## 🔗 Backend Integration

The frontend connects to the Laravel backend hosted on the same LiteSpeed server.

### API Endpoints

```
https://api.flowxtra.com/api/blog
https://api.flowxtra.com/api/blog/{slug}
```

### Environment Configuration

Set the API base URL in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://api.flowxtra.com
```

---

## ⚙️ Deployment (on WHM / LiteSpeed Server)

### 1. Build the Project

```bash
npm install
npm run build
```

### 2. Create Node.js App in WHM/cPanel

- Log in to cPanel for your domain.
- Go to **Setup Node.js App**.
- Click **Create Application** with:
  - **Application Mode**: Production
  - **Node.js Version**: 20+
  - **App Root**: `/home/USER/frontend`
  - **App URL**: `https://flowxtra.com`
  - **Startup File**: `.output/server/index.mjs` (for Next.js 13+)

### 3. Upload Project Files

Upload your built Next.js app to the chosen directory (`/home/USER/frontend/`).

### 4. Install Dependencies and Start App

From cPanel:
- Click **Run NPM Install**
- Then **Start Application**

### 5. (Optional) Enable Cloudflare or QUIC.cloud CDN

For better global performance and caching.

---

## 🧠 Folder Structure

```bash
/app
 ├── features/
 ├── ats-recruiting-software/
 ├── social-media-management/
 ├── free-job-posting/
 ├── pricing/
 ├── about/
 ├── contact-us/
 ├── blog/
 ├── legal/
 ├── components/
 ├── styles/
 ├── lib/
 └── utils/
```

---

## 🌍 Deployment Setup Summary

| Component | Location | Hosting |
|-----------|----------|---------|
| Frontend (Next.js) | flowxtra.com | Node.js App via WHM + LiteSpeed |
| Backend (Laravel API) | api.flowxtra.com | LiteSpeed (same server) |
| Database (MySQL) | Local (same server) | MySQL Server |
| SSL Certificates | AutoSSL (Let's Encrypt) | Automated |
| CDN (Optional) | Cloudflare / QUIC.cloud | External |

---

## ⚡ Performance Targets

> **🎯 Critical Requirement: All pages MUST achieve 90+ performance scores**

### Performance Metrics (Minimum Standards)

- **PageSpeed Score**: **90–100** ✅ *(Target: 95+)*
- **Performance Score**: **90+** (Mobile & Desktop)
- **SEO Score**: **100**
- **Accessibility Score**: **90+**
- **Best Practices**: **90+**
- **TTFB**: **<100 ms**

### Optimization Strategies

To ensure 90+ performance on all pages:

1. **Image Optimization**
   - Use Next.js Image component with WebP/AVIF formats
   - Lazy loading for below-the-fold images
   - Proper sizing and compression

2. **Code Optimization**
   - Code splitting and lazy loading components
   - Minimize JavaScript bundle size
   - Remove unused CSS with PurgeCSS

3. **Server & Caching**
   - LiteSpeed Cache for static assets
   - Brotli compression enabled
   - HTTP/2 or HTTP/3 enabled
   - Browser caching headers configured

4. **Rendering Strategy**
   - Static Site Generation (SSG) for all static pages
   - Incremental Static Regeneration (ISR) for blog
   - Server-Side Rendering (SSR) only when necessary

5. **Third-party Scripts**
   - Defer non-critical scripts
   - Use next/script with appropriate loading strategies
   - Minimize external dependencies

6. **Mobile-First Approach**
   - Fully responsive design
   - Touch-friendly UI elements
   - Optimized for mobile networks

---

## 🧭 SEO URL Preservation

All original WordPress URLs are preserved to maintain SEO authority.

### Example Routes

```
/social-media-management/
/ats-recruiting-software/
/free-job-posting/
/pricing/
/contact-us/
/dpa/
/imprint/
/privacy-policy/
/cookie-policy/
/terms-of-use-companies/
/terms-of-use-candidates/
```

---

## 📜 License

**Proprietary** — © Flowxtra GmbH. All rights reserved.
