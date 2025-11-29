// Persistent File-Based Database
// Stores user data in JSON files

const fs = require('fs');
const path = require('path');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const usersFile = path.join(dataDir, 'users.json');
const progressFile = path.join(dataDir, 'progress.json');
const parentsFile = path.join(dataDir, 'parents.json');

// Initialize files if they don't exist
function initializeFiles() {
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(progressFile)) {
        fs.writeFileSync(progressFile, JSON.stringify({}, null, 2));
    }
    if (!fs.existsSync(parentsFile)) {
        fs.writeFileSync(parentsFile, JSON.stringify({}, null, 2));
    }
}

// Read JSON file safely
function readJSON(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        return null;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}

// Write JSON file safely
function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing JSON file:', error);
        return false;
    }
}

const db = {
    // ========== USER OPERATIONS ==========
    
    insertUser: function(user) {
        try {
            const users = readJSON(usersFile) || [];
            
            // Check if email already exists
            if (users.some(u => u.email === user.email)) {
                return { success: false, error: 'Email already registered' };
            }
            
            const newUser = {
                id: Date.now(),
                firstName: user.firstName,
                lastName: user.lastName,
                middleName: user.middleName || '',
                email: user.email,
                password: user.password,
                grade: user.grade || 'K',
                role: user.role || 'student',
                parentEmail: user.parentEmail || null,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                totalPoints: 0,
                badges: [],
                streakDays: 0,
                lastActivityDate: new Date().toISOString()
            };
            
            users.push(newUser);
            writeJSON(usersFile, users);
            
            // Initialize progress record for this user
            const progress = readJSON(progressFile) || {};
            progress[newUser.id] = {
                userId: newUser.id,
                subjectProgress: {},
                totalQuizzesCompleted: 0,
                totalPointsEarned: 0,
                createdAt: new Date().toISOString()
            };
            writeJSON(progressFile, progress);
            
            return { success: true, user: newUser };
        } catch (error) {
            console.error('Error inserting user:', error);
            return { success: false, error: error.message };
        }
    },

    selectAllUsers: function() {
        try {
            return readJSON(usersFile) || [];
        } catch (error) {
            console.error('Error selecting users:', error);
            return [];
        }
    },

    selectUserById: function(id) {
        try {
            const users = readJSON(usersFile) || [];
            return users.find(u => u.id === parseInt(id)) || null;
        } catch (error) {
            console.error('Error selecting user by ID:', error);
            return null;
        }
    },

    selectUserByEmail: function(email) {
        try {
            const users = readJSON(usersFile) || [];
            return users.find(u => u.email === email) || null;
        } catch (error) {
            console.error('Error selecting user by email:', error);
            return null;
        }
    },

    updateUser: function(id, updates) {
        try {
            const users = readJSON(usersFile) || [];
            const index = users.findIndex(u => u.id === parseInt(id));
            
            if (index === -1) {
                return { success: false, error: 'User not found' };
            }
            
            users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
            writeJSON(usersFile, users);
            
            return { success: true, user: users[index] };
        } catch (error) {
            console.error('Error updating user:', error);
            return { success: false, error: error.message };
        }
    },

    deleteUser: function(id) {
        try {
            const users = readJSON(usersFile) || [];
            const filtered = users.filter(u => u.id !== parseInt(id));
            writeJSON(usersFile, filtered);
            return { success: true };
        } catch (error) {
            console.error('Error deleting user:', error);
            return { success: false, error: error.message };
        }
    },

    // ========== PROGRESS OPERATIONS ==========

    updateProgress: function(userId, subject, difficulty, pointsEarned, correctAnswers, totalQuestions) {
        try {
            const progress = readJSON(progressFile) || {};
            
            if (!progress[userId]) {
                progress[userId] = {
                    userId: userId,
                    subjectProgress: {},
                    totalQuizzesCompleted: 0,
                    totalPointsEarned: 0
                };
            }
            
            if (!progress[userId].subjectProgress[subject]) {
                progress[userId].subjectProgress[subject] = {
                    easy: { completed: 0, totalPoints: 0, averageScore: 0 },
                    medium: { completed: 0, totalPoints: 0, averageScore: 0 },
                    hard: { completed: 0, totalPoints: 0, averageScore: 0 }
                };
            }
            
            const difficultyData = progress[userId].subjectProgress[subject][difficulty];
            const accuracy = (correctAnswers / totalQuestions) * 100;
            
            difficultyData.completed += 1;
            difficultyData.totalPoints += pointsEarned;
            difficultyData.averageScore = (difficultyData.averageScore + accuracy) / 2;
            
            progress[userId].totalQuizzesCompleted += 1;
            progress[userId].totalPointsEarned += pointsEarned;
            progress[userId].lastUpdated = new Date().toISOString();
            
            writeJSON(progressFile, progress);
            
            return { success: true, progress: progress[userId] };
        } catch (error) {
            console.error('Error updating progress:', error);
            return { success: false, error: error.message };
        }
    },

    getProgress: function(userId) {
        try {
            const progress = readJSON(progressFile) || {};
            return progress[userId] || null;
        } catch (error) {
            console.error('Error getting progress:', error);
            return null;
        }
    },

    // ========== PARENT OPERATIONS ==========

    addParent: function(parentData) {
        try {
            const parents = readJSON(parentsFile) || {};
            
            const newParent = {
                id: Date.now(),
                email: parentData.email,
                password: parentData.password,
                firstName: parentData.firstName,
                lastName: parentData.lastName,
                childrenIds: parentData.childrenIds || [],
                createdAt: new Date().toISOString(),
                preferences: {
                    weeklyReports: true,
                    alerts: true,
                    emailNotifications: true
                }
            };
            
            parents[newParent.id] = newParent;
            writeJSON(parentsFile, parents);
            
            return { success: true, parent: newParent };
        } catch (error) {
            console.error('Error adding parent:', error);
            return { success: false, error: error.message };
        }
    },

    getParentByEmail: function(email) {
        try {
            const parents = readJSON(parentsFile) || {};
            return Object.values(parents).find(p => p.email === email) || null;
        } catch (error) {
            console.error('Error getting parent:', error);
            return null;
        }
    },

    updateParentChildren: function(parentId, childrenIds) {
        try {
            const parents = readJSON(parentsFile) || {};
            if (parents[parentId]) {
                parents[parentId].childrenIds = childrenIds;
                writeJSON(parentsFile, parents);
                return { success: true };
            }
            return { success: false, error: 'Parent not found' };
        } catch (error) {
            console.error('Error updating parent children:', error);
            return { success: false, error: error.message };
        }
    },

    // ========== UTILITY OPERATIONS ==========

    clear: function() {
        try {
            writeJSON(usersFile, []);
            writeJSON(progressFile, {});
            writeJSON(parentsFile, {});
            return { success: true };
        } catch (error) {
            console.error('Error clearing database:', error);
            return { success: false, error: error.message };
        }
    },

    getStats: function() {
        try {
            const users = readJSON(usersFile) || [];
            const progress = readJSON(progressFile) || {};
            const parents = readJSON(parentsFile) || {};
            
            return {
                totalUsers: users.length,
                totalStudents: users.filter(u => u.role === 'student').length,
                totalParents: users.filter(u => u.role === 'parent').length,
                totalProgress: Object.keys(progress).length,
                registeredParents: Object.keys(parents).length
            };
        } catch (error) {
            console.error('Error getting stats:', error);
            return {};
        }
    }
};

// Initialize files on module load
initializeFiles();

module.exports = db;
