import { onDirectionChanged } from "./direction.js";

// animation to class maping
const Animation = Object.freeze({
    IDLE: 'anim-idle',
    WALK: 'anim-walk',
})

export default class AnimationManager {
    #currentAnimation;
    #characterElement;

    /**
     * 
     * @param {HTMLDivElement} characterElement 
     */
    constructor(characterElement) {
        this.#characterElement = characterElement;
        this.#currentAnimation = Animation.IDLE;

        onDirectionChanged(this.onDirectionChange.bind(this));
    }

    changeAnimation(newAnimation) {
        this.#characterElement.classList.remove(this.#currentAnimation);
        this.#currentAnimation = newAnimation;
        this.#characterElement.classList.add(this.#currentAnimation);
    }

    animateWalk() {
        console.log('started walking anim...');
        this.changeAnimation(Animation.WALK);
    }
    
    animateIdle() {
        this.changeAnimation(Animation.IDLE);
    }

    onDirectionChange(event) {
        const dir = event.detail.direction;
        console.log(`Animator got: ${dir}`);
        this.#characterElement.style.transform = `scaleX(${dir})`;
    }
}