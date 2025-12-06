# Curious Elephant Academy - LetsLearn Platform

An interactive educational platform designed for K-12 students to learn through engaging quizzes, AI-generated questions, visual graphics, and personalized learning with avatars and curriculum standards.

## Features

✨ **Phases 1-6 Complete:**
- K-8 Grade Levels with subject-specific courses
- 30+ High School courses organized by subject (Math, Science, English, History, Languages)
- User authentication with email/password signup
- User avatars with 72+ customizable emoji/color combinations
- Google Sign-In OAuth2 integration with auto account creation
- AI-powered question generation with 9 different topics
- SVG graphics for visual learning (math blocks, science diagrams, timelines)
- Comprehensive curriculum standards reference (K-12)
- Profile editing and personalization

## Project Structure

```
LetsLearn/
├── public/
│   ├── index.html           # Main HTML (all views)
│   ├── style.css            # Complete styling (2300+ lines)
│   └── app.js               # Frontend logic (2600+ lines)
├── src/
│   ├── server.js            # Express API routes (700+ lines)
│   ├── database-persistent.js
│   ├── questionGenerator.js # AI question engine (400+ lines)
│   ├── curriculum.js        # K-12 curriculum standards
│   ├── quizzes.js
│   └── quizzes-extended.js
├── .env.example             # Environment configuration
├── package.json
└── README.md
```

## Installation & Setup

```bash
cd LetsLearn
npm install
```

### Google Sign-In Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - Local: `http://localhost:3001/api/auth/google/callback`
   - Production: `https://your-app.onrender.com/api/auth/google/callback`
6. Copy the Client ID and Client Secret
7. Create/update `.env` file:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
PORT=3001
```

## Running the App

```bash
npm start
# or
node src/server.js
```

The app will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/signup` - Create student account
- `POST /api/auth/parent-signup` - Create parent account
- `GET /api/auth/google/signin` - Get Google OAuth URL
- `POST /api/auth/google/callback` - Google OAuth callback
- `POST /api/auth/verify-google-token` - Verify Google token
- `GET /api/auth/logout` - Logout

### Questions & Quizzes
- `GET /api/ai/topics` - List available question topics
- `GET /api/ai/question/:topic/:difficulty` - Generate single question
- `POST /api/ai/quiz` - Generate full quiz with graphics

## Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript, SVG graphics
- **Backend**: Node.js, Express.js
- **Database**: File-based persistent storage
- **Authentication**: Google OAuth 2.0
- **Graphics**: SVG generation for visual learning aids

## Features by Phase

- **Phase 1**: K-8 and High School course structure (30+ courses)
- **Phase 2**: User avatar system with customization
- **Phase 3**: AI-powered question generation with difficulty levels
- **Phase 4**: Curriculum standards reference with searchable standards
- **Phase 5**: Google Sign-In OAuth2 integration ✅
- **Phase 6**: SVG graphics for visual questions (math, science, history) ✅

## Deployment

Deployed on [Render](https://render.com) with auto-deployment on git push.

1. **Frontend**: Simple HTML form to add users, with a table displaying all users
2. **Backend**: Express server handling API requests
3. **Database**: In-memory database with methods for basic SQL operations:
   - `insert()` - Add new records
   - `select()` - Retrieve all records
   - `selectWhere()` - Retrieve records with conditions
   - `update()` - Modify existing records
   - `delete()` - Remove a record
   - `deleteAll()` - Clear the table

## Example Usage

- Enter a name and email in the form and click "Add User"
- Users are automatically displayed in the table
- Click "Delete" to remove a user
- Click "Clear All Data" to delete all users at once
