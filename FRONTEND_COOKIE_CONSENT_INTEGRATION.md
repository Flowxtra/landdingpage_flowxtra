# Frontend Integration Guide (Next.js) → Cookie Consent ↔ Laravel Backend

This guide explains how to connect your Next.js frontend to the Laravel backend Cookie Consent APIs and test the flow with Postman.

---

## 1) Backend Base URL

Create `.env.local` in your Next.js app:

```
NEXT_PUBLIC_developemant_BACKEND_URL=http://localhost:8765
```

All requests below use: `${process.env.NEXT_PUBLIC_BACKEND_URL}`

---

## 2) API Endpoints (Laravel)

- POST `/api/consent/log`  (Public)
- GET `/api/consent/check` (Protected: Bearer token)
- GET `/api/consent/history` (Protected)
- GET `/api/consent/export` (Protected)
- DELETE `/api/consent` (Protected)

Request/response contracts are implemented in `app/Http/Controllers/Api/ConsentController.php`.

---

## 3) Test with Postman

- Method: POST
- URL: `http://localhost:8765/api/consent/log`
- Headers:
  - `Content-Type: application/json`
  - `Accept: application/json`
- Body (JSON):

```
{
  "consentId": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4",
  "preferences": {
    "essential": true,
    "functional": true,
    "analytics": false,
    "marketing": false
  },
  "timestamp": "2025-11-03T10:30:00.000Z",
  "version": "1.0",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "language": "en",
  "consentMethod": "banner"
}
```

Expected:
```
{
  "success": true,
  "message": "Consent logged successfully",
  "consentId": "..."
}
```

Protected endpoints require:
```
Authorization: Bearer <YOUR_TOKEN>
```
Get token via your auth flow (e.g., `/api/auth/login`).

---

## 4) Next.js Integration (Client)

Create helpers:

```ts
// lib/cookie-consent/types.ts
export type CookiePreferences = {
  essential: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export type ConsentPayload = {
  consentId: string
  preferences: CookiePreferences
  timestamp: string
  version?: string
  userAgent?: string
  language?: string
  consentMethod: 'banner' | 'preferences'
}
```

```ts
// lib/cookie-consent/storage.ts
export const getConsentId = (): string => {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('consentId')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('consentId', id)
  }
  return id
}
```

```ts
// lib/cookie-consent/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8765'

export async function logConsent(payload: any) {
  const res = await fetch(`${BASE_URL}/api/consent/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to log consent')
  return res.json()
}

export async function checkConsent(token: string) {
  const res = await fetch(`${BASE_URL}/api/consent/check`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to check consent')
  return res.json()
}
```

Banner component:

```tsx
// components/cookie-consent/CookieBanner.tsx
'use client'
import { useEffect, useState } from 'react'
import { getConsentId } from '@/lib/cookie-consent/storage'
import { logConsent } from '@/lib/cookie-consent/api'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setVisible(!localStorage.getItem('cookieConsentGiven'))
  }, [])

  const submit = async (prefs: any, method: 'banner' | 'preferences') => {
    await logConsent({
      consentId: getConsentId(),
      preferences: prefs,
      timestamp: new Date().toISOString(),
      version: '1.0',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      language: typeof navigator !== 'undefined' ? navigator.language : 'en',
      consentMethod: method,
    })
    localStorage.setItem('cookieConsentGiven', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{position:'fixed',bottom:16,left:16,right:16,padding:16,background:'#111',color:'#fff',borderRadius:12}}>
      <div style={{marginBottom:8}}>We use cookies to improve your experience.</div>
      <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
        <button onClick={() => submit({ essential:true, functional:true, analytics:false, marketing:false }, 'banner')}
          style={{padding:'8px 12px',background:'#334155',color:'#fff',borderRadius:8}}>Customize</button>
        <button onClick={() => submit({ essential:true, functional:true, analytics:true, marketing:true }, 'banner')}
          style={{padding:'8px 12px',background:'#16a34a',color:'#fff',borderRadius:8}}>Accept all</button>
      </div>
    </div>
  )
}
```

Usage (add to layout):

```tsx
// app/layout.tsx
import CookieBanner from '@/components/cookie-consent/CookieBanner'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CookieBanner />
        {children}
      </body>
    </html>
  )
}
```

---

## 5) Auth-based Checks (Optional)

For logged-in users, fetch with Bearer token:

```ts
import { checkConsent } from '@/lib/cookie-consent/api'
const data = await checkConsent(token)
```

---

## 6) Troubleshooting

- 422 Validation: ensure all required fields exist (`consentId`, `preferences.*`, `timestamp`, `consentMethod`).
- CORS: if frontend runs on a different port, enable CORS in Laravel (e.g., `fruitcake/laravel-cors`).
- DB: verify records in Filament → `Cookie Consent > Consent Logs`.

---

## 7) References

- Backend controller: `app/Http/Controllers/Api/ConsentController.php`
- Resource view: `app/Filament/Resources/CookieConsentLogResource.php`
- Logs table: `cookie_consent_logs`

