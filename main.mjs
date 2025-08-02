import Box from "./Box.mjs";
import Circle from "./Circle.mjs";
import SoundManager from "./SoundManager.mjs";
import Stick from "./Stick.mjs";
import World from "./World.mjs";
import Vector2 from "./Vector2.mjs";
import TextureLoader from "./TextureLoader.mjs";
import startGame from "./startGame.mjs";
import menuScreen from "./menuScreen.mjs";
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const soundManager = new SoundManager();
await soundManager.addSounds({
    "shatter0": "shatter0.mov",
    "shatter1": "shatter1.mov",
    "throw": "shoot2.mov",
    "enemy-explosion": "underwater_explosion.mov",
    "gameOver": "gameOver.mp3",
    "gameWin": "gameWin.mov"
})

const textureLoader = new TextureLoader();
await textureLoader.addImages({
    "floor": "floor.png",
    "bg1": "backgroundnight2.png",
    "bgday": "backgroundDay.png",
    "stone": "stone.png",
})


let upgrades = {
    shieldBallCount: 100,
    throwCount: 1,
    regenerateCount: 1,
    shieldDamage: 1
}

let game = {
    money: 22000000,
    upgrades: upgrades,
    textureLoader: textureLoader,
    soundManager: soundManager,
    canvas: canvas,
    ctx: ctx,
    score: 0,
    wave: 20
}




document.getElementById("loading").style.display = "none";

while (true) {
    await menuScreen(game);
    await startGame(game);
}









