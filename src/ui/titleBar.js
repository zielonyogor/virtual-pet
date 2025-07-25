export function setupTitle() {
    const closeBtn = document.getElementById('close-btn');
    if(closeBtn !== null) {
        closeBtn.addEventListener('click', () => {
            window.api.closeWindow();
        });
    }

    const minimizeBtn = document.getElementById('minimize-btn');
    if(minimizeBtn !== null) {
        minimizeBtn.addEventListener('click', () => {
            window.api.minimizeWindow();
        });
    }
}