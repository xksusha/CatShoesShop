const { NotionAPI } = require('./notionApi.js')

console.log(NotionAPI)
api = new NotionAPI()

api.findItemsByFilename('apps.py').then(results => console.log(results))
api.insertItems(todoList).then(results => console.log(results))