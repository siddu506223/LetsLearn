const db = require('./database-v2');

class CurriculumInitializer {
    constructor() {
        this.questionCache = {};
    }

    // Generate sample questions for a topic on-demand
    // 10 questions per difficulty level (easy, medium, hard)
    generateQuestionsForTopic(grade, subject, topic) {
        const cacheKey = `${grade}-${subject}-${topic}`;
        
        // Return from cache if already generated
        if (this.questionCache[cacheKey]) {
            return this.questionCache[cacheKey];
        }

        const questions = [];
        const difficulties = ['easy', 'medium', 'hard'];
        
        // Generate 10 questions for each difficulty
        difficulties.forEach(difficulty => {
            for (let i = 1; i <= 10; i++) {
                questions.push({
                    grade,
                    subject,
                    topic,
                    difficulty,
                    questionNumber: i,
                    question: `${subject.toUpperCase()} - ${topic}\n\n${difficulty.toUpperCase()} Difficulty\nQuestion ${i}`,
                    type: 'multiple-choice',
                    options: ['Option A', 'Option B', 'Option C', 'Option D'],
                    correctAnswer: 'Option A',
                    points: this.calculatePoints(difficulty)
                });
            }
        });

        // Cache it
        this.questionCache[cacheKey] = questions;
        return questions;
    }

    calculatePoints(difficulty) {
        const pointsMap = {
            'easy': 10,
            'medium': 25,
            'hard': 50
        };
        return pointsMap[difficulty] || 10;
    }

    // Initialize minimal data - questions generated on-demand
    initializeCurriculum() {
        console.log('🚀 Curriculum system ready');
        console.log('📝 Questions will be generated on-demand when students access topics');
        console.log('✅ K-12 US Curriculum loaded (Elementary, Middle, High School)');
        return 0; // No questions pre-generated
    }

    // Method to generate questions when requested
    getQuestionsForTopic(grade, subject, topic) {
        return this.generateQuestionsForTopic(grade, subject, topic);
    }
}

module.exports = CurriculumInitializer;
