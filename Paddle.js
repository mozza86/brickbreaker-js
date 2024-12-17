export class Paddle {
    constructor(ctx, x, y, width, height, speed) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    draw() {
        this.ctx.fillStyle = "#000"
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    static createPaddle(game) {
        let x = game.width / 2
        let y = game.height - 25
        let width = 200
        let height = 20
        let speed = 50

        return new Paddle(game.ctx, x, y, width, height, speed);
    }
}