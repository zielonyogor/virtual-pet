import { setupTitle } from "../ui/titleBar.js";

let isRunning = false;
let timerValueElem = null;
let countdownInterval = null;
let remainingSeconds = 0;

let startBtn;

function setup() {
    setupTitle();

    const timeBtns = Array.from(document.getElementsByClassName("time-btn"));
    timeBtns.forEach(timeBtn => {
        timeBtn.addEventListener('click', () => setTime(parseInt(timeBtn.value)));
    });

    window.api.getTimes().then((times) => {
        console.log(`Times: `, times);
        for(let i = 0; i < times.length; i++) {
            timeBtns[i].value = times[i];
            timeBtns[i].textContent = `${times[i]}:00`;
        }
    })

    timerValueElem = document.getElementById("time-value");

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
        startBtn.classList.remove('start-btn-active')
    } else {
        countdownInterval = setInterval(updateTime, 1000);
        isRunning = true;
        startBtn.textContent = 'stop';
        startBtn.classList.add('start-btn-active')
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
