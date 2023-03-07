const readdirp = require('readdirp')
const { dirname, normalize, join } = require('path')

const TECH_DEBT_FOLDER_NAME = 'tech'
const APPLICATION_DIRECTORY = (() => {
    const path = dirname(require.main.filename)
    if (path.includes(`/${TECH_DEBT_FOLDER_NAME}`))
        return normalize(join(path, '..'))
    return dirname(require.main.filename)
})()

const get_files = async (path) => {
    const files = []
    for await (const entry of readdirp(path, { directoryFilter: ['!.git', '!*modules'] })) {
        const { path } = entry;
        files.push(path)
    }
    return files
}

module.exports = {
    get_files,
    APPLICATION_DIRECTORY
}