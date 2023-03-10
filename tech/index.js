const { NotionAPI } = require('./notionApi.js')
const { get_files, APPLICATION_DIRECTORY } = require('./detect')
const { get_debt_comment_from_file } = require('./debt-comments')
const { readFile } = require('fs').promises
const { sendNotification } = require('./notifications')

console.log(`get_files: ${get_files}`)
console.log(`APPLICATION_DIRECTORY: ${APPLICATION_DIRECTORY}`)

api = new NotionAPI()

const handleFilesList = (filesList = []) => {
    console.log('TREATING FILES:', filesList)

    return Promise.all(filesList.map(filename => {
        return api.findItemsByFilename(filename).then(data => Promise.all((data.results || []).map(r => {
            return api.deletePage(r.id)
        }))).then(() => {
            return get_debt_comment_from_file(filename)
        }).then((comments) => {
            comments.forEach(comment => {
                api.insertItem(comment)
            })
            return comments
        })
    })).then((comments) => {
        return comments.flat(1)
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
    const comments = await Promise.all([
        handleFilesList(modified_files_list),
        handleFilesList(removed_files_list),
        handleFilesList(added_files_list)
    ])
    sendNotification(comments.flat(1))
}

main()