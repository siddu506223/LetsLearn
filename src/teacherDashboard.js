// Teacher Dashboard & Classroom Management System

class TeacherDashboard {
    constructor(database) {
        this.db = database;
        this.classrooms = [];
        this.assignments = [];
        this.defaultAssignments = this.initializeDefaultAssignments();
    }

    // Teacher Authentication
    createTeacherAccount(firstName, lastName, email, password, schoolName) {
        const existing = this.db.selectUserByEmail(email);
        if (existing) {
            return { success: false, error: 'Email already exists' };
        }

        const teacher = {
            id: Math.random().toString(36).substring(7),
            firstName,
            lastName,
            email,
            password, // In production, use bcrypt
            schoolName,
            role: 'teacher',
            createdAt: new Date().toISOString()
        };

        return { success: true, teacher };
    }

    // Classroom Management
    createClassroom(teacherId, className, grade, subject) {
        const classCode = this.generateClassCode();

        const classroom = {
            id: Math.random().toString(36).substring(7),
            teacherId,
            className,
            grade,
            subject,
            classCode,
            students: [],
            createdAt: new Date().toISOString()
        };

        this.classrooms.push(classroom);
        
        // Automatically add default assignments
        this.addDefaultAssignmentsToClass(classroom.id, subject);

        return { success: true, classroom };
    }

    generateClassCode() {
        // Generate 6-character class code: ABC123
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    joinClassroom(studentId, classCode) {
        const classroom = this.classrooms.find(c => c.classCode === classCode);
        
        if (!classroom) {
            return { success: false, error: 'Invalid class code' };
        }

        if (classroom.students.includes(studentId)) {
            return { success: false, error: 'Already joined this class' };
        }

        classroom.students.push(studentId);
        return { success: true, classroom };
    }

    getTeacherClassrooms(teacherId) {
        return this.classrooms.filter(c => c.teacherId === teacherId);
    }

    getStudentClassrooms(studentId) {
        return this.classrooms.filter(c => c.students.includes(studentId));
    }

    // Assignment Management
    initializeDefaultAssignments() {
        return {
            math: [
                {
                    title: 'Basic Arithmetic Practice',
                    description: 'Practice addition, subtraction, multiplication, and division',
                    type: 'practice',
                    difficulty: 'easy',
                    points: 50
                },
                {
                    title: 'Word Problems',
                    description: 'Solve real-world math problems',
                    type: 'writing',
                    difficulty: 'medium',
                    points: 75
                },
                {
                    title: 'Math Project',
                    description: 'Create a presentation on a math concept',
                    type: 'presentation',
                    difficulty: 'hard',
                    points: 100
                }
            ],
            science: [
                {
                    title: 'Science Quiz',
                    description: 'Test your knowledge of scientific concepts',
                    type: 'practice',
                    difficulty: 'medium',
                    points: 75
                },
                {
                    title: 'Lab Report',
                    description: 'Write a detailed lab report on an experiment',
                    type: 'writing',
                    difficulty: 'hard',
                    points: 100
                },
                {
                    title: 'Science Fair Project',
                    description: 'Create a visual presentation of your project',
                    type: 'presentation',
                    difficulty: 'hard',
                    points: 150
                }
            ],
            english: [
                {
                    title: 'Reading Comprehension',
                    description: 'Answer questions about a reading passage',
                    type: 'practice',
                    difficulty: 'easy',
                    points: 50
                },
                {
                    title: 'Essay Writing',
                    description: 'Write a 5-paragraph essay',
                    type: 'writing',
                    difficulty: 'hard',
                    points: 100
                },
                {
                    title: 'Book Report',
                    description: 'Write a comprehensive book report',
                    type: 'writing',
                    difficulty: 'hard',
                    points: 100
                }
            ],
            history: [
                {
                    title: 'Timeline Project',
                    description: 'Create a visual timeline of historical events',
                    type: 'presentation',
                    difficulty: 'medium',
                    points: 75
                },
                {
                    title: 'Historical Research Paper',
                    description: 'Write a research paper on a historical topic',
                    type: 'writing',
                    difficulty: 'hard',
                    points: 100
                },
                {
                    title: 'Documentary Presentation',
                    description: 'Present your findings on a historical event',
                    type: 'presentation',
                    difficulty: 'hard',
                    points: 150
                }
            ]
        };
    }

    addDefaultAssignmentsToClass(classroomId, subject) {
        const defaults = this.defaultAssignments[subject] || [];
        
        defaults.forEach(defaultAssignment => {
            this.createAssignment(classroomId, {
                title: defaultAssignment.title,
                description: defaultAssignment.description,
                type: defaultAssignment.type,
                difficulty: defaultAssignment.difficulty,
                points: defaultAssignment.points,
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week from now
            });
        });
    }

    createAssignment(classroomId, assignmentData) {
        const classroom = this.classrooms.find(c => c.id === classroomId);
        if (!classroom) {
            return { success: false, error: 'Classroom not found' };
        }

        const assignment = {
            id: Math.random().toString(36).substring(7),
            classroomId,
            title: assignmentData.title,
            description: assignmentData.description,
            type: assignmentData.type, // 'writing', 'presentation', 'practice', etc
            difficulty: assignmentData.difficulty,
            points: assignmentData.points,
            dueDate: assignmentData.dueDate,
            createdAt: new Date().toISOString(),
            submissions: []
        };

        this.assignments.push(assignment);
        return { success: true, assignment };
    }

    getClassroomAssignments(classroomId) {
        return this.assignments.filter(a => a.classroomId === classroomId);
    }

    getStudentAssignments(studentId) {
        const classrooms = this.getStudentClassrooms(studentId);
        const classroomIds = classrooms.map(c => c.id);
        return this.assignments.filter(a => classroomIds.includes(a.classroomId));
    }

    submitAssignment(assignmentId, studentId, submissionData) {
        const assignment = this.assignments.find(a => a.id === assignmentId);
        if (!assignment) {
            return { success: false, error: 'Assignment not found' };
        }

        const submission = {
            id: Math.random().toString(36).substring(7),
            studentId,
            content: submissionData.content,
            fileUrl: submissionData.fileUrl || null,
            submittedAt: new Date().toISOString(),
            grade: null,
            feedback: null,
            status: 'submitted'
        };

        assignment.submissions.push(submission);
        return { success: true, submission };
    }

    getAssignmentSubmissions(assignmentId) {
        const assignment = this.assignments.find(a => a.id === assignmentId);
        if (!assignment) {
            return [];
        }
        return assignment.submissions;
    }

    getAllClassroomData(classroomId) {
        const classroom = this.classrooms.find(c => c.id === classroomId);
        if (!classroom) {
            return null;
        }

        const assignments = this.getClassroomAssignments(classroomId);
        const students = classroom.students.map(id => this.db.selectUserById(id));

        return {
            classroom,
            students,
            assignments,
            submissions: assignments.flatMap(a => a.submissions)
        };
    }
}

module.exports = TeacherDashboard;
