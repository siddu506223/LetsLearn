const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
function initializeFiles() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const files = {
        'users.json': '[]',
        'curriculum.json': '{}',
        'questions.json': '[]',
        'user-progress.json': '{}',
        'assignments.json': '[]'
    };

    Object.entries(files).forEach(([filename, defaultContent]) => {
        const filePath = path.join(DATA_DIR, filename);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, defaultContent);
        }
    });
}

// ==================== USER MANAGEMENT ====================

function selectAllUsers() {
    try {
        const data = fs.readFileSync(path.join(DATA_DIR, 'users.json'), 'utf8');
        return JSON.parse(data) || [];
    } catch (err) {
        return [];
    }
}

function selectUserByEmail(email) {
    const users = selectAllUsers();
    return users.find(u => u.email === email) || null;
}

function selectUserById(id) {
    const users = selectAllUsers();
    return users.find(u => u.id === id) || null;
}

function insertUser(user) {
    try {
        const users = selectAllUsers();
        const newUser = {
            id: Date.now(),
            ...user,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            points: 0,
            badges: [],
            avatar: user.avatar || 'elephant-default'
        };
        users.push(newUser);
        fs.writeFileSync(path.join(DATA_DIR, 'users.json'), JSON.stringify(users, null, 2));
        return { success: true, user: newUser };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

function updateUser(id, updates) {
    try {
        const users = selectAllUsers();
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) return { success: false, error: 'User not found' };
        
        users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() };
        fs.writeFileSync(path.join(DATA_DIR, 'users.json'), JSON.stringify(users, null, 2));
        return { success: true, user: users[userIndex] };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

function deleteUserByEmail(email) {
    try {
        let users = selectAllUsers();
        users = users.filter(u => u.email !== email);
        fs.writeFileSync(path.join(DATA_DIR, 'users.json'), JSON.stringify(users, null, 2));
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

// ==================== CURRICULUM MANAGEMENT ====================

function getCurriculum() {
    try {
        const data = fs.readFileSync(path.join(DATA_DIR, 'curriculum.json'), 'utf8');
        return JSON.parse(data) || {};
    } catch (err) {
        return {};
    }
}

function saveCurriculum(curriculum) {
    try {
        fs.writeFileSync(path.join(DATA_DIR, 'curriculum.json'), JSON.stringify(curriculum, null, 2));
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

// ==================== QUESTIONS MANAGEMENT ====================

function getAllQuestions() {
    try {
        const data = fs.readFileSync(path.join(DATA_DIR, 'questions.json'), 'utf8');
        return JSON.parse(data) || [];
    } catch (err) {
        return [];
    }
}

function getQuestionsByTopic(grade, subject, topic) {
    const questions = getAllQuestions();
    return questions.filter(q => q.grade === grade && q.subject === subject && q.topic === topic);
}

function insertQuestion(question) {
    try {
        const questions = getAllQuestions();
        const newQuestion = {
            id: `q-${Date.now()}`,
            ...question
        };
        questions.push(newQuestion);
        fs.writeFileSync(path.join(DATA_DIR, 'questions.json'), JSON.stringify(questions, null, 2));
        return { success: true, question: newQuestion };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

function insertManyQuestions(questionArray) {
    try {
        const questions = getAllQuestions();
        const newQuestions = questionArray.map(q => ({
            id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ...q
        }));
        questions.push(...newQuestions);
        fs.writeFileSync(path.join(DATA_DIR, 'questions.json'), JSON.stringify(questions, null, 2));
        return { success: true, count: newQuestions.length };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

// ==================== USER PROGRESS ====================

function getUserProgress(userId) {
    try {
        const data = fs.readFileSync(path.join(DATA_DIR, 'user-progress.json'), 'utf8');
        const progress = JSON.parse(data) || {};
        return progress[userId] || { topicsCompleted: [], pointsBySubject: {}, totalPoints: 0 };
    } catch (err) {
        return { topicsCompleted: [], pointsBySubject: {}, totalPoints: 0 };
    }
}

function updateUserProgress(userId, progressData) {
    try {
        const data = fs.readFileSync(path.join(DATA_DIR, 'user-progress.json'), 'utf8');
        const progress = JSON.parse(data) || {};
        progress[userId] = progressData;
        fs.writeFileSync(path.join(DATA_DIR, 'user-progress.json'), JSON.stringify(progress, null, 2));
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

// ==================== ASSIGNMENTS ====================

function getAllAssignments() {
    try {
        const data = fs.readFileSync(path.join(DATA_DIR, 'assignments.json'), 'utf8');
        return JSON.parse(data) || [];
    } catch (err) {
        return [];
    }
}

function getAssignmentsByGrade(grade) {
    const assignments = getAllAssignments();
    return assignments.filter(a => a.grade === grade);
}

function insertAssignment(assignment) {
    try {
        const assignments = getAllAssignments();
        const newAssignment = {
            id: `a-${Date.now()}`,
            ...assignment,
            createdAt: new Date().toISOString()
        };
        assignments.push(newAssignment);
        fs.writeFileSync(path.join(DATA_DIR, 'assignments.json'), JSON.stringify(assignments, null, 2));
        return { success: true, assignment: newAssignment };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

// Initialize on module load
initializeFiles();

module.exports = {
    // Users
    selectAllUsers,
    selectUserByEmail,
    selectUserById,
    insertUser,
    updateUser,
    deleteUserByEmail,
    // Curriculum
    getCurriculum,
    saveCurriculum,
    // Questions
    getAllQuestions,
    getQuestionsByTopic,
    insertQuestion,
    insertManyQuestions,
    // Progress
    getUserProgress,
    updateUserProgress,
    // Assignments
    getAllAssignments,
    getAssignmentsByGrade,
    insertAssignment
};
