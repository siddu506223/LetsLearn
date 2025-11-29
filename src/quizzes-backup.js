// Quiz questions and learning materials for Grades K-12
// Comprehensive educational content with board/logic games

const quizzes = {
    // KINDERGARTEN QUIZZES
    kindergarten: {
        reading: {
        easy: [
            { id: 1, question: "What is the first letter of the alphabet?", options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "A is the first letter of the English alphabet. It comes before all other letters." },
            { id: 2, question: "Which word starts with 'C'?", options: ["Apple", "Cat", "Dog", "Bird"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Cat starts with the letter 'C'. The 'C' makes a hard sound at the beginning of the word." },
            { id: 3, question: "What sound does a dog make?", options: ["Meow", "Woof", "Moo", "Quack"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Dogs say 'Woof' or 'Woof-woof'. Cats say 'Meow', cows say 'Moo', and ducks say 'Quack'." },
            { id: 4, question: "What letter comes after 'M'?", options: ["L", "N", "O", "P"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The letter N comes right after M in the alphabet: ...L, M, N, O..." },
            { id: 5, question: "Which animal says 'Moo'?", options: ["Duck", "Cow", "Sheep", "Pig"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Cows say 'Moo'. This is the sound farmers hear on farms. Sheep say 'Baa', pigs say 'Oink', and ducks say 'Quack'." },
            { id: 6, question: "What color is the sky?", options: ["Green", "Blue", "Red", "Yellow"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The sky is blue on a clear day. The blue color comes from the sunlight scattering in the atmosphere." },
            { id: 7, question: "Which word starts with 'S'?", options: ["Apple", "Dog", "Sun", "Fish"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Sun starts with the letter 'S'. The 'S' makes a hissing sound at the beginning of words like: Sam, sit, sun." },
            { id: 8, question: "What sound does a cat make?", options: ["Woof", "Moo", "Meow", "Quack"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Cats say 'Meow'. This is how cats communicate with humans and other cats." },
            { id: 9, question: "Which animal says 'Quack'?", options: ["Chicken", "Duck", "Frog", "Goose"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Ducks say 'Quack'. You often hear this sound near ponds and lakes where ducks swim." },
            { id: 10, question: "What letter is at the end of the alphabet?", options: ["X", "Y", "Z", "W"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Z is the last letter of the English alphabet. It ends the sequence: ...X, Y, Z." },
            { id: 11, question: "What color is grass?", options: ["Brown", "Green", "Yellow", "Blue"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Grass is green. Most plants and trees are green because of a chemical called chlorophyll." },
            { id: 12, question: "Which word starts with 'B'?", options: ["Apple", "Ball", "Dog", "Fish"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Ball starts with the letter 'B'. The 'B' makes a soft sound at the beginning like 'bbb'." },
            { id: 13, question: "What sound does a duck make?", options: ["Moo", "Woof", "Quack", "Baa"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Ducks say 'Quack'. You hear this sound when ducks are near water or in ponds." },
            { id: 14, question: "Which animal is big and gray?", options: ["Mouse", "Elephant", "Bird", "Fish"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "An elephant is big and gray. Elephants are the largest land animals and live in Africa and Asia." },
            { id: 15, question: "What color is snow?", options: ["Gray", "Blue", "White", "Black"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Snow is white. It falls from clouds in winter and covers the ground with a white blanket." },
            { id: 16, question: "Which word starts with 'T'?", options: ["Bird", "House", "Tiger", "Fish"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Tiger starts with the letter 'T'. The 'T' makes a 'tuh' sound at the beginning of words." },
            { id: 17, question: "What sound does a sheep make?", options: ["Woof", "Baa", "Moo", "Quack"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Sheep say 'Baa' or 'Baa-baa'. Farmers hear this sound from their sheep on the farm." },
            { id: 18, question: "Which letter comes before 'M'?", options: ["K", "L", "N", "O"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The letter L comes before M in the alphabet: ...J, K, L, M..." },
            { id: 19, question: "What color is an apple?", options: ["Yellow", "Green", "Red", "Orange"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Many apples are red, but some are green or yellow. Red apples are a popular color for apples." },
            { id: 20, question: "Which word starts with 'P'?", options: ["Zebra", "Pig", "Dog", "Cat"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Pig starts with the letter 'P'. The 'P' makes a 'puh' sound like a puff of air." },
            { id: 21, question: "What sound does a pig make?", options: ["Oink", "Moo", "Baa", "Cluck"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "Pigs say 'Oink' or 'Oink-oink'. This is the sound that helps farmers know where their pigs are." },
            { id: 22, question: "Which letter comes after 'T'?", options: ["S", "U", "V", "W"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The letter U comes after T in the alphabet: ...R, S, T, U..." },
            { id: 23, question: "What color is the sun?", options: ["White", "Yellow", "Orange", "Red"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The sun appears yellow in the sky. It shines bright and warm, giving us light and heat." },
            { id: 24, question: "Which word starts with 'H'?", options: ["Dog", "House", "Fish", "Bird"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "House starts with the letter 'H'. The 'H' makes an 'hhh' breathing sound at the beginning." },
            { id: 25, question: "What sound does a cow make?", options: ["Woof", "Moo", "Baa", "Quack"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Cows say 'Moo'. This is a long, deep sound that you can hear from far away on a farm." },
            { id: 26, question: "How many letters are in 'dog'?", options: ["1", "2", "3", "4"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The word 'dog' has 3 letters: d-o-g. Count each letter separately." },
            { id: 27, question: "Which word starts with 'F'?", options: ["Dog", "Cat", "Fish", "Bird"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Fish starts with the letter 'F'. The 'F' makes a soft 'fff' sound like air coming out." },
            { id: 28, question: "What color is a banana?", options: ["Red", "Green", "Yellow", "Brown"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Bananas are yellow. When ripe, they turn from green to yellow. When very ripe, they get brown spots." },
            { id: 29, question: "Which letter comes after 'B'?", options: ["A", "C", "D", "E"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The letter C comes after B in the alphabet: ...A, B, C, D..." }

            { id: 11, question: "Which word rhymes with 'cat'?", options: ["Dog", "Hat", "Bird", "Fish"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Hat rhymes with cat because they both end with the '-at' sound. Dog ends with '-og', bird with '-ird', and fish with '-ish'." },
            { id: 12, question: "How many letters are in the word 'book'?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "The word 'book' has 4 letters: b-o-o-k. Count each letter carefully!" },
            { id: 13, question: "Which sentence is correct?", options: ["the dog run", "The dog runs", "dog the runs", "runs dog the"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Sentences start with a capital letter. The correct word order is subject (dog) then verb (runs). 'The dog runs' is the correct sentence." },
            { id: 14, question: "Which word rhymes with 'sun'?", options: ["Moon", "Run", "Star", "Night"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Run rhymes with sun because they both end with the '-un' sound. Moon ends with '-oon', star with '-ar', and night with '-ight'." },
            { id: 15, question: "What is the opposite of 'big'?", options: ["Large", "Small", "Tall", "Wide"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Small is the opposite of big. Large means big, tall means high, and wide means broad - none are opposite to big." },
            { id: 16, question: "How many vowels are in 'apple'?", options: ["1", "2", "3", "4"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Apple has 2 vowels: 'a' at the beginning and 'e' at the end. Vowels are A, E, I, O, U." },
            { id: 17, question: "Which word rhymes with 'tree'?", options: ["House", "Sea", "Stone", "Water"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Sea rhymes with tree because they both end with the '-ee' sound. House ends with '-ouse', stone with '-one', water with '-er'." },
            { id: 18, question: "What is the first word in 'The cat sat'?", options: ["Cat", "The", "Sat", "On"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "'The' is the first word. Sentences read from left to right, so the first word you read is 'The'." },
            { id: 19, question: "Which word comes first in the alphabet?", options: ["Zebra", "Apple", "Moon", "Sun"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Apple comes first alphabetically because it starts with 'A'. The alphabet goes A, B, C... so words starting with 'A' come first." },
            { id: 20, question: "What letter does 'Fish' start with?", options: ["S", "F", "B", "D"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Fish starts with the letter 'F'. The 'F' makes a soft hissing sound like 'fff'." }
        ],
        hard: [
            { id: 21, question: "What is a synonym for 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "Joyful is a synonym (similar word) for happy. Both words describe a feeling of joy or pleasure. Sad, angry, and tired are different emotions." },
            { id: 22, question: "Which word is a noun?", options: ["Run", "Jump", "Happy", "Table"], correctAnswer: 3, points: 15, difficulty: "hard", explanation: "Table is a noun because it's a thing you can see and touch. Nouns are people, places, or things. Run and jump are verbs (actions). Happy is an adjective (describes something)." },
            { id: 23, question: "What is a synonym for 'small'?", options: ["Big", "Tiny", "Tall", "Long"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "Tiny is a synonym for small. Both describe something with a small size. Big means the opposite. Tall and long describe different dimensions." },
            { id: 24, question: "Which is a verb?", options: ["Dog", "Happy", "Run", "House"], correctAnswer: 2, points: 15, difficulty: "hard", explanation: "Run is a verb because it's an action word. Verbs show what someone or something does. Dog and house are nouns. Happy is an adjective." },
            { id: 25, question: "What is the opposite of 'start'?", options: ["Begin", "End", "Go", "Stop"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "End is the opposite of start. Begin is similar to start. Go and stop are different words. Start means to begin, end means to finish." }
        ]
    },
    math: {
        easy: [
            { id: 26, question: "What is 1 + 1?", options: ["1", "2", "3", "4"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "1 + 1 = 2. When you add 1 and 1 together, you get 2. Try counting on your fingers!" },
            { id: 27, question: "What is 2 + 2?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "2 + 2 = 4. If you have 2 apples and get 2 more, you have 4 apples total." },
            { id: 28, question: "How many fingers do you have on one hand?", options: ["3", "4", "5", "6"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "You have 5 fingers on one hand: thumb, index, middle, ring, and pinky finger." },
            { id: 29, question: "What is 3 + 1?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "3 + 1 = 4. Count on your fingers: start at 3 and add 1 more to get 4." },
            { id: 30, question: "What is 2 + 1?", options: ["1", "2", "3", "4"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "2 + 1 = 3. If you have 2 coins and get 1 more, you have 3 coins." },
            { id: 31, question: "How many wheels does a car have?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "A car has 4 wheels: one on each corner (front-left, front-right, back-left, back-right)." },
            { id: 32, question: "What is 5 - 2?", options: ["1", "2", "3", "4"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "5 - 2 = 3. If you have 5 toys and take away 2, you have 3 left. Use your fingers to count down." },
            { id: 33, question: "What is 1 + 2?", options: ["1", "2", "3", "4"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "1 + 2 = 3. Start at 1 and add 2 more: 1, 2, 3." },
            { id: 34, question: "How many legs does a dog have?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "A dog has 4 legs: front-left, front-right, back-left, and back-right." },
            { id: 35, question: "What is 0 + 5?", options: ["1", "3", "5", "7"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "0 + 5 = 5. When you start with 0 (nothing) and add 5, you get 5." },
            { id: 36, question: "What is 4 + 1?", options: ["3", "4", "5", "6"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "4 + 1 = 5. If you have 4 things and get 1 more, you have 5 total." },
            { id: 37, question: "What is 3 + 0?", options: ["0", "2", "3", "4"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "3 + 0 = 3. When you add 0 (nothing), the number stays the same." },
            { id: 38, question: "What is 6 - 1?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "6 - 1 = 5. If you have 6 items and remove 1, you have 5 left." },
            { id: 39, question: "What is 2 + 3?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "2 + 3 = 5. Start at 2 and count up 3: 2... 3, 4, 5." },
            { id: 40, question: "How many eyes do you have?", options: ["1", "2", "3", "4"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "You have 2 eyes: one on the left side of your face and one on the right side." },
            { id: 41, question: "What is 5 + 1?", options: ["4", "5", "6", "7"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "5 + 1 = 6. If you have 5 candies and get 1 more, you have 6 candies." },
            { id: 42, question: "What is 7 - 1?", options: ["5", "6", "7", "8"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "7 - 1 = 6. Take away 1 from 7 and you're left with 6." },
            { id: 43, question: "What is 4 + 2?", options: ["5", "6", "7", "8"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "4 + 2 = 6. Start at 4 and count up 2 more: 4... 5, 6." },
            { id: 44, question: "What is 8 - 1?", options: ["6", "7", "8", "9"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "8 - 1 = 7. Remove 1 from 8 and you get 7." },
            { id: 45, question: "What is 3 + 2?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "3 + 2 = 5. Count: 3... 4, 5 (counting up 2 from 3)." },
            { id: 46, question: "What is 9 - 1?", options: ["7", "8", "9", "10"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "9 - 1 = 8. Take 1 away from 9 and you have 8 left." },
            { id: 47, question: "What is 5 + 2?", options: ["6", "7", "8", "9"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "5 + 2 = 7. Start at 5 and add 2: 5... 6, 7." },
            { id: 48, question: "What is 10 - 1?", options: ["8", "9", "10", "11"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "10 - 1 = 9. Remove 1 from 10 and you get 9." },
            { id: 49, question: "What is 1 + 3?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "1 + 3 = 4. Start at 1 and count up 3: 1... 2, 3, 4." },
            { id: 50, question: "What is 6 - 2?", options: ["3", "4", "5", "6"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "6 - 2 = 4. Take away 2 from 6 and you have 4 left." },
            { id: 51, question: "How many toes do you have?", options: ["5", "8", "10", "12"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "You have 10 toes total: 5 on each foot." },
            { id: 52, question: "What is 2 + 4?", options: ["5", "6", "7", "8"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "2 + 4 = 6. Start at 2 and count up 4: 2... 3, 4, 5, 6." },
            { id: 53, question: "What is 7 - 2?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "7 - 2 = 5. Remove 2 from 7 and you're left with 5." },
            { id: 54, question: "What is 3 + 4?", options: ["6", "7", "8", "9"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "3 + 4 = 7. Start at 3 and count up 4: 3... 4, 5, 6, 7." }

            { id: 36, question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "5 + 3 = 8. Start at 5 and count up 3 more: 5... 6, 7, 8." },
            { id: 37, question: "What is 10 - 4?", options: ["4", "5", "6", "7"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "10 - 4 = 6. If you have 10 items and take away 4, you have 6 left." },
            { id: 38, question: "If you have 3 apples and get 2 more, how many do you have?", options: ["3", "4", "5", "6"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "3 + 2 = 5. You had 3, then got 2 more, so you now have 5 apples total." },
            { id: 39, question: "What is 6 + 2?", options: ["6", "7", "8", "9"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "6 + 2 = 8. Start at 6 and count up 2 more: 6... 7, 8." },
            { id: 40, question: "What is 8 - 3?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "8 - 3 = 5. Count backwards from 8: 8... 7, 6, 5. That's 3 steps back." },
            { id: 41, question: "If you have 7 toys and lose 2, how many are left?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "7 - 2 = 5. You had 7 toys and lost 2, so 5 toys remain." },
            { id: 42, question: "What is 4 + 4?", options: ["6", "7", "8", "9"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "4 + 4 = 8. This is like having 4 on each side, which makes 8 total." },
            { id: 43, question: "What is 9 - 5?", options: ["3", "4", "5", "6"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "9 - 5 = 4. Count backwards from 9 five times: 9, 8, 7, 6, 5, 4." },
            { id: 44, question: "What is 3 + 3 + 3?", options: ["7", "8", "9", "10"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "3 + 3 + 3 = 9. Add them step by step: 3 + 3 = 6, then 6 + 3 = 9." },
            { id: 45, question: "What is 10 - 6?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "10 - 6 = 4. If you have 10 and take away 6, you have 4 left." }
        ],
        hard: [
            { id: 46, question: "What is 12 - 7?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "12 - 7 = 5. Count backwards from 12: 12, 11, 10, 9, 8, 7. That's 5 steps back." },
            { id: 47, question: "If a toy costs 8 and you have 15, how much change do you get?", options: ["5", "6", "7", "8"], correctAnswer: 2, points: 15, difficulty: "hard", explanation: "15 - 8 = 7. If you have 15 and spend 8, you get 7 change back." },
            { id: 48, question: "What is 6 + 6?", options: ["10", "11", "12", "13"], correctAnswer: 2, points: 15, difficulty: "hard", explanation: "6 + 6 = 12. This is double 6. You can also think of it as 6 fingers on each hand = 12 total." },
            { id: 49, question: "What is 15 - 8?", options: ["5", "6", "7", "8"], correctAnswer: 2, points: 15, difficulty: "hard", explanation: "15 - 8 = 7. Start at 15 and count backwards 8 times to get 7." },
            { id: 50, question: "If you have 10 candies and eat 3, how many remain?", options: ["5", "6", "7", "8"], correctAnswer: 2, points: 15, difficulty: "hard", explanation: "10 - 3 = 7. You had 10 candies and ate 3, so 7 candies are left." }
        ]
    },
    writing: {
        easy: [
            { id: 51, question: "Which letter comes after 'A'?", options: ["B", "C", "D", "E"], correctAnswer: 0, points: 5, difficulty: "easy" },
            { id: 52, question: "How do you write the number 3?", options: ["Too", "Three", "3", "Tree"], correctAnswer: 2, points: 5, difficulty: "easy" },
            { id: 53, question: "Which is a capital letter?", options: ["a", "b", "C", "d"], correctAnswer: 2, points: 5, difficulty: "easy" },
            { id: 54, question: "Which letter comes after 'D'?", options: ["C", "E", "F", "G"], correctAnswer: 1, points: 5, difficulty: "easy" },
            { id: 55, question: "How do you write the number 1?", options: ["Won", "One", "1", "Uno"], correctAnswer: 2, points: 5, difficulty: "easy" },
            { id: 56, question: "Which is lowercase 'a'?", options: ["A", "a", "À", "Á"], correctAnswer: 1, points: 5, difficulty: "easy" },
            { id: 57, question: "How do you write the number 5?", options: ["Fiv", "Five", "5", "Cinco"], correctAnswer: 2, points: 5, difficulty: "easy" },
            { id: 58, question: "Which letter comes after 'Z'?", options: ["A", "Nothing", "B", "X"], correctAnswer: 1, points: 5, difficulty: "easy" },
            { id: 59, question: "How do you write the number 2?", options: ["Too", "Two", "2", "To"], correctAnswer: 2, points: 5, difficulty: "easy" },
            { id: 60, question: "Which is uppercase 'B'?", options: ["b", "B", "b", "ß"], correctAnswer: 1, points: 5, difficulty: "easy" }
        ],
        medium: [
            { id: 61, question: "Which word is spelled correctly?", options: ["Katten", "Catt", "Cat", "Katt"], correctAnswer: 2, points: 10, difficulty: "medium" },
            { id: 62, question: "A sentence should start with a...", options: ["Lowercase letter", "Capital letter", "Number", "Symbol"], correctAnswer: 1, points: 10, difficulty: "medium" },
            { id: 63, question: "Which sentence has correct punctuation?", options: ["The dog runs", "the dog runs.", "The dog runs.", "The dog runs!"], correctAnswer: 2, points: 10, difficulty: "medium" },
            { id: 64, question: "How do you spell 'dog'?", options: ["Dag", "Dug", "Dog", "Dob"], correctAnswer: 2, points: 10, difficulty: "medium" },
            { id: 65, question: "Which is spelled correctly?", options: ["House", "Hous", "Huose", "Hose"], correctAnswer: 0, points: 10, difficulty: "medium" },
            { id: 66, question: "A question ends with?", options: ["Period", "Question mark", "Comma", "Exclamation"], correctAnswer: 1, points: 10, difficulty: "medium" },
            { id: 67, question: "How do you spell 'sun'?", options: ["Sunn", "Sun", "Sune", "Suhn"], correctAnswer: 1, points: 10, difficulty: "medium" },
            { id: 68, question: "Which is spelled correctly?", options: ["Tree", "Tre", "Trea", "Tri"], correctAnswer: 0, points: 10, difficulty: "medium" },
            { id: 69, question: "How many letters in 'cat'?", options: ["2", "3", "4", "5"], correctAnswer: 1, points: 10, difficulty: "medium" },
            { id: 70, question: "Which word is spelled wrong?", options: ["Ball", "Wall", "Fall", "Wal"], correctAnswer: 3, points: 10, difficulty: "medium" }
        ],
        hard: [
            { id: 71, question: "How many vowels does the word 'beautiful' have?", options: ["3", "4", "5", "6"], correctAnswer: 2, points: 15, difficulty: "hard" },
            { id: 72, question: "Which punctuation mark ends a question?", options: ["Period (.)", "Comma (,)", "Question mark (?)", "Exclamation (!)"], correctAnswer: 2, points: 15, difficulty: "hard" },
            { id: 73, question: "Which word has a silent letter?", options: ["Cat", "Dog", "Knight", "Ball"], correctAnswer: 2, points: 15, difficulty: "hard" },
            { id: 74, question: "How many syllables in 'butterfly'?", options: ["1", "2", "3", "4"], correctAnswer: 2, points: 15, difficulty: "hard" },
            { id: 75, question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes", "Childer"], correctAnswer: 1, points: 15, difficulty: "hard" }
        ]
    },
    "social studies": {
        easy: [
            { id: 76, question: "What holiday celebrates America's birthday?", options: ["Halloween", "Independence Day", "Thanksgiving", "Christmas"], correctAnswer: 1, points: 5, difficulty: "easy" },
            { id: 77, question: "What do we celebrate on Thanksgiving?", options: ["Independence", "Gratitude", "Christmas", "Halloween"], correctAnswer: 1, points: 5, difficulty: "easy" },
            { id: 78, question: "Who is the leader of the country?", options: ["Mayor", "Governor", "President", "King"], correctAnswer: 2, points: 5, difficulty: "easy" },
            { id: 79, question: "What is the capital of the USA?", options: ["New York", "Washington D.C.", "Boston", "Philadelphia"], correctAnswer: 1, points: 5, difficulty: "easy" },
            { id: 80, question: "How many states are in the USA?", options: ["40", "45", "50", "55"], correctAnswer: 2, points: 5, difficulty: "easy" }
        ],
        medium: [
            { id: 81, question: "What are the three branches of government?", options: ["Executive, Legislative, Judicial", "Democratic, Republican, Independent", "Federal, State, Local", "House, Senate, Supreme"], correctAnswer: 0, points: 10, difficulty: "medium" },
            { id: 82, question: "What document starts with 'We the People'?", options: ["Declaration of Independence", "Constitution", "Bill of Rights", "Gettysburg Address"], correctAnswer: 1, points: 10, difficulty: "medium" },
            { id: 83, question: "Who was the first President?", options: ["Thomas Jefferson", "George Washington", "Benjamin Franklin", "Alexander Hamilton"], correctAnswer: 1, points: 10, difficulty: "medium" },
            { id: 84, question: "In what year did America declare independence?", options: ["1775", "1776", "1777", "1778"], correctAnswer: 1, points: 10, difficulty: "medium" },
            { id: 85, question: "What is a citizen?", options: ["A visitor", "A member of a country", "A tourist", "A resident"], correctAnswer: 1, points: 10, difficulty: "medium" }
        ],
        hard: [
            { id: 86, question: "What is federalism?", options: ["Central government only", "Power shared between central and state gov", "State government only", "Local government only"], correctAnswer: 1, points: 15, difficulty: "hard" },
            { id: 87, question: "What was the main purpose of the Bill of Rights?", options: ["Declare independence", "Protect individual freedoms", "Create government", "Establish taxes"], correctAnswer: 1, points: 15, difficulty: "hard" },
            { id: 88, question: "What is the electoral college?", options: ["A school", "System to elect the President", "Political party", "Government agency"], correctAnswer: 1, points: 15, difficulty: "hard" },
            { id: 89, question: "What causes seasons?", options: ["Distance from sun", "Earth's tilt", "Moon's orbit", "Solar flares"], correctAnswer: 1, points: 15, difficulty: "hard" },
            { id: 90, question: "What is manifest destiny?", options: ["Final decision", "Belief in expansion west", "Government policy", "Historical period"], correctAnswer: 1, points: 15, difficulty: "hard" }
        ]
    }
    },

    // FIRST GRADE QUIZZES
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
                { id: 121, question: "What is a prefixes?", options: ["A suffix", "Letters added at the beginning", "A verb", "An adjective"], correctAnswer: 1, points: 15, difficulty: "hard" },
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
        },
        "social studies": {
            easy: [
                { id: 151, question: "Which holiday is in December?", options: ["Easter", "Halloween", "Christmas", "Thanksgiving"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 152, question: "What is a map?", options: ["A book", "Drawing of area", "A picture", "A story"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 153, question: "What is a community?", options: ["A place", "Group of people", "An animal", "A country"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 154, question: "What do we use maps for?", options: ["Reading", "Finding places", "Drawing", "Writing"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 155, question: "What is a continent?", options: ["A city", "A large landmass", "An ocean", "A country"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 156, question: "Name one continent.", options: ["Atlantic", "Pacific", "Africa", "None"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 157, question: "What is a map key?", options: ["A tool", "Symbols explained", "A location", "A border"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 158, question: "What is a compass rose?", options: ["A flower", "Directions on map", "A tool", "A symbol"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 159, question: "What is an ocean?", options: ["A lake", "A large body of salt water", "A river", "A pond"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 160, question: "What does a governor do?", options: ["Leads city", "Leads state", "Leads school", "Leads family"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 161, question: "What are the four directions on a compass?", options: ["North, South, East, West", "Up, Down, Left, Right", "Front, Back, Side", "Hot, Cold, Warm, Cool"], correctAnswer: 0, points: 15, difficulty: "hard" },
                { id: 162, question: "What is latitude?", options: ["Vertical lines", "Horizontal lines on map", "A border", "A boundary"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 163, question: "What is longitude?", options: ["Horizontal lines", "Vertical lines on map", "A border", "A boundary"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 164, question: "What is a natural resource?", options: ["Something made", "Something from nature", "Something bought", "Something built"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 165, question: "What is conservation?", options: ["Destroying", "Protecting resources", "Using all", "Wasting"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        }
    },

    // SECOND GRADE QUIZZES
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
                { id: 236, question: "What is 145 + 237?", options: ["382", "382", "384", "386"], correctAnswer: 1, points: 10, difficulty: "medium" },
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
        "social studies": {
            easy: [
                { id: 251, question: "What is a holiday?", options: ["A day off", "Special day to celebrate", "A vacation", "A weekend"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 252, question: "What does a farmer do?", options: ["Works in store", "Grows food", "Works in hospital", "Works in office"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 253, question: "What is trade?", options: ["A path", "Exchange of goods", "A school", "A game"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 254, question: "What is a pioneer?", options: ["A soldier", "Early settler", "A teacher", "A explorer"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 255, question: "What is culture?", options: ["A plant", "Way of life of a group", "An art form", "A language"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 256, question: "What were Native Americans?", options: ["Recent arrivals", "First people in Americas", "Explorers", "Settlers"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 257, question: "What is a colony?", options: ["A country", "Settlement under another's rule", "A city", "A state"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 258, question: "What is a supply?", options: ["Demand", "Amount of goods available", "A store", "A price"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 259, question: "What is demand?", options: ["Supply", "Amount people want", "A request", "A need"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 260, question: "What is a community leader?", options: ["Everyone", "Person who helps guide community", "A teacher", "A parent"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 261, question: "What is a primary source?", options: ["A book", "Direct evidence from the time", "A website", "A movie"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 262, question: "What is a secondary source?", options: ["Info about primary source", "Direct evidence", "Original material", "A diary"], correctAnswer: 0, points: 15, difficulty: "hard" },
                { id: 263, question: "What is immigration?", options: ["Moving within country", "Moving to a new country", "Traveling", "Visiting"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 264, question: "What is economics?", options: ["Money only", "Study of resources and trade", "Banking", "Savings"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 265, question: "What is a trade route?", options: ["A path", "Path for exchanging goods", "A road", "A trail"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        }
    },

    // THIRD GRADE QUIZZES
    "3rd grade": {
        kindergarten: {
            reading: {
                title: "Learning to Read in Kindergarten",
                content: "<h3>Alphabet Recognition</h3><p>Learning the alphabet is the foundation of reading. There are 26 letters from A to Z.</p><p>Letter sounds: Each letter makes a sound. A sounds like 'ah', B sounds like 'buh', etc.</p><h3>Phonics Basics</h3><p>Phonics teaches you to blend sounds together to make words.</p><p>Example: C + A + T = CAT 🐱</p><h3>Common Words</h3><p>Some words we use a lot: the, and, is, it, to, in, on, at, a, I</p>"
            },
            math: {
                title: "Math Basics for Kindergarten",
                content: "<h3>Counting 1-10</h3><p>Start by learning to count: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10</p><p>Practice counting on your fingers and with objects.</p><h3>Simple Addition</h3><p>Adding means putting things together.</p><p>1 + 1 = 2, 2 + 2 = 4</p><h3>Simple Subtraction</h3><p>Subtraction means taking things away.</p><p>5 - 2 = 3 (take away 2 from 5, you have 3 left)</p>"
            }
        },
        "1st grade": {
            reading: {
                title: "Reading Skills for 1st Grade",
                content: "<h3>Blending Sounds</h3><p>Put sounds together: ST + OP = STOP</p><p>Practice: CR + AB = CRAB, FL + AG = FLAG</p><h3>Sight Words</h3><p>Some words don't follow phonics rules. We have to memorize them.</p><p>Common sight words: said, have, was, where, one, come, do, does</p><h3>Short Stories</h3><p>Start reading simple stories with pictures. Every story has:</p><ul><li>Characters (who is in the story)</li><li>Setting (where and when)</li><li>Problem (what's wrong)</li><li>Solution (how it gets fixed)</li></ul>"
            },
            math: {
                title: "Math for 1st Grade",
                content: "<h3>Addition Within 20</h3><p>10 + 5 = 15, 8 + 7 = 15</p><p>Use number lines to help add.</p><h3>Subtraction Within 20</h3><p>15 - 5 = 10, 12 - 7 = 5</p><h3>Understanding Place Value</h3><p>Tens place: 10, 20, 30, 40, 50...</p><p>Ones place: 1, 2, 3, 4, 5...</p><p>Number 23 = 2 tens + 3 ones</p><h3>Basic Shapes</h3><p>Triangle (3 sides), Square (4 sides), Circle (0 sides), Rectangle</p>"
            }
        },
        "2nd grade": {
            reading: {
                title: "Reading Comprehension for 2nd Grade",
                content: "<h3>Understanding Stories</h3><p>When reading a story, ask yourself:</p><ul><li>What is the main idea?</li><li>Who are the characters?</li><li>What problem do they have?</li><li>How do they solve it?</li><li>What did I learn?</li></ul><h3>Parts of Speech</h3><p><strong>Noun:</strong> A person, place, or thing (boy, park, book)</p><p><strong>Verb:</strong> An action word (run, jump, sing)</p><p><strong>Adjective:</strong> A describing word (big, happy, blue)</p><h3>Comparing Stories</h3><p>Look at similarities and differences between two stories.</p><p>Same: Both have a hero, Both teach a lesson</p><p>Different: One is funny, One is serious</p>"
            },
            math: {
                title: "Math Skills for 2nd Grade",
                content: "<h3>Addition and Subtraction to 100</h3><p>45 + 23 = 68, 87 - 34 = 53</p><p>Use place value to help: Add tens first, then ones</p><h3>Introduction to Multiplication</h3><p>Multiplication is repeated addition:</p><p>3 × 2 means 3 groups of 2 = 2 + 2 + 2 = 6</p><p>Learn skip counting: 2, 4, 6, 8, 10... (skip count by 2s)</p><h3>Introduction to Division</h3><p>Division is sharing:</p><p>12 ÷ 3 means divide 12 into 3 equal groups</p><h3>Measurement</h3><p>Inches, feet, and centimeters are units of length</p><p>1 foot = 12 inches, 1 meter = 100 centimeters</p><h3>Fractions</h3><p>1/2 = half, 1/3 = one-third, 1/4 = one-fourth</p><p>Practice: 1/2 of 10 = 5, 1/3 of 12 = 4</p>"
            }
        }
    },

    // ART & MUSIC & PE ASSIGNMENTS (Starting from 2nd Grade)
    assignments: {
        "2nd grade": {
            art: [
                { id: 1, title: "Color Mixing Adventure", description: "Learn how primary colors (red, blue, yellow) mix to make secondary colors (orange, green, purple)", instructions: "Use paint or markers to create a color wheel. Show how red + blue = purple, red + yellow = orange, yellow + blue = green", points: 20 },
                { id: 2, title: "Shape Art", description: "Create a picture using only shapes - circles, squares, triangles, and rectangles", instructions: "Draw or cut out shapes and arrange them to make an animal, house, or robot. Label each shape!", points: 15 },
                { id: 3, title: "Nature Collage", description: "Create art using materials from nature", instructions: "Collect leaves, flowers, sticks, and grass. Arrange them on paper and glue down to make a picture", points: 25 },
                { id: 4, title: "Self Portrait", description: "Draw or paint a picture of yourself", instructions: "Include your face, hair color, eye color, and something you like to do. Use lots of colors!", points: 20 },
                { id: 5, title: "Pattern Design", description: "Create different patterns and repeating designs", instructions: "Draw stripes, dots, checkers, or other patterns. Try to make them neat and even", points: 15 }
            ],
            music: [
                { id: 1, title: "Instrument Explorer", description: "Learn about different musical instruments", instructions: "Name 5 instruments. Draw a picture of each and describe the sound it makes (loud, soft, high, low)", points: 20 },
                { id: 2, title: "Create Your Own Instrument", description: "Make a simple musical instrument at home", instructions: "Make a shaker with rice in a jar, or drum with a pot and spoon. Create different sounds!", points: 25 },
                { id: 3, title: "Rhythm Pattern", description: "Learn about rhythm and beat", instructions: "Clap a simple rhythm and repeat it 5 times. Fast, slow, loud, quiet - try different speeds!", points: 20 },
                { id: 4, title: "Song Lyrics", description: "Write your own short song or poem", instructions: "Create 4 lines that rhyme. It can be about your favorite animal, food, or season", points: 20 },
                { id: 5, title: "Music Emotions", description: "Learn how music makes us feel", instructions: "Listen to 3 different songs. Write down how each one makes you feel (happy, sad, silly, calm)", points: 15 }
            ],
            pe: [
                { id: 1, title: "Stretching Routine", description: "Learn to stretch and improve flexibility", instructions: "Practice 5 stretches: touch your toes, reach to the sky, twist side to side, etc. Hold each for 10 seconds", points: 15 },
                { id: 2, title: "Balance Challenge", description: "Test your balance and coordination", instructions: "Stand on one leg for 30 seconds. Hop on one foot. Walk in a straight line. See how steady you are!", points: 20 },
                { id: 3, title: "Jump & Skip", description: "Practice jumping and skipping for fitness", instructions: "Do 20 jumping jacks, skip rope 30 times, or jump on one foot 15 times. Feel the movement!", points: 20 },
                { id: 4, title: "Sports Skill Practice", description: "Learn basic sports skills", instructions: "Practice throwing a ball into a bucket, kicking a ball to a target, or bouncing a ball 20 times", points: 25 },
                { id: 5, title: "Healthy Habits", description: "Learn about staying healthy and active", instructions: "Write down your favorite exercise, how many minutes you played outside today, and drink plenty of water!", points: 15 }
            ]
        }
    },

    // THIRD GRADE QUIZZES
    "3rd grade": {
        reading: {
            easy: [
                { id: 301, question: "What is a paragraph?", options: ["A single word", "A group of sentences about one idea", "A long story", "A poem"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 302, question: "What does 'context clue' mean?", options: ["A hint in the story", "A picture", "A title", "A character"], correctAnswer: 0, points: 5, difficulty: "easy" },
                { id: 303, question: "Which is a type of punctuation?", options: ["Comma", "Letter", "Number", "Symbol"], correctAnswer: 0, points: 5, difficulty: "easy" },
                { id: 304, question: "What is the plural of 'child'?", options: ["Childs", "Childes", "Children", "Childern"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 305, question: "What does 'summarize' mean?", options: ["Expand the story", "Give the main points", "Criticize", "Translate"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 306, question: "What is an analogy?", options: ["A comparison", "A metaphor", "A symbol", "A myth"], correctAnswer: 0, points: 10, difficulty: "medium" },
                { id: 307, question: "Which sentence uses 'their' correctly?", options: ["Their going to the store", "There house is big", "Their books are on the table", "Their is a cat"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 308, question: "What is irony?", options: ["Sadness", "When something is opposite of what is expected", "Anger", "Happiness"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 309, question: "What does 'sequence' mean in a story?", options: ["The order of events", "The characters", "The setting", "The theme"], correctAnswer: 0, points: 10, difficulty: "medium" },
                { id: 310, question: "Which is correct: 'Its' or 'It's'?", options: ["Its (possessive)", "It's (is/has)", "Both are the same", "Neither"], correctAnswer: 0, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 311, question: "What is a narrative?", options: ["A description", "A story or account of events", "A poem", "Instructions"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 312, question: "What does 'allegory' mean?", options: ["A character", "A story with a hidden meaning", "A setting", "A conflict"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 313, question: "Which is an example of alliteration?", options: ["The cat sat", "Sally sells seashells", "The dog ran", "I like ice"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 314, question: "What is a flashback in a story?", options: ["A fast part", "Returning to an earlier event", "Skipping ahead", "A dream"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 315, question: "What does 'perspective' mean?", options: ["Vision", "Point of view", "Opinion", "Story"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        },
        math: {
            easy: [
                { id: 316, question: "What is 45 + 32?", options: ["75", "76", "77", "78"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 317, question: "What is 100 - 25?", options: ["70", "75", "80", "85"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 318, question: "What is 12 × 5?", options: ["50", "55", "60", "65"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 319, question: "What is 60 ÷ 5?", options: ["10", "12", "15", "20"], correctAnswer: 0, points: 5, difficulty: "easy" },
                { id: 320, question: "How many inches in 3 feet?", options: ["30", "36", "42", "48"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 321, question: "What is 234 + 456?", options: ["680", "690", "700", "710"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 322, question: "What is 500 - 123?", options: ["375", "376", "377", "378"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 323, question: "What is 23 × 4?", options: ["88", "90", "92", "94"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 324, question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 325, question: "What is 1/4 of 20?", options: ["4", "5", "6", "7"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 326, question: "What is 567 × 8?", options: ["4536", "4537", "4538", "4539"], correctAnswer: 0, points: 15, difficulty: "hard" },
                { id: 327, question: "What is 1000 ÷ 8?", options: ["120", "125", "130", "135"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 328, question: "What is 3/5 + 1/5?", options: ["3/5", "4/5", "5/5", "1/1"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 329, question: "What is the area of a rectangle 10 units long and 5 units wide?", options: ["30", "40", "50", "60"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 330, question: "What is 45% of 100?", options: ["35", "40", "45", "50"], correctAnswer: 2, points: 15, difficulty: "hard" }
            ]
        },
        science: {
            easy: [
                { id: 331, question: "What is a fossil?", options: ["A rock", "Remains of an organism", "A mineral", "A metal"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 332, question: "What is the water cycle?", options: ["Ocean waves", "Evaporation, condensation, precipitation", "Swimming", "Rainfall"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 333, question: "What are the three states of matter?", options: ["Hot, cold, warm", "Solid, liquid, gas", "Big, small, medium", "Heavy, light, medium"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 334, question: "What is an ecosystem?", options: ["A city", "Community of organisms and their environment", "A forest", "A group of animals"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 335, question: "What is photosynthesis?", options: ["Plant breathing", "Plants making food from sunlight", "Plant movement", "Plant reproduction"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 336, question: "What is weathering?", options: ["Erosion", "Breakdown of rock by weather", "Deposition", "Precipitation"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 337, question: "What is the food chain?", options: ["Where food is sold", "Path of energy through organisms", "Animals eating food", "Plants growing"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 338, question: "What is adaptation?", options: ["Change in season", "Feature that helps organism survive", "Movement", "Growth"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 339, question: "What is the difference between weather and climate?", options: ["Same thing", "Weather is short-term, climate is long-term", "Climate is short-term, weather is long-term", "No difference"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 340, question: "What is a biome?", options: ["A small area", "Large region with specific climate and life", "A type of animal", "A forest"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 341, question: "What is the theory of evolution?", options: ["Species change over time", "Life never changes", "Organisms stay the same", "Animals move to new places"], correctAnswer: 0, points: 15, difficulty: "hard" },
                { id: 342, question: "What is DNA?", options: ["A protein", "Instructions for life", "A mineral", "A type of cell"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 343, question: "What is the water table?", options: ["A table near water", "Level of groundwater", "Ocean depth", "Stream width"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 344, question: "What causes tides?", options: ["Wind", "Moon's gravity", "Sun's heat", "Earth's rotation"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 345, question: "What is plate tectonics?", options: ["Plates are static", "Movement of Earth's plates", "Mountain formation only", "Ocean currents"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        },
        "social studies": {
            easy: [
                { id: 346, question: "What is a government?", options: ["A family", "System that makes rules", "A business", "A school"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 347, question: "What is history?", options: ["Present day", "Study of the past", "Current events", "The future"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 348, question: "What is a timeline?", options: ["A clock", "Events in order", "A schedule", "A calendar"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 349, question: "What is a mayor?", options: ["A teacher", "City leader", "A governor", "A president"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 350, question: "What is a right?", options: ["A duty", "Freedom or entitlement", "A rule", "A law"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 351, question: "What is a bill of rights?", options: ["Store bill", "Document protecting freedoms", "List of rules", "Government bill"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 352, question: "What is citizenship?", options: ["Living somewhere", "Status as member of a country", "Traveling", "Visiting"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 353, question: "What is a museum?", options: ["A store", "Building displaying artifacts", "A library", "A school"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 354, question: "What is archaeology?", options: ["Study of rocks", "Study of past through artifacts", "Study of people", "Study of history"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 355, question: "What is a monument?", options: ["A building", "Structure honoring a person/event", "A statue", "A landmark"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 356, question: "What is a revolution?", options: ["A circle", "Major change in government/society", "A spin", "A rotation"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 357, question: "What is diplomacy?", options: ["War", "Negotiation between nations", "Peace", "Agreement"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 358, question: "What is a civilization?", options: ["A city", "Complex society with culture/government", "A country", "People"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 359, question: "What is a dynasty?", options: ["A country", "Succession of rulers from same family", "A government", "A period"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 360, question: "What is an empire?", options: ["A place", "Group of territories under one rule", "A country", "A nation"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        }
    },

    // FOURTH GRADE QUIZZES
    "4th grade": {
        reading: {
            easy: [
                { id: 346, question: "What is the main idea of a story?", options: ["A detail", "The overall point", "A character", "A setting"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 347, question: "What is a noun?", options: ["A word that describes", "A person, place, or thing", "An action", "A feeling"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 348, question: "Which word is a verb?", options: ["Happy", "Run", "Blue", "School"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 349, question: "What is an adjective?", options: ["An action", "A noun", "A word that describes", "A setting"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 350, question: "What comes after the climax of a story?", options: ["Rising action", "Falling action", "Exposition", "Conflict"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 351, question: "What is a theme?", options: ["The plot", "The main message", "The setting", "A character"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 352, question: "What does 'inference' mean?", options: ["A direct statement", "Figuring something out from clues", "A description", "A conclusion"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 353, question: "What is a metaphor?", options: ["A comparison with 'like'", "A direct comparison", "An exaggeration", "A question"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 354, question: "What is proper punctuation for 'I saw john'?", options: ["i saw john", "I saw John.", "i saw John", "I saw john."], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 355, question: "What is a compound sentence?", options: ["A long sentence", "Two sentences joined by 'and'", "A sentence with adjectives", "A sentence about compounds"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 356, question: "What is personification?", options: ["Giving human qualities to non-humans", "Describing a person", "Writing about people", "A type of poem"], correctAnswer: 0, points: 15, difficulty: "hard" },
                { id: 357, question: "What is a foreshadowing?", options: ["A dark shadow", "Hints about future events", "Part of the past", "A setting description"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 358, question: "What is tone in literature?", options: ["The sound of words", "The author's attitude", "The story's setting", "The volume of reading"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 359, question: "What is a simile?", options: ["A metaphor", "A comparison using 'like' or 'as'", "An exaggeration", "A question"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 360, question: "What does 'paraphrase' mean?", options: ["Repeat exactly", "Restate in your own words", "Memorize", "Summarize"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        },
        math: {
            easy: [
                { id: 361, question: "What is 456 + 234?", options: ["680", "690", "700", "710"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 362, question: "What is 500 - 150?", options: ["350", "375", "400", "425"], correctAnswer: 0, points: 5, difficulty: "easy" },
                { id: 363, question: "What is 12 × 8?", options: ["90", "96", "102", "108"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 364, question: "What is 72 ÷ 9?", options: ["6", "8", "10", "12"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 365, question: "What is 1/2 + 1/4?", options: ["1/4", "1/2", "3/4", "1"], correctAnswer: 2, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 366, question: "What is 234 × 5?", options: ["1170", "1180", "1190", "1200"], correctAnswer: 0, points: 10, difficulty: "medium" },
                { id: 367, question: "What is 1000 ÷ 25?", options: ["30", "40", "50", "60"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 368, question: "What is 2/3 × 3/4?", options: ["1/2", "6/12", "6/7", "2/4"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 369, question: "What is the perimeter of a 5×3 rectangle?", options: ["15", "16", "18", "20"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 370, question: "What is 25% of 200?", options: ["25", "50", "75", "100"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 371, question: "What is 456 ÷ 12?", options: ["35", "36", "37", "38"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 372, question: "What is 3/5 ÷ 2/3?", options: ["6/15", "9/10", "6/10", "3/10"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 373, question: "What is the area of a triangle with base 8 and height 6?", options: ["24", "30", "48", "64"], correctAnswer: 0, points: 15, difficulty: "hard" },
                { id: 374, question: "What is 15% of 450?", options: ["60", "65", "67.5", "70"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 375, question: "What is the GCD of 48 and 36?", options: ["6", "8", "12", "24"], correctAnswer: 2, points: 15, difficulty: "hard" }
            ]
        },
        science: {
            easy: [
                { id: 376, question: "What do plants need to grow?", options: ["Only water", "Sunlight, water, soil", "Only sunlight", "Only air"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 377, question: "What are the three types of rocks?", options: ["Hard, soft, medium", "Igneous, sedimentary, metamorphic", "Big, small, tiny", "Red, blue, green"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 378, question: "What is the basic unit of life?", options: ["Atom", "Molecule", "Cell", "Tissue"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 379, question: "What gas do plants produce?", options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Hydrogen"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 380, question: "What is the process of water changing to vapor?", options: ["Condensation", "Evaporation", "Precipitation", "Freezing"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 381, question: "What is photosynthesis?", options: ["Plant respiration", "Plants making food from sunlight", "Plant movement", "Plant reproduction"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 382, question: "What do carnivores eat?", options: ["Plants only", "Meat only", "Both plants and meat", "Nothing"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 383, question: "What is the pH scale used to measure?", options: ["Temperature", "Acidity or basicity", "Density", "Pressure"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 384, question: "What causes the seasons on Earth?", options: ["Distance from sun", "Tilt of Earth's axis", "Solar flares", "Moon's orbit"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 385, question: "What is the process of breaking down organic matter?", options: ["Synthesis", "Decomposition", "Photosynthesis", "Combustion"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 386, question: "What is osmosis?", options: ["Cell movement", "Water moving across a membrane", "Salt transport", "Gas diffusion"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 387, question: "What are enzymes?", options: ["Proteins", "Proteins that speed up reactions", "Fats", "Carbohydrates"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 388, question: "What is the difference between velocity and speed?", options: ["Same thing", "Velocity includes direction", "Speed includes direction", "No difference"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 389, question: "What is a catalyst?", options: ["A product", "A substance that speeds reactions", "An obstacle", "A catalyst"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 390, question: "What is equilibrium in chemistry?", options: ["Balanced state", "Equal speeds", "Forward reaction only", "Backward reaction only"], correctAnswer: 0, points: 15, difficulty: "hard" }
            ]
        },
        "social studies": {
            easy: [{ id: 391, question: "What is economics?", options: ["Money", "Study of resources", "Banking", "Savings"], correctAnswer: 1, points: 5, difficulty: "easy" }],
            medium: [{ id: 392, question: "What is capitalism?", options: ["Socialism", "Economic system with private ownership", "Communism", "Feudalism"], correctAnswer: 1, points: 10, difficulty: "medium" }],
            hard: [{ id: 393, question: "What is infrastructure?", options: ["Superstructure", "Basic systems and facilities", "Buildings", "Transportation"], correctAnswer: 1, points: 15, difficulty: "hard" }]
        }
    },

    // FIFTH GRADE QUIZZES
    "5th grade": {
        reading: {
            easy: [
                { id: 391, question: "What is a thesis statement?", options: ["A list", "Main argument of essay", "A question", "An example"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 392, question: "What is a transition word?", options: ["A descriptive word", "Word connecting ideas", "An action word", "A noun"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 393, question: "What is summary?", options: ["Detailed recount", "Short overview of main points", "A story", "A question"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 394, question: "What is an author's purpose?", options: ["Make money", "The reason for writing", "Entertainment only", "Always to inform"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 395, question: "What is point of view?", options: ["An opinion", "Who tells the story", "The plot", "The setting"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 396, question: "What is textual evidence?", options: ["Made-up facts", "Information from the text", "Personal opinion", "Background knowledge"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 397, question: "What is a motif?", options: ["A main character", "Recurring theme/image", "A setting", "A conflict"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 398, question: "What is characterization?", options: ["Characters in a book", "Development of characters", "Names of characters", "Types of books"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 399, question: "What is conflict?", options: ["A argument", "Problem in story", "A resolution", "A setting"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 400, question: "What is setting?", options: ["Pacing", "Time and place", "Characters", "Plot"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 401, question: "What is an unreliable narrator?", options: ["Silent character", "Narrator we cannot trust", "Main character", "Author"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 402, question: "What is satire?", options: ["A genre", "Using humor to mock", "A type of poem", "A character"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 403, question: "What is an archetype?", options: ["Old technology", "Universal character type", "A weapon", "A setting"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 404, question: "What is symbolic meaning?", options: ["Literal meaning", "Hidden deeper meaning", "Surface meaning", "Multiple definitions"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 405, question: "What is epistolary format?", options: ["Historical", "Told through letters", "Poetic", "Dramatic"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        },
        math: {
            easy: [
                { id: 406, question: "What is 789 + 456?", options: ["1245", "1255", "1245", "1350"], correctAnswer: 0, points: 5, difficulty: "easy" },
                { id: 407, question: "What is 1000 - 234?", options: ["756", "766", "776", "786"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 408, question: "What is 45 × 12?", options: ["540", "560", "580", "600"], correctAnswer: 0, points: 5, difficulty: "easy" },
                { id: 409, question: "What is 156 ÷ 12?", options: ["10", "12", "13", "15"], correctAnswer: 2, points: 5, difficulty: "easy" },
                { id: 410, question: "What is 3/4 + 1/4?", options: ["1/2", "1", "4/4", "5/4"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 411, question: "What is 567 × 23?", options: ["13000", "13041", "13500", "14000"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 412, question: "What is 2500 ÷ 50?", options: ["40", "50", "60", "70"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 413, question: "What is 5/6 - 1/3?", options: ["1/2", "1/3", "2/3", "4/6"], correctAnswer: 2, points: 10, difficulty: "medium" },
                { id: 414, question: "What is the circumference of a circle with radius 5?", options: ["10π", "25π", "50π", "5π"], correctAnswer: 0, points: 10, difficulty: "medium" },
                { id: 415, question: "What is 40% of 500?", options: ["150", "200", "250", "300"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 416, question: "What is 789 ÷ 11?", options: ["71", "72", "73", "74"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 417, question: "What is (2/3)² ?", options: ["4/6", "4/9", "2/9", "6/9"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 418, question: "What is the area of a circle with radius 4?", options: ["8π", "12π", "16π", "20π"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 419, question: "What is the LCM of 12 and 18?", options: ["24", "30", "36", "48"], correctAnswer: 2, points: 15, difficulty: "hard" },
                { id: 420, question: "What is 35% of 800?", options: ["240", "260", "280", "300"], correctAnswer: 2, points: 15, difficulty: "hard" }
            ]
        },
        science: {
            easy: [
                { id: 421, question: "What is a prism?", options: ["A mirror", "3D shape with flat faces", "A type of light", "A lens"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 422, question: "What is force?", options: ["Energy", "Push or pull", "Speed", "Motion"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 423, question: "What are the three states of matter?", options: ["Hot, cold, warm", "Solid, liquid, gas", "Hard, soft, medium", "Big, small, tiny"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 424, question: "What is gravity?", options: ["A force pushing", "Force pulling toward Earth", "Energy", "Motion"], correctAnswer: 1, points: 5, difficulty: "easy" },
                { id: 425, question: "What is sound?", options: ["Light waves", "Mechanical waves", "Radiation", "Motion"], correctAnswer: 1, points: 5, difficulty: "easy" }
            ],
            medium: [
                { id: 426, question: "What is Newton's first law?", options: ["Force = mass × acceleration", "Objects stay in motion", "Every action has reaction", "Force is proportional"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 427, question: "What is density?", options: ["Weight", "Mass per volume", "Size", "Thickness"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 428, question: "What is the speed of light?", options: ["300 m/s", "300,000 km/s", "1000 km/s", "100,000 km/s"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 429, question: "What is an atom?", options: ["A molecule", "Smallest unit of element", "A compound", "A reaction"], correctAnswer: 1, points: 10, difficulty: "medium" },
                { id: 430, question: "What is the periodic table?", options: ["Calendar", "Table of elements", "Chart of reactions", "List of compounds"], correctAnswer: 1, points: 10, difficulty: "medium" }
            ],
            hard: [
                { id: 431, question: "What is friction?", options: ["Smooth movement", "Force opposing motion", "Acceleration", "Gravity"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 432, question: "What is energy conservation?", options: ["Saving power", "Energy is never created/destroyed", "Efficiency", "Renewable sources"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 433, question: "What is refraction?", options: ["Reflection", "Bending of light", "Speed change", "Wave movement"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 434, question: "What is ionic bonding?", options: ["Electrons sharing", "Charge transfer", "Metallic bond", "Weak interaction"], correctAnswer: 1, points: 15, difficulty: "hard" },
                { id: 435, question: "What is electronegativity?", options: ["Negative electricity", "Ability to attract electrons", "Atomic mass", "Number of protons"], correctAnswer: 1, points: 15, difficulty: "hard" }
            ]
        }
    },

    // SIXTH THROUGH TWELFTH GRADE QUIZZES
    "6th grade": {
        reading: { easy: [{ id: 436, question: "What is context?", options: ["Background information", "A structure", "A type of text", "A genre"], correctAnswer: 0, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        math: { easy: [{ id: 437, question: "What is 1234 + 5678?", options: ["6912", "6913", "6914", "6915"], correctAnswer: 0, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        science: { easy: [{ id: 438, question: "What is a hypothesis?", options: ["A result", "An educated guess", "An observation", "A conclusion"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        "social studies": { easy: [{ id: 501, question: "What is civics?", options: ["History of wars", "Study of government and citizenship", "Geography only", "Ancient cultures"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 502, question: "Which branch of government makes laws?", options: ["Executive", "Judicial", "Legislative", "Military"], correctAnswer: 2, points: 5, difficulty: "easy" }, { id: 503, question: "What is a citizen?", options: ["A person born in a city", "A person with legal rights in a country", "A soldier", "A government official"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 504, question: "What is democracy?", options: ["Rule by one person", "Government by the people", "Rule by military", "Government by wealth"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 505, question: "What does the Constitution do?", options: ["Starts wars", "Creates rules for government", "Makes money", "Writes history"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [{ id: 506, question: "What is the difference between state and national government?", options: ["No difference", "State is local, national is country-wide", "Only national matters", "Only state matters"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 507, question: "How many senators does each state have?", options: ["One", "Two", "Three", "Five"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 508, question: "What is a political party?", options: ["A celebration", "Group with shared political beliefs", "A type of election", "A government office"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 509, question: "What does the President do?", options: ["Makes all laws", "Is head of executive branch", "Votes in Congress", "Judges court cases"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 510, question: "What is voting?", options: ["Paying taxes", "Joining military", "Making a choice in elections", "Going to school"], correctAnswer: 2, points: 10, difficulty: "medium" }], hard: [{ id: 511, question: "What is the separation of powers?", options: ["Military groups", "Division of government into three branches", "Different countries", "Types of elections"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 512, question: "What is the Bill of Rights?", options: ["Laws against crime", "First 10 amendments protecting freedoms", "Tax laws", "Election rules"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 513, question: "What is impeachment?", options: ["Making someone a citizen", "Arresting someone", "Formal charge against official", "Passing a law"], correctAnswer: 2, points: 15, difficulty: "hard" }, { id: 514, question: "What is the Electoral College?", options: ["A school for elections", "Group selecting President", "Type of university", "Election committee"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 515, question: "What does it mean to amend the Constitution?", options: ["Ignore it", "Change or add to it", "Write it again", "Follow it exactly"], correctAnswer: 1, points: 15, difficulty: "hard" }] }
    },
    "7th grade": {
        reading: { easy: [{ id: 439, question: "What is rhetoric?", options: ["A story", "Art of persuasion", "A poem", "A setting"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        math: { easy: [{ id: 440, question: "What is an exponent?", options: ["A base", "Number of times to multiply", "A power", "Multiplication"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        science: { easy: [{ id: 441, question: "What is metabolism?", options: ["A disease", "Energy processing in organisms", "Movement", "Growth"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        "social studies": { easy: [{ id: 531, question: "What is geography?", options: ["Study of numbers", "Study of Earth and people", "Study of wars", "Study of art"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 532, question: "What is a map projection?", options: ["A movie screen", "Way to represent Earth on flat surface", "A drawing tool", "A compass"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 533, question: "What is the Prime Meridian?", options: ["Zero latitude", "Zero longitude line", "Equator", "North Pole"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 534, question: "What is an archipelago?", options: ["A peninsula", "Group of islands", "A mountain", "A desert"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 535, question: "What is cultural geography?", options: ["Geography only", "Study of human cultures in places", "History only", "Population counting"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [{ id: 536, question: "What is cultural region?", options: ["Political boundary", "Area sharing similar culture", "A country", "A continent"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 537, question: "What is economic activity?", options: ["Making money only", "Human action producing goods/services", "Government work", "Military action"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 538, question: "What is sustainable resource use?", options: ["Using all resources", "Using resources without depleting them", "Saving everything", "No resource use"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 539, question: "What is population density?", options: ["Total population", "Number of people per area", "City size", "Urban areas"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 540, question: "What is a trade route?", options: ["A road", "Path for commerce between places", "A railroad", "A shipping lane"], correctAnswer: 1, points: 10, difficulty: "medium" }], hard: [{ id: 541, question: "What is geopolitical strategy?", options: ["Military only", "Use of geography in politics and conflict", "Government", "International relations"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 542, question: "What is cultural syncretism?", options: ["Cultural isolation", "Blending of different cultures", "Religious conflict", "Language change"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 543, question: "What is economic development?", options: ["Making products", "Progress in economic growth and opportunity", "Trade only", "Industrialization"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 544, question: "What is carrying capacity?", options: ["Shipping ability", "Maximum population area can support", "Transportation", "Storage limit"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 545, question: "What is diaspora?", options: ["Traveling", "Scattering of people from homeland", "Immigration", "Emigration"], correctAnswer: 1, points: 15, difficulty: "hard" }] }
    },
    "8th grade": {
        reading: { easy: [{ id: 442, question: "What is diction?", options: ["Dictionary", "Choice of words", "Speaking", "Writing"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        math: { easy: [{ id: 443, question: "What is a variable?", options: ["A constant", "Unknown quantity", "A number", "An equation"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        science: { easy: [{ id: 444, question: "What is mitosis?", options: ["Mutation", "Cell division", "Reproduction", "Growth"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        "social studies": { easy: [{ id: 546, question: "What is climate?", options: ["Weather today", "Long-term weather patterns", "Rain", "Temperature"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 547, question: "What causes seasons?", options: ["Sun's distance", "Earth's tilt and orbit", "Moon phases", "Ocean currents"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 548, question: "What is the water cycle?", options: ["Ocean only", "Evaporation, condensation, precipitation", "Rivers only", "Rainfall"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 549, question: "What is a front?", options: ["Weather feature", "Boundary between air masses", "Wind", "Pressure system"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 550, question: "What is latitude?", options: ["Distance east-west", "Distance north-south from equator", "Height", "Longitude"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [{ id: 551, question: "What is a monsoon?", options: ["Mountain wind", "Seasonal wind pattern with rain", "Storm", "Tornado"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 552, question: "What is desertification?", options: ["Sand creation", "Land becoming desert due to climate/use", "Desert discovery", "Drought"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 553, question: "What is atmospheric pressure?", options: ["Air weight", "Weight of air on surface", "Temperature", "Humidity"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 554, question: "What causes ocean currents?", options: ["Fish", "Wind and temperature differences", "Moon", "Tides"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 555, question: "What is the greenhouse effect?", options: ["Plant houses", "Gases trapping heat in atmosphere", "Global warming only", "Climate"], correctAnswer: 1, points: 10, difficulty: "medium" }], hard: [{ id: 556, question: "What is El Nino?", options: ["Spanish name", "Warm ocean current affecting climate", "Weather event", "Ocean phenomenon"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 557, question: "What is albedo?", options: ["Reflection of sunlight", "Surface reflectivity of light", "Color", "Temperature"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 558, question: "What is orographic precipitation?", options: ["Mountain rain", "Rain from mountains blocking moisture", "Rainfall type", "Weather"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 559, question: "What is the jet stream?", options: ["Aircraft", "Fast-moving upper atmosphere wind", "Wind pattern", "Weather"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 560, question: "What is climate feedback?", options: ["Weather response", "Process amplifying climate change", "Response", "Cycle"], correctAnswer: 1, points: 15, difficulty: "hard" }] }
    },
    "9th grade": {
        reading: { easy: [{ id: 445, question: "What is a sonnet?", options: ["A song", "14-line poem", "A ballad", "A prose"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        math: { easy: [{ id: 446, question: "What is the quadratic formula?", options: ["Linear equation", "(-b±√(b²-4ac))/2a", "Pythagorean", "Slope-intercept"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        science: { easy: [{ id: 447, question: "What is meiosis?", options: ["Cell division", "Reproductive cell division", "Mitosis", "Mutation"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        "social studies": { easy: [{ id: 561, question: "What is globalization?", options: ["Global warming", "Increasing world interconnection", "International trade", "Cultural spread"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 562, question: "What is an NGO?", options: ["Government agency", "Non-governmental organization", "Business", "International body"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 563, question: "What is outsourcing?", options: ["Tourism", "Moving business functions elsewhere", "Export", "Import"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 564, question: "What is supply chain?", options: ["Retail stores", "Path from production to consumer", "Distribution", "Trade route"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 565, question: "What is cultural homogenization?", options: ["Cultural mixing", "Cultures becoming more similar", "Globalization", "Modernization"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [{ id: 566, question: "What is comparative advantage?", options: ["Military strength", "Producing with lower opportunity cost", "Trade benefit", "Economic term"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 567, question: "What is foreign direct investment?", options: ["Buying stocks", "Company investing in another country", "Trade", "Loans"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 568, question: "What is multinational corporation?", options: ["Large company", "Company operating in multiple countries", "International trade", "Global business"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 569, question: "What is digital divide?", options: ["Internet gap", "Unequal access to technology", "Technology disparity", "Online inequality"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 570, question: "What is just-in-time manufacturing?", options: ["Fast production", "Producing when needed to reduce waste", "Efficiency", "Production method"], correctAnswer: 1, points: 10, difficulty: "medium" }], hard: [{ id: 571, question: "What is regulatory arbitrage?", options: ["Trading", "Exploiting different regulations across regions", "Business strategy", "Economic concept"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 572, question: "What is value chain?", options: ["Supply chain", "Series of activities creating product value", "Business process", "Production steps"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 573, question: "What is intellectual property protection?", options: ["Copyright", "Legal rights protecting creations", "Ownership", "Patents"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 574, question: "What is convergence theory?", options: ["Coming together", "Hypothesis that societies develop similarly", "Development theory", "Economics"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 575, question: "What is transnational advocacy?", options: ["International business", "Cross-border social movements", "Activism", "Global movements"], correctAnswer: 1, points: 15, difficulty: "hard" }] }
    },
    "10th grade": {
        reading: { easy: [{ id: 448, question: "What is juxtaposition?", options: ["Placement together", "Opposing elements close", "Comparison", "Contrast"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        math: { easy: [{ id: 449, question: "What is cosine?", options: ["Trigonometric function", "Opposite/adjacent", "Adjacent/hypotenuse", "Hypotenuse/adjacent"], correctAnswer: 2, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        science: { easy: [{ id: 450, question: "What is oxidation?", options: ["Rust", "Loss of electrons", "Chemical reaction", "Corrosion"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        "social studies": { easy: [{ id: 576, question: "What is ideology?", options: ["Idea", "Set of political beliefs", "Philosophy", "Politics"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 577, question: "What is conservatism?", options: ["Environmental protection", "Preserving traditional values", "Liberalism", "Socialism"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 578, question: "What is liberalism?", options: ["Being liberal", "Favoring political/social reform", "Conservatism", "Traditional"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 579, question: "What is socialism?", options: ["Social work", "Collective ownership of production", "Capitalism", "Government"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 580, question: "What is capitalism?", options: ["Money", "Private ownership and market economy", "Socialism", "Business"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [{ id: 581, question: "What is authoritarianism?", options: ["Authority", "Government with concentrated power", "Democracy", "Dictatorship"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 582, question: "What is anarchism?", options: ["Chaos", "Opposition to government hierarchy", "Communism", "Libertarianism"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 583, question: "What is fascism?", options: ["Extremism", "Authoritarian nationalist ideology", "Totalitarianism", "Dictatorship"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 584, question: "What is communism?", options: ["Shared property", "Classless society with collective ownership", "Socialism", "Authoritarianism"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 585, question: "What is libertarianism?", options: ["Liberty", "Minimizing government intervention", "Anarchism", "Individualism"], correctAnswer: 1, points: 10, difficulty: "medium" }], hard: [{ id: 586, question: "What is dialectical materialism?", options: ["Material goods", "Marx's theory of historical change", "Communism", "Philosophy"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 587, question: "What is hegemony?", options: ["Power", "Dominant influence of one group", "Authority", "Control"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 588, question: "What is realpolitik?", options: ["Political reality", "Politics based on power, not ideals", "Diplomacy", "Strategy"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 589, question: "What is an ideological spectrum?", options: ["Spectrum of light", "Range from left to right political views", "Politics", "Beliefs"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 590, question: "What is dogmatism?", options: ["Dogs", "Rigid adherence to ideology", "Inflexibility", "Ideology"], correctAnswer: 1, points: 15, difficulty: "hard" }] }
    },
    "11th grade": {
        reading: { easy: [{ id: 451, question: "What is deconstruction?", options: ["Breaking down", "Analyzing text structure", "Destroying", "Removing"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        math: { easy: [{ id: 452, question: "What is a limit?", options: ["Boundary", "Value a function approaches", "Maximum", "Minimum"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        science: { easy: [{ id: 453, question: "What is thermodynamics?", options: ["Heat and motion", "Study of heat and energy", "Temperature", "Pressure"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        "social studies": { easy: [{ id: 591, question: "What is imperialism?", options: ["Empire", "Policy of extending power over territories", "Colonialism", "Conquest"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 592, question: "What is colonialism?", options: ["Colonies", "Establishing control over distant lands", "Imperialism", "Settlement"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 593, question: "What is a protectorate?", options: ["Protection", "Territory under another country's control", "Alliance", "Territory"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 594, question: "What is economic imperialism?", options: ["Economic control", "Control through economic means", "Trade", "Colonialism"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 595, question: "What is cultural imperialism?", options: ["Cultural control", "Imposing one culture on another", "Globalization", "Imperialism"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [{ id: 596, question: "What is the White Man's Burden?", options: ["Colonization", "19th century idea justifying imperialism", "Racism", "Ideology"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 597, question: "What is sphere of influence?", options: ["Area of control", "Region where power has influence", "Territory", "Domain"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 598, question: "What is resource extraction?", options: ["Mining", "Taking resources from colonies", "Trade", "Economy"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 599, question: "What is indirect rule?", options: ["Hidden rule", "Using local leaders for control", "Governance", "Colonialism"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 600, question: "What is scramble for Africa?", options: ["African competition", "European partition of Africa", "Colonialism", "History"], correctAnswer: 1, points: 10, difficulty: "medium" }], hard: [{ id: 601, question: "What is the civilizing mission?", options: ["Helping others", "Justification for imposing western culture", "Imperialism", "Ideology"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 602, question: "What is neo-colonialism?", options: ["New colonialism", "Indirect control through economic means", "Imperialism", "Modern control"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 603, question: "What is extractivism?", options: ["Extraction", "Economic system based on resource extraction", "Economics", "Mining"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 604, question: "What is settler colonialism?", options: ["Settlement", "Colonialism involving permanent settlement", "Colonialism", "Migration"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 605, question: "What is dependency theory?", options: ["Dependence", "Theory explaining economic inequality between nations", "Economics", "Development"], correctAnswer: 1, points: 15, difficulty: "hard" }] }
    },
    "12th grade": {
        reading: { easy: [{ id: 454, question: "What is phenomenology?", options: ["Phenomena", "Study of consciousness", "Physics", "Philosophy"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        math: { easy: [{ id: 455, question: "What is integration?", options: ["Combination", "Reverse differentiation", "Calculus concept", "Addition"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        science: { easy: [{ id: 456, question: "What is quantum mechanics?", options: ["Classical mechanics", "Study of atomic scale", "Large objects", "Motion"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [], hard: [] },
        "social studies": { easy: [{ id: 606, question: "What is sustainable development?", options: ["Fast growth", "Development meeting future needs", "Green economy", "Environmental growth"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 607, question: "What is the SDG?", options: ["Sustainability Development Goals", "UN goals for sustainable development", "Environmental goals", "Global goals"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 608, question: "What is climate justice?", options: ["Climate law", "Fair burden sharing for climate change", "Environmental justice", "Climate fairness"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 609, question: "What is circular economy?", options: ["Round economy", "Economic model minimizing waste", "Recycling", "Environment"], correctAnswer: 1, points: 5, difficulty: "easy" }, { id: 610, question: "What is carbon footprint?", options: ["Carbon track", "Total emissions from activities", "Pollution", "Environment"], correctAnswer: 1, points: 5, difficulty: "easy" }], medium: [{ id: 611, question: "What is renewable energy?", options: ["New energy", "Energy from sustainable sources", "Alternative energy", "Clean energy"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 612, question: "What is biodiversity?", options: ["Species diversity", "Variety of species in ecosystem", "Ecology", "Environment"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 613, question: "What is ecosystem services?", options: ["Nature services", "Benefits from natural systems", "Environmental benefits", "Nature"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 614, question: "What is climate resilience?", options: ["Climate strength", "Ability to adapt to climate change", "Adaptation", "Climate"], correctAnswer: 1, points: 10, difficulty: "medium" }, { id: 615, question: "What is social equity?", options: ["Social fairness", "Fair distribution of resources", "Equality", "Justice"], correctAnswer: 1, points: 10, difficulty: "medium" }], hard: [{ id: 616, question: "What is planetary boundaries?", options: ["Earth limits", "Environmental limits for safe operation", "Limits", "Environment"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 617, question: "What is decarbonization?", options: ["Removing carbon", "Reducing carbon emissions", "Carbon reduction", "Climate"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 618, question: "What is just transition?", options: ["Fair change", "Equitable shift to sustainability", "Transition fairness", "Social transition"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 619, question: "What is regenerative development?", options: ["Development", "Actively improving environment while developing", "Sustainable development", "Growth"], correctAnswer: 1, points: 15, difficulty: "hard" }, { id: 620, question: "What is net zero?", options: ["Zero emissions", "Balance of emissions and removals", "Carbon neutral", "Emissions"], correctAnswer: 1, points: 15, difficulty: "hard" }] }
    },

    // BOARD GAMES & LOGIC STRENGTHENING
    "board_games": {
        games: [
            { id: 401, name: "♟️ Chess", description: "The ultimate game of strategy and planning. Learn opening tactics, middle game strategy, and checkmate patterns.", points: 50, difficulty: "hard" },
            { id: 402, name: "🔴 Chinese Checkers", description: "Fast-paced game of movement and positioning. Race to get all your pieces to the opposite side.", points: 40, difficulty: "medium" },
            { id: 403, name: "🔵 Checkers", description: "Classic game of jumping and capturing. Master the strategy of piece movement and promotion.", points: 35, difficulty: "medium" },
            { id: 404, name: "🔷 Connect Four", description: "Game of pattern recognition and blocking. Think ahead and strategically place your pieces.", points: 30, difficulty: "easy" },
            { id: 405, name: "🔢 Sudoku", description: "Logic puzzle game with numbers. Fill the grid following the rules: 1-9 in each row, column, and box.", points: 25, difficulty: "medium" },
            { id: 406, name: "🧩 Rubik's Cube Solver", description: "Master the three-dimensional puzzle. Learn layer-by-layer solving techniques.", points: 45, difficulty: "hard" },
            { id: 407, name: "🎯 Tic-Tac-Toe Advanced", description: "Classic game with strategic depth. Find patterns and defensive positions.", points: 15, difficulty: "easy" }
        ]
    }
};

// Randomizer function to shuffle questions
quizzes.getRandomQuestions = function(grade, subject, difficulty, count = 5) {
    try {
        const questions = quizzes[grade]?.[subject]?.[difficulty] || [];
        
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
quizzes.getAllQuestions = function(grade, subject, difficulty) {
    try {
        return quizzes[grade]?.[subject]?.[difficulty] || [];
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

module.exports = quizzes;
