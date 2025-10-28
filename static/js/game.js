// SPDX-License-Identifier: MIT
// Game constants
const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;
const INITIAL_SNAKE_LENGTH = 3;
const GAME_SPEED = 100; // milliseconds

// Game state
let canvas, ctx;
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let gameLoop = null;
let score = 0;
let highScore = 0;
let isPaused = false;
let isGameOver = false;

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Load high score from localStorage
    highScore = parseInt(localStorage.getItem('snakeHighScore') || '0', 10);
    document.getElementById('highScore').textContent = highScore;
    
    // Button event listeners
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('pauseButton').addEventListener('click', togglePause);
    document.getElementById('resetButton').addEventListener('click', resetGame);
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
    
    // Initial render
    initSnake();
    generateFood();
    render();
});

// Initialize snake
function initSnake() {
    snake = [];
    for (let i = INITIAL_SNAKE_LENGTH - 1; i >= 0; i--) {
        snake.push({ x: i, y: 10 });
    }
    direction = 'right';
    nextDirection = 'right';
}

// Generate food at random position
function generateFood() {
    let newFood;
    let collision;
    
    do {
        collision = false;
        newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
        
        // Check if food spawns on snake
        for (let segment of snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                collision = true;
                break;
            }
        }
    } while (collision);
    
    food = newFood;
}

// Handle keyboard input
function handleKeyPress(e) {
    if (isGameOver && e.key.startsWith('Arrow')) {
        startGame();
        return;
    }
    
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') nextDirection = 'up';
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (direction !== 'up') nextDirection = 'down';
            e.preventDefault();
            break;
        case 'ArrowLeft':
            if (direction !== 'right') nextDirection = 'left';
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (direction !== 'left') nextDirection = 'right';
            e.preventDefault();
            break;
        case ' ':
            togglePause();
            e.preventDefault();
            break;
    }
}

// Start game
function startGame() {
    if (gameLoop) return; // Already running
    
    if (isGameOver) {
        resetGame();
    }
    
    isGameOver = false;
    isPaused = false;
    document.getElementById('startButton').disabled = true;
    document.getElementById('pauseButton').disabled = false;
    
    gameLoop = setInterval(update, GAME_SPEED);
}

// Toggle pause
function togglePause() {
    if (isGameOver) return;
    
    isPaused = !isPaused;
    document.getElementById('pauseButton').textContent = isPaused ? 'Resume' : 'Pause';
}

// Reset game
function resetGame() {
    clearInterval(gameLoop);
    gameLoop = null;
    
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('startButton').disabled = false;
    document.getElementById('pauseButton').disabled = true;
    document.getElementById('pauseButton').textContent = 'Pause';
    
    isPaused = false;
    isGameOver = false;
    
    initSnake();
    generateFood();
    render();
}

// Update game state
function update() {
    if (isPaused || isGameOver) return;
    
    // Update direction
    direction = nextDirection;
    
    // Calculate new head position
    const head = { ...snake[0] };
    
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    
    // Check wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
            gameOver();
            return;
        }
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        
        if (score > highScore) {
            highScore = score;
            document.getElementById('highScore').textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        generateFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
    
    render();
}

// Game over
function gameOver() {
    clearInterval(gameLoop);
    gameLoop = null;
    isGameOver = true;
    
    document.getElementById('startButton').disabled = false;
    document.getElementById('pauseButton').disabled = true;
    
    // Draw game over message
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 20);
    
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 20);
    ctx.fillText('Press arrow key to restart', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 50);
}

// Render game
function render() {
    // Clear canvas
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
        ctx.stroke();
    }
    
    // Draw food
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
    
    // Draw snake
    snake.forEach((segment, index) => {
        // Head is darker
        const isHead = index === 0;
        ctx.fillStyle = isHead ? '#2d5016' : '#4CAF50';
        
        ctx.fillRect(
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
        );
        
        // Add eyes to head
        if (isHead) {
            ctx.fillStyle = 'white';
            const eyeSize = 3;
            const eyeOffset = CELL_SIZE / 4;
            
            // Draw eyes based on direction
            if (direction === 'right') {
                ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            } else if (direction === 'left') {
                ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            } else if (direction === 'up') {
                ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
            } else if (direction === 'down') {
                ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
                ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            }
        }
    });
    
    // Draw pause overlay
    if (isPaused && !isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    }
}
