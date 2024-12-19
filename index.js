import {keyHistory} from './utils.js'
import {App} from "./App.js";
import {Game} from "./Game.js";
import {Button} from "./Button.js";

//powerup
//combo powerup
//rocket a travers bricks
//mode infini brick respawn
//ultra instant
//visée
//toucher des cibles

const canvas = document.querySelector('canvas');

//let game = new Game(canvas, 1000, 500);
let app = new App(canvas, window.innerWidth, window.innerHeight);

document.addEventListener('keypress', ev => keyHistory.push(ev.key));

const btStart = document.querySelector("#btStart")
const btGamePause = document.querySelector("#btGamePause");
const btGameAuto = document.querySelector("#btGameAuto");
const btGameRainbow = document.querySelector("#btGameRainbow");
const btGameAddBall = document.querySelector("#btGameAddBall");
const btGameAddbrick = document.querySelector("#btGameAddbrick");
const btGameKeyboard = document.querySelector("#btGameKeyboard");
const btGameMouse = document.querySelector("#btGameMouse");
const btGameBedrock = document.querySelector("#btGameBedrock");
const btRestart = document.querySelector("#btRestart");
let pauseCanvas = false;

btStart.addEventListener('click', ev => {
    app.switchScene("game")
})
btGamePause.addEventListener('click', ev => {
    pauseCanvas = !pauseCanvas
})
btGameAuto.addEventListener('click', ev => {
    app.scene.botEnabled = !app.scene.botEnabled
})
btGameRainbow.addEventListener('click', ev => {
    app.scene.raimbowMode = !app.scene.raimbowMode
})
btGameAddBall.addEventListener('click', ev => {
    app.scene.spawnballs += 1
})
btGameAddbrick.addEventListener('click', ev => {
    app.scene.spawnbricks += 1
})
btGameKeyboard.addEventListener('click', ev => {
    app.scene.followMouse = false
})
btGameMouse.addEventListener('click', ev => {
    app.scene.followMouse = true
})
btGameBedrock.addEventListener('click', ev => {
    app.scene.bedrockstate = !app.scene.bedrockstate
})
btRestart.addEventListener('click', ev => {
    app.switchScene("game")
})



function update() {
    if (pauseCanvas) {
        let btStart = new Button(
            app,
            app.width/2-300/2,
            app.height/2-100/2,
            300,
            100,
            "Resume",
            "#edff00",
            "#000",
            () => pauseCanvas = false
        )
        btStart.draw()
        btStart.update()
        return requestAnimationFrame(update);
    }
    app.update()

    app.draw()

    requestAnimationFrame(update);
}

update()