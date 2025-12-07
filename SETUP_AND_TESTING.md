# Curious Elephant Academy - Complete Setup & Testing Guide

## 🎓 Overview

Curious Elephant Academy is a comprehensive K-12 educational platform featuring:

- **Complete US Curriculum**: K-5 Elementary, 6-8 Middle School, 9-12 High School
- **Smart Question System**: 10 questions per difficulty level (easy, medium, hard) generated on-demand
- **Ello AI Grading Engine**: Intelligent feedback on student answers, essays, and simulations
- **Game Shop**: Educational games and puzzles students can purchase with earned points
- **Student Profiles**: Avatar customization and progress tracking
- **Interactive Assignments**: Essay writing, file uploads, simulations with AI grading
- **Parent Dashboard**: Monitor child's progress
- **Google OAuth**: Easy sign-in with Google accounts

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm (included with Node.js)
- Git

### Installation

```bash
# Navigate to project directory
cd LetsLearn

# Install dependencies (if needed)
npm install

# Start the server
node src/server.js
```

The application will be available at: **http://localhost:3001**

---

## 📊 Complete Feature List

### ✅ Phase 1: Foundation (COMPLETE)
- [x] US K-12 Curriculum structure
- [x] Elementary School (K-5): Math, Reading, Writing, Science, Social Studies
- [x] Middle School (6-8): Math, English, Science, Social Studies, Electives
- [x] High School (9-12): Advanced courses in all subjects
- [x] Question generation (10 per difficulty: easy 10pts, medium 25pts, hard 50pts)
- [x] Landing page with feature showcase
- [x] Student signup/login system
- [x] Parent login functionality
- [x] Main dashboard with tabs
- [x] Student profile with avatar selection
- [x] Game shop with 4 games (Math Ninja, Word Master, Science Explorer, Logic Puzzle)
- [x] Point system and progression tracking

### ✅ Phase 2: Ello AI (COMPLETE)
- [x] AI Grading Engine for multiple choice questions
- [x] Essay grading with strengths/improvements analysis
- [x] Interactive simulation grading
- [x] Personalized learning recommendations
- [x] Context-specific hints for each subject
- [x] Feedback patterns for Math, Reading, Writing, Science

### ✅ Phase 3: Google OAuth & Assignments (COMPLETE)
- [x] Google Sign-In integration (API routes ready)
- [x] Essay submission with AI grading
- [x] File upload support (presentations, documents)
- [x] Interactive simulation submissions
- [x] Automated Ello AI feedback
- [x] Google OAuth setup documentation

### 📝 Phase 4: Polish & Deployment (READY)
- [ ] Deep learning model training for Ello (optional)
- [ ] Production deployment
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Analytics dashboard

---

## 🧪 Testing Guide

### Test 1: Sign Up & Login

1. Go to http://localhost:3001
2. Click "Sign Up"
3. Fill in:
   - First Name: Test
   - Last Name: Student
   - Email: teststudent@example.com
   - Password: TestPass123
   - Grade: 3rd
4. Click "Create Account"
5. You should see the dashboard

**Expected**: Dashboard loads with 0 points, grade shows as "3rd"

### Test 2: Complete a Quiz

1. From dashboard, click "Curriculum" tab
2. Select "Elementary (K-5)"
3. Select "Math"
4. Select "3rd Grade"
5. Select "Multiplication Facts"
6. Select "Easy"
7. Answer 10 questions
8. You should earn 100 points (10 questions × 10 points each)

**Expected**: Points increase to 100, completion message shows

### Test 3: Student Profile

1. Click "Profile" tab
2. Select a different avatar (😊, 🎉, 😎)
3. Avatar should change immediately
4. Stats should show your earned points

**Expected**: Avatar changes, stats display correctly

### Test 4: Game Shop

1. Click "Game Shop" tab
2. See 4 available games with point costs
3. Try to purchase "Math Ninja" (costs 50 points)

**Expected**: If you have enough points, purchase succeeds with confirmation

### Test 5: Assignments

1. Click "Assignments" tab
2. View any assignments available for your grade
3. Click "Start Assignment"

**Expected**: Assignment interface loads (implementation depends on assignment type)

### Test 6: API Endpoints

Test via curl or Postman:

```bash
# Get Google config
curl http://localhost:3001/api/auth/google/config

# Get curriculum for elementary level
curl http://localhost:3001/api/curriculum/elementary

# Get subjects for 3rd grade math
curl http://localhost:3001/api/curriculum/elementary/math/3rd

# Get questions for a topic
curl "http://localhost:3001/api/questions/3rd/math/Multiplication%20Facts/easy"

# Get game shop
curl http://localhost:3001/api/game-shop

# Get Ello AI feedback (POST)
curl -X POST http://localhost:3001/api/ello/feedback \
  -H "Content-Type: application/json" \
  -d '{"isCorrect": true, "subject": "math", "errorType": "none"}'

# Grade an essay (POST)
curl -X POST http://localhost:3001/api/ello/grade-essay \
  -H "Content-Type: application/json" \
  -d '{"content": "This is a great essay about math.", "topic": "Fractions"}'
```

---

## 🔐 Google OAuth Setup

See `GOOGLE_OAUTH_SETUP.md` for detailed instructions.

### Quick Setup:
1. Create Google Cloud Project
2. Enable Google+ API
3. Create OAuth 2.0 credentials (Web application)
4. Add authorized origins: `http://localhost:3001`
5. Add redirect URI: `http://localhost:3001/api/auth/google/callback`
6. Add Client ID to `.env` file or directly in code

---

## 📁 Project Structure

```
LetsLearn/
├── public/
│   ├── index.html           # Main HTML page
│   ├── app.js              # Frontend JavaScript
│   └── style.css           # Styling
├── src/
│   ├── server.js           # Express server with all routes
│   ├── database-v2.js      # File-based database
│   ├── curriculum-us.js    # US curriculum data (K-12)
│   ├── curriculum-initializer.js  # Question generator
│   └── ello-ai-grader.js   # AI grading engine
├── data/
│   ├── users.json          # User accounts
│   ├── user-progress.json  # Student progress
│   ├── curriculum.json     # Curriculum structure
│   ├── questions.json      # Question database
│   └── assignments.json    # Assignments
├── package.json
├── README.md
└── GOOGLE_OAUTH_SETUP.md
```

---

## 🎯 API Routes

### Authentication
- `POST /api/auth/signup` - Create new student account
- `POST /api/auth/login` - Student login
- `POST /api/auth/parent-login` - Parent login
- `POST /api/auth/google/signin` - Google OAuth signin
- `GET /api/auth/google/config` - Get Google config

### Curriculum
- `GET /api/curriculum/:level` - Get level overview
- `GET /api/curriculum/:level/:subject/:grade` - Get topics for subject/grade

### Questions
- `GET /api/questions/:grade/:subject/:topic/:difficulty` - Get questions

### Dashboard & Profile
- `GET /api/dashboard/:userId` - Get student dashboard
- `GET /api/profile/:userId` - Get student profile
- `PUT /api/profile/:userId/avatar` - Update avatar

### Points & Progression
- `POST /api/points/add` - Add points for completed topic

### Game Shop
- `GET /api/game-shop` - List all games
- `POST /api/game-shop/:gameId/purchase` - Purchase a game

### Assignments
- `GET /api/assignments/:grade` - Get assignments for grade
- `POST /api/assignments` - Create new assignment
- `POST /api/assignments/:assignmentId/submit-essay` - Submit essay with AI grading
- `POST /api/assignments/:assignmentId/submit-file` - Submit file
- `POST /api/assignments/:assignmentId/submit-simulation` - Submit simulation

### Ello AI
- `POST /api/ello/feedback` - Get feedback on answer
- `POST /api/ello/grade-essay` - Grade essay with AI
- `POST /api/ello/grade-simulation` - Grade simulation
- `POST /api/ello/recommendations` - Get learning recommendations

---

## 🐛 Troubleshooting

### Server won't start
```
Error: Port 3001 already in use
Solution: Kill the existing process or change PORT in server.js
```

### Database errors
```
Error: Cannot read property 'email' of undefined
Solution: Delete data/ folder and restart server to reinitialize
```

### Questions not loading
```
Error: No questions found for topic
Solution: This is expected - questions are generated on-demand.
         Verify the topic exists in curriculum-us.js
```

### Authentication not working
```
Error: User not found / Invalid password
Solution: Make sure user was created via signup.
         Check data/users.json to verify user exists.
```

---

## 📚 Curriculum Structure

### Elementary (K-5)
**Grades**: K, 1st, 2nd, 3rd, 4th, 5th
**Subjects**:
- Math (e.g., Counting, Addition, Fractions)
- Reading & Language Arts
- Writing
- Science (e.g., Life Cycles, Weather)
- Social Studies

### Middle School (6-8)
**Grades**: 6th, 7th, 8th
**Subjects**:
- Mathematics
- English Language Arts
- Science
- Social Studies
- Electives

### High School (9-12)
**Courses**:
- Mathematics: Algebra I, Geometry, Algebra II, Precalculus, Calculus
- English: Literature, Language, Advanced Courses
- Science: Biology, Chemistry, Physics, Environmental
- Social Studies: History, Government, Economics

Each subject contains multiple topics with 30 questions per topic (10 easy, 10 medium, 10 hard).

---

## 🎨 Customization

### Change Points Per Difficulty
Edit `src/curriculum-initializer.js`:
```javascript
calculatePoints(difficulty) {
    const pointsMap = {
        'easy': 10,      // Change these values
        'medium': 25,
        'hard': 50
    };
    return pointsMap[difficulty] || 10;
}
```

### Add New Subjects
1. Edit `src/curriculum-us.js`
2. Add to appropriate level's subjects object
3. Add topics array with grade-level topics

### Customize Ello AI Feedback
Edit `src/ello-ai-grader.js`:
```javascript
getCorrectFeedback() {
    const feedbackArray = [
        "Your custom feedback here",
        // ... more feedback
    ];
    return feedbackArray[Math.floor(Math.random() * feedbackArray.length)];
}
```

---

## 🚀 Deployment

### Basic Node.js Deployment

#### Using Heroku:
```bash
heroku create curious-elephant-academy
git push heroku main
```

#### Using DigitalOcean, AWS, or similar:
1. SSH into server
2. Clone repository
3. Install Node.js
4. Set environment variables
5. Start with `node src/server.js` or use PM2:
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name "elephant"
   ```

### Production Checklist
- [ ] Set environment variables (GOOGLE_CLIENT_ID, etc.)
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure database backups
- [ ] Set up monitoring & logging
- [ ] Enable rate limiting
- [ ] Add SSL certificate
- [ ] Configure firewall

---

## 📞 Support & Contact

For issues or questions:
1. Check troubleshooting section above
2. Review API documentation in this file
3. Check error messages in browser console
4. Review server logs in terminal

---

**Last Updated**: December 7, 2025
**Status**: ✅ All core features implemented and tested
**Version**: 1.0.0
