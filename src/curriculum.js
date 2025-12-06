// Comprehensive Curriculum Database
// Standards-based learning objectives for all grades K-12 and high school courses

const curriculum = {
    // GRADES K-8 CURRICULUM
    kindergarten: {
        name: 'Kindergarten',
        subjects: {
            reading: {
                name: 'Reading & Language Arts',
                objectives: [
                    'Recognize and name all upper and lowercase letters',
                    'Understand letter-sound relationships',
                    'Identify basic sight words',
                    'Follow simple oral instructions',
                    'Listen to and understand stories',
                    'Retell familiar stories',
                    'Use pictures to understand text'
                ],
                topics: ['Letter Recognition', 'Phonics', 'Sight Words', 'Listening', 'Story Comprehension'],
                standards: 'Common Core K.RF, K.L'
            },
            math: {
                name: 'Mathematics',
                objectives: [
                    'Count to 20 and beyond',
                    'Recognize numbers 0-10',
                    'Understand basic addition and subtraction',
                    'Identify shapes and colors',
                    'Compare sizes (big, small, tall, short)',
                    'Measure length and weight informally',
                    'Recognize patterns'
                ],
                topics: ['Counting', 'Number Recognition', 'Basic Addition', 'Shapes', 'Measurement', 'Patterns'],
                standards: 'Common Core K.CC, K.OA, K.G'
            },
            science: {
                name: 'Science',
                objectives: [
                    'Observe living things and their habitats',
                    'Identify plants and animals',
                    'Understand four seasons',
                    'Learn about weather',
                    'Explore five senses',
                    'Understand day and night',
                    'Explore water and its properties'
                ],
                topics: ['Living Things', 'Plants', 'Animals', 'Weather', 'Senses', 'Water', 'Earth & Sky'],
                standards: 'NGSS K-LS1, K-PS2, K-ESS2'
            }
        }
    },
    
    grade1: {
        name: '1st Grade',
        subjects: {
            reading: {
                name: 'Reading & Language Arts',
                objectives: [
                    'Decode and blend sounds to read words',
                    'Use context clues to understand unknown words',
                    'Understand main idea and details',
                    'Read beginning, middle, end of stories',
                    'Use proper capitalization and punctuation',
                    'Write simple sentences',
                    'Read with expression and fluency'
                ],
                topics: ['Phonics', 'Decoding', 'Vocabulary', 'Story Structure', 'Writing Sentences', 'Punctuation'],
                standards: 'Common Core 1.RF, 1.RL, 1.W'
            },
            math: {
                name: 'Mathematics',
                objectives: [
                    'Understand place value (tens and ones)',
                    'Add and subtract within 20',
                    'Solve word problems with addition and subtraction',
                    'Tell time to the hour',
                    'Measure length in inches and centimeters',
                    'Understand equal groups and arrays',
                    'Identify 2D and 3D shapes'
                ],
                topics: ['Place Value', 'Addition & Subtraction', 'Word Problems', 'Time', 'Measurement', 'Shapes'],
                standards: 'Common Core 1.NBT, 1.OA, 1.MD'
            },
            science: {
                name: 'Science',
                objectives: [
                    'Plan and conduct simple investigations',
                    'Observe and describe properties of materials',
                    'Understand life cycles of plants and animals',
                    'Learn about human body and health',
                    'Understand day/night cycle',
                    'Explore forces and motion',
                    'Classify living and nonliving things'
                ],
                topics: ['Scientific Method', 'Matter', 'Life Cycles', 'Human Body', 'Earth', 'Forces', 'Classification'],
                standards: 'NGSS 1-LS1, 1-PS2, 1-ESS1'
            }
        }
    },

    grade2: {
        name: '2nd Grade',
        subjects: {
            reading: {
                name: 'Reading & Language Arts',
                objectives: [
                    'Read level-appropriate texts with fluency',
                    'Identify characters, setting, and plot',
                    'Understand cause and effect',
                    'Make predictions about text',
                    'Compare and contrast stories',
                    'Use complete sentences in writing',
                    'Spell grade-level appropriate words correctly',
                    'Use proper grammar and punctuation'
                ],
                topics: ['Fluency', 'Comprehension', 'Characters', 'Plot', 'Cause & Effect', 'Spelling', 'Grammar'],
                standards: 'Common Core 2.RL, 2.RF, 2.L'
            },
            math: {
                name: 'Mathematics',
                objectives: [
                    'Understand even and odd numbers',
                    'Add and subtract within 100',
                    'Understand place value to 1000',
                    'Measure length, weight, and capacity',
                    'Tell time to nearest 5 minutes',
                    'Count coins and solve money problems',
                    'Interpret simple data on graphs',
                    'Identify and draw shapes'
                ],
                topics: ['Even & Odd', 'Addition & Subtraction', 'Place Value', 'Measurement', 'Money', 'Data & Graphs', 'Geometry'],
                standards: 'Common Core 2.NBT, 2.MD, 2.OA'
            },
            science: {
                name: 'Science',
                objectives: [
                    'Understand structure and function of organisms',
                    'Learn about habitats and adaptation',
                    'Understand weather patterns',
                    'Explore water cycle',
                    'Understand plant and animal needs',
                    'Learn about ecosystems',
                    'Understand basic pushes and pulls',
                    'Explore light and sound'
                ],
                topics: ['Organisms', 'Habitats', 'Weather', 'Water Cycle', 'Needs', 'Ecosystems', 'Forces', 'Light & Sound'],
                standards: 'NGSS 2-LS1, 2-PS1, 2-ESS2'
            }
        }
    },

    grade3: {
        name: '3rd Grade',
        subjects: {
            reading: {
                name: 'Reading & Language Arts',
                objectives: [
                    'Read and comprehend complex texts',
                    'Identify main idea and supporting details',
                    'Use context to understand vocabulary',
                    'Identify author\'s purpose',
                    'Make inferences from text',
                    'Write organized multi-sentence paragraphs',
                    'Use compound and complex sentences',
                    'Spell correctly and use proper punctuation'
                ],
                topics: ['Main Idea', 'Details', 'Inference', 'Author\'s Purpose', 'Vocabulary', 'Writing', 'Grammar'],
                standards: 'Common Core 3.RL, 3.RF, 3.W'
            },
            math: {
                name: 'Mathematics',
                objectives: [
                    'Understand multiplication and division',
                    'Multiply and divide within 100',
                    'Solve two-step word problems',
                    'Understand fractions as parts of a whole',
                    'Measure and estimate length, weight',
                    'Tell time and calculate elapsed time',
                    'Interpret and create bar graphs',
                    'Identify area and perimeter'
                ],
                topics: ['Multiplication', 'Division', 'Word Problems', 'Fractions', 'Measurement', 'Data', 'Geometry'],
                standards: 'Common Core 3.OA, 3.NF, 3.MD'
            },
            science: {
                name: 'Science',
                objectives: [
                    'Understand structure and functions of plants and animals',
                    'Learn about animal behavior and needs',
                    'Understand heredity and variation',
                    'Explore earth materials and changes',
                    'Understand rocks and soil',
                    'Learn about fossils',
                    'Understand energy transfer',
                    'Explore magnetic and non-magnetic objects'
                ],
                topics: ['Plants', 'Animals', 'Heredity', 'Earth Materials', 'Fossils', 'Energy', 'Magnetism'],
                standards: 'NGSS 3-LS1, 3-PS1, 3-ESS2'
            }
        }
    },

    // HIGH SCHOOL CURRICULUM
    algebra1: {
        name: 'Algebra 1',
        subjects: {
            core: {
                name: 'Algebra 1 Core Topics',
                objectives: [
                    'Solve linear equations and inequalities',
                    'Graph linear equations and functions',
                    'Understand slope and y-intercept',
                    'Solve systems of linear equations',
                    'Work with polynomials and factoring',
                    'Solve quadratic equations',
                    'Understand exponential functions',
                    'Analyze and interpret data'
                ],
                topics: ['Linear Equations', 'Graphing', 'Functions', 'Systems', 'Polynomials', 'Quadratics', 'Exponentials', 'Statistics'],
                standards: 'Common Core HSA.CED, HSA.REI, HSF.IF'
            }
        }
    },

    geometry: {
        name: 'Geometry',
        subjects: {
            core: {
                name: 'Geometry Core Topics',
                objectives: [
                    'Understand congruence and similarity',
                    'Prove geometric theorems',
                    'Calculate area and volume',
                    'Understand trigonometric ratios',
                    'Work with circles and their properties',
                    'Understand coordinate geometry',
                    'Apply geometric reasoning to real-world problems',
                    'Understand transformations and symmetry'
                ],
                topics: ['Congruence', 'Similarity', 'Proofs', 'Area & Volume', 'Trigonometry', 'Circles', 'Transformations'],
                standards: 'Common Core HSG.CO, HSG.SRT, HSG.C'
            }
        }
    },

    apBiology: {
        name: 'AP Biology',
        subjects: {
            core: {
                name: 'AP Biology Big Ideas',
                objectives: [
                    'Understand evolution and natural selection',
                    'Study cellular structure and function',
                    'Learn DNA replication and protein synthesis',
                    'Understand cell division and genetic inheritance',
                    'Explore ecology and population dynamics',
                    'Study organism systems and homeostasis',
                    'Understand energy transfer in living systems',
                    'Study plant and animal physiology'
                ],
                topics: ['Evolution', 'Cell Biology', 'Genetics', 'Molecular Biology', 'Ecology', 'Physiology', 'Homeostasis'],
                standards: 'AP College Board AP Biology Framework'
            }
        }
    },

    usHistory: {
        name: 'US History',
        subjects: {
            core: {
                name: 'US History Core Topics',
                objectives: [
                    'Understand Native American societies',
                    'Study European exploration and colonization',
                    'Learn causes and effects of American Revolution',
                    'Understand formation of US government',
                    'Study westward expansion',
                    'Understand Civil War and Reconstruction',
                    'Study Industrial Revolution and immigration',
                    'Understand 20th and 21st century America',
                    'Analyze primary and secondary sources'
                ],
                topics: ['Colonial Period', 'Revolution', 'Constitution', 'Expansion', 'Civil War', 'Industrial Era', 'Modern America'],
                standards: 'C3 Framework for Social Studies'
            }
        }
    },

    apEnglish: {
        name: 'AP English Language & Composition',
        subjects: {
            core: {
                name: 'AP English Core Topics',
                objectives: [
                    'Analyze rhetoric and persuasive techniques',
                    'Study rhetorical appeals (ethos, pathos, logos)',
                    'Write effective arguments and essays',
                    'Analyze complex texts and arguments',
                    'Understand syntax and style',
                    'Master evidence-based writing',
                    'Develop research and writing skills',
                    'Prepare for AP exam'
                ],
                topics: ['Rhetoric', 'Argument', 'Analysis', 'Syntax', 'Style', 'Evidence', 'Essay Writing'],
                standards: 'AP College Board AP Lang Framework'
            }
        }
    }
};

module.exports = curriculum;
