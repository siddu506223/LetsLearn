// Global State
let currentUser = null;
let currentParent = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let quizQuestions = [];
let userAnswer = null;
let minigameCards = [];
let minigameFlipped = [];
let minigameMatched = [];
let userType = 'student'; // 'student' or 'parent'

// Adaptive Difficulty System
let currentDifficulty = 'easy'; // easy, medium, hard
let consecutiveCorrect = 0;
let consecutiveIncorrect = 0;

// ==================== ERROR HANDLING ====================

// Silent error logging - only show alerts for network errors
function handleError(errorMessage, context = 'Operation') {
    console.error(`${context}: ${errorMessage}`);
    
    // Only show alert if it's a network error
    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError') || !navigator.onLine) {
        alert('⚠️ No internet connection. Please check your network and try again.');
    }
    // For all other errors, just log them silently
}

// ==================== TITLE & LOGIN SCREEN ====================

function goToLoginScreen(type = 'student') {
    userType = type;
    document.getElementById('titleView').classList.remove('view-active');
    document.getElementById('titleView').classList.add('view-hidden');
    document.getElementById('loginView').classList.remove('view-hidden');
    document.getElementById('loginView').classList.add('view-active');
    
    // Show appropriate tabs
    if (type === 'student') {
        document.getElementById('studentTabs').style.display = 'flex';
        document.getElementById('parentTabs').style.display = 'none';
        document.getElementById('loginTitle').textContent = 'Welcome to Curious Elephant Academy';
        switchAuthTab('login');
    } else {
        document.getElementById('studentTabs').style.display = 'none';
        document.getElementById('parentTabs').style.display = 'flex';
        document.getElementById('loginTitle').textContent = 'Parent Dashboard';
        switchAuthTab('parent-login');
    }
}

function backToTitle() {
    document.getElementById('loginView').classList.remove('view-active');
    document.getElementById('loginView').classList.add('view-hidden');
    document.getElementById('titleView').classList.remove('view-hidden');
    document.getElementById('titleView').classList.add('view-active');
}

function switchAuthTab(tab) {
    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('active-form');
        document.getElementById('signupForm').classList.remove('active-form');
        document.getElementById('loginTab').classList.add('active');
        document.getElementById('signupTab').classList.remove('active');
    } else if (tab === 'signup') {
        document.getElementById('signupForm').classList.add('active-form');
        document.getElementById('loginForm').classList.remove('active-form');
        document.getElementById('signupTab').classList.add('active');
        document.getElementById('loginTab').classList.remove('active');
    } else if (tab === 'parent-login') {
        document.getElementById('parentLoginForm').classList.add('active-form');
        document.getElementById('parentSignupForm').classList.remove('active-form');
        document.getElementById('parentLoginTab').classList.add('active');
        document.getElementById('parentSignupTab').classList.remove('active');
    } else if (tab === 'parent-signup') {
        document.getElementById('parentSignupForm').classList.add('active-form');
        document.getElementById('parentLoginForm').classList.remove('active-form');
        document.getElementById('parentSignupTab').classList.add('active');
        document.getElementById('parentLoginTab').classList.remove('active');
    }
}

async function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            goToUserDashboard();
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
    }
}

async function handleSignup() {
    const firstName = document.getElementById('signupFirstName').value.trim();
    const middleName = document.getElementById('signupMiddleName').value.trim();
    const lastName = document.getElementById('signupLastName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();
    const grade = document.getElementById('signupGrade').value;
    
    if (!firstName || !lastName || !email || !password || !grade) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, middleName, lastName, email, password, confirmPassword, grade })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            showFeedback('Account created successfully!', 'perfect');
            setTimeout(() => {
                goToUserDashboard();
            }, 1000);
        } else {
            alert(data.error || 'Signup failed');
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed');
    }
}

// ==================== PARENT AUTHENTICATION ====================

async function handleParentLogin() {
    const email = document.getElementById('parentLoginEmail').value.trim();
    const password = document.getElementById('parentLoginPassword').value.trim();
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentParent = data.user;
            loadParentDashboard(currentParent.email);
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Parent login error:', error);
        alert('Login failed');
    }
}

async function handleParentSignup() {
    const firstName = document.getElementById('parentFirstName').value.trim();
    const lastName = document.getElementById('parentLastName').value.trim();
    const email = document.getElementById('parentSignupEmail').value.trim();
    const password = document.getElementById('parentSignupPassword').value.trim();
    const confirmPassword = document.getElementById('parentSignupConfirmPassword').value.trim();
    
    if (!firstName || !lastName || !email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/parent-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password, confirmPassword })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentParent = data.parent;
            alert('Account created successfully!');
            loadParentDashboard(currentParent.email);
        } else {
            alert(data.error || 'Signup failed');
        }
    } catch (error) {
        console.error('Parent signup error:', error);
        alert('Signup failed');
    }
}

function loadParentDashboard(parentEmail) {
    document.getElementById('loginView').classList.remove('view-active');
    document.getElementById('loginView').classList.add('view-hidden');
    document.getElementById('parentDashboardView').classList.remove('view-hidden');
    document.getElementById('parentDashboardView').classList.add('view-active');
    
    document.getElementById('parentName').textContent = `${currentParent.firstName} ${currentParent.lastName}`;
    
    // Load children data
    loadChildrenProgress();
}

async function loadChildrenProgress() {
    try {
        const response = await fetch(`/api/parent/${currentParent.email}/children`);
        const data = await response.json();
        
        if (data.success && data.children) {
            displayChildrenProgress(data.children);
        } else {
            document.getElementById('childrenContainer').innerHTML = '<p>No children linked to this account yet.</p>';
        }
    } catch (error) {
        console.error('Error loading children progress:', error);
    }
}

function displayChildrenProgress(children) {
    const container = document.getElementById('childrenContainer');
    const reportsContainer = document.getElementById('reportsContainer');
    
    if (children.length === 0) {
        container.innerHTML = '<p>No children linked yet. Please link your students to see their progress.</p>';
        return;
    }
    
    container.innerHTML = '';
    reportsContainer.innerHTML = '';
    
    children.forEach(child => {
        // Subject progress cards
        const card = document.createElement('div');
        card.className = 'subject-card reading-card';
        card.innerHTML = `
            <h3>${child.firstName} ${child.lastName} - Grade ${child.grade}</h3>
            <p>Total Points: <strong>${child.progress ? child.progress.totalPointsEarned : 0}</strong></p>
            <p>Quizzes Completed: <strong>${child.progress ? child.progress.totalQuizzesCompleted : 0}</strong></p>
        `;
        container.appendChild(card);
        
        // Weekly report
        const report = document.createElement('div');
        report.className = 'child-progress-card';
        report.innerHTML = `
            <div class="child-name">${child.firstName} ${child.lastName}</div>
            <div class="summary-stat">
                <div class="summary-stat-label">Grade Level</div>
                <div class="summary-stat-value">${child.grade}</div>
            </div>
            <div class="weekly-summary">
                <div class="summary-stat">
                    <div class="summary-stat-label">Total Points</div>
                    <div class="summary-stat-value">${child.progress ? child.progress.totalPointsEarned : 0}</div>
                </div>
                <div class="summary-stat">
                    <div class="summary-stat-label">Quizzes Done</div>
                    <div class="summary-stat-value">${child.progress ? child.progress.totalQuizzesCompleted : 0}</div>
                </div>
                <div class="summary-stat">
                    <div class="summary-stat-label">Last Updated</div>
                    <div class="summary-stat-value">${child.progress && child.progress.lastUpdated ? new Date(child.progress.lastUpdated).toLocaleDateString() : 'N/A'}</div>
                </div>
            </div>
            ${child.progress && child.progress.totalQuizzesCompleted < 5 ? `
                <div class="alert-banner">
                    <strong>📌 Encouragement Needed!</strong>
                    Your child has completed ${child.progress.totalQuizzesCompleted} quizzes. Keep the momentum going!
                </div>
            ` : ''}
        `;
        reportsContainer.appendChild(report);
    });
}

function parentLogout() {
    currentParent = null;
    document.getElementById('parentDashboardView').classList.remove('view-active');
    document.getElementById('parentDashboardView').classList.add('view-hidden');
    document.getElementById('titleView').classList.remove('view-hidden');
    document.getElementById('titleView').classList.add('view-active');
}

function goToUserDashboard() {
    document.getElementById('loginView').classList.remove('view-active');
    document.getElementById('loginView').classList.add('view-hidden');
    document.getElementById('dashboardView').classList.remove('view-hidden');
    document.getElementById('dashboardView').classList.add('view-active');
    loadUserProgress(currentUser.id);
    
    // Show admin button only for admin users
    const adminEmails = ['siddu.506223@gmail.com', 'rishigompa2@gmail.com'];
    if (adminEmails.includes(currentUser.email)) {
        document.getElementById('adminButton').style.display = 'inline-block';
    } else {
        document.getElementById('adminButton').style.display = 'none';
    }
    
    // Display user avatar
    if (currentUser.avatarStyle) {
        const avatar = document.getElementById('userAvatar');
        avatar.textContent = currentUser.avatarStyle.emoji;
        avatar.style.background = `linear-gradient(135deg, ${currentUser.avatarStyle.color}80 0%, ${currentUser.avatarStyle.background} 100%)`;
    }
    
    // Load grade courses
    loadGradeCourses();
}

// Load all grade courses
function loadGradeCourses() {
    const gradeNames = {
        'K': 'Kindergarten',
        '1': '1st Grade',
        '2': '2nd Grade',
        '3': '3rd Grade',
        '4': '4th Grade',
        '5': '5th Grade',
        '6': '6th Grade',
        '7': '7th Grade',
        '8': '8th Grade',
        '9': '9th Grade',
        '10': '10th Grade',
        '11': '11th Grade',
        '12': '12th Grade'
    };
    
    const gradeEmojis = {
        'K': '🎈',
        '1': '⭐',
        '2': '🌟',
        '3': '💫',
        '4': '✨',
        '5': '🌠',
        '6': '🎯',
        '7': '🔥',
        '8': '⚡',
        '9': '🚀',
        '10': '🎓',
        '11': '👑',
        '12': '🏆'
    };
    
    const container = document.getElementById('gradeCoursesContainer');
    const userGrade = currentUser.grade;
    
    let html = '';
    for (let g = 'K'; g <= '12'; g = String(parseInt(g === 'K' ? -1 : g) + 1)) {
        if (g === '0') g = 'K';
        const gradeName = gradeNames[g];
        const emoji = gradeEmojis[g];
        const isCurrentGrade = g === userGrade;
        const badge = isCurrentGrade ? '<span class="course-badge">Your Grade</span>' : '';
        
        html += `
            <div class="course-card ${isCurrentGrade ? 'current-course' : ''}">
                <div class="course-emoji">${emoji}</div>
                <h3>${gradeName}</h3>
                ${badge}
                <p class="course-description">Complete all subjects to unlock achievements</p>
                <button onclick="selectGradeCourse('${g}')" class="btn-primary btn-course">
                    ${isCurrentGrade ? '🎓 Start Course' : '📖 View Course'}
                </button>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Select a grade course and show subjects
function selectGradeCourse(grade) {
    selectedGradeForQuiz = grade;
    
    // Hide grades, show subjects
    document.querySelector('.dashboard-grid:first-of-type').style.display = 'none';
    document.getElementById('subjectsSection').style.display = 'grid';
    document.getElementById('subjectsSection').querySelector('h2').textContent = `🎓 ${getGradeName(grade)} - Select a Subject`;
    
    // Scroll to subjects
    document.getElementById('subjectsSection').scrollIntoView({ behavior: 'smooth' });
}

// Get grade name helper
function getGradeName(grade) {
    const gradeNames = {
        'K': 'Kindergarten',
        '1': '1st Grade',
        '2': '2nd Grade',
        '3': '3rd Grade',
        '4': '4th Grade',
        '5': '5th Grade',
        '6': '6th Grade',
        '7': '7th Grade',
        '8': '8th Grade',
        '9': '9th Grade',
        '10': '10th Grade',
        '11': '11th Grade',
        '12': '12th Grade'
    };
    return gradeNames[grade] || grade;
}

// Go back to grades view
function backToCourses() {
    document.querySelector('.dashboard-grid:first-of-type').style.display = 'grid';
    document.getElementById('subjectsSection').style.display = 'none';
}

// Show grades K-8 courses
function showGradeCourses() {
    document.getElementById('gradeCoursesContainer').style.display = 'grid';
    document.getElementById('highSchoolCoursesContainer').style.display = 'none';
    loadGradeCourses();
}

// Show high school courses
function showHighSchoolCourses() {
    document.getElementById('gradeCoursesContainer').style.display = 'none';
    document.getElementById('highSchoolCoursesContainer').style.display = 'grid';
    loadHighSchoolCourses();
}

// Load high school courses
function loadHighSchoolCourses() {
    const highSchoolCourses = {
        'Math': [
            { id: 'alg1', name: 'Algebra 1', icon: '📐', description: 'Foundation for advanced mathematics' },
            { id: 'geom', name: 'Geometry', icon: '📏', description: 'Shapes, angles, and proofs' },
            { id: 'alg2', name: 'Algebra 2', icon: '📊', description: 'Advanced equations and functions' },
            { id: 'precalc', name: 'Pre-Calculus', icon: '📈', description: 'Trigonometry and analysis' },
            { id: 'ap_calc', name: 'AP Calculus AB', icon: '🔢', description: 'College-level calculus' },
            { id: 'ap_calc_bc', name: 'AP Calculus BC', icon: '🔢', description: 'Advanced calculus concepts' }
        ],
        'Science': [
            { id: 'biology', name: 'Biology', icon: '🧬', description: 'Life sciences and organisms' },
            { id: 'ap_bio', name: 'AP Biology', icon: '🧬', description: 'Advanced biological concepts' },
            { id: 'chemistry', name: 'Chemistry', icon: '⚗️', description: 'Elements and reactions' },
            { id: 'ap_chem', name: 'AP Chemistry', icon: '⚗️', description: 'College-level chemistry' },
            { id: 'physics', name: 'Physics', icon: '⚛️', description: 'Forces, motion, and energy' },
            { id: 'ap_physics', name: 'AP Physics', icon: '⚛️', description: 'Advanced physics topics' }
        ],
        'English': [
            { id: 'eng9', name: 'English I', icon: '📚', description: 'Literature and composition' },
            { id: 'eng10', name: 'English II', icon: '📖', description: 'World literature' },
            { id: 'eng11', name: 'US Literature', icon: '🎭', description: 'American texts and authors' },
            { id: 'ap_lang', name: 'AP English Lang & Comp', icon: '✍️', description: 'Rhetoric and writing' },
            { id: 'ap_lit', name: 'AP English Literature', icon: '📚', description: 'Literary analysis' }
        ],
        'History': [
            { id: 'us_hist', name: 'US History', icon: '🇺🇸', description: 'American history and government' },
            { id: 'world_hist', name: 'World History', icon: '🌍', description: 'Global civilizations' },
            { id: 'ap_us_hist', name: 'AP US History', icon: '🇺🇸', description: 'College-level US history' },
            { id: 'ap_world', name: 'AP World History', icon: '🌍', description: 'Advanced global history' }
        ],
        'Languages': [
            { id: 'spanish1', name: 'Spanish I', icon: '🇪🇸', description: 'Basic Spanish language' },
            { id: 'spanish2', name: 'Spanish II', icon: '🇪🇸', description: 'Intermediate Spanish' },
            { id: 'ap_spanish', name: 'AP Spanish Language', icon: '🇪🇸', description: 'Advanced Spanish' },
            { id: 'french1', name: 'French I', icon: '🇫🇷', description: 'Basic French language' },
            { id: 'chinese1', name: 'Chinese I', icon: '🇨🇳', description: 'Basic Mandarin Chinese' }
        ]
    };

    const container = document.getElementById('highSchoolCoursesContainer');
    let html = '<div style="grid-column: 1/-1;"><button onclick="backToCourses()" class="btn-secondary" style="padding: 10px 20px; margin-bottom: 20px;">← Back to Courses</button></div>';
    
    for (const [subject, courses] of Object.entries(highSchoolCourses)) {
        html += `<div style="grid-column: 1/-1; margin-top: 30px;">
            <h3 style="color: #667eea; margin-bottom: 15px;">${subject}</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">`;
        
        for (const course of courses) {
            html += `
                <div class="course-card">
                    <div class="course-emoji">${course.icon}</div>
                    <h4 style="margin: 10px 0;">${course.name}</h4>
                    <p class="course-description" style="font-size: 0.9rem;">${course.description}</p>
                    <button onclick="selectHighSchoolCourse('${course.id}', '${course.name}')" class="btn-primary btn-course">
                        📖 Start Course
                    </button>
                </div>
            `;
        }
        
        html += `</div></div>`;
    }
    
    container.innerHTML = html;
}

// Select a high school course
function selectHighSchoolCourse(courseId, courseName) {
    selectedGradeForQuiz = 'hs-' + courseId;
    document.querySelector('.dashboard-grid:first-of-type').style.display = 'none';
    document.getElementById('subjectsSection').style.display = 'grid';
    document.getElementById('subjectsSection').querySelector('h2').textContent = `🎓 ${courseName} - Select a Topic`;
    document.getElementById('subjectsSection').scrollIntoView({ behavior: 'smooth' });
}

// Profile and Avatar Functions
function viewProfile() {
    document.getElementById('dashboardView').classList.add('view-hidden');
    document.getElementById('profileView').classList.remove('view-hidden');
    
    // Populate profile info
    document.getElementById('profileName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileGrade').textContent = currentUser.grade;
    document.getElementById('profilePoints').textContent = document.getElementById('pointsCount').textContent.split(' ')[0];
    
    const createdDate = new Date(currentUser.createdAt).toLocaleDateString();
    document.getElementById('profileMemberSince').textContent = createdDate;
    
    // Display avatar in profile
    if (currentUser.avatarStyle) {
        const profileAvatar = document.getElementById('profileAvatar');
        profileAvatar.textContent = currentUser.avatarStyle.emoji;
        profileAvatar.style.background = currentUser.avatarStyle.background;
    }
}

function backToDashboard() {
    document.getElementById('profileView').classList.add('view-hidden');
    document.getElementById('dashboardView').classList.remove('view-hidden');
}

function openAvatarEditor() {
    const avatarColors = ['#FF6B9D', '#00CED1', '#FFD700', '#32CD32', '#FF8C00', '#8A2BE2'];
    const avatarEmojis = ['🐘', '🦁', '🐰', '🦊', '🐼', '🐸', '🦋', '🐙', '🐯', '🐻', '🦝', '🦊'];
    const backgroundColors = ['#FFE8F0', '#E0F6FF', '#FFFACD', '#E8F8E8', '#FFE4CC', '#F0E8FF'];

    const container = document.getElementById('avatarOptions');
    container.innerHTML = '';
    
    for (const emoji of avatarEmojis) {
        for (const color of avatarColors) {
            const option = document.createElement('div');
            option.className = 'avatar-option';
            option.textContent = emoji;
            option.style.background = color;
            option.style.borderColor = '#667eea';
            option.onclick = () => selectAvatar(emoji, color, backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);
            container.appendChild(option);
        }
    }
    
    document.getElementById('avatarEditorModal').style.display = 'flex';
}

function selectAvatar(emoji, color, background) {
    currentUser.avatarStyle = { emoji, color, background };
    
    // Update avatar display
    const avatar = document.getElementById('profileAvatar');
    avatar.textContent = emoji;
    avatar.style.background = background;
    
    const headerAvatar = document.getElementById('userAvatar');
    headerAvatar.textContent = emoji;
    headerAvatar.style.background = `linear-gradient(135deg, ${color}80 0%, ${background} 100%)`;
    
    closeAvatarEditor();
    showFeedback('Avatar updated successfully!', 'excellent');
}

function closeAvatarEditor() {
    document.getElementById('avatarEditorModal').style.display = 'none';
}

// Curriculum Functions
function viewCurriculum() {
    document.getElementById('dashboardView').classList.add('view-hidden');
    document.getElementById('curriculumView').classList.remove('view-hidden');
    loadCurriculumData();
    
    // Add search functionality
    document.getElementById('curriculumSearch').oninput = function() {
        filterCurriculum(this.value);
    };
}

function loadCurriculumData() {
    // Curriculum data structure
    const curriculumData = {
        kindergarten: {
            name: 'Kindergarten',
            subjects: {
                reading: {
                    name: 'Reading & Language Arts',
                    objectives: ['Recognize letters', 'Learn letter sounds', 'Identify sight words', 'Understand stories', 'Develop listening skills'],
                    topics: ['Letter Recognition', 'Phonics', 'Sight Words', 'Story Time'],
                    standards: 'Common Core K.RF, K.L'
                },
                math: {
                    name: 'Mathematics',
                    objectives: ['Count to 20', 'Recognize numbers 0-10', 'Basic addition/subtraction', 'Identify shapes', 'Measure and compare'],
                    topics: ['Counting', 'Numbers', 'Shapes', 'Measurement', 'Patterns'],
                    standards: 'Common Core K.CC, K.OA, K.G'
                },
                science: {
                    name: 'Science',
                    objectives: ['Observe living things', 'Learn about seasons', 'Understand weather', 'Explore five senses', 'Study water'],
                    topics: ['Living Things', 'Weather', 'Senses', 'Water', 'Earth'],
                    standards: 'NGSS K-LS1, K-PS2'
                }
            }
        },
        grade1: {
            name: '1st Grade',
            subjects: {
                reading: {
                    name: 'Reading & Language Arts',
                    objectives: ['Decode words', 'Use context clues', 'Understand story structure', 'Write sentences', 'Use proper punctuation'],
                    topics: ['Phonics', 'Vocabulary', 'Comprehension', 'Writing'],
                    standards: 'Common Core 1.RF, 1.RL, 1.W'
                },
                math: {
                    name: 'Mathematics',
                    objectives: ['Understand place value', 'Add/subtract within 20', 'Solve word problems', 'Tell time', 'Measure length'],
                    topics: ['Place Value', 'Addition', 'Subtraction', 'Time', 'Measurement'],
                    standards: 'Common Core 1.NBT, 1.OA'
                }
            }
        },
        algebra1: {
            name: 'Algebra 1',
            subjects: {
                core: {
                    name: 'Algebra 1 Core',
                    objectives: ['Solve linear equations', 'Graph functions', 'Understand slope', 'Solve systems', 'Factor polynomials', 'Solve quadratics'],
                    topics: ['Linear Equations', 'Graphing', 'Functions', 'Systems', 'Polynomials', 'Quadratics'],
                    standards: 'Common Core HSA.CED, HSA.REI'
                }
            }
        },
        geometry: {
            name: 'Geometry',
            subjects: {
                core: {
                    name: 'Geometry Core',
                    objectives: ['Understand congruence', 'Learn similarity', 'Calculate area/volume', 'Trigonometry', 'Coordinate geometry'],
                    topics: ['Congruence', 'Similarity', 'Area & Volume', 'Trigonometry', 'Coordinates'],
                    standards: 'Common Core HSG.CO, HSG.SRT'
                }
            }
        },
        apBiology: {
            name: 'AP Biology',
            subjects: {
                core: {
                    name: 'AP Biology',
                    objectives: ['Evolution & natural selection', 'Cell structure & function', 'DNA & proteins', 'Genetics', 'Ecology', 'Homeostasis'],
                    topics: ['Evolution', 'Cell Biology', 'Genetics', 'Ecology', 'Physiology'],
                    standards: 'AP College Board Framework'
                }
            }
        },
        usHistory: {
            name: 'US History',
            subjects: {
                core: {
                    name: 'US History',
                    objectives: ['Native Americans', 'Colonial period', 'American Revolution', 'Civil War', 'Westward expansion', 'Industrial era', 'Modern America'],
                    topics: ['Colonial', 'Revolution', 'Civil War', 'Expansion', 'Industrial', 'Modern'],
                    standards: 'C3 Framework'
                }
            }
        }
    };

    const container = document.getElementById('curriculumContent');
    let html = '';

    for (const [gradeKey, gradeData] of Object.entries(curriculumData)) {
        html += `<div class="curriculum-item">
            <div class="curriculum-grade">${gradeData.name}</div>`;

        for (const [subjectKey, subjectData] of Object.entries(gradeData.subjects)) {
            html += `
                <div class="curriculum-subject">${subjectData.name}</div>
                <div>
                    <strong style="color: #667eea;">Learning Objectives:</strong>
                    <ul class="objectives-list">
                        ${subjectData.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <strong style="color: #667eea;">Topics Covered:</strong>
                    <div class="topics-list">
                        ${subjectData.topics.map(topic => `<span class="topic-badge">${topic}</span>`).join('')}
                    </div>
                </div>
                <div class="standards-info">📋 ${subjectData.standards}</div>
            `;
        }

        html += `</div>`;
    }

    container.innerHTML = html;
}

function filterCurriculum(searchTerm) {
    const items = document.querySelectorAll('.curriculum-item');
    const term = searchTerm.toLowerCase();

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? 'block' : 'none';
    });
}

function logout() {
    currentUser = null;
    selectedGradeForQuiz = null;
    
    // Reset all forms
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('signupFirstName').value = '';
    document.getElementById('signupLastName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirmPassword').value = '';
    
    // Go back to title screen
    document.getElementById('dashboardView').classList.add('view-hidden');
    document.getElementById('loginView').classList.remove('view-active');
    document.getElementById('loginView').classList.add('view-hidden');
    document.getElementById('titleView').classList.remove('view-hidden');
    document.getElementById('titleView').classList.add('view-active');
    
    showFeedback('Logged out successfully!', 'excellent');
}

function showFeedback(message, type = 'default') {
    const feedback = document.createElement('div');
    feedback.className = `feedback-message ${type}`;
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'fadeInDown 0.5s ease-out reverse';
        setTimeout(() => feedback.remove(), 500);
    }, 2000);
}

// ==================== ADMIN FUNCTIONS ====================

function toggleAdminPanel() {
    // Security check: Only admin emails can access
    const adminEmails = ['siddu.506223@gmail.com', 'rishigompa2@gmail.com'];
    if (!adminEmails.includes(currentUser.email)) {
        alert('You do not have permission to access the admin panel');
        return;
    }
    
    const adminPanel = document.getElementById('adminPanelView');
    const dashboard = document.getElementById('dashboardView');
    
    if (adminPanel.classList.contains('view-hidden')) {
        // Show admin panel
        adminPanel.classList.remove('view-hidden');
        adminPanel.classList.add('view-active');
        dashboard.classList.add('view-hidden');
        
        // Display current user ID
        document.getElementById('adminUserId').textContent = `Current User ID: ${currentUser.id}`;
        
        // Load users list
        loadAdminUsers();
    }
}

function closeAdminPanel() {
    const adminPanel = document.getElementById('adminPanelView');
    const dashboard = document.getElementById('dashboardView');
    
    adminPanel.classList.remove('view-active');
    adminPanel.classList.add('view-hidden');
    dashboard.classList.remove('view-hidden');
    dashboard.classList.add('view-active');
}

async function deleteUserAdmin() {
    const userId = document.getElementById('userIdToDelete').value;
    
    if (!userId) {
        alert('Please enter a User ID');
        return;
    }
    
    if (!confirm(`Are you sure you want to delete user ${userId}? This cannot be undone!`)) {
        return;
    }
    
    try {
        const response = await fetch('/api/admin/delete-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId: parseInt(userId),
                deviceId: 'admin_device_123',  // Device identifier for security
                email: currentUser.email
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showFeedback(`User ${userId} deleted successfully`, 'excellent');
            document.getElementById('userIdToDelete').value = '';
            loadAdminUsers();  // Refresh the user list
        } else {
            handleError(data.error || 'Failed to delete user', 'Delete User');
        }
    } catch (error) {
        handleError(error.message, 'Delete User');
    }
}

async function loadAdminUsers() {
    try {
        const response = await fetch(`/api/admin/users?email=${encodeURIComponent(currentUser.email)}`);
        const data = await response.json();
        
        if (data.success && data.users) {
            displayAdminUsers(data.users);
        } else {
            document.getElementById('usersTableBody').innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No users found</td></tr>';
        }
    } catch (error) {
        console.error('Error loading users:', error);
        document.getElementById('usersTableBody').innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: red;">Error loading users</td></tr>';
    }
}

function displayAdminUsers(users) {
    const tableBody = document.getElementById('usersTableBody');
    
    if (!users || users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No users registered yet</td></tr>';
        return;
    }
    
    let html = '';
    users.forEach(user => {
        html += `
            <tr style="border-bottom: 1px solid #ddd; hover: background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd;">${user.id}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${user.firstName} ${user.lastName || ''}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${user.email}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${user.grade || 'N/A'}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                    <button onclick="openEditUserModal(${user.id}, '${user.firstName} ${user.lastName || ''}', '${user.grade || ''}')" style="padding: 5px 10px; background-color: #3498db; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 5px;">Edit</button>
                    <button onclick="deleteUserFromList(${user.id})" style="padding: 5px 10px; background-color: #e74c3c; color: white; border: none; border-radius: 3px; cursor: pointer;">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

function deleteUserFromList(userId) {
    if (!confirm(`Are you sure you want to delete user ${userId}? This cannot be undone!`)) {
        return;
    }
    document.getElementById('userIdToDelete').value = userId;
    deleteUserAdmin();
}

// Switch admin tabs (Users vs Parents)
function switchAdminTab(tab) {
    if (tab === 'users') {
        document.getElementById('usersAdminSection').style.display = 'block';
        document.getElementById('parentsAdminSection').style.display = 'none';
        document.getElementById('tabUsers').style.backgroundColor = '#3498db';
        document.getElementById('tabParents').style.backgroundColor = '#95a5a6';
        loadAdminUsers();
    } else if (tab === 'parents') {
        document.getElementById('usersAdminSection').style.display = 'none';
        document.getElementById('parentsAdminSection').style.display = 'block';
        document.getElementById('tabUsers').style.backgroundColor = '#95a5a6';
        document.getElementById('tabParents').style.backgroundColor = '#3498db';
        loadAdminParents();
    }
}

// Load and display all parents
async function loadAdminParents() {
    try {
        const response = await fetch(`/api/admin/parents?email=${encodeURIComponent(currentUser.email)}`);
        const data = await response.json();
        
        if (data.success && data.parents) {
            displayAdminParents(data.parents);
        } else {
            document.getElementById('parentsTableBody').innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No parents found</td></tr>';
        }
    } catch (error) {
        console.error('Error loading parents:', error);
        document.getElementById('parentsTableBody').innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: red;">Error loading parents</td></tr>';
    }
}

function displayAdminParents(parents) {
    const tableBody = document.getElementById('parentsTableBody');
    
    if (!parents || parents.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No parents registered yet</td></tr>';
        return;
    }
    
    let html = '';
    parents.forEach(parent => {
        html += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; border: 1px solid #ddd;">${parent.id}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${parent.firstName} ${parent.lastName || ''}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${parent.email}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${parent.grade || 'N/A'}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                    <button onclick="openEditParentModal(${parent.id}, '${parent.firstName} ${parent.lastName || ''}', '${parent.grade || ''}')" style="padding: 5px 10px; background-color: #3498db; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 5px;">Edit</button>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Open edit user grade modal
function openEditUserModal(userId, userName, currentGrade) {
    const modal = document.getElementById('editUserModal');
    document.getElementById('editUserName').textContent = `User: ${userName}`;
    document.getElementById('editUserGradeSelect').value = currentGrade;
    
    // Store userId for save operation
    modal.dataset.userId = userId;
    
    modal.style.display = 'flex';
}

function closeEditUserModal() {
    document.getElementById('editUserModal').style.display = 'none';
}

// Save user grade changes
async function saveUserGradeEdit() {
    const userId = parseInt(document.getElementById('editUserModal').dataset.userId);
    const newGrade = document.getElementById('editUserGradeSelect').value;
    
    if (!newGrade) {
        alert('Please select a grade');
        return;
    }
    
    try {
        const response = await fetch('/api/admin/edit-user-grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, grade: newGrade, email: currentUser.email })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showFeedback('User grade updated successfully', 'excellent');
            closeEditUserModal();
            loadAdminUsers();  // Refresh the list
        } else {
            handleError(data.error || 'Failed to update user grade', 'Update User Grade');
        }
    } catch (error) {
        handleError(error.message, 'Update User Grade');
    }
}

// Open edit parent grade modal
function openEditParentModal(parentId, parentName, currentGrade) {
    const modal = document.getElementById('editParentModal');
    document.getElementById('editParentName').textContent = `Parent: ${parentName}`;
    document.getElementById('editParentGradeSelect').value = currentGrade;
    
    // Store parentId for save operation
    modal.dataset.parentId = parentId;
    
    modal.style.display = 'flex';
}

function closeEditParentModal() {
    document.getElementById('editParentModal').style.display = 'none';
}

// Save parent grade changes
async function saveParentGradeEdit() {
    const parentId = parseInt(document.getElementById('editParentModal').dataset.parentId);
    const newGrade = document.getElementById('editParentGradeSelect').value;
    
    if (!newGrade) {
        alert('Please select a grade');
        return;
    }
    
    try {
        const response = await fetch('/api/admin/edit-parent-grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ parentId, grade: newGrade, email: currentUser.email })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showFeedback('Parent grade updated successfully', 'excellent');
            closeEditParentModal();
            loadAdminParents();  // Refresh the list
        } else {
            handleError(data.error || 'Failed to update parent grade', 'Update Parent Grade');
        }
    } catch (error) {
        handleError(error.message, 'Update Parent Grade');
    }
}

// ==================== USER MANAGEMENT ====================

// Fetch all users and display them
async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        displayUsers(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Display users in the table
function displayUsers(users) {
    const tbody = document.getElementById('usersBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        const dob = new Date(user.dateOfBirth).toLocaleDateString();
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.grade}</td>
            <td>${dob}</td>
            <td>
                <button onclick="openDashboard(${user.id}, '${user.firstName}')">Dashboard</button>
                <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add a new user
async function addUser() {
    const firstNameInput = document.getElementById('firstNameInput');
    const lastNameInput = document.getElementById('lastNameInput');
    const emailInput = document.getElementById('emailInput');
    const gradeInput = document.getElementById('gradeInput');
    const dobInput = document.getElementById('dobInput');
    
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const grade = gradeInput.value.trim();
    const dateOfBirth = dobInput.value;
    
    if (!firstName || !lastName || !email || !grade || !dateOfBirth) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, grade, dateOfBirth })
        });
        
        if (response.ok) {
            firstNameInput.value = '';
            lastNameInput.value = '';
            emailInput.value = '';
            gradeInput.value = '';
            dobInput.value = '';
            fetchUsers();
        } else {
            alert('Error adding user');
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Delete a user
async function deleteUser(id) {
    if (!confirm('Are you sure?')) return;
    
    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            fetchUsers();
        } else {
            alert('Error deleting user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Clear all data
async function clearAll() {
    if (!confirm('Are you sure? This will delete all users.')) return;
    
    try {
        const response = await fetch('/api/users/clear-all', {
            method: 'DELETE'
        });
        
        if (response.ok) {
            fetchUsers();
        } else {
            alert('Error clearing data');
        }
    } catch (error) {
        console.error('Error clearing data:', error);
    }
}

// ==================== DASHBOARD ====================

async function openDashboard(userId, firstName) {
    // Get user grade from the table
    const response = await fetch('/api/users');
    const users = await response.json();
    const user = users.find(u => u.id === userId);
    const grade = user ? user.grade : 'Kindergarten';
    
    currentUser = { id: userId, firstName, grade };
    
    // Switch views
    document.getElementById('userView').classList.remove('view-active');
    document.getElementById('userView').classList.add('view-hidden');
    document.getElementById('dashboardView').classList.remove('view-hidden');
    document.getElementById('dashboardView').classList.add('view-active');
    
    // Update dashboard
    document.getElementById('studentName').textContent = `Welcome, ${firstName}! (${grade})`;
    
    // Load user progress
    await loadUserProgress(userId);
}

async function loadUserProgress(userId) {
    try {
        const response = await fetch(`/api/progress/${userId}`);
        if (response.ok) {
            const progress = await response.json();
            updateProgressDisplay(progress);
        }
    } catch (error) {
        console.error('Error loading progress:', error);
    }
}

function updateProgressDisplay(progress) {
    const pointsElement = document.getElementById('pointsCount');
    const totalPoints = progress.totalPointsEarned || 0;
    pointsElement.textContent = totalPoints;
    
    const minigameStatus = document.getElementById('minigameStatus');
    const minigameCard = document.getElementById('minigameCard');
    
    if (totalPoints >= 30) {
        minigameStatus.textContent = '✓ Unlocked!';
        minigameStatus.style.color = '#27ae60';
        minigameCard.style.display = 'block';
    } else {
        minigameStatus.textContent = `${30 - totalPoints} more points needed`;
        minigameStatus.style.color = '#e74c3c';
        minigameCard.style.display = 'none';
    }
    
    // Show assignments section for 2nd graders
    const assignmentsSection = document.getElementById('assignmentsSection');
    const grade = currentUser.grade.toLowerCase();
    if (grade === '2nd grade' || grade === '2') {
        assignmentsSection.style.display = 'block';
    } else {
        assignmentsSection.style.display = 'none';
    }
    
    // Show board games section for all grades (3rd grade and above)
    const boardGamesSection = document.getElementById('boardGamesSection');
    if (grade === '3rd grade' || grade === '3' || grade === '4th grade' || grade === '4' || grade === '5th grade' || grade === '5' ||
        grade === '6th grade' || grade === '6' || grade === '7th grade' || grade === '7' || grade === '8th grade' || grade === '8' ||
        grade === '9th grade' || grade === '9' || grade === '10th grade' || grade === '10' || grade === '11th grade' || grade === '11' ||
        grade === '12th grade' || grade === '12') {
        boardGamesSection.style.display = 'block';
    } else {
        boardGamesSection.style.display = 'block'; // Show for all grades for now
    }
}

function goBackToUsers() {
    logout();
}

// ==================== QUIZ SYSTEM ====================

async function startQuiz(subject, difficulty) {
    try {
        const grade = currentUser.grade;
        const response = await fetch(`/api/quizzes/${grade}/${subject}/${difficulty}`);
        
        console.log('Fetching quiz:', grade, subject, difficulty);
        console.log('Response status:', response.status);
        
        if (response.ok) {
            quizQuestions = await response.json();
            console.log('Quiz questions loaded:', quizQuestions);
            
            currentQuestionIndex = 0;
            currentQuiz = { subject, difficulty };
            userAnswer = null;
            
            // Switch to quiz view
            document.getElementById('dashboardView').classList.add('view-hidden');
            document.getElementById('quizView').classList.remove('view-hidden');
            document.getElementById('quizView').classList.add('view-active');
            
            // Update title
            const titleElement = document.getElementById('quizTitle');
            titleElement.textContent = `${subject.charAt(0).toUpperCase() + subject.slice(1)} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level`;
            
            displayQuestion();
        } else {
            handleError(`Quiz loading error: ${response.status}`, 'Quiz Load');
        }
    } catch (error) {
        handleError(error.message, 'Quiz Start');
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        endQuiz();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    
    console.log('Displaying question:', question);
    console.log('Options:', question.options);
    
    // Update question number with difficulty badge
    const difficultyText = question.difficulty || currentDifficulty;
    document.getElementById('questionNumber').textContent = 
        `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    
    // Display question
    document.getElementById('questionDisplay').textContent = question.question;
    
    // Display graphic if available
    const graphicDisplay = document.getElementById('graphicDisplay');
    if (question.svgGraphic) {
        graphicDisplay.innerHTML = question.svgGraphic;
        graphicDisplay.style.display = 'flex';
    } else {
        graphicDisplay.innerHTML = '';
        graphicDisplay.style.display = 'none';
    }
    
    // Display options
    const optionsDisplay = document.getElementById('optionsDisplay');
    optionsDisplay.innerHTML = '';
    
    if (!question.options || question.options.length === 0) {
        console.error('No options found for question:', question);
        return;
    }
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.type = 'button';
        btn.onclick = () => selectAnswer(index);
        console.log('Creating button for option:', option);
        optionsDisplay.appendChild(btn);
    });
    
    // Hide result and next button
    document.getElementById('resultDisplay').className = 'result-hidden';
    document.getElementById('resultDisplay').textContent = '';
    document.getElementById('explanationDisplay').className = 'explanation-hidden';
    document.getElementById('explanationDisplay').textContent = '';
    document.getElementById('nextBtn').style.display = 'none';
    
    userAnswer = null;
}

async function selectAnswer(optionIndex) {
    if (userAnswer !== null) return; // Already answered
    
    userAnswer = optionIndex;
    const question = quizQuestions[currentQuestionIndex];
    const grade = currentQuiz.grade || currentUser.grade;
    const isCorrect = optionIndex === question.correctAnswer;
    
    // Mark buttons
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correctAnswer) {
            btn.classList.add('correct');
        } else if (index === userAnswer && userAnswer !== question.correctAnswer) {
            btn.classList.add('incorrect');
        }
    });
    
    // Update adaptive difficulty tracking
    if (isCorrect) {
        consecutiveCorrect++;
        consecutiveIncorrect = 0;
    } else {
        consecutiveIncorrect++;
        consecutiveCorrect = 0;
    }
    
    // Submit answer to backend
    try {
        const response = await fetch(`/api/quizzes/submit/${currentUser.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grade: grade,
                subject: currentQuiz.subject,
                difficulty: currentQuiz.difficulty,
                questionId: question.id,
                selectedAnswer: optionIndex
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            
            // Show feedback message
            if (result.isCorrect) {
                const messages = ['Good Job!', 'Excellent!', 'Perfect!', 'Amazing!', 'Great Work!'];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                showFeedback(randomMessage, 'excellent');
            } else {
                showFeedback('Keep Trying!', 'default');
            }
            
            // Show result
            const resultDisplay = document.getElementById('resultDisplay');
            resultDisplay.className = result.isCorrect ? 'result-display correct' : 'result-display incorrect';
            resultDisplay.innerHTML = `${result.isCorrect ? '✓ Correct!' : '✗ Incorrect!'} 
                <br>You earned: ${result.points} points
                <br>Total Points: ${result.userPoints}`;
            
            // Update points display
            document.getElementById('userPointsQuiz').textContent = `Points: ${result.userPoints}`;
            
            // Show explanation for incorrect answers
            if (!isCorrect) {
                displayExplanation(question, question.correctAnswer);
            }
            
            // Show adaptive difficulty message
            showAdaptiveMessage();
            
            // Show next button
            document.getElementById('nextBtn').style.display = 'block';
        }
    } catch (error) {
        console.error('Error submitting answer:', error);
    }
}

function displayExplanation(question, correctIndex) {
    const explanationDisplay = document.getElementById('explanationDisplay');
    const correctAnswer = question.options[correctIndex];
    const explanation = question.explanation || `The correct answer is: ${correctAnswer}`;
    
    explanationDisplay.className = 'explanation-display';
    explanationDisplay.innerHTML = `
        <div class="explanation-label">📚 Here's Why:</div>
        <div class="explanation-text">${explanation}</div>
        <div class="explanation-text"><strong>Correct Answer:</strong> ${correctAnswer}</div>
    `;
}

function showAdaptiveMessage() {
    const messageContainer = document.createElement('div');
    let shouldShow = false;
    let message = '';
    let className = '';
    
    // Check if we should level up or down
    if (consecutiveCorrect >= 2 && currentDifficulty !== 'hard') {
        shouldShow = true;
        message = '🎉 Great job! Moving to harder questions!';
        className = 'adaptive-message leveled-up';
        currentDifficulty = currentDifficulty === 'easy' ? 'medium' : 'hard';
    } else if (consecutiveIncorrect >= 2 && currentDifficulty !== 'easy') {
        shouldShow = true;
        message = '💡 Let\'s try easier questions to build confidence!';
        className = 'adaptive-message leveled-down';
        currentDifficulty = currentDifficulty === 'hard' ? 'medium' : 'easy';
    }
    
    if (shouldShow) {
        messageContainer.className = className;
        messageContainer.textContent = message;
        const nextBtn = document.getElementById('nextBtn');
        nextBtn.parentNode.insertBefore(messageContainer, nextBtn);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    userAnswer = null;
    
    // Remove any adaptive messages
    const adaptiveMsg = document.querySelector('.adaptive-message');
    if (adaptiveMsg) {
        adaptiveMsg.remove();
    }
    
    displayQuestion();
}

function endQuiz() {
    // Reset adaptive difficulty for next quiz
    currentDifficulty = 'easy';
    consecutiveCorrect = 0;
    consecutiveIncorrect = 0;
    
    alert(`Quiz completed! Check the dashboard to see your progress.`);
    exitQuiz();
}

function exitQuiz() {
    currentQuiz = null;
    quizQuestions = [];
    currentQuestionIndex = 0;
    userAnswer = null;
    
    // Switch back to appropriate view based on whether we came from grade explorer
    if (selectedGradeForQuiz) {
        document.getElementById('quizView').classList.remove('view-active');
        document.getElementById('quizView').classList.add('view-hidden');
        document.getElementById('gradeContentView').classList.remove('view-hidden');
        document.getElementById('gradeContentView').classList.add('view-active');
        selectedGradeForQuiz = null;
    } else {
        document.getElementById('quizView').classList.remove('view-active');
        document.getElementById('quizView').classList.add('view-hidden');
        document.getElementById('dashboardView').classList.remove('view-hidden');
        document.getElementById('dashboardView').classList.add('view-active');
    }
    
    // Reload progress
    loadUserProgress(currentUser.id);
}

// ==================== MINIGAME ====================

function playMinigame() {
    // Switch to minigame view
    document.getElementById('dashboardView').classList.add('view-hidden');
    document.getElementById('minigameView').classList.remove('view-hidden');
    document.getElementById('minigameView').classList.add('view-active');
    
    // Initialize game
    initializeMinigame();
}

function initializeMinigame() {
    const pairs = ['🍎', '🍌', '🍉', '🍇', '🍓', '🥝', '🍒', '🥭'];
    minigameCards = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
    minigameFlipped = new Array(minigameCards.length).fill(false);
    minigameMatched = new Array(minigameCards.length).fill(false);
    
    renderGameBoard();
}

function renderGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    minigameCards.forEach((card, index) => {
        const btn = document.createElement('button');
        btn.className = 'game-card';
        btn.onclick = () => flipCard(index);
        
        if (minigameMatched[index]) {
            btn.classList.add('matched');
            btn.disabled = true;
            btn.textContent = minigameCards[index];
        } else if (minigameFlipped[index]) {
            btn.classList.add('flipped');
            btn.textContent = minigameCards[index];
        } else {
            btn.textContent = '?';
        }
        
        gameBoard.appendChild(btn);
    });
}

function flipCard(index) {
    if (minigameFlipped[index] || minigameMatched[index]) return;
    
    minigameFlipped[index] = true;
    renderGameBoard();
    
    const flippedCards = minigameFlipped
        .map((flipped, i) => flipped && !minigameMatched[i] ? i : -1)
        .filter(i => i !== -1);
    
    if (flippedCards.length === 2) {
        setTimeout(() => checkMatch(flippedCards[0], flippedCards[1]), 800);
    }
}

function checkMatch(index1, index2) {
    if (minigameCards[index1] === minigameCards[index2]) {
        minigameMatched[index1] = true;
        minigameMatched[index2] = true;
        
        const matchedCount = minigameMatched.filter(m => m).length;
        if (matchedCount === minigameCards.length) {
            showGameComplete();
        }
    }
    
    minigameFlipped[index1] = false;
    minigameFlipped[index2] = false;
    renderGameBoard();
}

function showGameComplete() {
    const gameMessage = document.getElementById('gameMessage');
    gameMessage.className = 'success';
    gameMessage.textContent = '🎉 You Won! Great job!';
    
    setTimeout(() => {
        exitMinigame();
    }, 2000);
}

function exitMinigame() {
    document.getElementById('minigameView').classList.remove('view-active');
    document.getElementById('minigameView').classList.add('view-hidden');
    document.getElementById('dashboardView').classList.remove('view-hidden');
    document.getElementById('dashboardView').classList.add('view-active');
}

// ==================== SHOP SYSTEM ====================

// Games available in shop
const shopGames = [
    {
        id: 1,
        name: 'Flappy Bird',
        emoji: '🐦',
        cost: 10,
        description: 'Navigate the bird through pipes',
        fun: 'high'
    },
    {
        id: 2,
        name: 'Color Matcher',
        emoji: '🎨',
        cost: 15,
        description: 'Match colors and patterns',
        fun: 'medium'
    },
    {
        id: 3,
        name: 'Dino Runner',
        emoji: '🦖',
        cost: 20,
        description: 'Jump obstacles and collect coins',
        fun: 'high'
    },
    {
        id: 4,
        name: 'Bubble Pop',
        emoji: '🫧',
        cost: 5,
        description: 'Pop bubbles as fast as you can',
        fun: 'easy'
    },
    {
        id: 5,
        name: 'Treasure Hunt',
        emoji: '🏴‍☠️',
        cost: 25,
        description: 'Find hidden treasures and unlock rewards',
        fun: 'extreme'
    },
    {
        id: 6,
        name: 'Number Jump',
        emoji: '🔢',
        cost: 12,
        description: 'Jump on correct numbers',
        fun: 'medium'
    }
];

async function openShop() {
    // Switch to shop view
    document.getElementById('dashboardView').classList.add('view-hidden');
    document.getElementById('shopView').classList.remove('view-hidden');
    document.getElementById('shopView').classList.add('view-active');
    
    // Load and display games
    const progress = await fetch(`/api/progress/${currentUser.id}`).then(r => r.json()).catch(() => null);
    
    if (progress) {
        document.getElementById('shopPoints').textContent = progress.points;
    }
    
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    
    shopGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <h3>${game.emoji} ${game.name}</h3>
            <p>${game.description}</p>
            <div class="points">${game.cost} Points</div>
            <button onclick="playShopGame(${game.id})">Play Now</button>
        `;
        gamesGrid.appendChild(gameCard);
    });
}

function closeShop() {
    document.getElementById('shopView').classList.remove('view-active');
    document.getElementById('shopView').classList.add('view-hidden');
    document.getElementById('dashboardView').classList.remove('view-hidden');
    document.getElementById('dashboardView').classList.add('view-active');
}

async function playShopGame(gameId) {
    const game = shopGames.find(g => g.id === gameId);
    
    // Check if user has enough points
    const progress = await fetch(`/api/progress/${currentUser.id}`).then(r => r.json()).catch(() => null);
    
    if (!progress || progress.points < game.cost) {
        alert(`You need ${game.cost} points to play ${game.name}!\nYou have ${progress ? progress.points : 0} points.`);
        return;
    }
    
    showFeedback(`🎮 Starting ${game.name}!`, 'excellent');
    
    // Close shop and open appropriate game
    document.getElementById('shopView').classList.remove('view-active');
    document.getElementById('shopView').classList.add('view-hidden');
    document.getElementById('gamePlayView').classList.remove('view-hidden');
    document.getElementById('gamePlayView').classList.add('view-active');
    
    const gamePlayArea = document.getElementById('gamePlayArea');
    const gameTitle = document.getElementById('currentGameTitle');
    gameTitle.textContent = `${game.emoji} ${game.name}`;
    
    // Display different game based on gameId
    switch(gameId) {
        case 1:
            playFlappyBird();
            break;
        case 2:
            playColorMatcher();
            break;
        case 3:
            playDinoRunner();
            break;
        case 4:
            playBubblePop();
            break;
        case 5:
            playTreasureHunt();
            break;
        case 6:
            playNumberJump();
            break;
        default:
            gamePlayArea.innerHTML = '<p>Game loading...</p>';
    }
}

function playFlappyBird() {
    const gamePlayArea = document.getElementById('gamePlayArea');
    gamePlayArea.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <p style="font-size: 3rem;">🐦</p>
            <p>Click or press SPACE to make the bird jump!</p>
            <canvas id="flappyCanvas" width="400" height="500" style="background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%); border: 2px solid #333; border-radius: 5px;"></canvas>
            <p style="margin-top: 20px; font-weight: bold;">Score: <span id="flappyScore">0</span></p>
        </div>
    `;
    // Simplified Flappy Bird
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    let gameActive = true;
    
    showFeedback('Good Job! Game Started!', 'excellent');
}

function playColorMatcher() {
    const gamePlayArea = document.getElementById('gamePlayArea');
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    let score = 0;
    let gameActive = true;
    
    gamePlayArea.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <p style="font-size: 3rem;">🎨</p>
            <p>Match the colors!</p>
            <div id="colorGrid" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 10px; margin: 20px auto; width: fit-content;"></div>
            <p style="margin-top: 20px; font-weight: bold;">Score: <span id="colorScore">0</span>/6</p>
        </div>
    `;
    
    const colorGrid = document.getElementById('colorGrid');
    colors.forEach(color => {
        const btn = document.createElement('button');
        btn.style.width = '100px';
        btn.style.height = '100px';
        btn.style.backgroundColor = color;
        btn.style.border = 'none';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'transform 0.2s';
        btn.onclick = () => {
            score++;
            document.getElementById('colorScore').textContent = score;
            if (score === 6) {
                showFeedback('Perfect! All Matched!', 'perfect');
            }
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => btn.style.transform = 'scale(1)', 200);
        };
        colorGrid.appendChild(btn);
    });
    
    showFeedback('Good Job! Color Matching Started!', 'excellent');
}

function playDinoRunner() {
    const gamePlayArea = document.getElementById('gamePlayArea');
    gamePlayArea.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <p style="font-size: 3rem;">🦖</p>
            <p>Jump over obstacles!</p>
            <canvas id="dinoCanvas" width="400" height="300" style="background: linear-gradient(180deg, #87CEEB 0%, #90EE90 100%); border: 2px solid #333; border-radius: 5px;"></canvas>
            <p style="margin-top: 20px; font-weight: bold;">Score: <span id="dinoScore">0</span></p>
        </div>
    `;
    
    showFeedback('Good Job! Dino Running Started!', 'excellent');
}

function playBubblePop() {
    const gamePlayArea = document.getElementById('gamePlayArea');
    let score = 0;
    const bubbleCount = 20;
    
    gamePlayArea.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <p style="font-size: 3rem;">🫧</p>
            <p>Pop all the bubbles!</p>
            <div id="bubbleContainer" style="position: relative; width: 400px; height: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 20px auto; border-radius: 10px; overflow: hidden;"></div>
            <p style="margin-top: 20px; font-weight: bold;">Score: <span id="bubbleScore">0</span>/${bubbleCount}</p>
        </div>
    `;
    
    const container = document.getElementById('bubbleContainer');
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.style.width = '30px';
        bubble.style.height = '30px';
        bubble.style.backgroundColor = '#fff';
        bubble.style.borderRadius = '50%';
        bubble.style.position = 'absolute';
        bubble.style.left = Math.random() * 370 + 'px';
        bubble.style.top = Math.random() * 370 + 'px';
        bubble.style.cursor = 'pointer';
        bubble.style.transition = 'transform 0.1s';
        
        bubble.onclick = (e) => {
            e.stopPropagation();
            score++;
            document.getElementById('bubbleScore').textContent = score;
            bubble.style.transform = 'scale(0)';
            if (score === bubbleCount) {
                showFeedback('Perfect! All Bubbles Popped!', 'perfect');
            }
        };
        
        container.appendChild(bubble);
    }
    
    showFeedback('Good Job! Bubble Pop Started!', 'excellent');
}

function playTreasureHunt() {
    const gamePlayArea = document.getElementById('gamePlayArea');
    gamePlayArea.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <p style="font-size: 3rem;">🏴‍☠️</p>
            <p>Find the hidden treasure!</p>
            <div id="treasureGrid" style="display: grid; grid-template-columns: repeat(4, 80px); gap: 10px; margin: 20px auto; width: fit-content;"></div>
            <p style="margin-top: 20px; font-weight: bold;">Found: <span id="treasureFound">0</span>/1</p>
        </div>
    `;
    
    const grid = document.getElementById('treasureGrid');
    const treasurePosition = Math.floor(Math.random() * 16);
    
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('button');
        tile.style.width = '80px';
        tile.style.height = '80px';
        tile.style.fontSize = '2rem';
        tile.style.border = '2px solid #333';
        tile.style.borderRadius = '5px';
        tile.style.cursor = 'pointer';
        tile.style.background = '#FFD700';
        tile.textContent = '?';
        
        tile.onclick = () => {
            if (i === treasurePosition) {
                tile.textContent = '💰';
                tile.disabled = true;
                document.getElementById('treasureFound').textContent = '1';
                showFeedback('Found the Treasure!', 'perfect');
            } else {
                tile.textContent = '❌';
                tile.disabled = true;
            }
        };
        
        grid.appendChild(tile);
    }
    
    showFeedback('Good Job! Treasure Hunt Started!', 'excellent');
}

function playNumberJump() {
    const gamePlayArea = document.getElementById('gamePlayArea');
    let score = 0;
    let currentNumber = 1;
    
    gamePlayArea.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <p style="font-size: 3rem;">🔢</p>
            <p>Jump on the correct numbers in order!</p>
            <p style="font-size: 2rem; margin: 20px 0;">Next: <span id="nextNumber" style="color: #667eea; font-weight: bold;">1</span></p>
            <div id="numberGrid" style="display: grid; grid-template-columns: repeat(4, 80px); gap: 10px; margin: 20px auto; width: fit-content;"></div>
            <p style="margin-top: 20px; font-weight: bold;">Score: <span id="numberScore">0</span>/10</p>
        </div>
    `;
    
    const grid = document.getElementById('numberGrid');
    const numbers = Array.from({length: 10}, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    
    numbers.forEach(num => {
        const btn = document.createElement('button');
        btn.textContent = num;
        btn.style.width = '80px';
        btn.style.height = '80px';
        btn.style.fontSize = '1.5rem';
        btn.style.fontWeight = 'bold';
        btn.style.border = '2px solid #333';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.style.background = '#fff';
        btn.style.transition = 'all 0.2s';
        
        btn.onclick = () => {
            if (num === currentNumber) {
                score++;
                currentNumber++;
                btn.disabled = true;
                btn.style.background = '#4CAF50';
                btn.style.color = 'white';
                document.getElementById('numberScore').textContent = score;
                document.getElementById('nextNumber').textContent = currentNumber;
                showFeedback('Good Jump!', 'excellent');
                
                if (score === 10) {
                    showFeedback('Perfect! All Numbers!', 'perfect');
                }
            } else {
                btn.style.background = '#f44336';
                btn.style.color = 'white';
            }
        };
        
        grid.appendChild(btn);
    });
    
    showFeedback('Good Job! Number Jump Started!', 'excellent');
}

// ==================== LEADERBOARD SYSTEM ====================

async function viewLeaderboard() {
    try {
        const response = await fetch('/api/leaderboard');
        const leaderboard = await response.json();
        
        // Switch to leaderboard view
        document.getElementById('dashboardView').classList.add('view-hidden');
        document.getElementById('leaderboardView').classList.remove('view-hidden');
        document.getElementById('leaderboardView').classList.add('view-active');
        
        // Display leaderboard with enhanced styling
        const tbody = document.getElementById('leaderboardBody');
        tbody.innerHTML = '';
        
        leaderboard.forEach((entry, index) => {
            const row = document.createElement('tr');
            
            // Add special styling for top 3
            let rankCell = index + 1;
            if (index === 0) rankCell = `🥇 ${rankCell}`;
            else if (index === 1) rankCell = `🥈 ${rankCell}`;
            else if (index === 2) rankCell = `🥉 ${rankCell}`;
            
            row.innerHTML = `
                <td><strong>${rankCell}</strong></td>
                <td><strong>${entry.userName}</strong></td>
                <td><span class="points-badge">${entry.points}</span></td>
                <td><span class="game-count-badge">${entry.totalGamesPlayed}</span></td>
            `;
            
            // Highlight current user
            if (currentUser && entry.userId === currentUser.id) {
                row.classList.add('current-user');
            }
            
            tbody.appendChild(row);
        });
        
        showFeedback('Worldwide Rankings!', 'excellent');
    } catch (error) {
        handleError(error.message, 'Leaderboard Load');
    }
}

function closeLeaderboard() {
    document.getElementById('leaderboardView').classList.remove('view-active');
    document.getElementById('leaderboardView').classList.add('view-hidden');
    document.getElementById('dashboardView').classList.remove('view-hidden');
    document.getElementById('dashboardView').classList.add('view-active');
}

// ==================== ASSIGNMENTS SYSTEM ====================

async function viewAssignments(type) {
    try {
        const grade = currentUser.grade;
        const response = await fetch(`/api/assignments/${grade}/${type}`);
        
        if (response.ok) {
            const assignments = await response.json();
            
            // Switch to assignments view
            document.getElementById('dashboardView').classList.add('view-hidden');
            document.getElementById('assignmentsView').classList.remove('view-hidden');
            document.getElementById('assignmentsView').classList.add('view-active');
            
            // Update title
            const typeNames = { art: '🎨 Art', music: '🎵 Music', pe: '⚽ Physical Education' };
            document.getElementById('assignmentsTitle').textContent = typeNames[type] + ' Assignments';
            
            // Display assignments
            const assignmentsList = document.getElementById('assignmentsList');
            assignmentsList.innerHTML = '';
            
            assignments.forEach((assignment, index) => {
                const card = document.createElement('div');
                card.className = 'assignment-card';
                
                let uploadSection = '';
                if (type === 'art') {
                    uploadSection = `
                        <div class="file-upload-section">
                            <label for="artFile-${index}">📸 Upload your artwork:</label>
                            <input type="file" id="artFile-${index}" accept="image/*" style="margin: 10px 0;">
                            <button onclick="submitArtAssignment(${index}, '${assignment.title}')" class="btn-primary btn-small">Submit Artwork</button>
                        </div>
                    `;
                }
                
                card.innerHTML = `
                    <h3>${assignment.title}</h3>
                    <p>${assignment.description}</p>
                    <div class="assignment-instructions">
                        <strong>Instructions:</strong><br>
                        ${assignment.instructions}
                    </div>
                    <span class="assignment-points">⭐ ${assignment.points} points</span>
                    ${uploadSection}
                `;
                assignmentsList.appendChild(card);
            });
        } else {
            // Silently handle no assignments
        }
    } catch (error) {
        handleError(error.message, 'Assignments Load');
    }
}

function submitArtAssignment(index, assignmentTitle) {
    const fileInput = document.getElementById(`artFile-${index}`);
    
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please select an image file first');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Check file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
    }
    
    // Show feedback for successful submission
    showFeedback(`✅ ${assignmentTitle} submitted!`, 'perfect');
    
    // Simulate upload and award points
    setTimeout(() => {
        // Award 10 bonus points for art submission
        const pointsEarned = 10;
        alert(`🎉 Assignment submitted!\n\nYou earned ${pointsEarned} bonus points for your artwork!`);
        
        // Reset file input
        fileInput.value = '';
    }, 1000);
}

function closeAssignments() {
    document.getElementById('assignmentsView').classList.remove('view-active');
    document.getElementById('assignmentsView').classList.add('view-hidden');
    document.getElementById('dashboardView').classList.remove('view-hidden');
    document.getElementById('dashboardView').classList.add('view-active');
}

// ==================== BOARD GAMES ====================

async function viewBoardGames() {
    try {
        // Get board games from server
        const response = await fetch('/api/board-games');
        const games = await response.json();
        
        // Display games
        const grid = document.getElementById('gamesSelectionGrid');
        grid.innerHTML = '';
        
        games.games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <div class="game-card-name">${game.name}</div>
                <div class="game-card-description">${game.description}</div>
                <div class="game-card-difficulty">Difficulty: ${game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}</div>
                <div class="game-card-points">+${game.points} Points</div>
                <button onclick="playGame('${game.name}', ${game.points})">Play Now</button>
            `;
            grid.appendChild(gameCard);
        });
        
        // Update points display
        document.getElementById('bgPointsCount').textContent = currentUser.id;
        
        // Switch views
        document.getElementById('dashboardView').classList.remove('view-active');
        document.getElementById('dashboardView').classList.add('view-hidden');
        document.getElementById('boardGamesView').classList.remove('view-hidden');
        document.getElementById('boardGamesView').classList.add('view-active');
    } catch (error) {
        handleError(error.message, 'Board Games Load');
    }
}

function closeBoardGames() {
    document.getElementById('boardGamesView').classList.remove('view-active');
    document.getElementById('boardGamesView').classList.add('view-hidden');
    document.getElementById('dashboardView').classList.remove('view-hidden');
    document.getElementById('dashboardView').classList.add('view-active');
}

let currentGame = null;

function playGame(gameName, points) {
    currentGame = { name: gameName, points: points };
    const gamePlayArea = document.getElementById('gamePlayArea');
    const gameTitle = document.getElementById('currentGameTitle');
    
    gameTitle.textContent = gameName;
    
    // Clear previous game content
    gamePlayArea.innerHTML = '';
    
    // Initialize different games based on name
    if (gameName.includes('Chess')) {
        initializeChess(gamePlayArea);
    } else if (gameName.includes('Chinese Checkers')) {
        initializeChineseCheckers(gamePlayArea);
    } else if (gameName.includes('Checkers')) {
        initializeCheckers(gamePlayArea);
    } else if (gameName.includes('Connect Four')) {
        initializeConnectFour(gamePlayArea);
    } else if (gameName.includes('Sudoku')) {
        initializeSudoku(gamePlayArea);
    } else if (gameName.includes('Rubik')) {
        initializeRubiksCube(gamePlayArea);
    } else if (gameName.includes('Tic-Tac-Toe')) {
        initializeTicTacToe(gamePlayArea);
    }
    
    // Switch views
    document.getElementById('boardGamesView').classList.remove('view-active');
    document.getElementById('boardGamesView').classList.add('view-hidden');
    document.getElementById('gamePlayView').classList.remove('view-hidden');
    document.getElementById('gamePlayView').classList.add('view-active');
}

function closeGamePlay() {
    document.getElementById('gamePlayView').classList.remove('view-active');
    document.getElementById('gamePlayView').classList.add('view-hidden');
    document.getElementById('boardGamesView').classList.remove('view-hidden');
    document.getElementById('boardGamesView').classList.add('view-active');
    currentGame = null;
}

// Chess Game Initialization
function initializeChess(container) {
    const board = document.createElement('div');
    board.className = 'chess-board';
    
    const pieces = {
        '0,0': '♜', '0,1': '♞', '0,2': '♝', '0,3': '♛', '0,4': '♚', '0,5': '♝', '0,6': '♞', '0,7': '♜',
        '1,0': '♟', '1,1': '♟', '1,2': '♟', '1,3': '♟', '1,4': '♟', '1,5': '♟', '1,6': '♟', '1,7': '♟',
        '6,0': '♙', '6,1': '♙', '6,2': '♙', '6,3': '♙', '6,4': '♙', '6,5': '♙', '6,6': '♙', '6,7': '♙',
        '7,0': '♖', '7,1': '♘', '7,2': '♗', '7,3': '♕', '7,4': '♔', '7,5': '♗', '7,6': '♘', '7,7': '♖'
    };
    
    for (let i = 0; i < 64; i++) {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const square = document.createElement('div');
        square.className = 'chess-square ' + ((row + col) % 2 === 0 ? 'chess-square-light' : 'chess-square-dark');
        const piece = pieces[`${row},${col}`];
        if (piece) square.textContent = piece;
        board.appendChild(square);
    }
    
    const info = document.createElement('div');
    info.className = 'game-info';
    info.innerHTML = `
        <div class="game-status">♔ White to Move</div>
        <p>Chess is a game of strategy. Learn opening principles, develop pieces, and control the center!</p>
        <button onclick="closeGamePlay()" class="btn-secondary" style="margin-top: 15px;">Back to Games</button>
    `;
    
    container.appendChild(board);
    container.appendChild(info);
}

// Chinese Checkers Game Initialization
function initializeChineseCheckers(container) {
    const board = document.createElement('div');
    board.style.cssText = 'text-align: center; padding: 20px;';
    board.innerHTML = `
        <h3>🔴 Chinese Checkers</h3>
        <p style="margin: 20px 0;">Race your pieces to the opposite corner!</p>
        <div style="background: #f0f0f0; padding: 30px; border-radius: 8px; margin: 20px auto; max-width: 400px;">
            <p style="font-size: 2rem; margin: 20px 0;">🔴🔵🔴🔵</p>
            <p style="font-size: 2rem; margin: 20px 0;">🔵⬜⬜🔴</p>
            <p style="font-size: 2rem; margin: 20px 0;">🔴⬜⬜🔵</p>
            <p style="font-size: 2rem; margin: 20px 0;">🔵🔴🔵🔴</p>
        </div>
        <p><strong>Goal:</strong> Move all your pieces to the opposite triangle before your opponent!</p>
        <button onclick="closeGamePlay()" class="btn-secondary" style="margin-top: 15px;">Back to Games</button>
    `;
    container.appendChild(board);
}

// Checkers Game Initialization
function initializeCheckers(container) {
    const board = document.createElement('div');
    board.style.cssText = 'display: grid; grid-template-columns: repeat(8, 1fr); gap: 0; width: 320px; height: 320px; margin: 20px auto;';
    
    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div');
        const row = Math.floor(i / 8);
        const col = i % 8;
        
        if ((row + col) % 2 === 0) {
            square.style.backgroundColor = '#F0D9B5';
        } else {
            square.style.backgroundColor = '#B58863';
            // Add starting pieces
            if (row < 3) {
                square.innerHTML = '⚫';
                square.style.display = 'flex';
                square.style.justifyContent = 'center';
                square.style.alignItems = 'center';
                square.style.fontSize = '2rem';
            } else if (row > 4) {
                square.innerHTML = '⚪';
                square.style.display = 'flex';
                square.style.justifyContent = 'center';
                square.style.alignItems = 'center';
                square.style.fontSize = '2rem';
            }
        }
        board.appendChild(square);
    }
    
    const info = document.createElement('div');
    info.className = 'game-info';
    info.innerHTML = `
        <div class="game-status">⚫ Black's Turn</div>
        <p>Jump over opponent pieces to capture them. First to eliminate all opponent pieces wins!</p>
        <button onclick="closeGamePlay()" class="btn-secondary" style="margin-top: 15px;">Back to Games</button>
    `;
    
    container.appendChild(board);
    container.appendChild(info);
}

// Connect Four Game Initialization
function initializeConnectFour(container) {
    const board = document.createElement('div');
    board.style.cssText = 'display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; width: 350px; margin: 20px auto; background: blue; padding: 10px; border-radius: 8px;';
    
    for (let i = 0; i < 42; i++) {
        const circle = document.createElement('div');
        circle.style.cssText = 'width: 40px; height: 40px; background: yellow; border-radius: 50%; cursor: pointer; transition: all 0.2s;';
        circle.onmouseover = () => circle.style.opacity = '0.7';
        circle.onmouseout = () => circle.style.opacity = '1';
        board.appendChild(circle);
    }
    
    const info = document.createElement('div');
    info.className = 'game-info';
    info.innerHTML = `
        <div class="game-status">🟡 Player 1's Turn</div>
        <p>Drop your pieces to get four in a row horizontally, vertically, or diagonally!</p>
        <button onclick="closeGamePlay()" class="btn-secondary" style="margin-top: 15px;">Back to Games</button>
    `;
    
    container.appendChild(board);
    container.appendChild(info);
}

// Sudoku Game Initialization
function initializeSudoku(container) {
    const board = document.createElement('div');
    board.style.cssText = 'display: grid; grid-template-columns: repeat(9, 1fr); gap: 1px; width: 360px; height: 360px; margin: 20px auto; background: #333; padding: 5px;';
    
    const sudokuPuzzle = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ];
    
    sudokuPuzzle.forEach((row, r) => {
        row.forEach((num, c) => {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.maxLength = '1';
            cell.style.cssText = `
                width: 40px; height: 40px; text-align: center; font-size: 1.1rem; font-weight: bold;
                border: ${(c + 1) % 3 === 0 && c !== 8 ? '3px solid #333' : '1px solid #999'};
                border-right: ${(c + 1) % 3 === 0 && c !== 8 ? '3px solid #333' : '1px solid #999'};
                border-bottom: ${(r + 1) % 3 === 0 && r !== 8 ? '3px solid #333' : '1px solid #999'};
                background: ${num === 0 ? 'white' : '#e0e0e0'};
            `;
            if (num !== 0) {
                cell.value = num;
                cell.disabled = true;
            }
            board.appendChild(cell);
        });
    });
    
    const info = document.createElement('div');
    info.className = 'game-info';
    info.innerHTML = `
        <div class="game-status">🔢 Sudoku Puzzle</div>
        <p>Fill in the grid so each row, column, and 3x3 box contains the numbers 1-9!</p>
        <button onclick="closeGamePlay()" class="btn-secondary" style="margin-top: 15px;">Back to Games</button>
    `;
    
    container.appendChild(board);
    container.appendChild(info);
}

// Rubik's Cube Game Initialization
function initializeRubiksCube(container) {
    const cube = document.createElement('div');
    cube.style.cssText = 'text-align: center; padding: 20px;';
    cube.innerHTML = `
        <h3>🧩 Rubik's Cube Solver</h3>
        <div style="font-size: 4rem; margin: 20px 0;">🧩</div>
        <p style="font-size: 1.2rem; margin: 20px 0;"><strong>Front Face</strong></p>
        <div style="display: grid; grid-template-columns: repeat(3, 40px); gap: 5px; margin: 0 auto 20px; width: fit-content;">
            <div style="width: 40px; height: 40px; background: #FF0000; border: 2px solid #000;"></div>
            <div style="width: 40px; height: 40px; background: #FF0000; border: 2px solid #000;"></div>
            <div style="width: 40px; height: 40px; background: #FF0000; border: 2px solid #000;"></div>
            <div style="width: 40px; height: 40px; background: #FF0000; border: 2px solid #000;"></div>
            <div style="width: 40px; height: 40px; background: #FFD700; border: 2px solid #000;"></div>
            <div style="width: 40px; height: 40px; background: #FF0000; border: 2px solid #000;"></div>
            <div style="width: 40px; height: 40px; background: #FF0000; border: 2px solid #000;"></div>
            <div style="width: 40px; height: 40px; background: #FF0000; border: 2px solid #000;"></div>
            <div style="width: 40px; height: 40px; background: #FF0000; border: 2px solid #000;"></div>
        </div>
        <p><strong>Goal:</strong> Solve the Rubik's Cube by using layer-by-layer solving techniques!</p>
        <button onclick="closeGamePlay()" class="btn-secondary" style="margin-top: 15px;">Back to Games</button>
    `;
    container.appendChild(cube);
}

// Tic-Tac-Toe Game Initialization
function initializeTicTacToe(container) {
    const board = document.createElement('div');
    board.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 180px; margin: 20px auto;';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.style.cssText = 'width: 60px; height: 60px; font-size: 1.5rem; font-weight: bold; cursor: pointer; background: #f0f0f0; border: 2px solid #333; border-radius: 5px;';
        cell.textContent = '';
        board.appendChild(cell);
    }
    
    const info = document.createElement('div');
    info.className = 'game-info';
    info.innerHTML = `
        <div class="game-status">❌ Player 1's Turn</div>
        <p>Get three in a row to win! You're X, the computer is O.</p>
        <button onclick="closeGamePlay()" class="btn-secondary" style="margin-top: 15px;">Back to Games</button>
    `;
    
    container.appendChild(board);
    container.appendChild(info);
}

// ==================== GRADE CONTENT VIEWER ====================

let selectedGradeForQuiz = null;

async function viewGradeContent(grade) {
    try {
        selectedGradeForQuiz = grade;
        
        // Fetch quizzes for the selected grade
        const response = await fetch(`/api/quizzes/${grade}/reading/easy`);
        
        if (response.ok) {
            // Switch to grade content view
            document.getElementById('dashboardView').classList.add('view-hidden');
            document.getElementById('gradeContentView').classList.remove('view-hidden');
            document.getElementById('gradeContentView').classList.add('view-active');
            
            // Update title
            document.getElementById('gradeContentTitle').textContent = `📚 ${grade} - Learning Content`;
            
            // Get all subjects for the grade
            const subjects = ['reading', 'math', 'science', 'social studies', 'writing'];
            const gradeContentBody = document.getElementById('gradeContentBody');
            gradeContentBody.innerHTML = '';
            
            for (const subject of subjects) {
                try {
                    // Fetch sample questions for each subject
                    const quizResponse = await fetch(`/api/quizzes/${grade}/${subject}/easy`);
                    
                    if (quizResponse.ok) {
                        const quizData = await quizResponse.json();
                        
                        if (quizData.questions && quizData.questions.length > 0) {
                            const card = document.createElement('div');
                            card.className = 'grade-subject-card';
                            
                            const subjectEmojis = {
                                'reading': '📖',
                                'math': '🔢',
                                'science': '🔬',
                                'social studies': '🌍',
                                'writing': '✏️'
                            };
                            
                            const emoji = subjectEmojis[subject] || '📚';
                            
                            // Show first 2 sample questions
                            const sampleQuestions = quizData.questions.slice(0, 2);
                            let questionsHTML = '';
                            sampleQuestions.forEach((q, idx) => {
                                questionsHTML += `
                                    <div class="subject-preview">
                                        <p><strong>Q${idx + 1}:</strong> ${q.question}</p>
                                        <p><em>Correct answer: ${q.options[q.correctAnswer]}</em></p>
                                    </div>
                                `;
                            });
                            
                            card.innerHTML = `
                                <h3>${emoji} ${subject.charAt(0).toUpperCase() + subject.slice(1)}</h3>
                                ${questionsHTML}
                                <span class="question-count">📝 ${quizData.questions.length} questions</span>
                                <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                                    <button onclick="startGradeQuiz('${grade}', '${subject}', 'easy')" class="btn-primary btn-small">Easy Quiz</button>
                                    <button onclick="startGradeQuiz('${grade}', '${subject}', 'medium')" class="btn-primary btn-small">Medium Quiz</button>
                                    <button onclick="startGradeQuiz('${grade}', '${subject}', 'hard')" class="btn-primary btn-small">Hard Quiz</button>
                                </div>
                            `;
                            
                            gradeContentBody.appendChild(card);
                        }
                    }
                } catch (error) {
                    // Subject not available for this grade
                }
            }
            
            // Show feedback
            showFeedback(`Viewing ${grade} content!`, 'excellent');
        }
    } catch (error) {
        handleError(error.message, 'Grade Content Load');
    }
}

async function startGradeQuiz(grade, subject, difficulty) {
    try {
        const response = await fetch(`/api/quizzes/${grade}/${subject}/${difficulty}`);
        
        if (response.ok) {
            const data = await response.json();
            quizQuestions = data.questions;
            currentQuestionIndex = 0;
            userAnswer = null;
            
            currentQuiz = {
                subject: subject,
                difficulty: difficulty,
                grade: grade
            };
            
            // Switch to quiz view
            document.getElementById('gradeContentView').classList.add('view-hidden');
            document.getElementById('quizView').classList.remove('view-hidden');
            document.getElementById('quizView').classList.add('view-active');
            
            // Display first question
            displayQuestion();
            
            showFeedback(`Starting ${grade} ${subject} ${difficulty}!`, 'excellent');
        }
    } catch (error) {
        handleError(error.message, 'Grade Quiz Start');
    }
}

function backToDashboard() {
    document.getElementById('gradeContentView').classList.remove('view-active');
    document.getElementById('gradeContentView').classList.add('view-hidden');
    document.getElementById('dashboardView').classList.remove('view-hidden');
    document.getElementById('dashboardView').classList.add('view-active');
}

// ==================== INITIALIZATION ====================

// Load users on page load
document.addEventListener('DOMContentLoaded', fetchUsers);

