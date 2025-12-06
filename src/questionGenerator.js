// AI-powered Question Generator
// Intelligently generates questions based on topics and difficulty levels

class QuestionGenerator {
    constructor() {
        this.questionTemplates = this.initializeTemplates();
        this.generatedQuestions = new Map();
    }

    initializeTemplates() {
        return {
            // MATH TEMPLATES
            'addition': {
                generate: (difficulty) => {
                    const ranges = {
                        easy: { max: 10 },
                        medium: { max: 100 },
                        hard: { max: 1000 }
                    };
                    const max = ranges[difficulty].max;
                    const a = Math.floor(Math.random() * (max / 2)) + 1;
                    const b = Math.floor(Math.random() * (max / 2)) + 1;
                    const answer = a + b;
                    
                    return {
                        question: `What is ${a} + ${b}?`,
                        options: this.generateNumericOptions(answer, difficulty),
                        correctAnswer: 0,
                        type: 'math',
                        explanation: `${a} + ${b} = ${answer}. Adding means combining amounts together.`
                    };
                }
            },
            'subtraction': {
                generate: (difficulty) => {
                    const ranges = {
                        easy: { max: 10 },
                        medium: { max: 100 },
                        hard: { max: 1000 }
                    };
                    const max = ranges[difficulty].max;
                    const a = Math.floor(Math.random() * (max / 2)) + 1;
                    const b = Math.floor(Math.random() * a); // Ensure b <= a
                    const answer = a - b;
                    
                    return {
                        question: `What is ${a} - ${b}?`,
                        options: this.generateNumericOptions(answer, difficulty),
                        correctAnswer: 0,
                        type: 'math',
                        explanation: `${a} - ${b} = ${answer}. Subtraction means taking away.`
                    };
                }
            },
            'multiplication': {
                generate: (difficulty) => {
                    const ranges = {
                        easy: { max: 10 },
                        medium: { max: 20 },
                        hard: { max: 50 }
                    };
                    const max = ranges[difficulty].max;
                    const a = Math.floor(Math.random() * max) + 2;
                    const b = Math.floor(Math.random() * max) + 2;
                    const answer = a * b;
                    
                    return {
                        question: `What is ${a} × ${b}?`,
                        options: this.generateNumericOptions(answer, difficulty),
                        correctAnswer: 0,
                        type: 'math',
                        explanation: `${a} × ${b} = ${answer}. Multiplication is repeated addition.`
                    };
                }
            },
            'division': {
                generate: (difficulty) => {
                    const ranges = {
                        easy: { max: 10 },
                        medium: { max: 20 },
                        hard: { max: 50 }
                    };
                    const max = ranges[difficulty].max;
                    const b = Math.floor(Math.random() * max) + 2;
                    const quotient = Math.floor(Math.random() * max) + 2;
                    const a = b * quotient;
                    
                    return {
                        question: `What is ${a} ÷ ${b}?`,
                        options: this.generateNumericOptions(quotient, difficulty),
                        correctAnswer: 0,
                        type: 'math',
                        explanation: `${a} ÷ ${b} = ${quotient}. Division is splitting into equal groups.`
                    };
                }
            },
            'fractions': {
                generate: (difficulty) => {
                    const fractions = ['1/2', '1/3', '1/4', '2/3', '3/4'];
                    const words = ['half', 'third', 'quarter', 'two-thirds', 'three-quarters'];
                    const idx = Math.floor(Math.random() * fractions.length);
                    
                    return {
                        question: `What fraction is the same as ${words[idx]}?`,
                        options: [fractions[idx], fractions[(idx + 1) % fractions.length], fractions[(idx + 2) % fractions.length], fractions[(idx + 3) % fractions.length]],
                        correctAnswer: 0,
                        type: 'math',
                        explanation: `${fractions[idx]} is another way to write ${words[idx]}.`
                    };
                }
            },
            
            // SCIENCE TEMPLATES
            'photosynthesis': {
                generate: (difficulty) => {
                    const questions = [
                        { q: 'What do plants use from the sun during photosynthesis?', opts: ['Light energy', 'Water', 'CO2', 'All of the above'], correct: 3, exp: 'Plants use light energy, water, and carbon dioxide (CO2) to make food.' },
                        { q: 'What gas do plants release during photosynthesis?', opts: ['Nitrogen', 'Oxygen', 'Methane', 'Hydrogen'], correct: 1, exp: 'Plants release oxygen, which we breathe. This is released during photosynthesis.' },
                        { q: 'Where does photosynthesis mainly occur in plants?', opts: ['Roots', 'Leaves', 'Stem', 'Flowers'], correct: 1, exp: 'Photosynthesis primarily occurs in the leaves where chlorophyll absorbs sunlight.' }
                    ];
                    const q = questions[Math.floor(Math.random() * questions.length)];
                    return { question: q.q, options: q.opts, correctAnswer: q.correct, type: 'science', explanation: q.exp };
                }
            },
            'cells': {
                generate: (difficulty) => {
                    const questions = [
                        { q: 'What is the basic unit of life?', opts: ['Atom', 'Cell', 'Molecule', 'Organ'], correct: 1, exp: 'The cell is the smallest unit of life and the basic building block of all organisms.' },
                        { q: 'What part of the cell controls its activities?', opts: ['Ribosome', 'Nucleus', 'Mitochondria', 'Chloroplast'], correct: 1, exp: 'The nucleus contains DNA and controls all cell activities and functions.' },
                        { q: 'What organelle is responsible for producing energy in a cell?', opts: ['Nucleus', 'Mitochondria', 'Ribosome', 'Vacuole'], correct: 1, exp: 'Mitochondria are called the powerhouse of the cell, producing ATP energy.' }
                    ];
                    const q = questions[Math.floor(Math.random() * questions.length)];
                    return { question: q.q, options: q.opts, correctAnswer: q.correct, type: 'science', explanation: q.exp };
                }
            },
            
            // READING/VOCABULARY
            'vocabulary': {
                generate: (difficulty) => {
                    const vocabLevels = {
                        easy: [
                            { word: 'Happy', syn: ['Joyful', 'Sad', 'Angry', 'Tired'], correct: 0 },
                            { word: 'Small', syn: ['Tiny', 'Big', 'Tall', 'Wide'], correct: 0 },
                            { word: 'Fast', syn: ['Quick', 'Slow', 'Cold', 'Warm'], correct: 0 }
                        ],
                        medium: [
                            { word: 'Benevolent', syn: ['Kind', 'Mean', 'Funny', 'Smart'], correct: 0 },
                            { word: 'Ambiguous', syn: ['Unclear', 'Clear', 'Certain', 'Obvious'], correct: 0 },
                            { word: 'Obsolete', syn: ['Outdated', 'New', 'Popular', 'Trendy'], correct: 0 }
                        ],
                        hard: [
                            { word: 'Ephemeral', syn: ['Temporary', 'Permanent', 'Eternal', 'Fixed'], correct: 0 },
                            { word: 'Perspicacious', syn: ['Insightful', 'Blind', 'Foolish', 'Naive'], correct: 0 },
                            { word: 'Obfuscate', syn: ['Confuse', 'Clarify', 'Illuminate', 'Reveal'], correct: 0 }
                        ]
                    };
                    
                    const level = vocabLevels[difficulty];
                    const vocab = level[Math.floor(Math.random() * level.length)];
                    
                    return {
                        question: `What is a synonym for "${vocab.word}"?`,
                        options: vocab.syn,
                        correctAnswer: vocab.correct,
                        type: 'reading',
                        explanation: `"${vocab.word}" means ${vocab.syn[vocab.correct].toLowerCase()}. Synonyms are words with similar meanings.`
                    };
                }
            },

            // HISTORY
            'timeline': {
                generate: (difficulty) => {
                    const events = [
                        { year: 1776, event: 'American Independence', opts: ['1776', '1750', '1800', '1825'] },
                        { year: 1865, event: 'End of US Civil War', opts: ['1865', '1850', '1880', '1900'] },
                        { year: 1969, event: 'Moon Landing', opts: ['1969', '1960', '1975', '1980'] }
                    ];
                    const e = events[Math.floor(Math.random() * events.length)];
                    
                    return {
                        question: `In what year did ${e.event} occur?`,
                        options: e.opts,
                        correctAnswer: 0,
                        type: 'history',
                        explanation: `${e.event} occurred in the year ${e.year}. This is an important historical event in American history.`
                    };
                }
            }
        };
    }

    generateNumericOptions(correct, difficulty) {
        const options = [correct];
        const offsets = {
            easy: [1, 2, 3],
            medium: [5, 10, 15],
            hard: [25, 50, 100]
        };
        
        const offset = offsets[difficulty];
        options.push(correct + offset[0]);
        options.push(correct + offset[1]);
        options.push(correct + offset[2]);
        
        return options.sort(() => 0.5 - Math.random());
    }

    // Main generation method
    generateQuestion(topic, difficulty = 'easy') {
        const template = this.questionTemplates[topic];
        if (!template) {
            return null;
        }

        try {
            const question = template.generate(difficulty);
            question.id = Math.random().toString(36).substring(7);
            question.topic = topic;
            question.difficulty = difficulty;
            question.points = { easy: 5, medium: 10, hard: 15 }[difficulty];
            
            // Store for future variations
            if (!this.generatedQuestions.has(topic)) {
                this.generatedQuestions.set(topic, []);
            }
            this.generatedQuestions.get(topic).push(question);
            
            return question;
        } catch (error) {
            console.error('Error generating question:', error);
            return null;
        }
    }

    // Generate multiple questions for a quiz
    generateQuiz(topic, difficulty, count = 10) {
        const quiz = [];
        for (let i = 0; i < count; i++) {
            const question = this.generateQuestion(topic, difficulty);
            if (question) {
                quiz.push(question);
            }
        }
        return quiz;
    }

    // Get all available topics
    getAvailableTopics() {
        return Object.keys(this.questionTemplates);
    }

    // Generate similar question based on previous answer
    generateSimilarQuestion(previousQuestion) {
        if (!previousQuestion || !previousQuestion.topic) {
            return null;
        }

        // Generate new question with same topic and difficulty
        return this.generateQuestion(previousQuestion.topic, previousQuestion.difficulty);
    }
}

module.exports = QuestionGenerator;
