import { SPRITE_WIDTH } from "../global.js";

export default class AnimationManager {
    #currentFrame;
    #characterElement;
    #currentDirection;

    #animationInterval = null;

    /**
     * 
     * @param {HTMLDivElement} characterElement 
     */
    constructor(characterElement) {
        this.#characterElement = characterElement;
        this.#currentDirection = 1;

        this.#currentFrame = 0;
    }

    animateWalk() {
        clearInterval(this.#animationInterval);

        // this.#animationInterval = setInterval(() => {
        //     const xOffset = -this.#currentFrame * SPRITE_WIDTH;
        //     this.#characterElement.style.backgroundPosition = `${xOffset}px 0`;

        //     this.#currentFrame = (this.#currentFrame + 1) % 12;
        // }, 50);
    }
}