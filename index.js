import {collisionSide, bounce} from './utils.js'
import {Game} from "./Game.js";

const canvas = document.querySelector('canvas');

let game = new Game(canvas, 1000, 500);

document.addEventListener('keydown', (ev) => {
    if (ev.key === "ArrowLeft") {
        if (game.paddle.x > 0) {
            game.paddle.x = game.paddle.x - game.paddle.speed
        }
    }
    if (ev.key === "ArrowRight") {
        if (game.paddle.x < canvas.width - game.paddle.width) {
            game.paddle.x = game.paddle.x + game.paddle.speed
        }
    }
})

setInterval(update, 16);

function update() {
    for (const ball of game.balls) {
        if (ball.x >= 0) {
            ball.x = ball.x - ball.speedX * ball.directionX
        } else if (ball.x < canvas.width - ball.width) {
            ball.x = ball.x + ball.speedX * ball.directionX
        }

        if (ball.x < 0) {
            ball.x = 0;
            ball.directionX = -1
        }
        if (ball.x > canvas.width - ball.width) {
            ball.x = canvas.width - ball.width
            ball.directionX = 1
        }

        if (ball.y >= 0) {
            ball.y = ball.y - ball.speedY * ball.directionY
        } else if (ball.y <= canvas.height - ball.height) {
            ball.y = ball.y + ball.speedY * ball.directionY
        }

        if (ball.y < 0) {
            ball.y = 0;
            ball.directionY = -1
        }
        if (ball.y > canvas.height - ball.height) {
            ball.y = canvas.height - ball.height
            ball.directionY = 1
        }
    }

    for (const ball of game.balls) {
        for (const brick of game.bricks) {
            bounce(ball, collisionSide(brick, ball));
        }
        bounce(ball, collisionSide(game.paddle, ball));
    }

    game.draw()
}