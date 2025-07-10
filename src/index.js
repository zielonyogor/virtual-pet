import CharacterManager from "./core/characterManager.js";

const characterManager = new CharacterManager();

const appLoop = setInterval(update, 20);

function update() {
    characterManager.update();
}