# Flowxtra Frontend - Next.js 15

This project is a frontend for Flowxtra built with Next.js 15, TypeScript, and TailwindCSS.

---

## ⚠️ BEFORE DEVELOPMENT - READ THE RULES

**🔴 CRITICAL: You MUST read the development rules files before starting any development work!**

### 📋 Development Rules Files:
- **Main Rules**: `.cursor/rules/README.mdc`
- **Detailed Rules**: `.cursor/rules/DEVELOPMENT-RULES.mdc`

### 🚨 Mandatory Development Rules:

#### 1️⃣ **ENGLISH ONLY for Code**
- ✅ ALL code must be written in **ENGLISH ONLY**
- ✅ Variable names in English
- ✅ Function names in English
- ✅ Comments in English
- ✅ Documentation in English
- ❌ NO Arabic in code, variable names, or comments

**Example:**
```typescript
// ✅ CORRECT
const userName = "John"; // Get user name
function calculateTotal() { /* Calculate total */ }

// ❌ WRONG
const اسم_المستخدم = "John"; // Get user name (in Arabic)
function احسب_المجموع() { /* Calculate total (in Arabic) */ }
```

#### 2️⃣ **NO README Files Without Permission**
- ❌ DO NOT create or modify README files unless explicitly requested
- ❌ DO NOT generate documentation files automatically
- ✅ ONLY create README/documentation when the user specifically asks for it

#### 3️⃣ **Performance First**
- ALL pages MUST achieve a 90+ performance score
- Mobile-first responsive design
- Optimize all images and assets

---

## 🚀 Project Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

The project will be available at: [http://localhost:3000](http://localhost:3000)

### 3. Build the project for production
```bash
npm run build
npm start
```

---

## 🔌 Backend API Configuration

### Development/Testing API Endpoint

**API Base URL**: `http://localhost:8765`

Use this endpoint for local development and testing when connecting to the backend API.

**Example Usage:**
```typescript
const API_BASE_URL = 'http://localhost:8765';

// Example API call
fetch(`${API_BASE_URL}/api/endpoint`)
  .then(response => response.json())
  .then(data => console.log(data));
```

## 📄 Available Pages

- **Homepage**: `/` - Main homepage (labeled as "Features" in the header)
- **Social Media Management**: `/social-media-management`
- **ATS Recruiting Software**: `/ats-recruiting-software`
- **Pricing**: `/pricing`
- **Contact Us**: `/contact-us`
- **Login**: `/login`
- **Get Started**: `/get-started`

**Note:** The homepage is `app/page.tsx` serving `/`. The header shows "Features" but links to `/` to keep the URL as `flowxtra.com`.

## 📱 Header Navigation

The header includes:
- Flowxtra Logo
- Navigation menu:
  - Features (this links to the Homepage)
  - Services (dropdown)
    - Social Media Management
    - ATS Recruiting Software
  - Pricing
  - Contact Us
- **Controls:**
  - 🌍 Language Switcher (🇬🇧 EN, 🇩🇪 DE)
  - 🌙 Dark Mode Toggle
- Action Buttons:
  - Login
  - Signup

**Important:** "Features" appears in the header as the homepage link.

### 🌓 Dark Mode & Language Features
✅ **Dark Mode**: Automatic system preference detection + Manual toggle  
✅ **Multi-Language**: 🇬🇧 English & 🇩🇪 Deutsch (Auto-detect browser language)  
✅ **Responsive**: Optimized for Mobile & Desktop  
✅ **Persistent**: Settings saved in localStorage  
✅ **Auto-Detection**: Automatically detects browser language on first visit

## 📱 Responsive Design

The design is fully responsive and suitable for:
- 📱 Mobile
- 📲 Tablet/iPad
- 💻 Desktop/Laptop

## 🎯 Current Status

All pages are currently displaying "Hello World" only. Actual content will be added later.

## 🧩 Tech Stack

- **Next.js 15** - Main framework
- **React 19** - React library
- **TypeScript** - Programming language
- **TailwindCSS** - CSS framework
- **Framer Motion** - For animations and transitions

---

## 🔤 Typography

- **Font**: Roboto (loaded locally from `/public/fonts/`)
- **Weights**: 400 (Regular), 500 (Medium), 700 (Bold)
- **Loading**: Local files (no external requests)
- **Format**: WOFF2 for modern browsers

The font is automatically applied to all text through TailwindCSS configuration.

---

## 🎨 Brand Colors (MANDATORY)

**You MUST use these official Flowxtra brand colors:**

### Primary Colors
- **Primary**: `#003f4d` - Main brand color & Primary buttons
- **Secondary**: `#006980` - Secondary elements
- **Light Secondary**: `#00A8CD` - Button hover state & Accent highlights

### Background Colors
- **Footer Background**: `#f4f6f8` - Footer section background

### Color Usage in Code
```tsx
// Primary button
<button className="bg-button-primary hover:bg-button-hover text-white">
  Get Started
</button>

// Secondary button
<button className="bg-secondary hover:bg-secondary-light text-white">
  Learn More
</button>

// Links
<Link className="text-primary hover:text-secondary">
  Features
</Link>

// Footer
<footer className="bg-footer-bg">
  {/* Footer content */}
</footer>
```

**⚠️ Important:** All developers MUST follow this color palette. Do not use any other colors without permission.

---

## 🎨 Button Styles (MANDATORY)

**There are TWO main button styles:**

### 1. Primary Button (Filled)
```tsx
<button className="bg-button-primary border-2 border-button-primary text-white px-6 py-2 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium">
  Signup
</button>
```
- **Use for**: Primary actions (Signup, Get Started, Submit)
- **Colors**: `#003f4d` → hover `#00A8CD`

### 2. Secondary Button (Outline)
```tsx
<button className="border-2 border-primary text-primary px-6 py-2 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium">
  Login
</button>
```
- **Use for**: Secondary actions (Login, Learn More, Cancel)
- **Colors**: Border `#003f4d`, hover fills with `#00A8CD`

---

## 🌓 Dark Mode Support

The application supports both **Light Mode** and **Dark Mode**:

### Light Mode (Default)
- Background: `#ffffff`
- Text: `#171717`
- Cards: `#f9fafb`

### Dark Mode
- Background: `#0a0a0a`
- Text: `#ededed`
- Cards: `#1f2937`

**Implementation:**
```tsx
// Use TailwindCSS dark: prefix
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">Text</p>
</div>
```

**Configuration:**
- Set in `tailwind.config.ts`: `darkMode: "class"`
- Toggle by adding/removing `dark` class to `<html>` element
