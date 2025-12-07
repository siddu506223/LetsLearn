// INTEGRATION GUIDE - HOW TO MERGE ALL FIXES INTO server.js
// ==================================================================

/**
 * STEP-BY-STEP INTEGRATION INSTRUCTIONS
 * 
 * This file shows you EXACTLY where and how to add each fix to server.js
 * Follow this guide to activate all 9 fixes:
 * ✅ Google OAuth sign-in
 * ✅ Teacher dashboard with school email support
 * ✅ Grade-level tabs (elementary, middle, high)
 * ✅ Grades page fixed (auto-generate questions, show topics/difficulties)
 * ✅ Assignments feature with mini projects
 * ✅ Ello AI grading for assignments
 * ✅ Games and puzzles system
 * ✅ Friend feature with mutual acceptance
 * ✅ Demo admin accounts
 */

// ==================================================================
// STEP 1: Add Environment Variables to .env
// ==================================================================
/*
Create or update .env file with:

# Google OAuth (get from https://console.cloud.google.com)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Demo Admin Accounts (use these for testing)
DEMO_ADMIN_EMAILS=admin.elementary@school.edu,admin.middle@school.edu
*/

// ==================================================================
// STEP 2: Update server.js - Add Imports (TOP OF FILE)
// ==================================================================
/*
FIND THIS (line ~1-15):
    const express = require('express');
    const app = express();
    const elloAIGrader = require('./elloAIGrader');
    const questionGenerator = require('./quizzes-extended');

ADD THESE:
    const { initializeGoogleOAuth } = require('./GOOGLE_OAUTH_FIX');
*/

// ==================================================================
// STEP 3: Update server.js - Initialize on Startup
// ==================================================================
/*
FIND THIS (line ~20-30, after app initialization):
    const elloGrader = new elloAIGrader();

ADD THESE LINES AFTER:
    
    // Initialize Google OAuth
    const googleOAuthConfigured = initializeGoogleOAuth();
    
    // Initialize demo admin accounts
    function initializeDemoAdminAccounts() {
        const adminAccounts = [
            {
                id: 'admin-elementary-001',
                email: 'admin.elementary@school.edu',
                firstName: 'Elementary',
                lastName: 'Admin',
                password: 'DemoAdmin123!Elementary',
                role: 'admin',
                gradeLevel: 'elementary',
                school: 'Demo School',
                createdAt: new Date().toISOString()
            },
            {
                id: 'admin-middle-001',
                email: 'admin.middle@school.edu',
                firstName: 'Middle',
                lastName: 'Admin',
                password: 'DemoAdmin123!Middle',
                role: 'admin',
                gradeLevel: 'middle',
                school: 'Demo School',
                createdAt: new Date().toISOString()
            }
        ];

        adminAccounts.forEach(admin => {
            const existing = db.selectUserByEmail(admin.email);
            if (!existing) {
                db.saveUser(admin);
                console.log(`✅ Created demo admin: ${admin.email}`);
            }
        });
    }

    // Call initialization
    initializeDemoAdminAccounts();
    
    // Seed sample questions for grades page
    function seedSampleQuestions() {
        const sampleQuestions = [
            // Elementary
            {
                id: 'q-elem-001',
                subject: 'math',
                topic: 'Addition',
                difficulty: 'easy',
                grade: 'elementary',
                question: 'What is 5 + 3?',
                options: ['7', '8', '9', '6'],
                correct: '8',
                points: 10
            },
            {
                id: 'q-elem-002',
                subject: 'reading',
                topic: 'Comprehension',
                difficulty: 'easy',
                grade: 'elementary',
                question: 'What is the main idea of a story?',
                options: ['The setting', 'The most important point', 'The characters', 'The ending'],
                correct: 'The most important point',
                points: 10
            },
            {
                id: 'q-elem-003',
                subject: 'science',
                topic: 'Life Cycles',
                difficulty: 'medium',
                grade: 'elementary',
                question: 'How many stages does a butterfly go through?',
                options: ['2', '3', '4', '5'],
                correct: '4',
                points: 15
            },
            // Middle
            {
                id: 'q-mid-001',
                subject: 'math',
                topic: 'Algebra',
                difficulty: 'medium',
                grade: 'middle',
                question: 'Solve: 2x + 5 = 13',
                options: ['4', '5', '6', '9'],
                correct: '4',
                points: 15
            },
            {
                id: 'q-mid-002',
                subject: 'english',
                topic: 'Grammar',
                difficulty: 'medium',
                grade: 'middle',
                question: 'Which sentence is correct?',
                options: [
                    'She dont like apples',
                    'She does not like apples',
                    'She do not like apples',
                    'She not like apples'
                ],
                correct: 'She does not like apples',
                points: 15
            },
            {
                id: 'q-mid-003',
                subject: 'science',
                topic: 'Photosynthesis',
                difficulty: 'medium',
                grade: 'middle',
                question: 'What does photosynthesis require?',
                options: [
                    'Only water',
                    'Sunlight, water, and carbon dioxide',
                    'Only chlorophyll',
                    'Oxygen and glucose'
                ],
                correct: 'Sunlight, water, and carbon dioxide',
                points: 15
            },
            // High School
            {
                id: 'q-high-001',
                subject: 'math',
                topic: 'Calculus',
                difficulty: 'hard',
                grade: 'high',
                question: 'Find the derivative of f(x) = 3x² + 2x + 1',
                options: ['6x + 2', '3x + 2', 'x + 1', '6x'],
                correct: '6x + 2',
                points: 20
            },
            {
                id: 'q-high-002',
                subject: 'english',
                topic: 'Literary Analysis',
                difficulty: 'hard',
                grade: 'high',
                question: 'What is a metaphor?',
                options: [
                    'A comparison using "like" or "as"',
                    'A direct comparison without "like" or "as"',
                    'A repetition of sounds',
                    'An exaggeration for effect'
                ],
                correct: 'A direct comparison without "like" or "as"',
                points: 20
            },
            {
                id: 'q-high-003',
                subject: 'history',
                topic: 'American Revolution',
                difficulty: 'hard',
                grade: 'high',
                question: 'What year did the American Revolution begin?',
                options: ['1775', '1776', '1777', '1781'],
                correct: '1775',
                points: 20
            }
        ];

        sampleQuestions.forEach(q => {
            const existing = db.selectQuestionById(q.id);
            if (!existing) {
                db.saveQuestion(q);
            }
        });
        console.log(`✅ Seeded ${sampleQuestions.length} sample questions`);
    }

    seedSampleQuestions();
*/

// ==================================================================
// STEP 4: Copy All Endpoints from These Fix Files
// ==================================================================
/*
Copy and paste ALL endpoints from these files into server.js:

1. TEACHER_DASHBOARD_FIX.js
   - app.post('/api/teacher/login')
   - app.post('/api/teacher/register')
   - app.get('/api/teacher/dashboard/:gradeLevel')
   - app.get('/api/teacher/classes/:gradeLevel')

2. GRADES_FIX.js
   - app.post('/api/quiz/start')
   - app.post('/api/quiz/answer')
   - app.post('/api/quiz/complete')
   - app.get('/api/user/grades')

3. ASSIGNMENTS_FEATURE.js
   - app.post('/api/assignments/create')
   - app.post('/api/assignments/submit')
   - app.get('/api/assignments/:gradeLevel/:subject')
   - app.get('/api/student/assignments/grades')

4. GAMES_AND_FRIENDS_FIX.js
   - app.get('/api/games/available/:gradeLevel')
   - app.post('/api/games/play/:gameId')
   - app.post('/api/games/score')
   - app.post('/api/friends/request')
   - app.get('/api/friends/requests/pending')
   - app.post('/api/friends/request/accept')
   - app.post('/api/friends/request/reject')
   - app.get('/api/friends/list')

5. GOOGLE_OAUTH_FIX.js
   - app.get('/auth/google')
   - app.get('/auth/google/callback')
   - app.post('/api/auth/google/verify')
*/

// ==================================================================
// STEP 5: Update Database Functions (in database.js if needed)
// ==================================================================
/*
Make sure these functions exist in database.js:

1. Teacher/Admin Functions:
   - selectUserByEmail(email)
   - updateUser(userId, userObj)
   - saveUser(user)

2. Friend Functions:
   - saveFriendRequest(request)
   - getFriendRequest(senderId, targetId)
   - getPendingFriendRequests(userId)
   - getFriendRequestById(id)
   - updateFriendRequest(id, request)

3. Game Functions:
   - saveGameSession(session)
   - getGameSession(id)
   - updateGameSession(id, session)

4. Question/Quiz Functions:
   - saveQuestion(question)
   - selectQuestionById(id)
   - getQuestionsByGrade(grade)
   - getQuestionsBySubject(subject, grade)

5. Assignment Functions:
   - saveAssignment(assignment)
   - getAssignmentsByGrade(grade)
   - getAssignmentsByGradeAndSubject(grade, subject)
   - saveAssignmentSubmission(submission)
   - getStudentAssignmentGrades(studentId)

If these don't exist, add them to database.js
*/

// ==================================================================
// STEP 6: Update Frontend (index.html & style.css)
// ==================================================================
/*
Add these sections to index.html:

1. Grade Level Tabs (for teacher dashboard):
   <div id="gradeTabsContainer" style="display:none;">
       <button class="gradeTab" onclick="switchGradeLevel('elementary')">📚 Elementary</button>
       <button class="gradeTab" onclick="switchGradeLevel('middle')">📖 Middle School</button>
       <button class="gradeTab" onclick="switchGradeLevel('high')">📕 High School</button>
   </div>

2. Games Section:
   <div id="gamesSection" style="display:none;">
       <h2>🎮 Games & Puzzles</h2>
       <div id="gamesList"></div>
   </div>

3. Friends Section:
   <div id="friendsSection" style="display:none;">
       <h2>👥 Friends</h2>
       <div id="friendRequests"></div>
       <div id="friendsList"></div>
   </div>

4. Assignments Section:
   <div id="assignmentsSection" style="display:none;">
       <h2>📝 Assignments</h2>
       <div id="assignmentsList"></div>
   </div>

Add to style.css:

.gradeTab {
    padding: 10px 20px;
    margin: 5px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.gradeTab.active {
    background: #2E7D32;
}

.gameCard {
    border: 1px solid #ddd;
    padding: 15px;
    margin: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s;
}

.gameCard:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.friendRequest {
    background: #f5f5f5;
    padding: 10px;
    margin: 8px 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.friendRequest button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
}
*/

// ==================================================================
// STEP 7: Test All Fixes
// ==================================================================
/*
1. Google OAuth:
   - Visit: http://localhost:3000/auth/google
   - Should redirect to Google login
   - After authentication, should create user account

2. Teacher Dashboard:
   - Login with: admin.elementary@school.edu / DemoAdmin123!Elementary
   - Should see "Elementary" tab selected
   - Switch tabs to see different grade levels
   
3. Grades Page:
   - Login as any user
   - Go to Grades
   - Should see questions with topics and difficulties
   - Take a quiz and see auto-grading with Ello explanation if wrong
   
4. Assignments:
   - Login as teacher
   - Create assignment
   - Login as student
   - Submit assignment work (writing/presentation/drawing)
   - Should see Ello AI grade with feedback

5. Games:
   - Click Games section
   - Choose game based on grade level
   - Play and submit score

6. Friends:
   - Login as 2 different users
   - User 1 sends friend request to User 2
   - User 2 sees pending request
   - User 2 accepts request
   - Both should see each other in friends list
*/

// ==================================================================
// STEP 8: Database Persistence Functions Needed
// ==================================================================
/*
Add these to database.js if missing:

// Teacher & User Management
exports.selectUserByEmail = (email) => {
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8') || '[]');
    return users.find(u => u.email === email);
};

exports.selectUserByUsername = (username) => {
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8') || '[]');
    return users.find(u => u.username === username);
};

exports.selectUserById = (id) => {
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8') || '[]');
    return users.find(u => u.id === id);
};

exports.updateUser = (id, userData) => {
    let users = JSON.parse(fs.readFileSync('users.json', 'utf8') || '[]');
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...userData };
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    }
};

// Friend Management
exports.saveFriendRequest = (request) => {
    let requests = JSON.parse(fs.readFileSync('friendRequests.json', 'utf8') || '[]');
    requests.push(request);
    fs.writeFileSync('friendRequests.json', JSON.stringify(requests, null, 2));
};

exports.getPendingFriendRequests = (userId) => {
    const requests = JSON.parse(fs.readFileSync('friendRequests.json', 'utf8') || '[]');
    return requests.filter(r => r.targetId === userId && r.status === 'pending');
};

exports.getFriendRequestById = (id) => {
    const requests = JSON.parse(fs.readFileSync('friendRequests.json', 'utf8') || '[]');
    return requests.find(r => r.id === id);
};

exports.updateFriendRequest = (id, data) => {
    let requests = JSON.parse(fs.readFileSync('friendRequests.json', 'utf8') || '[]');
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
        requests[index] = { ...requests[index], ...data };
        fs.writeFileSync('friendRequests.json', JSON.stringify(requests, null, 2));
    }
};

// Games
exports.saveGameSession = (session) => {
    let sessions = JSON.parse(fs.readFileSync('gameSessions.json', 'utf8') || '[]');
    sessions.push(session);
    fs.writeFileSync('gameSessions.json', JSON.stringify(sessions, null, 2));
};

exports.getGameSession = (id) => {
    const sessions = JSON.parse(fs.readFileSync('gameSessions.json', 'utf8') || '[]');
    return sessions.find(s => s.id === id);
};

exports.updateGameSession = (id, data) => {
    let sessions = JSON.parse(fs.readFileSync('gameSessions.json', 'utf8') || '[]');
    const index = sessions.findIndex(s => s.id === id);
    if (index !== -1) {
        sessions[index] = { ...sessions[index], ...data };
        fs.writeFileSync('gameSessions.json', JSON.stringify(sessions, null, 2));
    }
};

// Questions
exports.saveQuestion = (question) => {
    let questions = JSON.parse(fs.readFileSync('questions.json', 'utf8') || '[]');
    const existing = questions.find(q => q.id === question.id);
    if (!existing) {
        questions.push(question);
        fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2));
    }
};

exports.selectQuestionById = (id) => {
    const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8') || '[]');
    return questions.find(q => q.id === id);
};

// Assignments
exports.saveAssignment = (assignment) => {
    let assignments = JSON.parse(fs.readFileSync('assignments.json', 'utf8') || '[]');
    assignments.push(assignment);
    fs.writeFileSync('assignments.json', JSON.stringify(assignments, null, 2));
};

exports.getAssignmentsByGradeAndSubject = (grade, subject) => {
    const assignments = JSON.parse(fs.readFileSync('assignments.json', 'utf8') || '[]');
    return assignments.filter(a => a.gradeLevel === grade && a.subject === subject);
};

exports.saveAssignmentSubmission = (submission) => {
    let submissions = JSON.parse(fs.readFileSync('assignmentSubmissions.json', 'utf8') || '[]');
    submissions.push(submission);
    fs.writeFileSync('assignmentSubmissions.json', JSON.stringify(submissions, null, 2));
};

exports.getStudentAssignmentGrades = (studentId) => {
    const submissions = JSON.parse(fs.readFileSync('assignmentSubmissions.json', 'utf8') || '[]');
    return submissions.filter(s => s.studentId === studentId);
};
*/

// ==================================================================
// SUMMARY OF ALL 9 FIXES
// ==================================================================
/*
✅ FIXED: Google OAuth Sign-In
   - Users can login with their Google account
   - New accounts auto-created from Google profile
   - Credentials: Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env

✅ FIXED: Teacher Dashboard with School Email Support
   - Teachers can login with school emails (@school.edu, @district.edu)
   - Dashboard shows grade-level specific data
   - Elementary, Middle, High School tabs
   - Demo Accounts:
     - admin.elementary@school.edu / DemoAdmin123!Elementary
     - admin.middle@school.edu / DemoAdmin123!Middle

✅ FIXED: Empty Grades Page
   - Sample questions auto-generated on startup
   - Questions include: subject, topic, difficulty
   - Grades page shows all this information
   - Auto-grades quizzes with correct answers

✅ FIXED: Assignments Feature (Mini Projects)
   - Teachers can create assignments
   - Three types: writing, presentation, drawing
   - Assignments appear by grade level and subject
   - Students submit work for each assignment

✅ FIXED: Ello AI Grading for Assignments
   - Ello AI automatically grades submitted work
   - Provides score based on grade-specific rubrics
   - Gives detailed feedback and suggestions for improvement
   - Works for all three assignment types

✅ FIXED: Grade-Level Tabs
   - Elementary, Middle School, High School tabs
   - Teachers see different data per grade
   - Students see content appropriate to their level
   - Switching tabs shows different classes/assignments

✅ FIXED: Games & Puzzles
   - Games available by grade level
   - Elementary: Math Match, Word Builder, Spelling Bee, Shape Sorter, Logic Puzzles
   - Middle: Equation Quest, Vocabulary Battle, Code Breaker, Element Explorer, Geography Quest
   - High: Calculus Challenge, Debate Simulator, Physics Lab, History Timeline, Literary Analysis
   - Track scores and progress

✅ FIXED: Friend Feature (Mutual Acceptance)
   - Send friend requests to other users
   - Receive notifications of pending requests
   - Accept or reject friend requests
   - Must have mutual acceptance to become friends
   - View list of all friends

✅ FIXED: Demo Admin Accounts
   - Two demo admin accounts created automatically on startup
   - Elementary Admin: admin.elementary@school.edu / DemoAdmin123!Elementary
   - Middle Admin: admin.middle@school.edu / DemoAdmin123!Middle
   - Use for testing and demonstration
*/

module.exports = { };
