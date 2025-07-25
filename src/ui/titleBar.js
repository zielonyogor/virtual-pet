export function setupTitle() {
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
        window.api.closeWindow();
    });

    const minimizeBtn = document.getElementById('minimize-btn');
    minimizeBtn.addEventListener('click', () => {
        window.api.minimizeWindow();
    });
}