export const Direction = Object.freeze({
    LEFT: -1,
    RIGHT: 1,
});

export const direction = {
    val: Direction.RIGHT,
    get value() {
        return this.val;
    },
    set value(newVal) {
        this.val = newVal;
        
        const event = new CustomEvent('direction-change', {
            detail: { direction: newVal},
        })
        window.dispatchEvent(event);
    },
};

export function onDirectionChanged(callback) {
    window.addEventListener('direction-change', callback);
}