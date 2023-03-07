const { NotionAPI } = require('./notionApi.js')
const { get_files, APPLICATION_DIRECTORY } = require('./detect')
console.log(`get_files: ${get_files}`)
console.log(`APPLICATION_DIRECTORY: ${APPLICATION_DIRECTORY}`)

async function main() {
    files = await get_files(APPLICATION_DIRECTORY)
    console.log(files)
}

main()

console.log(NotionAPI)
// api = new NotionAPI()

// api.then(results => console.log(results))