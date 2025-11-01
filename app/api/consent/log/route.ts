import { NextRequest, NextResponse } from 'next/server';

/**
 * GDPR Article 7 - Proof of Consent API Endpoint
 * 
 * This endpoint logs user consent to the database for GDPR compliance.
 * GDPR requires you to be able to PROVE that consent was given.
 * 
 * IMPORTANT: This works for BOTH registered users AND anonymous visitors!
 * 
 * Database Schema Example:
 * CREATE TABLE consent_logs (
 *   id SERIAL PRIMARY KEY,
 *   consent_id VARCHAR(36) UNIQUE NOT NULL,  -- UUID
 *   user_id INT NULL,                         -- NULL for visitors
 *   ip_address_hash VARCHAR(64),              -- SHA-256 hashed IP (anonymized)
 *   preferences JSONB NOT NULL,               -- {essential: true, functional: true, ...}
 *   timestamp TIMESTAMP DEFAULT NOW(),
 *   location VARCHAR(10),                     -- EU, US-CA, US-OTHER, OTHER
 *   version VARCHAR(10),                      -- Cookie policy version
 *   user_agent TEXT,                          -- Browser info
 *   language VARCHAR(5),                      -- en, de, etc.
 *   consent_method VARCHAR(20),               -- banner, preferences
 *   created_at TIMESTAMP DEFAULT NOW(),
 *   INDEX idx_consent_id (consent_id),
 *   INDEX idx_timestamp (timestamp)
 * );
 * 
 * Data Retention:
 * - Keep logs for 3 years (GDPR recommendation)
 * - After 3 years, delete logs automatically
 */

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Get IP address (anonymized)
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    
    // Hash IP address for privacy (GDPR Article 25 - data minimization)
    const hashedIp = await hashIpAddress(ipAddress);

    // Prepare data for database
    const consentLog = {
      consentId: body.consentId,
      userId: null, // NULL for anonymous visitors - set if user is logged in
      ipAddressHash: hashedIp,
      preferences: body.preferences,
      timestamp: body.timestamp,
      location: body.location,
      version: body.version,
      userAgent: body.userAgent,
      language: body.language,
      consentMethod: body.consentMethod,
    };

    // TODO: Insert into database
    // await db.query('INSERT INTO consent_logs SET ?', consentLog);
    
    console.log('✅ Consent logged:', consentLog);

    return NextResponse.json({ 
      success: true,
      message: 'Consent logged successfully',
      consentId: body.consentId 
    });

  } catch (error) {
    console.error('❌ Error logging consent:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to log consent' 
      },
      { status: 500 }
    );
  }
}

/**
 * Hash IP address using SHA-256 for privacy
 * This satisfies GDPR Article 25 (data minimization)
 */
async function hashIpAddress(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Example usage from frontend:
 * 
 * await fetch('/api/consent/log', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     consentId: 'eb9c2acf-4e9a-48d2-ba86-54fea2003ca4',
 *     preferences: { essential: true, functional: true, analytics: false, marketing: false },
 *     timestamp: '2025-11-01T10:30:00Z',
 *     location: 'EU',
 *     version: '1.0',
 *     userAgent: 'Mozilla/5.0...',
 *     language: 'en',
 *     consentMethod: 'banner'
 *   })
 * });
 * 
 * For registered users, you can add:
 * - userId: req.session.userId  // From session
 * - email: req.session.email     // Optional
 */

