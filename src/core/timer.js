const timerValue = 0;
function setup() {
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
        console.log('clickcicc');
        window.api.closeWindow();
    });

    const startBtn = document.getElementById('start-btn');
    const timerInput = document.getElementById('timer-input');
    timerInput.value = timerValue;
}

document.addEventListener('DOMContentLoaded', setup);