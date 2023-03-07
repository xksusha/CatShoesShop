const { NotionAPI } = require('./notionApi.js')
const { get_files, APPLICATION_DIRECTORY } = require('./detect')
console.log(`get_files: ${get_files}`)
console.log(`APPLICATION_DIRECTORY: ${APPLICATION_DIRECTORY}`)

async function main() {
    files = await get_files(APPLICATION_DIRECTORY)
    console.log(files)
}

main()

api = new NotionAPI()

api.findItemsByFilename('app.py').then(data => data.results.forEach(r => {
  return api.deletePage(r.id)
}))

todoList = []
api.insertItems(todoList)