import {collision, get_random_element} from "./utils.js";

export class Rocket {
    constructor(game, x, y, width, height, speed) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    draw() {
        let ctx = this.game.app.ctx;
        ctx.fillStyle = "#f30f6e";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "#000"
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y = this.y - this.speed

        if (this.y <= 0) {
            this.game.removeRocket(this)
        }
    }

    static createRocket(paddle) {
        let x = paddle.x+paddle.width/2
        console.log(paddle.width)
        let y = paddle.y
        let width = 20
        let height = 20
        let speed = paddle.game.app.height / 100

        return new Rocket(paddle.game, x, y, width, height, speed);
    }
}