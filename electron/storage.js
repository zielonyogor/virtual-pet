const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, "..", 'data');

function getRepos() {
    const repoPath = path.join(dataPath, 'repos.json');
    if(!fs.existsSync(repoPath)) return [];

    return JSON.parse(fs.readFileSync(repoPath, 'utf8'));
}

module.exports = {
    getRepos
};