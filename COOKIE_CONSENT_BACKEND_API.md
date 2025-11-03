# Cookie Consent Backend API - Laravel Implementation

## 📋 Overview

**Frontend Status:** ✅ Complete
**Backend Status:** ⏳ Needs Implementation

**What to Build:** 5 API endpoints for cookie consent management (GDPR compliant)

---

## 🗄️ Database Schema

```sql
CREATE TABLE consent_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    consent_id VARCHAR(36) UNIQUE NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    ip_address_hash VARCHAR(64) NOT NULL,
    preferences JSON NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    version VARCHAR(10) DEFAULT '1.0',
    user_agent TEXT NULL,
    language VARCHAR(5) NULL,
    consent_method VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_consent_id (consent_id),
    INDEX idx_user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Key Points:**
- `user_id` is **NULL** for anonymous visitors
- `ip_address_hash` is **SHA-256 hashed** (never store raw IP)
- `preferences` is **JSON**: `{essential, functional, analytics, marketing}`

---

## 🔌 API Endpoints

### 1️⃣ Log Consent (Create/Update)

```
POST /api/consent/log
```

**Request:**
```json
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
  "userAgent": "Mozilla/5.0...",
  "language": "en",
  "consentMethod": "banner"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Consent logged successfully",
  "consentId": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4"
}
```

---

### 2️⃣ Check User Consent

```
GET /api/consent/check
Authentication: Required
```

**Response (200):**
```json
{
  "hasConsent": true,
  "consent_id": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4",
  "preferences": {
    "essential": true,
    "functional": true,
    "analytics": false,
    "marketing": false
  },
  "timestamp": "2025-11-03T10:30:00.000Z"
}
```

---

### 3️⃣ Get User Consent History

```
GET /api/user/consent/history
Authentication: Required
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "consent_id": "uuid-1",
      "preferences": {...},
      "timestamp": "2025-11-03T10:30:00Z",
      "consent_method": "banner"
    },
    {
      "id": 456,
      "consent_id": "uuid-2",
      "preferences": {...},
      "timestamp": "2025-11-05T14:20:00Z",
      "consent_method": "preferences"
    }
  ]
}
```

---

### 4️⃣ Export User Data (GDPR Article 15)

```
GET /api/user/consent/export
Authentication: Required
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user_id": 123,
    "email": "user@example.com",
    "consent_logs": [
      {
        "consent_id": "uuid-1234",
        "timestamp": "2025-11-03T10:30:00Z",
        "preferences": {
          "essential": true,
          "functional": true,
          "analytics": false,
          "marketing": false
        },
        "ip_hash": "c775e7b757ede630...",
        "user_agent": "Mozilla/5.0...",
        "language": "en",
        "consent_method": "banner"
      }
    ]
  }
}
```

---

### 5️⃣ Delete User Consent (GDPR Article 17)

```
DELETE /api/user/consent
Authentication: Required
```

**Response (200):**
```json
{
  "success": true,
  "message": "All consent logs deleted successfully",
  "deleted_count": 3
}
```

---

## 💻 Laravel Implementation

### Step 1: Migration

```bash
php artisan make:migration create_consent_logs_table
```

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('consent_logs', function (Blueprint $table) {
            $table->id();
            $table->uuid('consent_id')->unique();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('ip_address_hash', 64);
            $table->json('preferences');
            $table->timestamp('timestamp');
            $table->string('version', 10)->default('1.0');
            $table->text('user_agent')->nullable();
            $table->string('language', 5)->nullable();
            $table->string('consent_method', 20);
            $table->timestamps();

            $table->index('consent_id');
            $table->index('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void {
        Schema::dropIfExists('consent_logs');
    }
};
```

---

### Step 2: Model

```php
<?php
// app/Models/ConsentLog.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConsentLog extends Model {
    protected $fillable = [
        'consent_id', 'user_id', 'ip_address_hash',
        'preferences', 'timestamp', 'version',
        'user_agent', 'language', 'consent_method',
    ];

    protected $casts = [
        'preferences' => 'array',
        'timestamp' => 'datetime',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
```

---

### Step 3: Controller

```php
<?php
// app/Http/Controllers/Api/ConsentController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ConsentLog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ConsentController extends Controller {

    // 1. Log Consent
    public function log(Request $request): JsonResponse {
        try {
            $ip = $request->ip();
            $ipHash = hash('sha256', $ip);
            $userId = auth()->id();

            ConsentLog::updateOrCreate(
                ['consent_id' => $request->consentId],
                [
                    'user_id' => $userId,
                    'ip_address_hash' => $ipHash,
                    'preferences' => $request->preferences,
                    'timestamp' => $request->timestamp,
                    'version' => $request->version ?? '1.0',
                    'user_agent' => $request->userAgent,
                    'language' => $request->language,
                    'consent_method' => $request->consentMethod,
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'Consent logged successfully',
                'consentId' => $request->consentId
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to log consent'
            ], 500);
        }
    }

    // 2. Check User Consent
    public function check(Request $request): JsonResponse {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'hasConsent' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        $latestConsent = ConsentLog::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$latestConsent) {
            return response()->json(['hasConsent' => false]);
        }

        return response()->json([
            'hasConsent' => true,
            'consent_id' => $latestConsent->consent_id,
            'preferences' => $latestConsent->preferences,
            'timestamp' => $latestConsent->timestamp,
        ]);
    }

    // 3. Get Consent History
    public function history(Request $request): JsonResponse {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $logs = ConsentLog::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $logs
        ]);
    }

    // 4. Export User Data (GDPR Article 15)
    public function export(Request $request): JsonResponse {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $logs = ConsentLog::where('user_id', $user->id)->get();

        return response()->json([
            'success' => true,
            'data' => [
                'user_id' => $user->id,
                'email' => $user->email,
                'consent_logs' => $logs,
            ]
        ]);
    }

    // 5. Delete User Consent (GDPR Article 17)
    public function delete(Request $request): JsonResponse {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $deletedCount = ConsentLog::where('user_id', $user->id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'All consent logs deleted successfully',
            'deleted_count' => $deletedCount
        ]);
    }
}
```

---

### Step 4: Routes

```php
<?php
// routes/api.php
use App\Http\Controllers\Api\ConsentController;

// Public endpoint (no auth required)
Route::post('/consent/log', [ConsentController::class, 'log']);

// Protected endpoints (auth required)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/consent/check', [ConsentController::class, 'check']);
    Route::get('/user/consent/history', [ConsentController::class, 'history']);
    Route::get('/user/consent/export', [ConsentController::class, 'export']);
    Route::delete('/user/consent', [ConsentController::class, 'delete']);
});
```

---

### Step 5: CORS Configuration

```php
<?php
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['GET', 'POST', 'DELETE'],
    'allowed_origins' => [
        'https://flowxtra.com',
        'https://www.flowxtra.com',
        'http://localhost:3000', // Development
    ],
    'allowed_headers' => ['Content-Type', 'Authorization', 'Accept'],
    'max_age' => 86400,
];
```

---

## 🔒 Security Requirements

### 1. IP Address Hashing (CRITICAL)

```php
// ✅ CORRECT
$ipHash = hash('sha256', $request->ip());

// ❌ WRONG - Never do this
$ipAddress = $request->ip(); // Don't store raw IP
```

### 2. Get Real IP Address

```php
private function getRealIp($request): string {
    $headers = [
        'HTTP_CF_CONNECTING_IP',    // Cloudflare
        'HTTP_X_FORWARDED_FOR',     // Proxy
        'HTTP_X_REAL_IP',           // Nginx
        'REMOTE_ADDR'               // Direct
    ];

    foreach ($headers as $header) {
        $ip = $request->server($header);
        if ($ip && filter_var($ip, FILTER_VALIDATE_IP)) {
            return explode(',', $ip)[0];
        }
    }
    return 'unknown';
}
```

---

## 📅 Data Retention (Auto-Delete after 3 years)

### Create Command

```bash
php artisan make:command DeleteExpiredConsentLogs
```

```php
<?php
// app/Console/Commands/DeleteExpiredConsentLogs.php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ConsentLog;
use Carbon\Carbon;

class DeleteExpiredConsentLogs extends Command {
    protected $signature = 'consent:delete-expired';
    protected $description = 'Delete consent logs older than 3 years';

    public function handle() {
        $threeYearsAgo = Carbon::now()->subYears(3);
        $deleted = ConsentLog::where('created_at', '<', $threeYearsAgo)->delete();
        $this->info("Deleted {$deleted} expired consent logs.");
        return Command::SUCCESS;
    }
}
```

### Schedule Command

```php
<?php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule) {
    $schedule->command('consent:delete-expired')->dailyAt('02:00');
}
```

---

## 🧪 Testing

```bash
# Test log consent
curl -X POST http://localhost/api/consent/log \
  -H "Content-Type: application/json" \
  -d '{
    "consentId": "eb9c2acf-4e9a-48d2-ba86-54fea2003ca4",
    "preferences": {"essential":true,"functional":true,"analytics":false,"marketing":false},
    "timestamp": "2025-11-03T10:30:00.000Z",
    "version": "1.0",
    "consentMethod": "banner"
  }'

# Test check consent (requires auth token)
curl -X GET http://localhost/api/consent/check \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## ✅ Implementation Checklist

- [ ] Create migration and run `php artisan migrate`
- [ ] Create `ConsentLog` model
- [ ] Create `ConsentController` with 5 methods
- [ ] Add routes to `routes/api.php`
- [ ] Configure CORS in `config/cors.php`
- [ ] Create auto-delete command
- [ ] Schedule command in `Kernel.php`
- [ ] Test all endpoints
- [ ] Deploy to production

---

## 📊 Why Each Endpoint?

1. **POST /api/consent/log** - Frontend saves consent
2. **GET /api/consent/check** - Sync consent across devices
3. **GET /api/user/consent/history** - User dashboard (view consent history)
4. **GET /api/user/consent/export** - GDPR Article 15 (Right to Access)
5. **DELETE /api/user/consent** - GDPR Article 17 (Right to be Forgotten)

---

**Frontend:** ✅ Ready
**Backend:** ⏳ Follow this guide
**Time to Implement:** ~2-3 hours
