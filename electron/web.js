const { exec } = require('child_process');

function openFacebook() {
    exec('explorer "https://www.facebook.com/messages/"', (error) => {
        if(error) {
            console.error(`Failed to open Facebook: ${error.message}`);
            return;
        }
    });
}

module.exports = {
    openFacebook
}