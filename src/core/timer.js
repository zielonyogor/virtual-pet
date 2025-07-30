import { setupTitle } from "../ui/titleBar.js";

let isRunning = false;
let countdownInterval = null;
let remainingSeconds = 0;

let timerValueElem = null;
let startBtn = null;
let timeBtns = [];

function setup() {
    setupTitle();

    timeBtns = Array.from(document.getElementsByClassName("time-btn"));
    timeBtns.forEach(timeBtn => {
        timeBtn.addEventListener('click', () => setTime(parseInt(timeBtn.value)));
    });
    
    timerValueElem = document.getElementById("time-value");

    window.api.getTimes().then((times) => {
        const defaultTime = times.length === 0 ? 5 : times[0];
        timerValueElem.textContent = `${pad(defaultTime)}:00`;  
        remainingSeconds = defaultTime * 60;  

        for(let i = 0; i < times.length; i++) {
            timeBtns[i].value = times[i];
            timeBtns[i].textContent = `${pad(times[i])}:00`;
        }
    })

    startBtn = document.getElementById("start-btn");
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
        startBtn.textContent = 'start';
        startBtn.classList.remove('start-btn-active');
    } else {
        countdownInterval = setInterval(updateTime, 1000);
        isRunning = true;
        startBtn.textContent = 'stop';
        startBtn.classList.add('start-btn-active');
    }
    timeBtns.forEach(timeBtn => {
        timeBtn.disabled = isRunning;
    });
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
