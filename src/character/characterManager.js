import { MovementManager } from "./movement.js";
import AnimationManager from "./animationManager.js";
import { FRAME_INTERVAL_MS } from "../global.js";
import { direction, Direction } from "./direction.js";

const STATE_DURATION_MIN = 2000;
const STATE_DURATION_MAX = 6000;

export const Character = Object.freeze({
    IDLE: Symbol("idle"),
    WALK: Symbol("walk"),
    LOCKED: Symbol("locked")
});

export default class CharacterManager {
    #currentState;
    #characterElement;
    
    #animationManager;
    #movementManager;
    
    #timeSinceStateChange = 0;
    #stateDuration = 100;
    
    constructor() {
        this.#characterElement = document.getElementById('character');
        
        this.#animationManager = new AnimationManager(this.#characterElement);
        this.#timeSinceStateChange = 0;

        this.#movementManager = new MovementManager(this);
        
        window.api.onTaskWindowLock((_, data) => {
            this.#handleTaskWindowLock(data.locked);
        });

        this.handleIdle  = this.handleIdle.bind(this);
        this.handleWalk  = this.handleWalk.bind(this);
        this.handleLock  = this.handleLock.bind(this);
        
        this.#currentState = setInterval(this.handleIdle, FRAME_INTERVAL_MS);
    }
    
    #handleTaskWindowLock(isLocked) {
        if(isLocked) {
                this.changeState(Character.LOCKED);
        }
        else {
            this.changeState(Character.IDLE);
        }
    }
    
    changeState(newState) {
        clearInterval(this.#currentState);
        this.#timeSinceStateChange = 0;
        this.#stateDuration = Math.floor(Math.random() * (STATE_DURATION_MAX - STATE_DURATION_MIN + 1) + STATE_DURATION_MIN); // random between min-max
        switch (newState) {
            case Character.IDLE:
                console.log("changing to idle");
                this.#currentState = setInterval(this.handleIdle, FRAME_INTERVAL_MS);
                break;
                
            case Character.WALK:
                if(this.#movementManager.isOnEgde())
                    direction.value = direction.value * -1;
                else
                    direction.value = Math.random() < 0.5 ? Direction.LEFT : Direction.RIGHT;
                this.#animationManager.animateWalk();
                this.#currentState = setInterval(this.handleWalk, FRAME_INTERVAL_MS);
                break;
                
            case Character.LOCKED:
                this.#currentState = setInterval(this.handleLock, FRAME_INTERVAL_MS);
            
            default:
                break;
        }
    }
    
    handleIdle() {
        this.#timeSinceStateChange += FRAME_INTERVAL_MS;
        if(this.#timeSinceStateChange > this.#stateDuration) {
            this.changeState(Character.WALK);
        }
    }
    
    handleWalk() {
        this.#timeSinceStateChange += FRAME_INTERVAL_MS;
        this.#movementManager.move();

        if(this.#timeSinceStateChange > this.#stateDuration) {
            this.changeState(Character.IDLE);
        }
    }

    handleLock() {
    }
}