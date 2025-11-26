// ==================== STATE ====================
let state = {
    headsCount: 0,
    tailsCount: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastResult: null,
    history: [],
    achievements: {},
    coinTheme: 'kawaii',
    darkMode: false,
    soundEnabled: true
};

// ==================== DOM ELEMENTS ====================
const coin = document.getElementById('coin');
const flipBtn = document.getElementById('flipBtn');
const result = document.getElementById('result');
const streak = document.getElementById('streak');
const headsCountEl = document.getElementById('headsCount');
const tailsCountEl = document.getElementById('tailsCount');
const headsPercentEl = document.getElementById('headsPercent');
const tailsPercentEl = document.getElementById('tailsPercent');
const totalFlipsEl = document.getElementById('totalFlips');
const bestStreakEl = document.getElementById('bestStreak');
const barHeads = document.getElementById('barHeads');
const barTails = document.getElementById('barTails');
const historyList = document.getElementById('history');
const themeToggle = document.getElementById('themeToggle');
const soundToggle = document.getElementById('soundToggle');
const mascot = document.getElementById('mascot');
const mascotSpeech = document.getElementById('mascotSpeech');
const achievementPopup = document.getElementById('achievementPopup');
const popupIcon = document.getElementById('popupIcon');
const popupName = document.getElementById('popupName');
const confettiContainer = document.getElementById('confetti');
const sparklesContainer = document.getElementById('sparkles');
const headsFace = document.getElementById('headsFace');
const tailsFace = document.getElementById('tailsFace');
const funFact = document.getElementById('funFact');

// ==================== SOUND EFFECTS ====================
const sounds = {
    flip: null,
    win: null,
    achievement: null
};

// Create audio context for sound effects
function createSound(frequency, duration, type = 'sine') {
    return () => {
        if (!state.soundEnabled) return;
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Audio not supported
        }
    };
}

const playFlipSound = createSound(800, 0.1, 'square');
const playResultSound = createSound(523, 0.2, 'sine');
const playAchievementSound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.1 + 0.3);
            osc.start(audioCtx.currentTime + i * 0.1);
            osc.stop(audioCtx.currentTime + i * 0.1 + 0.3);
        });
    } catch (e) {}
};

// ==================== INITIALIZATION ====================
function init() {
    loadState();
    createSparkles();
    updateDisplay();
    updateAchievementsDisplay();
    updateHistoryDisplay();
    applyTheme();
    applyCoinTheme();
    showRandomFact();

    // Event listeners
    flipBtn.addEventListener('click', () => flipCoin());
    document.getElementById('resetBtn').addEventListener('click', resetStats);
    document.getElementById('clearHistory').addEventListener('click', clearHistory);
    themeToggle.addEventListener('click', toggleDarkMode);
    soundToggle.addEventListener('click', toggleSound);
    document.getElementById('shareBtn').addEventListener('click', shareResults);
    document.getElementById('copyBtn').addEventListener('click', copyStats);

    // Coin theme buttons
    document.querySelectorAll('.coin-theme-btn').forEach(btn => {
        btn.addEventListener('click', () => setCoinTheme(btn.dataset.theme));
    });

    // Quick flip buttons
    document.querySelectorAll('.quick-flip-btn').forEach(btn => {
        btn.addEventListener('click', () => quickFlip(parseInt(btn.dataset.flips)));
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !flipBtn.disabled) {
            e.preventDefault();
            flipCoin();
        }
    });

    // Show welcome message
    showMascotMessage("Welcome! Let's flip! ✨");
}

// ==================== SPARKLES ====================
function createSparkles() {
    const symbols = ['✦', '✧', '★', '♡', '✿', '❀', '⋆', '｡'];
    sparklesContainer.innerHTML = '';

    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 6 + 's';
        sparkle.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        sparklesContainer.appendChild(sparkle);
    }
}

// ==================== CONFETTI ====================
function createConfetti(isHeads) {
    const emojis = isHeads
        ? ['💖', '⭐', '✨', '💫', '🌟', '💗', '💕']
        : ['💜', '🔮', '✨', '💫', '⭐', '💟', '🌙'];

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('span');
        confetti.className = 'confetti';
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        confettiContainer.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// ==================== COIN FLIP ====================
function flipCoin(showAnimation = true) {
    if (flipBtn.disabled) return;

    // Disable buttons during animation
    setButtonsDisabled(true);

    // Clear previous result
    result.textContent = '';
    result.className = 'result';
    coin.className = 'coin';
    if (state.coinTheme !== 'kawaii') {
        coin.classList.add('theme-' + state.coinTheme);
    }

    // Play flip sound
    playFlipSound();

    // Random result
    const isHeads = Math.random() < 0.5;

    if (showAnimation) {
        // Add animation
        setTimeout(() => {
            coin.classList.add(isHeads ? 'flipping' : 'flipping-tails');

            // Show result after animation
            setTimeout(() => {
                showResult(isHeads);
                setButtonsDisabled(false);
            }, 1000);
        }, 50);
    } else {
        // Instant result for quick flips
        showResult(isHeads);
        setButtonsDisabled(false);
    }

    return isHeads;
}

function showResult(isHeads) {
    // Update counts
    if (isHeads) {
        state.headsCount++;
        result.textContent = '★ HEADS! ★';
        result.classList.add('heads-result');
    } else {
        state.tailsCount++;
        result.textContent = '♡ TAILS! ♡';
        result.classList.add('tails-result');
    }

    // Update streak
    if (state.lastResult === isHeads) {
        state.currentStreak++;
    } else {
        state.currentStreak = 1;
    }
    state.lastResult = isHeads;

    if (state.currentStreak > state.bestStreak) {
        state.bestStreak = state.currentStreak;
    }

    // Add to history
    state.history.unshift(isHeads ? 'H' : 'T');
    if (state.history.length > 20) {
        state.history.pop();
    }

    // Update display
    updateDisplay();
    updateHistoryDisplay();

    // Play sound
    playResultSound();

    // Confetti on streaks
    if (state.currentStreak >= 3) {
        createConfetti(isHeads);
    }

    // Check achievements
    checkAchievements();

    // Update mascot
    updateMascot(isHeads);

    // Save state
    saveState();
}

function quickFlip(count) {
    setButtonsDisabled(true);
    result.textContent = 'Flipping...';
    result.className = 'result';

    let headsInBatch = 0;
    let tailsInBatch = 0;

    // Perform flips
    for (let i = 0; i < count; i++) {
        const isHeads = Math.random() < 0.5;

        if (isHeads) {
            state.headsCount++;
            headsInBatch++;
        } else {
            state.tailsCount++;
            tailsInBatch++;
        }

        // Update streak for last flip
        if (i === count - 1 || state.lastResult !== isHeads) {
            if (state.lastResult === isHeads) {
                state.currentStreak++;
            } else {
                state.currentStreak = 1;
            }
        }
        state.lastResult = isHeads;

        if (state.currentStreak > state.bestStreak) {
            state.bestStreak = state.currentStreak;
        }

        // Add to history (only last few)
        if (i >= count - 5) {
            state.history.unshift(isHeads ? 'H' : 'T');
        }
    }

    // Trim history
    while (state.history.length > 20) {
        state.history.pop();
    }

    // Show results
    setTimeout(() => {
        result.textContent = `${headsInBatch} Heads, ${tailsInBatch} Tails`;
        result.classList.add(headsInBatch > tailsInBatch ? 'heads-result' : 'tails-result');

        updateDisplay();
        updateHistoryDisplay();
        checkAchievements();
        saveState();
        setButtonsDisabled(false);
        createConfetti(headsInBatch > tailsInBatch);

        showMascotMessage(`Wow! ${count} flips done! ✨`);
    }, 500);
}

function setButtonsDisabled(disabled) {
    flipBtn.disabled = disabled;
    document.querySelectorAll('.quick-flip-btn').forEach(btn => {
        btn.disabled = disabled;
    });
}

// ==================== DISPLAY UPDATES ====================
function updateDisplay() {
    const total = state.headsCount + state.tailsCount;

    headsCountEl.textContent = state.headsCount;
    tailsCountEl.textContent = state.tailsCount;
    totalFlipsEl.textContent = total;
    bestStreakEl.textContent = state.bestStreak;

    // Percentages
    const headsPercent = total > 0 ? ((state.headsCount / total) * 100).toFixed(1) : 0;
    const tailsPercent = total > 0 ? ((state.tailsCount / total) * 100).toFixed(1) : 0;

    headsPercentEl.textContent = headsPercent + '%';
    tailsPercentEl.textContent = tailsPercent + '%';

    // Stats bar
    barHeads.style.width = headsPercent + '%';
    barTails.style.width = tailsPercent + '%';

    // Streak display
    if (state.currentStreak >= 3) {
        streak.textContent = `🔥 ${state.currentStreak} in a row!`;
        streak.classList.add('hot');
    } else if (state.currentStreak > 0) {
        streak.textContent = `${state.currentStreak} in a row`;
        streak.classList.remove('hot');
    } else {
        streak.textContent = '';
    }
}

function updateHistoryDisplay() {
    historyList.innerHTML = '';
    state.history.forEach(item => {
        const el = document.createElement('div');
        el.className = `history-item ${item === 'H' ? 'heads' : 'tails'}`;
        el.textContent = item;
        historyList.appendChild(el);
    });
}

// ==================== ACHIEVEMENTS ====================
const achievementDefinitions = {
    'first-flip': { name: 'First Flip', icon: '🌟', check: () => state.headsCount + state.tailsCount >= 1 },
    'ten-flips': { name: '10 Flips', icon: '🎯', check: () => state.headsCount + state.tailsCount >= 10 },
    'hundred-flips': { name: '100 Flips', icon: '💯', check: () => state.headsCount + state.tailsCount >= 100 },
    'thousand-flips': { name: '1000 Flips', icon: '👑', check: () => state.headsCount + state.tailsCount >= 1000 },
    'streak-5': { name: '5 Streak', icon: '🍀', check: () => state.bestStreak >= 5 },
    'streak-10': { name: '10 Streak', icon: '🔥', check: () => state.bestStreak >= 10 },
    'perfect-balance': { name: 'Balance', icon: '⚖️', check: () => {
        const total = state.headsCount + state.tailsCount;
        return total >= 100 && state.headsCount === state.tailsCount;
    }},
    'night-owl': { name: 'Night Owl', icon: '🦉', check: () => {
        const hour = new Date().getHours();
        return hour >= 0 && hour < 5;
    }}
};

function checkAchievements() {
    for (const [id, def] of Object.entries(achievementDefinitions)) {
        if (!state.achievements[id] && def.check()) {
            unlockAchievement(id, def);
        }
    }
}

function unlockAchievement(id, def) {
    state.achievements[id] = true;

    // Update display
    const el = document.querySelector(`.achievement[data-id="${id}"]`);
    if (el) {
        el.classList.remove('locked');
        el.classList.add('unlocked');
    }

    // Show popup
    popupIcon.textContent = def.icon;
    popupName.textContent = def.name;
    achievementPopup.classList.add('show');
    playAchievementSound();

    setTimeout(() => {
        achievementPopup.classList.remove('show');
    }, 2500);

    saveState();
}

function updateAchievementsDisplay() {
    for (const id in state.achievements) {
        if (state.achievements[id]) {
            const el = document.querySelector(`.achievement[data-id="${id}"]`);
            if (el) {
                el.classList.remove('locked');
                el.classList.add('unlocked');
            }
        }
    }
}

// ==================== MASCOT ====================
const mascotMessages = {
    heads: [
        "Yay! Heads! ★",
        "Lucky heads! ✨",
        "Heads wins! 💖",
        "Stars align! ⭐"
    ],
    tails: [
        "Tails! Nice! ♡",
        "Purple magic! 💜",
        "Tails it is! 🌙",
        "Moon side! ✧"
    ],
    streak: [
        "On fire! 🔥",
        "Incredible! ⭐",
        "So lucky! 🍀",
        "Amazing! 💫"
    ]
};

function updateMascot(isHeads) {
    let messages;
    if (state.currentStreak >= 5) {
        messages = mascotMessages.streak;
    } else {
        messages = isHeads ? mascotMessages.heads : mascotMessages.tails;
    }

    const message = messages[Math.floor(Math.random() * messages.length)];
    showMascotMessage(message);
}

function showMascotMessage(message) {
    mascotSpeech.textContent = message;
    mascotSpeech.classList.add('visible');

    setTimeout(() => {
        mascotSpeech.classList.remove('visible');
    }, 2000);
}

// ==================== THEMES ====================
function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    applyTheme();
    saveState();
}

function applyTheme() {
    if (state.darkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.querySelector('.theme-icon').textContent = '🌙';
    }
}

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    soundToggle.classList.toggle('muted', !state.soundEnabled);
    soundToggle.querySelector('.sound-icon').textContent = state.soundEnabled ? '🔊' : '🔇';
    saveState();
}

function setCoinTheme(theme) {
    state.coinTheme = theme;

    // Update active button
    document.querySelectorAll('.coin-theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });

    applyCoinTheme();
    saveState();
}

function applyCoinTheme() {
    // Remove all theme classes
    coin.className = 'coin';

    if (state.coinTheme !== 'kawaii') {
        coin.classList.add('theme-' + state.coinTheme);
    }

    // Update coin faces based on theme
    const themes = {
        kawaii: { heads: '★', tails: '♡' },
        gold: { heads: '👑', tails: '🦅' },
        galaxy: { heads: '🌟', tails: '🌙' },
        neon: { heads: '⚡', tails: '💎' },
        sakura: { heads: '🌸', tails: '🦋' }
    };

    const faces = themes[state.coinTheme] || themes.kawaii;
    headsFace.textContent = faces.heads;
    tailsFace.textContent = faces.tails;
}

// ==================== FUN FACTS ====================
const funFacts = [
    "A coin has about a 51% chance of landing on the side it started on!",
    "The world record for consecutive heads is 716 flips!",
    "Ancient Romans used coins with ships on one side, calling it 'heads or ships'!",
    "A spinning coin can land on its edge about 1 in 6000 times!",
    "The phrase 'flip a coin' dates back to Julius Caesar's time!",
    "Professional coin flippers can bias a flip up to 60%!",
    "A quarter has 119 ridges on its edge!",
    "Coin flipping is used to start every NFL game!"
];

function showRandomFact() {
    const factText = funFact.querySelector('.fact-text');
    factText.textContent = funFacts[Math.floor(Math.random() * funFacts.length)];
}

// Change fact every 30 seconds
setInterval(showRandomFact, 30000);

// ==================== SHARE FUNCTIONS ====================
function shareResults() {
    const total = state.headsCount + state.tailsCount;
    const text = `🪙 Kawaii Coin Flipper Results!\n\n★ Heads: ${state.headsCount} (${total > 0 ? ((state.headsCount/total)*100).toFixed(1) : 0}%)\n♡ Tails: ${state.tailsCount} (${total > 0 ? ((state.tailsCount/total)*100).toFixed(1) : 0}%)\n✧ Total: ${total}\n🔥 Best Streak: ${state.bestStreak}\n\nTry it yourself!`;

    if (navigator.share) {
        navigator.share({
            title: 'Kawaii Coin Flipper',
            text: text,
            url: window.location.href
        }).catch(() => {});
    } else {
        copyToClipboard(text);
        showMascotMessage("Copied to clipboard! 📋");
    }
}

function copyStats() {
    const total = state.headsCount + state.tailsCount;
    const text = `🪙 My Coin Flip Stats:\n★ Heads: ${state.headsCount}\n♡ Tails: ${state.tailsCount}\n✧ Total: ${total}\n🔥 Best Streak: ${state.bestStreak}`;

    copyToClipboard(text);
    showMascotMessage("Stats copied! 📋");
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}

// ==================== RESET ====================
function resetStats() {
    if (!confirm('Reset all statistics? Achievements will be kept!')) return;

    state.headsCount = 0;
    state.tailsCount = 0;
    state.currentStreak = 0;
    state.bestStreak = 0;
    state.lastResult = null;
    state.history = [];

    result.textContent = '';
    result.className = 'result';
    streak.textContent = '';

    updateDisplay();
    updateHistoryDisplay();
    saveState();

    showMascotMessage("Fresh start! ✨");
}

function clearHistory() {
    state.history = [];
    updateHistoryDisplay();
    saveState();
}

// ==================== STORAGE ====================
function saveState() {
    try {
        localStorage.setItem('coinFlipperState', JSON.stringify(state));
    } catch (e) {}
}

function loadState() {
    try {
        const saved = localStorage.getItem('coinFlipperState');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
        }
    } catch (e) {}
}

// ==================== START ====================
document.addEventListener('DOMContentLoaded', init);
