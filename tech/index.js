const { NotionAPI } = require('./notionApi.js')
const { get_files, APPLICATION_DIRECTORY } = require('./detect')
const { get_debt_comment_from_file } = require('./debt-comments')
const { readFile } = require('fs').promises
const { sendNotification } = require('./notifications')

console.log(`get_files: ${get_files}`)
console.log(`APPLICATION_DIRECTORY: ${APPLICATION_DIRECTORY}`)

api = new NotionAPI()

const handleFilesList = (filesList = []) => {
  filesList.forEach(filename => {
    api.findItemsByFilename(filename).then(data => data.results.forEach(r => {
      return api.deletePage(r.id)
    }))
    get_debt_comment_from_file(filename).then(comments => comments.forEach(comment => {
      console.log(comment)
      api.insertItem(comment)
    }))
  })
}

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
    handleFilesList(modified_files_list)
    handleFilesList(removed_files_list)
    handleFilesList(added_files_list)
}

main()