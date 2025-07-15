const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, "..", 'data');
const reposJSONPath = path.join(dataPath, 'repos.json');

function getRepos() {
    if(!fs.existsSync(reposJSONPath)) return [];
    
    try {
        return JSON.parse(fs.readFileSync(reposJSONPath, 'utf8'));
    } catch (error) {
        console.error(`Failed to load JSON with repos: ${error}`);
        return [];   
    }    
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
    getRepos,
    addRepo,
    deleteRepo
};