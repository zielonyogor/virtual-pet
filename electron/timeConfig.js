const fs = require('fs');
const path = require('path');

const timesJSONPath = path.join(process.cwd(), 'data', 'times.json');

function getTimes() {
    if(!fs.existsSync(timesJSONPath)) return [];
        
    try {
        return JSON.parse(fs.readFileSync(timesJSONPath, 'utf8'));
    } catch (error) {
        console.error(`Failed to load JSON with times: ${error}`);
        return [];   
    }  
}

function setTimes(newTimes) {

}

module.exports = {
    getTimes,
    setTimes,
}