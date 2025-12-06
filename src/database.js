// Simple in-memory SQL database
class InMemoryDB {
    constructor() {
        this.tables = {
            users: [],
            userProgress: [],
            quizzes: [],
            scores: [],
            leaderboard: []
        };
        this.nextId = 1;
        this.progressId = 1;
        this.quizId = 1;
        this.scoreId = 1;
        
        // Add default user
        this.initializeDefaultUser();
    }

    // Initialize default users (demo accounts)
    initializeDefaultUser() {
        const demoAccounts = [
            {
                firstName: 'Shreyan',
                lastName: 'CH',
                email: 'shreyan@letslearn.com',
                password: 'shreyan123',
                grade: 'Kindergarten',
                dateOfBirth: '2020-06-06',
                points: 45
            },
            {
                firstName: 'Emma',
                lastName: 'Johnson',
                email: 'emma@letslearn.com',
                password: 'emma123',
                grade: '1st grade',
                dateOfBirth: '2019-03-15',
                points: 120
            },
            {
                firstName: 'Liam',
                lastName: 'Smith',
                email: 'liam@letslearn.com',
                password: 'liam123',
                grade: '2nd grade',
                dateOfBirth: '2018-07-22',
                points: 250
            },
            {
                firstName: 'Sophia',
                lastName: 'Williams',
                email: 'sophia@letslearn.com',
                password: 'sophia123',
                grade: '3rd grade',
                dateOfBirth: '2017-11-10',
                points: 185
            },
            {
                firstName: 'Noah',
                lastName: 'Brown',
                email: 'noah@letslearn.com',
                password: 'noah123',
                grade: '4th grade',
                dateOfBirth: '2016-05-20',
                points: 320
            },
            {
                firstName: 'Olivia',
                lastName: 'Davis',
                email: 'olivia@letslearn.com',
                password: 'olivia123',
                grade: '5th grade',
                dateOfBirth: '2015-09-08',
                points: 275
            }
        ];
        
        // Add all demo users
        demoAccounts.forEach(account => {
            const user = {
                id: this.nextId++,
                firstName: account.firstName,
                lastName: account.lastName,
                email: account.email,
                password: account.password,
                grade: account.grade,
                dateOfBirth: account.dateOfBirth,
                avatarStyle: {
                    color: ['#FF6B9D', '#00CED1', '#FFD700', '#32CD32', '#FF8C00', '#8A2BE2'][Math.floor(Math.random() * 6)],
                    emoji: ['🐘', '🦁', '🐰', '🦊', '🐼', '🐸', '🦋', '🐙'][Math.floor(Math.random() * 8)],
                    background: ['#FFE8F0', '#E0F6FF', '#FFFACD', '#E8F8E8', '#FFE4CC', '#F0E8FF'][Math.floor(Math.random() * 6)]
                },
                createdAt: new Date().toISOString()
            };
            this.tables.users.push(user);
            
            // Initialize progress for each user
            const progress = {
                id: this.progressId++,
                userId: user.id,
                points: account.points,
                totalGamesPlayed: Math.floor(Math.random() * 20) + 5,
                readingQuizzes: Math.floor(Math.random() * 10) + 2,
                mathQuizzes: Math.floor(Math.random() * 10) + 2,
                writingQuizzes: Math.floor(Math.random() * 8) + 1,
                minigamesUnlocked: Math.floor(Math.random() * 6) + 3,
                minigamesPlayed: Math.floor(Math.random() * 15) + 5,
                createdAt: new Date().toISOString()
            };
            this.tables.userProgress.push(progress);
            
            // Add to leaderboard
            const leaderboardEntry = {
                id: this.scoreId++,
                userId: user.id,
                userName: `${user.firstName} ${user.lastName}`,
                points: account.points,
                totalGamesPlayed: progress.totalGamesPlayed,
                lastUpdated: new Date().toISOString()
            };
            this.tables.leaderboard.push(leaderboardEntry);
        });
    }

    // INSERT: Add a new user
    insert(tableName, data) {
        if (!this.tables[tableName]) {
            this.tables[tableName] = [];
        }
        
        const record = {
            id: this.nextId++,
            ...data,
            createdAt: new Date().toISOString()
        };
        
        this.tables[tableName].push(record);
        return record;
    }

    // SELECT: Get all records from a table
    select(tableName) {
        return this.tables[tableName] || [];
    }

    // SELECT WHERE: Get records matching a condition
    selectWhere(tableName, condition) {
        const table = this.tables[tableName] || [];
        return table.filter(record => condition(record));
    }

    // UPDATE: Update a record by ID
    update(tableName, id, updates) {
        const table = this.tables[tableName] || [];
        const index = table.findIndex(r => r.id === id);
        
        if (index !== -1) {
            table[index] = { ...table[index], ...updates };
            return table[index];
        }
        
        return null;
    }

    // DELETE: Delete a record by ID
    delete(tableName, id) {
        const table = this.tables[tableName] || [];
        const index = table.findIndex(r => r.id === id);
        
        if (index !== -1) {
            table.splice(index, 1);
            return true;
        }
        
        return false;
    }

    // DELETE ALL: Clear a table
    deleteAll(tableName) {
        if (this.tables[tableName]) {
            this.tables[tableName] = [];
            this.nextId = 1;
            return true;
        }
        return false;
    }

    // INSERT USER: Add a new user with validation
    insertUser(userData) {
        // Check if user already exists
        const existing = this.tables.users.find(u => u.email === userData.email);
        if (existing) {
            return { success: false, error: 'Email already registered' };
        }

        // Generate random avatar
        const avatarColors = ['#FF6B9D', '#00CED1', '#FFD700', '#32CD32', '#FF8C00', '#8A2BE2'];
        const avatarEmojis = ['🐘', '🦁', '🐰', '🦊', '🐼', '🐸', '🦋', '🐙'];
        const backgroundColors = ['#FFE8F0', '#E0F6FF', '#FFFACD', '#E8F8E8', '#FFE4CC', '#F0E8FF'];

        const user = {
            id: this.nextId++,
            ...userData,
            avatarStyle: {
                color: avatarColors[Math.floor(Math.random() * avatarColors.length)],
                emoji: avatarEmojis[Math.floor(Math.random() * avatarEmojis.length)],
                background: backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
            },
            createdAt: new Date().toISOString(),
            signupMethod: userData.signupMethod || 'email',
            googleId: userData.googleId || null,
            profilePicture: userData.profilePicture || null
        };

        this.tables.users.push(user);
        this.initializeUserProgress(user.id);
        
        return { success: true, user };
    }

    // Initialize user progress for Kindergarten
    initializeUserProgress(userId) {
        const progress = {
            id: this.progressId++,
            userId,
            points: 0,
            readingQuizzes: 0,
            mathQuizzes: 0,
            writingQuizzes: 0,
            musicAssignments: 0,
            artAssignments: 0,
            peAssignments: 0,
            minigamesUnlocked: 0,
            minigamesPlayed: 0,
            createdAt: new Date().toISOString()
        };
        this.tables.userProgress.push(progress);
        return progress;
    }

    // Get user progress
    getUserProgress(userId) {
        const progress = this.tables.userProgress.find(p => p.userId === userId);
        return progress || null;
    }

    // Update user points
    updateUserPoints(userId, points) {
        const progress = this.getUserProgress(userId);
        if (progress) {
            progress.points += points;
            return progress;
        }
        return null;
    }

    // Check if minigame is unlocked (30 points)
    isMinigameUnlocked(userId) {
        const progress = this.getUserProgress(userId);
        return progress && progress.points >= 30;
    }

    // Update leaderboard
    updateLeaderboard(userId, userName, points) {
        let leaderboardEntry = this.tables.leaderboard.find(l => l.userId === userId);
        
        if (!leaderboardEntry) {
            leaderboardEntry = {
                id: this.scoreId++,
                userId,
                userName,
                points,
                totalGamesPlayed: 1,
                lastUpdated: new Date().toISOString()
            };
            this.tables.leaderboard.push(leaderboardEntry);
        } else {
            leaderboardEntry.points = points;
            leaderboardEntry.totalGamesPlayed++;
            leaderboardEntry.lastUpdated = new Date().toISOString();
        }
        
        return leaderboardEntry;
    }

    // Get leaderboard sorted by points
    getLeaderboard(limit = 50) {
        return this.tables.leaderboard
            .sort((a, b) => b.points - a.points)
            .slice(0, limit);
    }
}

module.exports = InMemoryDB;
