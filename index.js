import {keyHistory} from './utils.js'
import {App} from "./App.js";
import {Button} from "./Button.js";

//powerup
//combo powerup
//rocket a travers bricks
//mode infini brick respawn
//ultra instinct
//visée
//toucher des cibles

const canvas = document.querySelector('canvas');

//let game = new Game(canvas, 1000, 500);
let app = new App(canvas, window.innerWidth, window.innerHeight);

document.addEventListener('keypress', ev => keyHistory.push(ev.key));

let pauseCanvas = false;

document.querySelectorAll(".btStart").forEach((el) => { el.addEventListener("click", ev => {
        app.switchScene("game")
})})
document.querySelectorAll(".btGamePause").forEach((el) => { el.addEventListener("click", ev => {
    pauseCanvas = !pauseCanvas
})})
document.querySelectorAll(".btGameAuto").forEach((el) => { el.addEventListener("click", ev => {
    app.scene.botEnabled = !app.scene.botEnabled
})})
document.querySelectorAll(".btGameRainbow").forEach((el) => { el.addEventListener("click", ev => {
    app.raimbowMode = !app.raimbowMode
})})
document.querySelectorAll(".btGameAddBall").forEach((el) => { el.addEventListener("click", ev => {
    app.scene.spawnballs += 1
})})
document.querySelectorAll(".btGameAddbrick").forEach((el) => { el.addEventListener("click", ev => {
    app.scene.spawnbricks += 1
})})
document.querySelectorAll(".btGameAddPowerUp").forEach((el) => { el.addEventListener("click", ev => {
    app.scene.spawnpowerups += 1
})})
document.querySelectorAll(".btGameKeyboard").forEach((el) => { el.addEventListener("click", ev => {
    app.scene.followMouse = false
})})
document.querySelectorAll(".btGameMouse").forEach((el) => { el.addEventListener("click", ev => {
    app.scene.followMouse = true
})})
document.querySelectorAll(".btGameBedrock").forEach((el) => { el.addEventListener("click", ev => {
    app.scene.bedrockstate = !app.scene.bedrockstate
})})
document.querySelectorAll(".btGameEnlarge").forEach((el) => { el.addEventListener("click", ev => {
    app.scene.paddle.enlarge()
})})
document.querySelectorAll(".btGameFullWidth").forEach((el) => { el.addEventListener("click", ev => {
    app.scene.paddle.width = app.width
})})



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