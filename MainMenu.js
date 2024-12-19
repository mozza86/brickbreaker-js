import {Button} from "./Button.js";
import {Game} from "./Game.js";

export class MainMenu {
    constructor(app) {
        this.app = app;

        this.init()
    }

    init() {
        this.btStart = new Button(
            this.app,
            this.app.width/2-300/2,
            this.app.height/2-100/2,
            300,
            100,
            "Start",
            "#edff00",
            "#000",
            () => this.app.switchScene(new Game(this.app))
        )
    }

    draw() {
        this.btStart.draw()
    }

    update() {
        this.btStart.update()
    }
}