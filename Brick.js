import {randomInteger} from "./utils.js";

export class Brick {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        this.ctx.fillStyle = "#A52"
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeStyle = "#000"
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    static createRandomBrick(game) {
        let x = randomInteger(0, game.width)
        let y = randomInteger(0, game.height/3)
        let width = randomInteger(50, 200)
        let height = randomInteger(50, 200)

        return new Brick(game.ctx, x, y, width, height);
    }
}