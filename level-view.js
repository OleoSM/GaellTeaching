/* ========================================
   LEVEL VIEW CONTROLLER
   Manages Individual Level Learning Flow
   ======================================== */

'use strict';

/* ========================================
   STATE MANAGEMENT
   ======================================== */

const LevelState = {
    currentLevelId: null,
    levelData: null,
    user: {
        currentLevel: 1,
        points: 0,
        streak: 0,
        wordsLearned: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        badges: [],
        completedLevels: [],
        levelProgress: {}
    },
    flashcards: {
        current: [],
        currentIndex: 0,
        isFlipped: false,
        sessionCorrect: 0,
        sessionIncorrect: 0
    },
    game: {
        isActive: false,
        score: 0,
        timeRemaining: 60,
        timer: null,
        matches: [],
        currentLevelPairs: []
    },
    progress: {
        introductionRead: false,
        vocabularyViewed: false,
        flashcardsCompleted: false,
        gamesPlayed: 0,
        minGamesRequired: 2
    },
    
    init() {
        // Get level ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        this.currentLevelId = parseInt(urlParams.get('id')) || 1;
        
        // Load saved state
        const savedState = localStorage.getItem('gaellEnglishAcademyState');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            this.user = { ...this.user, ...parsed.user };
        }
        
        // Load level-specific progress
        const levelProgress = localStorage.getItem(`level_${this.currentLevelId}_progress`);
        if (levelProgress) {
            this.progress = { ...this.progress, ...JSON.parse(levelProgress) };
        }
        
        // Load level data
        this.loadLevelData();
    },
    
    loadLevelData() {
        this.levelData = getLevelInfo(this.currentLevelId);
        if (!this.levelData) {
            alert('Nivel no encontrado');
            window.location.href = 'index.html';
            return;
        }
        
        // Load vocabulary
        const vocabulary = getVocabularyByLevel(this.currentLevelId);
        this.flashcards.current = vocabulary ? [...vocabulary] : [];
        this.shuffleFlashcards();
    },
    
    shuffleFlashcards() {
        for (let i = this.flashcards.current.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.flashcards.current[i], this.flashcards.current[j]] = 
            [this.flashcards.current[j], this.flashcards.current[i]];
        }
    },
    
    save() {
        // Save user state
        localStorage.setItem('gaellEnglishAcademyState', JSON.stringify({
            user: this.user
        }));
        
        // Save level progress
        localStorage.setItem(`level_${this.currentLevelId}_progress`, 
            JSON.stringify(this.progress));
    },
    
    addPoints(points) {
        this.user.points += points;
        
        // Auto-progress current level
        const expectedLevel = Math.floor(this.user.points / 50) + 1;
        if (expectedLevel > this.user.currentLevel && expectedLevel <= 12) {
            this.user.currentLevel = expectedLevel;
        }
        
        this.save();
    },
    
    markLevelComplete() {
        if (!this.user.completedLevels.includes(this.currentLevelId)) {
            this.user.completedLevels.push(this.currentLevelId);
            this.save();
            return true;
        }
        return false;
    },
    
    calculateProgress() {
        let completed = 0;
        let total = 4; // intro, vocab, flashcards, games
        
        if (this.progress.introductionRead) completed++;
        if (this.progress.vocabularyViewed) completed++;
        if (this.progress.flashcardsCompleted) completed++;
        if (this.progress.gamesPlayed >= this.progress.minGamesRequired) completed++;
        
        return Math.round((completed / total) * 100);
    }
};

/* ========================================
   UI CONTROLLER
   ======================================== */

const LevelUI = {
    elements: {},
    currentSection: 'intro',
    
    init() {
        this.cacheElements();
        this.attachEvents();
        this.loadLevelHeader();
        this.loadIntroduction();
        this.updateProgress();
    },
    
    cacheElements() {
        this.elements = {
            backBtn: document.getElementById('backBtn'),
            levelIcon: document.getElementById('levelIcon'),
            levelName: document.getElementById('levelName'),
            levelDesc: document.getElementById('levelDesc'),
            levelProgressText: document.getElementById('levelProgressText'),
            levelProgressFill: document.getElementById('levelProgressFill'),
            
            lessonBody: document.getElementById('lessonBody'),
            startLearningBtn: document.getElementById('startLearningBtn'),
            
            vocabularySection: document.getElementById('vocabularySection'),
            vocabularyGrid: document.getElementById('vocabularyGrid'),
            practiceVocabBtn: document.getElementById('practiceVocabBtn'),
            
            flashcardsSection: document.getElementById('flashcardsSection'),
            flashcard: document.getElementById('flashcard'),
            cardWord: document.getElementById('cardWord'),
            cardMeaning: document.getElementById('cardMeaning'),
            cardExample: document.getElementById('cardExample'),
            correctCount: document.getElementById('correctCount'),
            incorrectCount: document.getElementById('incorrectCount'),
            feedbackOverlay: document.getElementById('feedbackOverlay'),
            feedbackIcon: document.getElementById('feedbackIcon'),
            correctBtn: document.getElementById('correctBtn'),
            wrongBtn: document.getElementById('wrongBtn'),
            skipBtn: document.getElementById('skipBtn'),
            toGamesBtn: document.getElementById('toGamesBtn'),
            
            gamesSection: document.getElementById('gamesSection'),
            completeLevelBtn: document.getElementById('completeLevelBtn'),
            
            completionModal: document.getElementById('completionModal'),
            pointsEarned: document.getElementById('pointsEarned'),
            wordsCount: document.getElementById('wordsCount'),
            backToDashboardBtn: document.getElementById('backToDashboardBtn'),
            nextLevelBtn: document.getElementById('nextLevelBtn'),
            
            // Game containers
            fillBlanksContainer: document.getElementById('fillBlanksContainer'),
            scrambleContainer: document.getElementById('scrambleContainer'),
            quizContainer: document.getElementById('quizContainer'),
            typingContainer: document.getElementById('typingContainer'),
            sentenceBuilderContainer: document.getElementById('sentenceBuilderContainer'),
            matchingContainer: document.getElementById('matchingContainer'),
            
            // Matching game elements
            gameTimer: document.getElementById('gameTimer'),
            gamePoints: document.getElementById('gamePoints'),
            draggableWords: document.getElementById('draggableWords'),
            dropZones: document.getElementById('dropZones'),
            startGameBtn: document.getElementById('startGameBtn')
        };
    },
    
    attachEvents() {
        this.elements.backBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        
        this.elements.startLearningBtn.addEventListener('click', () => {
            this.showVocabularySection();
        });
        
        this.elements.practiceVocabBtn.addEventListener('click', () => {
            this.showFlashcardsSection();
        });
        
        this.elements.toGamesBtn.addEventListener('click', () => {
            this.showGamesSection();
        });
        
        this.elements.completeLevelBtn.addEventListener('click', () => {
            this.completeLevelHandler();
        });
        
        // Flashcard events
        this.elements.flashcard.addEventListener('click', () => this.flipCard());
        this.elements.correctBtn.addEventListener('click', () => this.handleAnswer(true));
        this.elements.wrongBtn.addEventListener('click', () => this.handleAnswer(false));
        this.elements.skipBtn.addEventListener('click', () => this.nextCard());
        
        // Game selector events
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            card.addEventListener('click', () => {
                const gameType = card.dataset.game;
                this.launchGame(gameType);
            });
        });
        
        // Completion modal events
        this.elements.backToDashboardBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        
        this.elements.nextLevelBtn.addEventListener('click', () => {
            const nextLevel = LevelState.currentLevelId + 1;
            if (nextLevel <= 12) {
                window.location.href = `level.html?id=${nextLevel}`;
            } else {
                window.location.href = 'index.html';
            }
        });
        
        // Matching game event
        if (this.elements.startGameBtn) {
            this.elements.startGameBtn.addEventListener('click', () => this.startMatchingGame());
        }
    },
    
    loadLevelHeader() {
        const data = LevelState.levelData;
        this.elements.levelIcon.textContent = data.icon;
        this.elements.levelName.textContent = data.name;
        this.elements.levelDesc.textContent = data.description;
    },
    
    loadIntroduction() {
        const content = LEVEL_CONTENT[LevelState.currentLevelId];
        if (content && content.introduction) {
            this.elements.lessonBody.innerHTML = content.introduction;
            LevelState.progress.introductionRead = true;
            LevelState.save();
            this.updateProgress();
        }
    },
    
    showVocabularySection() {
        this.elements.vocabularySection.style.display = 'block';
        this.elements.vocabularySection.scrollIntoView({ behavior: 'smooth' });
        this.loadVocabulary();
        LevelState.progress.vocabularyViewed = true;
        LevelState.save();
        this.updateProgress();
    },
    
    loadVocabulary() {
        const vocabulary = LevelState.flashcards.current;
        let html = '';
        
        vocabulary.forEach(item => {
            html += `
                <div class="vocab-card">
                    <div class="vocab-word">${item.word}</div>
                    <div class="vocab-meaning">${item.meaning}</div>
                    ${item.example ? `<div class="vocab-example">"${item.example}"</div>` : ''}
                </div>
            `;
        });
        
        this.elements.vocabularyGrid.innerHTML = html;
    },
    
    showFlashcardsSection() {
        this.elements.flashcardsSection.style.display = 'block';
        this.elements.flashcardsSection.scrollIntoView({ behavior: 'smooth' });
        this.loadCard();
    },
    
    loadCard() {
        const cards = LevelState.flashcards.current;
        const index = LevelState.flashcards.currentIndex;
        
        if (cards.length === 0) {
            this.elements.cardWord.textContent = 'No hay tarjetas disponibles';
            return;
        }
        
        const card = cards[index];
        this.elements.cardWord.textContent = card.word;
        this.elements.cardMeaning.textContent = card.meaning;
        this.elements.cardExample.textContent = card.example || '';
        
        // Reset flip state
        LevelState.flashcards.isFlipped = false;
        this.elements.flashcard.classList.remove('flipped');
    },
    
    flipCard() {
        LevelState.flashcards.isFlipped = !LevelState.flashcards.isFlipped;
        
        if (LevelState.flashcards.isFlipped) {
            this.elements.flashcard.classList.add('flipped');
        } else {
            this.elements.flashcard.classList.remove('flipped');
        }
    },
    
    handleAnswer(isCorrect) {
        if (isCorrect) {
            LevelState.flashcards.sessionCorrect++;
            LevelState.user.correctAnswers++;
            LevelState.user.wordsLearned++;
            LevelState.addPoints(10);
        } else {
            LevelState.flashcards.sessionIncorrect++;
            LevelState.user.incorrectAnswers++;
        }
        
        this.showFeedback(isCorrect);
        this.updateStats();
        
        // Mark flashcards as completed after 5 cards
        if ((LevelState.flashcards.sessionCorrect + LevelState.flashcards.sessionIncorrect) >= 5) {
            LevelState.progress.flashcardsCompleted = true;
            LevelState.save();
            this.updateProgress();
        }
        
        setTimeout(() => this.nextCard(), 1000);
    },
    
    nextCard() {
        LevelState.flashcards.currentIndex++;
        
        if (LevelState.flashcards.currentIndex >= LevelState.flashcards.current.length) {
            LevelState.flashcards.currentIndex = 0;
            LevelState.shuffleFlashcards();
        }
        
        this.loadCard();
    },
    
    showFeedback(isCorrect) {
        this.elements.feedbackIcon.textContent = isCorrect ? '✓' : '✗';
        this.elements.feedbackIcon.style.color = isCorrect ? '#10b981' : '#ef4444';
        this.elements.feedbackOverlay.classList.add('show');
        
        setTimeout(() => {
            this.elements.feedbackOverlay.classList.remove('show');
        }, 800);
    },
    
    updateStats() {
        this.elements.correctCount.textContent = LevelState.flashcards.sessionCorrect;
        this.elements.incorrectCount.textContent = LevelState.flashcards.sessionIncorrect;
    },
    
    showGamesSection() {
        this.elements.gamesSection.style.display = 'block';
        this.elements.gamesSection.scrollIntoView({ behavior: 'smooth' });
    },
    
    launchGame(gameType) {
        // Hide game selector
        document.querySelector('.game-selector').style.display = 'none';
        
        // Hide all game containers
        const containers = [
            this.elements.fillBlanksContainer,
            this.elements.scrambleContainer,
            this.elements.quizContainer,
            this.elements.typingContainer,
            this.elements.sentenceBuilderContainer,
            this.elements.matchingContainer
        ];
        
        containers.forEach(c => c.style.display = 'none');
        
        // Show selected game container
        const gameContainers = {
            'fillblanks': this.elements.fillBlanksContainer,
            'scramble': this.elements.scrambleContainer,
            'quiz': this.elements.quizContainer,
            'typing': this.elements.typingContainer,
            'builder': this.elements.sentenceBuilderContainer,
            'matching': this.elements.matchingContainer
        };
        
        const container = gameContainers[gameType];
        if (!container) return;
        
        container.style.display = 'block';
        
        // Add back button
        this.addGameBackButton(container, gameType);
        
        // Launch game
        if (gameType === 'matching') {
            this.setupMatchingGame();
        } else {
            this.launchAdvancedGame(gameType);
        }
        
        // Increment games played
        LevelState.progress.gamesPlayed++;
        LevelState.save();
        this.updateProgress();
        
        container.scrollIntoView({ behavior: 'smooth' });
    },
    
    addGameBackButton(container, gameType) {
        if (container.querySelector('.game-back-btn')) return;
        
        const backBtn = document.createElement('button');
        backBtn.className = 'btn-secondary game-back-btn';
        backBtn.innerHTML = '<span class="icon">🔙</span> Volver a Juegos';
        backBtn.addEventListener('click', () => this.returnToGameSelector());
        
        container.prepend(backBtn);
    },
    
    returnToGameSelector() {
        // Show game selector
        document.querySelector('.game-selector').style.display = 'grid';
        
        // Hide all game containers
        const containers = [
            this.elements.fillBlanksContainer,
            this.elements.scrambleContainer,
            this.elements.quizContainer,
            this.elements.typingContainer,
            this.elements.sentenceBuilderContainer,
            this.elements.matchingContainer
        ];
        
        containers.forEach(c => c.style.display = 'none');
        
        // Scroll to game selector
        document.querySelector('.game-selector').scrollIntoView({ behavior: 'smooth' });
    },
    
    launchAdvancedGame(gameType) {
        if (typeof window.AdvancedGames === 'undefined') {
            console.error('AdvancedGames module not loaded');
            return;
        }
        
        const games = window.AdvancedGames;
        const levelNumber = LevelState.currentLevelId;
        
        switch(gameType) {
            case 'fillblanks':
                games.FillInTheBlanksGame.start(levelNumber);
                break;
            case 'scramble':
                games.WordScrambleGame.start(levelNumber);
                break;
            case 'quiz':
                games.MultipleChoiceQuiz.start(levelNumber);
                break;
            case 'typing':
                games.TypingPracticeGame.start(levelNumber);
                break;
            case 'builder':
                games.SentenceBuilderGame.start(levelNumber);
                break;
        }
    },
    
    setupMatchingGame() {
        const vocabulary = LevelState.flashcards.current;
        if (vocabulary && vocabulary.length >= 5) {
            LevelState.game.currentLevelPairs = vocabulary.slice(0, 5).map(item => ({
                word: item.word,
                definition: item.meaning
            }));
        }
    },
    
    startMatchingGame() {
        // Reset game state
        LevelState.game.score = 0;
        LevelState.game.timeRemaining = 60;
        LevelState.game.isActive = true;
        LevelState.game.matches = [];
        
        // Update UI
        this.elements.gamePoints.textContent = 'Score: 0';
        
        // Build game board
        this.buildMatchingBoard();
        
        // Start timer
        this.startTimer();
        
        // Hide start button
        this.elements.startGameBtn.classList.add('game-hidden');
    },
    
    buildMatchingBoard() {
        let pairs = LevelState.game.currentLevelPairs.length > 0 
            ? LevelState.game.currentLevelPairs 
            : [
                { word: 'Hello', definition: 'A greeting' },
                { word: 'Goodbye', definition: 'A farewell' },
                { word: 'Thank you', definition: 'Expression of gratitude' },
                { word: 'Please', definition: 'Polite request' },
                { word: 'Sorry', definition: 'An apology' }
            ];
        
        // Shuffle words
        const shuffledWords = pairs.map(p => p.word).sort(() => Math.random() - 0.5);
        
        // Build draggable words
        let wordsHtml = '';
        shuffledWords.forEach((word, index) => {
            wordsHtml += `
                <div class="draggable-word" draggable="true" data-word="${word}" data-index="${index}">
                    ${word}
                </div>
            `;
        });
        this.elements.draggableWords.innerHTML = wordsHtml;
        
        // Build drop zones
        let zonesHtml = '';
        pairs.forEach((pair, index) => {
            zonesHtml += `
                <div class="drop-zone" data-definition="${pair.word}" data-index="${index}">
                    <span class="definition-text">${pair.definition}</span>
                </div>
            `;
        });
        this.elements.dropZones.innerHTML = zonesHtml;
        
        // Attach drag events
        this.attachDragEvents();
    },
    
    attachDragEvents() {
        const draggables = document.querySelectorAll('.draggable-word');
        const dropZones = document.querySelectorAll('.drop-zone');
        
        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.word);
                e.target.classList.add('dragging');
            });
            
            draggable.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const word = e.dataTransfer.getData('text/plain');
                const correctWord = zone.dataset.definition;
                
                this.checkMatch(word, correctWord, zone);
            });
        });
    },
    
    checkMatch(word, correctWord, zone) {
        if (word === correctWord) {
            // Correct match
            zone.classList.add('correct', 'filled');
            zone.innerHTML = `<div class="draggable-word">${word}</div>`;
            
            // Update score
            LevelState.game.score += 10;
            this.elements.gamePoints.textContent = `Score: ${LevelState.game.score}`;
            
            // Add to matches
            LevelState.game.matches.push(word);
            
            // Remove draggable element
            const draggable = document.querySelector(`[data-word="${word}"]`);
            if (draggable && draggable.parentElement.classList.contains('draggable-items')) {
                draggable.remove();
            }
            
            // Check if game complete
            const totalPairs = LevelState.game.currentLevelPairs.length > 0 
                ? LevelState.game.currentLevelPairs.length 
                : 5;
            
            if (LevelState.game.matches.length === totalPairs) {
                this.endMatchingGame(true);
            }
        } else {
            // Incorrect match
            zone.classList.add('incorrect');
            setTimeout(() => zone.classList.remove('incorrect'), 400);
        }
    },
    
    startTimer() {
        LevelState.game.timer = setInterval(() => {
            LevelState.game.timeRemaining--;
            this.elements.gameTimer.textContent = `⏱️ ${LevelState.game.timeRemaining}s`;
            
            if (LevelState.game.timeRemaining <= 0) {
                this.endMatchingGame(false);
            }
        }, 1000);
    },
    
    endMatchingGame(won) {
        clearInterval(LevelState.game.timer);
        LevelState.game.isActive = false;
        
        const message = won 
            ? `¡Felicitaciones! Ganaste ${LevelState.game.score} puntos!` 
            : `¡Se acabó el tiempo! Ganaste ${LevelState.game.score} puntos.`;
        
        setTimeout(() => {
            alert(message);
            
            // Award points
            LevelState.addPoints(LevelState.game.score);
            
            // Show start button again
            this.elements.startGameBtn.classList.remove('game-hidden');
            
            // Return to game selector
            this.returnToGameSelector();
        }, 500);
    },
    
    completeLevelHandler() {
        const progress = LevelState.calculateProgress();
        
        if (progress < 100) {
            alert(`Necesitas completar todas las secciones del módulo. Progreso actual: ${progress}%`);
            return;
        }
        
        // Mark level as complete
        const isNewCompletion = LevelState.markLevelComplete();
        
        if (isNewCompletion) {
            // Award completion bonus
            LevelState.addPoints(50);
        }
        
        // Show completion modal
        this.showCompletionModal();
    },
    
    showCompletionModal() {
        this.elements.pointsEarned.textContent = 50;
        this.elements.wordsCount.textContent = LevelState.flashcards.current.length;
        this.elements.completionModal.style.display = 'flex';
        
        // Disable next level button if it's the last level
        if (LevelState.currentLevelId === 12) {
            this.elements.nextLevelBtn.textContent = 'Volver al Dashboard';
        }
    },
    
    updateProgress() {
        const progress = LevelState.calculateProgress();
        this.elements.levelProgressText.textContent = `${progress}%`;
        this.elements.levelProgressFill.style.width = `${progress}%`;
    }
};

/* ========================================
   HELPER FUNCTIONS
   ======================================== */

function getLevelInfo(levelId) {
    if (typeof CURRICULUM === 'undefined') return null;
    
    // Search in basic levels
    for (let key in CURRICULUM.basic) {
        if (CURRICULUM.basic[key].id === levelId) {
            return CURRICULUM.basic[key];
        }
    }
    
    // Search in intermediate levels
    for (let key in CURRICULUM.intermediate) {
        if (CURRICULUM.intermediate[key].id === levelId) {
            return CURRICULUM.intermediate[key];
        }
    }
    
    return null;
}

function getVocabularyByLevel(levelId) {
    const levelInfo = getLevelInfo(levelId);
    return levelInfo ? levelInfo.vocabulary : [];
}

/* ========================================
   INITIALIZATION
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize state
    LevelState.init();
    
    // Initialize UI
    LevelUI.init();
    
    console.log('🎓 Level view loaded successfully!');
});
