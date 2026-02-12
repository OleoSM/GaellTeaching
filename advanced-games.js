/* ========================================
   ADVANCED LEARNING GAMES MODULE
   Multiple Interactive Activities for Language Learning
   ======================================== */

'use strict';

/* ========================================
   GAME 1: FILL IN THE BLANKS
   ======================================== */

const FillInTheBlanksGame = {
    currentExercise: null,
    correctAnswers: 0,
    totalExercises: 0,
    
    // Generate exercises from current level vocabulary
    generateExercises(levelNumber) {
        const vocabulary = getVocabularyByLevel(levelNumber);
        const exercises = [];
        
        vocabulary.forEach(item => {
            if (item.example && item.example.length > 0) {
                // Create blank in the sentence
                const sentence = item.example;
                const word = item.word;
                
                // Replace word with blank (case insensitive)
                const regex = new RegExp(`\\b${word}\\b`, 'gi');
                const blankedSentence = sentence.replace(regex, '______');
                
                exercises.push({
                    sentence: blankedSentence,
                    correctAnswer: word,
                    hint: item.meaning,
                    fullSentence: sentence
                });
            }
        });
        
        return this.shuffleArray(exercises);
    },
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // Start the game
    start(levelNumber) {
        const exercises = this.generateExercises(levelNumber);
        if (exercises.length === 0) {
            alert('No exercises available for this level.');
            return;
        }
        
        this.currentExercise = 0;
        this.correctAnswers = 0;
        this.totalExercises = Math.min(5, exercises.length);
        this.exercises = exercises.slice(0, this.totalExercises);
        
        this.displayExercise();
    },
    
    displayExercise() {
        if (this.currentExercise >= this.totalExercises) {
            this.showResults();
            return;
        }
        
        const exercise = this.exercises[this.currentExercise];
        const container = document.getElementById('fillBlanksContainer');
        
        container.innerHTML = `
            <div class="game-header">
                <h3>Fill in the Blank</h3>
                <div class="game-progress">Question ${this.currentExercise + 1} of ${this.totalExercises}</div>
            </div>
            <div class="exercise-card">
                <p class="exercise-sentence">${exercise.sentence}</p>
                <div class="hint-box">
                    <span class="hint-icon">💡</span>
                    <span class="hint-text">Hint: ${exercise.hint}</span>
                </div>
                <input type="text" 
                       id="blankAnswer" 
                       class="blank-input" 
                       placeholder="Type your answer..."
                       autocomplete="off">
                <button id="checkBlankBtn" class="btn-primary">Check Answer</button>
                <div id="blankFeedback" class="feedback-message"></div>
            </div>
        `;
        
        // Add event listeners
        document.getElementById('checkBlankBtn').addEventListener('click', () => this.checkAnswer());
        document.getElementById('blankAnswer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });
        
        // Focus input
        document.getElementById('blankAnswer').focus();
    },
    
    checkAnswer() {
        const userAnswer = document.getElementById('blankAnswer').value.trim();
        const correctAnswer = this.exercises[this.currentExercise].correctAnswer;
        const feedback = document.getElementById('blankFeedback');
        
        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        
        if (isCorrect) {
            this.correctAnswers++;
            feedback.className = 'feedback-message correct';
            feedback.innerHTML = `
                <span class="feedback-icon">✓</span>
                <span>Correct! "${correctAnswer}" is the right answer!</span>
            `;
            if (typeof LevelState !== 'undefined') {
                LevelState.addPoints(10);
            }
        } else {
            feedback.className = 'feedback-message incorrect';
            feedback.innerHTML = `
                <span class="feedback-icon">✗</span>
                <span>Not quite. The correct answer is: "${correctAnswer}"</span>
            `;
        }
        
        feedback.style.display = 'block';
        
        // Next exercise after delay
        setTimeout(() => {
            this.currentExercise++;
            this.displayExercise();
        }, 2000);
    },
    
    showResults() {
        const container = document.getElementById('fillBlanksContainer');
        const percentage = Math.round((this.correctAnswers / this.totalExercises) * 100);
        
        container.innerHTML = `
            <div class="game-results">
                <h2>🎉 Great Job!</h2>
                <div class="results-stats">
                    <div class="result-stat">
                        <span class="result-value">${this.correctAnswers}</span>
                        <span class="result-label">Correct</span>
                    </div>
                    <div class="result-stat">
                        <span class="result-value">${this.totalExercises - this.correctAnswers}</span>
                        <span class="result-label">Incorrect</span>
                    </div>
                    <div class="result-stat">
                        <span class="result-value">${percentage}%</span>
                        <span class="result-label">Score</span>
                    </div>
                </div>
                <button id="playAgainFillBtn" class="btn-primary">Play Again</button>
            </div>
        `;
        
        document.getElementById('playAgainFillBtn').addEventListener('click', () => {
            const levelNumber = typeof LevelState !== 'undefined' ? LevelState.currentLevelId : 1;
            this.start(levelNumber);
        });
    }
};

/* ========================================
   GAME 2: WORD SCRAMBLE (UNSCRAMBLE)
   ======================================== */

const WordScrambleGame = {
    currentWord: null,
    currentIndex: 0,
    score: 0,
    words: [],
    
    start(levelNumber) {
        const vocabulary = getVocabularyByLevel(levelNumber);
        this.words = vocabulary.slice(0, 5);
        this.currentIndex = 0;
        this.score = 0;
        
        this.displayWord();
    },
    
    scrambleWord(word) {
        const arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    },
    
    displayWord() {
        if (this.currentIndex >= this.words.length) {
            this.showResults();
            return;
        }
        
        this.currentWord = this.words[this.currentIndex];
        const scrambled = this.scrambleWord(this.currentWord.word);
        
        const container = document.getElementById('scrambleContainer');
        container.innerHTML = `
            <div class="game-header">
                <h3>Unscramble the Word</h3>
                <div class="game-progress">Word ${this.currentIndex + 1} of ${this.words.length}</div>
            </div>
            <div class="scramble-card">
                <div class="scrambled-word">${scrambled.toUpperCase()}</div>
                <div class="hint-box">
                    <span class="hint-icon">💡</span>
                    <span class="hint-text">${this.currentWord.meaning}</span>
                </div>
                <input type="text" 
                       id="scrambleAnswer" 
                       class="scramble-input" 
                       placeholder="Type the correct word..."
                       autocomplete="off">
                <button id="checkScrambleBtn" class="btn-primary">Check</button>
                <button id="skipScrambleBtn" class="btn-secondary">Skip</button>
                <div id="scrambleFeedback" class="feedback-message"></div>
            </div>
        `;
        
        document.getElementById('checkScrambleBtn').addEventListener('click', () => this.checkAnswer());
        document.getElementById('skipScrambleBtn').addEventListener('click', () => this.skipWord());
        document.getElementById('scrambleAnswer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });
        
        document.getElementById('scrambleAnswer').focus();
    },
    
    checkAnswer() {
        const userAnswer = document.getElementById('scrambleAnswer').value.trim();
        const correctAnswer = this.currentWord.word;
        const feedback = document.getElementById('scrambleFeedback');
        
        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        
        if (isCorrect) {
            this.score += 20;
            feedback.className = 'feedback-message correct';
            feedback.innerHTML = `
                <span class="feedback-icon">✓</span>
                <span>Perfect! +20 points</span>
            `;
            if (typeof LevelState !== 'undefined') {
                LevelState.addPoints(20);
            }
        } else {
            feedback.className = 'feedback-message incorrect';
            feedback.innerHTML = `
                <span class="feedback-icon">✗</span>
                <span>The correct word is: "${correctAnswer}"</span>
            `;
        }
        
        feedback.style.display = 'block';
        
        setTimeout(() => {
            this.currentIndex++;
            this.displayWord();
        }, 2000);
    },
    
    skipWord() {
        this.currentIndex++;
        this.displayWord();
    },
    
    showResults() {
        const container = document.getElementById('scrambleContainer');
        container.innerHTML = `
            <div class="game-results">
                <h2>🎯 Well Done!</h2>
                <div class="results-stats">
                    <div class="result-stat">
                        <span class="result-value">${this.score}</span>
                        <span class="result-label">Points Earned</span>
                    </div>
                </div>
                <button id="playAgainScrambleBtn" class="btn-primary">Play Again</button>
            </div>
        `;
        
        document.getElementById('playAgainScrambleBtn').addEventListener('click', () => {
            const levelNumber = typeof LevelState !== 'undefined' ? LevelState.currentLevelId : 1;
            this.start(levelNumber);
        });
    }
};

/* ========================================
   GAME 3: MULTIPLE CHOICE QUIZ
   ======================================== */

const MultipleChoiceQuiz = {
    questions: [],
    currentQuestion: 0,
    correctAnswers: 0,
    
    start(levelNumber) {
        const vocabulary = getVocabularyByLevel(levelNumber);
        this.questions = this.generateQuestions(vocabulary);
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        
        this.displayQuestion();
    },
    
    generateQuestions(vocabulary) {
        const questions = [];
        const maxQuestions = Math.min(5, vocabulary.length);
        
        for (let i = 0; i < maxQuestions; i++) {
            const correctItem = vocabulary[i];
            const options = this.generateOptions(correctItem, vocabulary);
            
            questions.push({
                question: `What does "${correctItem.word}" mean?`,
                options: options,
                correctAnswer: correctItem.meaning
            });
        }
        
        return questions;
    },
    
    generateOptions(correctItem, allVocabulary) {
        const options = [correctItem.meaning];
        const otherMeanings = allVocabulary
            .filter(item => item.meaning !== correctItem.meaning)
            .map(item => item.meaning);
        
        // Get 3 random wrong answers
        while (options.length < 4 && otherMeanings.length > 0) {
            const randomIndex = Math.floor(Math.random() * otherMeanings.length);
            options.push(otherMeanings[randomIndex]);
            otherMeanings.splice(randomIndex, 1);
        }
        
        // Shuffle options
        return options.sort(() => Math.random() - 0.5);
    },
    
    displayQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }
        
        const question = this.questions[this.currentQuestion];
        const container = document.getElementById('quizContainer');
        
        let optionsHTML = '';
        question.options.forEach((option, index) => {
            optionsHTML += `
                <button class="quiz-option" data-answer="${option}">
                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${option}</span>
                </button>
            `;
        });
        
        container.innerHTML = `
            <div class="game-header">
                <h3>Multiple Choice Quiz</h3>
                <div class="game-progress">Question ${this.currentQuestion + 1} of ${this.questions.length}</div>
            </div>
            <div class="quiz-card">
                <h2 class="quiz-question">${question.question}</h2>
                <div class="quiz-options">
                    ${optionsHTML}
                </div>
                <div id="quizFeedback" class="feedback-message"></div>
            </div>
        `;
        
        // Add click handlers to options
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedAnswer = e.currentTarget.dataset.answer;
                this.checkAnswer(selectedAnswer, e.currentTarget);
            });
        });
    },
    
    checkAnswer(selectedAnswer, button) {
        const question = this.questions[this.currentQuestion];
        const isCorrect = selectedAnswer === question.correctAnswer;
        const feedback = document.getElementById('quizFeedback');
        
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.answer === question.correctAnswer) {
                btn.classList.add('correct-answer');
            }
        });
        
        if (isCorrect) {
            this.correctAnswers++;
            button.classList.add('selected-correct');
            feedback.className = 'feedback-message correct';
            feedback.innerHTML = `
                <span class="feedback-icon">✓</span>
                <span>Correct!</span>
            `;
            if (typeof LevelState !== 'undefined') {
                LevelState.addPoints(15);
            }
        } else {
            button.classList.add('selected-incorrect');
            feedback.className = 'feedback-message incorrect';
            feedback.innerHTML = `
                <span class="feedback-icon">✗</span>
                <span>The correct answer is: "${question.correctAnswer}"</span>
            `;
        }
        
        feedback.style.display = 'block';
        
        setTimeout(() => {
            this.currentQuestion++;
            this.displayQuestion();
        }, 2500);
    },
    
    showResults() {
        const container = document.getElementById('quizContainer');
        const percentage = Math.round((this.correctAnswers / this.questions.length) * 100);
        
        let message = '';
        if (percentage >= 80) message = '🌟 Excellent!';
        else if (percentage >= 60) message = '👍 Good job!';
        else message = '💪 Keep practicing!';
        
        container.innerHTML = `
            <div class="game-results">
                <h2>${message}</h2>
                <div class="results-stats">
                    <div class="result-stat">
                        <span class="result-value">${this.correctAnswers}/${this.questions.length}</span>
                        <span class="result-label">Correct</span>
                    </div>
                    <div class="result-stat">
                        <span class="result-value">${percentage}%</span>
                        <span class="result-label">Score</span>
                    </div>
                </div>
                <button id="playAgainQuizBtn" class="btn-primary">Try Again</button>
            </div>
        `;
        
        document.getElementById('playAgainQuizBtn').addEventListener('click', () => {
            const levelNumber = typeof LevelState !== 'undefined' ? LevelState.currentLevelId : 1;
            this.start(levelNumber);
        });
    }
};

/* ========================================
   GAME 4: TYPING PRACTICE
   ======================================== */

const TypingPracticeGame = {
    words: [],
    currentIndex: 0,
    correctCount: 0,
    startTime: null,
    
    start(levelNumber) {
        const vocabulary = getVocabularyByLevel(levelNumber);
        this.words = vocabulary.slice(0, 10);
        this.currentIndex = 0;
        this.correctCount = 0;
        this.startTime = Date.now();
        
        this.displayWord();
    },
    
    displayWord() {
        if (this.currentIndex >= this.words.length) {
            this.showResults();
            return;
        }
        
        const word = this.words[this.currentIndex];
        const container = document.getElementById('typingContainer');
        
        container.innerHTML = `
            <div class="game-header">
                <h3>Typing Practice</h3>
                <div class="game-progress">Word ${this.currentIndex + 1} of ${this.words.length}</div>
            </div>
            <div class="typing-card">
                <div class="word-to-type">${word.word}</div>
                <div class="word-meaning">${word.meaning}</div>
                <input type="text" 
                       id="typingInput" 
                       class="typing-input" 
                       placeholder="Type the word..."
                       autocomplete="off"
                       spellcheck="false">
                <div id="typingFeedback" class="typing-feedback"></div>
            </div>
            <div class="typing-stats">
                <div class="stat-item">
                    <span class="stat-label">Correct:</span>
                    <span class="stat-value">${this.correctCount}</span>
                </div>
            </div>
        `;
        
        const input = document.getElementById('typingInput');
        input.addEventListener('input', (e) => this.checkTyping(e));
        input.focus();
    },
    
    checkTyping(e) {
        const userInput = e.target.value;
        const correctWord = this.words[this.currentIndex].word;
        const feedback = document.getElementById('typingFeedback');
        
        if (userInput === correctWord) {
            // Correct!
            this.correctCount++;
            if (typeof LevelState !== 'undefined') {
                LevelState.addPoints(5);
            }
            
            feedback.textContent = '✓ Perfect!';
            feedback.className = 'typing-feedback correct';
            
            setTimeout(() => {
                this.currentIndex++;
                this.displayWord();
            }, 500);
        } else if (correctWord.startsWith(userInput)) {
            // On the right track
            feedback.textContent = '⌨️ Keep typing...';
            feedback.className = 'typing-feedback typing';
        } else {
            // Wrong
            feedback.textContent = '✗ Check your spelling';
            feedback.className = 'typing-feedback incorrect';
        }
    },
    
    showResults() {
        const container = document.getElementById('typingContainer');
        const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
        const wpm = Math.round((this.correctCount / timeSpent) * 60);
        
        container.innerHTML = `
            <div class="game-results">
                <h2>⌨️ Typing Complete!</h2>
                <div class="results-stats">
                    <div class="result-stat">
                        <span class="result-value">${this.correctCount}/${this.words.length}</span>
                        <span class="result-label">Words Typed</span>
                    </div>
                    <div class="result-stat">
                        <span class="result-value">${timeSpent}s</span>
                        <span class="result-label">Time</span>
                    </div>
                    <div class="result-stat">
                        <span class="result-value">${wpm}</span>
                        <span class="result-label">WPM</span>
                    </div>
                </div>
                <button id="playAgainTypingBtn" class="btn-primary">Practice Again</button>
            </div>
        `;
        
        document.getElementById('playAgainTypingBtn').addEventListener('click', () => {
            const levelNumber = typeof LevelState !== 'undefined' ? LevelState.currentLevelId : 1;
            this.start(levelNumber);
        });
    }
};

/* ========================================
   GAME 5: SENTENCE BUILDER
   ======================================== */

const SentenceBuilderGame = {
    currentSentence: null,
    currentIndex: 0,
    score: 0,
    sentences: [],
    
    start(levelNumber) {
        const vocabulary = getVocabularyByLevel(levelNumber);
        this.sentences = vocabulary
            .filter(item => item.example && item.example.length > 0)
            .slice(0, 5);
        this.currentIndex = 0;
        this.score = 0;
        
        this.displaySentence();
    },
    
    displaySentence() {
        if (this.currentIndex >= this.sentences.length) {
            this.showResults();
            return;
        }
        
        this.currentSentence = this.sentences[this.currentIndex];
        const words = this.currentSentence.example.split(' ');
        const scrambledWords = this.shuffleArray([...words]);
        
        const container = document.getElementById('sentenceBuilderContainer');
        
        let wordsHTML = '';
        scrambledWords.forEach((word, index) => {
            wordsHTML += `
                <div class="word-tile" data-word="${word}" data-index="${index}">
                    ${word}
                </div>
            `;
        });
        
        container.innerHTML = `
            <div class="game-header">
                <h3>Build the Sentence</h3>
                <div class="game-progress">Sentence ${this.currentIndex + 1} of ${this.sentences.length}</div>
            </div>
            <div class="sentence-builder-card">
                <div class="hint-box">
                    <span class="hint-icon">💡</span>
                    <span class="hint-text">Arrange the words to form a correct sentence</span>
                </div>
                <div class="word-tiles-container" id="wordTiles">
                    ${wordsHTML}
                </div>
                <div class="sentence-area" id="sentenceArea">
                    <div class="sentence-placeholder">Drag words here to build your sentence</div>
                </div>
                <div class="builder-actions">
                    <button id="checkSentenceBtn" class="btn-primary">Check Sentence</button>
                    <button id="resetSentenceBtn" class="btn-secondary">Reset</button>
                </div>
                <div id="sentenceFeedback" class="feedback-message"></div>
            </div>
        `;
        
        this.initializeDragAndDrop();
        
        document.getElementById('checkSentenceBtn').addEventListener('click', () => this.checkSentence());
        document.getElementById('resetSentenceBtn').addEventListener('click', () => this.displaySentence());
    },
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    initializeDragAndDrop() {
        const tiles = document.querySelectorAll('.word-tile');
        const sentenceArea = document.getElementById('sentenceArea');
        
        tiles.forEach(tile => {
            tile.draggable = true;
            
            tile.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.word);
                e.target.classList.add('dragging');
            });
            
            tile.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
            
            tile.addEventListener('click', () => {
                // Move to sentence area on click (mobile friendly)
                this.moveToSentence(tile);
            });
        });
        
        sentenceArea.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        sentenceArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const word = e.dataTransfer.getData('text/plain');
            const tile = document.querySelector(`.word-tile[data-word="${word}"]`);
            this.moveToSentence(tile);
        });
    },
    
    moveToSentence(tile) {
        const sentenceArea = document.getElementById('sentenceArea');
        const placeholder = sentenceArea.querySelector('.sentence-placeholder');
        
        if (placeholder) {
            placeholder.remove();
        }
        
        // Clone tile and add to sentence area
        const newTile = tile.cloneNode(true);
        newTile.classList.add('in-sentence');
        newTile.addEventListener('click', () => {
            newTile.remove();
            // Show placeholder if empty
            if (sentenceArea.children.length === 0) {
                sentenceArea.innerHTML = '<div class="sentence-placeholder">Drag words here to build your sentence</div>';
            }
        });
        
        sentenceArea.appendChild(newTile);
        tile.style.opacity = '0.3';
    },
    
    checkSentence() {
        const sentenceArea = document.getElementById('sentenceArea');
        const tiles = sentenceArea.querySelectorAll('.word-tile');
        
        if (tiles.length === 0) {
            alert('Please build a sentence first!');
            return;
        }
        
        const userSentence = Array.from(tiles).map(tile => tile.dataset.word).join(' ');
        const correctSentence = this.currentSentence.example;
        const feedback = document.getElementById('sentenceFeedback');
        
        const isCorrect = userSentence === correctSentence;
        
        if (isCorrect) {
            this.score += 25;
            feedback.className = 'feedback-message correct';
            feedback.innerHTML = `
                <span class="feedback-icon">✓</span>
                <span>Perfect sentence! +25 points</span>
            `;
            if (typeof LevelState !== 'undefined') {
                LevelState.addPoints(25);
            }
        } else {
            feedback.className = 'feedback-message incorrect';
            feedback.innerHTML = `
                <span class="feedback-icon">✗</span>
                <span>Correct order: "${correctSentence}"</span>
            `;
        }
        
        feedback.style.display = 'block';
        
        setTimeout(() => {
            this.currentIndex++;
            this.displaySentence();
        }, 3000);
    },
    
    showResults() {
        const container = document.getElementById('sentenceBuilderContainer');
        
        container.innerHTML = `
            <div class="game-results">
                <h2>📝 Great Work!</h2>
                <div class="results-stats">
                    <div class="result-stat">
                        <span class="result-value">${this.score}</span>
                        <span class="result-label">Points Earned</span>
                    </div>
                </div>
                <button id="playAgainBuilderBtn" class="btn-primary">Build More Sentences</button>
            </div>
        `;
        
        document.getElementById('playAgainBuilderBtn').addEventListener('click', () => {
            const levelNumber = typeof LevelState !== 'undefined' ? LevelState.currentLevelId : 1;
            this.start(levelNumber);
        });
    }
};

// Export games for use in main script
if (typeof window !== 'undefined') {
    window.AdvancedGames = {
        FillInTheBlanksGame,
        WordScrambleGame,
        MultipleChoiceQuiz,
        TypingPracticeGame,
        SentenceBuilderGame
    };
}
