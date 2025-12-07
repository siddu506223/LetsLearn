// GRADES PAGE & QUESTIONS FIX
// Fixes empty grades page and auto-generates questions

// ==================== AUTO-GENERATE QUESTIONS ====================

/**
 * When user starts a quiz, auto-generate questions
 * Populate the questions array with real content
 */
app.post('/api/quiz/start', (req, res) => {
    const { subject, difficulty, grade } = req.body;
    const userId = req.headers['user-id'];

    if (!subject || !difficulty || !grade) {
        return res.status(400).json({
            success: false,
            error: 'Subject, difficulty, and grade required'
        });
    }

    // Generate questions using QuestionGenerator
    const numQuestions = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15;
    const questions = qGen.generateQuiz(subject, difficulty, numQuestions);

    if (!questions || questions.length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Could not generate questions for this subject'
        });
    }

    // Create quiz session
    const quizSession = {
        id: Date.now().toString(),
        userId,
        subject,
        difficulty,
        grade,
        questions: questions.map((q, idx) => ({
            ...q,
            order: idx,
            answered: false,
            userAnswer: null,
            correct: null,
            timeSpent: 0
        })),
        startTime: new Date().toISOString(),
        endTime: null,
        score: null,
        completed: false
    };

    // Save to database or session storage
    db.saveQuizSession(quizSession);

    res.json({
        success: true,
        quizId: quizSession.id,
        subject,
        difficulty,
        totalQuestions: questions.length,
        questions: questions.map(q => ({
            id: q.id,
            text: q.text,
            topic: q.topic,
            difficulty: q.difficulty,
            // Don't send answers yet
            type: q.type || 'multiple-choice'
        }))
    });
});

// ==================== SUBMIT ANSWER ====================

/**
 * Submit answer to a question
 * Track correctness and provide feedback
 */
app.post('/api/quiz/answer', (req, res) => {
    const { quizId, questionId, answer } = req.body;
    const userId = req.headers['user-id'];

    const quizSession = db.getQuizSession(quizId);
    if (!quizSession) {
        return res.status(404).json({
            success: false,
            error: 'Quiz not found'
        });
    }

    const question = quizSession.questions.find(q => q.id === questionId);
    if (!question) {
        return res.status(404).json({
            success: false,
            error: 'Question not found'
        });
    }

    // Check if answer is correct
    const isCorrect = question.correct_answer === answer;
    
    // Update question
    question.answered = true;
    question.userAnswer = answer;
    question.correct = isCorrect;

    // Use Ello AI to explain why the answer is wrong (if incorrect)
    let explanation = '';
    if (!isCorrect) {
        explanation = elloGrader.generateFeedback(
            { 
                topic: question.topic,
                userAnswer: answer,
                correctAnswer: question.correct_answer
            },
            50,
            '3-5', // adaptive
            'quiz'
        );
    }

    res.json({
        success: true,
        correct: isCorrect,
        explanation: explanation || `That's correct! Well done!`,
        correctAnswer: question.correct_answer,
        feedback: question.explanation || 'Keep learning!'
    });
});

// ==================== COMPLETE QUIZ ====================

/**
 * Complete quiz and calculate score
 * Use Ello AI to provide detailed feedback
 */
app.post('/api/quiz/complete', (req, res) => {
    const { quizId } = req.body;
    const userId = req.headers['user-id'];

    const quizSession = db.getQuizSession(quizId);
    if (!quizSession) {
        return res.status(404).json({
            success: false,
            error: 'Quiz not found'
        });
    }

    // Calculate score
    const correctAnswers = quizSession.questions.filter(q => q.correct).length;
    const totalQuestions = quizSession.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Mark as completed
    quizSession.completed = true;
    quizSession.endTime = new Date().toISOString();
    quizSession.score = score;

    // Use Ello AI to generate performance feedback
    const performance = elloGrader.gradeSubmission(
        {
            content: `Quiz completed. Score: ${score}%. Correct: ${correctAnswers}/${totalQuestions}`
        },
        '3-5',
        'quiz'
    );

    // Save results to user's grade history
    db.saveQuizResult({
        userId,
        quizId,
        subject: quizSession.subject,
        difficulty: quizSession.difficulty,
        grade: quizSession.grade,
        score,
        correctAnswers,
        totalQuestions,
        completedAt: quizSession.endTime,
        feedback: performance.grade.feedback
    });

    res.json({
        success: true,
        score,
        correctAnswers,
        totalQuestions,
        percentage: score,
        letterGrade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D',
        feedback: performance.grade.feedback,
        suggestions: performance.grade.suggestions,
        celebration: score >= 80 ? performance.grade.celebration : 'Keep practicing!'
    });
});

// ==================== GET GRADES ====================

/**
 * GET /api/user/grades
 * Get all grades for user
 * Fixed to show topics, difficulties, scores
 */
app.get('/api/user/grades', (req, res) => {
    const userId = req.headers['user-id'];

    if (!userId) {
        return res.status(401).json({
            success: false,
            error: 'User ID required'
        });
    }

    const grades = db.getUserQuizResults(userId);

    if (!grades || grades.length === 0) {
        return res.json({
            success: true,
            grades: [],
            stats: {
                totalQuizzes: 0,
                averageScore: 0,
                subjects: [],
                difficulties: []
            }
        });
    }

    // Group by subject and difficulty
    const subjects = [...new Set(grades.map(g => g.subject))];
    const difficulties = [...new Set(grades.map(g => g.difficulty))];
    const averageScore = Math.round(
        grades.reduce((sum, g) => sum + g.score, 0) / grades.length
    );

    res.json({
        success: true,
        grades: grades.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)),
        stats: {
            totalQuizzes: grades.length,
            averageScore,
            subjects,
            difficulties,
            bySubject: subjects.map(subject => ({
                subject,
                count: grades.filter(g => g.subject === subject).length,
                averageScore: Math.round(
                    grades.filter(g => g.subject === subject)
                        .reduce((sum, g) => sum + g.score, 0) / 
                    grades.filter(g => g.subject === subject).length
                )
            })),
            byDifficulty: difficulties.map(difficulty => ({
                difficulty,
                count: grades.filter(g => g.difficulty === difficulty).length,
                averageScore: Math.round(
                    grades.filter(g => g.difficulty === difficulty)
                        .reduce((sum, g) => sum + g.score, 0) / 
                    grades.filter(g => g.difficulty === difficulty).length
                )
            }))
        }
    });
});

// ==================== DATABASE SEEDING ====================

/**
 * Seed database with sample questions
 * Call once to populate with initial data
 */
function seedSampleQuestions() {
    const sampleQuestions = [
        // Math
        {
            id: 'math-001',
            text: 'What is 5 + 7?',
            subject: 'math',
            topic: 'addition',
            difficulty: 'easy',
            type: 'multiple-choice',
            options: ['10', '12', '14', '15'],
            correct_answer: '12',
            explanation: 'When you add 5 and 7 together, you get 12.'
        },
        // Science
        {
            id: 'science-001',
            text: 'What is the chemical formula for water?',
            subject: 'science',
            topic: 'chemistry',
            difficulty: 'easy',
            type: 'multiple-choice',
            options: ['H2O', 'CO2', 'O2', 'N2'],
            correct_answer: 'H2O',
            explanation: 'Water is made of 2 hydrogen atoms and 1 oxygen atom, so the formula is H2O.'
        }
        // Add more as needed
    ];

    sampleQuestions.forEach(q => {
        const existing = db.selectQuestionById(q.id);
        if (!existing) {
            db.insertQuestion(q);
        }
    });

    console.log('Sample questions seeded to database');
}

// Export functions
module.exports = { seedSampleQuestions };
