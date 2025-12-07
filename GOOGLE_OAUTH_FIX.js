// GOOGLE OAUTH FIX

/**
 * Google OAuth Configuration
 * Add to .env file:
 * GOOGLE_CLIENT_ID=your_google_client_id
 * GOOGLE_CLIENT_SECRET=your_google_client_secret
 * GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
 */

const GoogleAuth = require('google-auth-library').GoogleAuth;

// OAuth2 client initialization
let oauth2Client = null;

function initializeGoogleOAuth() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback';

    if (!clientId || !clientSecret) {
        console.warn('⚠️  Google OAuth credentials not configured. OAuth will be unavailable.');
        console.warn('To enable Google Sign-In, set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env');
        return false;
    }

    oauth2Client = new GoogleAuth({
        clientId,
        clientSecret,
        redirectUri
    });

    console.log('✅ Google OAuth initialized successfully');
    return true;
}

/**
 * GET /auth/google
 * Redirect to Google login
 */
app.get('/auth/google', (req, res) => {
    if (!process.env.GOOGLE_CLIENT_ID) {
        return res.status(503).json({
            success: false,
            error: 'Google OAuth not configured',
            message: 'Contact administrator to enable Google Sign-In'
        });
    }

    // Generate authorization URL
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback')}&response_type=code&scope=${scopes.join('%20')}`;

    res.redirect(authUrl);
});

/**
 * GET /auth/google/callback
 * Handle Google OAuth callback
 */
app.get('/auth/google/callback', async (req, res) => {
    const { code, error } = req.query;

    if (error) {
        return res.redirect(`/?error=${encodeURIComponent(error)}`);
    }

    if (!code) {
        return res.redirect('/?error=no_code');
    }

    try {
        // Exchange code for tokens
        const tokenResponse = await exchangeCodeForTokens(code);
        const { id_token, access_token } = tokenResponse;

        // Decode ID token to get user info
        const userInfo = await verifyIdToken(id_token);

        const { email, name, picture } = userInfo;

        // Check if user exists
        let user = db.selectUserByEmail(email);

        if (!user) {
            // Create new user from Google data
            user = {
                id: generateUserId(),
                email,
                firstName: name.split(' ')[0] || 'Google',
                lastName: name.split(' ').slice(1).join(' ') || 'User',
                password: 'oauth_google', // Mark as OAuth user
                avatar: picture || '👤',
                gradeLevel: 'middle',
                friends: [],
                quizzes: [],
                assignments: [],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            db.saveUser(user);
        } else {
            // Update last login
            user.lastLogin = new Date().toISOString();
            db.updateUser(user.id, user);
        }

        // Create session
        const sessionToken = generateToken();
        sessions[sessionToken] = {
            userId: user.id,
            email: user.email,
            createdAt: Date.now()
        };

        // Redirect with token
        res.redirect(`/?token=${sessionToken}&provider=google&success=true`);

    } catch (error) {
        console.error('Google OAuth error:', error);
        res.redirect(`/?error=${encodeURIComponent('Authentication failed')}`);
    }
});

/**
 * Exchange authorization code for tokens
 */
async function exchangeCodeForTokens(code) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback';

    const params = new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
    });

    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });

    if (!response.ok) {
        throw new Error('Failed to exchange code for tokens');
    }

    return response.json();
}

/**
 * Verify and decode Google ID token
 */
async function verifyIdToken(idToken) {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?id_token=' + idToken);
    
    if (!response.ok) {
        throw new Error('Failed to verify ID token');
    }

    const tokenInfo = await response.json();

    // Verify the token is for our application
    if (tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID) {
        throw new Error('Invalid token audience');
    }

    // Get user profile information
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + idToken);
    
    if (!profileResponse.ok) {
        throw new Error('Failed to get user profile');
    }

    return profileResponse.json();
}

/**
 * POST /api/auth/google/verify
 * Verify Google authentication token on frontend
 */
app.post('/api/auth/google/verify', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({
            success: false,
            error: 'Token required'
        });
    }

    try {
        // Verify token with Google
        const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?id_token=' + token);
        const tokenInfo = await response.json();

        if (!response.ok) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token'
            });
        }

        // Find or create user
        let user = db.selectUserByEmail(tokenInfo.email);

        if (!user) {
            user = {
                id: generateUserId(),
                email: tokenInfo.email,
                firstName: tokenInfo.given_name || 'Google',
                lastName: tokenInfo.family_name || 'User',
                password: 'oauth_google',
                avatar: tokenInfo.picture || '👤',
                gradeLevel: 'middle',
                friends: [],
                quizzes: [],
                assignments: [],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            db.saveUser(user);
        } else {
            user.lastLogin = new Date().toISOString();
            db.updateUser(user.id, user);
        }

        // Create session
        const sessionToken = generateToken();
        sessions[sessionToken] = {
            userId: user.id,
            email: user.email,
            createdAt: Date.now()
        };

        res.json({
            success: true,
            token: sessionToken,
            user: {
                id: user.id,
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error('Google verification error:', error);
        res.status(401).json({
            success: false,
            error: 'Verification failed'
        });
    }
});

module.exports = { initializeGoogleOAuth };
