/* ========================================
   GAELL ENGLISH ACADEMY - DASHBOARD SCRIPT
   Main Progress Dashboard Logic
   ======================================== */

'use strict';

/* ========================================
   STATE MANAGEMENT
   ======================================== */

const AppState = {
    user: {
        currentLevel: 1,
        points: 0,
        streak: 0,
        wordsLearned: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        badges: [],
        completedLevels: [],
        levelProgress: {} // Track progress per level
    },
    
    // Initialize state from localStorage
    init() {
        const savedState = localStorage.getItem('gaellEnglishAcademyState');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            this.user = { ...this.user, ...parsed.user };
        }
    },
    
    // Save state to localStorage
    save() {
        localStorage.setItem('gaellEnglishAcademyState', JSON.stringify({
            user: this.user
        }));
    },
    
    // Check if level is unlocked
    isLevelUnlocked(levelId) {
        // ALL LEVELS UNLOCKED BY DEFAULT
        return true;
    },
    
    // Check if level is completed
    isLevelCompleted(levelId) {
        return this.user.completedLevels.includes(levelId);
    }
};

/* ========================================
   DASHBOARD UI CONTROLLER
   ======================================== */

const DashboardUI = {
    elements: {},
    currentCategory: 'basic',
    
    // Initialize UI
    init() {
        // Cache elements
        this.elements = {
            userLevel: document.getElementById('userLevel'),
            totalPoints: document.getElementById('totalPoints'),
            badgeCount: document.getElementById('badgeCount'),
            streakCount: document.getElementById('streakCount'),
            wordsLearned: document.getElementById('wordsLearned'),
            correctAnswers: document.getElementById('correctAnswers'),
            levelsGrid: document.getElementById('levelsGrid'),
            badgesGrid: document.getElementById('badgesGrid'),
            progressModal: document.getElementById('progressModal'),
            modalOverlay: document.getElementById('modalOverlay'),
            closeModal: document.getElementById('closeModal'),
            dashboardStreak: document.getElementById('dashboardStreak'),
            dashboardPoints: document.getElementById('dashboardPoints'),
            dashboardLevel: document.getElementById('dashboardLevel'),
            dashboardWords: document.getElementById('dashboardWords'),
            basicProgress: document.getElementById('basicProgress'),
            intermediateProgress: document.getElementById('intermediateProgress'),
            basicProgressBar: document.getElementById('basicProgressBar'),
            intermediateProgressBar: document.getElementById('intermediateProgressBar')
        };
        
        this.attachEvents();
        this.updateStats();
        this.renderLevels('basic');
        this.updateBadges();
    },
    
    // Attach event listeners
    attachEvents() {
        // Category tabs
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                this.switchCategory(category);
            });
        });
        
        // Progress modal
        const progressBtn = document.getElementById('progressBtn');
        progressBtn.addEventListener('click', () => this.openModal());
        this.elements.closeModal.addEventListener('click', () => this.closeModal());
        this.elements.modalOverlay.addEventListener('click', () => this.closeModal());
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    },
    
    // Update stats display
    updateStats() {
        this.elements.userLevel.textContent = AppState.user.currentLevel;
        this.elements.totalPoints.textContent = AppState.user.points;
        this.elements.badgeCount.textContent = AppState.user.badges.length;
        this.elements.streakCount.textContent = AppState.user.streak;
        this.elements.wordsLearned.textContent = AppState.user.wordsLearned;
        this.elements.correctAnswers.textContent = AppState.user.correctAnswers;
        
        // Update modal stats
        if (this.elements.dashboardStreak) {
            this.elements.dashboardStreak.textContent = AppState.user.streak;
            this.elements.dashboardPoints.textContent = AppState.user.points;
            this.elements.dashboardLevel.textContent = AppState.user.currentLevel;
            this.elements.dashboardWords.textContent = AppState.user.wordsLearned;
        }
        
        this.updateProgressBars();
    },
    
    // Update progress bars
    updateProgressBars() {
        // Count completed levels
        const basicCompleted = AppState.user.completedLevels.filter(id => id >= 1 && id <= 6).length;
        const intermediateCompleted = AppState.user.completedLevels.filter(id => id >= 7 && id <= 12).length;
        
        // Update text
        this.elements.basicProgress.textContent = `${basicCompleted}/6`;
        this.elements.intermediateProgress.textContent = `${intermediateCompleted}/6`;
        
        // Update bars
        const basicPercent = (basicCompleted / 6) * 100;
        const intermediatePercent = (intermediateCompleted / 6) * 100;
        
        this.elements.basicProgressBar.style.width = `${basicPercent}%`;
        this.elements.intermediateProgressBar.style.width = `${intermediatePercent}%`;
    },
    
    // Switch between categories
    switchCategory(category) {
        this.currentCategory = category;
        
        // Update tab styles
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        this.renderLevels(category);
    },
    
    // Render levels grid
    renderLevels(category) {
        if (typeof CURRICULUM === 'undefined') {
            console.error('CURRICULUM not loaded');
            return;
        }
        
        const levels = CURRICULUM[category];
        let html = '';
        
        Object.values(levels).forEach(level => {
            const isUnlocked = AppState.isLevelUnlocked(level.id);
            const isCompleted = AppState.isLevelCompleted(level.id);
            
            const statusClass = isCompleted ? 'completed' : (isUnlocked ? 'unlocked' : 'locked');
            const statusIcon = isCompleted ? '✓' : (isUnlocked ? '🔓' : '🔒');
            const statusText = isCompleted ? 'Completado' : (isUnlocked ? 'Disponible' : 'Bloqueado');
            
            html += `
                <div class="level-card ${statusClass}" data-level-id="${level.id}">
                    <div class="level-header">
                        <span class="level-icon">${level.icon}</span>
                        <span class="level-status">${statusIcon}</span>
                    </div>
                    <h3 class="level-title">${level.name}</h3>
                    <p class="level-description">${level.description}</p>
                    <div class="level-topics">
                        ${level.topics.slice(0, 2).map(topic => 
                            `<span class="topic-tag">${topic}</span>`
                        ).join('')}
                    </div>
                    <div class="level-footer">
                        <span class="level-status-text">${statusText}</span>
                        ${!isUnlocked ? `<span class="level-requirement">${level.unlockRequirement} pts</span>` : ''}
                    </div>
                </div>
            `;
        });
        
        this.elements.levelsGrid.innerHTML = html;
        
        // Attach click events
        this.attachLevelEvents();
    },
    
    // Attach click events to level cards
    attachLevelEvents() {
        const cards = document.querySelectorAll('.level-card');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const levelId = parseInt(card.dataset.levelId);
                const isUnlocked = AppState.isLevelUnlocked(levelId);
                
                if (isUnlocked) {
                    this.navigateToLevel(levelId);
                } else {
                    const levelInfo = getLevelInfo(levelId);
                    alert(`Este nivel está bloqueado. Necesitas ${levelInfo.unlockRequirement} puntos para desbloquearlo.`);
                }
            });
        });
    },
    
    // Navigate to level page
    navigateToLevel(levelId) {
        // Save current level selection
        localStorage.setItem('selectedLevel', levelId);
        // Navigate to level page
        window.location.href = `level.html?id=${levelId}`;
    },
    
    // Update badges display
    updateBadges() {
        const badges = this.elements.badgesGrid.querySelectorAll('.badge-item');
        const achievements = [
            { unlocked: AppState.user.wordsLearned >= 1 },
            { unlocked: AppState.user.wordsLearned >= 10 },
            { unlocked: this.getUserCardCount() >= 5 },
            { unlocked: AppState.user.correctAnswers >= 20 },
            { unlocked: AppState.user.streak >= 7 },
            { unlocked: AppState.user.points >= 50 }
        ];
        
        achievements.forEach((achievement, index) => {
            if (achievement.unlocked) {
                badges[index].classList.remove('locked');
            }
        });
    },
    
    // Get user-created card count
    getUserCardCount() {
        const userCards = localStorage.getItem('userFlashcards');
        return userCards ? JSON.parse(userCards).length : 0;
    },
    
    // Open progress modal
    openModal() {
        this.updateStats();
        this.elements.progressModal.classList.add('active');
        this.elements.progressModal.setAttribute('aria-hidden', 'false');
    },
    
    // Close modal
    closeModal() {
        this.elements.progressModal.classList.remove('active');
        this.elements.progressModal.setAttribute('aria-hidden', 'true');
    }
};

/* ========================================
   HELPER FUNCTIONS
   ======================================== */

// Get level information by ID
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

/* ========================================
   INITIALIZATION
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize state
    AppState.init();
    
    // Initialize UI
    DashboardUI.init();
    
    console.log('🎯 Dashboard loaded successfully!');
});
