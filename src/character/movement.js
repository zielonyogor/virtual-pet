import { Y_MAX, X_MAX, SPRITE_WIDTH, SPRITE_HEIGHT } from "../global.js";
import { Character } from "./characterManager.js";
import { direction } from "./direction.js";

const yMax = Y_MAX;
const xMax = X_MAX - window.outerWidth;

export class MovementManager {
  #characterManager;

  moveSpeed = 2; // Walk speed

  x = 50;
  y = yMax;

  constructor(characterManager) {
    this.#characterManager = characterManager
  }

  move() {
    this.x += this.moveSpeed * direction.value;

    // Bounce off screen edges
    if (this.isOnEgde()) {
      this.#characterManager.changeState(Character.IDLE);
      return;
    }
    window.moveTo(this.x, this.y);
  }

  isOnEgde() {
    return this.x < 0 || this.x > xMax;
  }
}