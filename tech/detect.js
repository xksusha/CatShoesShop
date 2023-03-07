const { dirname, normalize, join } = require('path')
const { readdir, access } = require('fs/promises')
const readdirp = require('readdirp');
const { constants } = require('os')
// HELPERS
const file_is_accessible = async (file, extension) => {
    await access(file, constants.F_OK)
}

// CONFIGURATION
const TECH_DEBT_FOLDER = 'tech'
const EXTENSIONS = ['.py']
const APPLICATION_DIRECTORY = (() => {
    const path = dirname(require.main.filename)
    if (path.includes(`/${TECH_DEBT_FOLDER}`))
        return normalize(join(path, '..'))
    return dirname(require.main.filename)
})()
const IGNORED_FILES = (async () => {
    if (await file_is_accessible(join(APPLICATION_DIRECTORY, '.gitignore')))
        console.log('.gitignore')
})()

const get_files = async (path, extension) => {
    const files = []
    for await (const entry of readdirp(path, { directoryFilter: ['!.git', '!*modules']})) {
        const {path} = entry;
        files.push(path)
    }
    return files
}

module.exports = {
    get_files,
    APPLICATION_DIRECTORY
}