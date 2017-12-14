const fs = require('fs')
const es = require('event-stream')

const error = name => err =>
    console.log(name + ' error', err)

function fileParser({
    source,
    output,
    iteratee,
    separator = '',
    before = '',
    after = '',
    props = {}
}) {
    let writer = fs.createWriteStream(output, { encoding: 'utf8' }),
        multiline = false

    writer.on('error', error('writer'))
    writer.write(escapeString(before, props))

    fs.createReadStream(source, { encoding: 'utf8' })
        .pipe(es.split())
        .pipe(es.mapSync(line => {
            if (line.length > 0 && line[0] !== '#') {
                let result = iteratee(line, props)
                if (result) {
                    if (multiline === true && separator) {
                        writer.write(separator)
                    }
                    writer.write(result)
                    multiline = true
                }
            }
        })
        .on('error', error('reader'))
        .on('end', () => {
            writer.write(escapeString(after, props))
            writer.end()
            console.log('file parsed successfully')
        })
    )
}

function escapeString(value, props) {
    let type = typeof value
    if (type === 'function') {
        return value(props)
    }
    if (type === 'string') {
        return value
    }
    return ''
}

module.exports = fileParser