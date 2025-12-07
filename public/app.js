// ==================== STATE MANAGEMENT ====================

let currentUser = null;
let currentLevel = null;
let currentSubject = null;
let currentGrade = null;
let currentTopic = null;
let currentDifficulty = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let totalPointsInSession = 0;

// ==================== PAGE NAVIGATION ====================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

// ==================== AUTHENTICATION ====================

async function handleSignup(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const grade = document.getElementById('gradeLevel').value;

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password, grade })
        });

        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            alert('Account created successfully! Welcome to Curious Elephant Academy!');
            showDashboard();
        } else {
            alert('Signup failed: ' + data.error);
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Error during signup');
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            showDashboard();
        } else {
            alert('Login failed: ' + data.error);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Error during login');
    }
}

async function handleParentLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('parentEmail').value;
    const password = document.getElementById('parentPassword').value;
    const studentEmail = document.getElementById('childEmail').value;

    try {
        const response = await fetch('/api/auth/parent-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, studentEmail })
        });

        const data = await response.json();
        
        if (data.success) {
            alert('Parent dashboard access granted!');
            // Load student progress
            currentUser = data.linkedStudent;
            localStorage.setItem('currentUser', JSON.stringify(data.linkedStudent));
            showDashboard();
        } else {
            alert('Login failed: ' + data.error);
        }
    } catch (error) {
        console.error('Parent login error:', error);
        alert('Error during login');
    }
}

function handleGoogleSignup() {
    // Initialize Google Sign-In if not already done
    if (!window.google) {
        alert('Google Sign-In not configured. Please set GOOGLE_CLIENT_ID environment variable.');
        return;
    }

    // Trigger Google Sign-In
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with actual client ID
        callback: handleGoogleCallback
    });
    
    google.accounts.id.renderButton(
        document.querySelector('.google-button'),
        { theme: 'outline', size: 'large' }
    );
}

function handleGoogleLogin() {
    // Initialize Google Sign-In if not already done
    if (!window.google) {
        alert('Google Sign-In not configured. Please set GOOGLE_CLIENT_ID environment variable.');
        return;
    }

    // Trigger Google Sign-In
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with actual client ID
        callback: handleGoogleCallback
    });
    
    google.accounts.id.renderButton(
        document.querySelector('.google-button'),
        { theme: 'outline', size: 'large' }
    );
}

// Handle Google Sign-In response
async function handleGoogleCallback(response) {
    if (!response.credential) {
        console.error('No credential received from Google');
        return;
    }

    try {
        // Decode the JWT (you would normally do this server-side)
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        
        const decodedToken = JSON.parse(jsonPayload);

        // Send to server for verification and user creation
        const serverResponse = await fetch('/api/auth/google/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential, decodedToken })
        });

        const data = await serverResponse.json();

        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            alert(`Welcome ${data.user.firstName}!`);
            showDashboard();
        } else {
            alert('Google sign-in failed: ' + data.error);
        }
    } catch (error) {
        console.error('Google sign-in error:', error);
        alert('Error during Google sign-in');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showPage('landingPage');
}

// ==================== DASHBOARD ====================

function showDashboard() {
    loadDashboard();
    showPage('dashboardPage');
}

async function loadDashboard() {
    if (!currentUser) return;

    // Update user info
    document.getElementById('userName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById('userGrade').textContent = `Grade ${currentUser.grade}`;
    document.getElementById('userPoints').textContent = currentUser.points || 0;
    document.getElementById('dashboardAvatar').textContent = currentUser.avatar || '🐘';

    // Load profile info
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileGrade').textContent = currentUser.grade;
    document.getElementById('profilePoints').textContent = currentUser.points || 0;
    document.getElementById('profileJoined').textContent = new Date(currentUser.createdAt).toLocaleDateString();

    // Load games
    loadGameShop();
    
    // Load assignments
    loadAssignments();
}

// ==================== CURRICULUM NAVIGATION ====================

async function selectLevel(level) {
    currentLevel = level;
    
    try {
        const response = await fetch(`/api/curriculum/${level}`);
        const data = await response.json();
        
        if (data.success) {
            displaySubjects(data.subjects, data.grades);
        }
    } catch (error) {
        console.error('Error loading level:', error);
    }
}

function displaySubjects(subjects, grades) {
    document.querySelector('.level-selector').style.display = 'none';
    document.getElementById('subjectView').style.display = 'block';
    
    const subjectList = document.getElementById('subjectList');
    subjectList.innerHTML = '';
    
    const subjectMap = {
        'math': '🔢 Math',
        'reading': '📖 Reading',
        'writing': '✏️ Writing',
        'science': '🔬 Science',
        'socialstudies': '📜 Social Studies',
        'english': '📖 English',
        'electives': '🎨 Electives',
        'mathematics': '🔢 Mathematics'
    };
    
    subjects.forEach(subject => {
        const btn = document.createElement('button');
        btn.className = 'subject-btn';
        btn.textContent = subjectMap[subject] || subject;
        btn.onclick = () => selectSubject(subject, grades);
        subjectList.appendChild(btn);
    });
}

async function selectSubject(subject, grades) {
    currentSubject = subject;
    
    // Show grade/course selection
    document.getElementById('subjectView').style.display = 'none';
    document.getElementById('topicView').style.display = 'block';
    
    const topicList = document.getElementById('topicList');
    topicList.innerHTML = '';
    
    // For each grade, load topics
    const gradesArray = grades || ['K', '1st', '2nd', '3rd', '4th', '5th'];
    
    for (const grade of gradesArray) {
        try {
            const response = await fetch(`/api/curriculum/${currentLevel}/${subject}/${grade}`);
            const data = await response.json();
            
            if (data.success && data.topics.length > 0) {
                const gradeSection = document.createElement('div');
                gradeSection.className = 'grade-section';
                gradeSection.innerHTML = `<h4>${grade} Grade</h4>`;
                
                data.topics.forEach(topic => {
                    const btn = document.createElement('button');
                    btn.className = 'topic-btn';
                    btn.textContent = topic;
                    btn.onclick = () => selectTopic(grade, topic);
                    gradeSection.appendChild(btn);
                });
                
                topicList.appendChild(gradeSection);
            }
        } catch (error) {
            console.error(`Error loading topics for ${grade}:`, error);
        }
    }
}

function selectTopic(grade, topic) {
    currentGrade = grade;
    currentTopic = topic;
    
    document.getElementById('topicView').style.display = 'none';
    document.getElementById('difficultyView').style.display = 'block';
    
    document.getElementById('difficultyViewTitle').textContent = `${topic} - ${grade} Grade`;
}

async function startQuestions(difficulty) {
    currentDifficulty = difficulty;
    
    try {
        const response = await fetch(`/api/questions/${currentGrade}/${currentSubject}/${currentTopic}/${difficulty}`);
        const data = await response.json();
        
        if (data.success) {
            currentQuestions = data.questions;
            currentQuestionIndex = 0;
            totalPointsInSession = 0;
            
            document.getElementById('difficultyView').style.display = 'none';
            document.getElementById('quizView').style.display = 'block';
            document.getElementById('totalQuestions').textContent = currentQuestions.length;
            
            displayQuestion();
        } else {
            alert('No questions found for this topic');
        }
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        finishQuiz();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];
    const container = document.getElementById('questionContainer');
    
    document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;
    
    let html = `
        <div class="question">
            <p class="question-text">${question.question}</p>
            <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        html += `
            <button class="option-btn" onclick="selectAnswer(this, '${option}', '${question.correctAnswer}')">
                ${option}
            </button>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function selectAnswer(button, selected, correct) {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);
    
    if (selected === correct) {
        button.classList.add('correct');
        const points = currentQuestions[currentQuestionIndex].points;
        totalPointsInSession += points;
        console.log(`Correct! +${points} points`);
    } else {
        button.classList.add('incorrect');
        document.querySelector('.option-btn:contains("' + correct + '")') || 
        Array.from(allButtons).find(b => b.textContent.includes(correct))?.classList.add('correct');
    }
    
    document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= currentQuestions.length) {
        finishQuiz();
    } else {
        displayQuestion();
        document.getElementById('nextBtn').style.display = 'none';
    }
}

async function finishQuiz() {
    if (totalPointsInSession > 0 && currentUser) {
        try {
            await fetch('/api/points/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    topicKey: `${currentLevel}-${currentSubject}-${currentTopic}-${currentDifficulty}`,
                    points: totalPointsInSession
                })
            });
            
            currentUser.points = (currentUser.points || 0) + totalPointsInSession;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } catch (error) {
            console.error('Error saving points:', error);
        }
    }
    
    alert(`Quiz Complete! You earned ${totalPointsInSession} points!`);
    resetCurriculumView();
}

function resetCurriculumView() {
    document.getElementById('quizView').style.display = 'none';
    document.getElementById('difficultyView').style.display = 'none';
    document.getElementById('topicView').style.display = 'none';
    document.getElementById('subjectView').style.display = 'none';
    document.querySelector('.level-selector').style.display = 'flex';
    
    loadDashboard();
}

function goBackToLevels() {
    document.getElementById('subjectView').style.display = 'none';
    document.querySelector('.level-selector').style.display = 'flex';
}

function goBackToSubjects() {
    document.getElementById('topicView').style.display = 'none';
    document.getElementById('subjectView').style.display = 'block';
}

function goBackToTopics() {
    document.getElementById('difficultyView').style.display = 'none';
    document.getElementById('topicView').style.display = 'block';
}

// ==================== PROFILE ====================

function selectAvatar(avatar) {
    // Update locally
    currentUser.avatar = avatar;
    document.getElementById('dashboardAvatar').textContent = avatar;
    
    // Save to server
    if (currentUser) {
        fetch(`/api/profile/${currentUser.id}/avatar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatar })
        }).catch(err => console.error('Error updating avatar:', err));
    }
}

// ==================== GAME SHOP ====================

async function loadGameShop() {
    try {
        const response = await fetch('/api/game-shop');
        const data = await response.json();
        
        if (data.success) {
            displayGames(data.games);
        }
    } catch (error) {
        console.error('Error loading games:', error);
    }
}

function displayGames(games) {
    const gamesList = document.getElementById('gamesList');
    gamesList.innerHTML = '';
    
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <div class="game-icon">${getGameIcon(game.category)}</div>
            <h4>${game.name}</h4>
            <p>${game.description}</p>
            <div class="game-cost">${game.cost} points</div>
            <button onclick="purchaseGame('${game.id}', ${game.cost})" class="btn-primary">
                Play Now
            </button>
        `;
        gamesList.appendChild(card);
    });
}

function getGameIcon(category) {
    const icons = {
        'math': '🔢',
        'english': '📖',
        'science': '🔬',
        'puzzle': '🧩',
        'game': '🎮'
    };
    return icons[category] || '🎮';
}

function purchaseGame(gameId, cost) {
    if (!currentUser) return;
    
    if ((currentUser.points || 0) < cost) {
        alert(`Not enough points! You need ${cost} points but only have ${currentUser.points || 0}`);
        return;
    }

    fetch(`/api/game-shop/${gameId}/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Game purchased! Enjoy ${gameId}!`);
            currentUser.points -= cost;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            loadDashboard();
        }
    })
    .catch(err => console.error('Error purchasing game:', err));
}

// ==================== ASSIGNMENTS ====================

async function loadAssignments() {
    if (!currentUser) return;
    
    try {
        const response = await fetch(`/api/assignments/${currentUser.grade}`);
        const data = await response.json();
        
        if (data.success) {
            displayAssignments(data.assignments);
        }
    } catch (error) {
        console.error('Error loading assignments:', error);
    }
}

function displayAssignments(assignments) {
    const assignmentsList = document.getElementById('assignmentsList');
    assignmentsList.innerHTML = '';
    
    if (assignments.length === 0) {
        assignmentsList.innerHTML = '<p>No assignments yet</p>';
        return;
    }
    
    assignments.forEach(assignment => {
        const card = document.createElement('div');
        card.className = 'assignment-card';
        card.innerHTML = `
            <h4>${assignment.title}</h4>
            <p><strong>Subject:</strong> ${assignment.subject}</p>
            <p><strong>Topic:</strong> ${assignment.topic}</p>
            <p>${assignment.description || 'Complete this assignment'}</p>
            <p><small>Due: ${new Date(assignment.dueDate).toLocaleDateString()}</small></p>
            <button onclick="startAssignment('${assignment.id}')" class="btn-primary">
                Start Assignment
            </button>
        `;
        assignmentsList.appendChild(card);
    });
}

function startAssignment(assignmentId) {
    alert('Assignment submission system ready. Implement file upload and AI grading.');
    // TODO: Implement assignment submission interface
}

// ==================== ELLO AI FEEDBACK ====================

async function getElloFeedback(isCorrect, subject, errorType) {
    try {
        const response = await fetch('/api/ello/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isCorrect, subject, errorType })
        });

        const feedback = await response.json();
        return feedback;
    } catch (error) {
        console.error('Error getting Ello feedback:', error);
        return { message: 'Keep learning!' };
    }
}

async function submitEssay(content, topic) {
    if (!content || content.trim().length === 0) {
        alert('Please write something first!');
        return;
    }

    try {
        const response = await fetch('/api/ello/grade-essay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, topic })
        });

        const data = await response.json();
        
        if (data.success) {
            displayEssayGrading(data.grading);
        }
    } catch (error) {
        console.error('Error grading essay:', error);
    }
}

function displayEssayGrading(grading) {
    let feedbackHtml = `
        <div class="essay-feedback">
            <h3>🤖 Ello's Feedback</h3>
            <div class="feedback-score">Score: ${grading.score}/100</div>
            
            <h4>Feedback:</h4>
            <ul>
                ${grading.feedback.map(f => `<li>${f}</li>`).join('')}
            </ul>
            
            <h4>Strengths:</h4>
            <ul>
                ${grading.strengths.map(s => `<li>✅ ${s}</li>`).join('')}
            </ul>
            
            <h4>Areas to Improve:</h4>
            <ul>
                ${grading.improvements.map(i => `<li>💡 ${i}</li>`).join('')}
            </ul>
            
            <p class="next-steps">${grading.nextSteps}</p>
        </div>
    `;
    
    // Display in a modal or container
    alert('Essay has been graded! Check your feedback.');
}

async function getElloRecommendations(userId) {
    try {
        const response = await fetch('/api/ello/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                topicsMastered: [],
                recentAccuracy: currentUser.points ? (currentUser.points / 500 * 100) : 0
            })
        });

        const data = await response.json();
        return data.recommendations || [];
    } catch (error) {
        console.error('Error getting recommendations:', error);
        return [];
    }
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
});

