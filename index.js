import {collisionSide, randomInteger, rebondir} from './utils.js'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;


let PADDLE = {
    x: canvas.width / 2,
    y: canvas.height - 25,
    width: 200,
    height: 20,
    speed: 50
}

let BRICKS = []

let BALLS = []

let NEXT_KEY = ""

for (let i = 0; i < 10; i++) {
    BRICKS.push({
        x: randomInteger(0, canvas.width),
        y: randomInteger(0, canvas.height/3),
        width: randomInteger(50, 200),
        height: randomInteger(50, 200),
    })
}

BALLS.push({
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speedX: 5,
    speedY: 5,
    directionX: 1,
    directionY: 1,
})

document.addEventListener('keydown', (ev) => {
    NEXT_KEY = ev.key;
})


function update() {
    if (NEXT_KEY === "ArrowLeft") {
        if (PADDLE.x > 0) {
            PADDLE.x = PADDLE.x - PADDLE.speed
        }
    }
    if (NEXT_KEY === "ArrowRight") {
        if (PADDLE.x < canvas.width - PADDLE.width) {
            PADDLE.x = PADDLE.x + PADDLE.speed
        }
    }

    for (const ball of BALLS) {
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

    for (const ball of BALLS) {
        for (const brick of BRICKS) {
            rebondir(ball, collisionSide(brick, ball));
        }
        rebondir(ball, collisionSide(PADDLE, ball));
    }


    NEXT_KEY = "";


    // draw objects

    ctx.fillStyle = "#FFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const brick of BRICKS) {
        ctx.fillStyle = "#A52"
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeStyle = "#000"
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
    }

    for (const ball of BALLS) {
        ctx.fillStyle = "#58B"
        ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
        ctx.strokeStyle = "#000"
        ctx.strokeRect(ball.x, ball.y, ball.width, ball.height);
    }

    ctx.fillStyle = "#000"
    ctx.fillRect(PADDLE.x, PADDLE.y, PADDLE.width, PADDLE.height);
}

setInterval(update, 1);