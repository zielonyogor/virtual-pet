const fs = require('fs');
const { exec } = require('child_process');
const storage = require('./storage.js');

const reposJSON = 'repos.json';

function getRepos() {
    return storage.readFile(reposJSON);
}

function pullRepos() {
    const repos = getRepos();
    console.log(repos);
    repos.forEach(repo => {
        exec('git pull origin', { cwd: repo }, (error, stdout, stderr) => {
            if(error) {
                console.error(`Git pull failed in ${repo}: ${error.message}`);
                return;
            }
            console.log(`Git pulled in ${repo}:\n${stdout}`);
        })
    });
}

function addRepo(repoPath) {
    if(!fs.existsSync(repoPath)) return;
    
    let repos = storage.readFile(reposJSON);

    if(!repos.includes(repoPath)) {
        repos.push(repoPath);
        storage.writeFile(reposJSON, repos);
    }
}

function deleteRepo(repoPath) {
    if(!fs.existsSync(repoPath)) return;
    
    let repos = storage.readFile(reposJSON);
    
    if(repos.includes(repoPath)) {
        repos = repos.filter(r => r !== repoPath);
        storage.writeFile(reposJSON, repos);
    }
}

module.exports = {
    pullRepos,
    getRepos,
    addRepo,
    deleteRepo
};