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
                "text": "Hello, Assistant to the Regional Manager Dwight :douche: ! *Michael Scott* won't be happy with those technical debts."
            }
        },
        {
            "type": "divider"
        }
    ]

    for (file in by_files) {
        lines = []
        for (debt of by_files[file])
            lines.push(`Line ${debt.line}: ${debt.description} (tags: ${debt.tags})`)
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
                        "url": NOTION_URL
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": ":page_facing_up: View on GitHub",
                            "emoji": true
                        },
                        "url": path.join(GITHUB, file)
                    }
                ]
            }
        })
    }
    console.log(blocks)
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
    get_payload(by_files)

    await axios.post(
        SLACK_WEBHOOK_URL, get_payload(by_files)
    )
}

// sendNotification([
//     { filename: 'tech/debt-comments.js', tags: '', line: 10, description: '', snippet: '' },
//     { filename: 'tech/debt-comments.js', tags: '', line: 15, description: '', snippet: '' },
//     { filename: 'tech/hello.js', tags: '', line: '', description: '', snippet: '' }
// ])

module.exports = {
    sendNotification
}