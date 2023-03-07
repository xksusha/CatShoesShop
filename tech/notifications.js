const axios = require('axios')
const path = require('path')

const GITHUB = "https://github.com/xksusha/CatShoesShop/tree/main"
const NOTION_URL = "https://notion.com"

const get_payload = (by_files) => {
    const blocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Hello, Assistant to the Regional Manager Dwight :douchebag: ! *Michael Scott* won't be happy with those technical debts."
            }
        },
        {
            "type": "divider"
        }
    ]

    for (file in by_files) {
        lines = []
        for (debt of by_files[file]) {
            msg = [`*Line ${debt.line}*`]
            if (debt.description) {
                msg.push(`*Description*: ${debt.description}`)
            }
            if (debt.description) {
                msg.push(`*Tags*: ${debt.tags}`)
            }
            lines.push(msg.join('\n\t'))
        }

        blocks.push({
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `:page_facing_up: *${file}*\n${lines.join('\n')}`
            },
            "accessory": {
                "type": "overflow",
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": ":frame_with_picture: View on Notion",
                            "emoji": true
                        },
                        "url": `${NOTION_URL}`
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": ":page_facing_up: View on GitHub",
                            "emoji": true
                        },
                        "url": `${GITHUB}/${file}`
                    }
                ]
            }
        })
    }
    return {
        "blocks": blocks
    }
}

async function sendNotification(debt_comments) {
    const SLACK_WEBHOOK_URL = `https://hooks.slack.com/services/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`
    const by_files = {}
    for (comment of debt_comments) {
        by_files[comment.filename] = by_files[comment.filename] || []
        by_files[comment.filename].push(comment)
    }

    try {
        response = await axios.post(
            SLACK_WEBHOOK_URL, get_payload(by_files)
        )
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    sendNotification
}