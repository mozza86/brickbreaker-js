import {hslToHex} from "./utils.js";
import {MainMenu} from "./MainMenu.js";
import {Game} from "./Game.js";

export class App {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;

        this.ctx = canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;

        this.init()

        document.addEventListener('keydown', (ev) => this.keys[ev.key] = true );
        document.addEventListener('keyup', (ev) => this.keys[ev.key] = false);
        addEventListener("resize", (ev) => {
            this.canvas.width = ev.target.innerWidth;
            this.canvas.height = ev.target.innerHeight;
        });

        document.addEventListener("mousemove", ev => {
            let rect = ev.target.getBoundingClientRect();
            let x = ev.clientX - rect.left; //x position within the element.
            let y = ev.clientY - rect.top;  //y position within the element.
            this.mousePosition = {x: x, y: y};
        }, false);

        canvas.addEventListener("mousedown", ev => {
            this.mouseClick = ev
        })

        canvas.addEventListener("mouseup", ev => {
            this.mouseClick = null;
        })
    }

    init() {
        this.raimbowMode = false;
        this.keys = {}
        this.mousePosition = {x: this.width/2, y: 0}
        this.mouseClick = null
        this.switchScene("mainmenu")
    }

    switchScene(sceneId) {
        document.querySelectorAll('.scene').forEach(scene => {
            scene.classList.add('hidden');
        })
        document.querySelector(`.${sceneId}`).classList.remove('hidden');
        switch (sceneId) {
            case "game":
                this.scene = new Game(this);
                break;
            case "mainmenu":
                this.scene = new MainMenu(this);
                break;
            default:
                this.scene = new MainMenu(this);
                break;
        }
    }

    clear_screen() {
        this.ctx.fillStyle = "#FFF"
        if (this.raimbowMode) {
            this.currentHslColor++;
            if (this.currentHslColor >= 360) this.currentHslColor = 0;
            this.ctx.fillStyle = hslToHex(this.currentHslColor + 150, 100, 50)
        }
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clear_screen()

        this.scene.draw()
    }

    update() {
        this.scene.update()
    }
}