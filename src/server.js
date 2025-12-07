const express = require('express');
const path = require('path');
const db = require('./database-v2');
const CurriculumInitializer = require('./curriculum-initializer');
const ElloAIGrader = require('./ello-ai-grader');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize question generator and AI grader
const questionGenerator = new CurriculumInitializer();
const elloAI = new ElloAIGrader();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ==================== INITIALIZATION ====================

function initializeApp() {
    console.log('\n🎓 Curious Elephant Academy');
    console.log('================================\n');
    
    // Initialize curriculum (lightweight)
    questionGenerator.initializeCurriculum();
    
    console.log(`\n✅ Application ready at http://localhost:${PORT}\n`);
}

// ==================== AUTH ROUTES ====================

// GET: Google OAuth Configuration
app.get('/api/auth/google/config', (req, res) => {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'REPLACE_WITH_YOUR_GOOGLE_CLIENT_ID';
    
    res.json({
        success: true,
        clientId: GOOGLE_CLIENT_ID,
        redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/api/auth/google/callback',
        configured: GOOGLE_CLIENT_ID !== 'REPLACE_WITH_YOUR_GOOGLE_CLIENT_ID'
    });
});

// POST: Handle Google Sign-In Token
app.post('/api/auth/google/signin', (req, res) => {
    const { credential, decodedToken } = req.body;
    
    if (!credential && !decodedToken) {
        return res.status(400).json({
            success: false,
            error: 'Google credential or token required'
        });
    }

    // Extract user info from Google token
    const userInfo = decodedToken || {
        email: 'user@gmail.com',
        name: 'Google User',
        picture: ''
    };

    // Check if user exists
    let user = db.selectUserByEmail(userInfo.email);

    if (!user) {
        // Create new user from Google account
        const nameParts = (userInfo.name || 'User').split(' ');
        const result = db.insertUser({
            firstName: nameParts[0],
            lastName: nameParts[1] || '',
            email: userInfo.email,
            password: 'GOOGLE_OAUTH_USER', // Placeholder
            grade: 'not-specified',
            role: 'student',
            avatar: 'elephant-default',
            googleId: userInfo.sub || userInfo.id,
            profilePicture: userInfo.picture || '',
            signupMethod: 'google',
            verified: true
        });

        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                error: result.error 
            });
        }
        
        user = result.user;
    } else {
        // Update existing user
        db.updateUser(user.id, {
            lastLogin: new Date().toISOString(),
            googleId: userInfo.sub || userInfo.id
        });
        user = db.selectUserById(user.id);
    }

    res.json({
        success: true,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            grade: user.grade,
            avatar: user.avatar || 'elephant-default',
            points: user.points || 0
        }
    });
});

// POST: Student Sign Up
app.post('/api/auth/signup', (req, res) => {
    const { firstName, lastName, email, password, grade } = req.body;
    
    if (!firstName || !lastName || !email || !password || !grade) {
        return res.status(400).json({ 
            success: false, 
            error: 'All fields required' 
        });
    }

    // Check if user exists
    const existing = db.selectUserByEmail(email);
    if (existing) {
        return res.status(409).json({ 
            success: false, 
            error: 'Email already registered' 
        });
    }

    // Create new user
    const result = db.insertUser({
        firstName,
        lastName,
        email,
        password, // TODO: Hash password with bcrypt
        grade,
        role: 'student',
        avatar: 'elephant-default',
        points: 0,
        badges: [],
        createdAt: new Date().toISOString()
    });

    if (result.success) {
        res.json({ 
            success: true, 
            user: {
                id: result.user.id,
                firstName: result.user.firstName,
                lastName: result.user.lastName,
                email: result.user.email,
                grade: result.user.grade,
                avatar: result.user.avatar
            }
        });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// POST: Student Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            error: 'Email and password required' 
        });
    }

    const user = db.selectUserByEmail(email);
    
    if (!user) {
        return res.status(401).json({ 
            success: false, 
            error: 'User not found' 
        });
    }

    // TODO: Use bcrypt for password comparison
    if (user.password !== password) {
        return res.status(401).json({ 
            success: false, 
            error: 'Invalid password' 
        });
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
            points: user.points,
            avatar: user.avatar,
            badges: user.badges
        }
    });
});

// POST: Parent Login
app.post('/api/auth/parent-login', (req, res) => {
    const { email, password, studentEmail } = req.body;
    
    if (!email || !password || !studentEmail) {
        return res.status(400).json({ 
            success: false, 
            error: 'All fields required' 
        });
    }

    // Verify parent and linked student
    const student = db.selectUserByEmail(studentEmail);
    if (!student) {
        return res.status(401).json({ 
            success: false, 
            error: 'Student not found' 
        });
    }

    // TODO: Implement parent account verification
    res.json({ 
        success: true, 
        parent: { email },
        linkedStudent: student
    });
});

// ==================== DASHBOARD ROUTES ====================

// GET: Student Dashboard
app.get('/api/dashboard/:userId', (req, res) => {
    const user = db.selectUserById(parseInt(req.params.userId));
    
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
    }

    const progress = db.getUserProgress(user.id);

    res.json({
        success: true,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            grade: user.grade,
            avatar: user.avatar,
            points: user.points,
            badges: user.badges
        },
        progress
    });
});

// ==================== CURRICULUM ROUTES ====================

// GET: All grades for a school level
app.get('/api/curriculum/:level', (req, res) => {
    const { level } = req.params; // elementary, middle, high
    const curriculum = require('./curriculum-us');
    
    if (!curriculum[level]) {
        return res.status(404).json({ success: false, error: 'Level not found' });
    }

    const levelData = curriculum[level];
    res.json({
        success: true,
        level,
        label: levelData.label,
        grades: levelData.grades || [],
        subjects: Object.keys(levelData.subjects || {})
    });
});

// GET: Topics for a specific subject/grade
app.get('/api/curriculum/:level/:subject/:grade', (req, res) => {
    const { level, subject, grade } = req.params;
    const curriculum = require('./curriculum-us');
    
    const levelData = curriculum[level];
    if (!levelData || !levelData.subjects[subject]) {
        return res.status(404).json({ success: false, error: 'Subject not found' });
    }

    const subjectData = levelData.subjects[subject];
    const topics = subjectData[grade] || [];

    res.json({
        success: true,
        level,
        subject,
        grade,
        topics,
        subjectLabel: subjectData.label || subject
    });
});

// ==================== QUESTION ROUTES ====================

// GET: Questions for a topic (generated on-demand)
app.get('/api/questions/:grade/:subject/:topic/:difficulty', (req, res) => {
    const { grade, subject, topic, difficulty } = req.params;
    
    // Generate questions on-demand
    const allTopicQuestions = questionGenerator.getQuestionsForTopic(grade, subject, topic);
    const questions = allTopicQuestions.filter(q => q.difficulty === difficulty);

    if (questions.length === 0) {
        return res.status(404).json({ 
            success: false, 
            error: 'No questions found for this topic' 
        });
    }

    res.json({
        success: true,
        count: questions.length,
        grade,
        subject,
        topic,
        difficulty,
        questions
    });
});

// ==================== POINTS AND PROGRESSION ====================

// POST: Update user points after completing a question
app.post('/api/points/add', (req, res) => {
    const { userId, topicKey, points } = req.body;
    
    if (!userId || !topicKey || !points) {
        return res.status(400).json({ 
            success: false, 
            error: 'Missing required fields' 
        });
    }

    const user = db.selectUserById(parseInt(userId));
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Update user points
    const currentPoints = user.points || 0;
    const newPoints = currentPoints + parseInt(points);
    
    db.updateUser(user.id, { points: newPoints });

    // Update progress
    const progress = db.getUserProgress(user.id);
    if (!progress.topicsCompleted) progress.topicsCompleted = [];
    if (!progress.topicsCompleted.includes(topicKey)) {
        progress.topicsCompleted.push(topicKey);
    }
    progress.totalPoints = newPoints;
    
    db.updateUserProgress(user.id, progress);

    res.json({
        success: true,
        newPoints,
        totalPoints: newPoints
    });
});

// ==================== PROFILE ROUTES ====================

// GET: User Profile
app.get('/api/profile/:userId', (req, res) => {
    const user = db.selectUserById(parseInt(req.params.userId));
    
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
    }

    const progress = db.getUserProgress(user.id);

    res.json({
        success: true,
        profile: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            grade: user.grade,
            avatar: user.avatar,
            points: user.points,
            badges: user.badges,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin
        },
        progress
    });
});

// PUT: Update Avatar
app.put('/api/profile/:userId/avatar', (req, res) => {
    const { avatar } = req.body;
    
    if (!avatar) {
        return res.status(400).json({ success: false, error: 'Avatar required' });
    }

    const result = db.updateUser(parseInt(req.params.userId), { avatar });
    
    if (result.success) {
        res.json({ success: true, avatar });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// ==================== GAME SHOP ROUTES ====================

// GET: Available games and puzzles
app.get('/api/game-shop', (req, res) => {
    const games = [
        {
            id: 'math-ninja',
            name: 'Math Ninja',
            description: 'Quick math calculations and puzzles',
            cost: 50,
            category: 'math',
            difficulty: 'medium'
        },
        {
            id: 'word-master',
            name: 'Word Master',
            description: 'Spelling and vocabulary challenges',
            cost: 40,
            category: 'english',
            difficulty: 'easy'
        },
        {
            id: 'science-explorer',
            name: 'Science Explorer',
            description: 'Interactive science experiments',
            cost: 60,
            category: 'science',
            difficulty: 'medium'
        },
        {
            id: 'puzzle-challenge',
            name: 'Logic Puzzle Master',
            description: 'Brain-teasing logic puzzles',
            cost: 75,
            category: 'puzzle',
            difficulty: 'hard'
        }
    ];

    res.json({ success: true, games });
});

// POST: Purchase a game
app.post('/api/game-shop/:gameId/purchase', (req, res) => {
    const { userId } = req.body;
    const user = db.selectUserById(parseInt(userId));
    
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
    }

    // TODO: Implement point deduction and game access

    res.json({
        success: true,
        message: 'Game purchased successfully'
    });
});

// ==================== ASSIGNMENTS ROUTES ====================

// GET: Assignments for a grade
app.get('/api/assignments/:grade', (req, res) => {
    const { grade } = req.params;
    const assignments = db.getAssignmentsByGrade(grade);
    
    res.json({
        success: true,
        grade,
        count: assignments.length,
        assignments
    });
});

// POST: Create new assignment
app.post('/api/assignments', (req, res) => {
    const { title, grade, subject, topic, description, dueDate } = req.body;
    
    if (!title || !grade || !subject || !topic) {
        return res.status(400).json({ 
            success: false, 
            error: 'Required fields missing' 
        });
    }

    const result = db.insertAssignment({
        title,
        grade,
        subject,
        topic,
        description,
        dueDate,
        type: 'interactive', // 'quiz', 'essay', 'project', 'interactive'
        submissions: []
    });

    if (result.success) {
        res.json({ success: true, assignment: result.assignment });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// POST: Submit essay/written assignment (with Ello AI grading)
app.post('/api/assignments/:assignmentId/submit-essay', (req, res) => {
    const { userId, content } = req.body;
    const { assignmentId } = req.params;
    
    if (!userId || !content) {
        return res.status(400).json({
            success: false,
            error: 'User ID and content required'
        });
    }

    // Grade the essay using Ello AI
    const essayGrading = elloAI.gradeEssay(content, {});
    
    res.json({
        success: true,
        submission: {
            assignmentId,
            userId,
            submittedAt: new Date().toISOString(),
            grading: essayGrading,
            elloFeedback: `Your essay on this topic shows ${essayGrading.score > 80 ? 'excellent' : essayGrading.score > 70 ? 'good' : 'developing'} understanding.`
        }
    });
});

// POST: Submit file (presentation, document, etc.)
app.post('/api/assignments/:assignmentId/submit-file', (req, res) => {
    const { userId, fileName, fileType } = req.body;
    const { assignmentId } = req.params;
    
    if (!userId || !fileName) {
        return res.status(400).json({
            success: false,
            error: 'User ID and file name required'
        });
    }

    // Simulate file reception
    const fileData = {
        assignmentId,
        userId,
        fileName,
        fileType,
        submittedAt: new Date().toISOString(),
        status: 'submitted',
        feedback: `Your ${fileType} file has been received. Your teacher will review it within 24 hours.`
    };

    res.json({
        success: true,
        submission: fileData
    });
});

// POST: Submit interactive simulation response
app.post('/api/assignments/:assignmentId/submit-simulation', (req, res) => {
    const { userId, correctSteps, totalSteps, timeSpent, attempts } = req.body;
    const { assignmentId } = req.params;
    
    if (!userId || !correctSteps || !totalSteps) {
        return res.status(400).json({
            success: false,
            error: 'Required simulation data missing'
        });
    }

    // Grade using Ello AI
    const simulationGrading = elloAI.gradeSimulation({
        correctSteps,
        totalSteps,
        timeSpent: timeSpent || 0,
        attempts: attempts || 1
    });
    
    res.json({
        success: true,
        submission: {
            assignmentId,
            userId,
            submittedAt: new Date().toISOString(),
            grading: simulationGrading,
            elloFeedback: `Great work on this interactive simulation! You completed ${Math.round((correctSteps/totalSteps)*100)}% of the steps correctly.`
        }
    });
});

// ==================== ELLO AI GRADING ====================

// POST: Get feedback for an answer
app.post('/api/ello/feedback', (req, res) => {
    const { isCorrect, subject, errorType, answer } = req.body;
    
    let feedback;
    if (isCorrect) {
        feedback = {
            success: true,
            message: elloAI.getCorrectFeedback(),
            isCorrect: true
        };
    } else {
        feedback = {
            success: true,
            isCorrect: false,
            ...elloAI.getIncorrectFeedback(subject, errorType)
        };
    }
    
    res.json(feedback);
});

// POST: Grade essay/creative submission
app.post('/api/ello/grade-essay', (req, res) => {
    const { content, rubric, topic } = req.body;
    
    if (!content) {
        return res.status(400).json({ 
            success: false, 
            error: 'Essay content required' 
        });
    }

    const grading = elloAI.gradeEssay(content, rubric);
    
    res.json({
        success: true,
        grading: {
            ...grading,
            feedback: grading.feedback,
            topicFeedback: `Great job exploring ${topic}!`
        }
    });
});

// POST: Grade interactive simulation
app.post('/api/ello/grade-simulation', (req, res) => {
    const { correctSteps, totalSteps, timeSpent, attempts } = req.body;
    
    if (!correctSteps || !totalSteps) {
        return res.status(400).json({ 
            success: false, 
            error: 'Simulation data required' 
        });
    }

    const grading = elloAI.gradeSimulation({
        correctSteps,
        totalSteps,
        timeSpent: timeSpent || 0,
        attempts: attempts || 1
    });
    
    res.json({
        success: true,
        grading
    });
});

// POST: Get learning recommendations
app.post('/api/ello/recommendations', (req, res) => {
    const { userId, topicsMastered, recentAccuracy } = req.body;
    
    if (!userId) {
        return res.status(400).json({ 
            success: false, 
            error: 'User ID required' 
        });
    }

    const recommendations = elloAI.generateRecommendations({
        topicsMastered: topicsMastered || [],
        recentAccuracy: recentAccuracy || 0
    }, 'current-topic');
    
    res.json({
        success: true,
        recommendations
    });
});

// ==================== ERROR HANDLING ====================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        success: false, 
        error: 'Server error',
        message: err.message 
    });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
    initializeApp();
});

module.exports = app;

