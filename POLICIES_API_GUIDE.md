# Policies API Usage Guide

## 📋 Overview

The API provides endpoints to access Policies (Privacy Policies) with filtering support by site, language, and type.

---

## 🔗 Available Endpoints

### 1. Get List of Policies
```
GET /api/privacy/policies/public
```

### 2. Get Single Policy
```
GET /api/privacy/policies/public/{id}
```

### 3. Get Latest Policy by Type
```
GET /api/privacy/policies/latest
```

---

## 📝 Query Parameters

### GET /api/privacy/policies/public

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `site` | string | No | Filter by site name or domain | `site=Flowxtra` or `site=flowxtra.com` |
| `site_id` | integer | No | Filter by site ID | `site_id=1` |
| `type` | string | No | Filter by Policy type | `type=Privacy Policy` |
| `language` | string | No | Filter by language | `language=en` |
| `page` | integer | No | Page number (default: 1) | `page=2` |
| `limit` | integer | No | Number of results (default: 15, max: 100) | `limit=20` |

---

## 💻 Usage Examples

### Example 1: Get All Policies

**Request:**
```bash
GET http://localhost:8765/api/privacy/policies/public
```

**Response:**
```json
{
  "success": true,
  "data": {
    "policies": [
      {
        "id": 1,
        "type": "Privacy Policy",
        "version": "1.0",
        "language": "en",
        "status": "published",
        "title": "Privacy Policy",
        "content": "...",
        "change_log": "...",
        "effective_at": "2025-01-01"
      }
    ],
    "meta": {
      "current_page": 1,
      "total": 6,
      "per_page": 15,
      "last_page": 1
    }
  }
}
```

---

### Example 2: Filter by Site

**Request:**
```bash
GET http://localhost:8765/api/privacy/policies/public?site=Flowxtra
```

Or:
```bash
GET http://localhost:8765/api/privacy/policies/public?site=flowxtra.com
```

Or:
```bash
GET http://localhost:8765/api/privacy/policies/public?site_id=1
```

---

### Example 3: Filter by Type

**Request:**
```bash
GET http://localhost:8765/api/privacy/policies/public?type=Privacy Policy
```

**Available Policy Types:**
- `GDPR`
- `DPA`
- `CCPA`
- `LGPD`
- `PIPEDA`
- `Privacy Policy`
- `Cookie Policy`
- `Terms of Use`
- `Terms of Use Companies`
- `Terms of Use Conditions`
- `Imprint`
- `Security Policy`
- `Disclaimer`
- `Ad Quality Guidelines`
- `Acceptable Use Policy`

---

### Example 4: Filter by Language

**Request:**
```bash
GET http://localhost:8765/api/privacy/policies/public?language=en
```

**Supported Languages:**
- `en` - English
- `ar` - Arabic
- `de` - German
- `fr` - French
- And more...

---

### Example 5: Multiple Filters (Site + Type + Language)

**Request:**
```bash
GET http://localhost:8765/api/privacy/policies/public?site=Flowxtra&type=Privacy Policy&language=en
```

---

### Example 6: Get Single Policy

**Request:**
```bash
GET http://localhost:8765/api/privacy/policies/public/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "type": "Privacy Policy",
    "version": "1.0",
    "language": "en",
    "status": "published",
    "title": "Privacy Policy",
    "content": "...",
    "change_log": "...",
    "effective_at": "2025-01-01",
    "site": {
      "id": 1,
      "name": "Flowxtra",
      "domain": "flowxtra.com"
    }
  }
}
```

---

## 🔧 Code Examples

### JavaScript / Fetch API

```javascript
// Get all policies with filters
async function getPolicies(filters = {}) {
  const params = new URLSearchParams();
  
  if (filters.site) params.append('site', filters.site);
  if (filters.type) params.append('type', filters.type);
  if (filters.language) params.append('language', filters.language);
  if (filters.page) params.append('page', filters.page);
  if (filters.limit) params.append('limit', filters.limit);
  
  try {
    const response = await fetch(
      `http://localhost:8765/api/privacy/policies/public?${params}`
    );
    const data = await response.json();
    
    if (data.success) {
      console.log('Policies:', data.data.policies);
      console.log('Total:', data.data.meta.total);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Use filters
getPolicies({
  site: 'Flowxtra',
  type: 'Privacy Policy',
  language: 'en'
});

// Get single policy
async function getPolicy(id) {
  try {
    const response = await fetch(
      `http://localhost:8765/api/privacy/policies/public/${id}`
    );
    const data = await response.json();
    
    if (data.success) {
      console.log('Policy:', data.data);
      console.log('Site:', data.data.site.name);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

### React Example

```jsx
import React, { useState, useEffect } from 'react';

function PoliciesList() {
  const [policies, setPolicies] = useState([]);
  const [filters, setFilters] = useState({
    site: '',
    type: '',
    language: 'en'
  });

  useEffect(() => {
    async function fetchPolicies() {
      const params = new URLSearchParams();
      if (filters.site) params.append('site', filters.site);
      if (filters.type) params.append('type', filters.type);
      if (filters.language) params.append('language', filters.language);

      try {
        const response = await fetch(
          `http://localhost:8765/api/privacy/policies/public?${params}`
        );
        const data = await response.json();
        
        if (data.success) {
          setPolicies(data.data.policies);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchPolicies();
  }, [filters]);

  return (
    <div>
      <h1>Policies</h1>
      
      {/* Filters */}
      <div>
        <select 
          value={filters.site} 
          onChange={(e) => setFilters({...filters, site: e.target.value})}
        >
          <option value="">All Sites</option>
          <option value="Flowxtra">Flowxtra</option>
        </select>
        
        <select 
          value={filters.type} 
          onChange={(e) => setFilters({...filters, type: e.target.value})}
        >
          <option value="">All Types</option>
          <option value="Privacy Policy">Privacy Policy</option>
          <option value="Cookie Policy">Cookie Policy</option>
        </select>
        
        <select 
          value={filters.language} 
          onChange={(e) => setFilters({...filters, language: e.target.value})}
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="de">German</option>
        </select>
      </div>

      {/* Policies List */}
      <ul>
        {policies.map(policy => (
          <li key={policy.id}>
            <h3>{policy.title}</h3>
            <p>Type: {policy.type}</p>
            <p>Language: {policy.language}</p>
            <p>Version: {policy.version}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PoliciesList;
```

---

### Axios Example

```javascript
import axios from 'axios';

// Get policies with filters
async function getPolicies(filters = {}) {
  try {
    const response = await axios.get(
      'http://localhost:8765/api/privacy/policies/public',
      { params: filters }
    );

    if (response.data.success) {
      return response.data.data.policies;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Use filters
const policies = await getPolicies({
  site: 'Flowxtra',
  type: 'Privacy Policy',
  language: 'en'
});

// Get single policy
async function getPolicy(id) {
  try {
    const response = await axios.get(
      `http://localhost:8765/api/privacy/policies/public/${id}`
    );

    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

### cURL Examples

```bash
# Get all policies
curl "http://localhost:8765/api/privacy/policies/public"

# Filter by site
curl "http://localhost:8765/api/privacy/policies/public?site=Flowxtra"

# Filter by type
curl "http://localhost:8765/api/privacy/policies/public?type=Privacy Policy"

# Filter by language
curl "http://localhost:8765/api/privacy/policies/public?language=en"

# Multiple filters
curl "http://localhost:8765/api/privacy/policies/public?site=Flowxtra&type=Privacy Policy&language=en"

# Get single policy
curl "http://localhost:8765/api/privacy/policies/public/1"
```

---

## 📊 Data Structure

### Policy Object
```json
{
  "id": 1,
  "type": "Privacy Policy",
  "version": "1.0",
  "language": "en",
  "status": "published",
  "title": "Privacy Policy",
  "content": "Full policy content in HTML...",
  "change_log": "Description of changes",
  "effective_at": "2025-01-01",
  "created_at": "2025-01-01T00:00:00.000000Z",
  "updated_at": "2025-01-01T00:00:00.000000Z",
  "site": {
    "id": 1,
    "name": "Flowxtra",
    "domain": "flowxtra.com"
  }
}
```

---

## ✅ Testing the API

```bash
# Test all policies
curl http://localhost:8765/api/privacy/policies/public

# Test filter by site
curl "http://localhost:8765/api/privacy/policies/public?site=Flowxtra"

# Test filter by type
curl "http://localhost:8765/api/privacy/policies/public?type=Privacy Policy"

# Test filter by language
curl "http://localhost:8765/api/privacy/policies/public?language=en"

# Test single policy
curl http://localhost:8765/api/privacy/policies/public/1
```

---

## ⚠️ Important Notes

1. **Site Filtering**: You can use `site` (name or domain) or `site_id`
2. **Type Filtering**: Use the full type name (e.g., "Privacy Policy")
3. **Language Filtering**: Use language code (en, ar, de, etc.)
4. **Pagination**: Use `page` and `limit` to navigate between pages
5. **Results**: Only returns published policies (`status: published`)

---

## 📞 Support

For more information, refer to:
- `api_documentation/Flowxtra_Privacy_Center_API.postman_collection.json`
- `api_documentation/swagger.json`
