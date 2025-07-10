document.addEventListener('DOMContentLoaded', setup);

function setup()
{
    const quitBtn = document.getElementById('quit-btn');
    quitBtn.addEventListener('click', window.api.quitApp);
    
    const gitBtn = document.getElementById('git-btn');
    gitBtn.addEventListener('click', window.api.executeGitPull);
}
