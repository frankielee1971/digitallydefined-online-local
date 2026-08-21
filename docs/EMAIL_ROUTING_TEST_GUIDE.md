# Email Routing Test Guide for DigitallyDefined Quiz

This document explains the four email modes available for the quiz signup system.

## Quick Start

### Dev Mode (Recommended for Development)
```
https://digitallydefined.online/quiz?dev=true
```
- **Skips email entirely**
- Logs payload to console
- Still generates personalized roadmap
- Still stores quiz results in Supabase
- Returns: `{ "emailSkipped": true, "mode": "dev" }`

### Test Mode (Brevo Sandbox)
```
https://digitallydefined.online/quiz?brevoTest=true
```
- Adds `X-Brevo-Test: true` header to Brevo API
- Email is NOT delivered
- Email does NOT count against quota
- Brevo logs payload for inspection
- Returns: `{ "brevoUsed": true, "mode": "test", "emailDelivered": false }`

### Blackhole Mode (Final Formatting Tests)
```
https://digitallydefined.online/quiz?testEmail=true
```
Or use email: `blackhole@brevo.com`
- Sends to `blackhole@brevo.com`
- Brevo accepts but does not deliver
- No quota usage
- Good for final HTML/formatting tests

### Live Mode (Production)
```
https://digitallydefined.online/quiz
```
- Sends real email via Brevo
- Requires `BREVO_API_KEY` and `BREVO_LIST_ID` environment variables
- Counts against quota

## Priority Order

1. **Dev Mode** → Skip email entirely
2. **Brevo Test Mode** → Send with test header
3. **Blackhole Mode** → Send to blackhole address
4. **Normal Mode** → Send real email

## Testing Workflow

### Phase 1: Local Development (Dev Mode)
```bash
# Start local dev server
npm run dev

# Open quiz in dev mode
http://localhost:5173/quiz?dev=true
```
Check browser console for logged email payload.

### Phase 2: Brevo Sandbox Testing
```bash
# Deploy to preview/staging
npx vercel deploy --prod

# Test with Brevo sandbox
https://your-preview-url/quiz?brevoTest=true
```
Check Brevo dashboard for logged email (not delivered).

### Phase 3: Final Formatting
```bash
# Test with blackhole address
https://your-preview-url/quiz?testEmail=true
```
Check Brevo dashboard for accepted email.

### Phase 4: Production
```bash
# Remove all test flags
https://digitallydefined.online/quiz
```

## URL Parameters

| Parameter | Value | Effect |
|-----------|-------|--------|
| `dev` or `devMode` | `true` | Skip email, log to console |
| `brevoTest` | `true` | Add X-Brevo-Test header |
| `testEmail` | `true` | Send to blackhole@brevo.com |
| `start` | `true` | Auto-start quiz (scrolls to form) |

## Console Output Examples

### Dev Mode
```
[quiz-email] DEV MODE — skipping Brevo send
[quiz-email] Would send to: {
  to: 'test@example.com',
  name: 'Test User',
  superpower: 'builder',
  hasRoadmap: true,
  answerCount: 7
}
[quiz.complete] email_mode=dev sent=false skipped=true
```

### Test Mode
```
[quiz-email] TEST MODE — sending with X-Brevo-Test header
[quiz-email] TEST mode response: { messageId: '12345', messageIdGroup: '67890' }
[quiz.complete] email_mode=test sent=true skipped=false
```

### Blackhole Mode
```
[quiz-email] BLACKHOLE MODE — sending to blackhole@brevo.com
[quiz-email] BLACKHOLE mode response: { messageId: '12346' }
[quiz.complete] email_mode=blackhole sent=true skipped=false
```

### Live Mode
```
[quiz-email] LIVE MODE — sending real email
[quiz-email] LIVE send successful: { messageId: '12347' }
[quiz.complete] email_mode=live sent=true skipped=false
```

## Environment Variables

Required for live mode:
- `BREVO_API_KEY` - Brevo API key
- `BREVO_LIST_ID` - Brevo contact list ID
- `BREVO_FROM_EMAIL` - Sender email (defaults to hello@digitallydefined.online)
- `BREVO_FROM_NAME` - Sender name (defaults to DigitallyDefined)

## Frontend Usage

The quiz component automatically detects URL parameters and passes them to the backend:

```javascript
// In DigitalSuperpowerQuiz.jsx
const isDevMode = searchParams.get('dev') === 'true' || searchParams.get('devMode') === 'true';
const isBrevoTest = searchParams.get('brevoTest') === 'true';
const isTestEmail = searchParams.get('testEmail') === 'true';

// Passed to backend in saveQuizResult()
await saveQuizResult({
  name,
  email,
  superpower,
  answers,
  roadmap,
  devMode: isDevMode,
  brevoTest: isBrevoTest,
  testEmail: isTestEmail,
});
```

## Backend Response

The `quiz.complete` endpoint now returns additional fields:

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

## Security Notes

- Dev mode never touches Brevo API
- Test mode uses sandbox header (no quota, no delivery)
- Blackhole mode uses special address (accepted but not delivered)
- Live mode requires valid Brevo credentials
- All modes still store quiz results in Supabase
