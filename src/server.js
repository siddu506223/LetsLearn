const express = require('express');
const path = require('path');
const db = require('./database-persistent'); // Using persistent file-based database
const quizzes = require('./quizzes');

const app = express();
const PORT = process.env.PORT || 3001;

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

// DELETE: Delete a user (admin only - checks device identifier)
app.post('/api/admin/delete-user', (req, res) => {
    const { userId, deviceId } = req.body;
    
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
    // Security: Only allow from localhost
    const clientIp = req.ip;
    const isLocalhost = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.includes('127.0.0.1');
    
    if (!isLocalhost) {
        return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    
    const { userId, grade } = req.body;
    
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
    // Security: Only allow from localhost
    const clientIp = req.ip;
    const isLocalhost = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.includes('127.0.0.1');
    
    if (!isLocalhost) {
        return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    
    const { parentId, grade } = req.body;
    
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

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

