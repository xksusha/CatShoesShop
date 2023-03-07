const { NotionAPI } = require('./notionApi.js')

api = new NotionAPI()

api.findItemsByFilename('app.py').then(data => data.results.forEach(r => {
  return api.deletePage(r.id)
}))

todoList = []
api.insertItems(todoList)