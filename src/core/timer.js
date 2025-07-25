const { setupTitle } = require("../ui/titleBar.js");

let isRunning = false;
let timerValueElem = null;
let countdownInterval = null;
let remainingSeconds = 0;

function setup() {
    setupTitle();

    const timeBtns = Array.from(document.getElementsByClassName("time-btn"));
    timeBtns.forEach(timeBtn => {
        timeBtn.addEventListener('click', () => setTime(parseInt(timeBtn.value)));
    });

    timerValueElem = document.getElementById("time-value");

    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener('click', toggleTimer);
}

function setTime(minutes) {
    if (isRunning) return;
    remainingSeconds = minutes * 60;
    updateDisplay();
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(countdownInterval);
        isRunning = false;
    } else {
        countdownInterval = setInterval(updateTime, 1000);
        isRunning = true;
    }
}

function updateTime() {
    if (remainingSeconds <= 0) {
        clearInterval(countdownInterval);
        isRunning = false;
        return;
    }
    remainingSeconds--;
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    timerValueElem.textContent = `${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', setup);
