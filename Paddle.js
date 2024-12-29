export class Paddle {
    constructor(game, x, y, width, height, speed) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = "#000"
    }

    update() {

    }

    draw() {
        let ctx = this.game.app.ctx;
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    draw3d() {
        let ctx = this.ctx;

        let size = 10
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "#353535"

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+size, this.y-size);
        ctx.lineTo(this.x+this.width+size, this.y-size);
        ctx.lineTo(this.x+this.width, this.y);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(this.x+this.width+size, this.y-size);
        ctx.lineTo(this.x+this.width+size, this.y+this.height-size);
        ctx.lineTo(this.x+this.width, this.y+this.height);
        ctx.lineTo(this.x, this.y+this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y+this.height);
        ctx.lineTo(this.x+this.width+size, this.y-size)
        ctx.stroke()
        ctx.closePath();
    }


    enlarge() {
        this.width += this.game.app.width*0.1
    }

    static createPaddle(game) {
        let width = game.app.width / 5
        let height = game.app.height / 40
        let x = game.app.width / 2
        let y = game.app.height - height*5
        let speed = 10

        return new Paddle(game, x, y, width, height, speed);
    }
}