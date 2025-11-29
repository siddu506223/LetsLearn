const express = require('express');
const path = require('path');
const InMemoryDB = require('./database');
const quizzes = require('./quizzes');

const app = express();
const db = new InMemoryDB();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes

// GET all users
app.get('/api/users', (req, res) => {
    const users = db.select('users');
    res.json(users);
});

// POST: Add new user
app.post('/api/users', (req, res) => {
    const { firstName, lastName, email, grade, dateOfBirth } = req.body;
    
    if (!firstName || !lastName || !email || !grade || !dateOfBirth) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const user = db.insert('users', { firstName, lastName, email, grade, dateOfBirth });
    
    // Initialize progress for all students
    db.initializeUserProgress(user.id);
    
    res.status(201).json(user);
});

// DELETE user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const success = db.delete('users', id);
    
    if (success) {
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// DELETE all users
app.delete('/api/users/clear-all', (req, res) => {
    db.deleteAll('users');
    res.json({ message: 'All users deleted' });
});

// QUIZ API Routes

// GET all quizzes for a subject and difficulty based on grade
app.get('/api/quizzes/:grade/:subject/:difficulty', (req, res) => {
    const { grade, subject, difficulty } = req.params;
    
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
    
    res.json(quizzes[gradeKey][subject][difficulty]);
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
        userPoints: progress ? progress.points : 0,
        minigameUnlocked,
        correctAnswer: question.correctAnswer
    });
});

// GET user progress
app.get('/api/progress/:userId', (req, res) => {
    const { userId } = req.params;
    const progress = db.getUserProgress(parseInt(userId));
    
    if (!progress) {
        return res.status(404).json({ error: 'Progress not found' });
    }
    
    res.json(progress);
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
