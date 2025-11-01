# 🔌 API Requirements for Cookie Consent System

## 📋 Overview

This document specifies **EXACTLY** what the Backend/API team needs to implement to integrate with the Cookie Consent system on the frontend.

**Status:** Frontend is 100% ready. Backend API endpoint needs to be created.

---

## 🎯 What Needs to Be Done

You need to create **ONE API endpoint** that receives consent data from the frontend and saves it to the database.

---

## 📡 API Endpoint Specification

### Endpoint Details

```
Method:  POST
URL:     /api/consent/log
Headers: Content-Type: application/json
Auth:    Not required (accepts anonymous visitors)
```

---

## 📥 Request Format

### Headers
```http
POST /api/consent/log HTTP/1.1
Host: flowxtra.com
Content-Type: application/json
```

### Body (JSON)
```json
{
  "consentId": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4",
  "preferences": {
    "essential": true,
    "functional": true,
    "analytics": false,
    "marketing": false,
    "doNotSell": false
  },
  "timestamp": "2025-11-01T10:30:00.000Z",
  "location": "EU",
  "version": "1.0",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "language": "en",
  "consentMethod": "banner"
}
```

### Field Descriptions

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `consentId` | String (UUID) | ✅ Yes | Unique identifier for this consent | `"eb9c2acf-4e9a-48d2-ba86-54fea2003ca4"` |
| `preferences` | Object | ✅ Yes | What the user accepted/rejected | See below |
| `timestamp` | String (ISO 8601) | ✅ Yes | When consent was given | `"2025-11-01T10:30:00.000Z"` |
| `location` | String | ✅ Yes | User's geographic location | `"EU"`, `"US-CA"`, `"US-OTHER"`, `"OTHER"` |
| `version` | String | ✅ Yes | Cookie policy version | `"1.0"` |
| `userAgent` | String | ❌ No | Browser information | `"Mozilla/5.0..."` |
| `language` | String | ❌ No | User's language preference | `"en"`, `"de"` |
| `consentMethod` | String | ✅ Yes | How consent was given | `"banner"` or `"preferences"` |

### Preferences Object

```json
{
  "essential": true,      // Always true (cannot be disabled)
  "functional": true,     // Language, theme, preferences
  "analytics": false,     // Google Analytics, Microsoft Clarity
  "marketing": false,     // Facebook Pixel, Google Ads, LinkedIn, TikTok
  "doNotSell": false      // CCPA specific (only present for California users)
}
```

---

## 📤 Response Format

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Consent logged successfully",
  "consentId": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4"
}
```

### Error Response (500 Internal Server Error)

```json
{
  "success": false,
  "message": "Failed to log consent",
  "error": "Database connection failed"
}
```

### Error Response (400 Bad Request)

```json
{
  "success": false,
  "message": "Invalid request data",
  "errors": [
    "consentId is required",
    "preferences must be an object"
  ]
}
```

---

## 🗄️ Database Schema

### Table: `consent_logs`

```sql
CREATE TABLE consent_logs (
  -- Primary Key
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- Unique Identifiers
  consent_id VARCHAR(36) NOT NULL UNIQUE,
  user_id INT NULL,
  
  -- Privacy & Security (IMPORTANT!)
  ip_address_hash VARCHAR(64) NOT NULL,
  
  -- Consent Details
  preferences JSON NOT NULL,
  consent_method VARCHAR(20) NOT NULL,
  
  -- Metadata
  timestamp DATETIME NOT NULL,
  location VARCHAR(10) NULL,
  version VARCHAR(10) NULL,
  user_agent TEXT NULL,
  language VARCHAR(5) NULL,
  
  -- Audit
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_consent_id (consent_id),
  INDEX idx_user_id (user_id),
  INDEX idx_timestamp (timestamp),
  INDEX idx_created_at (created_at)
);
```

### Column Descriptions

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | INT | No | Auto-increment primary key |
| `consent_id` | VARCHAR(36) | No | UUID from frontend (unique) |
| `user_id` | INT | **Yes** | User ID if logged in, **NULL** for visitors |
| `ip_address_hash` | VARCHAR(64) | No | **SHA-256 hashed IP** (not raw IP!) |
| `preferences` | JSON | No | User's cookie preferences |
| `consent_method` | VARCHAR(20) | No | "banner" or "preferences" |
| `timestamp` | DATETIME | No | When consent was given |
| `location` | VARCHAR(10) | Yes | EU, US-CA, US-OTHER, OTHER |
| `version` | VARCHAR(10) | Yes | Cookie policy version |
| `user_agent` | TEXT | Yes | Browser information |
| `language` | VARCHAR(5) | Yes | en, de, etc. |
| `created_at` | DATETIME | No | When record was created |
| `updated_at` | DATETIME | No | Last update time |

---

## 🔒 CRITICAL: IP Address Handling

### ⚠️ NEVER STORE RAW IP ADDRESSES!

**GDPR Article 25 requires data minimization.**

### ✅ Correct Implementation

```php
// PHP Example
$ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];
$ipAddressHash = hash('sha256', $ipAddress);

// Save $ipAddressHash to database (NOT $ipAddress!)
```

```javascript
// Node.js Example
const crypto = require('crypto');

const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
const ipAddressHash = crypto.createHash('sha256').update(ipAddress).digest('hex');

// Save ipAddressHash to database (NOT ipAddress!)
```

### Why Hash IP Addresses?

- **GDPR Article 25**: Data protection by design and by default
- **Data Minimization**: Only store what's necessary
- **Privacy**: Can prove consent without storing personal data
- **Security**: If database is breached, real IPs are not exposed

---

## 👤 Handling Anonymous Visitors vs Logged-In Users

### For Anonymous Visitors (NOT logged in)

```json
{
  "consent_id": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4",
  "user_id": null,  // ← NULL for visitors
  "ip_address_hash": "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646",
  "preferences": { "essential": true, "functional": true, "analytics": false, "marketing": false },
  "timestamp": "2025-11-01T10:30:00",
  "location": "EU",
  "version": "1.0",
  "user_agent": "Mozilla/5.0...",
  "language": "en",
  "consent_method": "banner",
  "created_at": "2025-11-01T10:30:00"
}
```

### For Logged-In Users

```json
{
  "consent_id": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4",
  "user_id": 12345,  // ← User ID from session/JWT
  "ip_address_hash": "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646",
  "preferences": { "essential": true, "functional": true, "analytics": false, "marketing": false },
  "timestamp": "2025-11-01T10:30:00",
  "location": "EU",
  "version": "1.0",
  "user_agent": "Mozilla/5.0...",
  "language": "en",
  "consent_method": "banner",
  "created_at": "2025-11-01T10:30:00"
}
```

### How to Get User ID

```php
// PHP - Session
$userId = $_SESSION['user_id'] ?? null;

// PHP - JWT
$jwt = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$decoded = JWT::decode($jwt, $secretKey);
$userId = $decoded->user_id ?? null;
```

```javascript
// Node.js - Session
const userId = req.session?.userId || null;

// Node.js - JWT
const token = req.headers.authorization?.split(' ')[1];
const decoded = jwt.verify(token, secretKey);
const userId = decoded.userId || null;
```

---

## 🔄 Update vs Insert Logic

**If the same `consentId` is sent again, UPDATE the existing record (don't create duplicate).**

### SQL Example (MySQL)

```sql
INSERT INTO consent_logs (
  consent_id, user_id, ip_address_hash, preferences, 
  timestamp, location, version, user_agent, language, consent_method
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
  preferences = VALUES(preferences),
  timestamp = VALUES(timestamp),
  consent_method = VALUES(consent_method),
  updated_at = NOW();
```

### Why?

- User might change preferences (e.g., disable analytics)
- Same `consentId` = same user's consent
- Update existing record instead of creating duplicate

---

## 📊 Example Implementation (PHP + MySQL)

```php
<?php

header('Content-Type: application/json');

// Get request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
if (empty($data['consentId']) || empty($data['preferences']) || empty($data['timestamp'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields'
    ]);
    exit;
}

// Get IP address and hash it
$ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];
$ipAddressHash = hash('sha256', $ipAddress);

// Get user ID if logged in (otherwise NULL)
session_start();
$userId = $_SESSION['user_id'] ?? null;

// Database connection
$conn = new mysqli('localhost', 'username', 'password', 'flowxtra_db');

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed'
    ]);
    exit;
}

// Prepare statement
$stmt = $conn->prepare("
    INSERT INTO consent_logs (
        consent_id, user_id, ip_address_hash, preferences, 
        timestamp, location, version, user_agent, language, consent_method
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        preferences = VALUES(preferences),
        timestamp = VALUES(timestamp),
        consent_method = VALUES(consent_method),
        updated_at = NOW()
");

$preferencesJson = json_encode($data['preferences']);

$stmt->bind_param(
    "sissssssss",
    $data['consentId'],
    $userId,
    $ipAddressHash,
    $preferencesJson,
    $data['timestamp'],
    $data['location'] ?? null,
    $data['version'] ?? null,
    $data['userAgent'] ?? null,
    $data['language'] ?? null,
    $data['consentMethod']
);

// Execute
if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Consent logged successfully',
        'consentId' => $data['consentId']
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to log consent',
        'error' => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
```

---

## 🧪 Testing the API

### Using cURL

```bash
curl -X POST https://flowxtra.com/api/consent/log \
  -H "Content-Type: application/json" \
  -d '{
    "consentId": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4",
    "preferences": {
      "essential": true,
      "functional": true,
      "analytics": false,
      "marketing": false
    },
    "timestamp": "2025-11-01T10:30:00.000Z",
    "location": "EU",
    "version": "1.0",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "language": "en",
    "consentMethod": "banner"
  }'
```

### Using Postman

1. **Method**: POST
2. **URL**: `https://flowxtra.com/api/consent/log`
3. **Headers**: `Content-Type: application/json`
4. **Body** (raw JSON):
```json
{
  "consentId": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4",
  "preferences": {
    "essential": true,
    "functional": true,
    "analytics": false,
    "marketing": false
  },
  "timestamp": "2025-11-01T10:30:00.000Z",
  "location": "EU",
  "version": "1.0",
  "userAgent": "Mozilla/5.0",
  "language": "en",
  "consentMethod": "banner"
}
```

### Expected Response

```json
{
  "success": true,
  "message": "Consent logged successfully",
  "consentId": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4"
}
```

---

## 📜 Data Retention (GDPR Compliance)

### Requirement

**Delete consent logs after 3 years** (GDPR recommendation)

### Implementation

#### Automatic Cleanup (Cron Job)

```sql
-- Run daily at 2:00 AM
DELETE FROM consent_logs 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 3 YEAR);
```

#### Cron Job Setup (Linux)

```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 2:00 AM)
0 2 * * * mysql -u username -p'password' flowxtra_db -e "DELETE FROM consent_logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 3 YEAR);"
```

---

## ✅ Validation Rules

### Required Fields

- ✅ `consentId` (string, 36 characters, UUID format)
- ✅ `preferences` (object with: essential, functional, analytics, marketing)
- ✅ `timestamp` (string, ISO 8601 format)
- ✅ `location` (string, one of: EU, US-CA, US-OTHER, OTHER)
- ✅ `version` (string, max 10 characters)
- ✅ `consentMethod` (string, either "banner" or "preferences")

### Optional Fields

- ❌ `userAgent` (string, max 1000 characters)
- ❌ `language` (string, max 5 characters)

### Validation Example (PHP)

```php
function validateConsentData($data) {
    $errors = [];
    
    if (empty($data['consentId']) || !preg_match('/^[a-f0-9-]{36}$/i', $data['consentId'])) {
        $errors[] = 'Invalid consentId format';
    }
    
    if (empty($data['preferences']) || !is_array($data['preferences'])) {
        $errors[] = 'preferences must be an object';
    }
    
    if (empty($data['timestamp'])) {
        $errors[] = 'timestamp is required';
    }
    
    if (!in_array($data['consentMethod'], ['banner', 'preferences'])) {
        $errors[] = 'consentMethod must be "banner" or "preferences"';
    }
    
    return $errors;
}
```

---

## 🚨 IMPORTANT NOTES

### 1. CORS Configuration

Make sure your API accepts requests from the frontend domain:

```php
header('Access-Control-Allow-Origin: https://flowxtra.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

### 2. Rate Limiting

**Not recommended** for this endpoint because:
- Users might refresh page multiple times
- Legitimate users could be blocked
- Consent updates should always be accepted

### 3. Authentication

**Not required** for this endpoint because:
- Must work for anonymous visitors
- No sensitive data is returned
- Only receives consent preferences

### 4. Error Handling

**If API fails**, frontend already saved consent to `localStorage`, so:
- User experience is not interrupted
- Consent is still stored locally
- API can be retried later

---

## 📋 Summary Checklist

- [ ] Create database table `consent_logs`
- [ ] Create API endpoint `POST /api/consent/log`
- [ ] Hash IP addresses (SHA-256, never store raw IPs)
- [ ] Handle both anonymous visitors (user_id = NULL) and logged-in users
- [ ] Implement UPDATE on duplicate `consentId`
- [ ] Return JSON response with `success`, `message`, `consentId`
- [ ] Set up CORS headers
- [ ] Set up data retention (delete after 3 years)
- [ ] Test with cURL or Postman
- [ ] Deploy to production

---

## 📞 Questions?

If you have any questions or need clarification, contact the Frontend team.

**Frontend Status:** ✅ Complete and ready  
**Backend Status:** ⏳ Waiting for API implementation

---

**Last Updated:** November 1, 2025  
**Document Version:** 1.0

