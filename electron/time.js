const storage = require('./storage.js');

const timesJSON = 'times.json';

function getTimes() {
    let times = storage.readFile(timesJSON);
    if(times.length === 0) {
        times = [5, 10, 15]; // 5, 10, 15 default
        storage.writeFile(timesJSON, times);
    }
    return times;
}

function setTimes(newTimes) {
    console.log(newTimes);
    if(newTimes === null || newTimes.length < 3) return;
    
    storage.writeFile(timesJSON, newTimes);
}

module.exports = {
    getTimes,
    setTimes,
}