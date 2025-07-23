const { app } = require('electron');
const fs = require('fs');
const path = require('path');

let userData = '';
let dataPath = '';

function init() {
    userData = app.getPath('userData');
    dataPath = path.join(userData, 'data');

    if (!fs.existsSync(dataPath)) {
        console.log("Folder 'data' doesn't exist. Creating one...");
        try {
            fs.mkdirSync(dataPath);
        } catch (error) {
            console.error(`Failed to create data folder: ${error}`);
            process.exit(1);
        }
    }
}

function getPath(filename) {
    if(dataPath === '') {
        console.error(`Storage wasn't initialized properly`);
        process.exit(1);
    }
    
    return path.join(dataPath, filename);
}

function writeFile(filename, data) {
    const filePath = getPath(filename);

    if(!fs.existsSync(filePath))
        fs.writeFileSync(filePath, '[]');

    try {
        fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to write to ${filename}: ${error}`);
    }
}

function readFile(filename) {
    const filePath = getPath(filename);
    if(!fs.existsSync(filePath)) return [];
            
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(`Failed to read ${filename}: ${error}`);
        return [];   
    } 
}

module.exports = {
    init,
    getPath,
    writeFile,
    readFile
}