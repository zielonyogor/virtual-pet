import move from "./movement.js";
import AnimationManager from "./animationManager.js";

const Character = Object.freeze({
    IDLE: Symbol("idle"),
    WALK: Symbol("walk"),
    LOCKED: Symbol("locked")
});

export default class CharacterManager {
    #currentState;
    #characterElement;
    #animationManager;
    
    constructor() {
        this.#currentState = Character.IDLE;
        this.#characterElement = document.getElementById('character');
        this.#characterElement.addEventListener('click', (event) => this.#handleClick(event));
        this.#animationManager = new AnimationManager(this.#characterElement);
    }

    update() {
        switch (this.#currentState) {
            case Character.IDLE:
                this.handleIdle();
                break;

            case Character.WALK:
                this.handleWalk();
                break;
        
            default:
                break;
            }
    }

    #handleClick(event) {
        console.log('clicked on me!!');
        this.#currentState = Character.WALK;
        this.#animationManager.animateWalk();
    }

    handleIdle() {

    }

    handleWalk() {
        move();
    }
}