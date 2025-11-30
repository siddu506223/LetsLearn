// Comprehensive Quiz Content for Grades K-12
// With Science, History, Social Studies, Math, and Reading
// Includes image support via imageUrl property

const quizzes = {
    // GRADE 1 - NEW
    grade1: {
        reading: {
            easy: [
                { id: 1001, question: "What sound does a cat make?", options: ["Woof", "Meow", "Moo", "Baa"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Cats say 'Meow'. Dogs say 'Woof', cows say 'Moo', and sheep say 'Baa'." },
                { id: 1002, question: "How many sides does a square have?", options: ["3", "4", "5", "6"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A square has 4 sides. A triangle has 3 sides and a pentagon has 5 sides." },
                { id: 1003, question: "Which word rhymes with 'cat'?", options: ["Dog", "Hat", "Run", "Jump"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "'Hat' rhymes with 'cat'. Words that rhyme have the same ending sound." },
                { id: 1004, question: "What is the opposite of 'big'?", options: ["Tall", "Small", "Heavy", "Light"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "'Small' is the opposite of 'big'. Opposites are words that mean the reverse." },
                { id: 1005, question: "Which letter comes after 'B'?", options: ["A", "C", "D", "E"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "'C' comes after 'B' in the alphabet. The alphabet goes A, B, C, D, E..." },
                { id: 1006, question: "How many vowels are in the word 'apple'?", options: ["1", "2", "3", "4"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "'Apple' has 2 vowels: 'a' and 'e'. Vowels are A, E, I, O, U." },
                { id: 1007, question: "What does a book contain?", options: ["Pictures only", "Words and pictures", "Only numbers", "Only colors"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Books contain words and pictures that tell stories or give information." },
                { id: 1008, question: "Which sentence is correct?", options: ["The dog are happy", "The dog is happy", "Dog is happy the", "Happy the dog is"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "'The dog is happy' is the correct sentence. The verb 'is' matches the singular 'dog'." },
                { id: 1009, question: "What is the main character in a story called?", options: ["Hero", "Villain", "Friend", "Family"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "The main character is often called the hero. The villain is the bad character." },
                { id: 1010, question: "Which word means 'very happy'?", options: ["Sad", "Angry", "Joyful", "Tired"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "'Joyful' means very happy. Sad means unhappy, angry means mad." }
            ],
            medium: [
                { id: 1011, question: "What is the past tense of 'run'?", options: ["Runs", "Ran", "Running", "Will run"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "'Ran' is the past tense of 'run'. 'Runs' is present, 'running' is continuous." },
                { id: 1012, question: "Which word is a synonym for 'beautiful'?", options: ["Ugly", "Pretty", "Broken", "Small"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "'Pretty' is a synonym for 'beautiful'. Both words mean pleasing to look at." },
                { id: 1013, question: "What does 'conclusion' mean in a story?", options: ["The beginning", "The middle", "The end", "The plot"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "The conclusion is the end of the story. The beginning is the start, the middle is where the plot develops." },
                { id: 1014, question: "Which punctuation mark ends a question?", options: ["Period", "Comma", "Question mark", "Exclamation"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "A question mark (?) ends a question. A period (.) ends a statement." },
                { id: 1015, question: "What is an adjective?", options: ["A person", "A describing word", "An action", "A place"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "An adjective is a word that describes nouns (like 'big', 'blue', 'happy')." }
            ],
            hard: [
                { id: 1016, question: "What is 'inference' in reading?", options: ["Reading word by word", "Looking up words", "Making an educated guess", "Skipping sentences"], correctAnswer: 2, points: 15, difficulty: "hard", explanation: "Inference means making an educated guess based on clues in the text." },
                { id: 1017, question: "Which is an example of a metaphor?", options: ["The cat is like a tiger", "The cat is a tiger", "The cat and tiger", "A cat or tiger"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "'The cat is a tiger' is a metaphor. It directly compares without using 'like'." }
            ]
        },
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
        },
        science: {
            easy: [
                { id: 401, question: "What do plants need to grow?", options: ["Water and sunlight", "Only water", "Only air", "Only soil"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "Plants need water, sunlight, and soil to grow." },
                { id: 402, question: "Which animal is a mammal?", options: ["Fish", "Bird", "Dog", "Snake"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Dogs are mammals. They have fur and feed milk to their babies." },
                { id: 403, question: "How many seasons are there?", options: ["2", "3", "4", "5"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "There are 4 seasons: Spring, Summer, Fall, and Winter." },
                { id: 404, question: "What does the sun provide?", options: ["Light and heat", "Only light", "Only heat", "Rain"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "The sun provides both light and heat to Earth." },
                { id: 405, question: "What do fish use to breathe?", options: ["Lungs", "Gills", "Skin", "Mouth"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Fish use gills to breathe underwater." },
                { id: 406, question: "How many legs does an insect have?", options: ["4", "6", "8", "10"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Insects have 6 legs." },
                { id: 407, question: "What is frozen water called?", options: ["Steam", "Ice", "Snow", "Frost"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Ice is frozen water." },
                { id: 408, question: "Which planet do we live on?", options: ["Mars", "Venus", "Earth", "Mercury"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "We live on planet Earth." },
                { id: 409, question: "What do bees make?", options: ["Butter", "Honey", "Cheese", "Milk"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Bees make honey from flower nectar." },
                { id: 410, question: "What is the weather like in summer?", options: ["Cold", "Hot", "Rainy", "Snowy"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Summer is hot. Winter is cold." }
            ],
            medium: [
                { id: 411, question: "What is photosynthesis?", options: ["How plants make food from sunlight", "How animals breathe", "How water freezes", "How rocks form"], correctAnswer: 0, points: 10, difficulty: "medium", explanation: "Photosynthesis is how plants use sunlight, water, and air to make food." },
                { id: 412, question: "What are the three states of matter?", options: ["Solid, Liquid, Gas", "Hot, Cold, Warm", "Heavy, Light, Medium", "Big, Small, Tiny"], correctAnswer: 0, points: 10, difficulty: "medium", explanation: "The three states are solid (ice), liquid (water), and gas (steam)." },
                { id: 413, question: "How many bones are in a human body?", options: ["106", "206", "306", "406"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "An adult human has 206 bones." },
                { id: 414, question: "What gas do we breathe out?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "We breathe out carbon dioxide (CO2)." },
                { id: 415, question: "Which type of animal lays eggs?", options: ["Mammals", "Birds and reptiles", "Fish only", "Insects only"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Birds and reptiles lay eggs." }
            ],
            hard: [
                { id: 416, question: "What is the process by which water changes to vapor?", options: ["Condensation", "Evaporation", "Freezing", "Melting"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "Evaporation is when liquid water turns into water vapor due to heat." },
                { id: 417, question: "What percentage of Earth is covered by water?", options: ["50%", "65%", "71%", "85%"], correctAnswer: 2, points: 15, difficulty: "hard", explanation: "Approximately 71% of Earth's surface is covered by water." }
            ]
        },
        writing: {
            easy: [
                { id: 501, question: "What is the first step in writing?", options: ["Revise", "Plan your ideas", "Publish", "Edit"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Planning is the first step in writing. You organize your thoughts before writing." },
                { id: 502, question: "What does 'brainstorm' mean?", options: ["A storm", "Thinking of ideas", "Erasing", "Copying"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Brainstorming means thinking of ideas and writing them down." },
                { id: 503, question: "What is a 'draft'?", options: ["Wind", "A first copy", "The final version", "A revision"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A draft is a first or rough version of your writing." },
                { id: 504, question: "What does 'revise' mean?", options: ["To erase", "To improve by making changes", "To copy", "To finish"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Revising means making changes to improve your writing." },
                { id: 505, question: "What is a 'sentence'?", options: ["A punishment", "A group of words with a subject and verb", "A story", "A paragraph"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A sentence is a group of words that expresses a complete thought." },
                { id: 506, question: "What does 'edit' mean?", options: ["Erase everything", "Check for errors and fix them", "Write", "Copy"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Editing means checking for and fixing spelling and grammar errors." },
                { id: 507, question: "What is a 'paragraph'?", options: ["One sentence", "A group of sentences about one topic", "A word", "A title"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A paragraph is a group of sentences about one main idea." },
                { id: 508, question: "What should every paragraph have?", options: ["Pictures", "A main idea", "Numbers", "Colors"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Every paragraph should have a main idea that ties sentences together." },
                { id: 509, question: "What is 'handwriting'?", options: ["Typing", "Writing by hand", "Drawing", "Printing"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Handwriting is writing with a pen or pencil by hand." },
                { id: 510, question: "What comes at the end of a sentence?", options: ["A space", "A period or other punctuation", "A capital letter", "Nothing"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A sentence ends with a period (.), question mark (?), or exclamation mark (!)." }
            ],
            medium: [
                { id: 511, question: "What is the main purpose of 'prewriting'?", options: ["To publish", "To organize ideas before writing", "To check spelling", "To make copies"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Prewriting helps organize your thoughts and ideas before you start writing." },
                { id: 512, question: "What is a 'topic sentence'?", options: ["A question", "The sentence that tells the main idea", "The last sentence", "A title"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "A topic sentence introduces the main idea of a paragraph." },
                { id: 513, question: "What should you do after writing a draft?", options: ["Submit it", "Revise and edit it", "Erase it", "Copy it"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "You should revise and edit your draft to improve it." },
                { id: 514, question: "What is 'descriptive writing'?", options: ["Writing a story", "Using words to describe something in detail", "Writing numbers", "Copying text"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Descriptive writing uses vivid words to describe people, places, or things." },
                { id: 515, question: "What is proper punctuation?", options: ["Using any marks", "Using correct marks to end and organize sentences", "No punctuation", "Random marks"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Proper punctuation includes periods, commas, and question marks placed correctly." }
            ],
            hard: [
                { id: 516, question: "What is a 'thesis statement'?", options: ["A test", "The main argument of your writing", "A type of story", "A conclusion"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "A thesis statement is the main point or argument you will prove in your writing." },
                { id: 517, question: "What is the difference between 'revising' and 'editing'?", options: ["Same thing", "Revising changes content, editing fixes errors", "Editing changes content, revising fixes errors", "No difference"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "Revising improves your ideas and structure, editing fixes grammar and spelling." }
            ]
        },
        history: {
            easy: [
                { id: 601, question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "George Washington was the first President and is called the 'Father of His Country'." },
                { id: 602, question: "In what year did America celebrate its 100th birthday?", options: ["1876", "1975", "1976", "1976"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "America celebrated its 100th birthday (Centennial) in 1876." },
                { id: 603, question: "What year did the Titanic sink?", options: ["1900", "1912", "1920", "1945"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The Titanic sank in 1912 after hitting an iceberg." },
                { id: 604, question: "Which ancient wonder is a pyramid?", options: ["Colosseum", "Great Wall", "Great Pyramid of Giza", "Hanging Gardens"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The Great Pyramid of Giza in Egypt is one of the Seven Wonders." },
                { id: 605, question: "What year did Columbus sail to America?", options: ["1391", "1492", "1592", "1692"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Christopher Columbus sailed to America in 1492." },
                { id: 606, question: "Who wrote the Declaration of Independence?", options: ["Benjamin Franklin", "Thomas Jefferson", "John Adams", "George Washington"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Thomas Jefferson drafted the Declaration of Independence in 1776." },
                { id: 607, question: "What holiday celebrates independence?", options: ["Christmas", "Thanksgiving", "4th of July", "New Year"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Independence Day (July 4th) celebrates American independence." },
                { id: 608, question: "Who was a famous inventor?", options: ["Thomas Edison", "George Washington", "Benjamin Franklin", "Both A and C"], correctAnswer: 3, points: 5, difficulty: "easy", explanation: "Thomas Edison invented the lightbulb, and Benjamin Franklin experimented with electricity." },
                { id: 609, question: "What year was the Declaration of Independence signed?", options: ["1774", "1775", "1776", "1777"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The Declaration of Independence was signed on July 4, 1776." },
                { id: 610, question: "Which holiday is on November 11th?", options: ["Veterans Day", "Thanksgiving", "Halloween", "Christmas"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "Veterans Day on November 11th honors military veterans." }
            ],
            medium: [
                { id: 611, question: "Which empire built Machu Picchu?", options: ["Aztec", "Inca", "Maya", "Egyptian"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "The Inca Empire built Machu Picchu around 1450 in Peru." },
                { id: 612, question: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "World War II ended in 1945 with Japan's surrender." },
                { id: 613, question: "Who was the first President elected in the 1800s?", options: ["Thomas Jefferson", "James Monroe", "Andrew Jackson", "John Adams"], correctAnswer: 0, points: 10, difficulty: "medium", explanation: "Thomas Jefferson was elected in 1800, the first president of the new century." },
                { id: 614, question: "What year did the American Civil War begin?", options: ["1859", "1860", "1861", "1862"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "The American Civil War began in 1861." },
                { id: 615, question: "Who led the civil rights movement?", options: ["Malcolm X", "Martin Luther King Jr.", "Rosa Parks", "John F. Kennedy"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Martin Luther King Jr. led the civil rights movement in the 1960s." }
            ],
            hard: [
                { id: 616, question: "What was the main cause of World War I?", options: ["Pearl Harbor", "Assassination of Archduke Franz Ferdinand", "Economic depression", "Religious conflict"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "The assassination of Archduke Franz Ferdinand triggered World War I." },
                { id: 617, question: "What is the term for the period after the Civil War?", options: ["Renaissance", "Reconstruction", "Revolution", "Reform"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "Reconstruction was the period of rebuilding after the Civil War (1865-1877)." }
            ]
        }
    },

    // GRADE 2 - NEW
    grade2: {
        reading: {
            easy: [
                { id: 2001, question: "What is the first step in reading?", options: ["Write a story", "Find the main idea", "Read the words", "Look at pictures"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The first step is to read the words carefully." },
                { id: 2002, question: "What does 'chapter' mean?", options: ["A character", "A section of a book", "A plot", "An ending"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A chapter is a section or part of a book." },
                { id: 2003, question: "Which word rhymes with 'moon'?", options: ["Sun", "Star", "Soon", "Night"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "'Soon' rhymes with 'moon'. Both have the 'oon' sound." },
                { id: 2004, question: "What is a 'character' in a story?", options: ["A letter", "A person in a story", "A place", "A time"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A character is a person, animal, or other being in a story." },
                { id: 2005, question: "What does 'fiction' mean?", options: ["True stories", "Made-up stories", "Biography", "History"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Fiction means made-up stories that are not true. Non-fiction is real." },
                { id: 2006, question: "Which is a punctuation mark?", options: ["A", "B", "!", "2"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "! is an exclamation mark, a punctuation mark. Letters and numbers are not punctuation." },
                { id: 2007, question: "What does 'title' mean?", options: ["An ending", "The name of a book", "A character", "A setting"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The title is the name of a book or story." },
                { id: 2008, question: "Which sentence has correct capital letters?", options: ["the Dog ran fast", "The dog Ran fast", "The dog ran fast", "the dog ran fast"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "'The dog ran fast' is correct. Sentences start with capital letters." },
                { id: 2009, question: "What is a 'noun'?", options: ["An action", "A name of a person or thing", "A describing word", "A direction"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A noun is a word for a person, place, or thing (like 'dog', 'house', 'John')." },
                { id: 2010, question: "What is a 'verb'?", options: ["A thing", "A person", "An action word", "A place"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "A verb is an action word (like 'run', 'jump', 'eat')." }
            ],
            medium: [
                { id: 2011, question: "What is 'theme' in a story?", options: ["The main idea or lesson", "A character", "A setting", "A conflict"], correctAnswer: 0, points: 10, difficulty: "medium", explanation: "The theme is the main idea or lesson of a story." },
                { id: 2012, question: "What does 'setting' mean?", options: ["The plot", "Where and when the story happens", "The characters", "The conflict"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "The setting is where and when a story takes place." },
                { id: 2013, question: "What is 'dialogue'?", options: ["A description", "Conversation between characters", "The plot", "The ending"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Dialogue is a conversation between two or more characters in a story." },
                { id: 2014, question: "What does 'summarize' mean?", options: ["To make it longer", "To tell the main points briefly", "To add details", "To change the ending"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "To summarize is to tell the main points of a story in fewer words." },
                { id: 2015, question: "What is an 'adjective'?", options: ["An action", "A description word", "A person", "A place"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "An adjective is a word that describes a noun (like 'happy', 'big', 'blue')." }
            ],
            hard: [
                { id: 2016, question: "What is 'cause and effect'?", options: ["Why and what happens", "Two events", "Characters", "Setting"], correctAnswer: 0, points: 15, difficulty: "hard", explanation: "Cause is why something happens. Effect is what happens as a result." },
                { id: 2017, question: "What does 'compare' and 'contrast' mean?", options: ["Same and different", "Before and after", "Start and end", "Big and small"], correctAnswer: 0, points: 15, difficulty: "hard", explanation: "Compare means find similarities. Contrast means find differences." }
            ]
        },
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
        },
        science: {
            easy: [
                { id: 2501, question: "What do plants need to grow?", options: ["Water and sunlight", "Only water", "Only air", "Only soil"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "Plants need water, sunlight, and soil to grow." },
                { id: 2502, question: "What is the basic unit of life?", options: ["Atom", "Molecule", "Cell", "Organ"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The cell is the basic unit of life." },
                { id: 2503, question: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "There are 8 planets in our solar system." },
                { id: 2504, question: "What gas do we breathe in?", options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "We breathe in oxygen from the air." },
                { id: 2505, question: "What is the largest ocean?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The Pacific Ocean is the largest ocean." },
                { id: 2506, question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "There are 7 continents on Earth." },
                { id: 2507, question: "What animal has the longest neck?", options: ["Ostrich", "Llama", "Giraffe", "Crane"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Giraffes have the longest necks." },
                { id: 2508, question: "How many legs does a spider have?", options: ["4", "6", "8", "10"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Spiders have 8 legs." },
                { id: 2509, question: "What is the smallest planet?", options: ["Mercury", "Venus", "Mars", "Earth"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "Mercury is the smallest planet." },
                { id: 2510, question: "What do bees pollinate?", options: ["Trees", "Flowers", "Grass", "Rocks"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Bees pollinate flowers." }
            ],
            medium: [
                { id: 2511, question: "What is photosynthesis?", options: ["How plants make food from sunlight", "How animals sleep", "How water freezes", "How rocks break"], correctAnswer: 0, points: 10, difficulty: "medium", explanation: "Photosynthesis is how plants convert sunlight into food energy." },
                { id: 2512, question: "What are the three states of matter?", options: ["Solid, Liquid, Gas", "Hot, Cold, Warm", "Big, Small, Medium", "Hard, Soft, Rough"], correctAnswer: 0, points: 10, difficulty: "medium", explanation: "The three states are solid, liquid, and gas." },
                { id: 2513, question: "What percentage of Earth's surface is water?", options: ["50%", "65%", "71%", "85%"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "About 71% of Earth's surface is covered by water." },
                { id: 2514, question: "How do animals adapt to their environment?", options: ["By changing colors", "Through evolution over time", "By hiding", "By sleeping"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Animals adapt through evolution over generations." },
                { id: 2515, question: "What is the food chain?", options: ["A chain made of food", "The sequence of how energy flows through organisms", "A restaurant", "A chain store"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "The food chain shows how energy passes from one organism to another." }
            ],
            hard: [
                { id: 2516, question: "What is the process of evaporation?", options: ["Water freezing", "Water turning into vapor", "Water boiling", "Water melting"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "Evaporation is when water changes from liquid to gas." },
                { id: 2517, question: "What is biodiversity?", options: ["Diversity of life", "A type of farm", "Uniformity", "Single species"], correctAnswer: 0, points: 15, difficulty: "hard", explanation: "Biodiversity refers to the variety of different species in an ecosystem." }
            ]
        },
        writing: {
            easy: [
                { id: 2601, question: "What is the first step in writing?", options: ["Revise", "Plan your ideas", "Publish", "Edit"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Planning is the first step." },
                { id: 2602, question: "What does 'brainstorm' mean?", options: ["A storm", "Thinking of ideas", "Erasing", "Copying"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Brainstorming means generating ideas." },
                { id: 2603, question: "What is a 'draft'?", options: ["Wind", "A first rough version", "The final version", "An outline"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A draft is the first version before editing." },
                { id: 2604, question: "What is a 'paragraph'?", options: ["One sentence", "A group of sentences about one topic", "A word", "A title"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A paragraph is a group of related sentences." },
                { id: 2605, question: "What punctuation ends a question?", options: ["Period", "Comma", "Question mark", "Exclamation"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "A question mark ends a question." },
                { id: 2606, question: "What does 'revise' mean?", options: ["To erase", "To improve by making changes", "To copy", "To submit"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Revising means making improvements." },
                { id: 2607, question: "What is an 'outline'?", options: ["The outside edge", "A plan for your writing", "A first draft", "An introduction"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "An outline is a structured plan." },
                { id: 2608, question: "What does 'edit' mean?", options: ["Erase", "Check and fix errors", "Write", "Publish"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Editing means finding and correcting errors." },
                { id: 2609, question: "What should a paragraph start with?", options: ["A question", "A topic sentence", "An ending", "A title"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A topic sentence introduces the main idea." },
                { id: 2610, question: "What is 'publishing'?", options: ["Reading", "Sharing your writing", "Editing", "Planning"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Publishing is sharing finished writing." }
            ],
            medium: [
                { id: 2611, question: "What is 'descriptive writing'?", options: ["Telling a story", "Using vivid words to describe", "Writing directions", "Writing facts"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Descriptive writing uses sensory details." },
                { id: 2612, question: "What is a 'topic sentence'?", options: ["A question", "The main idea of a paragraph", "The last sentence", "A conclusion"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "A topic sentence states the main idea." },
                { id: 2613, question: "What is the difference between 'revising' and 'editing'?", options: ["Same thing", "Revising changes content, editing fixes errors", "Editing first", "No difference"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Revising improves ideas; editing fixes grammar." },
                { id: 2614, question: "What should supporting sentences do?", options: ["End the paragraph", "Explain the topic sentence", "Start it", "Question it"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Supporting sentences provide details for the topic." },
                { id: 2615, question: "What is proper writing format?", options: ["No rules", "Margins, indentation, spacing", "Any format", "Random"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "Proper format includes margins and spacing." }
            ],
            hard: [
                { id: 2616, question: "What makes writing engaging?", options: ["Long words", "Varied structure and details", "Complex grammar", "Long paragraphs"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "Engaging writing uses variety and details." },
                { id: 2617, question: "What is the purpose of a conclusion?", options: ["Start the essay", "Summarize and end strongly", "Ask questions", "Add new ideas"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "A conclusion restates main ideas and ends strongly." }
            ]
        },
        history: {
            easy: [
                { id: 2701, question: "Who was the first President?", options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "George Washington was the first President." },
                { id: 2702, question: "What year was America founded?", options: ["1776", "1775", "1777", "1787"], correctAnswer: 0, points: 5, difficulty: "easy", explanation: "America declared independence in 1776." },
                { id: 2703, question: "What holiday celebrates independence?", options: ["Christmas", "Thanksgiving", "July 4th", "New Year"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "Independence Day on July 4th." },
                { id: 2704, question: "What year did the Titanic sink?", options: ["1900", "1912", "1920", "1945"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "The Titanic sank in 1912." },
                { id: 2705, question: "Who discovered America?", options: ["Leif Erikson", "Christopher Columbus", "Vespucci", "Magellan"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Christopher Columbus sailed in 1492." },
                { id: 2706, question: "What was a cause of the Civil War?", options: ["Economics", "Slavery", "Politics", "All above"], correctAnswer: 3, points: 5, difficulty: "easy", explanation: "Multiple factors caused the Civil War." },
                { id: 2707, question: "Who was Abraham Lincoln?", options: ["First President", "Civil War President", "Founder", "Inventor"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Lincoln was President during the Civil War." },
                { id: 2708, question: "Which is an ancient wonder?", options: ["Colosseum", "Great Wall", "Pyramid of Giza", "Gardens"], correctAnswer: 2, points: 5, difficulty: "easy", explanation: "The Great Pyramid of Giza is a wonder." },
                { id: 2709, question: "What is a 'revolution'?", options: ["Spinning", "Major government change", "Circle", "Rotation"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "A revolution is a major change." },
                { id: 2710, question: "Who wrote the Declaration?", options: ["Franklin", "Jefferson", "Adams", "Washington"], correctAnswer: 1, points: 5, difficulty: "easy", explanation: "Thomas Jefferson wrote it." }
            ],
            medium: [
                { id: 2711, question: "When did WWII end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "WWII ended in 1945." },
                { id: 2712, question: "Who built Machu Picchu?", options: ["Aztec", "Inca", "Maya", "Egyptian"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "The Inca Empire built it." },
                { id: 2713, question: "When did the Civil War begin?", options: ["1859", "1860", "1861", "1862"], correctAnswer: 2, points: 10, difficulty: "medium", explanation: "It began in 1861." },
                { id: 2714, question: "Who was Thomas Jefferson?", options: ["General", "President and writer", "King", "Inventor"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "He was President and wrote the Declaration." },
                { id: 2715, question: "What was the Industrial Revolution?", options: ["A war", "Period of new inventions", "A discovery", "Art movement"], correctAnswer: 1, points: 10, difficulty: "medium", explanation: "It was a period of industrial growth." }
            ],
            hard: [
                { id: 2716, question: "What caused World War I?", options: ["Depression", "Assassination of Franz Ferdinand", "Slavery", "Religion"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "The assassination triggered WWI." },
                { id: 2717, question: "What is the Magna Carta?", options: ["Food", "Limited royal power and rights", "Ship", "Battle"], correctAnswer: 1, points: 15, difficulty: "hard", explanation: "It limited the king's power and protected rights." }
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
