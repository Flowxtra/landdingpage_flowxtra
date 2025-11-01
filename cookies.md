# Cookie Consent Banner Implementation Guide

## Overview

This guide provides comprehensive instructions for implementing a GDPR/CCPA compliant cookie consent banner system for Flowxtra. The system supports both European (GDPR/DSGVO) and American (CCPA/CPRA) privacy regulations.

---

## 🔍 Current Tracking Tools in Use

Based on `app/layout.tsx`, the following tracking scripts are currently implemented and **must be controlled by cookie consent**:

### Analytics Tools (Require Analytics Consent)
1. **Google Analytics** - ID: `G-33HQSXK6F2`
2. **Microsoft Clarity** - ID: `rasaazt5qp`
3. **Google Tag Manager** - ID: `GTM-M3DPV9C5` (analytics tracking)

### Marketing/Advertising Tools (Require Marketing Consent)
1. **Meta Pixel (Facebook)** - ID: `1210170290049770`
2. **Google Ads** - ID: `AW-16786153056`
3. **LinkedIn Insight Tag** - Partner ID: `8282209`
4. **TikTok Pixel** - ID: `D020C0RC77U0CJB7LSN0`
5. **Google Tag Manager** - ID: `GTM-M3DPV9C5` (marketing tracking)

**⚠️ IMPORTANT:** All these scripts are currently loaded in `layout.tsx` without consent checks. They must be moved to `CookieScriptLoader.tsx` and only load after user consent is granted.

---

## Legal Requirements

### European Union (GDPR/DSGVO)

- ✅ **Explicit Opt-in** required for non-essential cookies
- ✅ **Reject All** button mandatory
- ✅ **Granular consent** - users must be able to choose cookie categories
- ✅ **Easy withdrawal** - consent must be easily revocable
- ✅ **Clear information** - users must understand what they're consenting to
- ✅ **No cookies loaded** before consent (except essential)

### United States (CCPA/CPRA)

- ✅ **Do Not Sell** button required for California users
- ✅ **Clear notice** about data collection
- ✅ **Opt-out options** available
- ✅ **Privacy Policy** link required
- ✅ **Data deletion** request access

---

## Cookie Categories

### 1. Essential Cookies (No Consent Required)
- Authentication
- Security
- Load balancing
- Session management
- CSRF tokens

### 2. Functional Cookies (Consent Required)
- Language preferences
- Theme/Dark mode settings
- User preferences
- Form data

### 3. Analytics Cookies (Consent Required)
- **Google Analytics** (G-33HQSXK6F2)
- **Microsoft Clarity** (rasaazt5qp)
- **Google Tag Manager** (GTM-M3DPV9C5) - Used for analytics tracking
- Performance monitoring

### 4. Marketing/Advertising Cookies (Consent Required)
- **Meta Pixel (Facebook)** (1210170290049770)
- **Google Ads** (AW-16786153056)
- **LinkedIn Insight Tag** (8282209)
- **TikTok Pixel** (D020C0RC77U0CJB7LSN0)
- **Google Tag Manager** (GTM-M3DPV9C5) - Used for marketing tracking

---

## 🖥️ Flowxtra Infrastructure & Data Storage

### Current Infrastructure

**Primary Server Location:**
- 🇩🇪 **Germany (EU)** - Primary data center
- All user data is currently stored and processed in Germany

**Future Infrastructure:**
- 🇺🇸 **United States** - Planned future data center
- **Important:** When US server is deployed, EU users' data may be transferred to US under Standard Contractual Clauses (SCCs)
- This transfer will be disclosed to users via updated Cookie Policy and Privacy Policy

### User Data Collection Points

**1. Contact Form**
- ✅ Collects: Name, email, message, phone (optional), company (optional)
- ✅ Data Retention: **3 years** (must be disclosed)
- ✅ Purpose: Responding to inquiries, customer support
- ✅ Legal Basis: Legitimate interest (responding to user inquiries)
- ⚠️ **IMPORTANT:** Must be mentioned in Privacy Policy and Cookie Policy

**2. User Feedback/Review Form**
- ✅ Collects: Name, email (optional), rating, feedback text
- ✅ Data Retention: **3 years** (or as specified)
- ✅ Purpose: Improving services, collecting user feedback
- ✅ Legal Basis: Legitimate interest (service improvement)
- ⚠️ **IMPORTANT:** Must be mentioned in Privacy Policy

**3. Blog (Read-Only)**
- ✅ No comments section - read-only content
- ✅ No user data collection from blog itself
- ⚠️ May use Analytics/Marketing cookies for tracking blog page views
- ✅ Standard cookie consent applies (no special disclosure needed)

**4. Data Deletion Request Form**
- ✅ **REQUIRED by GDPR (Article 17) and CCPA**
- ✅ Must allow users to request deletion of their personal data
- ✅ Should include: Name, email, reason for deletion, data type to delete
- ✅ Response Time: Within 30 days (GDPR), 45 days (CCPA)
- ✅ Must be easily accessible and mentioned in Privacy Policy
- ⚠️ **CRITICAL:** This is NOT about cookies, but about user rights - must be implemented

### Backend Subdomains

**1. app.flowxtra.com** (Main Application)
- ✅ Primary application server
- ✅ Stores user data, authentication, session data
- ✅ Must be disclosed in Cookie Policy
- **Data Storage:** Germany (EU) → Future: US (with SCCs for EU users)

**2. integration.flowxtra.com** (Integration Hub)
- ⚠️ **Integration endpoint only** - Does NOT store personal data
- ⚠️ **Does NOT use tracking cookies**
- ⚠️ Acts as a gateway/wrapper for external system integrations
- **Does NOT need to be mentioned in Cookie Banner** (no tracking cookies)
- ✅ Should be mentioned briefly in Privacy Policy for transparency

### 🔒 Security Best Practices for Cookie Banner

**⚠️ IMPORTANT SECURITY CONSIDERATION:**

**For Cookie Banner (User-Facing):**
- ✅ **SAFE:** Use generic descriptions like "Our application servers" or "Primary application infrastructure"
- ✅ **SAFE:** Mention geographic location (Germany, EU, US) - this is public information
- ⚠️ **AVOID:** Mentioning specific subdomain names (`app.flowxtra.com`) in Cookie Banner if you want extra security layer
- ✅ **SAFE:** Generic mention like "Application backend servers" is sufficient and compliant

**Why?**
- Cookie Banner is public-facing and visible to all users (including potential attackers)
- Specific subdomain names can provide reconnaissance information to attackers
- However, if `app.flowxtra.com` is already publicly accessible, mentioning it isn't a major security risk
- **Best practice:** Be generic in Cookie Banner, detailed in Privacy Policy (which requires more authentication to view)

**For Privacy Policy (Detailed Disclosure):**
- ✅ **ACCEPTABLE:** Full disclosure of subdomains and infrastructure details
- ✅ Users accessing Privacy Policy are typically authenticated or at least more engaged
- ✅ Detailed infrastructure info is expected in Privacy Policy

### Implementation Recommendations

**✅ RECOMMENDED APPROACH (Most Secure):**

**Cookie Banner / Cookie Preferences:**
```typescript
// ✅ SAFE - Generic description
<p>Your data is stored on our primary application servers located in 🇩🇪 Germany (European Union)</p>

// ✅ SAFE - Generic with future plans
<p>We may expand to servers in United States. EU transfers protected by SCCs.</p>
```

**Privacy Policy (Full Disclosure):**
```markdown
## Infrastructure Details

**Application Servers:**
- Primary application: app.flowxtra.com (Germany, EU)
- Integration gateway: integration.flowxtra.com (Germany, EU - pass-through only)

**Data Storage:**
- Current: Germany (EU)
- Future: United States (with SCCs for EU users)
```

**Alternative Approach (If you want to mention infrastructure in Cookie Banner):**
```typescript
// ⚠️ Less secure but still acceptable if subdomain is already public
<p>Data stored on our servers (app.flowxtra.com) in 🇩🇪 Germany (EU)</p>
```

### Summary

**✅ DO (Safe & Compliant):**
- Mention geographic locations (Germany, EU, US) in Cookie Banner
- Use generic terms like "application servers" or "primary infrastructure"
- Full disclosure of subdomains in Privacy Policy
- Explain data transfer mechanisms (SCCs)

**❌ AVOID (Security Concerns):**
- Mentioning internal infrastructure details (if not already public)
- Revealing specific IP addresses or server configurations
- Exposing API endpoints or internal endpoints

**🎯 BEST PRACTICE:**
- **Cookie Banner:** Generic descriptions (geographic locations only)
- **Privacy Policy:** Full infrastructure disclosure
- This approach balances security, compliance, and transparency

---

## 📊 Data Collection Details by Platform

**⚠️ LEGAL REQUIREMENT:** GDPR and CCPA require transparent disclosure of what data is collected. This information must be shown to users in the Cookie Preferences panel.

### Why Data Storage Location Matters

**GDPR Requirements (Article 44-49):**
- ✅ Must inform users if data is transferred outside the EU/EEA
- ✅ Must disclose the legal basis for data transfers (e.g., Standard Contractual Clauses - SCCs)
- ✅ Users have the right to know where their data is stored
- ✅ Special considerations for transfers to countries without adequate protection

**CCPA Requirements:**
- ✅ Must disclose if data is sold or shared with third parties
- ✅ Must inform about data storage locations
- ✅ Users have the right to know about data transfers

**Best Practice:**
- Always include storage location in cookie consent disclosures
- Mention if data transfers occur (especially EU to US)
- Link to relevant privacy policies and data transfer mechanisms
- Use clear, user-friendly language about data locations

### Analytics Platforms

#### 1. Google Analytics (G-33HQSXK6F2)
**Data Collected:**
- IP address (anonymized)
- Browser type and version
- Device type (mobile/desktop/tablet)
- Operating system
- Pages visited
- Time spent on pages
- Click interactions
- Geographic location (country/city)
- Referral source
- Screen resolution
- Language preferences

**Purpose:**
- Website traffic analysis
- User behavior tracking
- Performance measurement
- Conversion tracking

**Data Retention:**
- 14 months (default)

**Data Storage Location:**
- Primary: Google Cloud servers in United States
- May be processed in: European Union (EU), United States, other regions
- **Note for EU users:** Data may be transferred to the US under Standard Contractual Clauses (SCCs)

**Third-Party Sharing:**
- Google (data processor)
- Subject to Google Privacy Policy

**Privacy Policy:** [https://policies.google.com/privacy](https://policies.google.com/privacy)

---

#### 2. Microsoft Clarity (rasaazt5qp)
**Data Collected:**
- IP address (masked)
- Browser type and version
- Device information
- Mouse movements and clicks
- Scrolling behavior
- Session recordings (heatmaps)
- Page URLs visited
- Time spent on pages

**Purpose:**
- User experience analysis
- Heatmap generation
- Session replay (anonymized)
- Conversion optimization

**Data Retention:**
- 12 months

**Data Storage Location:**
- Primary: Microsoft Azure servers in United States
- May be processed in: European Union (EU), United States, Asia-Pacific
- **Note for EU users:** Data stored in EU regions when available; may be transferred to US under GDPR safeguards

**Third-Party Sharing:**
- Microsoft (data processor)
- Subject to Microsoft Privacy Statement

**Privacy Policy:** [https://privacy.microsoft.com/privacystatement](https://privacy.microsoft.com/privacystatement)

---

#### 3. Google Tag Manager (GTM-M3DPV9C5)
**Data Collected:**
- No direct data collection
- Acts as container for other tracking scripts
- May log script load events

**Purpose:**
- Tag management
- Script loading control
- Event tracking coordination

**Data Retention:**
- Varies by tags configured within GTM

**Third-Party Sharing:**
- Depends on tags configured
- Google (data processor)

**Privacy Policy:** [https://policies.google.com/privacy](https://policies.google.com/privacy)

---

### Marketing/Advertising Platforms

#### 4. Meta Pixel / Facebook Pixel (1210170290049770)
**Data Collected:**
- IP address
- Browser information
- Cookie identifiers
- Facebook User ID (if logged in)
- Pages visited
- Actions taken (clicks, purchases, etc.)
- Referral URLs
- Device identifiers

**Purpose:**
- Ad targeting and personalization
- Conversion tracking
- Remarketing/retargeting
- Audience building
- Ad performance measurement

**Data Retention:**
- Up to 2 years

**Data Storage Location:**
- Primary: Meta/Facebook servers in United States
- May be processed in: European Union (EU), United States, global data centers
- **Note for EU users:** Data transferred to US under Standard Contractual Clauses (SCCs) and Meta EU-US Data Privacy Framework

**Third-Party Sharing:**
- Meta/Facebook (data controller)
- Advertising partners (via Meta)
- Subject to Meta Data Policy

**Privacy Policy:** [https://www.facebook.com/privacy/policy/](https://www.facebook.com/privacy/policy/)

**Opt-Out:** Users can opt-out via Facebook Ad Preferences

---

#### 5. Google Ads (AW-16786153056)
**Data Collected:**
- IP address
- Browser and device information
- Cookie identifiers
- Pages visited
- Search queries (if from Google)
- Conversion events (clicks, purchases, etc.)
- Geographic location
- Device type

**Purpose:**
- Ad serving and targeting
- Conversion tracking
- Remarketing
- Campaign optimization
- Audience segmentation

**Data Retention:**
- 14-26 months (varies by data type)

**Data Storage Location:**
- Primary: Google Cloud servers in United States
- May be processed in: European Union (EU), United States, global regions
- **Note for EU users:** Data may be transferred to the US under Standard Contractual Clauses (SCCs)

**Third-Party Sharing:**
- Google (data controller)
- Advertising partners (via Google Ads)
- Subject to Google Privacy Policy

**Privacy Policy:** [https://policies.google.com/privacy](https://policies.google.com/privacy)

**Opt-Out:** Users can opt-out via [Google Ads Settings](https://adssettings.google.com/)

---

#### 6. LinkedIn Insight Tag (8282209)
**Data Collected:**
- IP address
- Browser information
- Cookie identifiers
- LinkedIn User ID (if logged in)
- Pages visited
- Actions taken on website
- Referral source
- Device information

**Purpose:**
- Ad targeting on LinkedIn
- Conversion tracking
- Remarketing to LinkedIn members
- Campaign measurement
- Audience building

**Data Retention:**
- Up to 1 year

**Data Storage Location:**
- Primary: Microsoft Azure/LinkedIn servers in United States
- May be processed in: European Union (EU), United States, Asia-Pacific
- **Note for EU users:** LinkedIn processes data in EU when possible; transfers to US under GDPR safeguards

**Third-Party Sharing:**
- LinkedIn (data controller)
- Subject to LinkedIn Privacy Policy

**Privacy Policy:** [https://www.linkedin.com/legal/privacy-policy](https://www.linkedin.com/legal/privacy-policy)

**Opt-Out:** Users can opt-out via [LinkedIn Ad Preferences](https://www.linkedin.com/psettings/advertising)

---

#### 7. TikTok Pixel (D020C0RC77U0CJB7LSN0)
**Data Collected:**
- IP address
- Browser and device information
- TikTok User ID (if logged in)
- Cookie identifiers
- Pages visited
- Actions taken (video views, purchases, etc.)
- Device identifiers
- Advertising identifiers

**Purpose:**
- Ad targeting on TikTok
- Conversion tracking
- Remarketing
- Campaign optimization
- Audience building

**Data Retention:**
- Up to 3 years (varies by jurisdiction)

**Data Storage Location:**
- Primary: TikTok/ByteDance servers in Singapore and United States
- EU data may be stored in: Ireland (EU region)
- May be processed in: Singapore, United States, European Union (EU), China (for Chinese users)
- **Note for EU users:** Data for EU users stored in Ireland; may be transferred to US/Singapore under GDPR safeguards

**Third-Party Sharing:**
- TikTok (data controller)
- Advertising partners (via TikTok)
- Subject to TikTok Privacy Policy

**Privacy Policy:** [https://www.tiktok.com/legal/privacy-policy](https://www.tiktok.com/legal/privacy-policy)

**Opt-Out:** Users can manage preferences in TikTok app settings

---

## 📝 Recommended Cookie Banner & Privacy Policy Text

### ✅ Proposed Cookie Banner Text (Short Version)

```markdown
We use cookies to improve your browsing experience, analyze traffic, and provide personalized content. 
Your data is stored in Germany (EU), and may in the future be processed in the U.S. under GDPR safeguards. 
You can manage your preferences or read more in our Privacy and Cookie Policies.
```

### 📋 Detailed Cookie Information Text (For Cookie Preferences Panel)

Based on GDPR/CCPA requirements and best practices, here's a comprehensive version:

```markdown
🔍 What are cookies and why do we use them?

We use cookies and similar technologies to:
- Ensure the website functions properly (essential cookies)
- Analyze site traffic and usage patterns (analytics cookies)
- Deliver personalized content and advertisements (marketing cookies)
- Remember your preferences (functional cookies)

You can accept all cookies, reject non-essential ones, or customize your choices.

📍 Where is your data stored?

Currently, your data is processed and stored on secure primary application servers located in Germany (European Union).

In the future, some services may also be hosted on secure servers in the United States. 
EU user data transfers to the US will be protected by Standard Contractual Clauses (SCCs) 
under GDPR regulations. Users will be notified before any data transfer occurs.

🔄 How do we integrate with other systems?

Some features may communicate with third-party tools (e.g., calendars, job boards, external APIs) 
through our secure integration backend.

These integration servers only act as intermediaries (bridges) and do not store or permanently 
retain any personal data. They are used to securely transmit requests between systems.

⏳ How long is your data stored?

**Cookies:**
- Session cookies are deleted when you close your browser
- Essential cookies: Duration of session or until you log out
- Analytics cookies: Up to 14 months (Google Analytics), 12 months (Microsoft Clarity)
- Marketing cookies: Up to 2 years (Facebook Pixel), 14-26 months (Google Ads), 1 year (LinkedIn), 3 years (TikTok)
- Functional cookies: As long as needed to maintain your preferences

**Form Data:**
- Contact form submissions: **3 years** (for customer support and record-keeping purposes)
- Feedback/Review submissions: **3 years** (for service improvement purposes)
- After the retention period, data will be securely deleted or anonymized

**Blog:**
- Blog is read-only (no comments) - no user data collected directly from blog
- Analytics cookies may track blog page views (subject to your cookie preferences)

⚖️ Your choices and rights

You have full control over your data. You can:
- Accept or reject non-essential cookies
- Customize your cookie preferences by category
- Withdraw or modify your consent at any time
- Access, modify, or delete your personal data in accordance with GDPR or CCPA rights
- Request deletion of your personal data (including contact form submissions) via our Data Deletion Request Form
- Request a copy of your personal data (GDPR right to data portability)

**To exercise your rights:**
- Use our "Data Deletion Request Form" (available in Privacy Policy and footer)
- Contact us via our Contact Form or email
- We will respond within 30 days (GDPR) or 45 days (CCPA)

📊 Third-Party Data Collection

When you accept Analytics or Marketing cookies, the following third-party services may collect data:
- **Analytics:** Google Analytics, Microsoft Clarity (see "View data collection details" for full list)
- **Marketing:** Meta Pixel (Facebook), Google Ads, LinkedIn Insight Tag, TikTok Pixel (see "View data collection details" for full list)

Each service has its own data storage location (primarily US servers). 
EU user data transfers are protected by Standard Contractual Clauses (SCCs).
You can view detailed information about each service's data collection practices 
by clicking "View data collection details" below each category.

📃 Where can I learn more?

For full details, please see our:
- Privacy Policy
- Cookie Policy
- Do Not Sell My Personal Information (for U.S. residents under CCPA)
```

### ⚠️ Important Improvements Made:

1. **Added SCCs mention** - Critical for GDPR compliance when transferring EU data to US
2. **Specific retention periods** - More accurate than generic "13 months"
3. **Third-party disclosure** - Explicitly mentions that third-party services store data in US
4. **Generic server description** - Uses "primary application servers" instead of specific subdomain names (security best practice)
5. **User notification clause** - States users will be notified before data transfer
6. **References to detailed information** - Points users to expandable "View data collection details" sections

### 🎯 Usage Recommendation:

- **Cookie Banner (Short):** Use the short version at the bottom of the page
- **Cookie Preferences Panel:** Use the detailed version with expandable sections for each cookie category
- **Privacy Policy:** Full infrastructure disclosure including subdomain names

---

## 📝 Implementation in Cookie Preferences Panel

This information should be displayed in an expandable/collapsible section for each cookie category:

```typescript
// Add to ConsentPreferences.tsx - Expandable details for each platform

<div className="mt-3">
  <details className="group">
    <summary className="cursor-pointer text-xs text-primary dark:text-secondary hover:underline">
      View data collection details
    </summary>
    <div className="mt-2 p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 text-xs space-y-2">
      {/* Google Analytics Details */}
      <div>
        <h5 className="font-semibold mb-1">Google Analytics</h5>
        <p className="text-gray-600 dark:text-gray-400">
          Collects: IP address (anonymized), browser info, pages visited, device type, geographic location.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Retention: 14 months. 
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline ml-1">
            Privacy Policy
          </a>
        </p>
      </div>
      
      {/* Microsoft Clarity Details */}
      <div>
        <h5 className="font-semibold mb-1">Microsoft Clarity</h5>
        <p className="text-gray-600 dark:text-gray-400">
          Collects: IP address (masked), mouse movements, clicks, session recordings, page interactions.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Retention: 12 months.
          <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline ml-1">
            Privacy Policy
          </a>
        </p>
      </div>
      
      {/* Add similar blocks for all platforms */}
    </div>
  </details>
</div>
```

---

## Implementation Structure

```
components/
  ├── CookieConsent/
  │   ├── CookieBanner.tsx          # Main banner component
  │   ├── ConsentPreferences.tsx    # Preferences panel
  │   └── hooks/
  │       ├── useConsent.ts         # Consent management hook
  │       ├── useGeoLocation.ts     # Geolocation detection
  │       └── useCookieCategories.ts # Cookie categories management
  └── lib/
      ├── consentManager.ts         # Core consent logic
      ├── cookieBlocking.ts         # Cookie loading control
      └── consentStorage.ts         # Local & server storage
```

---

## Step-by-Step Implementation

### Step 1: Create Consent Types

```typescript
// types/consent.ts

export type ConsentCategory = 'essential' | 'functional' | 'analytics' | 'marketing';

export type UserLocation = 'EU' | 'US-CA' | 'US-OTHER' | 'OTHER';

export interface ConsentPreferences {
  essential: boolean;      // Always true
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  doNotSell?: boolean;     // CCPA specific
}

export interface ConsentData {
  preferences: ConsentPreferences;
  timestamp: string;
  location: UserLocation;
  version: string;         // Cookie Policy version
  ipAddress?: string;      // Optional for compliance
}
```

### Step 2: Create Consent Manager

```typescript
// lib/consentManager.ts

import { ConsentData, ConsentPreferences, UserLocation } from '@/types/consent';

const CONSENT_STORAGE_KEY = 'flowxtra_consent';
const CONSENT_VERSION = '1.0';

export class ConsentManager {
  // Get stored consent
  static getConsent(): ConsentData | null {
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  // Save consent
  static saveConsent(preferences: ConsentPreferences, location: UserLocation): void {
    const consentData: ConsentData = {
      preferences: {
        essential: true, // Always true
        functional: preferences.functional,
        analytics: preferences.analytics,
        marketing: preferences.marketing,
        doNotSell: preferences.doNotSell,
      },
      timestamp: new Date().toISOString(),
      location,
      version: CONSENT_VERSION,
    };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    
    // Send to server for logging (optional)
    this.logConsentToServer(consentData);
  }

  // Check if consent exists
  static hasConsent(): boolean {
    return this.getConsent() !== null;
  }

  // Check if specific category is allowed
  static isCategoryAllowed(category: ConsentCategory): boolean {
    const consent = this.getConsent();
    if (!consent) return false;

    // Essential is always allowed
    if (category === 'essential') return true;

    return consent.preferences[category] === true;
  }

  // Revoke consent
  static revokeConsent(): void {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  }

  // Log to server (for compliance)
  private static async logConsentToServer(data: ConsentData): Promise<void> {
    try {
      await fetch('/api/consent/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Failed to log consent:', error);
    }
  }
}
```

### Step 3: Create Geolocation Hook

```typescript
// components/CookieConsent/hooks/useGeoLocation.ts

import { useState, useEffect } from 'react';
import { UserLocation } from '@/types/consent';

export function useGeoLocation(): UserLocation {
  const [location, setLocation] = useState<UserLocation>('OTHER');

  useEffect(() => {
    // Method 1: Browser locale detection
    const browserLocale = navigator.language || (navigator as any).userLanguage;
    
    // Method 2: Timezone-based detection (simple)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Method 3: IP-based detection (requires API call)
    detectLocationFromIP().then(setLocation);

    // Fallback to EU if uncertain (stricter default)
    if (!location || location === 'OTHER') {
      setLocation('EU');
    }
  }, []);

  return location;
}

async function detectLocationFromIP(): Promise<UserLocation> {
  try {
    // Option 1: Use free IP geolocation service
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.country_code === 'US') {
      return data.region_code === 'CA' ? 'US-CA' : 'US-OTHER';
    }
    
    if (data.country_code === 'AT' || data.country_code === 'DE' || 
        data.in_eu === true) {
      return 'EU';
    }
    
    return 'OTHER';
  } catch {
    // Fallback to EU for safety
    return 'EU';
  }
}
```

### Step 4: Create Consent Hook

```typescript
// components/CookieConsent/hooks/useConsent.ts

import { useState, useEffect } from 'react';
import { ConsentPreferences, UserLocation, ConsentCategory } from '@/types/consent';
import { ConsentManager } from '@/lib/consentManager';
import { useGeoLocation } from './useGeoLocation';

export function useConsent() {
  const location = useGeoLocation();
  const [hasConsent, setHasConsent] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
    doNotSell: location === 'US-CA' ? false : undefined,
  });

  useEffect(() => {
    const stored = ConsentManager.getConsent();
    if (stored) {
      setHasConsent(true);
      setPreferences(stored.preferences);
    }
  }, []);

  const acceptAll = () => {
    const newPreferences: ConsentPreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      doNotSell: location === 'US-CA' ? false : undefined,
    };
    
    ConsentManager.saveConsent(newPreferences, location);
    setPreferences(newPreferences);
    setHasConsent(true);
    loadCookies(newPreferences);
  };

  const rejectAll = () => {
    const newPreferences: ConsentPreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      doNotSell: location === 'US-CA' ? true : undefined,
    };
    
    ConsentManager.saveConsent(newPreferences, location);
    setPreferences(newPreferences);
    setHasConsent(true);
    loadCookies(newPreferences);
  };

  const savePreferences = (newPreferences: ConsentPreferences) => {
    ConsentManager.saveConsent(newPreferences, location);
    setPreferences(newPreferences);
    setHasConsent(true);
    loadCookies(newPreferences);
  };

  const isCategoryAllowed = (category: ConsentCategory): boolean => {
    return ConsentManager.isCategoryAllowed(category);
  };

  return {
    hasConsent,
    preferences,
    location,
    acceptAll,
    rejectAll,
    savePreferences,
    isCategoryAllowed,
  };
}

function loadCookies(preferences: ConsentPreferences) {
  // Load analytics cookies
  if (preferences.analytics) {
    // Google Analytics (G-33HQSXK6F2)
    loadGoogleAnalytics();
    
    // Microsoft Clarity (rasaazt5qp)
    loadMicrosoftClarity();
    
    // Google Tag Manager (GTM-M3DPV9C5) - Analytics
    loadGoogleTagManager();
  }

  // Load marketing cookies
  if (preferences.marketing) {
    // Meta Pixel / Facebook Pixel (1210170290049770)
    loadMetaPixel();
    
    // Google Ads (AW-16786153056)
    loadGoogleAds();
    
    // LinkedIn Insight Tag (8282209)
    loadLinkedInInsight();
    
    // TikTok Pixel (D020C0RC77U0CJB7LSN0)
    loadTikTokPixel();
    
    // Google Tag Manager (GTM-M3DPV9C5) - Marketing
    loadGoogleTagManager();
  }
}

// Analytics loading functions
function loadGoogleAnalytics() {
  // Google Analytics is loaded via gtag.js in layout.tsx
  // Will be blocked until consent is given
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-33HQSXK6F2', {
      'anonymize_ip': true, // GDPR compliance
    });
  }
}

function loadMicrosoftClarity() {
  if (typeof window !== 'undefined') {
    (function(c: any, l: any, a: string, r: string, i: string) {
      c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
      const t = l.createElement(r);
      t.async = true;
      t.src = `https://www.clarity.ms/tag/${i}`;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'rasaazt5qp');
  }
}

function loadGoogleTagManager() {
  if (typeof window !== 'undefined') {
    (function(w: any, d: any, s: string, l: string, i: string) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const f = d.getElementsByTagName(s)[0];
      const j = d.createElement(s);
      const dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-M3DPV9C5');
  }
}

// Marketing loading functions
function loadMetaPixel() {
  if (typeof window !== 'undefined') {
    !function(f: any, b: any, e: string, v: string) {
      if (f.fbq) return;
      const n: any = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e);
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    
    (window as any).fbq('init', '1210170290049770');
    (window as any).fbq('track', 'PageView');
  }
}

function loadGoogleAds() {
  if (typeof window !== 'undefined' && window.gtag) {
    (window as any).gtag('config', 'AW-16786153056');
  }
}

function loadLinkedInInsight() {
  if (typeof window !== 'undefined') {
    (window as any)._linkedin_partner_id = '8282209';
    (window as any)._linkedin_data_partner_ids = (window as any)._linkedin_data_partner_ids || [];
    (window as any)._linkedin_data_partner_ids.push((window as any)._linkedin_partner_id);
    
    (function(l: any) {
      if (!l) {
        (window as any).lintrk = function(a: any, b: any) {
          ((window as any).lintrk.q = (window as any).lintrk.q || []).push([a, b]);
        };
        (window as any).lintrk.q = [];
      }
      const s = document.getElementsByTagName('script')[0];
      const b = document.createElement('script');
      b.type = 'text/javascript';
      b.async = true;
      b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      s.parentNode.insertBefore(b, s);
    })((window as any).lintrk);
  }
}

function loadTikTokPixel() {
  if (typeof window !== 'undefined') {
    !function(w: any, d: any, t: string) {
      w.TiktokAnalyticsObject = t;
      const ttq = w[t] = w[t] || [];
      ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent'];
      ttq.setAndDefer = function(t: any, e: any) {
        t[e] = function() {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function(t: string) {
        for (let e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
        return e;
      };
      ttq.load = function(e: string, n: any) {
        const r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        const o = n && n.partner;
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = r;
        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = r + '?sdkid=' + e + '&lib=' + t;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
      };
      ttq.load('D020C0RC77U0CJB7LSN0');
      ttq.page();
    }(window, document, 'ttq');
  }
}
```

### Step 5: Create Cookie Banner Component

```typescript
// components/CookieConsent/CookieBanner.tsx

'use client';

import { useState, useEffect } from 'react';
import { useConsent } from './hooks/useConsent';
import { ConsentPreferences } from './hooks/useConsent';

export function CookieBanner() {
  const { hasConsent, location, acceptAll, rejectAll } = useConsent();
  const [showPreferences, setShowPreferences] = useState(false);

  if (hasConsent) return null;

  const isEU = location === 'EU';
  const isCalifornia = location === 'US-CA';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl">
      <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Message */}
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">
              {isEU 
                ? 'We use cookies' 
                : 'Cookie Notice'
              }
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              {isEU 
                ? 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.'
                : isCalifornia
                ? 'We collect and may sell your personal information. You have the right to opt-out. Click "Do Not Sell" to exercise your rights under CCPA.'
                : 'We use cookies to improve your experience. You can manage your preferences at any time.'
              }
              {' '}
              <a 
                href="/cookie-policy" 
                className="text-primary dark:text-secondary underline hover:no-underline"
              >
                Learn more
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {/* Reject All - Required for EU */}
            {isEU && (
              <button
                onClick={rejectAll}
                className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium text-sm md:text-base"
              >
                Reject All
              </button>
            )}

            {/* Do Not Sell - Required for California */}
            {isCalifornia && (
              <button
                onClick={rejectAll}
                className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium text-sm md:text-base"
              >
                Do Not Sell
              </button>
            )}

            {/* Preferences Button */}
            <button
              onClick={() => setShowPreferences(true)}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-sm md:text-base"
            >
              Preferences
            </button>

            {/* Accept All */}
            <button
              onClick={acceptAll}
              className="px-4 py-2 bg-button-primary border-2 border-button-primary text-white rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-sm md:text-base"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Panel */}
      {showPreferences && (
        <ConsentPreferences
          onClose={() => setShowPreferences(false)}
          onSave={(prefs) => {
            // Handle save
            setShowPreferences(false);
          }}
        />
      )}
    </div>
  );
}
```

### Step 6: Create Preferences Panel

```typescript
// components/CookieConsent/ConsentPreferences.tsx

'use client';

import { useState } from 'react';
import { useConsent } from './hooks/useConsent';
import { ConsentPreferences as ConsentPrefsType } from '@/types/consent';

interface ConsentPreferencesProps {
  onClose: () => void;
  onSave: (preferences: ConsentPrefsType) => void;
}

export function ConsentPreferences({ onClose, onSave }: ConsentPreferencesProps) {
  const { preferences: initialPrefs, location, savePreferences } = useConsent();
  const [preferences, setPreferences] = useState<ConsentPrefsType>(initialPrefs);

  const isEU = location === 'EU';
  const isCalifornia = location === 'US-CA';

  const handleToggle = (category: keyof ConsentPrefsType) => {
    if (category === 'essential') return; // Essential is always true
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    savePreferences(preferences);
    onSave(preferences);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Cookie Preferences
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
            Manage your cookie preferences. You can enable or disable different types of cookies below.
          </p>

          {/* Data Storage Information */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              Data Storage Location
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <strong>Current:</strong> Your data is stored on our primary application servers located in 🇩🇪 <strong>Germany (European Union)</strong>
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Future:</strong> We may expand to servers in 🇺🇸 <strong>United States</strong>. EU user data transfers to US will be protected by Standard Contractual Clauses (SCCs) under GDPR. Users will be notified before any data transfer occurs.
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              For detailed infrastructure information, see our <a href="/privacy-policy" className="text-primary dark:text-secondary underline">Privacy Policy</a>
            </p>
          </div>

          {/* Essential Cookies */}
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Essential Cookies
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  These cookies are necessary for the website to function. They cannot be disabled.
                </p>
              </div>
              <div className="ml-4">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-5 h-5 text-primary"
                />
              </div>
            </div>
          </div>

          {/* Functional Cookies */}
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Functional Cookies
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  These cookies enable enhanced functionality and personalization.
                </p>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={() => handleToggle('functional')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Analytics Cookies
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  These cookies help us understand how visitors interact with our website.
                </p>
                {/* List of Analytics Tools */}
                <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>Google Analytics (G-33HQSXK6F2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>Microsoft Clarity (rasaazt5qp)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>Google Tag Manager (GTM-M3DPV9C5)</span>
                  </div>
                </div>

                {/* Expandable Data Collection Details */}
                <details className="mt-3 group">
                  <summary className="cursor-pointer text-xs text-primary dark:text-secondary hover:underline flex items-center gap-1">
                    <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    View data collection details
                  </summary>
                  <div className="mt-2 p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 text-xs space-y-3">
                    {/* Google Analytics */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Google Analytics</h5>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Collects:</strong> IP address (anonymized), browser info, pages visited, device type, geographic location, time on page, clicks.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Retention:</strong> 14 months
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Storage:</strong> Google Cloud servers (US/EU). May transfer to US under SCCs.
                      </p>
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline">
                        Privacy Policy →
                      </a>
                    </div>

                    {/* Microsoft Clarity */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Microsoft Clarity</h5>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Collects:</strong> IP address (masked), mouse movements, clicks, session recordings, heatmaps, page interactions.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Retention:</strong> 12 months
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Storage:</strong> Microsoft Azure servers (US/EU). EU data stored in EU regions when available.
                      </p>
                      <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline">
                        Privacy Policy →
                      </a>
                    </div>

                    {/* Google Tag Manager */}
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Google Tag Manager</h5>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Collects:</strong> Acts as container for other tracking scripts. No direct data collection.
                      </p>
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline">
                        Privacy Policy →
                      </a>
                    </div>
                  </div>
                </details>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handleToggle('analytics')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Marketing Cookies
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  These cookies are used to deliver personalized advertisements.
                </p>
                {/* List of Marketing Tools */}
                <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>Meta Pixel / Facebook (1210170290049770)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>Google Ads (AW-16786153056)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>LinkedIn Insight Tag (8282209)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>TikTok Pixel (D020C0RC77U0CJB7LSN0)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>Google Tag Manager (GTM-M3DPV9C5)</span>
                  </div>
                </div>

                {/* Expandable Data Collection Details */}
                <details className="mt-3 group">
                  <summary className="cursor-pointer text-xs text-primary dark:text-secondary hover:underline flex items-center gap-1">
                    <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    View data collection details
                  </summary>
                  <div className="mt-2 p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 text-xs space-y-3 max-h-64 overflow-y-auto">
                    {/* Meta Pixel */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Meta Pixel / Facebook</h5>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Collects:</strong> IP address, browser info, cookie IDs, Facebook User ID (if logged in), pages visited, actions taken, device identifiers.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Retention:</strong> Up to 2 years
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Storage:</strong> Meta/Facebook servers (US/Global). EU data transferred to US under SCCs.
                      </p>
                      <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline">
                        Privacy Policy →
                      </a>
                    </div>

                    {/* Google Ads */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Google Ads</h5>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Collects:</strong> IP address, browser/device info, cookie IDs, pages visited, conversion events, geographic location.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Retention:</strong> 14-26 months
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Storage:</strong> Google Cloud servers (US/EU). May transfer to US under SCCs.
                      </p>
                      <div className="flex flex-col gap-1">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline">
                          Privacy Policy →
                        </a>
                        <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline text-xs">
                          Opt-out via Google Ads Settings →
                        </a>
                      </div>
                    </div>

                    {/* LinkedIn Insight Tag */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">LinkedIn Insight Tag</h5>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Collects:</strong> IP address, browser info, cookie IDs, LinkedIn User ID (if logged in), pages visited, actions taken, device info.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Retention:</strong> Up to 1 year
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Storage:</strong> Microsoft Azure/LinkedIn servers (US/EU). EU data processed in EU when possible.
                      </p>
                      <div className="flex flex-col gap-1">
                        <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline">
                          Privacy Policy →
                        </a>
                        <a href="https://www.linkedin.com/psettings/advertising" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline text-xs">
                          Opt-out via LinkedIn Ad Preferences →
                        </a>
                      </div>
                    </div>

                    {/* TikTok Pixel */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">TikTok Pixel</h5>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Collects:</strong> IP address, browser/device info, TikTok User ID (if logged in), cookie IDs, pages visited, actions taken, device/advertising identifiers.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Retention:</strong> Up to 3 years (varies by jurisdiction)
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Storage:</strong> TikTok servers in Singapore/US. EU data stored in Ireland; may transfer to US/Singapore.
                      </p>
                      <a href="https://www.tiktok.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline">
                        Privacy Policy →
                      </a>
                    </div>

                    {/* Google Tag Manager */}
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Google Tag Manager</h5>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Collects:</strong> Acts as container for other tracking scripts. No direct data collection.
                      </p>
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary underline">
                        Privacy Policy →
                      </a>
                    </div>
                  </div>
                </details>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handleToggle('marketing')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Do Not Sell - CCPA specific */}
          {isCalifornia && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Do Not Sell My Personal Information
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Under CCPA, you have the right to opt-out of the sale of your personal information.
                  </p>
                </div>
                <div className="ml-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.doNotSell === true}
                      onChange={() => setPreferences(prev => ({
                        ...prev,
                        doNotSell: !prev.doNotSell,
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-button-primary border-2 border-button-primary text-white rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Step 7: Cookie Blocking Logic

```typescript
// lib/cookieBlocking.ts

import { ConsentManager } from './consentManager';
import { ConsentCategory } from '@/types/consent';

// Block cookies until consent
export function blockCookiesUntilConsent() {
  if (typeof window === 'undefined') return;

  // Override document.cookie setter
  const originalSet = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')?.set;
  
  Object.defineProperty(document, 'cookie', {
    set: function(value: string) {
      const cookieName = value.split('=')[0];
      
      // Check if this cookie type is allowed
      if (!isCookieAllowed(cookieName)) {
        console.log('Cookie blocked:', cookieName);
        return;
      }

      // Allow essential cookies
      if (originalSet) {
        originalSet.call(this, value);
      }
    },
    get: function() {
      const originalGet = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')?.get;
      return originalGet ? originalGet.call(this) : '';
    },
    configurable: true,
  });
}

function isCookieAllowed(cookieName: string): boolean {
  // Essential cookies mapping
  const essentialCookies = ['session', 'auth', 'csrf', 'security'];
  
  if (essentialCookies.some(name => cookieName.toLowerCase().includes(name))) {
    return true;
  }

  // Check consent for other cookies
  if (cookieName.toLowerCase().includes('analytics') || 
      cookieName.toLowerCase().includes('_ga') ||
      cookieName.toLowerCase().includes('_gid')) {
    return ConsentManager.isCategoryAllowed('analytics');
  }

  if (cookieName.toLowerCase().includes('marketing') ||
      cookieName.toLowerCase().includes('fbp') ||
      cookieName.toLowerCase().includes('_fbp')) {
    return ConsentManager.isCategoryAllowed('marketing');
  }

  // Default: require consent
  return ConsentManager.isCategoryAllowed('functional');
}
```

### Step 8: Integration in Layout

#### 8.1: Add Cookie Banner Component

```typescript
// app/layout.tsx

import { CookieBanner } from '@/components/CookieConsent/CookieBanner';
import { CookieScriptLoader } from '@/components/CookieConsent/CookieScriptLoader';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CookieScriptLoader />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
```

#### 8.2: Create Cookie Script Loader Component

This component will conditionally load tracking scripts based on consent:

```typescript
// components/CookieConsent/CookieScriptLoader.tsx

'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { ConsentManager } from '@/lib/consentManager';
import { ConsentCategory } from '@/types/consent';

export function CookieScriptLoader() {
  const [hasConsent, setHasConsent] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    const consent = ConsentManager.getConsent();
    if (consent) {
      setHasConsent(true);
      setAnalyticsAllowed(consent.preferences.analytics);
      setMarketingAllowed(consent.preferences.marketing);
    }
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      {/* Analytics Scripts - Only load if analytics consent given */}
      {analyticsAllowed && (
        <>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-33HQSXK6F2"
            strategy="afterInteractive"
          />
          <Script id="google-analytics-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-33HQSXK6F2', {
                'anonymize_ip': true
              });
            `}
          </Script>

          {/* Microsoft Clarity */}
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "rasaazt5qp");
            `}
          </Script>
        </>
      )}

      {/* Marketing Scripts - Only load if marketing consent given */}
      {marketingAllowed && (
        <>
          {/* Google Tag Manager */}
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-M3DPV9C5');
              `,
            }}
          />

          {/* Google Ads */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-16786153056"
            strategy="afterInteractive"
          />
          <Script id="google-ads-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16786153056');
            `}
          </Script>

          {/* Meta Pixel / Facebook Pixel */}
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1210170290049770');
              fbq('track', 'PageView');
            `}
          </Script>

          {/* LinkedIn Insight Tag */}
          <Script id="linkedin-partner-id" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "8282209";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            `}
          </Script>
          <Script
            id="linkedin-insight"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(l) {
                  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[]}
                  var s = document.getElementsByTagName("script")[0];
                  var b = document.createElement("script");
                  b.type = "text/javascript";b.async = true;
                  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                  s.parentNode.insertBefore(b, s);})(window.lintrk);
              `,
            }}
          />

          {/* TikTok Pixel */}
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('D020C0RC77U0CJB7LSN0');
                ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>
        </>
      )}
    </>
  );
}
```

#### 8.3: Remove Tracking Scripts from layout.tsx

**Important:** Remove or comment out all tracking scripts from `app/layout.tsx` and move them to `CookieScriptLoader.tsx` so they only load after consent is given.

**Current scripts in layout.tsx to be moved:**
- Google Tag Manager (lines 42-55)
- Google Ads (lines 68-72, 80-87)
- Google Analytics (lines 74-78, 80-87)
- Google Conversion (lines 90-95)
- Microsoft Clarity (lines 97-106)
- LinkedIn Insight Tag (lines 108-134)
- TikTok Pixel (lines 136-147)
- Meta Pixel (lines 149-172)

**After moving:** Keep only essential HTML structure and include `<CookieScriptLoader />` component.

### Step 9: Update Footer Button

```typescript
// components/Footer.tsx (update Consent Preferences button)

import { useConsent } from '@/components/CookieConsent/hooks/useConsent';

export default function Footer() {
  const { preferences, location } = useConsent();
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <footer>
      {/* ... existing code ... */}
      
      <button 
        onClick={() => setShowPreferences(true)}
        className="flex items-center gap-2 text-sm text-primary dark:text-white hover:text-secondary dark:hover:text-gray-300 transition-colors"
      >
        <svg>...</svg>
        <span>Consent Preferences</span>
      </button>

      {showPreferences && (
        <ConsentPreferences
          onClose={() => setShowPreferences(false)}
          onSave={() => setShowPreferences(false)}
        />
      )}
    </footer>
  );
}
```

---

## 📋 Data Collection Forms & User Rights

### Contact Form Implementation

**Required Disclosure:**
- Must mention 3-year retention period in Privacy Policy
- Must be accessible in Cookie Policy under "Data We Collect"
- Legal basis: Legitimate interest

**Example Privacy Policy Text:**
```
Contact Form Data:
- What we collect: Name, email address, message, phone (optional), company (optional)
- Why we collect it: To respond to your inquiries and provide customer support
- How long we keep it: 3 years from date of submission
- Legal basis: Legitimate interest (responding to user inquiries)
- Your rights: You can request deletion at any time via Data Deletion Request Form
```

### Feedback/Review Form Implementation

**Required Disclosure:**
- Similar to Contact Form
- Must mention purpose (service improvement)

**Example Privacy Policy Text:**
```
Feedback/Review Data:
- What we collect: Name, email (optional), rating, feedback text
- Why we collect it: To improve our services and understand user satisfaction
- How long we keep it: 3 years from date of submission
- Legal basis: Legitimate interest (service improvement)
- Your rights: You can request deletion at any time
```

### Data Deletion Request Form (CRITICAL - GDPR/CCPA Required)

**⚠️ MUST IMPLEMENT - Legal Requirement**

**GDPR Requirement (Article 17 - Right to Erasure):**
- Users have the right to request deletion of personal data
- Must be free of charge
- Response within 30 days (can extend to 60 days if complex)
- Must delete unless legal obligation requires retention

**CCPA Requirement:**
- Users can request deletion of personal information
- Response within 45 days
- Must verify user identity before deletion

**Required Form Fields:**
```typescript
interface DataDeletionRequest {
  fullName: string;           // Required for identity verification
  email: string;             // Required - must match account email
  phone?: string;            // Optional - for verification if needed
  reason?: string;            // Optional - helps understand request
  dataType: string[];        // What data to delete: ['contact_form', 'account', 'cookies', 'all']
  confirmation: boolean;     // User confirms they want deletion
}
```

**Implementation Example:**
```tsx
// pages/data-deletion-request.tsx or app/data-deletion-request/page.tsx

'use client';

export default function DataDeletionRequest() {
  // Form implementation
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Request Data Deletion</h1>
      <p className="mb-4">
        Under GDPR (Article 17) and CCPA, you have the right to request deletion 
        of your personal data. Please fill out this form to submit your request.
      </p>
      
      <form>
        {/* Form fields */}
        <label>
          Full Name <span className="text-red-500">*</span>
          <input type="text" name="fullName" required />
        </label>
        
        <label>
          Email Address <span className="text-red-500">*</span>
          <input type="email" name="email" required />
          <small>Must match the email address associated with your data</small>
        </label>
        
        <label>
          What data would you like to delete?
          <select name="dataType" multiple>
            <option value="contact_form">Contact Form Submissions</option>
            <option value="feedback">Feedback/Review Submissions</option>
            <option value="account">User Account Data</option>
            <option value="cookies">Cookie Preferences</option>
            <option value="all">All Personal Data</option>
          </select>
        </label>
        
        <label>
          Reason (Optional)
          <textarea name="reason" />
        </label>
        
        <label>
          <input type="checkbox" required />
          I confirm that I want to permanently delete the selected data. 
          This action cannot be undone.
        </label>
        
        <button type="submit">Submit Deletion Request</button>
      </form>
      
      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3>What happens next?</h3>
        <ul>
          <li>We will verify your identity (within 5 business days)</li>
          <li>We will process your request (within 30 days for GDPR, 45 days for CCPA)</li>
          <li>We will confirm deletion via email</li>
          <li>Note: Some data may be retained if required by law</li>
        </ul>
      </div>
    </div>
  );
}
```

**Link to Data Deletion Form:**
- Must be accessible from:
  - Privacy Policy page
  - Cookie Policy page
  - Footer (optional but recommended)
  - Cookie Preferences panel (under "Your Rights" section)

**Example Footer Link:**
```tsx
// components/Footer.tsx
<a href="/data-deletion-request" className="text-sm text-gray-600 hover:text-primary">
  Request Data Deletion
</a>
```

### Blog (Read-Only) Disclosure

**Privacy Policy Text:**
```
Blog:
Our blog is read-only (no comments section). We do not collect personal data directly 
from blog interactions. However, blog page views may be tracked via Analytics cookies 
(subject to your cookie preferences). No user registration or personal information 
collection occurs on blog pages.
```

---

## Testing Checklist

### GDPR Compliance (Europe)
- [ ] Banner appears on first visit
- [ ] Reject All button works
- [ ] No non-essential cookies loaded before consent
- [ ] Preferences panel allows granular control
- [ ] Consent can be revoked easily
- [ ] Cookie Policy link present
- [ ] Data Deletion Request Form accessible and functional
- [ ] Contact Form data retention (3 years) disclosed
- [ ] Feedback/Review form data retention disclosed

### CCPA Compliance (California)
- [ ] Do Not Sell button appears
- [ ] Clear notice about data collection
- [ ] Opt-out functionality works
- [ ] Privacy Policy link present
- [ ] Data Deletion Request Form accessible (45-day response)
- [ ] Contact Form data retention disclosed

### General
- [ ] Geolocation detection works
- [ ] Preferences saved to localStorage
- [ ] Consent persists across sessions
- [ ] Mobile responsive
- [ ] Dark mode support
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Data Deletion Request Form works and sends emails
- [ ] Contact Form retention period mentioned in Privacy Policy
- [ ] Blog read-only status mentioned (if applicable)

---

## Best Practices

1. **Always show banner on first visit** - Don't assume consent
2. **Block cookies until consent** - Use cookie blocking logic
3. **Log consent for compliance** - Store consent records
4. **Update version tracking** - Track Cookie Policy changes
5. **Clear messaging** - Use simple, understandable language
6. **Easy revocation** - Always allow users to change preferences
7. **Regular audits** - Review cookie usage regularly
8. **Documentation** - Keep Cookie Policy updated

---

## Resources

- [GDPR Official Text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679)
- [CCPA Official Site](https://oag.ca.gov/privacy/ccpa)
- [Cookie Law Info](https://www.cookielaw.org/)
- [IAB Transparency & Consent Framework](https://iabeurope.eu/transparency-consent-framework/)

---

## Next Steps

1. ✅ Create types and interfaces
2. ✅ Implement ConsentManager
3. ✅ Create Geolocation detection
4. ✅ Build CookieBanner component
5. ✅ Build ConsentPreferences panel
6. ✅ Implement cookie blocking
7. ✅ Integrate in layout
8. ✅ Create Cookie Policy page
9. ✅ Test GDPR compliance
10. ✅ Test CCPA compliance
11. ✅ Deploy and monitor

---

**Last Updated:** January 2025
**Version:** 1.0.0

