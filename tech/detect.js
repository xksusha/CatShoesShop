const { dirname, normalize, join } = require('path')
const { readdir, access } = require('fs/promises')

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
    const files = await fs.readdir(path)
    console.log(join(path, files[0]))
    // files.map((file) => fs.lstat(join(path, file))
}

// TESTING ONLY
(async () => {
    await get_files(APPLICATION_DIRECTORY)
})()