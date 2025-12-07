# Google OAuth Setup Guide

## For Curious Elephant Academy

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown and select "New Project"
3. Name it "Curious Elephant Academy"
4. Click "Create"

### Step 2: Enable Google+ API

1. In the Google Cloud Console, search for "Google+ API"
2. Click on "Google+ API"
3. Click "Enable"

### Step 3: Create OAuth 2.0 Credentials

1. Go to "Credentials" in the left sidebar
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3001` (for local development)
   - Your production domain
5. Add authorized redirect URIs:
   - `http://localhost:3001/api/auth/google/callback`
   - Your production redirect URI
6. Click "Create"
7. Copy your Client ID

### Step 4: Configure Your Application

#### Option A: Environment Variables
Create a `.env` file in the LetsLearn directory:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
```

#### Option B: Direct Configuration
In `public/app.js`, replace:
```javascript
client_id: 'YOUR_GOOGLE_CLIENT_ID'
```
with your actual Client ID.

### Step 5: Update HTML
The Google Sign-In script is already included in `public/index.html`:
```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

### Step 6: Testing

1. Start your server: `node src/server.js`
2. Go to `http://localhost:3001`
3. Click "Sign up with Google" or "Login with Google"
4. You should see the Google sign-in dialog

### Troubleshooting

**Issue: "Google is not defined"**
- Make sure the Google script is loaded: `<script src="https://accounts.google.com/gsi/client" async defer></script>`
- Check browser console for errors

**Issue: "Invalid Client ID"**
- Verify your Client ID is correct
- Check that your domain is authorized in Google Cloud Console

**Issue: "Redirect URI mismatch"**
- Make sure the redirect URI in Google Cloud matches your server's URI
- For local development: `http://localhost:3001`

### API Endpoints

#### Get Google Configuration
```
GET /api/auth/google/config
Response:
{
  "success": true,
  "clientId": "xxx.apps.googleusercontent.com",
  "redirectUri": "http://localhost:3001/api/auth/google/callback",
  "configured": true
}
```

#### Sign In with Google
```
POST /api/auth/google/signin
Body:
{
  "credential": "jwt_token",
  "decodedToken": { ... }
}
Response:
{
  "success": true,
  "user": { ... }
}
```

### Security Notes

- **Never commit client secrets** to version control
- Use environment variables for sensitive data
- The server-side should validate all tokens from Google
- Implement CSRF protection for OAuth redirects
- Use HTTPS in production

### Additional Resources

- [Google Identity Documentation](https://developers.google.com/identity)
- [Google OAuth 2.0 Flow](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In for Web](https://developers.google.com/identity/sign-in/web)
