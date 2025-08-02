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
    "gameWin": "gameWin.mov",
    "background": "bgmusic.mp3"
})

const textureLoader = new TextureLoader();
await textureLoader.addImages({
    "background": "background.png",
})


let upgrades = {
    shieldBallCount: 100,
    throwCount: 1,
    regenerateCount: 1,
    shieldDamage: 1
}

let game = {
    money: 0,
    upgrades: upgrades,
    textureLoader: textureLoader,
    soundManager: soundManager,
    canvas: canvas,
    ctx: ctx,
    score: 0,
    wave: 1
}



document.getElementById("loading").style.display = "none";

window.isPlayingBG = false;

while (true) {
    if (game.wave > 20) {
        break;
    }
    await menuScreen(game);
    if (!window.isPlayingBG) {
        soundManager.play("background", 0.2, true);
        window.isPlayingBG = true;
    }
    await startGame(game);
}


document.getElementById("win-screen").classList.remove("hidden");








