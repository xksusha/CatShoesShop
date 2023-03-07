'use strict';
const { Client } = require("@notionhq/client")

module.exports = {NotionAPI: class NotionAPI {
  constructor(apiToken='secret_AFCZD8PHefoXQT8Gp1UlvRtADXOag5NnIKWQwVE2oZf') {
    this.notion = new Client({
      auth: apiToken,
    })
  }
  findItemsByFilename(filename, databaseID='ee64fcde89b541b5b410ad9974847bbb') {
    return notion.databases.query({
      database_id: databaseID,
      filter: {
        property: "filename",
        rich_text: {
          contains: filename,
        },
      },
    })
  }
}}