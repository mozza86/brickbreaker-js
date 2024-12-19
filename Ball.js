export class Ball {
    constructor(game, x, y, width, height, speedX, speedY, directionX, directionY) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.directionX = directionX;
        this.directionY = directionY;
        this.color = "#58B"
    }

    draw() {
        let ctx = this.game.app.ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "#000"
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    draw3d() {
        let ctx = this.ctx;

        let size = 5

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+size, this.y-size);
        ctx.lineTo(this.x+this.width+size, this.y-size);
        ctx.lineTo(this.x+this.width, this.y);
        ctx.stroke();
        ctx.fillStyle = this.color
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(this.x+this.width+size, this.y-size);
        ctx.lineTo(this.x+this.width+size, this.y+this.height-size);
        ctx.lineTo(this.x+this.width, this.y+this.height);
        ctx.stroke();
        ctx.fillStyle = this.color
        ctx.fill();
        ctx.closePath();
    }

    static createBall(game) {
        let x = game.app.width / 2
        let y = game.app.height / 2
        let width = 20
        let height = 20
        let speedX = game.app.width / 100
        let speedY = game.app.height / 100
        let directionX = 1
        let directionY = 1

        return new Ball(game, x, y, width, height, speedX, speedY, directionX, directionY);
    }
}