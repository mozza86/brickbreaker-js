import {collision, get_random_element} from "./utils.js";

export class PowerUp {
    constructor(game, x, y, width, height, speed, type) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
    }

    draw() {
        let ctx = this.game.app.ctx;
        switch(this.type) {
            case 'enlarge':
                ctx.fillStyle = "#dc3cdc";
                break;
            case 'instakill':
                ctx.fillStyle = "#37f61a";
                break;
            case 'rocket':
                ctx.fillStyle = "#1aeaea";
                break;
            case 'addballs':
                ctx.fillStyle = "#ff480f";
                break;
            default:
                ctx.fillStyle = "#fff";
                break;
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "#000"
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y = this.y + this.speed
        if (collision(this, this.game.paddle)) {
            this.on_picking_up()
            this.game.removePowerup(this)
        }
        if (this.y > this.game.app.height) {
            this.game.removePowerup(this)
        }
    }

    on_picking_up() {
        console.log("power up time "+this.type)
        if (this.type === 'enlarge') this.game.paddle.enlarge()
        if (this.type === 'addballs') this.game.spawnballs++;
        if (this.type === 'addbricks') this.game.spawnbricks++;
        if (this.type === 'addlayer') this.game.spawnlayers++;
        if (this.type === 'rocket') this.game.spawnrockets += 10;
        if (this.type === 'instakill') this.game.instakill = 3;
    }

    static createPowerUp(brick) {
        let x = brick.x
        let y = brick.y
        let width = 20
        let height = 20
        let speed = brick.game.app.height / 100

        let powerups_list = ['enlarge', 'instakill', 'rocket', 'addballs', 'addbricks', 'addlayer']

        return new PowerUp(brick.game, x, y, width, height, speed, get_random_element(powerups_list));
    }
}