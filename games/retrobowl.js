// retrobowlmessage.js

const fetch = require('node-fetch');

function sendWebhookMessage() {
    const webhookURL = 'https://discord.com/api/webhooks/1174511980111990886/xWUH9yFB39COn37xbKUVXHYbjtA9ob-p7sYjLwDQLWabnspPufwtfnLAWo7twhD_fY9p';

    // Message content to be sent to Discord
    const message = {
        content: 'Retro Bowl' // Change this content as needed
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (response.ok) {
            console.log('Message sent successfully to Discord!');
        } else {
            console.error('Failed to send message to Discord:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error sending message to Discord:', error);
    });
}

module.exports = sendWebhookMessage;
