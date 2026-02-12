/* ========================================
   GAELL ENGLISH ACADEMY - MAIN APPLICATION SCRIPT
   Modular EdTech Gamification Platform
   CENLEX-Inspired 12-Level Curriculum
   ======================================== */

'use strict';

/* ========================================
   DATA STRUCTURES & CONSTANTS
   ======================================== */

// Badge achievement definitions
const BADGE_ACHIEVEMENTS = {
    firstSteps: { id: 'first-steps', name: 'First Steps', icon: '🏆', requirement: 1 },
    speedLearner: { id: 'speed-learner', name: 'Speed Learner', icon: '⚡', requirement: 10 },
    creator: { id: 'creator', name: 'Creator', icon: '🎨', requirement: 5 },
    perfectionist: { id: 'perfectionist', name: 'Perfectionist', icon: '💯', requirement: 20 },
    onFire: { id: 'on-fire', name: 'On Fire', icon: '🔥', requirement: 7 },
    risingStar: { id: 'rising-star', name: 'Rising Star', icon: '🌟', requirement: 50 }
};

/* ========================================
   STATE MANAGEMENT MODULE
   ======================================== */

const AppState = {
    // User progress data
    user: {
        currentLevel: 1,
        points: 0,
        streak: 0,
        wordsLearned: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        badges: [],
        completedLevels: []
    },
    
    // Flashcard state
    flashcards: {
        current: [],
        currentIndex: 0,
        isFlipped: false,
        sessionCorrect: 0,
        sessionIncorrect: 0,
        selectedLevel: 1
    },
    
    // Game state
    game: {
        isActive: false,
        score: 0,
        timeRemaining: 60,
        timer: null,
        matches: [],
        currentLevelPairs: []
    },
    
    // UI state
    ui: {
        selectedCategory: 'basic'
    },
    
    // Initialize state from localStorage
    init() {
        const savedState = localStorage.getItem('gaellEnglishAcademyState');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            this.user = { ...this.user, ...parsed.user };
            this.flashcards.selectedLevel = parsed.selectedLevel || 1;
        }
        
        // Load vocabulary for current level
        this.loadLevelVocabulary(this.flashcards.selectedLevel);
    },
    
    // Load vocabulary for specific level
    loadLevelVocabulary(levelNumber) {
        if (typeof getVocabularyByLevel !== 'undefined') {
            const levelVocab = getVocabularyByLevel(levelNumber);
            this.flashcards.current = [...levelVocab];
            
            // Add user-created cards
            const userCards = localStorage.getItem('userFlashcards');
            if (userCards) {
                const parsed = JSON.parse(userCards);
                this.flashcards.current = [...this.flashcards.current, ...parsed];
            }
            
            this.shuffleFlashcards();
        }
    },
    
    // Save state to localStorage
    save() {
        localStorage.setItem('gaellEnglishAcademyState', JSON.stringify({
            user: this.user,
            selectedLevel: this.flashcards.selectedLevel
        }));
    },
    
    // Shuffle flashcards for random order
    shuffleFlashcards() {
        for (let i = this.flashcards.current.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.flashcards.current[i], this.flashcards.current[j]] = 
            [this.flashcards.current[j], this.flashcards.current[i]];
        }
    },
    
    // Add points and check for level up
    addPoints(points) {
        this.user.points += points;
        
        // Auto-progress to next curriculum level every 50 points
        const expectedLevel = Math.floor(this.user.points / 50) + 1;
        if (expectedLevel > this.user.currentLevel && expectedLevel <= 12) {
            this.user.currentLevel = expectedLevel;
            this.showNotification(`🎉 Level ${expectedLevel} Unlocked! New content available!`);
        }
        
        this.save();
        this.updateUI();
    },
    
    // Show notification message
    showNotification(message) {
        // Simple notification system (could be enhanced)
        console.log('Notification:', message);
    },
    
    // Update all UI elements
    updateUI() {
        UI.updateStats();
        UI.updateDashboard();
    }
};

/* ========================================
   UI CONTROLLER MODULE
   ======================================== */

const UI = {
    // Cache DOM elements
    elements: {},
    
    // Initialize UI and cache elements
    init() {
        // Hero stats
        this.elements.userLevel = document.getElementById('userLevel');
        this.elements.totalPoints = document.getElementById('totalPoints');
        this.elements.badgeCount = document.getElementById('badgeCount');
        this.elements.streakCount = document.getElementById('streakCount');
        
        // Flashcard elements
        this.elements.flashcard = document.getElementById('flashcard');
        this.elements.cardWord = document.getElementById('cardWord');
        this.elements.cardMeaning = document.getElementById('cardMeaning');
        this.elements.cardExample = document.getElementById('cardExample');
        this.elements.correctCount = document.getElementById('correctCount');
        this.elements.incorrectCount = document.getElementById('incorrectCount');
        this.elements.feedbackOverlay = document.getElementById('feedbackOverlay');
        this.elements.feedbackIcon = document.getElementById('feedbackIcon');
        this.elements.currentLevelInfo = document.getElementById('currentLevelInfo');
        
        // Modal elements
        this.elements.progressModal = document.getElementById('progressModal');
        this.elements.dashboardStreak = document.getElementById('dashboardStreak');
        this.elements.dashboardPoints = document.getElementById('dashboardPoints');
        this.elements.dashboardLevel = document.getElementById('dashboardLevel');
        this.elements.dashboardWords = document.getElementById('dashboardWords');
        this.elements.badgesGrid = document.getElementById('badgesGrid');
        
        // Collection elements
        this.elements.collectionList = document.getElementById('collectionList');
        this.elements.collectionCount = document.getElementById('collectionCount');
        
        // Game elements
        this.elements.gameTimer = document.getElementById('gameTimer');
        this.elements.gamePoints = document.getElementById('gamePoints');
        this.elements.draggableWords = document.getElementById('draggableWords');
        this.elements.dropZones = document.getElementById('dropZones');
        
        // Path elements
        this.elements.pathContainer = document.getElementById('pathContainer');
        
        this.updateStats();
    },
    
    // Update hero section stats
    updateStats() {
        if (this.elements.userLevel) {
            this.elements.userLevel.textContent = AppState.user.currentLevel;
        }
        if (this.elements.totalPoints) {
            this.elements.totalPoints.textContent = AppState.user.points;
        }
        if (this.elements.badgeCount) {
            this.elements.badgeCount.textContent = AppState.user.badges.length;
        }
        if (this.elements.streakCount) {
            this.elements.streakCount.textContent = AppState.user.streak;
        }
        if (this.elements.correctCount) {
            this.elements.correctCount.textContent = AppState.flashcards.sessionCorrect;
        }
        if (this.elements.incorrectCount) {
            this.elements.incorrectCount.textContent = AppState.flashcards.sessionIncorrect;
        }
        
        // Update current level info
        if (this.elements.currentLevelInfo && typeof getLevelInfo !== 'undefined') {
            const levelInfo = getLevelInfo(AppState.flashcards.selectedLevel);
            if (levelInfo) {
                this.elements.currentLevelInfo.textContent = `${levelInfo.name} - ${levelInfo.description}`;
            }
        }
    },
    
    // Update dashboard modal
    updateDashboard() {
        if (this.elements.dashboardStreak) {
            this.elements.dashboardStreak.textContent = AppState.user.streak;
        }
        if (this.elements.dashboardPoints) {
            this.elements.dashboardPoints.textContent = AppState.user.points;
        }
        if (this.elements.dashboardLevel) {
            this.elements.dashboardLevel.textContent = AppState.user.currentLevel;
        }
        if (this.elements.dashboardWords) {
            this.elements.dashboardWords.textContent = AppState.user.wordsLearned;
        }
        
        this.updateBadges();
    },
    
    // Update badges display
    updateBadges() {
        const badges = this.elements.badgesGrid.querySelectorAll('.badge-item');
        const achievements = [
            { badge: BADGE_ACHIEVEMENTS.firstSteps, unlocked: AppState.user.wordsLearned >= 1 },
            { badge: BADGE_ACHIEVEMENTS.speedLearner, unlocked: AppState.user.wordsLearned >= 10 },
            { badge: BADGE_ACHIEVEMENTS.creator, unlocked: this.getUserCardCount() >= 5 },
            { badge: BADGE_ACHIEVEMENTS.perfectionist, unlocked: AppState.user.correctAnswers >= 20 },
            { badge: BADGE_ACHIEVEMENTS.onFire, unlocked: AppState.user.streak >= 7 },
            { badge: BADGE_ACHIEVEMENTS.risingStar, unlocked: AppState.user.points >= 50 }
        ];
        
        achievements.forEach((achievement, index) => {
            if (achievement.unlocked) {
                badges[index].classList.remove('locked');
                if (!AppState.user.badges.includes(achievement.badge.id)) {
                    AppState.user.badges.push(achievement.badge.id);
                    AppState.save();
                }
            }
        });
    },
    
    // Get user-created card count
    getUserCardCount() {
        const userCards = localStorage.getItem('userFlashcards');
        return userCards ? JSON.parse(userCards).length : 0;
    },
    
    // Show visual feedback (checkmark or X)
    showFeedback(isCorrect) {
        this.elements.feedbackIcon.textContent = isCorrect ? '✓' : '✗';
        this.elements.feedbackIcon.style.color = isCorrect ? '#10b981' : '#ef4444';
        this.elements.feedbackOverlay.classList.add('show');
        
        setTimeout(() => {
            this.elements.feedbackOverlay.classList.remove('show');
        }, 800);
    }
};

/* ========================================
   FLASHCARD MODULE
   ======================================== */

const FlashcardController = {
    // Initialize flashcard system
    init() {
        this.loadCard();
        this.attachEvents();
    },
    
    // Attach event listeners
    attachEvents() {
        const flashcard = document.getElementById('flashcard');
        const correctBtn = document.getElementById('correctBtn');
        const wrongBtn = document.getElementById('wrongBtn');
        const skipBtn = document.getElementById('skipBtn');
        
        // Flip card on click
        flashcard.addEventListener('click', () => this.flipCard());
        
        // Answer buttons
        correctBtn.addEventListener('click', () => this.handleAnswer(true));
        wrongBtn.addEventListener('click', () => this.handleAnswer(false));
        skipBtn.addEventListener('click', () => this.nextCard());
    },
    
    // Load current card
    loadCard() {
        const cards = AppState.flashcards.current;
        const index = AppState.flashcards.currentIndex;
        
        if (cards.length === 0) {
            UI.elements.cardWord.textContent = 'No cards available';
            UI.elements.cardMeaning.textContent = 'Add some cards first!';
            UI.elements.cardExample.textContent = '';
            return;
        }
        
        const card = cards[index];
        UI.elements.cardWord.textContent = card.word;
        UI.elements.cardMeaning.textContent = card.meaning;
        UI.elements.cardExample.textContent = card.example || '';
        
        // Reset flip state
        AppState.flashcards.isFlipped = false;
        UI.elements.flashcard.classList.remove('flipped');
    },
    
    // Flip card animation
    flipCard() {
        AppState.flashcards.isFlipped = !AppState.flashcards.isFlipped;
        
        if (AppState.flashcards.isFlipped) {
            UI.elements.flashcard.classList.add('flipped');
        } else {
            UI.elements.flashcard.classList.remove('flipped');
        }
    },
    
    // Handle user answer
    handleAnswer(isCorrect) {
        // Update statistics
        if (isCorrect) {
            AppState.flashcards.sessionCorrect++;
            AppState.user.correctAnswers++;
            AppState.user.wordsLearned++;
            AppState.addPoints(10);
        } else {
            AppState.flashcards.sessionIncorrect++;
            AppState.user.incorrectAnswers++;
        }
        
        // Show visual feedback
        UI.showFeedback(isCorrect);
        
        // Update UI
        UI.updateStats();
        
        // Move to next card after delay
        setTimeout(() => this.nextCard(), 1000);
    },
    
    // Load next card
    nextCard() {
        AppState.flashcards.currentIndex++;
        
        // Loop back to start if at end
        if (AppState.flashcards.currentIndex >= AppState.flashcards.current.length) {
            AppState.flashcards.currentIndex = 0;
            AppState.shuffleFlashcards();
        }
        
        this.loadCard();
    }
};

/* ========================================
   CONTENT CREATOR MODULE
   ======================================== */

const ContentCreator = {
    // Initialize content creator
    init() {
        this.attachEvents();
        this.loadUserCollection();
    },
    
    // Attach event listeners
    attachEvents() {
        const form = document.getElementById('contentForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    
    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();
        
        const word = document.getElementById('newWord').value.trim();
        const meaning = document.getElementById('newMeaning').value.trim();
        const example = document.getElementById('newExample').value.trim();
        
        if (!word || !meaning) {
            alert('Please fill in both word and meaning fields.');
            return;
        }
        
        // Create new card object
        const newCard = {
            word: word,
            meaning: meaning,
            example: example || ''
        };
        
        // Save to localStorage
        this.saveCard(newCard);
        
        // Add to current flashcards
        AppState.flashcards.current.push(newCard);
        
        // Clear form
        e.target.reset();
        
        // Update collection display
        this.loadUserCollection();
        
        // Add points for creating content
        AppState.addPoints(5);
        
        // Show success message
        UI.showFeedback(true);
    },
    
    // Save card to localStorage
    saveCard(card) {
        let userCards = [];
        const stored = localStorage.getItem('userFlashcards');
        
        if (stored) {
            userCards = JSON.parse(stored);
        }
        
        userCards.push(card);
        localStorage.setItem('userFlashcards', JSON.stringify(userCards));
    },
    
    // Load and display user collection
    loadUserCollection() {
        const stored = localStorage.getItem('userFlashcards');
        const userCards = stored ? JSON.parse(stored) : [];
        
        UI.elements.collectionCount.textContent = userCards.length;
        
        if (userCards.length === 0) {
            UI.elements.collectionList.innerHTML = 
                '<p class="empty-state">No custom words yet. Create your first one above!</p>';
            return;
        }
        
        // Build collection HTML
        let html = '';
        userCards.forEach((card, index) => {
            html += `
                <div class="collection-item" data-index="${index}">
                    <div class="item-header">
                        <span class="item-word">${this.escapeHtml(card.word)}</span>
                        <button class="item-delete" data-index="${index}" aria-label="Delete card">×</button>
                    </div>
                    <p class="item-meaning">${this.escapeHtml(card.meaning)}</p>
                    ${card.example ? `<p class="item-example">"${this.escapeHtml(card.example)}"</p>` : ''}
                </div>
            `;
        });
        
        UI.elements.collectionList.innerHTML = html;
        
        // Attach delete event listeners
        const deleteButtons = UI.elements.collectionList.querySelectorAll('.item-delete');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.deleteCard(index);
            });
        });
    },
    
    // Delete card from collection
    deleteCard(index) {
        const stored = localStorage.getItem('userFlashcards');
        let userCards = stored ? JSON.parse(stored) : [];
        
        // Remove card
        userCards.splice(index, 1);
        
        // Update localStorage
        localStorage.setItem('userFlashcards', JSON.stringify(userCards));
        
        // Update flashcards state
        AppState.flashcards.current = [...DEFAULT_FLASHCARDS, ...userCards];
        
        // Reload collection display
        this.loadUserCollection();
    },
    
    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

/* ========================================
   MINI-GAME MODULE (DRAG & DROP)
   ======================================== */

const MiniGame = {
    // Initialize game
    init() {
        this.attachEvents();
    },
    
    // Attach event listeners
    attachEvents() {
        const startBtn = document.getElementById('startGameBtn');
        startBtn.addEventListener('click', () => this.startGame());
    },
    
    // Start new game
    startGame() {
        // Reset game state
        AppState.game.score = 0;
        AppState.game.timeRemaining = 60;
        AppState.game.isActive = true;
        AppState.game.matches = [];
        
        // Update UI
        UI.elements.gamePoints.textContent = 'Score: 0';
        
        // Build game board
        this.buildGameBoard();
        
        // Start timer
        this.startTimer();
        
        // Hide start button
        document.getElementById('startGameBtn').classList.add('game-hidden');
    },
    
    // Build game board with draggable items and drop zones
    buildGameBoard() {
        // Use level-specific pairs if available, otherwise use default
        let pairs = AppState.game.currentLevelPairs.length > 0 
            ? AppState.game.currentLevelPairs 
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
        UI.elements.draggableWords.innerHTML = wordsHtml;
        
        // Build drop zones
        let zonesHtml = '';
        pairs.forEach((pair, index) => {
            zonesHtml += `
                <div class="drop-zone" data-definition="${pair.word}" data-index="${index}">
                    <span class="definition-text">${pair.definition}</span>
                </div>
            `;
        });
        UI.elements.dropZones.innerHTML = zonesHtml;
        
        // Attach drag events
        this.attachDragEvents();
    },
    
    // Attach drag and drop events
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
    
    // Check if dropped word matches definition
    checkMatch(word, correctWord, zone) {
        if (word === correctWord) {
            // Correct match
            zone.classList.add('correct', 'filled');
            zone.innerHTML = `<div class="draggable-word">${word}</div>`;
            
            // Update score
            AppState.game.score += 10;
            UI.elements.gamePoints.textContent = `Score: ${AppState.game.score}`;
            
            // Add to matches
            AppState.game.matches.push(word);
            
            // Remove draggable element
            const draggable = document.querySelector(`[data-word="${word}"]`);
            if (draggable && draggable.parentElement.classList.contains('draggable-items')) {
                draggable.remove();
            }
            
            // Check if game complete
            const totalPairs = AppState.game.currentLevelPairs.length > 0 
                ? AppState.game.currentLevelPairs.length 
                : 5;
            
            if (AppState.game.matches.length === totalPairs) {
                this.endGame(true);
            }
        } else {
            // Incorrect match
            zone.classList.add('incorrect');
            setTimeout(() => zone.classList.remove('incorrect'), 400);
        }
    },
    
    // Start countdown timer
    startTimer() {
        AppState.game.timer = setInterval(() => {
            AppState.game.timeRemaining--;
            UI.elements.gameTimer.textContent = `⏱️ ${AppState.game.timeRemaining}s`;
            
            if (AppState.game.timeRemaining <= 0) {
                this.endGame(false);
            }
        }, 1000);
    },
    
    // End game
    endGame(won) {
        clearInterval(AppState.game.timer);
        AppState.game.isActive = false;
        
        const message = won 
            ? `🎉 Congratulations! You scored ${AppState.game.score} points!` 
            : `⏰ Time's up! You scored ${AppState.game.score} points.`;
        
        setTimeout(() => {
            alert(message);
            
            // Award points
            AppState.addPoints(AppState.game.score);
            
            // Show start button again
            document.getElementById('startGameBtn').classList.remove('game-hidden');
        }, 500);
    }
};

/* ========================================
   LEARNING PATH MODULE
   ======================================== */

const LearningPath = {
    currentCategory: 'basic',
    
    // Initialize learning path
    init() {
        this.attachEvents();
        this.renderLevels('basic');
    },
    
    // Attach event listeners
    attachEvents() {
        const tabs = document.querySelectorAll('.category-tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                this.switchCategory(category);
            });
        });
    },
    
    // Switch between basic and intermediate categories
    switchCategory(category) {
        this.currentCategory = category;
        AppState.ui.selectedCategory = category;
        
        // Update tab styles
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Render levels
        this.renderLevels(category);
    },
    
    // Render levels dynamically
    renderLevels(category) {
        if (typeof CURRICULUM === 'undefined') {
            console.error('CURRICULUM not loaded');
            return;
        }
        
        const container = UI.elements.pathContainer;
        const levels = CURRICULUM[category];
        
        let html = '<div class="path-line"></div>';
        
        Object.values(levels).forEach(level => {
            const isUnlocked = AppState.user.points >= level.unlockRequirement;
            const isCompleted = AppState.user.completedLevels.includes(level.id);
            
            html += `
                <div class="skill-node" 
                     data-level-id="${level.id}" 
                     data-unlocked="${isUnlocked}"
                     data-completed="${isCompleted}">
                    <div class="node-circle">
                        <span class="node-icon">${level.icon}</span>
                    </div>
                    <div class="node-content">
                        <h3 class="node-title">${level.name}</h3>
                        <p class="node-description">${level.description}</p>
                        <div class="node-topics">
                            ${level.topics.map(topic => 
                                `<span class="node-topic-tag">${topic}</span>`
                            ).join('')}
                        </div>
                        <span class="node-status">${isCompleted ? 'Completed' : (isUnlocked ? 'Unlocked' : 'Locked')}</span>
                        ${!isUnlocked ? `<p class="node-requirement">🔒 Requires ${level.unlockRequirement} points</p>` : ''}
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Attach click events to nodes
        this.attachNodeEvents();
    },
    
    // Attach click events to level nodes
    attachNodeEvents() {
        const nodes = document.querySelectorAll('.skill-node');
        
        nodes.forEach(node => {
            node.addEventListener('click', () => {
                const levelId = parseInt(node.dataset.levelId);
                const isUnlocked = node.dataset.unlocked === 'true';
                
                if (isUnlocked) {
                    this.selectLevel(levelId);
                } else {
                    alert(`This level is locked. You need ${getLevelInfo(levelId).unlockRequirement} points to unlock it!`);
                }
            });
        });
    },
    
    // Select a level and load its content
    selectLevel(levelId) {
        AppState.flashcards.selectedLevel = levelId;
        AppState.loadLevelVocabulary(levelId);
        AppState.save();
        
        // Update UI
        UI.updateStats();
        FlashcardController.loadCard();
        
        // Scroll to flashcards
        const section = document.getElementById('flashcardsSection');
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Update game pairs for this level
        this.updateGamePairs(levelId);
    },
    
    // Update game pairs based on selected level
    updateGamePairs(levelId) {
        const vocabulary = getVocabularyByLevel(levelId);
        if (vocabulary && vocabulary.length >= 5) {
            // Take first 5 words for the game
            AppState.game.currentLevelPairs = vocabulary.slice(0, 5).map(item => ({
                word: item.word,
                definition: item.meaning
            }));
        }
    }
};

/* ========================================
   MODAL MODULE
   ======================================== */

const ModalController = {
    // Initialize modal
    init() {
        this.attachEvents();
    },
    
    // Attach event listeners
    attachEvents() {
        const progressBtn = document.getElementById('progressBtn');
        const streakBtn = document.getElementById('streakBtn');
        const closeModal = document.getElementById('closeModal');
        const modalOverlay = document.getElementById('modalOverlay');
        
        progressBtn.addEventListener('click', () => this.openModal());
        streakBtn.addEventListener('click', () => this.openModal());
        closeModal.addEventListener('click', () => this.closeModal());
        modalOverlay.addEventListener('click', () => this.closeModal());
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    },
    
    // Open modal
    openModal() {
        UI.updateDashboard();
        UI.elements.progressModal.classList.add('active');
        UI.elements.progressModal.setAttribute('aria-hidden', 'false');
    },
    
    // Close modal
    closeModal() {
        UI.elements.progressModal.classList.remove('active');
        UI.elements.progressModal.setAttribute('aria-hidden', 'true');
    }
};

/* ========================================
   HERO CTA MODULE
   ======================================== */

const HeroController = {
    // Initialize hero section
    init() {
        const ctaButton = document.getElementById('startAdventure');
        
        ctaButton.addEventListener('click', () => {
            const learningPath = document.getElementById('learningPath');
            learningPath.scrollIntoView({ behavior: 'smooth' });
        });
    }
};

/* ========================================
   ADVANCED GAMES CONTROLLER MODULE
   ======================================== */

const GameController = {
    currentGame: null,
    gameContainers: {},
    
    // Initialize game controller
    init() {
        // Cache game container elements
        this.gameContainers = {
            fillblanks: document.getElementById('fillBlanksContainer'),
            scramble: document.getElementById('scrambleContainer'),
            quiz: document.getElementById('quizContainer'),
            typing: document.getElementById('typingContainer'),
            builder: document.getElementById('sentenceBuilderContainer'),
            matching: document.getElementById('matchingContainer')
        };
        
        this.attachEvents();
    },
    
    // Attach event listeners to game selector buttons
    attachEvents() {
        const gameCards = document.querySelectorAll('.game-card');
        
        gameCards.forEach(card => {
            card.addEventListener('click', () => {
                const gameType = card.dataset.game;
                this.launchGame(gameType);
            });
        });
    },
    
    // Launch a specific game
    launchGame(gameType) {
        // Check if level is selected
        if (!AppState.flashcards.selectedLevel) {
            alert('Please select a level from the Learning Path first!');
            const learningPath = document.getElementById('learningPath');
            learningPath.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        
        // Check if AdvancedGames module is loaded
        if (typeof window.AdvancedGames === 'undefined') {
            console.error('AdvancedGames module not loaded');
            alert('Game module is not loaded. Please refresh the page.');
            return;
        }
        
        // Get vocabulary for current level
        const vocabulary = AppState.flashcards.current;
        
        if (vocabulary.length === 0) {
            alert('No vocabulary available for this level. Please try another level.');
            return;
        }
        
        // Hide game selector
        document.querySelector('.game-selector').style.display = 'none';
        
        // Hide all game containers
        Object.values(this.gameContainers).forEach(container => {
            if (container) container.style.display = 'none';
        });
        
        // Show selected game container
        const container = this.gameContainers[gameType];
        if (!container) {
            console.error(`Container for game ${gameType} not found`);
            return;
        }
        
        container.style.display = 'block';
        this.currentGame = gameType;
        
        // Initialize the specific game
        this.initializeGame(gameType, container, vocabulary);
        
        // Scroll to game
        container.scrollIntoView({ behavior: 'smooth' });
    },
    
    // Initialize specific game based on type
    initializeGame(gameType, container, vocabulary) {
        const games = window.AdvancedGames;
        const levelNumber = AppState.flashcards.selectedLevel;
        
        // Add back button to container
        this.addBackButton(container);
        
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
                
            case 'matching':
                // Show the original drag & drop game
                this.showMatchingGame(vocabulary);
                break;
                
            default:
                console.error(`Unknown game type: ${gameType}`);
        }
    },
    
    // Show the original matching game
    showMatchingGame(vocabulary) {
        // Hide advanced games section
        document.getElementById('advancedGames').style.display = 'none';
        
        // Show mini game section
        const miniGameSection = document.getElementById('miniGame');
        miniGameSection.style.display = 'block';
        
        // Update game pairs with current level vocabulary
        if (vocabulary.length >= 5) {
            AppState.game.currentLevelPairs = vocabulary.slice(0, 5).map(item => ({
                word: item.word,
                definition: item.meaning
            }));
        }
        
        // Scroll to game
        miniGameSection.scrollIntoView({ behavior: 'smooth' });
    },
    
    // Handle game completion
    onGameComplete(score) {
        // Award points
        if (score > 0) {
            AppState.addPoints(score);
        }
        
        // Show back button or completion message
        this.showCompletionScreen(score);
    },
    
    // Show completion screen with option to return
    showCompletionScreen(score) {
        const container = this.gameContainers[this.currentGame];
        if (!container) return;
        
        // Add back button if not already present
        let backButton = container.querySelector('.game-back-btn');
        if (!backButton) {
            backButton = document.createElement('button');
            backButton.className = 'btn-primary game-back-btn';
            backButton.innerHTML = '<span class="icon">🔙</span> Back to Games';
            backButton.addEventListener('click', () => this.returnToSelector());
            container.appendChild(backButton);
        }
        
        backButton.style.display = 'block';
    },
    
    // Return to game selector
    returnToSelector() {
        // Hide all game containers
        Object.values(this.gameContainers).forEach(container => {
            if (container) container.style.display = 'none';
        });
        
        // Hide mini game if visible
        document.getElementById('miniGame').style.display = 'none';
        
        // Show advanced games section
        document.getElementById('advancedGames').style.display = 'block';
        
        // Show game selector
        document.querySelector('.game-selector').style.display = 'grid';
        
        // Scroll to selector
        document.getElementById('advancedGames').scrollIntoView({ behavior: 'smooth' });
        
        this.currentGame = null;
    },
    
    // Add back button to game container
    addBackButton(container) {
        // Check if back button already exists
        if (container.querySelector('.game-back-btn')) return;
        
        const backButton = document.createElement('button');
        backButton.className = 'btn-secondary game-back-btn';
        backButton.innerHTML = '<span class="icon">🔙</span> Back to Games';
        backButton.addEventListener('click', () => this.returnToSelector());
        
        // Add to top of container
        container.prepend(backButton);
    }
};

/* ========================================
   APPLICATION INITIALIZATION
   ======================================== */

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize state
    AppState.init();
    
    // Initialize UI
    UI.init();
    
    // Initialize all modules
    FlashcardController.init();
    ContentCreator.init();
    MiniGame.init();
    LearningPath.init();
    ModalController.init();
    HeroController.init();
    GameController.init();
    
    console.log('🚀 Gaell English Academy initialized successfully!');
});

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll/resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
