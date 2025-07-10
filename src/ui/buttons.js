document.addEventListener('DOMContentLoaded', setup);

let btnDiv = null;
let configDiv = null;

function setup()
{
    btnDiv = document.getElementById('task-div');
    configDiv = document.getElementById('config-div');

    const taskBtn = document.getElementById('task-btn');
    taskBtn.addEventListener('click', toggleTaskBtn);
    
    const gitBtn = document.getElementById('git-btn');
    gitBtn.addEventListener('click', window.api.executeGitPull);
    
    const configBtn = document.getElementById('config-btn');
    configBtn.addEventListener('click', showConfigWindow);
    
    const quitBtn = document.getElementById('quit-btn');
    quitBtn.addEventListener('click', window.api.quitApp);
}

function toggleTaskBtn() {
    const isVisible = btnDiv.classList.toggle('hidden');

    const event = new CustomEvent('taskbar-toggle', {
        detail: { locked: !isVisible } // send lock if visible
    });

    document.dispatchEvent(event);
}

function showConfigWindow() {

}