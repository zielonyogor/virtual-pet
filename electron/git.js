const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const reposJSONPath = path.join(process.cwd(), 'data', 'repos.json');

function getRepos() {
    if(!fs.existsSync(reposJSONPath)) return [];
    
    try {
        return JSON.parse(fs.readFileSync(reposJSONPath, 'utf8'));
    } catch (error) {
        console.error(`Failed to load JSON with repos: ${error}`);
        return [];   
    }    
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
    if(!fs.existsSync(reposJSONPath)) return [];

    let repos = [];

    try {
        repos = JSON.parse(fs.readFileSync(reposJSONPath, 'utf-8'));   
    } catch (error) {
        console.error(`Failed to load JSON with repos: ${error}`);
        repos = [];
    }

    if(!repos.includes(repoPath)) {
        repos.push(repoPath);
        fs.writeFileSync(reposJSONPath, JSON.stringify(repos));
    }
}

function deleteRepo(repoPath) {
    if(!fs.existsSync(repoPath)) return;
    if(!fs.existsSync(reposJSONPath)) return [];

    let repos = [];

    try {
        repos = JSON.parse(fs.readFileSync(reposJSONPath, 'utf-8'));   
    } catch (error) {
        console.error(`Failed to load JSON with repos: ${error}`);
        repos = [];
    }

    if(repos.includes(repoPath)) {
        repos = repos.filter(r => r !== repoPath);
        fs.writeFileSync(reposJSONPath, JSON.stringify(repos));
    }
}

module.exports = {
    pullRepos,
    getRepos,
    addRepo,
    deleteRepo
};