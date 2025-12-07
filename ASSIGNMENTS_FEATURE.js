// ASSIGNMENTS FEATURE WITH ELLO AI GRADING
// Mini projects for each topic/subject/grade level

// ==================== CREATE ASSIGNMENT ====================

/**
 * POST /api/assignments/create
 * Teacher creates an assignment (writing, presentation, drawing)
 */
app.post('/api/assignments/create', (req, res) => {
    const { 
        title, 
        description, 
        subject, 
        gradeLevel,
        type, // 'writing', 'presentation', 'drawing'
        dueDate,
        rubric,
        instructions
    } = req.body;
    const teacherId = req.headers['user-id'];

    if (!title || !subject || !gradeLevel || !type) {
        return res.status(400).json({
            success: false,
            error: 'Title, subject, grade level, and type required'
        });
    }

    const validTypes = ['writing', 'presentation', 'drawing'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid assignment type'
        });
    }

    const assignment = {
        id: Date.now().toString(),
        teacherId,
        title,
        description,
        subject,
        gradeLevel,
        type,
        dueDate: dueDate || new Date(Date.now() + 7*24*60*60*1000), // 1 week default
        rubric: rubric || getDefaultRubric(gradeLevel),
        instructions,
        createdAt: new Date().toISOString(),
        submissions: [],
        published: false
    };

    db.insertAssignment(assignment);

    res.json({
        success: true,
        assignment,
        message: 'Assignment created successfully'
    });
});

// ==================== DEFAULT RUBRICS BY GRADE ====================

function getDefaultRubric(gradeLevel) {
    const rubrics = {
        elementary: {
            criteria: [
                { name: 'Completeness', weight: 0.25 },
                { name: 'Creativity', weight: 0.25 },
                { name: 'Effort', weight: 0.25 },
                { name: 'Follows Instructions', weight: 0.25 }
            ]
        },
        middle: {
            criteria: [
                { name: 'Content Quality', weight: 0.30 },
                { name: 'Organization', weight: 0.25 },
                { name: 'Creativity', weight: 0.20 },
                { name: 'Follows Instructions', weight: 0.15 },
                { name: 'Effort', weight: 0.10 }
            ]
        },
        high: {
            criteria: [
                { name: 'Content Quality', weight: 0.35 },
                { name: 'Organization & Logic', weight: 0.25 },
                { name: 'Originality', weight: 0.20 },
                { name: 'Technical Execution', weight: 0.15 },
                { name: 'Follows Assignment Brief', weight: 0.05 }
            ]
        }
    };

    return rubrics[gradeLevel] || rubrics.middle;
}

// ==================== GET ASSIGNMENTS ====================

/**
 * GET /api/assignments/:gradeLevel/:subject
 * Get assignments for specific grade level and subject
 */
app.get('/api/assignments/:gradeLevel/:subject', (req, res) => {
    const { gradeLevel, subject } = req.params;

    const assignments = db.getAssignments({
        gradeLevel,
        subject,
        published: true
    });

    res.json({
        success: true,
        assignments: assignments.map(a => ({
            ...a,
            daysUntilDue: Math.ceil(
                (new Date(a.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
            )
        }))
    });
});

// ==================== SUBMIT ASSIGNMENT ====================

/**
 * POST /api/assignments/submit
 * Student submits assignment (writing, presentation, or drawing)
 */
app.post('/api/assignments/submit', (req, res) => {
    const { 
        assignmentId, 
        content,  // For writing - essay text
        fileUrl,  // For drawing - image URL
        description // For presentation - description text
    } = req.body;
    const studentId = req.headers['user-id'];

    if (!assignmentId) {
        return res.status(400).json({
            success: false,
            error: 'Assignment ID required'
        });
    }

    const assignment = db.selectAssignmentById(assignmentId);
    if (!assignment) {
        return res.status(404).json({
            success: false,
            error: 'Assignment not found'
        });
    }

    // Create submission
    const submission = {
        id: Date.now().toString(),
        studentId,
        assignmentId,
        type: assignment.type,
        content: content || description,
        fileUrl,
        submittedAt: new Date().toISOString(),
        graded: false,
        score: null,
        feedback: null,
        suggestions: null
    };

    // Use Ello AI to grade the submission
    const gradeResult = elloGrader.gradeSubmission(
        { 
            content: content || description,
            fileUrl 
        },
        assignment.gradeLevel,
        assignment.type
    );

    if (gradeResult.success) {
        submission.graded = true;
        submission.score = gradeResult.grade.score;
        submission.feedback = gradeResult.grade.feedback;
        submission.suggestions = gradeResult.grade.suggestions;
        submission.letterGrade = gradeResult.grade.letterGrade;
        submission.celebration = gradeResult.grade.celebration;
        submission.elloMessage = gradeResult.grade.elloMessage;
    }

    // Save submission
    assignment.submissions.push(submission);
    db.updateAssignment(assignmentId, assignment);

    res.json({
        success: true,
        submission: {
            id: submission.id,
            score: submission.score,
            letterGrade: submission.letterGrade,
            feedback: submission.feedback,
            suggestions: submission.suggestions,
            celebration: submission.celebration,
            elloMessage: submission.elloMessage
        }
    });
});

// ==================== GET STUDENT'S ASSIGNMENT GRADES ====================

/**
 * GET /api/student/assignments/grades
 * Get all assignment grades for current student
 */
app.get('/api/student/assignments/grades', (req, res) => {
    const studentId = req.headers['user-id'];

    const assignments = db.getAllAssignments();
    const studentSubmissions = [];

    assignments.forEach(assignment => {
        assignment.submissions?.forEach(submission => {
            if (submission.studentId === studentId) {
                studentSubmissions.push({
                    assignmentTitle: assignment.title,
                    subject: assignment.subject,
                    type: assignment.type,
                    ...submission
                });
            }
        });
    });

    const stats = {
        totalAssignments: studentSubmissions.length,
        averageScore: studentSubmissions.length > 0
            ? Math.round(
                studentSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / 
                studentSubmissions.length
              )
            : 0,
        byType: {},
        bySubject: {}
    };

    // Calculate stats by type and subject
    ['writing', 'presentation', 'drawing'].forEach(type => {
        const typeSubmissions = studentSubmissions.filter(s => s.type === type);
        if (typeSubmissions.length > 0) {
            stats.byType[type] = {
                count: typeSubmissions.length,
                averageScore: Math.round(
                    typeSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / typeSubmissions.length
                )
            };
        }
    });

    res.json({
        success: true,
        submissions: studentSubmissions.sort((a, b) => 
            new Date(b.submittedAt) - new Date(a.submittedAt)
        ),
        stats
    });
});

// ==================== SAMPLE ASSIGNMENTS BY TOPIC ====================

const SAMPLE_ASSIGNMENTS = {
    elementary: {
        reading: [
            {
                title: 'Book Report - Creative Poster',
                type: 'drawing',
                description: 'Create a colorful poster about your favorite book character'
            },
            {
                title: 'My Story Writing',
                type: 'writing',
                description: 'Write a short 3-paragraph story about an adventure'
            }
        ],
        math: [
            {
                title: 'Math Story Problem Solution',
                type: 'writing',
                description: 'Solve 5 word problems and explain your thinking'
            },
            {
                title: 'Create Your Own Math Problem',
                type: 'writing',
                description: 'Write a math problem and show the solution'
            }
        ],
        science: [
            {
                title: 'Animal Research Drawing',
                type: 'drawing',
                description: 'Draw your favorite animal and label its parts'
            },
            {
                title: 'Science Experiment Report',
                type: 'writing',
                description: 'Write about a simple science experiment'
            }
        ]
    },
    middle: {
        writing: [
            {
                title: 'Persuasive Essay',
                type: 'writing',
                description: 'Write a 5-paragraph persuasive essay on a topic of choice'
            },
            {
                title: 'Book Analysis',
                type: 'writing',
                description: 'Analyze themes and characters from assigned novel'
            }
        ],
        science: [
            {
                title: 'Research Project Presentation',
                type: 'presentation',
                description: 'Present research on environmental topic'
            },
            {
                title: 'Scientific Investigation Report',
                type: 'writing',
                description: 'Document and analyze a science experiment'
            }
        ],
        history: [
            {
                title: 'Historical Event Poster',
                type: 'drawing',
                description: 'Create an informative poster about historical event'
            },
            {
                title: 'Biography Essay',
                type: 'writing',
                description: 'Write biography of historical figure'
            }
        ]
    },
    high: {
        english: [
            {
                title: 'Literary Analysis Essay',
                type: 'writing',
                description: 'Write analytical essay on assigned literature'
            },
            {
                title: 'Shakespearean Presentation',
                type: 'presentation',
                description: 'Present analysis of Shakespeare work'
            }
        ],
        science: [
            {
                title: 'Research Paper',
                type: 'writing',
                description: 'Write comprehensive research paper on science topic'
            },
            {
                title: 'Lab Report',
                type: 'writing',
                description: 'Document and analyze laboratory experiment'
            }
        ],
        history: [
            {
                title: 'Debate Presentation',
                type: 'presentation',
                description: 'Prepare and present debate on historical event'
            },
            {
                title: 'Original Research Project',
                type: 'writing',
                description: 'Conduct original historical research'
            }
        ]
    }
};

module.exports = { getDefaultRubric, SAMPLE_ASSIGNMENTS };
