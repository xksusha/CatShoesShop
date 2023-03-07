const { createReadStream } = require('fs')
const { relative: getRelativePath } = require('path')
const readline = require('readline')
const { access, constants } = require('fs/promises')
const { APPLICATION_DIRECTORY, get_files } = require('./detect')

const BEGIN_TAG_REGEX = /^[#/ ]+[ ]?<DT>[ -]*(?<tag>\[[\w_\- ]+\])[ -]*(?<description>.*)$/gmi
const CLOSING_TAG_REGEX = /^[#/ ]+[ ]?<\/DT>.*$/gmi
const REMOVE_BRACKES_REGEX = /^\[|\]$/gmi

const does_file_exists = async (path) => {
    try {
        await access(path, constants.F_OK)
        return true
    } catch (e) {
        return false
    }
}

async function* async_read_line(path) {
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
    const filename = getRelativePath(APPLICATION_DIRECTORY, path);
    let line_number = 1
    let sessions = []
    let current_sessions = []

    if (!await does_file_exists(path))
        return []

    const begin_session = (tags, line, description) => {
        const new_session = { filename, tags, line, description, snippet: '' }
        current_sessions.push(new_session)
        sessions.push(new_session)
    }

    const close_session = () => {
        current_sessions.pop()
    }

    for await (const line of async_read_line(path)) {
        for (const match of line.matchAll(CLOSING_TAG_REGEX)) {
            close_session()
        }
        for (session of current_sessions) {
            session.snippet += `${line}\n`
        }
        for (const match of line.matchAll(BEGIN_TAG_REGEX)) {
            tags = (match.groups.tag ?? '').replace(REMOVE_BRACKES_REGEX, '')
            begin_session(tags, line_number, match.groups.description)
        }
        line_number += 1
    }
    return sessions
}

const get_debt_comments = async (paths) => {
    return (await Promise.all(paths.map((path) => get_debt_comment_from_file(path)))).flat(1)
}

module.exports = { get_debt_comments, get_debt_comment_from_file }

//  const get_debt_comments(path)

// TESTING ONLY
// ; (async () => {
//     const files = await get_files(APPLICATION_DIRECTORY)
//     console.log(await get_debt_comments(files))
// })()