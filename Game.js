import {Paddle} from "./Paddle.js";
import {Brick} from "./Brick.js";
import {Ball} from "./Ball.js";

export class Game {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;

        this.ctx = canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;

        this.init()
    }

    init() {
        this.paddle = Paddle.createPaddle(this)

        this.bricks = []
        this.balls = []

        for (let i = 0; i < 10; i++)
            this.bricks.push(Brick.createRandomBrick(this))

        this.balls.push(Ball.createBall(this))
    }

    clear_screen() {
        this.ctx.fillStyle = "#FFF"
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    draw() {
        this.clear_screen()

        for (const brick of this.bricks) brick.draw();
        for (const ball of this.balls) ball.draw();
        this.paddle.draw()
    }
}