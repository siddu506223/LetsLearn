// Advanced AI - Wrong Answer Explanation Engine
// Analyzes student mistakes and provides intelligent feedback

class WrongAnswerExplainer {
    constructor() {
        this.explanationTemplates = this.initializeTemplates();
        this.feedbackHistory = new Map();
    }

    initializeTemplates() {
        return {
            math: {
                addition: {
                    patterns: [
                        { error: 'column_misalignment', tip: 'Make sure to align numbers by place value (ones, tens, hundreds)' },
                        { error: 'forgot_carry', tip: 'When a sum in a column is 10 or more, remember to carry to the next column' },
                        { error: 'carried_wrong_amount', tip: 'When carrying, only carry 1 to the next column' },
                        { error: 'arithmetic_mistake', tip: 'Double-check your individual column additions' }
                    ]
                },
                multiplication: {
                    patterns: [
                        { error: 'place_value', tip: 'Remember to shift each row by one place value when multiplying' },
                        { error: 'forgot_zero', tip: 'When multiplying by zero, the result is always zero' },
                        { error: 'incomplete_solution', tip: 'Make sure to add all the partial products together' },
                        { error: 'wrong_digit', tip: 'Check each digit multiplication carefully' }
                    ]
                },
                fractions: {
                    patterns: [
                        { error: 'common_denominator', tip: 'When adding/subtracting fractions, find a common denominator first' },
                        { error: 'add_denominator', tip: 'Never add the denominators - only add numerators when denominators match' },
                        { error: 'simplification', tip: 'Remember to simplify your final answer to lowest terms' },
                        { error: 'division_invert', tip: 'To divide fractions, flip the second fraction and multiply' }
                    ]
                }
            },
            science: {
                photosynthesis: {
                    patterns: [
                        { error: 'missing_inputs', tip: 'Photosynthesis needs THREE inputs: sunlight, water, AND carbon dioxide' },
                        { error: 'wrong_product', tip: 'The main products are glucose (sugar) and oxygen, not carbon dioxide' },
                        { error: 'location', tip: 'Photosynthesis occurs in the CHLOROPLASTS of plant cells, not the nucleus' },
                        { error: 'day_night', tip: 'Photosynthesis requires sunlight, so it happens during the day' }
                    ]
                },
                cells: {
                    patterns: [
                        { error: 'organelle_function', tip: 'Remember: Mitochondria = powerhouse (energy), Nucleus = control center' },
                        { error: 'plant_vs_animal', tip: 'Plant cells have cell walls and chloroplasts; animal cells don\'t' },
                        { error: 'reproduction', tip: 'Plant cells reproduce through cell division, not mitosis alone' },
                        { error: 'size', tip: 'Most cells are too small to see without a microscope' }
                    ]
                }
            },
            reading: {
                vocabulary: {
                    patterns: [
                        { error: 'similar_sounding', tip: 'This word sounds similar but means something different - read carefully' },
                        { error: 'opposite_meaning', tip: 'This is the OPPOSITE meaning - look for the actual synonym' },
                        { error: 'partial_match', tip: 'This word is related but not the best synonym - look for a closer match' },
                        { error: 'context', tip: 'Consider the context of how the word is used, not just the word alone' }
                    ]
                }
            }
        };
    }

    analyzeWrongAnswer(question, userAnswer, correctAnswer, difficulty) {
        const analysis = {
            isWrong: userAnswer !== correctAnswer,
            explanation: '',
            tips: [],
            encouragement: '',
            conceptReview: '',
            nextSteps: []
        };

        if (!analysis.isWrong) {
            return null;
        }

        // Detect error pattern
        const errorPattern = this.detectErrorPattern(question, userAnswer, correctAnswer);
        
        // Get tips based on pattern
        analysis.tips = this.getTipsForError(question.type, question.topic, errorPattern);
        
        // Generate personalized explanation
        analysis.explanation = this.generateExplanation(question, correctAnswer, difficulty, errorPattern);
        
        // Add encouragement
        analysis.encouragement = this.getEncouragement(difficulty);
        
        // Concept review
        analysis.conceptReview = this.getConceptReview(question.topic, difficulty);
        
        // Next steps
        analysis.nextSteps = this.getNextSteps(question, errorPattern);

        return analysis;
    }

    detectErrorPattern(question, userAnswer, correctAnswer) {
        const userStr = String(userAnswer);
        const correctStr = String(correctAnswer);

        // Pattern detection algorithms
        if (question.type === 'math') {
            if (userStr === correctStr.split('').reverse().join('')) {
                return 'digit_reversal';
            }
            if (parseInt(userStr) === parseInt(correctStr) * 10 || parseInt(userStr) === parseInt(correctStr) / 10) {
                return 'place_value_error';
            }
            if (parseInt(userStr) === parseInt(correctStr) + 1 || parseInt(userStr) === parseInt(correctStr) - 1) {
                return 'off_by_one';
            }
            if (userStr.includes('0') && !correctStr.includes('0')) {
                return 'forgot_zero';
            }
        }

        if (question.type === 'reading') {
            if (this.isSimilarWord(userAnswer, correctAnswer)) {
                return 'similar_sounding';
            }
            if (this.isOppositeWord(userAnswer, correctAnswer)) {
                return 'opposite_meaning';
            }
        }

        return 'general_misconception';
    }

    isSimilarWord(word1, word2) {
        const w1 = word1.toLowerCase();
        const w2 = word2.toLowerCase();
        let matches = 0;
        for (let i = 0; i < Math.min(w1.length, w2.length); i++) {
            if (w1[i] === w2[i]) matches++;
        }
        return matches / Math.max(w1.length, w2.length) > 0.7;
    }

    isOppositeWord(word1, word2) {
        const opposites = {
            'happy': 'sad', 'big': 'small', 'hot': 'cold', 'fast': 'slow',
            'clean': 'dirty', 'bright': 'dark', 'loud': 'quiet', 'strong': 'weak'
        };
        return opposites[word1.toLowerCase()] === word2.toLowerCase() ||
               opposites[word2.toLowerCase()] === word1.toLowerCase();
    }

    getTipsForError(type, topic, errorPattern) {
        const templates = this.explanationTemplates[type]?.[topic]?.patterns || [];
        const matchingPattern = templates.find(p => p.error === errorPattern);
        return matchingPattern ? [matchingPattern.tip] : ['Review the topic and try again'];
    }

    generateExplanation(question, correctAnswer, difficulty, errorPattern) {
        const difficultyLevel = { easy: 'basic', medium: 'intermediate', hard: 'advanced' };
        
        const explanations = {
            digit_reversal: `You reversed the digits! The correct answer is ${correctAnswer}, not ${String(correctAnswer).split('').reverse().join('')}. Be careful when writing numbers.`,
            place_value_error: `This looks like a place value error. ${correctAnswer} is the correct answer. Remember place values matter in math!`,
            off_by_one: `You're very close! The correct answer is ${correctAnswer}, not ${question.options[question.correctAnswer - 1] || correctAnswer}. Check your work again.`,
            forgot_zero: `Don't forget about zeros! They're important in math. The correct answer is ${correctAnswer}.`,
            similar_sounding: `These words sound similar, but ${correctAnswer} is the correct answer. Read carefully!`,
            opposite_meaning: `You chose the opposite! The correct answer is ${correctAnswer}, not the opposite.`,
            general_misconception: `The correct answer is ${correctAnswer}. Let's review this concept together.`
        };

        return explanations[errorPattern] || explanations.general_misconception;
    }

    getEncouragement(difficulty) {
        const encouragements = {
            easy: [
                '✨ Don\'t worry! Even small mistakes help us learn.',
                '🌟 Try again - you\'ve got this!',
                '💪 Mistakes are learning opportunities!'
            ],
            medium: [
                '🎯 This is a tricky concept - keep practicing!',
                '📚 You\'re learning challenging material - that\'s great!',
                '🚀 Every attempt makes you smarter!'
            ],
            hard: [
                '🏆 Advanced topics are tough - great effort!',
                '🧠 This is complex material - you\'re doing great!',
                '⭐ Persistence leads to mastery!'
            ]
        };

        const msgs = encouragements[difficulty] || encouragements.easy;
        return msgs[Math.floor(Math.random() * msgs.length)];
    }

    getConceptReview(topic, difficulty) {
        const reviews = {
            addition: 'Remember: Line up numbers by place value, add column by column, and carry when needed.',
            multiplication: 'Key steps: Multiply each digit, remember to shift rows, add partial products.',
            fractions: 'Important: Find common denominators for adding/subtracting, simplify your final answer.',
            photosynthesis: 'Key: Plants use sunlight + water + CO₂ to make glucose + O₂ in their chloroplasts.',
            cells: 'Key: Nucleus controls the cell, Mitochondria produces energy, Cell membrane protects.'
        };
        return reviews[topic] || 'Review the lesson material for this topic.';
    }

    getNextSteps(question, errorPattern) {
        return [
            '1. Read the question carefully again',
            '2. Review the concept from the lesson',
            '3. Work through a similar practice problem',
            '4. Try this question again',
            '5. If still stuck, ask a teacher for help'
        ];
    }
}

module.exports = WrongAnswerExplainer;
