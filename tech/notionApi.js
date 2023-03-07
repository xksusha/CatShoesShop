'use strict';
const { Client } = require("@notionhq/client")
const createPayload = (databaseId, filename, tag, description, snippet, line) => ({
  "parent": {
      "type": "database_id",
      "database_id": databaseId
  },
  "properties": {
      "filename": {
          "title": [
              {
                  "text": {
                      "content": filename
                  }
              }
          ]
      },
      "tag": {
          "rich_text": [
              {
                  "text": {
                      "content": tag
                  }
              }
          ]
      },
      "line": {
        "number": [
            {
                "text": {
                    "content": line
                }
            }
        ]
      },
      "snippet": {
          "rich_text": [
            {
                "text": {
                    "content": snippet
                }
            }
          ]
      },
      "description": {
        "rich_text": [
          {
              "text": {
                  "content": description
              }
          }
        ]
      }
  },
})


module.exports = { NotionAPI: class NotionAPI {
  constructor(apiToken='secret_AFCZD8PHefoXQT8Gp1UlvRtADXOag5NnIKWQwVE2oZf') {
    this.notion = new Client({
      auth: apiToken,
    })
  }
  insertItem(payload) {
    const notionPayload = createPayload(
      'ee64fcde89b541b5b410ad9974847bbb', payload.filename, payload.tags, payload.description, payload.snippet, payload.line
    )
    return this.notion.pages.create(notionPayload)
  }
  findItemsByFilename(filename, databaseID='ee64fcde89b541b5b410ad9974847bbb') {
    return this.notion.databases.query({
      database_id: databaseID,
      filter: {
        property: "filename",
        rich_text: {
          contains: filename,
        },
      },
    })
  }
  deletePage(pageId) {
    return this.notion.pages.update({ page_id: pageId, archived: true })
  }
  viewPage(pageId) {
    return this.notion.pages.retrieve({ page_id: pageId })
  }
} }


