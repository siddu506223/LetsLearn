// US Curriculum structure for K-12
// Organized by grade level with subjects and topics

const US_CURRICULUM = {
    elementary: {
        label: 'Elementary School',
        grades: ['K', '1st', '2nd', '3rd', '4th', '5th'],
        subjects: {
            math: {
                label: 'Math',
                K: [
                    'Counting (0-10)',
                    'Number Recognition',
                    'Basic Addition',
                    'Shapes and Colors',
                    'Measurement and Length'
                ],
                '1st': [
                    'Addition (0-20)',
                    'Subtraction (0-20)',
                    'Number Bonds',
                    'Place Value (Tens and Ones)',
                    'Comparing Numbers',
                    'Measurement'
                ],
                '2nd': [
                    'Addition (2-digit)',
                    'Subtraction (2-digit)',
                    'Skip Counting',
                    'Grouping and Arrays',
                    'Measurement and Time',
                    'Money and Coins'
                ],
                '3rd': [
                    'Multiplication Facts',
                    'Division Basics',
                    'Fractions (1/2, 1/3, 1/4)',
                    'Place Value (Hundreds)',
                    'Geometry and Perimeter',
                    'Data and Graphs'
                ],
                '4th': [
                    'Multi-digit Multiplication',
                    'Division with Remainders',
                    'Fractions (Add/Subtract)',
                    'Decimals',
                    'Factors and Multiples',
                    'Area and Perimeter'
                ],
                '5th': [
                    'Decimal Operations',
                    'Fraction Operations',
                    'Multiplication Strategies',
                    'Division Strategies',
                    'Ratios and Proportions',
                    'Volume and Geometry'
                ]
            },
            reading: {
                label: 'Reading & Language Arts',
                K: [
                    'Letter Recognition',
                    'Sound Awareness',
                    'Word Recognition',
                    'Simple Sentences',
                    'Story Comprehension'
                ],
                '1st': [
                    'Phonics (CVC Words)',
                    'Word Families',
                    'Simple Stories',
                    'Main Idea',
                    'Sequencing Events'
                ],
                '2nd': [
                    'Blending Sounds',
                    'Sight Words',
                    'Story Details',
                    'Character and Setting',
                    'Compare and Contrast'
                ],
                '3rd': [
                    'Fluent Reading',
                    'Vocabulary Building',
                    'Story Elements',
                    'Cause and Effect',
                    'Fact vs. Opinion'
                ],
                '4th': [
                    'Inference Making',
                    'Theme Identification',
                    'Author Purpose',
                    'Multiple Meanings',
                    'Context Clues'
                ],
                '5th': [
                    'Literary Analysis',
                    'Summarization',
                    'Prediction Skills',
                    'Text Structure',
                    'Critical Thinking'
                ]
            },
            writing: {
                label: 'Writing',
                K: [
                    'Letter Formation',
                    'Simple Words',
                    'Phonetic Spelling',
                    'Drawing and Writing'
                ],
                '1st': [
                    'Simple Sentences',
                    'Capitalizing Sentences',
                    'Punctuation Basics',
                    'Personal Narratives'
                ],
                '2nd': [
                    'Sentence Combining',
                    'Paragraph Writing',
                    'Story Writing',
                    'Editing Skills'
                ],
                '3rd': [
                    'Organized Paragraphs',
                    'Narrative Writing',
                    'Opinion Writing',
                    'Descriptive Details'
                ],
                '4th': [
                    'Informative Writing',
                    'Opinion Essays',
                    'Dialogue Writing',
                    'Revision Strategies'
                ],
                '5th': [
                    'Five-Paragraph Essays',
                    'Research Writing',
                    'Persuasive Writing',
                    'Publishing Projects'
                ]
            },
            science: {
                label: 'Science',
                K: [
                    'Living vs. Non-Living',
                    'Animals and Habitats',
                    'Plants and Growth',
                    'Weather and Seasons',
                    'Five Senses'
                ],
                '1st': [
                    'Life Cycles',
                    'Animal Characteristics',
                    'Plant Parts',
                    'Earth and Sky',
                    'Simple Machines'
                ],
                '2nd': [
                    'Habitats and Food Chains',
                    'Weather Patterns',
                    'States of Matter',
                    'Energy and Motion',
                    'Earth\'s Resources'
                ],
                '3rd': [
                    'Animal Life Cycles',
                    'Plant Life Cycles',
                    'Weather and Water',
                    'Rocks and Soil',
                    'Light and Sound'
                ],
                '4th': [
                    'Ecosystems',
                    'Adaptations',
                    'Earth\'s Structure',
                    'Water Cycle',
                    'Fossils'
                ],
                '5th': [
                    'Cells and Organisms',
                    'Human Body Systems',
                    'Heredity and Variation',
                    'Weather Systems',
                    'Solar System'
                ]
            },
            socialstudies: {
                label: 'Social Studies',
                K: [
                    'Family and Community',
                    'Community Helpers',
                    'Holidays and Traditions',
                    'Basic Geography',
                    'Rules and Responsibilities'
                ],
                '1st': [
                    'Neighborhoods',
                    'Maps and Directions',
                    'Jobs and Work',
                    'Goods and Services',
                    'Citizenship'
                ],
                '2nd': [
                    'Communities',
                    'Native Americans',
                    'Early Explorers',
                    'Maps and Geography',
                    'Economics Basics'
                ],
                '3rd': [
                    'Colonial America',
                    'American Symbols',
                    'State and Local Government',
                    'Economy and Trade',
                    'Geography Regions'
                ],
                '4th': [
                    'State History',
                    'Geography Skills',
                    'Native American Nations',
                    'American Expansion',
                    'Landmarks and Heritage'
                ],
                '5th': [
                    'Pre-Columbian Americas',
                    'Colonial Period',
                    'Revolutionary War',
                    'Early United States',
                    'Constitution and Government'
                ]
            }
        }
    },
    middle: {
        label: 'Middle School',
        grades: ['6th', '7th', '8th'],
        subjects: {
            math: {
                label: 'Mathematics',
                '6th': [
                    'Ratios and Proportions',
                    'Fractions Calculations',
                    'Decimals and Percentages',
                    'Integers',
                    'Expressions and Equations',
                    'Area and Surface Area'
                ],
                '7th': [
                    'Rational Numbers',
                    'Proportional Relationships',
                    'Expressions and Equations',
                    'Inequalities',
                    'Geometry',
                    'Statistics and Probability'
                ],
                '8th': [
                    'Linear Equations',
                    'Systems of Equations',
                    'Functions',
                    'Exponents and Radicals',
                    'Pythagorean Theorem',
                    'Transformations'
                ]
            },
            english: {
                label: 'English Language Arts',
                '6th': [
                    'Summary and Analysis',
                    'Theme and Setting',
                    'Character Development',
                    'Narrative Writing',
                    'Vocabulary Strategies',
                    'Speaking and Listening'
                ],
                '7th': [
                    'Literary Elements',
                    'Author\'s Tone and Perspective',
                    'Figurative Language',
                    'Persuasive Writing',
                    'Research Skills',
                    'Citation Basics'
                ],
                '8th': [
                    'Complex Texts',
                    'Rhetoric and Arguments',
                    'Essay Writing',
                    'Media Literacy',
                    'Debate and Discussion',
                    'Literature Analysis'
                ]
            },
            science: {
                label: 'Science',
                '6th': [
                    'Earth Systems',
                    'Plate Tectonics',
                    'Weather and Climate',
                    'Human Body Systems',
                    'Ecosystem Dynamics'
                ],
                '7th': [
                    'Cells and Life Processes',
                    'Genetics and Heredity',
                    'Evolution',
                    'Organisms and Interactions',
                    'Energy and Waves'
                ],
                '8th': [
                    'Atomic Structure',
                    'Chemical Reactions',
                    'Motion and Forces',
                    'Energy Transfer',
                    'Space and Astronomy'
                ]
            },
            socialstudies: {
                label: 'Social Studies',
                '6th': [
                    'Ancient Civilizations',
                    'Geography Skills',
                    'Cultural Diversity',
                    'Government Systems',
                    'Economic Concepts'
                ],
                '7th': [
                    'Medieval Europe',
                    'Renaissance and Reformation',
                    'Age of Exploration',
                    'Colonial Americas',
                    'Global Cultures'
                ],
                '8th': [
                    'American Revolution',
                    'Constitution and Government',
                    'Civil War and Reconstruction',
                    'Industrial Revolution',
                    'US Expansion'
                ]
            },
            electives: {
                label: 'Electives',
                '6th': [
                    'Technology Basics',
                    'Digital Citizenship',
                    'Introduction to Coding',
                    'Visual Arts',
                    'Music'
                ],
                '7th': [
                    'Web Design',
                    'Computer Applications',
                    'Media Production',
                    'Career Exploration',
                    'Financial Literacy'
                ],
                '8th': [
                    'App Development',
                    'Artificial Intelligence',
                    'Data Science Basics',
                    'Engineering Design',
                    'Business Basics'
                ]
            }
        }
    },
    high: {
        label: 'High School',
        subjects: {
            mathematics: {
                label: 'Mathematics',
                courses: [
                    'Algebra I',
                    'Geometry',
                    'Algebra II',
                    'Precalculus',
                    'Calculus',
                    'Statistics',
                    'Linear Algebra'
                ],
                topics: {
                    'Algebra I': [
                        'Real Numbers',
                        'Equations and Inequalities',
                        'Systems of Equations',
                        'Polynomials',
                        'Factoring',
                        'Quadratic Equations',
                        'Rational Expressions',
                        'Exponents and Radicals'
                    ],
                    'Geometry': [
                        'Points, Lines, and Planes',
                        'Proofs and Logic',
                        'Angles and Triangles',
                        'Quadrilaterals and Polygons',
                        'Circles',
                        'Area and Perimeter',
                        'Volume and Surface Area',
                        'Transformations'
                    ],
                    'Algebra II': [
                        'Sequences and Series',
                        'Exponential Functions',
                        'Logarithmic Functions',
                        'Trigonometric Functions',
                        'Complex Numbers',
                        'Conic Sections',
                        'Systems of Equations',
                        'Matrix Operations'
                    ]
                }
            },
            english: {
                label: 'English Language Arts',
                courses: [
                    'English I (9th Grade)',
                    'English II (10th Grade)',
                    'English III (11th Grade)',
                    'English IV (12th Grade)',
                    'AP Literature',
                    'AP Language'
                ],
                topics: {
                    'English I (9th Grade)': [
                        'Literary Analysis',
                        'Character Development',
                        'Plot and Structure',
                        'Narrative Essay',
                        'Shakespearean Drama',
                        'Poetry Analysis'
                    ],
                    'English II (10th Grade)': [
                        'World Literature',
                        'Cultural Perspectives',
                        'Persuasive Writing',
                        'Research Papers',
                        'Argumentative Essays',
                        'Speech and Rhetoric'
                    ],
                    'English III (11th Grade)': [
                        'American Literature',
                        'Historical Context',
                        'Critical Analysis',
                        'Socratic Seminars',
                        'Media Critique',
                        'Document-based Essays'
                    ],
                    'English IV (12th Grade)': [
                        'Contemporary Literature',
                        'Philosophy and Ethics',
                        'College Essay Writing',
                        'Journalism',
                        'Creative Writing',
                        'Literature Synthesis'
                    ]
                }
            },
            science: {
                label: 'Science',
                courses: [
                    'Biology',
                    'Chemistry',
                    'Physics',
                    'AP Biology',
                    'AP Chemistry',
                    'AP Physics',
                    'Environmental Science'
                ],
                topics: {
                    'Biology': [
                        'Cells and Organelles',
                        'Genetics and DNA',
                        'Evolution',
                        'Ecosystems',
                        'Human Body Systems',
                        'Photosynthesis and Respiration'
                    ],
                    'Chemistry': [
                        'Atomic Structure',
                        'Chemical Bonding',
                        'Chemical Reactions',
                        'Stoichiometry',
                        'Solutions and Solubility',
                        'Acids and Bases',
                        'Thermochemistry'
                    ],
                    'Physics': [
                        'Motion and Forces',
                        'Energy',
                        'Waves',
                        'Electricity',
                        'Magnetism',
                        'Modern Physics',
                        'Mechanics'
                    ]
                }
            },
            socialstudies: {
                label: 'Social Studies',
                courses: [
                    'World History',
                    'US History',
                    'Government',
                    'Economics',
                    'AP US History',
                    'AP Government'
                ],
                topics: {
                    'World History': [
                        'Ancient Empires',
                        'Medieval Period',
                        'Renaissance',
                        'Age of Exploration',
                        'Industrial Revolution',
                        'Modern History',
                        'World Wars'
                    ],
                    'US History': [
                        'Colonial Period',
                        'Revolutionary Era',
                        'Early Republic',
                        'Westward Expansion',
                        'Civil War and Reconstruction',
                        'Industrialization',
                        'Progressive Era',
                        '20th Century America'
                    ],
                    'Government': [
                        'Constitution',
                        'Branches of Government',
                        'Political Parties',
                        'Voting Systems',
                        'Civil Rights',
                        'International Relations',
                        'Law and Justice'
                    ],
                    'Economics': [
                        'Supply and Demand',
                        'Market Systems',
                        'Money and Banking',
                        'Inflation and Unemployment',
                        'International Trade',
                        'Consumer Economics',
                        'Personal Finance'
                    ]
                }
            }
        }
    }
};

module.exports = US_CURRICULUM;
