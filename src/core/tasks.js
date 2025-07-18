document.addEventListener('DOMContentLoaded', setup);

let btnDiv = null;
let configDiv = null;

function setup()
{    
    const gitBtn = document.getElementById('git-btn');
    gitBtn.addEventListener('click', () => {
        window.api.executeGitPull();
        window.api.toggleTaskWindow();
    });
    
    const vscBtn = document.getElementById('vsc-btn');
    vscBtn.addEventListener('click', () => {
        window.api.openVSCode();
        window.api.toggleTaskWindow();
    });
    
    const fbBtn = document.getElementById('fb-btn');
    fbBtn.addEventListener('click', () => {
        window.api.openFacebook();
        window.api.toggleTaskWindow();
    });
    
    const timerBtn = document.getElementById('timer-btn');
    timerBtn.addEventListener('click', () => {
        window.api.openTimer();
        window.api.toggleTaskWindow();
    });
    
    const configBtn = document.getElementById('config-btn');
    configBtn.addEventListener('click', showConfigWindow);
    
    const quitBtn = document.getElementById('quit-btn');
    quitBtn.addEventListener('click', window.api.quitApp);
}

function showConfigWindow() {
    window.api.toggleConfigWindow();
}