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
                        explanation: `${a} + ${b} = ${answer}. Adding means combining amounts together.`,
                        graphicType: 'addition-blocks',
                        imageAlt: `Visual representation of ${a} + ${b}`
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
                    const b = Math.floor(Math.random() * a);
                    const answer = a - b;
                    
                    return {
                        question: `What is ${a} - ${b}?`,
                        options: this.generateNumericOptions(answer, difficulty),
                        correctAnswer: 0,
                        type: 'math',
                        explanation: `${a} - ${b} = ${answer}. Subtraction means taking away.`,
                        graphicType: 'subtraction-blocks',
                        imageAlt: `Visual representation of ${a} - ${b}`
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
                        explanation: `${a} × ${b} = ${answer}. Multiplication is repeated addition.`,
                        graphicType: 'multiplication-grid',
                        imageAlt: `${a} × ${b} grid visualization`
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
                        explanation: `${a} ÷ ${b} = ${quotient}. Division is splitting into equal groups.`,
                        graphicType: 'division-groups',
                        imageAlt: `${a} items divided into ${b} groups`
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
                        explanation: `${fractions[idx]} is another way to write ${words[idx]}.`,
                        graphicType: 'fraction-pie',
                        imageAlt: `${words[idx]} visual representation`
                    };
                }
            },
            
            // SCIENCE TEMPLATES
            'photosynthesis': {
                generate: (difficulty) => {
                    const questions = [
                        { q: 'What do plants use from the sun during photosynthesis?', opts: ['Light energy', 'Water', 'CO2', 'All of the above'], correct: 3, exp: 'Plants use light energy, water, and carbon dioxide (CO2) to make food.', graphic: 'photosynthesis-process' },
                        { q: 'What gas do plants release during photosynthesis?', opts: ['Nitrogen', 'Oxygen', 'Methane', 'Hydrogen'], correct: 1, exp: 'Plants release oxygen, which we breathe. This is released during photosynthesis.', graphic: 'photosynthesis-gases' },
                        { q: 'Where does photosynthesis mainly occur in plants?', opts: ['Roots', 'Leaves', 'Stem', 'Flowers'], correct: 1, exp: 'Photosynthesis primarily occurs in the leaves where chlorophyll absorbs sunlight.', graphic: 'plant-leaf-diagram' }
                    ];
                    const q = questions[Math.floor(Math.random() * questions.length)];
                    return { question: q.q, options: q.opts, correctAnswer: q.correct, type: 'science', explanation: q.exp, graphicType: q.graphic, imageAlt: 'Photosynthesis illustration' };
                }
            },
            'cells': {
                generate: (difficulty) => {
                    const questions = [
                        { q: 'What is the basic unit of life?', opts: ['Atom', 'Cell', 'Molecule', 'Organ'], correct: 1, exp: 'The cell is the smallest unit of life and the basic building block of all organisms.', graphic: 'cell-basic-unit' },
                        { q: 'What part of the cell controls its activities?', opts: ['Ribosome', 'Nucleus', 'Mitochondria', 'Chloroplast'], correct: 1, exp: 'The nucleus contains DNA and controls all cell activities and functions.', graphic: 'cell-nucleus-diagram' },
                        { q: 'What organelle is responsible for producing energy in a cell?', opts: ['Nucleus', 'Mitochondria', 'Ribosome', 'Vacuole'], correct: 1, exp: 'Mitochondria are called the powerhouse of the cell, producing ATP energy.', graphic: 'mitochondria-powerhouse' }
                    ];
                    const q = questions[Math.floor(Math.random() * questions.length)];
                    return { question: q.q, options: q.opts, correctAnswer: q.correct, type: 'science', explanation: q.exp, graphicType: q.graphic, imageAlt: 'Cell biology illustration' };
                }
            },
            
            // READING/VOCABULARY
            'vocabulary': {
                generate: (difficulty) => {
                    const vocabLevels = {
                        easy: [
                            { word: 'Happy', syn: ['Joyful', 'Sad', 'Angry', 'Tired'], correct: 0, emoji: '😊' },
                            { word: 'Small', syn: ['Tiny', 'Big', 'Tall', 'Wide'], correct: 0, emoji: '📦' },
                            { word: 'Fast', syn: ['Quick', 'Slow', 'Cold', 'Warm'], correct: 0, emoji: '⚡' }
                        ],
                        medium: [
                            { word: 'Benevolent', syn: ['Kind', 'Mean', 'Funny', 'Smart'], correct: 0, emoji: '🤝' },
                            { word: 'Ambiguous', syn: ['Unclear', 'Clear', 'Certain', 'Obvious'], correct: 0, emoji: '❓' },
                            { word: 'Obsolete', syn: ['Outdated', 'New', 'Popular', 'Trendy'], correct: 0, emoji: '📼' }
                        ],
                        hard: [
                            { word: 'Ephemeral', syn: ['Temporary', 'Permanent', 'Eternal', 'Fixed'], correct: 0, emoji: '🌸' },
                            { word: 'Perspicacious', syn: ['Insightful', 'Blind', 'Foolish', 'Naive'], correct: 0, emoji: '🧠' },
                            { word: 'Obfuscate', syn: ['Confuse', 'Clarify', 'Illuminate', 'Reveal'], correct: 0, emoji: '🌫️' }
                        ]
                    };
                    
                    const level = vocabLevels[difficulty];
                    const vocab = level[Math.floor(Math.random() * level.length)];
                    
                    return {
                        question: `What is a synonym for "${vocab.word}"?`,
                        options: vocab.syn,
                        correctAnswer: vocab.correct,
                        type: 'reading',
                        explanation: `"${vocab.word}" means ${vocab.syn[vocab.correct].toLowerCase()}. Synonyms are words with similar meanings.`,
                        graphicType: 'vocabulary-card',
                        imageAlt: `Word card for ${vocab.word}`
                    };
                }
            },

            // HISTORY
            'timeline': {
                generate: (difficulty) => {
                    const events = [
                        { year: 1776, event: 'American Independence', opts: ['1776', '1750', '1800', '1825'], graphic: 'independence-timeline' },
                        { year: 1865, event: 'End of US Civil War', opts: ['1865', '1850', '1880', '1900'], graphic: 'civil-war-timeline' },
                        { year: 1969, event: 'Moon Landing', opts: ['1969', '1960', '1975', '1980'], graphic: 'moon-landing-timeline' }
                    ];
                    const e = events[Math.floor(Math.random() * events.length)];
                    
                    return {
                        question: `In what year did ${e.event} occur?`,
                        options: e.opts,
                        correctAnswer: 0,
                        type: 'history',
                        explanation: `${e.event} occurred in the year ${e.year}. This is an important historical event in American history.`,
                        graphicType: e.graphic,
                        imageAlt: `Historical timeline for ${e.event}`
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

    // Generate SVG graphics for visual questions
    generateGraphic(graphicType, params = {}) {
        const graphics = {
            'addition-blocks': () => {
                const { a = 3, b = 2 } = params;
                return `<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
                    ${Array(a).fill(0).map((_, i) => `<rect x="${i*30+10}" y="20" width="25" height="25" fill="#FF6B9D" stroke="#333" stroke-width="2"/>`).join('')}
                    <text x="140" y="40" font-size="24" font-weight="bold">+</text>
                    ${Array(b).fill(0).map((_, i) => `<rect x="${i*30+160}" y="20" width="25" height="25" fill="#00CED1" stroke="#333" stroke-width="2"/>`).join('')}
                </svg>`;
            },
            'multiplication-grid': () => {
                const { a = 3, b = 4 } = params;
                const cellSize = 30;
                let svg = `<svg viewBox="0 0 ${b*cellSize+20} ${a*cellSize+20}" xmlns="http://www.w3.org/2000/svg">`;
                for (let i = 0; i < a; i++) {
                    for (let j = 0; j < b; j++) {
                        svg += `<rect x="${j*cellSize+10}" y="${i*cellSize+10}" width="${cellSize}" height="${cellSize}" fill="#FFD700" stroke="#333" stroke-width="1"/>`;
                    }
                }
                svg += `</svg>`;
                return svg;
            },
            'division-groups': () => {
                const { a = 12, b = 3 } = params;
                const itemsPerGroup = Math.floor(a / b);
                let svg = `<svg viewBox="0 0 ${b*80+20} 120" xmlns="http://www.w3.org/2000/svg">`;
                for (let group = 0; group < b; group++) {
                    svg += `<circle cx="${group*80+40}" cy="30" r="25" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5,5"/>`;
                    for (let i = 0; i < itemsPerGroup; i++) {
                        const x = group*80 + 20 + (i % 2)*20;
                        const y = 20 + Math.floor(i/2)*25;
                        svg += `<circle cx="${x}" cy="${y}" r="5" fill="#FF8C00"/>`;
                    }
                }
                svg += `</svg>`;
                return svg;
            },
            'fraction-pie': () => {
                const { fraction = 2 } = params; // 2 = 1/2, 3 = 1/3, etc
                const angle = (360 / fraction) * (Math.PI / 180);
                const x = 50 + 40 * Math.cos(angle - Math.PI/2);
                const y = 50 + 40 * Math.sin(angle - Math.PI/2);
                return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" fill="#FFD700" stroke="#333" stroke-width="2"/>
                    <path d="M 50 50 L 50 10 A 40 40 0 ${fraction > 2 ? 1 : 0} 1 ${x} ${y} Z" fill="#FF6B9D" stroke="#333" stroke-width="2"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#333" stroke-width="2"/>
                </svg>`;
            },
            'photosynthesis-process': () => {
                return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                    <!-- Sun -->
                    <circle cx="50" cy="30" r="20" fill="#FFD700" stroke="#333" stroke-width="2"/>
                    <text x="40" y="35" font-size="12">Light</text>
                    <!-- Arrow -->
                    <path d="M 80 30 L 120 30" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
                    <!-- Plant -->
                    <rect x="130" y="80" width="40" height="80" fill="#228B22" stroke="#333" stroke-width="2"/>
                    <ellipse cx="150" cy="60" rx="25" ry="35" fill="#32CD32" stroke="#333" stroke-width="2"/>
                    <!-- Products -->
                    <text x="200" y="100" font-size="14" font-weight="bold">O₂ + Glucose</text>
                    <defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#333"/></marker></defs>
                </svg>`;
            },
            'cell-nucleus-diagram': () => {
                return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <!-- Cell -->
                    <circle cx="100" cy="100" r="90" fill="#E0F0FF" stroke="#333" stroke-width="3"/>
                    <!-- Nucleus -->
                    <circle cx="100" cy="100" r="40" fill="#FF6B9D" stroke="#333" stroke-width="2"/>
                    <!-- Nucleolus -->
                    <circle cx="100" cy="100" r="15" fill="#FF1493" stroke="#333" stroke-width="1"/>
                    <!-- Labels -->
                    <text x="60" y="180" font-size="12" font-weight="bold">Cell</text>
                    <text x="85" y="115" font-size="10" font-weight="bold">Nucleus</text>
                </svg>`;
            },
            'timeline-visualization': () => {
                return `<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Timeline line -->
                    <line x1="50" y1="50" x2="350" y2="50" stroke="#333" stroke-width="3"/>
                    <!-- Events -->
                    <circle cx="100" cy="50" r="8" fill="#FF6B9D" stroke="#333" stroke-width="2"/>
                    <circle cx="175" cy="50" r="8" fill="#00CED1" stroke="#333" stroke-width="2"/>
                    <circle cx="250" cy="50" r="8" fill="#FFD700" stroke="#333" stroke-width="2"/>
                    <circle cx="325" cy="50" r="8" fill="#32CD32" stroke="#333" stroke-width="2"/>
                    <!-- Labels -->
                    <text x="90" y="75" font-size="10">Past</text>
                    <text x="330" y="75" font-size="10">Present</text>
                </svg>`;
            },
            'vocabulary-card': () => {
                const { word = 'Word', meaning = 'Definition' } = params;
                return `<svg viewBox="0 0 250 150" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="230" height="130" rx="10" fill="#FFF9E6" stroke="#333" stroke-width="2"/>
                    <text x="125" y="50" font-size="20" font-weight="bold" text-anchor="middle">${word}</text>
                    <text x="125" y="100" font-size="14" text-anchor="middle">${meaning}</text>
                </svg>`;
            }
        };
        
        return graphics[graphicType] ? graphics[graphicType]() : null;
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
            
            // Generate SVG graphic if graphicType is specified
            if (question.graphicType) {
                question.svgGraphic = this.generateGraphic(question.graphicType, {
                    a: parseInt(question.question.match(/\d+/)?.[0]) || 5,
                    b: parseInt(question.question.match(/\d+/g)?.[1]) || 3
                });
            }
            
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
