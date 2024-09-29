const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 15;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = "";
let food = { x: Math.floor(Math.random() * 15) * box, y: Math.floor(Math.random() * 15) * box };
let score = 0; // Variabel skor

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, box, box);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Direction control
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Eating food
    if (snakeX === food.x && snakeY === food.y) {
        food = { x: Math.floor(Math.random() * 15) * box, y: Math.floor(Math.random() * 15) * box };
        score++; // Tambah skor
    } else {
        snake.pop(); // remove the tail
    }

    // Add new head
    const newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Your Score: " + score);
    }

    snake.unshift(newHead); // add new head to the snake
}

// Check for collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Control the snake
document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}

let game = setInterval(draw, 150);
