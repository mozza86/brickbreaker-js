import {Paddle} from "./Paddle.js";
import {Brick} from "./Brick.js";
import {Ball} from "./Ball.js";
import {hslToHex, randomInteger} from "./utils.js";
import {PowerUp} from "./PowerUp.js";
import {Rocket} from "./Rocket.js";

export class Game {
    constructor(app) {
        this.app = app;
        this.init()
    }

    init() {
        this.paddle = Paddle.createPaddle(this)

        this.bricks = []
        this.balls = []
        this.powerups = []
        this.rockets = []

        for (let i = 0; i < 10; i++)
            this.bricks.push(Brick.createRandomBrick(this))

        this.balls.push(Ball.createBall(this))

        this.currentHslColor = 10;

        this.has_won = false;
        this.has_death = false;
        this.botEnabled = false;
        this.spawnballs = 0;
        this.spawnbricks = 0;
        this.spawnpowerups = 0;
        this.spawnrockets = 0;
        this.instakill = 0;
        this.spawnlayers = 0
        this.bedrockstate = false;
        this.followMouse = true;
    }

    draw() {
        this.currentHslColor++;
        if (this.currentHslColor >= 360) this.currentHslColor = 0;

        if (this.app.raimbowMode) {
            for (const sprite of this.bricks) sprite.color = hslToHex(this.currentHslColor + randomInteger(0, 100), 100, 50)
            for (const sprite of this.balls) sprite.color = hslToHex(this.currentHslColor + randomInteger(0, 100), 100, 50)
            this.paddle.color = hslToHex(this.currentHslColor + randomInteger(0, 100), 100, 50)
        }

        this.batchDraw(this.bricks)
        this.batchDraw(this.balls)
        this.batchDraw(this.powerups)
        this.batchDraw(this.rockets)
        this.paddle.draw()
    }

    update() {
        this.checkWin()
        this.checkDeath()

        this.doTheWin()
        //this.doTheDeath()

        this.movePaddleWithKeyboard()
        this.movePaddleWithMouse()
        this.movePaddleWithAI()

        this.doSpawnBalls()
        this.doSpawnBricks()
        this.doSpawnPowerups()
        this.doSpawnRockets()
        this.doSpawnLayers()

        this.limitPaddleToTheFrame()

        this.batchUpdate(this.balls)
        this.batchUpdate(this.rockets)
        this.batchUpdate(this.bricks)
        this.batchUpdate(this.powerups)
        this.paddle.update()
    }

    checkWin() {
        if (this.bricks.length <= 0) {
            this.has_won = true;
        }
    }
    checkDeath() {
        if (this.balls.length <= 0) {
            this.has_death = true;
        }
    }

    doTheWin() {
        if (this.has_won) {
            this.app.switchScene("win");
        }
    }
    doTheDeath() {
        if (this.has_death) {
            this.app.switchScene("death");
        }
    }

    removeBrick(brick) {
        this.bricks = this.bricks.filter(item => item !== brick)
    }
    removeBall(ball) {
        this.balls = this.balls.filter(item => item !== ball)
    }
    removePowerup(powerup) {
        this.powerups = this.powerups.filter(item => item !== powerup)
    }
    removeRocket(rocket) {
        this.rockets = this.rockets.filter(item => item !== rocket)
    }

    doSpawnBalls() {
        if (this.spawnballs > 0) {
            this.balls.unshift(Ball.createBall(this))
            this.spawnballs--;
        }
    }
    doSpawnBricks() {
        if (this.spawnbricks > 0) {
            this.bricks.unshift(Brick.createRandomBrick(this))
            this.spawnbricks--;
        }
    }
    doSpawnPowerups() {
        if (this.spawnpowerups > 0) {
            this.powerups.unshift(PowerUp.createPowerUp(Brick.createRandomBrick(this)))
            this.spawnpowerups--;
        }
    }
    doSpawnRockets() {
        if (this.spawnrockets > 0) {
            this.rockets.unshift(Rocket.createRocket(this.paddle))
            this.spawnrockets--;
        }
    }
    doSpawnLayers() {
        if (this.spawnlayers > 0) {
            for (const brick of this.bricks) {
                brick.hardness++;
            }
            this.spawnlayers--;
        }
    }

    movePaddleWithKeyboard() {
        if (this.app.keys["ArrowLeft"]) {
            if (this.paddle.x > 0) {
                this.paddle.x = this.paddle.x - this.paddle.speed;
            }
        }
        if (this.app.keys["ArrowRight"]) {
            if (this.paddle.x < this.app.canvas.width - this.paddle.width) {
                this.paddle.x = this.paddle.x + this.paddle.speed;
            }
        }
    }
    movePaddleWithMouse() {
        if (this.followMouse) {
            this.paddle.x = this.app.mousePosition.x - this.paddle.width / 2;
        }
    }
    movePaddleWithAI() {
        if (this.botEnabled) this.autoMovePaddle()
    }
    autoMovePaddle() {
        let lowestSprite;
        if (this.powerups.length > 0) {
            lowestSprite = this.powerups[0]
        } else if (this.balls.length > 0) {
            lowestSprite = this.balls[0]
        }

        if (lowestSprite) {
            for (const sprite of [...this.powerups, ...this.balls]) {
                if (sprite.y > lowestSprite.y) lowestSprite = sprite // bigger number = lower
            }

            if (this.app.canvas.height - lowestSprite.y <= this.paddle.x * 2.5) {
                this.paddle.x =  lowestSprite.x + lowestSprite.width / 2 - this.paddle.width / 2;
            }
        }
    }

    limitPaddleToTheFrame() {
        //limit paddle position
        if (this.paddle.x < 0) this.paddle.x = 0
        if (this.paddle.x + this.paddle.width > this.app.width) this.paddle.x = this.app.width - this.paddle.width
    }

    batchDraw(sprites) {
        for (const sprite of sprites) sprite.draw()
    }
    batchUpdate(sprites) {
        for (const sprite of sprites) sprite.update()
    }
}