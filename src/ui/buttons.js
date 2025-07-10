document.addEventListener('DOMContentLoaded', setup);

let btnDiv = null;

function setup()
{
    btnDiv = document.getElementById('task-div');

    const taskBtn = document.getElementById('task-btn');
    taskBtn.addEventListener('click', toggleTaskBtn);

    const quitBtn = document.getElementById('quit-btn');
    quitBtn.addEventListener('click', window.api.quitApp);
    
    const gitBtn = document.getElementById('git-btn');
    gitBtn.addEventListener('click', window.api.executeGitPull);
}

function toggleTaskBtn() {
    const isVisible = btnDiv.classList.toggle('hidden');

    const event = new CustomEvent('taskbar-toggle', {
        detail: { locked: !isVisible } // send lock if visible
    });

    document.dispatchEvent(event);
}