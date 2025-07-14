document.addEventListener('DOMContentLoaded', setup);

let btnDiv = null;
let configDiv = null;

function setup()
{

    configDiv = document.getElementById('config-div');
    
    const gitBtn = document.getElementById('git-btn');
    gitBtn.addEventListener('click', window.api.executeGitPull);
    
    const vscBtn = document.getElementById('vsc-btn');
    vscBtn.addEventListener('click', window.api.openVSCode);
    
    const configBtn = document.getElementById('config-btn');
    configBtn.addEventListener('click', showConfigWindow);
    
    const quitBtn = document.getElementById('quit-btn');
    quitBtn.addEventListener('click', window.api.quitApp);
}

function showConfigWindow() {

}