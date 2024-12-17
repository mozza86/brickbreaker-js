const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


canvas.width = 1000;
canvas.height = 500;

let SCREEN = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
}

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

document.addEventListener('keydown', (ev) => {
    NEXT_KEY = ev.key;
})

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function collision(rect1, rect2) {
    // rect1 et rect2 sont des objets avec x, y, width, height
    return rect1.x + rect1.width > rect2.x &&  // Rectangle 1 est à droite de Rectangle 2
        rect2.x + rect2.width > rect1.x &&  // Rectangle 2 est à droite de Rectangle 1
        rect1.y + rect1.height > rect2.y && // Rectangle 1 est en bas de Rectangle 2
        rect2.y + rect2.height > rect1.y;   // Rectangle 2 est en bas de Rectangle 1
}

function collisionSide(rect1, rect2) {
    if (!collision(rect1, rect2)) {
        return null; // Pas de collision
    }

    // Calcul des distances entre les bords
    const collisionSides = {
        left: rect2.x + rect2.width - rect1.x,       // Distance du bord gauche de rect1 au bord droit de rect2
        right: rect1.x + rect1.width - rect2.x,     // Distance du bord droit de rect1 au bord gauche de rect2
        top: rect2.y + rect2.height - rect1.y,      // Distance du bord haut de rect1 au bord bas de rect2
        bottom: rect1.y + rect1.height - rect2.y    // Distance du bord bas de rect1 au bord haut de rect2
    };

    // Trouver le côté où l'intersection est minimale
    const minSide = Object.entries(collisionSides).reduce((min, current) => {
        return current[1] < min[1] ? current : min;
    });

    return minSide[0]; // Retourne la clé : "left", "right", "top", "bottom"
}

function rebondir(ball, direction) {
    if (direction == null) return;
    console.log(direction)
    if (direction === "bottom") ball.directionY = -1
    if (direction === "top") ball.directionY = 1
    if (direction === "right") ball.directionX = -1
    if (direction === "left") ball.directionX = 1

}

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

    // clear screen
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


    //display paddle
    ctx.fillStyle = "#000"
    ctx.fillRect(PADDLE.x, PADDLE.y, PADDLE.width, PADDLE.height);

    NEXT_KEY = "";
}

setInterval(update, 1);