const axios = require('axios')

async function sendNotification(msg) {
    const SLACK_WEBHOOK_URL = `https://hooks.slack.com/services/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`

    await axios.post(
        SLACK_WEBHOOK_URL, {        
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": msg,
                        "emoji": true
                    }
                }
            ]
        }
    )
}

module.exports = {
    sendNotification
}