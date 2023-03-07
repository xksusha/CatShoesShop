const { createReadStream } = require('fs')
const readline = require('readline')
const { access, constants } = require('fs/promises')

const BEGIN_TAG = /^#[ ]?<DT>[ -]*(?<tag>\[[\w_\- ]+\])[ -]*(?<description>.*)$/gmi
const CLOSING_TAG = /^#[ ]?<\/DT>.*$/gmi

const does_file_exists = async (path) => {
    try {
        await access(path, constants.F_OK)
        return true
    } catch (e) {
        return false
    }
}

async function* async_read_line(path) {
    if (!await does_file_exists(path))
        throw Error(`File ${path} not found or not readable`)

    const readStream = createReadStream(path, { encoding: 'utf8' })
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        yield line
    }
}

const get_debt_comment_from_file = async (path) => {
    let line = 1
    let sessions = []
    let current_session = null

    const begin_session = (tags, line) => {
        return { tags, line, snippet: '', children: [] }
    }

    for await (const line of async_read_line(path)) {
        console.log(BEGIN_TAG.match(line))
        line += 1
    }

}

const get_debt_comments = async (paths) => {
    // for each - call get_comment_from_file
    return [
        { filename: './products/admin.py', tags: 'error', snippet: "print('tech debt')\nraise Exception('admin')", line: 140, description: '' },
        { filename: './products/apps.py', tags: 'dependency-injection', snippet: "print('apps')\nraise Exception('hello')", line: 150, description: '' },
        { filename: './products/apps.py', tags: 'warning', snippet: "print('apps')\nraise Exception('warning')", line: 198, description: '' },
    ]
}

module.exports = { get_debt_comments }

    //  const get_debt_comments(path)

    // TESTING ONLY
    // (async () => {
    //     const path = require('path')
    //     try {
    //         await get_debt_comments(path.join(path.dirname(require.main.filename), 'index.js'))
    //     } catch (e) {
    //         console.log(e)
    //     }
    // })()