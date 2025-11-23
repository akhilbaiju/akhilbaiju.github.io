// Memory Match Game
const emojis = ['🎮', '🎨', '🎭', '🎪', '🎸', '🎯', '🎲', '🎰'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let startTime = null;
let timerInterval = null;

// Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize game
function initGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    cards = shuffle([...emojis, ...emojis]);
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.innerHTML = `<div class="card-content">${emoji}</div>`;
        card.onclick = () => flipCard(card);
        gameBoard.appendChild(card);
        
        // Animate on load
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        }, index * 50);
    });
}

// Flip card
function flipCard(card) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    // Start timer on first move
    if (moves === 0) {
        startTimer();
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        updateMoves();
        checkMatch();
    }
}

// Check for match
function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        // Match found
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            
            matchedPairs++;
            updateMatches();
            
            if (matchedPairs === emojis.length) {
                setTimeout(() => {
                    endGame();
                }, 500);
            }
        }, 600);
    } else {
        // No match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Update stats
function updateMoves() {
    document.getElementById('moves').textContent = moves;
}

function updateMatches() {
    document.getElementById('matches').textContent = `${matchedPairs} / ${emojis.length}`;
}

// Timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// End game
function endGame() {
    stopTimer();
    
    const finalMoves = document.getElementById('final-moves');
    const finalTime = document.getElementById('final-time');
    
    finalMoves.textContent = moves;
    finalTime.textContent = document.getElementById('timer').textContent;
    
    const winModal = document.getElementById('win-modal');
    winModal.classList.add('active');
}

// Reset game
function resetGame() {
    stopTimer();
    
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    startTime = null;
    
    document.getElementById('moves').textContent = '0';
    document.getElementById('matches').textContent = '0 / 8';
    document.getElementById('timer').textContent = '0:00';
    
    const winModal = document.getElementById('win-modal');
    winModal.classList.remove('active');
    
    initGame();
}

// Initialize on load
initGame();
