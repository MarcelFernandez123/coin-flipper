// Statistics tracking
let headsCount = 0;
let tailsCount = 0;

// DOM elements
const coin = document.getElementById('coin');
const flipBtn = document.getElementById('flipBtn');
const result = document.getElementById('result');
const headsCountEl = document.getElementById('headsCount');
const tailsCountEl = document.getElementById('tailsCount');
const totalFlipsEl = document.getElementById('totalFlips');

function flipCoin() {
    // Disable button during animation
    flipBtn.disabled = true;

    // Clear previous result and animation classes
    result.textContent = '';
    result.className = 'result';
    coin.className = 'coin';

    // Random result: 0 = heads, 1 = tails
    const isHeads = Math.random() < 0.5;

    // Small delay to reset animation
    setTimeout(() => {
        // Add appropriate animation class
        if (isHeads) {
            coin.classList.add('flipping');
        } else {
            coin.classList.add('flipping-tails');
        }

        // Show result after animation completes
        setTimeout(() => {
            if (isHeads) {
                result.textContent = 'HEADS!';
                result.classList.add('heads-result');
                headsCount++;
            } else {
                result.textContent = 'TAILS!';
                result.classList.add('tails-result');
                tailsCount++;
            }

            // Update statistics display
            updateStats();

            // Re-enable button
            flipBtn.disabled = false;
        }, 1000);
    }, 50);
}

function updateStats() {
    headsCountEl.textContent = headsCount;
    tailsCountEl.textContent = tailsCount;
    totalFlipsEl.textContent = headsCount + tailsCount;
}

function resetStats() {
    headsCount = 0;
    tailsCount = 0;
    updateStats();
    result.textContent = '';
    result.className = 'result';
    coin.className = 'coin';
}

// Allow spacebar to flip the coin
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !flipBtn.disabled) {
        e.preventDefault();
        flipCoin();
    }
});
