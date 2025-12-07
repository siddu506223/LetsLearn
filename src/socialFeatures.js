// Social Features - Friends & Leaderboard System

class SocialFeatures {
    constructor(database) {
        this.db = database;
        this.friendRequests = [];
        this.friendships = [];
        this.leaderboardCache = new Map();
    }

    // Friend Management
    sendFriendRequest(fromUserId, toEmail) {
        const toUser = this.db.selectUserByEmail(toEmail);
        if (!toUser) {
            return { success: false, error: 'User not found' };
        }

        if (toUser.id === fromUserId) {
            return { success: false, error: 'Cannot add yourself' };
        }

        // Check if already friends
        if (this.areFriends(fromUserId, toUser.id)) {
            return { success: false, error: 'Already friends' };
        }

        // Check if request already exists
        if (this.requestExists(fromUserId, toUser.id)) {
            return { success: false, error: 'Request already sent' };
        }

        const request = {
            id: Math.random().toString(36).substring(7),
            fromId: fromUserId,
            toId: toUser.id,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        this.friendRequests.push(request);
        return { success: true, request };
    }

    acceptFriendRequest(requestId, userId) {
        const request = this.friendRequests.find(r => r.id === requestId);
        
        if (!request) {
            return { success: false, error: 'Request not found' };
        }

        if (request.toId !== userId) {
            return { success: false, error: 'Unauthorized' };
        }

        // Create friendship
        const friendship = {
            id: Math.random().toString(36).substring(7),
            user1Id: request.fromId,
            user2Id: request.toId,
            createdAt: new Date().toISOString()
        };

        this.friendships.push(friendship);
        request.status = 'accepted';
        
        return { success: true, friendship };
    }

    rejectFriendRequest(requestId, userId) {
        const request = this.friendRequests.find(r => r.id === requestId);
        
        if (!request) {
            return { success: false, error: 'Request not found' };
        }

        if (request.toId !== userId) {
            return { success: false, error: 'Unauthorized' };
        }

        request.status = 'rejected';
        return { success: true };
    }

    getFriendRequests(userId) {
        return this.friendRequests.filter(r => 
            r.toId === userId && r.status === 'pending'
        );
    }

    getFriends(userId) {
        return this.friendships.filter(f => 
            f.user1Id === userId || f.user2Id === userId
        ).map(f => {
            const friendId = f.user1Id === userId ? f.user2Id : f.user1Id;
            const friend = this.db.selectUserById(friendId);
            return {
                id: friend.id,
                firstName: friend.firstName,
                lastName: friend.lastName,
                email: friend.email,
                avatarStyle: friend.avatarStyle,
                grade: friend.grade
            };
        });
    }

    areFriends(userId1, userId2) {
        return this.friendships.some(f =>
            (f.user1Id === userId1 && f.user2Id === userId2) ||
            (f.user1Id === userId2 && f.user2Id === userId1)
        );
    }

    requestExists(userId1, userId2) {
        return this.friendRequests.some(r =>
            r.fromId === userId1 && r.toId === userId2 && r.status === 'pending'
        );
    }

    removeFriend(userId, friendId) {
        const index = this.friendships.findIndex(f =>
            (f.user1Id === userId && f.user2Id === friendId) ||
            (f.user1Id === friendId && f.user2Id === userId)
        );

        if (index > -1) {
            this.friendships.splice(index, 1);
            return { success: true };
        }

        return { success: false, error: 'Friendship not found' };
    }

    // Leaderboard System
    generateLeaderboard(grade, subject = null) {
        const cacheKey = `${grade}_${subject || 'all'}`;
        
        if (this.leaderboardCache.has(cacheKey)) {
            const cached = this.leaderboardCache.get(cacheKey);
            if (new Date() - cached.timestamp < 300000) { // 5 min cache
                return cached.data;
            }
        }

        const leaderboard = this.buildLeaderboard(grade, subject);
        
        // Cache for 5 minutes
        this.leaderboardCache.set(cacheKey, {
            data: leaderboard,
            timestamp: new Date()
        });

        return leaderboard;
    }

    buildLeaderboard(grade, subject) {
        // Get all users in grade
        const users = this.db.getAllUsers().filter(u => u.grade === grade);

        // Calculate scores
        const scores = users.map(u => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            avatarStyle: u.avatarStyle,
            points: u.points || 0,
            quizzesCompleted: u.quizzesCompleted || 0,
            accuracy: this.calculateAccuracy(u.id),
            streakDays: this.calculateStreak(u.id)
        }));

        // Sort by points (primary), then accuracy (secondary)
        return scores.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return b.accuracy - a.accuracy;
        }).map((score, index) => ({
            ...score,
            rank: index + 1,
            medal: this.getMedal(index)
        }));
    }

    calculateAccuracy(userId) {
        // Get user's quiz history and calculate accuracy
        // This would come from database in production
        return Math.floor(Math.random() * 30) + 70; // 70-100% for demo
    }

    calculateStreak(userId) {
        // Calculate how many consecutive days user has been active
        return Math.floor(Math.random() * 30) + 1; // 1-30 days for demo
    }

    getMedal(rank) {
        if (rank === 0) return '🥇';
        if (rank === 1) return '🥈';
        if (rank === 2) return '🥉';
        return '⭐';
    }

    getGlobalLeaderboard(limit = 50) {
        const users = this.db.getAllUsers();
        
        const scores = users.map(u => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            grade: u.grade,
            avatarStyle: u.avatarStyle,
            points: u.points || 0,
            quizzesCompleted: u.quizzesCompleted || 0
        }));

        return scores.sort((a, b) => b.points - a.points)
            .slice(0, limit)
            .map((score, index) => ({
                ...score,
                rank: index + 1,
                medal: this.getMedal(index)
            }));
    }

    getFriendLeaderboard(userId, limit = 50) {
        const friends = this.getFriends(userId);
        const friendIds = friends.map(f => f.id);
        friendIds.push(userId); // Include self

        const friendUsers = friendIds.map(id => this.db.selectUserById(id));

        const scores = friendUsers.map(u => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            avatarStyle: u.avatarStyle,
            points: u.points || 0,
            accuracy: this.calculateAccuracy(u.id)
        }));

        return scores.sort((a, b) => b.points - a.points)
            .slice(0, limit)
            .map((score, index) => ({
                ...score,
                rank: index + 1,
                medal: this.getMedal(index)
            }));
    }

    getAllUsers() {
        return this.db.getAllUsers() || [];
    }
}

module.exports = SocialFeatures;
