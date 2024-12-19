import {Paddle} from "./Paddle.js";
import {Brick} from "./Brick.js";
import {Ball} from "./Ball.js";
import {bounce, collision, collisionSide, hidden, hslToHex, randomInteger} from "./utils.js";

export class Game {
    constructor(app) {
        this.app = app;

        this.init()
    }

    init() {
        this.paddle = Paddle.createPaddle(this)

        this.bricks = []
        this.balls = []

        for (let i = 0; i < 10; i++)
            this.bricks.push(Brick.createRandomBrick(this))

        this.balls.push(Ball.createBall(this))

        this.currentHslColor = 10;

        this.has_won = false;
        this.botEnabled = false;
        this.spawnballs = 0;
        this.spawnbricks = 0;
        this.bedrockstate = false;
        this.followMouse = true;
    }

    draw() {
        this.currentHslColor++;
        if (this.currentHslColor >= 360) this.currentHslColor = 0;

        if (this.app.raimbowMode) {
            for (const sprite of this.bricks) sprite.color = hslToHex(this.currentHslColor+randomInteger(0, 100), 100, 50)
            for (const sprite of this.balls)  sprite.color = hslToHex(this.currentHslColor+randomInteger(0, 100), 100, 50)
            this.paddle.color = hslToHex(this.currentHslColor+randomInteger(0, 100), 100, 50)
        }

        for (const sprite of this.bricks) sprite.draw();
        for (const sprite of this.balls)  sprite.draw();
        this.paddle.draw()
    }

    update() {
        if (this.bricks.length <= 0) {
            this.has_won = true;
        }

        if (this.has_won) {
            this.app.switchScene("win")
        }


        if (hidden("auto")) this.botEnabled = !this.botEnabled;

        if (hidden("rainbow")) this.app.raimbowMode = !this.app.raimbowMode;

        if (hidden("jeveuxwin")) this.has_won = true;

        if (hidden("ball")) this.balls.unshift(Ball.createBall(this))
        if (hidden("maxb")) this.spawnballs += 100
        if (hidden("maxc")) this.spawnballs += 1000000000000
        if (hidden("brick")) this.spawnbricks += 10
        if (hidden("bedrock")) this.bedrockstate = !this.bedrockstate;


        if (this.app.keys["ArrowLeft"]) {
            if (this.paddle.x > 0) {
                this.paddle.x = this.paddle.x - this.paddle.speed
            }
        }
        if (this.app.keys["ArrowRight"]) {
            if (this.paddle.x < this.app.canvas.width - this.paddle.width) {
                this.paddle.x = this.paddle.x + this.paddle.speed
            }
        }
        if (this.spawnballs > 0) {
            this.balls.unshift(Ball.createBall(this))
            this.spawnballs--;
        }
        if (this.spawnbricks > 0) {
            this.bricks.unshift(Brick.createRandomBrick(this))
            this.spawnbricks--;
        }

        if (this.followMouse) {
            this.paddle.x = this.app.mousePosition.x - this.paddle.width / 2;
        }

        if (this.botEnabled) {
            if (this.balls.length > 0) {
                let lowestBall = this.balls[0]
                for (const ball of this.balls) {
                    if (ball.y > lowestBall.y) lowestBall = ball // bigger number = lower
                }
                if (this.app.canvas.height - lowestBall.y <= this.paddle.x*2.5) {
                    this.paddle.x = lowestBall.x+lowestBall.width / 2 - this.paddle.width / 2;
                }
            }
        }
        if (this.paddle.x < 0) {
            this.paddle.x = 0
        }
        if (this.paddle.x + this.paddle.width > this.app.width) {
            this.paddle.x = this.app.width - this.paddle.width
        }

        for (const ball of this.balls) {
            if (ball.x >= 0) {
                ball.x = ball.x - ball.speedX * ball.directionX
            } else if (ball.x < this.app.width - ball.width) {
                ball.x = ball.x + ball.speedX * ball.directionX
            }

            if (ball.x < 0) {
                ball.x = 0;
                ball.directionX = -1
            }
            if (ball.x > this.app.width - ball.width) {
                ball.x = this.app.width - ball.width
                ball.directionX = 1
            }

            if (ball.y >= 0) {
                ball.y = ball.y - ball.speedY * ball.directionY
            } else if (ball.y <= this.app.height - ball.height) {
                ball.y = ball.y + ball.speedY * ball.directionY
            }

            if (ball.y < 0) {
                ball.y = 0;
                ball.directionY = -1
            }
            if (ball.y > this.app.height - ball.height) {
                ball.y = this.app.height - ball.height
                //death
                ball.directionY = 0 //1
                ball.directionX = 0
                this.balls = this.balls.filter(item => item !== ball)
            }
        }

        for (const ball of this.balls) {
            for (const brick of this.bricks) {
                bounce(ball, collisionSide(brick, ball));
                if (collision(brick, ball)) {
                    if (brick.hardness === 99 || this.bedrockstate) {}
                    else if (brick.hardness === 0) this.bricks = this.bricks.filter(item => item !== brick)
                    else brick.hardness -= 1;
                }
            }
            bounce(ball, collisionSide(this.paddle, ball));
        }
    }
}