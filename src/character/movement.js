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

  chooseDirection() {
    const distLeft = this.x;
    const distRight = xMax - this.x;

    const forwardDistance = direction.value === 1 ? distRight : distLeft;
    const normalizedForwardDistance = forwardDistance / (xMax / 2); // 0 = at edge, 1 = center

    const keepDirectionChance = 0.3 + 0.7 * normalizedForwardDistance; // [0.3 - 1.0]

    const shouldFlip = Math.random() > keepDirectionChance;
    return shouldFlip ? direction.value * -1 : direction.value;
  }
}