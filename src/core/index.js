import CharacterManager from "../character/characterManager.js";

const characterManager = new CharacterManager();

document.addEventListener('DOMContentLoaded', setup);

let taskWindowOpen = false;

function setup()
{
    const taskBtn = document.getElementById('task-btn');
    taskBtn.addEventListener('click', toggleTaskBtn);
}

function toggleTaskBtn() {
    taskWindowOpen = !taskWindowOpen;

    window.api.toggleTaskWindow(window.api.getWindowBounds());

    const event = new CustomEvent('taskbar-toggle', {
        detail: { locked: taskWindowOpen }
    });
    document.dispatchEvent(event);
}
