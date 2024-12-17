export class Ball {
    constructor(ctx, x, y, width, height, speedX, speedY, directionX, directionY) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.directionX = directionX;
        this.directionY = directionY;
    }

    draw() {
        this.ctx.fillStyle = "#58B"
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeStyle = "#000"
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    static createBall(game) {
        let x = game.width / 2
        let y = game.height / 2
        let width = 50
        let height = 50
        let speedX = 5
        let speedY = 5
        let directionX = 1
        let directionY = 1

        return new Ball(game.ctx, x, y, width, height, speedX, speedY, directionX, directionY);
    }
}