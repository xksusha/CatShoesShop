const { NotionAPI } = require('./notionApi.js')
const { get_files, APPLICATION_DIRECTORY } = require('./detect')
const { get_debt_comments } = require('./debt-comments')
const { readFile } = require('fs').promises

console.log(`get_files: ${get_files}`)
console.log(`APPLICATION_DIRECTORY: ${APPLICATION_DIRECTORY}`)

api = new NotionAPI()

async function main() {
    added_files_path = process.argv[2]
    console.log(`added_files_path: ${added_files_path}`)

    removed_files_path = process.argv[3]
    console.log(`removed_files_path: ${removed_files_path}`)

    modified_files_path = process.argv[4]
    console.log(`modified_files_path: ${modified_files_path}`)

    added_files_list = JSON.parse(await readFile(added_files_path))
    removed_files_list = JSON.parse(await readFile(removed_files_path))
    modified_files_list = JSON.parse(await readFile(modified_files_path))

    console.log(`added_files_list: ${added_files_list}`)
    console.log(`removed_files_list: ${removed_files_list}`)
    console.log(`modified_files_list: ${modified_files_list}`)

    // files = await get_files(APPLICATION_DIRECTORY)
    // files.forEach(filename => {
    //   api.findItemsByFilename(filename).then(data => data.results.forEach(r => {
    //     return api.deletePage(r.id)
    //   }))
    //   get_debt_comments(filename).then(comments => comments.forEach(comment => {
    //     api.insertItem(comment)
    //   }))
      
    // })
}

main()