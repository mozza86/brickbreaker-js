import {randomFloat, randomInteger} from "./utils.js";

export class Brick {
    constructor(game, x, y, width, height, hardness) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hardness = hardness;
        this.color = "#A52"
    }

    draw() {
        let ctx = this.game.app.ctx
        switch (this.hardness) {
            case 0:
                this.color = "#A52"
                break;
            case 1:
                this.color = "#aa2d22"
                break;
            case 2:
                this.color = "#811a1a"
                break;
            default:
                this.color = "#edff00"
        }
        if (this.game.bedrockstate) {
            this.color = "#606060";
        }
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "#000"
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    draw3d() {
        let ctx = this.game.app.ctx;

        let size = 10
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + size, this.y - size);
        ctx.lineTo(this.x + this.width + size, this.y - size);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(this.x + this.width + size, this.y - size);
        ctx.lineTo(this.x + this.width + size, this.y + this.height - size);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width + size, this.y - size)
        ctx.stroke()
        ctx.closePath();
    }

    static createRandomBrick(game) {
        let width = randomFloat(50, 100)
        let height = randomFloat(50, 100)
        let x = randomFloat(0, game.app.width - width)
        let y = randomFloat(50, game.app.height / 3 - height)
        let hardness = randomInteger(0, 2)

        return new Brick(game, x, y, width, height, hardness);
    }
}