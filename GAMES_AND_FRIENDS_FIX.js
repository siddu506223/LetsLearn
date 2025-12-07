// GAMES, PUZZLES, AND FRIEND FEATURE FIXES

// ==================== ENHANCED GAMES & PUZZLES ====================

/**
 * GET /api/games/available/:gradeLevel
 * Get available games for specific grade level
 */
app.get('/api/games/available/:gradeLevel', (req, res) => {
    const { gradeLevel } = req.params;

    const games = {
        elementary: [
            {
                id: 'math-match-001',
                name: 'Math Memory Match',
                subject: 'math',
                description: 'Match numbers to their addition/subtraction answers',
                difficulty: 'easy',
                icon: '🧩',
                duration: '5-10 minutes'
            },
            {
                id: 'word-builder-001',
                name: 'Word Builder',
                subject: 'reading',
                description: 'Arrange letters to form words',
                difficulty: 'easy',
                icon: '🔤',
                duration: '5-10 minutes'
            },
            {
                id: 'spelling-bee-001',
                name: 'Spelling Bee',
                subject: 'writing',
                description: 'Listen and spell words correctly',
                difficulty: 'medium',
                icon: '✏️',
                duration: '10-15 minutes'
            },
            {
                id: 'shape-sorter-001',
                name: 'Shape Sorter',
                subject: 'math',
                description: 'Identify and sort geometric shapes',
                difficulty: 'easy',
                icon: '⬟',
                duration: '5-10 minutes'
            },
            {
                id: 'logic-puzzle-001',
                name: 'Pattern Puzzles',
                subject: 'math',
                description: 'Find and complete patterns',
                difficulty: 'medium',
                icon: '🧠',
                duration: '10-15 minutes'
            }
        ],
        middle: [
            {
                id: 'equation-quest-001',
                name: 'Equation Quest',
                subject: 'math',
                description: 'Solve algebraic equations for treasure',
                difficulty: 'medium',
                icon: '📐',
                duration: '15-20 minutes'
            },
            {
                id: 'vocabulary-battle-001',
                name: 'Vocabulary Battle',
                subject: 'reading',
                description: 'Match words to definitions in timed challenges',
                difficulty: 'medium',
                icon: '⚔️',
                duration: '10-15 minutes'
            },
            {
                id: 'code-breaker-001',
                name: 'Code Breaker',
                subject: 'logic',
                description: 'Decrypt coded messages',
                difficulty: 'hard',
                icon: '🔐',
                duration: '15-20 minutes'
            },
            {
                id: 'periodic-table-001',
                name: 'Element Explorer',
                subject: 'science',
                description: 'Learn periodic table elements through interactive game',
                difficulty: 'medium',
                icon: '⚛️',
                duration: '15-20 minutes'
            },
            {
                id: 'geography-quest-001',
                name: 'Geography Quest',
                subject: 'social studies',
                description: 'Identify countries, capitals, and landmarks',
                difficulty: 'medium',
                icon: '🗺️',
                duration: '15-20 minutes'
            }
        ],
        high: [
            {
                id: 'calculus-challenge-001',
                name: 'Calculus Challenge',
                subject: 'math',
                description: 'Advanced calculus problem solving',
                difficulty: 'hard',
                icon: '∫',
                duration: '20-30 minutes'
            },
            {
                id: 'debate-simulator-001',
                name: 'Debate Simulator',
                subject: 'english',
                description: 'Practice debate arguments and rebuttals',
                difficulty: 'hard',
                icon: '🎤',
                duration: '20-30 minutes'
            },
            {
                id: 'physics-lab-001',
                name: 'Virtual Physics Lab',
                subject: 'science',
                description: 'Conduct virtual physics experiments',
                difficulty: 'hard',
                icon: '🔬',
                duration: '25-35 minutes'
            },
            {
                id: 'history-timeline-001',
                name: 'History Timeline',
                subject: 'history',
                description: 'Arrange historical events chronologically',
                difficulty: 'medium',
                icon: '📅',
                duration: '15-20 minutes'
            },
            {
                id: 'literature-analysis-001',
                name: 'Literary Analysis',
                subject: 'english',
                description: 'Analyze literary devices and themes',
                difficulty: 'hard',
                icon: '📖',
                duration: '20-30 minutes'
            }
        ]
    };

    res.json({
        success: true,
        games: games[gradeLevel] || games.middle,
        totalGames: (games[gradeLevel] || games.middle).length
    });
});

/**
 * POST /api/games/play/:gameId
 * Start playing a game and track progress
 */
app.post('/api/games/play/:gameId', (req, res) => {
    const { gameId } = req.params;
    const userId = req.headers['user-id'];

    // Create game session
    const gameSession = {
        id: Date.now().toString(),
        gameId,
        userId,
        startTime: new Date().toISOString(),
        score: 0,
        level: 1,
        completed: false,
        timeSpent: 0
    };

    db.saveGameSession(gameSession);

    res.json({
        success: true,
        gameSessionId: gameSession.id,
        message: 'Game started'
    });
});

/**
 * POST /api/games/score
 * Record game score and progress
 */
app.post('/api/games/score', (req, res) => {
    const { gameSessionId, points, level, completed } = req.body;
    const userId = req.headers['user-id'];

    const session = db.getGameSession(gameSessionId);
    if (!session) {
        return res.status(404).json({
            success: false,
            error: 'Game session not found'
        });
    }

    session.score = (session.score || 0) + points;
    session.level = level || session.level;
    session.completed = completed || false;

    if (completed) {
        session.endTime = new Date().toISOString();
        session.timeSpent = Math.round(
            (new Date(session.endTime) - new Date(session.startTime)) / 1000
        );
    }

    db.updateGameSession(gameSessionId, session);

    res.json({
        success: true,
        currentScore: session.score,
        level: session.level,
        message: completed ? 'Game completed!' : 'Score recorded'
    });
});

// ==================== FRIEND FEATURE - MUTUAL ACCEPTANCE ====================

/**
 * POST /api/friends/request
 * Send friend request to another user
 * Requires both sides to accept
 */
app.post('/api/friends/request', (req, res) => {
    const { targetUsername } = req.body;
    const senderId = req.headers['user-id'];

    if (!targetUsername) {
        return res.status(400).json({
            success: false,
            error: 'Target username required'
        });
    }

    // Find user by username
    const targetUser = db.selectUserByUsername(targetUsername);
    if (!targetUser) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }

    const sendingUser = db.selectUserById(senderId);
    if (!sendingUser) {
        return res.status(404).json({
            success: false,
            error: 'Sender not found'
        });
    }

    // Check if already friends
    if (sendingUser.friends?.includes(targetUser.id)) {
        return res.status(400).json({
            success: false,
            error: 'Already friends with this user'
        });
    }

    // Check if request already exists
    const existingRequest = db.getFriendRequest(senderId, targetUser.id);
    if (existingRequest) {
        return res.status(400).json({
            success: false,
            error: 'Friend request already sent'
        });
    }

    // Create friend request (status: 'pending')
    const friendRequest = {
        id: Date.now().toString(),
        senderId,
        senderName: sendingUser.firstName + ' ' + sendingUser.lastName,
        targetId: targetUser.id,
        targetName: targetUser.firstName + ' ' + targetUser.lastName,
        status: 'pending', // 'pending', 'accepted', 'rejected'
        createdAt: new Date().toISOString(),
        respondedAt: null
    };

    db.saveFriendRequest(friendRequest);

    res.json({
        success: true,
        friendRequestId: friendRequest.id,
        message: `Friend request sent to ${targetUser.firstName} ${targetUser.lastName}`,
        status: 'pending'
    });
});

/**
 * GET /api/friends/requests/pending
 * Get all pending friend requests for current user
 */
app.get('/api/friends/requests/pending', (req, res) => {
    const userId = req.headers['user-id'];

    const pendingRequests = db.getPendingFriendRequests(userId);

    res.json({
        success: true,
        pendingRequests: pendingRequests.map(req => ({
            id: req.id,
            senderId: req.senderId,
            senderName: req.senderName,
            createdAt: req.createdAt
        })),
        count: pendingRequests.length
    });
});

/**
 * POST /api/friends/request/accept
 * Accept a friend request
 * Both users must have accepted for friendship
 */
app.post('/api/friends/request/accept', (req, res) => {
    const { friendRequestId } = req.body;
    const userId = req.headers['user-id'];

    const friendRequest = db.getFriendRequestById(friendRequestId);
    if (!friendRequest) {
        return res.status(404).json({
            success: false,
            error: 'Friend request not found'
        });
    }

    if (friendRequest.targetId !== userId) {
        return res.status(403).json({
            success: false,
            error: 'Not authorized to accept this request'
        });
    }

    if (friendRequest.status !== 'pending') {
        return res.status(400).json({
            success: false,
            error: 'Request has already been ' + friendRequest.status
        });
    }

    // Update friend request status
    friendRequest.status = 'accepted';
    friendRequest.respondedAt = new Date().toISOString();
    db.updateFriendRequest(friendRequestId, friendRequest);

    // Add to both users' friends lists
    const sender = db.selectUserById(friendRequest.senderId);
    const receiver = db.selectUserById(userId);

    if (!sender.friends) sender.friends = [];
    if (!receiver.friends) receiver.friends = [];

    sender.friends.push(userId);
    receiver.friends.push(friendRequest.senderId);

    db.updateUser(friendRequest.senderId, sender);
    db.updateUser(userId, receiver);

    res.json({
        success: true,
        message: `You are now friends with ${friendRequest.senderName}!`,
        status: 'accepted'
    });
});

/**
 * POST /api/friends/request/reject
 * Reject a friend request
 */
app.post('/api/friends/request/reject', (req, res) => {
    const { friendRequestId } = req.body;
    const userId = req.headers['user-id'];

    const friendRequest = db.getFriendRequestById(friendRequestId);
    if (!friendRequest) {
        return res.status(404).json({
            success: false,
            error: 'Friend request not found'
        });
    }

    if (friendRequest.targetId !== userId) {
        return res.status(403).json({
            success: false,
            error: 'Not authorized to reject this request'
        });
    }

    // Update status to rejected
    friendRequest.status = 'rejected';
    friendRequest.respondedAt = new Date().toISOString();
    db.updateFriendRequest(friendRequestId, friendRequest);

    res.json({
        success: true,
        message: 'Friend request rejected',
        status: 'rejected'
    });
});

/**
 * GET /api/friends/list
 * Get all friends for current user
 */
app.get('/api/friends/list', (req, res) => {
    const userId = req.headers['user-id'];

    const user = db.selectUserById(userId);
    const friends = [];

    (user.friends || []).forEach(friendId => {
        const friend = db.selectUserById(friendId);
        if (friend) {
            friends.push({
                id: friend.id,
                name: friend.firstName + ' ' + friend.lastName,
                username: friend.username,
                avatar: friend.avatar || '👤'
            });
        }
    });

    res.json({
        success: true,
        friends,
        count: friends.length
    });
});

module.exports = { };
