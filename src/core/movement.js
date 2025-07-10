import { Y_MAX, X_MAX, SPRITE_WIDTH, SPRITE_HEIGHT } from "../global.js";

const yMax = Y_MAX;
const xMax = X_MAX - window.outerWidth;

let dx = 1; // Walk speed

let x = 50;
let y = yMax;


export default function move() {
  x += dx;

  // Bounce off screen edges
  if (x < 0 || x > xMax) {
    dx *= -1;
  }

  window.moveTo(x, y);
}

export function getCharacterDirection() {
  return dx > 1 ? 1 : -1;
}