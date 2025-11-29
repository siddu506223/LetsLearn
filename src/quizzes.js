// Comprehensive Quiz Content for Grades K-12
// With Science, History, Social Studies, Math, and Reading
// Includes image support via imageUrl property

const quizzes = {
    // GRADE 1 - NEW
    grade1: {
        science: {
            easy: [
                { id: 101, question: "What do plants need to grow?", options: ["Water and sunlight", "Only water", "Only air", "Only soil"], correctAnswer: 0, points: 5, difficulty: "easy", imageUrl: "/images/plant.png", explanation: "Plants need water, sunlight, and soil to grow. These provide nutrients and energy." },
                { id: 102, question: "Which animal is a mammal?", options: ["Fish", "Bird", "Dog", "Snake"], correctAnswer: 2, points: 5, difficulty: "easy", imageUrl: "/images/mammals.png", explanation: "Dogs are mammals. Mammals have fur and feed milk to their babies. Fish, birds, and snakes are not mammals." },
                { id: 103, question: "How many seasons are there?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "There are 4 seasons: Spring, Summer, Fall, and Winter." },
                { id: 104, question: "What does the sun provide?", options: ["Light and heat", "Only light", "Only heat", "Rain"], correctAnswer: 0, points: 5, difficulty: "easy", imageUrl: "/images/sun.png", explanation: "The sun provides both light and heat to Earth, which is essential for life." },
                { id: 105, question: "Which of these is a fruit?", options: ["Carrot", "Lettuce", "Apple", "Beans"], correctAnswer: 2, points: 5, difficulty: "easy", imageUrl: "/images/fruits.png", explanation: "An apple is a fruit. Carrots are vegetables, lettuce is a leafy green, and beans are legumes." },
                { id: 106, question: "What do fish use to breathe?", options: ["Lungs", "Gills", "Skin", "Mouth"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Fish use gills to breathe underwater. Gills extract oxygen from the water." },
                { id: 107, question: "How many legs does an insect have?", options: ["4", "6", "8", "10"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Insects have 6 legs. Spiders have 8 legs, which makes them arachnids, not insects." },
                { id: 108, question: "What is frozen water called?", options: ["Steam", "Ice", "Snow", "Frost"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Ice is frozen water. When water freezes at 0°C (32°F), it turns into ice." },
                { id: 109, question: "Which planet do we live on?", options: ["Mars", "Venus", "Earth", "Mercury"], correctAnswer: 2, points: 5, difficulty: "easy", imageUrl: "/images/earth.png", explanation: "We live on planet Earth. It's the third planet from the sun and has water and life." },
                { id: 110, question: "What do bees make?", options: ["Butter", "Honey", "Cheese", "Milk"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Bees make honey from flower nectar. Honey is sweet and bees store it as food." }
            ],
            medium: [
                { id: 111, question: "What is photosynthesis?", options: ["How plants make food from sunlight", "How animals breathe", "How water freezes", "How rocks form"], correctAnswer: 0, points: 10, difficulty: "medium", explanation: "Photosynthesis is how plants use sunlight, water, and air to make their own food and produce oxygen." },
                { id: 112, question: "What are the three states of matter?", options: ["Solid, Liquid, Gas", "Hot, Cold, Warm", "Heavy, Light, Medium", "Big, Small, Tiny"], correctAnswer: 0, points: 10, difficulty: "medium", explanation: "The three states of matter are solid (ice), liquid (water), and gas (steam)." },
                { id: 113, question: "How many bones are in a human body?", options: ["106", "206", "306", "406"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "An adult human has 206 bones. Babies have more bones, but some fuse together as they grow." },
                { id: 114, question: "What gas do we breathe out?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "We breathe out carbon dioxide (CO2). Our bodies produce this waste gas during respiration." },
                { id: 115, question: "Which type of animal lays eggs?", options: ["Mammals", "Birds and reptiles", "Fish only", "Insects only"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Birds and reptiles lay eggs. Most mammals give birth to live young instead." }
            ],
            hard: [
                { id: 116, question: "What is the process by which water changes to vapor?", options: ["Condensation", "Evaporation", "Freezing", "Melting"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "Evaporation is when liquid water turns into water vapor (gas) due to heat from the sun." },
                { id: 117, question: "What percentage of Earth is covered by water?", options: ["50%", "65%", "71%", "85%"], correctAnswer: 2, points: 15, difficulty: "hard", explanation: "Approximately 71% of Earth's surface is covered by water, which is why it's called the 'Blue Planet'." }
            ]
        },
        history: {
            easy: [
                { id: 201, question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], correctAnswer: 1, points: 5, difficulty: "easy", imageUrl: "/images/washington.png", explanation: "George Washington was the first President (1789-1797) and is called the 'Father of His Country'." },
                { id: 202, question: "In what year did the Titanic sink?", options: ["1900", "1912", "1920", "1945"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The Titanic sank in 1912 after hitting an iceberg in the Atlantic Ocean." },
                { id: 203, question: "Which ancient wonder is a pyramid?", options: ["Colosseum", "Great Wall", "Great Pyramid of Giza", "Hanging Gardens"], correctAnswer: 2, points: 5, difficulty: "easy", imageUrl: "/images/pyramid.png", explanation: "The Great Pyramid of Giza in Egypt is one of the Seven Wonders of the Ancient World." },
                { id: 204, question: "What year was America discovered by Columbus?", options: ["1391", "1492", "1592", "1692"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Christopher Columbus sailed to America in 1492, beginning European exploration of the Americas." },
                { id: 205, question: "Who wrote the Declaration of Independence?", options: ["Benjamin Franklin", "Thomas Jefferson", "John Adams", "George Washington"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Thomas Jefferson drafted the Declaration of Independence in 1776, declaring America's independence." }
            ],
            medium: [
                { id: 206, question: "Which empire built Machu Picchu?", options: ["Aztec", "Inca", "Maya", "Egyptian"], correctAnswer: 1, points: 10, difficulty: "medium", imageUrl: "/images/machupicchu.png", explanation: "The Inca Empire built Machu Picchu around 1450 in the Andes Mountains of Peru." },
                { id: 207, question: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "World War II ended in 1945 with the surrender of Japan in September." },
                { id: 208, question: "Who was the first President of Egypt?", options: ["Hosni Mubarak", "Gamal Nasser", "Muhammad Sadat", "Anwar Sadat"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Gamal Abdel Nasser was Egypt's first President after independence, serving from 1956-1970." }
            ]
        },
        social_studies: {
            easy: [
                { id: 301, question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "There are 7 continents: Africa, Asia, Europe, North America, South America, Oceania, and Antarctica." },
                { id: 302, question: "Which is the largest ocean?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The Pacific Ocean is the largest ocean on Earth, covering about 46% of the world's ocean surface." },
                { id: 303, question: "What is the capital of France?", options: ["Lyon", "Paris", "Marseille", "Nice"], correctAnswer: 1, points: 5, difficulty: "easy", imageUrl: "/images/paris.png", explanation: "Paris is the capital and largest city of France, known as the 'City of Light'." },
                { id: 304, question: "What is the capital of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Yokohama"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Tokyo is the capital and largest city of Japan." },
                { id: 305, question: "How many sides does a map show?", options: ["1", "2", "4", "6"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "A map traditionally shows 4 directions: North, South, East, and West (N, S, E, W)." }
            ],
            medium: [
                { id: 306, question: "What is the most populated country in the world?", options: ["India", "United States", "China", "Indonesia"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "China (and recently India) has the largest population in the world, with over 1 billion people." },
                { id: 307, question: "Which country has the most islands?", options: ["Japan", "Philippines", "Sweden", "Indonesia"], correctAnswer: 3, points: 10, difficulty: "medium", explanation: "Indonesia has the most islands of any country in the world, with over 17,000 islands." },
                { id: 308, question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "The Nile River in Africa is the longest river in the world, flowing 4,135 miles." }
            ]
        }
    },

    // GRADE 2 - NEW
    grade2: {
        math: {
            easy: [
                { id: 401, question: "What is 10 + 5?", options: ["12", "14", "15", "16"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "10 + 5 = 15. Count on from 10: 11, 12, 13, 14, 15." },
                { id: 402, question: "What is 20 - 8?", options: ["10", "11", "12", "13"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "20 - 8 = 12. Count back from 20: 19, 18, 17, 16, 15, 14, 13, 12." },
                { id: 403, question: "What is 3 × 4?", options: ["10", "12", "14", "16"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "3 × 4 = 12. Multiplication is repeated addition: 4 + 4 + 4 = 12." },
                { id: 404, question: "What is 15 ÷ 3?", options: ["3", "4", "5", "6"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "15 ÷ 3 = 5. Division means splitting equally: 15 split into 3 groups = 5 each." },
                { id: 405, question: "What is half of 20?", options: ["8", "9", "10", "12"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Half of 20 is 10. 20 ÷ 2 = 10." }
            ],
            medium: [
                { id: 406, question: "What is 25 + 17?", options: ["40", "41", "42", "43"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "25 + 17 = 42. Add tens and ones separately: 20 + 10 = 30, 5 + 7 = 12, 30 + 12 = 42." },
                { id: 407, question: "What is 6 × 7?", options: ["40", "41", "42", "43"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "6 × 7 = 42. This is an important multiplication fact to memorize." },
                { id: 408, question: "What is 48 ÷ 6?", options: ["6", "7", "8", "9"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "48 ÷ 6 = 8. 6 × 8 = 48, so 48 divided by 6 is 8." }
            ],
            hard: [
                { id: 409, question: "What is 99 - 47?", options: ["50", "51", "52", "53"], correctAnswer: 2, points: 15, difficulty: "hard", explanation: "99 - 47 = 52. Subtract: 99 - 50 = 49, then add back 3 (since we subtracted 50 instead of 47) = 52." },
                { id: 410, question: "What is 8 × 9?", options: ["70", "71", "72", "73"], correctAnswer: 2, points: 15, difficulty: "hard", explanation: "8 × 9 = 72. This is a key multiplication fact." }
            ]
        }
    },

    // GRADE 5 - NEW
    grade5: {
        science: {
            easy: [
                { id: 501, question: "What is the basic unit of life?", options: ["Atom", "Molecule", "Cell", "Organ"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The cell is the basic unit of life. All living things are made of one or more cells." },
                { id: 502, question: "Which gas do plants release during photosynthesis?", options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Plants release oxygen during photosynthesis, which we breathe." },
                { id: 503, question: "What is the layer of gas surrounding Earth?", options: ["Biosphere", "Hydrosphere", "Atmosphere", "Lithosphere"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The atmosphere is the layer of gases surrounding Earth that we breathe." },
                { id: 504, question: "How many chambers does the human heart have?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The human heart has 4 chambers: 2 atria and 2 ventricles." },
                { id: 505, question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The mitochondria are called the powerhouse of the cell because they produce energy (ATP)." }
            ],
            medium: [
                { id: 506, question: "What is the process of breaking down food for energy?", options: ["Photosynthesis", "Respiration", "Digestion", "Fermentation"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Cellular respiration is the process by which cells break down glucose to produce energy (ATP)." },
                { id: 507, question: "What is the study of living things called?", options: ["Geology", "Astronomy", "Biology", "Chemistry"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "Biology is the study of living organisms and life processes." },
                { id: 508, question: "How many species have been identified on Earth?", options: ["1 million", "5 million", "8 million", "15 million"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "Scientists estimate about 8 million species exist on Earth, though only a fraction have been identified." }
            ]
        },
        math: {
            easy: [
                { id: 601, question: "What is 0.5 as a fraction?", options: ["1/2", "1/3", "1/4", "2/3"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "0.5 = 1/2. This means half of something." },
                { id: 602, question: "What is 25% as a decimal?", options: ["0.25", "0.5", "0.75", "1.25"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "25% = 0.25. Percent means 'per 100', so 25/100 = 0.25." },
                { id: 603, question: "What is the area of a rectangle with length 5 and width 4?", options: ["9", "18", "20", "25"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Area = length × width = 5 × 4 = 20 square units." },
                { id: 604, question: "What is 12²?", options: ["24", "100", "120", "144"], correctAnswer: 3, points: 5, difficulty: "easy", explanation: "12² = 12 × 12 = 144." },
                { id: 605, question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "√64 = 8 because 8 × 8 = 64." }
            ],
            medium: [
                { id: 606, question: "What is 15% of 200?", options: ["20", "25", "30", "35"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "15% of 200 = 0.15 × 200 = 30." },
                { id: 607, question: "What is the perimeter of a square with side length 6?", options: ["12", "24", "36", "48"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Perimeter = 4 × side = 4 × 6 = 24." },
                { id: 608, question: "What is 2³?", options: ["6", "8", "12", "16"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "2³ = 2 × 2 × 2 = 8." }
            ]
        }
    },

    // HIGH SCHOOL GRADES
    grade9: {
        science: {
            easy: [
                { id: 701, question: "What is the chemical formula for water?", options: ["H2O", "O2", "H2O2", "CO2"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "Water is H2O, meaning it has 2 hydrogen atoms and 1 oxygen atom." },
                { id: 702, question: "What is the speed of light?", options: ["300,000 m/s", "150,000 m/s", "600,000 m/s", "900,000 m/s"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "Light travels at approximately 300,000 kilometers per second (186,000 miles per second)." },
                { id: 703, question: "What is the process of energy transfer between organisms?", options: ["Photosynthesis", "Food chain", "Respiration", "Diffusion"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A food chain shows how energy transfers from plants to herbivores to carnivores." },
                { id: 704, question: "What is the most abundant element in the universe?", options: ["Oxygen", "Nitrogen", "Hydrogen", "Helium"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Hydrogen is the most abundant element in the universe, making up about 75% of all matter." },
                { id: 705, question: "What is Newton's first law of motion?", options: ["F=ma", "Objects at rest stay at rest unless acted upon by force", "For every action there's a reaction", "Energy cannot be created"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Newton's First Law states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force." }
            ],
            medium: [
                { id: 706, question: "What is the pH of a neutral solution?", options: ["0", "7", "14", "10"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "A neutral pH is 7. Below 7 is acidic, above 7 is basic/alkaline." },
                { id: 707, question: "What is the process of DNA replication called?", options: ["Transcription", "Translation", "Mitosis", "Semi-conservative replication"], correctAnswer: 3, points: 10, difficulty: "medium", explanation: "DNA replication is semi-conservative, meaning each new DNA molecule has one original strand and one new strand." },
                { id: 708, question: "What is an isotope?", options: ["Atoms with same protons, different neutrons", "Different elements", "Same neutrons, different protons", "Charged atoms"], correctAnswer: 0, points: 10, difficulty: "medium", explanation: "Isotopes are atoms of the same element with different numbers of neutrons, therefore different mass numbers." }
            ]
        },
        history: {
            easy: [
                { id: 801, question: "In what year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The Berlin Wall fell on November 9, 1989, symbolizing the end of the Cold War." },
                { id: 802, question: "Who was the first President of South Africa?", options: ["F.W. de Klerk", "Nelson Mandela", "Thabo Mbeki", "Jacob Zuma"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Nelson Mandela was the first President of post-apartheid South Africa (1994-1999)." },
                { id: 803, question: "What year did the moon landing occur?", options: ["1965", "1967", "1969", "1971"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Apollo 11 landed on the moon on July 20, 1969. Neil Armstrong was the first person to walk on the moon." }
            ]
        }
    },

    grade12: {
        science: {
            hard: [
                { id: 901, question: "What is the Heisenberg Uncertainty Principle?", options: ["Energy and mass are equivalent", "Cannot simultaneously know position and momentum", "Light has both wave and particle properties", "Time dilation occurs at high speeds"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "The Heisenberg Uncertainty Principle states that you cannot simultaneously know both the exact position and exact momentum of a particle." },
                { id: 902, question: "What is entropy?", options: ["Energy", "Disorder in a system", "Temperature", "Pressure"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "Entropy is a measure of disorder or randomness in a system. The Second Law of Thermodynamics states that entropy always increases." },
                { id: 903, question: "What is the Planck constant?", options: ["6.63 × 10^-34", "3 × 10^8", "9.8", "1.6 × 10^-19"], correctAnswer: 0, points: 15, difficulty: "hard", explanation: "Planck's constant (h) is 6.626 × 10^-34 J·s and is fundamental to quantum mechanics." }
            ]
        }
    }
};

// Randomizer function to shuffle questions
quizzes.getRandomQuestions = function(gradeOrLevel, subject, difficulty, count = 5) {
    try {
        const questions = quizzes[gradeOrLevel]?.[subject]?.[difficulty] || [];
        
        // Shuffle array using Fisher-Yates algorithm
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        
        // Return requested count or all if fewer available
        return shuffled.slice(0, Math.min(count, shuffled.length));
    } catch (error) {
        console.error('Error getting random questions:', error);
        return [];
    }
};

// Get all questions from a category
quizzes.getAllQuestions = function(gradeOrLevel, subject, difficulty) {
    try {
        return quizzes[gradeOrLevel]?.[subject]?.[difficulty] || [];
    } catch (error) {
        console.error('Error getting questions:', error);
        return [];
    }
};

// Shuffle function for any array
quizzes.shuffleArray = function(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Shuffle options within questions while preserving correct answer
quizzes.shuffleQuestionOptions = function(questions) {
    return questions.map(q => {
        const options = [...q.options];
        const correctAnswer = options[q.correctAnswer];
        const shuffledOptions = quizzes.shuffleArray(options);
        const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
        
        return {
            ...q,
            options: shuffledOptions,
            correctAnswer: newCorrectIndex
        };
    });
};

// Get available grades
quizzes.getAvailableGrades = function() {
    return Object.keys(quizzes).filter(key => key !== 'getRandomQuestions' && key !== 'getAllQuestions' && key !== 'shuffleArray' && key !== 'shuffleQuestionOptions' && key !== 'getAvailableGrades');
};

// Get available subjects for a grade
quizzes.getAvailableSubjects = function(gradeOrLevel) {
    const grade = quizzes[gradeOrLevel];
    if (!grade) return [];
    return Object.keys(grade).filter(key => typeof grade[key] === 'object' && grade[key].easy);
};

module.exports = quizzes;
