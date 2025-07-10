    import move from "./movement.js";
    import AnimationManager from "./animationManager.js";
    import { FRAMES_PER_SECOND } from "../global.js";

    const Character = Object.freeze({
        IDLE: Symbol("idle"),
        WALK: Symbol("walk"),
        LOCKED: Symbol("locked")
    });

    export default class CharacterManager {
        #currentState;
        #characterElement;
        #animationManager;

        #framesSinceStateChange = 0;
        
        constructor() {
            this.#characterElement = document.getElementById('character');
            this.#characterElement.addEventListener('click', (event) => this.#handleClick(event));
            
            this.#animationManager = new AnimationManager(this.#characterElement);
            
            this.#framesSinceStateChange = 0;
            
            document.addEventListener('taskbar-toggle', (e) => this.#handleClick(e.detail.locked));

            this.handleIdle  = this.handleIdle.bind(this);
            this.handleWalk  = this.handleWalk.bind(this);
            this.handleLock  = this.handleLock.bind(this);
            
            this.#currentState = setInterval(this.handleIdle, FRAMES_PER_SECOND);
        }
        
        #handleClick(isLocked) {
            console.log("got: " + isLocked);
            if(isLocked) {
                    this.changeState(Character.LOCKED);
            }
            else {
                this.changeState(Character.IDLE);
            }
        }
        
        changeState(newState) {
            clearInterval(this.#currentState);
            this.#framesSinceStateChange = 0;
            switch (newState) {
                case Character.IDLE:
                    this.#currentState = setInterval(this.handleIdle, FRAMES_PER_SECOND);
                    break;
                    
                case Character.WALK:
                    this.#animationManager.animateWalk();
                    this.#currentState = setInterval(this.handleWalk, FRAMES_PER_SECOND);
                    break;
                    
                case Character.LOCKED:
                    this.#currentState = setInterval(this.handleLock, FRAMES_PER_SECOND);
                
                default:
                    break;
            }
        }
        
        handleIdle() {
            this.#framesSinceStateChange++;
            if(this.#framesSinceStateChange > 100 && Math.random() < 0.3) {
                this.changeState(Character.WALK);
            }
            
        }
        
        handleWalk() {
            this.#framesSinceStateChange++;
            move();

            if(this.#framesSinceStateChange > 100 && Math.random() < 0.3) {
                this.changeState(Character.IDLE);
            }
        }

        handleLock() {

        }
    }