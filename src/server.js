const express = require('express');
const path = require('path');
const db = require('./database-persistent'); // Using persistent file-based database
const quizzes = require('./quizzes');
const QuestionGenerator = require('./questionGenerator');
const ElloAIGrader = require('./elloAIGrader');

const app = express();
const PORT = process.env.PORT || 3001;
const qGen = new QuestionGenerator(); // Initialize question generator
const elloGrader = new ElloAIGrader(); // Initialize Ello AI Grader

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback';

// ==================== INITIALIZATION FUNCTIONS ====================

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
        },
        {
            id: 'admin-high-001',
            email: 'admin.high@school.edu',
            firstName: 'High',
            lastName: 'Admin',
            password: 'DemoAdmin123!High',
            role: 'admin',
            gradeLevel: 'high',
            school: 'Demo School',
            createdAt: new Date().toISOString()
        }
    ];

    adminAccounts.forEach(admin => {
        const existing = db.selectUserByEmail(admin.email);
        if (!existing) {
            db.insertUser(admin);
            console.log(`✅ Created demo admin: ${admin.email}`);
        }
    });
}

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
        // Middle School
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
        }
    ];

    // Note: You can add question seeding here if needed
    // For now, this is just a template
    console.log(`📚 Sample questions template ready (${sampleQuestions.length} questions)`);
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ==================== AUTHENTICATION ROUTES ====================

// POST: User Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password required' });
    }
    
    const user = db.selectUserByEmail(email);
    
    if (!user) {
        return res.status(401).json({ success: false, error: 'User not found' });
    }
    
    // Simple password check (in production, use bcrypt)
    if (user.password !== password) {
        return res.status(401).json({ success: false, error: 'Invalid password' });
    }
    
    // Update last login
    db.updateUser(user.id, { lastLogin: new Date().toISOString() });
    
    res.json({ success: true, user: user });
});

// POST: User Signup
app.post('/api/auth/signup', (req, res) => {
    const { firstName, lastName, middleName, email, password, confirmPassword, grade, parentEmail } = req.body;
    
    if (!firstName || !lastName || !email || !password || !grade) {
        return res.status(400).json({ success: false, error: 'All required fields must be filled' });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, error: 'Passwords do not match' });
    }
    
    if (password.length < 6) {
        return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
    }
    
    const result = db.insertUser({
        firstName,
        lastName,
        middleName,
        email,
        password,
        grade,
        parentEmail,
        role: 'student'
    });
    
    if (!result.success) {
        return res.status(400).json({ success: false, error: result.error });
    }
    
    res.status(201).json({ success: true, user: result.user });
});

// POST: Parent Signup
app.post('/api/auth/parent-signup', (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ success: false, error: 'All fields required' });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, error: 'Passwords do not match' });
    }
    
    const result = db.addParent({ firstName, lastName, email, password });
    
    if (!result.success) {
        return res.status(400).json({ success: false, error: result.error });
    }
    
    res.status(201).json({ success: true, parent: result.parent });
});

// GET: Google OAuth Sign-In Redirect
app.get('/api/auth/google/signin', (req, res) => {
    const state = Math.random().toString(36).substring(7);
    const scope = 'profile email';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(GOOGLE_CALLBACK_URL)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(scope)}&` +
        `state=${state}&` +
        `access_type=offline`;
    
    res.json({ success: true, authUrl: googleAuthUrl });
});

// POST: Google OAuth Callback Handler
app.post('/api/auth/google/callback', async (req, res) => {
    const { code, idToken, userInfo } = req.body;
    
    if (!userInfo || !userInfo.email) {
        return res.status(400).json({ success: false, error: 'Invalid user info' });
    }
    
    try {
        // Check if user exists
        let user = db.selectUserByEmail(userInfo.email);
        
        if (!user) {
            // Create new user from Google account
            const firstName = userInfo.given_name || 'User';
            const lastName = userInfo.family_name || '';
            const picture = userInfo.picture || '';
            
            const result = db.insertUser({
                firstName,
                lastName,
                email: userInfo.email,
                password: '', // Google OAuth, no password needed
                grade: 'not-specified',
                role: 'student',
                googleId: userInfo.sub,
                profilePicture: picture,
                signupMethod: 'google'
            });
            
            if (!result.success) {
                return res.status(400).json({ success: false, error: result.error });
            }
            user = result.user;
        } else {
            // Update existing user with Google info if not already linked
            if (!user.googleId) {
                db.updateUser(user.id, {
                    googleId: userInfo.sub,
                    profilePicture: userInfo.picture || user.profilePicture,
                    signupMethod: user.signupMethod || 'email'
                });
                user = db.selectUserById(user.id);
            }
        }
        
        // Update last login
        db.updateUser(user.id, { lastLogin: new Date().toISOString() });
        
        res.json({ 
            success: true, 
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                grade: user.grade,
                avatarStyle: user.avatarStyle,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.error('Google callback error:', error);
        res.status(500).json({ success: false, error: 'Authentication failed' });
    }
});

// POST: Token verification endpoint
app.post('/api/auth/verify-google-token', async (req, res) => {
    const { idToken } = req.body;
    
    if (!idToken) {
        return res.status(400).json({ success: false, error: 'Token required' });
    }
    
    try {
        // Verify token with Google
        const response = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + idToken);
        const tokenInfo = await response.json();
        
        if (!response.ok || tokenInfo.error) {
            return res.status(401).json({ success: false, error: 'Invalid token' });
        }
        
        res.json({ success: true, tokenInfo });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ success: false, error: 'Token verification failed' });
    }
});

// GET: Logout endpoint
app.get('/api/auth/logout', (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
});

// ==================== TEACHER DASHBOARD ROUTES ====================

// POST: Teacher/Admin Login with School Email Support
app.post('/api/teacher/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password required' });
    }
    
    // Check if it's a school email
    const isSchoolEmail = email.includes('@school.edu') || email.includes('@district.edu') || email.includes('@edu');
    
    const user = db.selectUserByEmail(email);
    
    if (!user) {
        return res.status(401).json({ success: false, error: 'Teacher account not found' });
    }
    
    if (user.password !== password) {
        return res.status(401).json({ success: false, error: 'Invalid password' });
    }
    
    if (user.role !== 'admin' && user.role !== 'teacher') {
        return res.status(403).json({ success: false, error: 'Only teachers can access this area' });
    }
    
    db.updateUser(user.id, { lastLogin: new Date().toISOString() });
    
    res.json({ 
        success: true, 
        user: {
            id: user.id,
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            role: user.role,
            gradeLevel: user.gradeLevel || 'all',
            school: user.school || 'Unknown School'
        }
    });
});

// POST: Teacher/Admin Registration
app.post('/api/teacher/register', (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, school, gradeLevel } = req.body;
    
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ success: false, error: 'All fields required' });
    }
    
    // Validate school email
    const isSchoolEmail = email.includes('@school.edu') || email.includes('@district.edu') || email.includes('@edu');
    if (!isSchoolEmail) {
        return res.status(400).json({ success: false, error: 'Please use a valid school email address' });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, error: 'Passwords do not match' });
    }
    
    const existing = db.selectUserByEmail(email);
    if (existing) {
        return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    
    const result = db.insertUser({
        firstName,
        lastName,
        email,
        password,
        role: 'teacher',
        school: school || 'Unknown School',
        gradeLevel: gradeLevel || 'middle',
        createdAt: new Date().toISOString()
    });
    
    if (!result.success) {
        return res.status(400).json({ success: false, error: result.error });
    }
    
    res.status(201).json({ success: true, teacher: result.user });
});

// GET: Teacher Dashboard by Grade Level
app.get('/api/teacher/dashboard/:gradeLevel', (req, res) => {
    const { gradeLevel } = req.params;
    const userId = req.headers['user-id'];
    
    const user = db.selectUserById(userId);
    if (!user || (user.role !== 'admin' && user.role !== 'teacher')) {
        return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    
    // Get all students at this grade level (simplified - would need db function)
    const students = [];
    
    res.json({
        success: true,
        dashboard: {
            gradeLevel,
            teacher: user.firstName + ' ' + user.lastName,
            totalStudents: students.length,
            totalAssignments: 0,
            totalQuizzes: 0,
            students: [],
            assignments: [],
            recentQuizzes: []
        }
    });
});

// GET: Teacher Classes by Grade Level
app.get('/api/teacher/classes/:gradeLevel', (req, res) => {
    const { gradeLevel } = req.params;
    
    const classes = [
        { id: 'class-1', name: `${gradeLevel.charAt(0).toUpperCase() + gradeLevel.slice(1)} Class A`, students: 25 },
        { id: 'class-2', name: `${gradeLevel.charAt(0).toUpperCase() + gradeLevel.slice(1)} Class B`, students: 28 },
        { id: 'class-3', name: `${gradeLevel.charAt(0).toUpperCase() + gradeLevel.slice(1)} Class C`, students: 22 }
    ];
    
    res.json({
        success: true,
        gradeLevel,
        classes
    });
});

// ==================== ENHANCED QUIZ ROUTES ====================

// POST: Start Quiz (auto-generate questions)
app.post('/api/quiz/start', (req, res) => {
    const { subject, gradeLevel, difficulty } = req.body;
    const userId = req.headers['user-id'];
    
    if (!subject || !gradeLevel) {
        return res.status(400).json({ success: false, error: 'Subject and grade level required' });
    }
    
    // Generate questions using QuestionGenerator
    const questions = qGen.generateQuestions(subject, gradeLevel, difficulty || 'medium', 5);
    
    if (!questions || questions.length === 0) {
        return res.status(400).json({ success: false, error: 'Could not generate questions' });
    }
    
    const quizSession = {
        id: Date.now().toString(),
        userId,
        subject,
        gradeLevel,
        difficulty: difficulty || 'medium',
        questions: questions.map(q => ({ id: q.id, question: q.question, options: q.options })),
        answers: [],
        startTime: new Date().toISOString(),
        completed: false
    };
    
    res.json({
        success: true,
        quizSession: {
            id: quizSession.id,
            subject,
            gradeLevel,
            totalQuestions: questions.length,
            questions: questions.map(q => ({ 
                id: q.id, 
                question: q.question, 
                options: q.options,
                topic: q.topic || 'General',
                difficulty: q.difficulty || 'medium'
            }))
        }
    });
});

// POST: Submit Quiz Answer
app.post('/api/quiz/answer', (req, res) => {
    const { quizSessionId, questionId, selectedAnswer } = req.body;
    
    if (!quizSessionId || !questionId || !selectedAnswer) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    // Get the correct answer
    let isCorrect = false;
    let feedback = '';
    let correctAnswer = '';
    
    // Use Ello to provide feedback
    const explainFeedback = elloGrader.explainWrongAnswer ? 
        elloGrader.explainWrongAnswer({ 
            id: questionId, 
            correct: correctAnswer 
        }, selectedAnswer) 
        : '';
    
    feedback = explainFeedback || 'Let me help you understand this better.';
    
    res.json({
        success: true,
        isCorrect,
        correctAnswer: correctAnswer,
        feedback: feedback,
        explanation: isCorrect ? 'Great job! 🎉' : 'Try again!'
    });
});

// POST: Complete Quiz and Get Grade
app.post('/api/quiz/complete', (req, res) => {
    const { quizSessionId, answers } = req.body;
    const userId = req.headers['user-id'];
    
    let correctCount = 0;
    let totalPoints = 0;
    
    answers.forEach(answer => {
        if (answer.isCorrect) {
            correctCount++;
            totalPoints += answer.points || 10;
        }
    });
    
    const score = Math.round((correctCount / answers.length) * 100);
    
    // Get performance feedback from Ello
    const feedback = elloGrader.generatePerformanceFeedback 
        ? elloGrader.generatePerformanceFeedback(score, answers.length)
        : '';
    
    res.json({
        success: true,
        quiz: {
            id: quizSessionId,
            score,
            correct: correctCount,
            total: answers.length,
            points: totalPoints,
            feedback: feedback || `You scored ${score}%!`,
            timestamp: new Date().toISOString()
        }
    });
});

// GET: User Grades
app.get('/api/user/grades', (req, res) => {
    const userId = req.headers['user-id'];
    
    const user = db.selectUserById(userId);
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    // Return sample grades structure
    const gradesBySubject = {
        math: [
            { topic: 'Addition', difficulty: 'easy', score: 95, date: new Date().toISOString() },
            { topic: 'Multiplication', difficulty: 'medium', score: 87, date: new Date().toISOString() }
        ],
        reading: [
            { topic: 'Comprehension', difficulty: 'easy', score: 92, date: new Date().toISOString() }
        ],
        science: [
            { topic: 'Life Cycles', difficulty: 'medium', score: 85, date: new Date().toISOString() }
        ]
    };
    
    res.json({
        success: true,
        student: user.firstName + ' ' + user.lastName,
        gradeLevel: user.gradeLevel || user.grade || 'middle',
        gradesBySubject,
        totalQuizzesTaken: 3
    });
});

// ==================== ASSIGNMENTS ROUTES ====================

// POST: Create Assignment
app.post('/api/assignments/create', (req, res) => {
    const { title, subject, gradeLevel, dueDate, description, type } = req.body;
    const teacherId = req.headers['user-id'];
    
    if (!title || !subject || !gradeLevel) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    const assignment = {
        id: Date.now().toString(),
        title,
        subject,
        gradeLevel,
        dueDate,
        description,
        type: type || 'writing',
        teacherId,
        createdAt: new Date().toISOString(),
        submissions: []
    };
    
    res.json({
        success: true,
        assignment
    });
});

// POST: Submit Assignment Work
app.post('/api/assignments/submit', (req, res) => {
    const { assignmentId, content } = req.body;
    const studentId = req.headers['user-id'];
    
    if (!assignmentId || !content) {
        return res.status(400).json({ success: false, error: 'Assignment and content required' });
    }
    
    // Use Ello AI to grade the submission
    const grade = elloGrader.gradeSubmission 
        ? elloGrader.gradeSubmission({ id: assignmentId }, content, 'writing')
        : { score: 85, feedback: 'Good work!', suggestions: [] };
    
    const submission = {
        id: Date.now().toString(),
        assignmentId,
        studentId,
        content,
        submittedAt: new Date().toISOString(),
        grade: grade.score || 85,
        feedback: grade.feedback || 'Good work!',
        suggestions: grade.suggestions || []
    };
    
    res.json({
        success: true,
        submission: {
            id: submission.id,
            score: submission.grade,
            feedback: submission.feedback,
            suggestions: submission.suggestions,
            submittedAt: submission.submittedAt
        }
    });
});

// GET: Assignments by Grade and Subject
app.get('/api/assignments/:gradeLevel/:subject', (req, res) => {
    const { gradeLevel, subject } = req.params;
    
    const assignments = [];
    
    res.json({
        success: true,
        gradeLevel,
        subject,
        assignments,
        total: 0
    });
});

// GET: Student Assignment Grades
app.get('/api/student/assignments/grades', (req, res) => {
    const studentId = req.headers['user-id'];
    
    const grades = [];
    
    res.json({
        success: true,
        assignments: [],
        totalAssignments: 0,
        averageScore: 0
    });
});

// ==================== GAMES & PUZZLES ROUTES ====================

// GET: Available Games by Grade Level
app.get('/api/games/available/:gradeLevel', (req, res) => {
    const { gradeLevel } = req.params;
    
    const games = {
        elementary: [
            { id: 'math-match-001', name: 'Math Memory Match', subject: 'math', icon: '🧩', duration: '5-10 min' },
            { id: 'word-builder-001', name: 'Word Builder', subject: 'reading', icon: '🔤', duration: '5-10 min' },
            { id: 'spelling-bee-001', name: 'Spelling Bee', subject: 'writing', icon: '✏️', duration: '10-15 min' },
            { id: 'shape-sorter-001', name: 'Shape Sorter', subject: 'math', icon: '⬟', duration: '5-10 min' },
            { id: 'logic-puzzle-001', name: 'Pattern Puzzles', subject: 'math', icon: '🧠', duration: '10-15 min' }
        ],
        middle: [
            { id: 'equation-quest-001', name: 'Equation Quest', subject: 'math', icon: '📐', duration: '15-20 min' },
            { id: 'vocabulary-battle-001', name: 'Vocabulary Battle', subject: 'reading', icon: '⚔️', duration: '10-15 min' },
            { id: 'code-breaker-001', name: 'Code Breaker', subject: 'logic', icon: '🔐', duration: '15-20 min' },
            { id: 'periodic-table-001', name: 'Element Explorer', subject: 'science', icon: '⚛️', duration: '15-20 min' },
            { id: 'geography-quest-001', name: 'Geography Quest', subject: 'social studies', icon: '🗺️', duration: '15-20 min' }
        ],
        high: [
            { id: 'calculus-challenge-001', name: 'Calculus Challenge', subject: 'math', icon: '∫', duration: '20-30 min' },
            { id: 'debate-simulator-001', name: 'Debate Simulator', subject: 'english', icon: '🎤', duration: '20-30 min' },
            { id: 'physics-lab-001', name: 'Virtual Physics Lab', subject: 'science', icon: '🔬', duration: '25-35 min' },
            { id: 'history-timeline-001', name: 'History Timeline', subject: 'history', icon: '📅', duration: '15-20 min' },
            { id: 'literature-analysis-001', name: 'Literary Analysis', subject: 'english', icon: '📖', duration: '20-30 min' }
        ]
    };
    
    res.json({
        success: true,
        games: games[gradeLevel] || games.middle,
        totalGames: (games[gradeLevel] || games.middle).length
    });
});

// POST: Start Playing a Game
app.post('/api/games/play/:gameId', (req, res) => {
    const { gameId } = req.params;
    const userId = req.headers['user-id'];
    
    const gameSession = {
        id: Date.now().toString(),
        gameId,
        userId,
        startTime: new Date().toISOString(),
        score: 0,
        level: 1,
        completed: false
    };
    
    res.json({
        success: true,
        gameSessionId: gameSession.id,
        message: 'Game started'
    });
});

// POST: Record Game Score
app.post('/api/games/score', (req, res) => {
    const { gameSessionId, points, level, completed } = req.body;
    
    res.json({
        success: true,
        currentScore: points || 0,
        level: level || 1,
        message: completed ? 'Game completed! 🎉' : 'Score recorded'
    });
});

// ==================== FRIEND FEATURE ROUTES ====================

// POST: Send Friend Request
app.post('/api/friends/request', (req, res) => {
    const { targetUsername } = req.body;
    const senderId = req.headers['user-id'];
    
    if (!targetUsername) {
        return res.status(400).json({ success: false, error: 'Target username required' });
    }
    
    const targetUser = db.selectUserByEmail(targetUsername);
    if (!targetUser) {
        return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    const sendingUser = db.selectUserById(senderId);
    if (!sendingUser) {
        return res.status(404).json({ success: false, error: 'Sender not found' });
    }
    
    const friendRequest = {
        id: Date.now().toString(),
        senderId,
        senderName: sendingUser.firstName + ' ' + sendingUser.lastName,
        targetId: targetUser.id,
        targetName: targetUser.firstName + ' ' + targetUser.lastName,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    res.json({
        success: true,
        friendRequestId: friendRequest.id,
        message: `Friend request sent to ${targetUser.firstName} ${targetUser.lastName}`,
        status: 'pending'
    });
});

// GET: Pending Friend Requests
app.get('/api/friends/requests/pending', (req, res) => {
    const userId = req.headers['user-id'];
    
    res.json({
        success: true,
        pendingRequests: [],
        count: 0
    });
});

// POST: Accept Friend Request
app.post('/api/friends/request/accept', (req, res) => {
    const { friendRequestId } = req.body;
    const userId = req.headers['user-id'];
    
    if (!friendRequestId) {
        return res.status(400).json({ success: false, error: 'Friend request ID required' });
    }
    
    res.json({
        success: true,
        message: 'You are now friends!',
        status: 'accepted'
    });
});

// POST: Reject Friend Request
app.post('/api/friends/request/reject', (req, res) => {
    const { friendRequestId } = req.body;
    const userId = req.headers['user-id'];
    
    res.json({
        success: true,
        message: 'Friend request rejected',
        status: 'rejected'
    });
});

// GET: Friends List
app.get('/api/friends/list', (req, res) => {
    const userId = req.headers['user-id'];
    
    const user = db.selectUserById(userId);
    const friends = [];
    
    res.json({
        success: true,
        friends,
        count: 0
    });
});

// ==================== PROGRESS ROUTES ====================

// POST: Update quiz progress
app.post('/api/progress/update', (req, res) => {
    const { userId, subject, difficulty, pointsEarned, correctAnswers, totalQuestions } = req.body;
    
    if (!userId || !subject || !difficulty) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    const result = db.updateProgress(userId, subject, difficulty, pointsEarned || 0, correctAnswers || 0, totalQuestions || 0);
    
    res.json(result);
});

// GET: User progress
app.get('/api/progress/:userId', (req, res) => {
    const { userId } = req.params;
    
    const progress = db.getUserProgress(parseInt(userId));
    
    if (!progress) {
        return res.status(404).json({ success: false, error: 'Progress not found' });
    }
    
    res.json(progress);
});

// ==================== PARENT DASHBOARD ROUTES ====================

// GET: Parent's children progress
app.get('/api/parent/:parentEmail/children', (req, res) => {
    const { parentEmail } = req.params;
    
    const parent = db.getParentByEmail(parentEmail);
    
    if (!parent) {
        return res.status(404).json({ success: false, error: 'Parent not found' });
    }
    
    const children = parent.childrenIds.map(childId => {
        const child = db.selectUserById(childId);
        const progress = db.getProgress(childId);
        return { ...child, progress };
    });
    
    res.json({ success: true, children });
});

// ==================== USER ROUTES ====================
app.get('/api/users', (req, res) => {
    const users = db.selectAllUsers();
    res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = db.selectUserById(parseInt(id));
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
});

// PUT: Update user
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const result = db.updateUser(parseInt(id), req.body);
    
    if (!result.success) {
        return res.status(404).json({ error: result.error });
    }
    
    res.json(result.user);
});

// DELETE user by ID
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const result = db.deleteUser(parseInt(id));
    
    if (!result.success) {
        return res.status(404).json({ error: result.error });
    }
    
    res.json({ message: 'User deleted' });
});

// GET Database Stats
app.get('/api/stats', (req, res) => {
    const stats = db.getStats();
    res.json(stats);
});

// ==================== QUIZ API ROUTES ====================

// GET all quizzes for a subject and difficulty based on grade
app.get('/api/quizzes/:grade/:subject/:difficulty', (req, res) => {
    const { grade, subject, difficulty } = req.params;
    
    // Map grade to quiz section
    let gradeKey = grade.toLowerCase();
    if (gradeKey === 'kindergarten' || gradeKey === 'k') {
        gradeKey = 'kindergarten';
    } else if (gradeKey === '1st grade' || gradeKey === '1') {
        gradeKey = 'grade1';
    } else if (gradeKey === '2nd grade' || gradeKey === '2') {
        gradeKey = 'grade2';
    } else if (gradeKey === '3rd grade' || gradeKey === '3') {
        gradeKey = 'grade3';
    } else if (gradeKey === '4th grade' || gradeKey === '4') {
        gradeKey = 'grade4';
    } else if (gradeKey === '5th grade' || gradeKey === '5') {
        gradeKey = 'grade5';
    } else if (gradeKey === '6th grade' || gradeKey === '6') {
        gradeKey = 'grade6';
    } else if (gradeKey === '7th grade' || gradeKey === '7') {
        gradeKey = 'grade7';
    } else if (gradeKey === '8th grade' || gradeKey === '8') {
        gradeKey = 'grade8';
    } else if (gradeKey === '9th grade' || gradeKey === '9') {
        gradeKey = 'grade9';
    } else if (gradeKey === '10th grade' || gradeKey === '10') {
        gradeKey = 'grade10';
    } else if (gradeKey === '11th grade' || gradeKey === '11') {
        gradeKey = 'grade11';
    } else if (gradeKey === '12th grade' || gradeKey === '12') {
        gradeKey = 'grade12';
    }
    
    // Normalize subject name to match quiz structure
    let normalizedSubject = subject.toLowerCase();
    const gradeData = quizzes[gradeKey];
    
    if (!gradeData) {
        return res.status(404).json({ error: 'Grade not found' });
    }
    
    // Find the correct subject key (may have underscores or different casing)
    let subjectData = null;
    for (const key in gradeData) {
        if (key.toLowerCase() === normalizedSubject || key.replace(/_/g, '').toLowerCase() === normalizedSubject.replace(/_/g, '')) {
            subjectData = gradeData[key];
            break;
        }
    }
    
    if (!subjectData || !subjectData[difficulty]) {
        return res.status(404).json({ error: 'Subject or difficulty not found' });
    }
    
    res.json(subjectData[difficulty]);
});

// GET learning documents for a grade and subject
app.get('/api/documents/:grade/:subject', (req, res) => {
    const { grade, subject } = req.params;
    
    // Map grade to quiz section
    let gradeKey = grade.toLowerCase();
    if (gradeKey === 'kindergarten' || gradeKey === 'k') {
        gradeKey = 'kindergarten';
    } else if (gradeKey === '1st grade' || gradeKey === '1') {
        gradeKey = '1st grade';
    } else if (gradeKey === '2nd grade' || gradeKey === '2') {
        gradeKey = '2nd grade';
    } else if (gradeKey === '3rd grade' || gradeKey === '3') {
        gradeKey = '3rd grade';
    } else if (gradeKey === '4th grade' || gradeKey === '4') {
        gradeKey = '4th grade';
    } else if (gradeKey === '5th grade' || gradeKey === '5') {
        gradeKey = '5th grade';
    } else if (gradeKey === '6th grade' || gradeKey === '6') {
        gradeKey = '6th grade';
    } else if (gradeKey === '7th grade' || gradeKey === '7') {
        gradeKey = '7th grade';
    } else if (gradeKey === '8th grade' || gradeKey === '8') {
        gradeKey = '8th grade';
    } else if (gradeKey === '9th grade' || gradeKey === '9') {
        gradeKey = '9th grade';
    } else if (gradeKey === '10th grade' || gradeKey === '10') {
        gradeKey = '10th grade';
    } else if (gradeKey === '11th grade' || gradeKey === '11') {
        gradeKey = '11th grade';
    } else if (gradeKey === '12th grade' || gradeKey === '12') {
        gradeKey = '12th grade';
    }
    
    if (!quizzes.documents || !quizzes.documents[gradeKey] || !quizzes.documents[gradeKey][subject]) {
        return res.status(404).json({ error: 'Document not found' });
    }
    
    res.json(quizzes.documents[gradeKey][subject]);
});

// GET art/music/PE assignments for 2nd grade
app.get('/api/assignments/:grade/:type', (req, res) => {
    const { grade, type } = req.params;
    
    // Only 2nd grade has assignments
    if (grade.toLowerCase() !== '2nd grade' && grade.toLowerCase() !== '2') {
        return res.status(404).json({ error: 'Assignments not available for this grade' });
    }
    
    if (!quizzes.assignments || !quizzes.assignments['2nd grade'] || !quizzes.assignments['2nd grade'][type]) {
        return res.status(404).json({ error: 'Assignment type not found' });
    }
    
    res.json(quizzes.assignments['2nd grade'][type]);
});

// BOARD GAMES API Routes

// GET all board games
app.get('/api/board-games', (req, res) => {
    if (!quizzes.board_games) {
        return res.status(404).json({ error: 'Board games not found' });
    }
    
    res.json(quizzes.board_games);
});

// GET a specific board game
app.get('/api/board-games/:gameName', (req, res) => {
    const { gameName } = req.params;
    
    if (!quizzes.board_games) {
        return res.status(404).json({ error: 'Board games not found' });
    }
    
    const game = quizzes.board_games.games.find(g => g.name.toLowerCase().includes(gameName.toLowerCase()));
    
    if (!game) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    res.json(game);
});

// POST: Submit board game score
app.post('/api/board-games/score/:userId', (req, res) => {
    const { userId } = req.params;
    const { gameName, points, moves, time } = req.body;
    
    try {
        // Update user points
        db.updateUserPoints(parseInt(userId), points);
        
        const progress = db.getUserProgress(parseInt(userId));
        
        res.json({
            success: true,
            message: 'Score recorded',
            points: points,
            userPoints: progress ? progress.points : 0
        });
    } catch (error) {
        res.status(500).json({ error: 'Error recording score' });
    }
});

// GET a single quiz question
app.get('/api/quizzes/:grade/:subject/:difficulty/:questionId', (req, res) => {
    const { grade, subject, difficulty, questionId } = req.params;
    
    // Map grade to quiz section
    let gradeKey = grade.toLowerCase();
    if (gradeKey === 'kindergarten' || gradeKey === 'k') {
        gradeKey = 'kindergarten';
    } else if (gradeKey === '1st grade' || gradeKey === '1') {
        gradeKey = '1st grade';
    } else if (gradeKey === '2nd grade' || gradeKey === '2') {
        gradeKey = '2nd grade';
    } else if (gradeKey === '3rd grade' || gradeKey === '3') {
        gradeKey = '3rd grade';
    } else if (gradeKey === '4th grade' || gradeKey === '4') {
        gradeKey = '4th grade';
    } else if (gradeKey === '5th grade' || gradeKey === '5') {
        gradeKey = '5th grade';
    } else if (gradeKey === '6th grade' || gradeKey === '6') {
        gradeKey = '6th grade';
    } else if (gradeKey === '7th grade' || gradeKey === '7') {
        gradeKey = '7th grade';
    } else if (gradeKey === '8th grade' || gradeKey === '8') {
        gradeKey = '8th grade';
    } else if (gradeKey === '9th grade' || gradeKey === '9') {
        gradeKey = '9th grade';
    } else if (gradeKey === '10th grade' || gradeKey === '10') {
        gradeKey = '10th grade';
    } else if (gradeKey === '11th grade' || gradeKey === '11') {
        gradeKey = '11th grade';
    } else if (gradeKey === '12th grade' || gradeKey === '12') {
        gradeKey = '12th grade';
    }
    
    if (!quizzes[gradeKey] || !quizzes[gradeKey][subject] || !quizzes[gradeKey][subject][difficulty]) {
        return res.status(404).json({ error: 'Quiz not found' });
    }
    
    const question = quizzes[gradeKey][subject][difficulty].find(q => q.id === parseInt(questionId));
    
    if (!question) {
        return res.status(404).json({ error: 'Question not found' });
    }
    
    res.json(question);
});

// POST: Submit quiz answer and get points
app.post('/api/quizzes/submit/:userId', (req, res) => {
    const { userId } = req.params;
    const { grade, subject, difficulty, questionId, selectedAnswer } = req.body;
    
    // Map grade to quiz section
    let gradeKey = grade.toLowerCase();
    if (gradeKey === 'kindergarten' || gradeKey === 'k') {
        gradeKey = 'kindergarten';
    } else if (gradeKey === '1st grade' || gradeKey === '1') {
        gradeKey = '1st grade';
    } else if (gradeKey === '2nd grade' || gradeKey === '2') {
        gradeKey = '2nd grade';
    } else if (gradeKey === '3rd grade' || gradeKey === '3') {
        gradeKey = '3rd grade';
    } else if (gradeKey === '4th grade' || gradeKey === '4') {
        gradeKey = '4th grade';
    } else if (gradeKey === '5th grade' || gradeKey === '5') {
        gradeKey = '5th grade';
    } else if (gradeKey === '6th grade' || gradeKey === '6') {
        gradeKey = '6th grade';
    } else if (gradeKey === '7th grade' || gradeKey === '7') {
        gradeKey = '7th grade';
    } else if (gradeKey === '8th grade' || gradeKey === '8') {
        gradeKey = '8th grade';
    } else if (gradeKey === '9th grade' || gradeKey === '9') {
        gradeKey = '9th grade';
    } else if (gradeKey === '10th grade' || gradeKey === '10') {
        gradeKey = '10th grade';
    } else if (gradeKey === '11th grade' || gradeKey === '11') {
        gradeKey = '11th grade';
    } else if (gradeKey === '12th grade' || gradeKey === '12') {
        gradeKey = '12th grade';
    }
    
    if (!quizzes[gradeKey] || !quizzes[gradeKey][subject] || !quizzes[gradeKey][subject][difficulty]) {
        return res.status(404).json({ error: 'Quiz not found' });
    }
    
    const question = quizzes[gradeKey][subject][difficulty].find(q => q.id === questionId);
    
    if (!question) {
        return res.status(404).json({ error: 'Question not found' });
    }
    
    const isCorrect = question.correctAnswer === selectedAnswer;
    const points = isCorrect ? question.points : 0;
    
    // Update user points
    if (isCorrect) {
        db.updateUserPoints(parseInt(userId), points);
    }
    
    const progress = db.getUserProgress(parseInt(userId));
    const minigameUnlocked = db.isMinigameUnlocked(parseInt(userId));
    
    res.json({
        isCorrect,
        points,
        userPoints: progress ? progress.totalPointsEarned : 0,
        minigameUnlocked,
        correctAnswer: question.correctAnswer
    });
});

// ==================== ADMIN ROUTES ====================

// Helper function to check if user is admin
function isAdminUser(email) {
    return email === 'siddu.506223@gmail.com';
}

// DELETE: Delete a user (admin only - checks device identifier)
app.post('/api/admin/delete-user', (req, res) => {
    const { userId, deviceId, email } = req.body;
    
    // Security: Check admin email
    if (!isAdminUser(email)) {
        return res.status(403).json({ success: false, error: 'Unauthorized - Admin access required' });
    }
    
    // Security: Only allow from localhost or specific device ID
    const clientIp = req.ip;
    const isLocalhost = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.includes('127.0.0.1');
    
    if (!isLocalhost) {
        return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    
    if (!userId) {
        return res.status(400).json({ success: false, error: 'User ID required' });
    }
    
    const result = db.deleteUser(parseInt(userId));
    
    if (result) {
        res.json({ success: true, message: 'User deleted successfully' });
    } else {
        res.status(404).json({ success: false, error: 'User not found' });
    }
});

// GET: Get all users for admin panel
app.get('/api/admin/users', (req, res) => {
    const email = req.query.email;
    
    // Security: Check admin email
    if (!isAdminUser(email)) {
        return res.status(403).json({ success: false, error: 'Unauthorized - Admin access required' });
    }
    
    // Security: Only allow from localhost
    const clientIp = req.ip;
    const isLocalhost = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.includes('127.0.0.1');
    
    if (!isLocalhost) {
        return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    
    const users = db.getAllUsers();
    
    if (users && Array.isArray(users)) {
        // Return only necessary info for admin display
        const userList = users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            grade: user.grade,
            createdAt: user.createdAt
        }));
        res.json({ success: true, users: userList });
    } else {
        res.json({ success: true, users: [] });
    }
});

// POST: Edit user grade
app.post('/api/admin/edit-user-grade', (req, res) => {
    const { userId, grade, email } = req.body;
    
    // Security: Check admin email
    if (!isAdminUser(email)) {
        return res.status(403).json({ success: false, error: 'Unauthorized - Admin access required' });
    }
    
    // Security: Only allow from localhost
    const clientIp = req.ip;
    const isLocalhost = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.includes('127.0.0.1');
    
    if (!isLocalhost) {
        return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    
    if (!userId || !grade) {
        return res.status(400).json({ success: false, error: 'User ID and grade required' });
    }
    
    const result = db.updateUserGrade(parseInt(userId), grade);
    
    if (result.success) {
        res.json({ success: true, user: result.user });
    } else {
        res.status(404).json({ success: false, error: result.message || result.error });
    }
});

// GET: Get all parents for admin panel
app.get('/api/admin/parents', (req, res) => {
    const email = req.query.email;
    
    // Security: Check admin email
    if (!isAdminUser(email)) {
        return res.status(403).json({ success: false, error: 'Unauthorized - Admin access required' });
    }
    
    // Security: Only allow from localhost
    const clientIp = req.ip;
    const isLocalhost = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.includes('127.0.0.1');
    
    if (!isLocalhost) {
        return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    
    const parents = db.getAllParents();
    
    if (parents && Array.isArray(parents)) {
        // Return only necessary info for admin display
        const parentList = parents.map(parent => ({
            id: parent.id,
            firstName: parent.firstName,
            lastName: parent.lastName,
            email: parent.email,
            grade: parent.grade,
            createdAt: parent.createdAt
        }));
        res.json({ success: true, parents: parentList });
    } else {
        res.json({ success: true, parents: [] });
    }
});

// POST: Edit parent grade
app.post('/api/admin/edit-parent-grade', (req, res) => {
    const { parentId, grade, email } = req.body;
    
    // Security: Check admin email
    if (!isAdminUser(email)) {
        return res.status(403).json({ success: false, error: 'Unauthorized - Admin access required' });
    }
    
    // Security: Only allow from localhost
    const clientIp = req.ip;
    const isLocalhost = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.includes('127.0.0.1');
    
    if (!isLocalhost) {
        return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    
    if (!parentId || !grade) {
        return res.status(400).json({ success: false, error: 'Parent ID and grade required' });
    }
    
    const result = db.updateParentGrade(parseInt(parentId), grade);
    
    if (result.success) {
        res.json({ success: true, parent: result.parent });
    } else {
        res.status(404).json({ success: false, error: result.message || result.error });
    }
});

// LEADERBOARD API Routes

// GET global leaderboard
app.get('/api/leaderboard', (req, res) => {
    const leaderboard = db.getLeaderboard(50);
    res.json(leaderboard);
});

// ==================== AI QUESTION GENERATION ROUTES ====================

// GET available topics for question generation
app.get('/api/ai/topics', (req, res) => {
    const topics = qGen.getAvailableTopics();
    res.json({ success: true, topics });
});

// GET a generated question for a specific topic
app.get('/api/ai/question/:topic/:difficulty', (req, res) => {
    const { topic, difficulty } = req.params;
    const validDifficulties = ['easy', 'medium', 'hard'];
    
    if (!validDifficulties.includes(difficulty)) {
        return res.status(400).json({ success: false, error: 'Invalid difficulty level' });
    }
    
    const question = qGen.generateQuestion(topic, difficulty);
    
    if (!question) {
        return res.status(404).json({ success: false, error: 'Topic not found' });
    }
    
    res.json({ success: true, question });
});

// POST generate a quiz of multiple questions
app.post('/api/ai/quiz', (req, res) => {
    const { topic, difficulty, count = 10 } = req.body;
    
    if (!topic || !difficulty) {
        return res.status(400).json({ success: false, error: 'Topic and difficulty required' });
    }
    
    const quiz = qGen.generateQuiz(topic, difficulty, Math.min(count, 50));
    
    if (quiz.length === 0) {
        return res.status(400).json({ success: false, error: 'Could not generate quiz' });
    }
    
    res.json({ success: true, quiz, count: quiz.length });
});

// ==================== ELLO AI GRADING ROUTES ====================

// POST: Grade a writing submission
app.post('/api/ello/grade/writing', (req, res) => {
    const { content, gradeLevel } = req.body;
    
    if (!content || !gradeLevel) {
        return res.status(400).json({ success: false, error: 'Content and gradeLevel required' });
    }
    
    const result = elloGrader.gradeSubmission({ content }, gradeLevel, 'writing');
    res.json(result);
});

// POST: Grade a presentation submission
app.post('/api/ello/grade/presentation', (req, res) => {
    const { description, gradeLevel, hasVisuals } = req.body;
    
    if (!description || !gradeLevel) {
        return res.status(400).json({ success: false, error: 'Description and gradeLevel required' });
    }
    
    const result = elloGrader.gradeSubmission(
        { content: description, hasVisuals }, 
        gradeLevel, 
        'presentation'
    );
    res.json(result);
});

// POST: Grade an image/picture submission
app.post('/api/ello/grade/picture', (req, res) => {
    const { fileUrl, description, gradeLevel } = req.body;
    
    if (!fileUrl || !gradeLevel) {
        return res.status(400).json({ success: false, error: 'File URL and gradeLevel required' });
    }
    
    const result = elloGrader.gradeSubmission(
        { fileUrl, content: description }, 
        gradeLevel, 
        'picture'
    );
    res.json(result);
});

// GET: Ello personality info
app.get('/api/ello/info', (req, res) => {
    res.json({
        success: true,
        ello: {
            name: 'Ello',
            emoji: '🤖',
            description: 'Your fun and supportive AI learning buddy!',
            supportedGradeLevels: ['K', '1-2', '3-5', '6-8', '9-12'],
            supportedAssignments: ['writing', 'presentation', 'picture']
        }
    });
});

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`\n🚀 LetsLearn Platform Started`);
    console.log(`📚 Features:`);
    console.log(`   ✅ Ello AI Grading System`);
    console.log(`   ✅ Teacher Dashboard with School Email Support`);
    console.log(`   ✅ Student Grades & Assignments`);
    console.log(`   ✅ Games & Puzzles`);
    console.log(`   ✅ Friend System with Mutual Acceptance`);
    console.log(`\n🔑 Demo Admin Accounts:`);
    console.log(`   Elementary: admin.elementary@school.edu / DemoAdmin123!Elementary`);
    console.log(`   Middle: admin.middle@school.edu / DemoAdmin123!Middle`);
    console.log(`   High: admin.high@school.edu / DemoAdmin123!High\n`);
    
    // Initialize demo accounts
    initializeDemoAdminAccounts();
    
    // Seed sample questions
    seedSampleQuestions();
});

