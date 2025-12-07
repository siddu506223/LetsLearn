// Ello - Interactive AI Grading System
// Fun and engaging AI that grades writing/presentation/image submissions

class ElloAIGrader {
    constructor() {
        this.personality = this.initializePersonality();
        this.gradingRubrics = this.initializeRubrics();
    }

    initializePersonality() {
        return {
            name: 'Ello',
            emoji: '🤖',
            catchphrases: [
                'Hi there! I\'m Ello, your AI learning buddy! 🎓',
                'Let\'s check out your amazing work! ✨',
                'I\'m excited to see what you created! 🎨',
                'Ready to give you feedback? Let\'s go! 🚀'
            ],
            celebrations: [
                '🎉 Fantastic work!',
                '⭐ Absolutely brilliant!',
                '🏆 Outstanding effort!',
                '🌟 You\'re a superstar!',
                '✨ Incredible work!'
            ]
        };
    }

    initializeRubrics() {
        return {
            writing: {
                K: { // Kindergarten
                    maxScore: 100,
                    criteria: [
                        { name: 'Effort', weight: 0.30, levels: ['Minimal', 'Some effort', 'Good effort', 'Excellent'] },
                        { name: 'Participation', weight: 0.30, levels: ['Did not participate', 'Participated little', 'Participated', 'Very enthusiastic'] },
                        { name: 'Creativity', weight: 0.20, levels: ['No creativity', 'Some ideas', 'Creative', 'Very creative'] },
                        { name: 'Completeness', weight: 0.20, levels: ['Incomplete', 'Mostly complete', 'Complete', 'Extra complete'] }
                    ]
                },
                '1-2': {
                    maxScore: 100,
                    criteria: [
                        { name: 'Sentence Structure', weight: 0.25, levels: ['Fragments', 'Simple', 'Mostly correct', 'Excellent'] },
                        { name: 'Spelling', weight: 0.20, levels: ['Many errors', 'Some errors', 'Few errors', 'No errors'] },
                        { name: 'Ideas', weight: 0.30, levels: ['Unclear', 'Basic', 'Clear', 'Very clear and detailed'] },
                        { name: 'Organization', weight: 0.25, levels: ['Disorganized', 'Somewhat organized', 'Well organized', 'Excellently organized'] }
                    ]
                },
                '3-5': {
                    maxScore: 100,
                    criteria: [
                        { name: 'Grammar & Mechanics', weight: 0.25, levels: ['Many errors', 'Some errors', 'Few errors', 'Excellent'] },
                        { name: 'Content & Ideas', weight: 0.35, levels: ['Weak', 'Adequate', 'Good', 'Excellent'] },
                        { name: 'Organization & Flow', weight: 0.25, levels: ['Poor', 'Adequate', 'Good', 'Excellent'] },
                        { name: 'Creativity', weight: 0.15, levels: ['Not evident', 'Minimal', 'Present', 'Strong'] }
                    ]
                },
                '6-8': {
                    maxScore: 100,
                    criteria: [
                        { name: 'Thesis & Focus', weight: 0.25, levels: ['Unclear', 'Present but weak', 'Clear', 'Excellent'] },
                        { name: 'Evidence & Support', weight: 0.30, levels: ['Insufficient', 'Minimal', 'Adequate', 'Excellent'] },
                        { name: 'Organization', weight: 0.20, levels: ['Disorganized', 'Somewhat organized', 'Well organized', 'Excellent'] },
                        { name: 'Conventions', weight: 0.15, levels: ['Many errors', 'Some errors', 'Few errors', 'Excellent'] },
                        { name: 'Voice & Style', weight: 0.10, levels: ['Not evident', 'Minimal', 'Present', 'Strong'] }
                    ]
                },
                '9-12': {
                    maxScore: 100,
                    criteria: [
                        { name: 'Argument & Thesis', weight: 0.25, levels: ['Unfocused', 'Basic', 'Clear', 'Sophisticated'] },
                        { name: 'Evidence & Analysis', weight: 0.35, levels: ['Weak', 'Adequate', 'Strong', 'Excellent'] },
                        { name: 'Organization & Logic', weight: 0.20, levels: ['Poor', 'Adequate', 'Good', 'Excellent'] },
                        { name: 'Academic Conventions', weight: 0.15, levels: ['Poor', 'Fair', 'Good', 'Excellent'] },
                        { name: 'Originality', weight: 0.05, levels: ['Derivative', 'Minimal', 'Some', 'Highly original'] }
                    ]
                }
            },
            presentation: {
                K: { maxScore: 100, criteria: ['Engagement', 'Creativity', 'Clarity'] },
                '1-2': { maxScore: 100, criteria: ['Content', 'Presentation Skills', 'Organization', 'Visual Aids'] },
                '3-5': { maxScore: 100, criteria: ['Content Quality', 'Organization', 'Delivery', 'Visual Aids', 'Engagement'] },
                '6-8': { maxScore: 100, criteria: ['Content & Research', 'Organization', 'Verbal Delivery', 'Visual Design', 'Audience Engagement'] },
                '9-12': { maxScore: 100, criteria: ['Research & Depth', 'Critical Analysis', 'Presentation Skills', 'Visual Design', 'Engagement & Q&A'] }
            },
            picture: {
                K: { maxScore: 100, criteria: ['Creativity', 'Effort', 'Following Instructions'] },
                '1-2': { maxScore: 100, criteria: ['Creativity', 'Detail', 'Following Instructions', 'Neatness'] },
                '3-5': { maxScore: 100, criteria: ['Creativity', 'Technical Skill', 'Following Instructions', 'Effort'] },
                '6-8': { maxScore: 100, criteria: ['Creativity', 'Composition', 'Technical Skill', 'Following Brief'] },
                '9-12': { maxScore: 100, criteria: ['Originality', 'Technical Skill', 'Artistic Merit', 'Concept Execution'] }
            }
        };
    }

    gradeSubmission(submission, gradeLevel, assignmentType) {
        // Analyze the submission
        const analysis = this.analyzeSubmission(submission, assignmentType);
        
        // Get rubric for this grade level and type
        const rubric = this.gradingRubrics[assignmentType]?.[gradeLevel];
        
        if (!rubric) {
            return { success: false, error: 'Rubric not found for grade level' };
        }

        // Calculate score based on rubric
        const score = this.calculateScore(analysis, rubric, gradeLevel);
        
        // Generate feedback
        const feedback = this.generateFeedback(analysis, score, gradeLevel, assignmentType);

        return {
            success: true,
            grade: {
                score: Math.round(score),
                maxScore: 100,
                letterGrade: this.getLetterGrade(score),
                feedback,
                suggestions: this.generateSuggestions(analysis, assignmentType),
                celebration: this.getCelebration(score),
                elloMessage: this.getElloMessage(score, assignmentType)
            }
        };
    }

    analyzeSubmission(submission, assignmentType) {
        const analysis = {
            wordCount: 0,
            sentenceCount: 0,
            paragraphCount: 0,
            uniqueWords: 0,
            averageWordLength: 0,
            hasImages: false,
            fileSize: 0,
            completeness: 0,
            creativity: 0,
            effort: 0
        };

        if (assignmentType === 'writing' && submission.content) {
            const text = submission.content;
            analysis.wordCount = text.split(/\s+/).length;
            analysis.sentenceCount = text.split(/[.!?]/).length;
            analysis.paragraphCount = text.split(/\n\n/).length;
            analysis.uniqueWords = new Set(text.toLowerCase().split(/\s+/)).size;
            analysis.averageWordLength = analysis.wordCount > 0 
                ? text.replace(/\s/g, '').length / analysis.wordCount 
                : 0;

            // Analyze content quality
            analysis.completeness = Math.min((analysis.wordCount / 100) * 100, 100);
            analysis.creativity = this.analyzeCreativity(text);
            analysis.effort = Math.min((analysis.sentenceCount / 10) * 100, 100);
        }

        if (submission.fileUrl) {
            analysis.hasImages = true;
            analysis.fileSize = Math.random() * 5000000; // Demo
        }

        return analysis;
    }

    analyzeCreativity(text) {
        const creativityKeywords = ['unique', 'original', 'innovative', 'remarkable', 'creative', 'imaginative'];
        let score = 50; // baseline

        creativityKeywords.forEach(keyword => {
            if (text.toLowerCase().includes(keyword)) {
                score += 10;
            }
        });

        return Math.min(score, 100);
    }

    calculateScore(analysis, rubric, gradeLevel) {
        let score = 0;

        if (rubric.criteria && Array.isArray(rubric.criteria)) {
            if (typeof rubric.criteria[0] === 'string') {
                // Simple criteria list
                score = 75 + Math.random() * 20; // Demo scoring
            } else {
                // Detailed rubric with weights
                rubric.criteria.forEach(criterion => {
                    const criteriaScore = Math.random() * 100;
                    score += (criteriaScore * criterion.weight);
                });
            }
        }

        return Math.min(score, 100);
    }

    generateFeedback(analysis, score, gradeLevel, assignmentType) {
        const feedbackTemplates = {
            writing: [
                `Your essay contains ${analysis.wordCount} words with ${analysis.paragraphCount} well-structured paragraphs.`,
                `I noticed your creative use of vocabulary with ${analysis.uniqueWords} unique words.`,
                `Your sentences are varied and engaging, showing ${analysis.sentenceCount} distinct ideas.`,
                `The effort and detail in your work is impressive!`
            ],
            presentation: [
                'Your presentation was well-organized and engaging!',
                'I appreciated your clear explanation of the concepts.',
                'Your visual aids really helped explain your ideas.',
                'Great job presenting to the class!'
            ],
            picture: [
                'Your artistic creativity really shines through!',
                'The detail and effort in your work is impressive!',
                'I love how you expressed your ideas visually!',
                'Your composition is well-thought-out!'
            ]
        };

        const templates = feedbackTemplates[assignmentType] || feedbackTemplates.writing;
        return templates[Math.floor(Math.random() * templates.length)];
    }

    generateSuggestions(analysis, assignmentType) {
        const suggestions = [];

        if (assignmentType === 'writing') {
            if (analysis.wordCount < 100) {
                suggestions.push('Try adding more detail and examples to expand your writing.');
            }
            if (analysis.paragraphCount < 2) {
                suggestions.push('Consider organizing your ideas into separate paragraphs.');
            }
            if (analysis.averageWordLength < 3) {
                suggestions.push('Try using some longer, more sophisticated words.');
            }
        }

        if (assignmentType === 'presentation' && !analysis.hasImages) {
            suggestions.push('Adding visual aids or images would enhance your presentation!');
        }

        if (suggestions.length === 0) {
            suggestions.push('Keep up the great work! You\'re doing amazing!');
        }

        return suggestions;
    }

    getLetterGrade(score) {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
    }

    getCelebration(score) {
        const celebrations = this.personality.celebrations;
        if (score >= 90) return celebrations[0];
        if (score >= 80) return celebrations[1];
        if (score >= 70) return celebrations[2];
        return celebrations[4];
    }

    getElloMessage(score, assignmentType) {
        const messages = {
            writing: [
                'Your writing shows great promise! Keep practicing and you\'ll get even better! 📚',
                'I loved the creativity in your writing! Express yourself more! ✍️',
                'Your ideas are clear and well-expressed! Amazing work! 🌟'
            ],
            presentation: [
                'You presented with confidence! Great job! 🎤',
                'Your presentation was engaging and informative! 👏',
                'You explained everything so clearly! Excellent work! 🎯'
            ],
            picture: [
                'Your artistic vision is wonderful! Keep creating! 🎨',
                'Such a creative and beautiful piece! 🌈',
                'You have a real talent for visual expression! ✨'
            ]
        };

        const msgs = messages[assignmentType] || messages.writing;
        return msgs[Math.floor(Math.random() * msgs.length)];
    }
}

module.exports = ElloAIGrader;
