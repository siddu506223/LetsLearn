// Comprehensive Quiz Questions for Grades K-12
// Subjects: Reading, Math, Writing, Science, Social Studies, History
// Difficulties: Easy, Medium, Hard

const quizzesExtended = {
    kindergarten: {
        reading: {
            easy: [
                { id: 1, question: "What is the first letter of the alphabet?", options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, difficulty: "easy" },
                { id: 2, question: "Which word starts with 'C'?", options: ["Apple", "Cat", "Dog", "Bird"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 3, question: "What sound does a dog make?", options: ["Meow", "Woof", "Moo", "Quack"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 4, question: "What letter comes after 'M'?", options: ["L", "N", "O", "P"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 5, question: "Which animal says 'Moo'?", options: ["Duck", "Cow", "Sheep", "Pig"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 6, question: "What color is the sky?", options: ["Green", "Blue", "Red", "Yellow"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 7, question: "Which word starts with 'S'?", options: ["Apple", "Dog", "Sun", "Fish"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 8, question: "What sound does a cat make?", options: ["Woof", "Moo", "Meow", "Quack"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 9, question: "Which animal says 'Quack'?", options: ["Chicken", "Duck", "Frog", "Goose"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 10, question: "What letter is at the end of the alphabet?", options: ["X", "Y", "Z", "W"], correctAnswer: 2, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 11, question: "Which word rhymes with 'cat'?", options: ["Dog", "Hat", "Bird", "Fish"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 12, question: "How many letters are in the word 'book'?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 13, question: "Which sentence is correct?", options: ["the dog run", "The dog runs", "dog the runs", "runs dog the"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 14, question: "Which word rhymes with 'sun'?", options: ["Moon", "Run", "Star", "Night"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 15, question: "What is the opposite of 'big'?", options: ["Large", "Small", "Tall", "Wide"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 16, question: "How many vowels are in 'apple'?", options: ["1", "2", "3", "4"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 17, question: "Which word rhymes with 'tree'?", options: ["House", "Sea", "Stone", "Water"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 18, question: "What is the first word in 'The cat sat'?", options: ["Cat", "The", "Sat", "On"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 19, question: "Which word comes first in the alphabet?", options: ["Zebra", "Apple", "Moon", "Sun"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 20, question: "What letter does 'Fish' start with?", options: ["S", "F", "B", "D"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 21, question: "What is a synonym for 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 22, question: "Which word is a noun?", options: ["Run", "Jump", "Happy", "Table"], correctAnswer: 3, points: 15, difficulty: "hard" },
                { id: 23, question: "What is a synonym for 'small'?", options: ["Big", "Tiny", "Tall", "Long"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 24, question: "Which is a verb?", options: ["Dog", "Happy", "Run", "House"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 25, question: "What is the opposite of 'start'?", options: ["Begin", "End", "Go", "Stop"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        },
        math: {
            easy: [
                { id: 26, question: "What is 1 + 1?", options: ["1", "2", "3", "4"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 27, question: "What is 2 + 2?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 28, question: "How many fingers do you have on one hand?", options: ["3", "4", "5", "6"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 29, question: "What is 3 + 1?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 30, question: "What is 2 + 1?", options: ["1", "2", "3", "4"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 31, question: "How many wheels does a car have?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 32, question: "What is 5 - 2?", options: ["1", "2", "3", "4"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 33, question: "What is 1 + 2?", options: ["1", "2", "3", "4"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 34, question: "How many legs does a dog have?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 35, question: "What is 0 + 5?", options: ["1", "3", "5", "7"], correctAnswer: 2, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 36, question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 37, question: "What is 10 - 4?", options: ["4", "5", "6", "7"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 38, question: "If you have 3 apples and get 2 more, how many do you have?", options: ["3", "4", "5", "6"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 39, question: "What is 6 + 2?", options: ["6", "7", "8", "9"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 40, question: "What is 8 - 3?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 41, question: "If you have 7 toys and lose 2, how many are left?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 42, question: "What is 4 + 4?", options: ["6", "7", "8", "9"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 43, question: "What is 9 - 5?", options: ["3", "4", "5", "6"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 44, question: "What is 3 + 3 + 3?", options: ["7", "8", "9", "10"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 45, question: "What is 10 - 6?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 46, question: "What is 12 - 7?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 47, question: "If a toy costs 8 and you have 15, how much change do you get?", options: ["5", "6", "7", "8"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 48, question: "What is 6 + 6?", options: ["10", "11", "12", "13"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 49, question: "What is 15 - 8?", options: ["5", "6", "7", "8"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 50, question: "If you have 10 candies and eat 3, how many remain?", options: ["5", "6", "7", "8"], correctAnswer: 2, points: 15, difficulty: "hard" }
            ]
        }
    },
    "1st grade": {
        reading: {
            easy: [
                { id: 101, question: "What does 'CVC' stand for in phonics?", options: ["Consonant-Vowel-Consonant", "Cat-Very-Cold", "Cute-Video-Car", "Can-Van-Cup"], correctAnswer: 0, points: 5, difficulty: "easy" },
                { id: 102, question: "Which is a consonant blend?", options: ["at", "cr", "ed", "or"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 103, question: "What is a compound word?", options: ["A long word", "Two words put together", "A word with vowels", "A noun and verb"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 104, question: "Which word is a compound word?", options: ["Running", "Rainbow", "Happy", "Green"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 105, question: "What is the past tense of 'walk'?", options: ["Walks", "Walking", "Walked", "Will walk"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 106, question: "Which sentence makes sense?", options: ["Dog the barks", "The dog barks", "Barks dog the", "Dog barks the"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 107, question: "What does 'scamper' mean?", options: ["To sleep", "To run quickly", "To jump high", "To walk slowly"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 108, question: "Which is a long vowel sound?", options: ["a in cat", "e in bed", "i in like", "o in hot"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 109, question: "What is a vowel?", options: ["b, c, d", "a, e, i, o, u", "m, n, p", "f, g, h"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 110, question: "Which word rhymes with 'make'?", options: ["Milk", "Bake", "Mail", "Mop"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 111, question: "What is a digraph?", options: ["Two letters making one sound", "A long word", "A verb form", "A punctuation mark"], correctAnswer: 0, points: 10, difficulty: "medium" },
                { id: 112, question: "Which words have the same short vowel sound?", options: ["Cat, hate", "Dog, on", "Bee, see", "Run, fun"], correctAnswer: 3, points: 10, difficulty: "medium" },
                { id: 113, question: "What do you call the main character in a story?", options: ["Setting", "Protagonist", "Plot", "Theme"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 114, question: "Which sentence uses correct verb tense?", options: ["He go to school", "She goed yesterday", "They go every day", "I goes often"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 115, question: "What is the beginning of a story called?", options: ["Middle", "End", "Introduction", "Conclusion"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 116, question: "Which word has a silent 'k'?", options: ["Kite", "King", "Knee", "Keep"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 117, question: "What is a contraction?", options: ["A long word", "Two words joined with an apostrophe", "A rhyming word", "A verb"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 118, question: "Which is a contraction?", options: ["Could", "Cannot", "Can't", "Can"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 119, question: "What is the opposite of 'noisy'?", options: ["Loud", "Quiet", "Soft", "Silent"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 120, question: "Which sentence uses an adjective?", options: ["The cat ran", "The big cat", "Cat running", "The cat is"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 121, question: "What is a prefix?", options: ["A suffix", "Letters added at the beginning", "A verb", "An adjective"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 122, question: "What does the prefix 're-' mean?", options: ["Not", "Before", "Again", "Full of"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 123, question: "What is a suffix?", options: ["Beginning of a word", "End of a word", "Middle part", "A type of sentence"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 124, question: "What does the suffix '-ing' mean?", options: ["In the past", "Right now", "Will happen", "Already done"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 125, question: "Which is a complete sentence?", options: ["Running fast", "The boy ran", "In the park", "Very happy"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        },
        math: {
            easy: [
                { id: 126, question: "What is 10 + 5?", options: ["10", "12", "15", "20"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 127, question: "What is 20 - 5?", options: ["10", "15", "20", "25"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 128, question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 129, question: "What is 3 × 2?", options: ["5", "6", "7", "8"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 130, question: "What is 12 ÷ 3?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 131, question: "How many sides does a square have?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 132, question: "What is 7 + 8?", options: ["14", "15", "16", "17"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 133, question: "What is 20 - 10?", options: ["5", "10", "15", "20"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 134, question: "What is 5 × 3?", options: ["10", "15", "20", "25"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 135, question: "What is 18 ÷ 2?", options: ["6", "7", "8", "9"], correctAnswer: 3, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 136, question: "What is 25 + 15?", options: ["35", "40", "45", "50"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 137, question: "What is 50 - 23?", options: ["25", "26", "27", "28"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 138, question: "If one apple costs $2, how much do 4 apples cost?", options: ["$4", "$6", "$8", "$10"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 139, question: "What is the place value of 5 in 57?", options: ["5", "50", "500", "5000"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 140, question: "How many inches in a foot?", options: ["6", "10", "12", "24"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 141, question: "What shape has 5 sides?", options: ["Triangle", "Square", "Pentagon", "Hexagon"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 142, question: "What is 6 × 7?", options: ["40", "42", "44", "46"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 143, question: "What is 36 ÷ 4?", options: ["7", "8", "9", "10"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 144, question: "What is double of 15?", options: ["25", "30", "35", "40"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 145, question: "What is half of 40?", options: ["15", "20", "25", "30"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 146, question: "What is 125 + 75?", options: ["190", "200", "210", "220"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 147, question: "What is 100 - 37?", options: ["60", "63", "65", "67"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 148, question: "What is 8 × 9?", options: ["70", "72", "74", "76"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 149, question: "What is 72 ÷ 8?", options: ["7", "8", "9", "10"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 150, question: "If you have $50 and spend $18, how much is left?", options: ["30", "32", "34", "36"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        }
    },
    "2nd grade": {
        reading: {
            easy: [
                { id: 201, question: "What is a noun?", options: ["A word that describes", "A person, place, or thing", "A word that shows action", "A word that connects"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 202, question: "Which is a noun?", options: ["Run", "Happy", "Book", "Slowly"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 203, question: "What is a verb?", options: ["A person or place", "A word that shows action", "A describing word", "A connecting word"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 204, question: "Which is a verb?", options: ["Happy", "Book", "Jump", "Beautiful"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 205, question: "What is an adjective?", options: ["A person, place, or thing", "A word showing action", "A word that describes", "A connecting word"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 206, question: "Which is an adjective?", options: ["Run", "Happy", "Jump", "Book"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 207, question: "What does 'main idea' mean?", options: ["The smallest idea", "The most important idea", "The last idea", "The first word"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 208, question: "What is a detail in a story?", options: ["The whole story", "Small information that supports the main idea", "The ending", "The title"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 209, question: "What is a simile?", options: ["A repeated word", "A comparison using 'like' or 'as'", "A noun or verb", "A type of sentence"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 210, question: "Which is a simile?", options: ["The sun is bright", "As quiet as a mouse", "The sky is blue", "I like cats"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 211, question: "What is a metaphor?", options: ["A comparison with 'like'", "A direct comparison without 'like'", "A noun", "A verb"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 212, question: "Which is a metaphor?", options: ["As fast as a cheetah", "The cheetah is fast", "That cat is a lightning bolt", "The cat runs"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 213, question: "What is a theme?", options: ["A character", "The main lesson or message", "A setting", "A plot"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 214, question: "What does 'predict' mean?", options: ["To remember", "To guess what will happen next", "To explain", "To describe"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 215, question: "What is the 'climax' of a story?", options: ["The beginning", "The most exciting part", "The ending", "The setting"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 216, question: "What does 'infer' mean?", options: ["To read aloud", "To skip pages", "To figure out something not directly stated", "To summarize"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 217, question: "Which sentence has correct punctuation?", options: ["What is your name.", "What is your name?", "What is your name!", "What is your name"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 218, question: "What punctuation ends an exclamatory sentence?", options: ["Period", "Question mark", "Exclamation mark", "Comma"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 219, question: "What is a common noun?", options: ["A specific person or place", "A general person, place, or thing", "A describing word", "An action word"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 220, question: "What is a proper noun?", options: ["A general word", "A specific person, place, or thing (capitalized)", "A verb", "An adjective"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 221, question: "What is an antonym?", options: ["A word that sounds the same", "A word that means the opposite", "A word that means the same", "A type of noun"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 222, question: "What is a synonym?", options: ["A word that means the opposite", "A word that means the same or similar", "A verb", "An adjective"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 223, question: "Which words are antonyms?", options: ["Happy-Joyful", "Big-Large", "Happy-Sad", "Run-Sprint"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 224, question: "What is personification?", options: ["A comparison", "Giving human qualities to things", "A type of noun", "A verb form"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 225, question: "Which sentence shows personification?", options: ["The cat ran", "The wind danced", "The sky is blue", "The book is heavy"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        },
        math: {
            easy: [
                { id: 226, question: "What is 35 + 24?", options: ["55", "58", "59", "60"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 227, question: "What is 50 - 18?", options: ["30", "32", "34", "36"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 228, question: "What is 7 × 8?", options: ["54", "56", "58", "60"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 229, question: "What is 48 ÷ 6?", options: ["6", "7", "8", "9"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 230, question: "How many centimeters in a meter?", options: ["10", "50", "100", "1000"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 231, question: "What is the area of a square with sides of 5?", options: ["10", "15", "20", "25"], correctAnswer: 3, points: 5, difficulty: "easy" },
                { id: 232, question: "What is 9 × 6?", options: ["50", "52", "54", "56"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 233, question: "What is 100 - 37?", options: ["60", "63", "65", "67"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 234, question: "What is 15 × 3?", options: ["40", "45", "50", "55"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 235, question: "What is 120 ÷ 10?", options: ["10", "11", "12", "13"], correctAnswer: 2, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 236, question: "What is 145 + 237?", options: ["380", "382", "384", "386"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 237, question: "What is 200 - 85?", options: ["110", "115", "120", "125"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 238, question: "What is 12 × 9?", options: ["100", "105", "108", "110"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 239, question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 240, question: "If a book costs $15 and you buy 3, how much total?", options: ["$40", "$45", "$50", "$55"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 241, question: "What fraction is half?", options: ["1/2", "1/3", "1/4", "1/5"], correctAnswer: 0, points: 10, difficulty: "medium" },
                { id: 242, question: "What is 1/2 of 20?", options: ["8", "9", "10", "11"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 243, question: "What is 1/3 of 12?", options: ["3", "4", "5", "6"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 244, question: "What is the perimeter of a square with sides of 6?", options: ["12", "18", "24", "36"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 245, question: "What is 25 × 4?", options: ["90", "95", "100", "105"], correctAnswer: 2, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 246, question: "What is 234 + 567?", options: ["800", "801", "802", "803"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 247, question: "What is 500 - 234?", options: ["260", "265", "266", "270"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 248, question: "What is 15 × 15?", options: ["220", "225", "230", "235"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 249, question: "What is 256 ÷ 16?", options: ["15", "16", "17", "18"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 250, question: "If you have $100 and spend $37 on books and $28 on toys, how much left?", options: ["30", "32", "35", "38"], correctAnswer: 2, points: 15, difficulty: "hard" }
            ]
        },
        science: {
            easy: [
                { id: 251, question: "What do plants need to grow?", options: ["Sunlight", "Water", "Soil", "All of the above"], correctAnswer: 3, points: 5, difficulty: "easy" },
                { id: 252, question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 253, question: "How many legs does an insect have?", options: ["4", "6", "8", "10"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 254, question: "What do animals need to survive?", options: ["Food", "Water", "Shelter", "All of the above"], correctAnswer: 3, points: 5, difficulty: "easy" },
                { id: 255, question: "What is the process of water turning to vapor?", options: ["Freezing", "Evaporation", "Condensation", "Melting"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 256, question: "Which is the main gas in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 257, question: "What is a mammal?", options: ["An animal that lays eggs", "An animal that feeds milk to its young", "An animal that lives in water", "An animal that hibernates"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 258, question: "How many bones are in the human body?", options: ["150", "206", "300", "400"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 259, question: "What is photosynthesis?", options: ["Process of plants making food", "Process of breathing", "Process of digestion", "Process of growth"], correctAnswer: 0, points: 10, difficulty: "medium" },
                { id: 260, question: "Which scientist discovered gravity?", options: ["Albert Einstein", "Isaac Newton", "Marie Curie", "Galileo"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 261, question: "What is the pH scale used to measure?", options: ["Temperature", "Acidity", "Density", "Velocity"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 262, question: "Which organelle produces energy in a cell?", options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 263, question: "What is the speed of light?", options: ["100,000 km/s", "300,000 km/s", "500,000 km/s", "1,000,000 km/s"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 264, question: "Which of the following is a renewable energy source?", options: ["Coal", "Oil", "Solar", "Natural gas"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 265, question: "What is the process of an organism changing over generations?", options: ["Reproduction", "Evolution", "Adaptation", "Mutation"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        }
    },
    "3rd grade": {
        math: {
            easy: [
                { id: 300, question: "What is 45 + 32?", options: ["75", "76", "77", "78"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 301, question: "What is 100 - 25?", options: ["70", "75", "80", "85"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 302, question: "What is 12 × 5?", options: ["50", "55", "60", "65"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 303, question: "What is 60 ÷ 5?", options: ["10", "12", "15", "20"], correctAnswer: 0, points: 5, difficulty: "easy" },
                { id: 304, question: "How many inches in 3 feet?", options: ["30", "36", "42", "48"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 305, question: "What is 234 + 456?", options: ["680", "690", "700", "710"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 306, question: "What is 500 - 123?", options: ["375", "376", "377", "378"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 307, question: "What is 23 × 4?", options: ["88", "90", "92", "94"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 308, question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 309, question: "What is 1/4 of 20?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 310, question: "What is 567 × 8?", options: ["4536", "4537", "4538", "4539"], correctAnswer: 0, points: 15, difficulty: "hard" },
                { id: 311, question: "What is 1000 ÷ 8?", options: ["120", "125", "130", "135"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 312, question: "What is 3/5 + 1/5?", options: ["3/5", "4/5", "5/5", "1/1"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 313, question: "What is the area of a rectangle 10 units long and 5 units wide?", options: ["30", "40", "50", "60"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 314, question: "What is 45% of 100?", options: ["35", "40", "45", "50"], correctAnswer: 2, points: 15, difficulty: "hard" }
            ]
        }
    },
    "board_games": {
        logic: [
            { id: 401, name: "Chess", description: "The ultimate game of strategy and planning", points: 50 },
            { id: 402, name: "Chinese Checkers", description: "Fast-paced game of movement and positioning", points: 40 },
            { id: 403, name: "Checkers", description: "Classic game of jumping and capturing", points: 35 },
            { id: 404, name: "Connect Four", description: "Game of pattern recognition and blocking", points: 30 },
            { id: 405, name: "Sudoku", description: "Logic puzzle game with numbers", points: 25 }
        ]
    }
};

module.exports = quizzesExtended;
