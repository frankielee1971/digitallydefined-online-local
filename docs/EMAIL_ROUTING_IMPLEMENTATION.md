# Quiz Email Routing System - Implementation Summary

## Overview
Added four-mode email routing system to the DigitallyDefined quiz signup flow, enabling safe testing without sending real emails or consuming Brevo quota.

## Files Modified/Created

### 1. New File: `supabase/functions/_shared/brevo-email.ts`
Brevo email service with mode-aware routing logic.

**Key Exports:**
- `EmailMode` type: `'dev' | 'test' | 'blackhole' | 'live'`
- `detectEmailMode(body, config)`: Determines mode from request flags
- `sendQuizEmail(payload, mode, config)`: Routes to appropriate sender
- `getBrevoConfig()`: Reads Brevo credentials from environment

**Mode Logic:**
```typescript
if (devMode) return 'dev';           // Skip entirely
if (brevoTest) return 'test';        // X-Brevo-Test header
if (testEmail || email === BLACKHOLE) return 'blackhole';
if (!apiKey || !listId) return 'dev'; // Fallback if not configured
return 'live';                        // Normal production send
```

### 2. Modified: `supabase/functions/hermes/index.ts`
Updated `quiz.complete` action handler to integrate email routing.

**Changes:**
- Added dynamic import of `brevo-email.ts`
- Captures dev/test/blackhole flags from request body
- Calls `sendQuizEmail()` with appropriate mode
- Returns extended response with mode information

**Response Format:**
```json
{
  "success": true,
  "id": "abc123",
  "superpower": "builder",
  "emailMode": "dev",
  "emailSent": false,
  "emailSkipped": true,
  "brevoUsed": false
}
```

### 3. Modified: `src/pages/Quiz/DigitalSuperpowerQuiz.jsx`
Updated frontend to detect URL parameters and pass them to backend.

**Changes:**
- Added `emailMode` state tracking
- Detects `?dev=true`, `?brevoTest=true`, `?testEmail=true` from URL
- Passes flags to `saveQuizResult()` payload
- Shows email mode indicator on results page
- Displays appropriate confirmation message

### 4. Updated: `.env.example`
Added Brevo configuration variables.

**New Variables:**
```
BREVO_API_KEY=your-brevo-api-key-here
BREVO_LIST_ID=your-brevo-list-id
BREVO_FROM_EMAIL=hello@digitallydefined.online
BREVO_FROM_NAME=DigitallyDefined
```

### 5. Created: `docs/EMAIL_ROUTING_TEST_GUIDE.md`
Comprehensive testing guide with examples and workflows.

## Usage

### Dev Mode (Skip Email)
```
https://digitallydefined.online/quiz?dev=true
```
- Email completely skipped
- Payload logged to server console
- Roadmap still generated
- Results still stored in Supabase

### Test Mode (Brevo Sandbox)
```
https://digitallydefined.online/quiz?brevoTest=true
```
- Adds `X-Brevo-Test: true` header
- Email NOT delivered
- Does NOT count against quota
- Logged in Brevo dashboard for inspection

### Blackhole Mode
```
https://digitallydefined.online/quiz?testEmail=true
```
Or use email: `blackhole@brevo.com`
- Sends to blackhole address
- Brevo accepts but doesn't deliver
- No quota usage
- Good for HTML formatting tests

### Live Mode (Production)
```
https://digitallydefined.online/quiz
```
- Sends real email via Brevo
- Requires BREVO_API_KEY and BREVO_LIST_ID
- Counts against quota

## Priority Order
1. **Dev Mode** → Skip email entirely
2. **Brevo Test Mode** → Send with test header
3. **Blackhole Mode** → Send to blackhole address
4. **Normal Mode** → Send real email

## Verification

### Build Status
```bash
npm run build
# ✓ built in 8.04s
# ✓ 1845 modules transformed
```

### Type Check
The TypeScript errors in `brevo-email.ts` are expected - they reference `Deno` which is only available in Supabase Edge Functions runtime, not in local TypeScript compilation. This matches the existing pattern used throughout the codebase.

## Testing Workflow

### Phase 1: Local Development
```bash
npm run dev
# Open: http://localhost:5173/quiz?dev=true
# Check browser console for logged email payload
```

### Phase 2: Preview/Staging
```bash
npx vercel deploy
# Open: https://your-preview-url/quiz?brevoTest=true
# Check Brevo dashboard for logged (undelivered) email
```

### Phase 3: Production
```bash
# Ensure BREVO_API_KEY and BREVO_LIST_ID are set
npx vercel deploy --prod
# Open: https://digitallydefined.online/quiz
```

## Security & Quota Protection

- ✅ Dev mode never touches Brevo API
- ✅ Test mode uses sandbox header (no delivery, no quota)
- ✅ Blackhole mode uses special address (accepted, not delivered)
- ✅ Live mode requires valid credentials
- ✅ All modes still store quiz results in Supabase
- ✅ Personalized roadmap generated in all modes

## Return Values by Mode

### Dev Mode
```json
{
  "emailSkipped": true,
  "mode": "dev",
  "brevoUsed": false,
  "emailSent": false
}
```

### Test Mode
```json
{
  "brevoUsed": true,
  "mode": "test",
  "emailSent": true,
  "emailDelivered": false
}
```

### Blackhole Mode
```json
{
  "brevoUsed": true,
  "mode": "blackhole",
  "emailSent": true,
  "originalEmail": "user@example.com"
}
```

### Live Mode
```json
{
  "brevoUsed": true,
  "mode": "live",
  "emailSent": true,
  "emailDelivered": true
}
```
