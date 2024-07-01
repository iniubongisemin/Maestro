// Selecting the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Setting the size of the canvas
const canvasSize = 400;
const tileSize = 20;

// Snake initialization
let snake = [
    { x: tileSize * 2, y: 0 },
    { x: tileSize, y: 0 },
    { x: 0, y: 0 },
];
let direction = 'RIGHT';

// Function to draw the snake
function drawSnake() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = 'green';

    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
    }
}

// Function to update the snake's position
function updateSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'RIGHT':
            head.x += tileSize;
            break;
        case 'LEFT':
            head.x -= tileSize;
            break;
        case 'UP':
            head.y -= tileSize;
            break;
        case 'DOWN':
            head.y += tileSize;
            break;
    }

    snake.unshift(head); // Add the new head position to the beginning of the array
    if (snake[0].x >= canvasSize) { // Check for boundaries
        snake[0].x = 0;
    } else if (snake[0].x < 0 || snake[0].y < 0 || snake[0].y >= canvasSize) {
        alert('Game Over');
        document.location.reload();
    } else if (checkCollision()) { // Check for self-collision
        alert('Game Over');
        document.location.reload();
    } else {
        snake.pop(); // Remove the last segment of the snake
    }
}

// Function to check collision with itself
function checkCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake.x === head.x && snake.y === head.y) {
            return true;
        }
    }
    return false;
}

// Function to handle key events for controlling the snake
function setupControls() {
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowRight':
                if (direction !== 'LEFT') direction = 'RIGHT'; break;
            case 'ArrowLeft':
                if (direction !== 'RIGHT') direction = 'LEFT'; break;
            case 'ArrowUp':
                if (direction !== 'DOWN') direction = 'UP'; break;
            case 'ArrowDown':
                if (direction !== 'UP') direction = 'DOWN'; break;
        }
    });
}

// Start the game loop
function gameLoop() {
    updateSnake();
    drawSnake();
    requestAnimationFrame(gameLoop);
}

setupControls();
gameLoop(); // Start the game loop