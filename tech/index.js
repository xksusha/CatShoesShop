const { NotionAPI } = require('./notionApi.js')
const { get_files, APPLICATION_DIRECTORY } = require('./detect')
const { get_debt_comments } = require('./debt-comments')
console.log(`get_files: ${get_files}`)
console.log(`APPLICATION_DIRECTORY: ${APPLICATION_DIRECTORY}`)

api = new NotionAPI()

async function main() {
    files = await get_files(APPLICATION_DIRECTORY)
    files.forEach(filename => {
      api.findItemsByFilename(filename).then(data => data.results.forEach(r => {
        return api.deletePage(r.id)
      }))
      get_debt_comments(filename).then(comments => comments.forEach(comment => {
        api.insertItem(comment)
      }))
      
    })
}

main()