/* ========================================
   CURRICULUM DATA - CENLEX-INSPIRED STRUCTURE
   12 Levels: Basic (1-6) + Intermediate (7-12)
   ======================================== */

const CURRICULUM = {
    // BASIC LEVELS (1-6)
    basic: {
        level1: {
            id: 1,
            name: 'Basic 1 - Hello World',
            category: 'basic',
            icon: '🌱',
            unlockRequirement: 0,
            description: 'Greetings, alphabet, and basic introductions',
            topics: ['Alphabet', 'Greetings', 'Personal Info', 'Numbers 1-20'],
            vocabulary: [
                { word: 'Hello', meaning: 'Hola (saludo)', example: 'Hello! How are you?' },
                { word: 'Good morning', meaning: 'Buenos días', example: 'Good morning, teacher!' },
                { word: 'Thank you', meaning: 'Gracias', example: 'Thank you for your help.' },
                { word: 'Please', meaning: 'Por favor', example: 'Please help me.' },
                { word: 'Goodbye', meaning: 'Adiós', example: 'Goodbye! See you tomorrow.' },
                { word: 'Yes', meaning: 'Sí', example: 'Yes, I understand.' },
                { word: 'No', meaning: 'No', example: 'No, thank you.' },
                { word: 'My name is', meaning: 'Mi nombre es', example: 'My name is Maria.' },
                { word: 'Nice to meet you', meaning: 'Gusto en conocerte', example: 'Nice to meet you, John!' },
                { word: 'How are you?', meaning: '¿Cómo estás?', example: 'How are you today?' }
            ],
            games: [
                { type: 'flashcards', title: 'Basic Greetings', difficulty: 'easy' },
                { type: 'matching', title: 'Match Hello & Goodbye', difficulty: 'easy' }
            ]
        },
        
        level2: {
            id: 2,
            name: 'Basic 2 - My World',
            category: 'basic',
            icon: '🏠',
            unlockRequirement: 50,
            description: 'Family, colors, classroom objects',
            topics: ['Family Members', 'Colors', 'School Objects', 'Numbers 20-100'],
            vocabulary: [
                { word: 'Mother', meaning: 'Madre', example: 'My mother is a teacher.' },
                { word: 'Father', meaning: 'Padre', example: 'My father works at home.' },
                { word: 'Sister', meaning: 'Hermana', example: 'I have one sister.' },
                { word: 'Brother', meaning: 'Hermano', example: 'My brother is 10 years old.' },
                { word: 'Red', meaning: 'Rojo', example: 'I like the red car.' },
                { word: 'Blue', meaning: 'Azul', example: 'The sky is blue.' },
                { word: 'Book', meaning: 'Libro', example: 'This is my English book.' },
                { word: 'Pen', meaning: 'Pluma/Bolígrafo', example: 'Can I borrow your pen?' },
                { word: 'Table', meaning: 'Mesa', example: 'Put the book on the table.' },
                { word: 'Chair', meaning: 'Silla', example: 'Please sit on the chair.' }
            ],
            games: [
                { type: 'flashcards', title: 'Family & Colors', difficulty: 'easy' },
                { type: 'matching', title: 'Classroom Objects', difficulty: 'easy' }
            ]
        },
        
        level3: {
            id: 3,
            name: 'Basic 3 - Daily Life',
            category: 'basic',
            icon: '🌞',
            unlockRequirement: 100,
            description: 'Daily routines, time, and simple verbs',
            topics: ['Daily Activities', 'Time Expressions', 'Simple Present', 'Days of Week'],
            vocabulary: [
                { word: 'Wake up', meaning: 'Despertar(se)', example: 'I wake up at 7 AM.' },
                { word: 'Eat', meaning: 'Comer', example: 'I eat breakfast every morning.' },
                { word: 'Sleep', meaning: 'Dormir', example: 'I sleep 8 hours daily.' },
                { word: 'Study', meaning: 'Estudiar', example: 'I study English every day.' },
                { word: 'Work', meaning: 'Trabajar', example: 'My mom works at a hospital.' },
                { word: 'Monday', meaning: 'Lunes', example: 'Monday is the first day.' },
                { word: 'Today', meaning: 'Hoy', example: 'Today is a beautiful day.' },
                { word: 'Tomorrow', meaning: 'Mañana', example: 'See you tomorrow!' },
                { word: 'Morning', meaning: 'Mañana (periodo)', example: 'I exercise in the morning.' },
                { word: 'Night', meaning: 'Noche', example: 'Good night, sleep well.' }
            ],
            games: [
                { type: 'flashcards', title: 'Daily Routine Verbs', difficulty: 'easy' },
                { type: 'sequence', title: 'Order Your Day', difficulty: 'medium' }
            ]
        },
        
        level4: {
            id: 4,
            name: 'Basic 4 - Around Town',
            category: 'basic',
            icon: '🏙️',
            unlockRequirement: 150,
            description: 'Places, directions, and transportation',
            topics: ['Places in City', 'Directions', 'Transportation', 'Prepositions'],
            vocabulary: [
                { word: 'School', meaning: 'Escuela', example: 'I go to school every day.' },
                { word: 'Hospital', meaning: 'Hospital', example: 'The hospital is near here.' },
                { word: 'Park', meaning: 'Parque', example: 'Let\'s play in the park.' },
                { word: 'Store', meaning: 'Tienda', example: 'I buy food at the store.' },
                { word: 'Bus', meaning: 'Autobús', example: 'I take the bus to work.' },
                { word: 'Car', meaning: 'Automóvil/Coche', example: 'My father drives a car.' },
                { word: 'Left', meaning: 'Izquierda', example: 'Turn left at the corner.' },
                { word: 'Right', meaning: 'Derecha', example: 'The school is on the right.' },
                { word: 'Near', meaning: 'Cerca', example: 'The park is near my house.' },
                { word: 'Far', meaning: 'Lejos', example: 'The airport is far from here.' }
            ],
            games: [
                { type: 'flashcards', title: 'Places & Transport', difficulty: 'easy' },
                { type: 'matching', title: 'Find Your Way', difficulty: 'medium' }
            ]
        },
        
        level5: {
            id: 5,
            name: 'Basic 5 - Food & Shopping',
            category: 'basic',
            icon: '🍎',
            unlockRequirement: 200,
            description: 'Food items, shopping, and quantities',
            topics: ['Food Items', 'Shopping Phrases', 'Quantities', 'Likes/Dislikes'],
            vocabulary: [
                { word: 'Apple', meaning: 'Manzana', example: 'I eat an apple every day.' },
                { word: 'Bread', meaning: 'Pan', example: 'I need to buy bread.' },
                { word: 'Water', meaning: 'Agua', example: 'Can I have some water?' },
                { word: 'Milk', meaning: 'Leche', example: 'I drink milk for breakfast.' },
                { word: 'Rice', meaning: 'Arroz', example: 'We eat rice with chicken.' },
                { word: 'How much?', meaning: '¿Cuánto cuesta?', example: 'How much is this shirt?' },
                { word: 'Expensive', meaning: 'Caro', example: 'This watch is expensive.' },
                { word: 'Cheap', meaning: 'Barato', example: 'These shoes are cheap.' },
                { word: 'I like', meaning: 'Me gusta', example: 'I like pizza very much.' },
                { word: 'I want', meaning: 'Yo quiero', example: 'I want a cup of coffee.' }
            ],
            games: [
                { type: 'flashcards', title: 'Food Vocabulary', difficulty: 'easy' },
                { type: 'matching', title: 'Shopping List', difficulty: 'medium' }
            ]
        },
        
        level6: {
            id: 6,
            name: 'Basic 6 - Express Yourself',
            category: 'basic',
            icon: '💬',
            unlockRequirement: 250,
            description: 'Feelings, weather, and basic descriptions',
            topics: ['Emotions', 'Weather', 'Adjectives', 'Simple Questions'],
            vocabulary: [
                { word: 'Happy', meaning: 'Feliz', example: 'I am happy today!' },
                { word: 'Sad', meaning: 'Triste', example: 'Why are you sad?' },
                { word: 'Tired', meaning: 'Cansado', example: 'I am tired after work.' },
                { word: 'Angry', meaning: 'Enojado', example: 'Don\'t be angry with me.' },
                { word: 'Hot', meaning: 'Caliente/Calor', example: 'It\'s very hot today.' },
                { word: 'Cold', meaning: 'Frío', example: 'I feel cold, I need a jacket.' },
                { word: 'Sunny', meaning: 'Soleado', example: 'It\'s a sunny day.' },
                { word: 'Rainy', meaning: 'Lluvioso', example: 'It\'s rainy, take an umbrella.' },
                { word: 'Big', meaning: 'Grande', example: 'That is a big house.' },
                { word: 'Small', meaning: 'Pequeño', example: 'This is a small dog.' }
            ],
            games: [
                { type: 'flashcards', title: 'Feelings & Weather', difficulty: 'easy' },
                { type: 'matching', title: 'Describe It!', difficulty: 'medium' }
            ]
        }
    },
    
    // INTERMEDIATE LEVELS (7-12)
    intermediate: {
        level7: {
            id: 7,
            name: 'Intermediate 1 - Past Stories',
            category: 'intermediate',
            icon: '📖',
            unlockRequirement: 300,
            description: 'Simple past tense and storytelling',
            topics: ['Past Simple', 'Time Markers', 'Regular/Irregular Verbs', 'Story Structure'],
            vocabulary: [
                { word: 'Yesterday', meaning: 'Ayer', example: 'Yesterday I went to the movies.' },
                { word: 'Last week', meaning: 'La semana pasada', example: 'Last week was very busy.' },
                { word: 'Went', meaning: 'Fue/Fui (ir)', example: 'I went to the park yesterday.' },
                { word: 'Saw', meaning: 'Vi (ver)', example: 'I saw a beautiful bird.' },
                { word: 'Had', meaning: 'Tuve/Tenía (tener)', example: 'I had a great time.' },
                { word: 'Made', meaning: 'Hice (hacer)', example: 'I made dinner last night.' },
                { word: 'Bought', meaning: 'Compré (comprar)', example: 'She bought a new phone.' },
                { word: 'Told', meaning: 'Dije/Conté (decir)', example: 'He told me a funny story.' },
                { word: 'Ago', meaning: 'Hace (tiempo)', example: 'Two years ago, I lived in Spain.' },
                { word: 'Was/Were', meaning: 'Era/Estaba', example: 'I was happy yesterday.' }
            ],
            games: [
                { type: 'flashcards', title: 'Past Tense Verbs', difficulty: 'medium' },
                { type: 'story', title: 'Complete the Story', difficulty: 'medium' }
            ]
        },
        
        level8: {
            id: 8,
            name: 'Intermediate 2 - Future Plans',
            category: 'intermediate',
            icon: '🔮',
            unlockRequirement: 350,
            description: 'Future tenses and making plans',
            topics: ['Will/Going to', 'Future Plans', 'Predictions', 'Intentions'],
            vocabulary: [
                { word: 'Will', meaning: 'Auxiliar futuro', example: 'I will help you tomorrow.' },
                { word: 'Going to', meaning: 'Ir a (futuro)', example: 'I am going to study tonight.' },
                { word: 'Tomorrow', meaning: 'Mañana', example: 'Tomorrow will be a good day.' },
                { word: 'Next week', meaning: 'La próxima semana', example: 'Next week I will travel.' },
                { word: 'Plan', meaning: 'Plan/Planear', example: 'What are your plans?' },
                { word: 'Hope', meaning: 'Esperar/Esperanza', example: 'I hope you feel better soon.' },
                { word: 'Dream', meaning: 'Sueño/Soñar', example: 'My dream is to travel the world.' },
                { word: 'Goal', meaning: 'Meta/Objetivo', example: 'My goal is to learn English.' },
                { word: 'Soon', meaning: 'Pronto', example: 'I will see you soon.' },
                { word: 'Later', meaning: 'Más tarde', example: 'I\'ll call you later.' }
            ],
            games: [
                { type: 'flashcards', title: 'Future Expressions', difficulty: 'medium' },
                { type: 'matching', title: 'Match Plans', difficulty: 'medium' }
            ]
        },
        
        level9: {
            id: 9,
            name: 'Intermediate 3 - Comparisons',
            category: 'intermediate',
            icon: '⚖️',
            unlockRequirement: 400,
            description: 'Comparatives and superlatives',
            topics: ['Comparative Forms', 'Superlative Forms', 'As...as', 'Comparisons'],
            vocabulary: [
                { word: 'Better', meaning: 'Mejor', example: 'This book is better than that one.' },
                { word: 'Worse', meaning: 'Peor', example: 'Today is worse than yesterday.' },
                { word: 'Bigger', meaning: 'Más grande', example: 'My house is bigger than yours.' },
                { word: 'Smaller', meaning: 'Más pequeño', example: 'This phone is smaller.' },
                { word: 'The best', meaning: 'El mejor', example: 'You are the best friend!' },
                { word: 'The worst', meaning: 'El peor', example: 'That was the worst movie.' },
                { word: 'More', meaning: 'Más', example: 'I need more time.' },
                { word: 'Less', meaning: 'Menos', example: 'I want less sugar, please.' },
                { word: 'As...as', meaning: 'Tan...como', example: 'She is as tall as her sister.' },
                { word: 'Than', meaning: 'Que (comparación)', example: 'I am taller than you.' }
            ],
            games: [
                { type: 'flashcards', title: 'Comparative Forms', difficulty: 'medium' },
                { type: 'matching', title: 'Compare & Contrast', difficulty: 'hard' }
            ]
        },
        
        level10: {
            id: 10,
            name: 'Intermediate 4 - Experience',
            category: 'intermediate',
            icon: '🌍',
            unlockRequirement: 450,
            description: 'Present perfect and life experiences',
            topics: ['Present Perfect', 'Ever/Never', 'Already/Yet', 'Life Experiences'],
            vocabulary: [
                { word: 'Have been', meaning: 'He estado', example: 'I have been to Paris.' },
                { word: 'Have done', meaning: 'He hecho', example: 'I have done my homework.' },
                { word: 'Have seen', meaning: 'He visto', example: 'I have seen that movie.' },
                { word: 'Ever', meaning: 'Alguna vez', example: 'Have you ever visited Mexico?' },
                { word: 'Never', meaning: 'Nunca', example: 'I have never eaten sushi.' },
                { word: 'Already', meaning: 'Ya', example: 'I have already finished.' },
                { word: 'Yet', meaning: 'Todavía/Aún', example: 'I haven\'t done it yet.' },
                { word: 'Just', meaning: 'Apenas/Justo', example: 'I have just arrived.' },
                { word: 'Recently', meaning: 'Recientemente', example: 'I have recently started yoga.' },
                { word: 'Experience', meaning: 'Experiencia', example: 'It was a great experience.' }
            ],
            games: [
                { type: 'flashcards', title: 'Present Perfect Practice', difficulty: 'hard' },
                { type: 'story', title: 'Life Experiences', difficulty: 'hard' }
            ]
        },
        
        level11: {
            id: 11,
            name: 'Intermediate 5 - Conditions',
            category: 'intermediate',
            icon: '🤔',
            unlockRequirement: 500,
            description: 'Conditional sentences and hypotheticals',
            topics: ['First Conditional', 'Second Conditional', 'If Clauses', 'Possibilities'],
            vocabulary: [
                { word: 'If', meaning: 'Si (condicional)', example: 'If it rains, I will stay home.' },
                { word: 'Would', meaning: 'Condicional (would)', example: 'I would help if I could.' },
                { word: 'Could', meaning: 'Podría', example: 'You could come with us.' },
                { word: 'Should', meaning: 'Debería', example: 'You should study more.' },
                { word: 'Might', meaning: 'Podría/Quizás', example: 'It might rain tomorrow.' },
                { word: 'Unless', meaning: 'A menos que', example: 'I won\'t go unless you come.' },
                { word: 'Probably', meaning: 'Probablemente', example: 'I will probably arrive late.' },
                { word: 'Maybe', meaning: 'Tal vez', example: 'Maybe we can meet tomorrow.' },
                { word: 'Possible', meaning: 'Posible', example: 'It\'s possible to learn fast.' },
                { word: 'Impossible', meaning: 'Imposible', example: 'That seems impossible!' }
            ],
            games: [
                { type: 'flashcards', title: 'Conditional Mood', difficulty: 'hard' },
                { type: 'matching', title: 'If/Then Situations', difficulty: 'hard' }
            ]
        },
        
        level12: {
            id: 12,
            name: 'Intermediate 6 - Fluency Bridge',
            category: 'intermediate',
            icon: '🌉',
            unlockRequirement: 550,
            description: 'Complex structures and advanced expressions',
            topics: ['Phrasal Verbs', 'Idioms', 'Complex Sentences', 'Conversation Skills'],
            vocabulary: [
                { word: 'Look forward to', meaning: 'Esperar con ansias', example: 'I look forward to seeing you.' },
                { word: 'Give up', meaning: 'Rendirse', example: 'Don\'t give up on your dreams.' },
                { word: 'Find out', meaning: 'Descubrir/Averiguar', example: 'I need to find out the truth.' },
                { word: 'Break the ice', meaning: 'Romper el hielo', example: 'Let\'s play a game to break the ice.' },
                { word: 'Piece of cake', meaning: 'Muy fácil', example: 'This test was a piece of cake.' },
                { word: 'On the other hand', meaning: 'Por otro lado', example: 'It\'s expensive. On the other hand, it\'s good quality.' },
                { word: 'In my opinion', meaning: 'En mi opinión', example: 'In my opinion, it\'s the best option.' },
                { word: 'By the way', meaning: 'Por cierto', example: 'By the way, did you call Maria?' },
                { word: 'As a matter of fact', meaning: 'De hecho', example: 'As a matter of fact, I agree with you.' },
                { word: 'To make matters worse', meaning: 'Para empeorar las cosas', example: 'It rained, and to make matters worse, I forgot my umbrella.' }
            ],
            games: [
                { type: 'flashcards', title: 'Phrasal Verbs & Idioms', difficulty: 'hard' },
                { type: 'conversation', title: 'Real Conversations', difficulty: 'hard' }
            ]
        }
    }
};

// Function to get all vocabulary for a specific level
function getVocabularyByLevel(levelNumber) {
    if (levelNumber >= 1 && levelNumber <= 6) {
        return CURRICULUM.basic[`level${levelNumber}`].vocabulary;
    } else if (levelNumber >= 7 && levelNumber <= 12) {
        return CURRICULUM.intermediate[`level${levelNumber}`].vocabulary;
    }
    return [];
}

// Function to get level information
function getLevelInfo(levelNumber) {
    if (levelNumber >= 1 && levelNumber <= 6) {
        return CURRICULUM.basic[`level${levelNumber}`];
    } else if (levelNumber >= 7 && levelNumber <= 12) {
        return CURRICULUM.intermediate[`level${levelNumber}`];
    }
    return null;
}

// Function to check if level is unlocked
function isLevelUnlocked(levelNumber, userPoints) {
    const levelInfo = getLevelInfo(levelNumber);
    if (!levelInfo) return false;
    return userPoints >= levelInfo.unlockRequirement;
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CURRICULUM, getVocabularyByLevel, getLevelInfo, isLevelUnlocked };
}
