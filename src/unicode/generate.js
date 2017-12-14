const fs = require('fs')
const es = require('event-stream')
const unicodeRange = require('unicode-range')
const path = require('path')

const error = name => err =>
    console.log(name + ' error', err)

generate({
    source: path.join(__dirname, 'aglfn.txt'),
    output: path.join(__dirname, 'table.js'),
    iteratee: (line, blocks) => {
        let fields = line.split(';'),
            block = unicodeRange(fields[0])
        return {
            value: fields[0],
            name: fields[2].toLowerCase(),
            block: blockIndex(blocks, block)
        }
    }
})

function generate({ source, output, iteratee }) {
    let writer = fs.createWriteStream(output, { encoding: 'utf8' }),
        multiline = false,
        blocks = []

    writer.on('error', error('writer'))
    writer.write('module.exports={glyphs:[')

    fs.createReadStream(source, { encoding: 'utf8' })
        .pipe(es.split())
        .pipe(es.mapSync(line => {
            if (line.length > 0 && line[0] !== '#') {
                let result = iteratee(line, blocks)
                if (result) {
                    if (multiline === true) {
                        writer.write(',')
                    }
                    writer.write(JSON.stringify(result))
                    multiline = true
                }
            }
        })
        .on('error', error('reader'))
        .on('end', () => {
            writer.write('], blocks:' +
                JSON.stringify(blocks) + '}')
            writer.end()
            console.log('end')
        })
    )
}

function blockIndex(array, name) {
    let index = array.indexOf(name)
    if (index > -1) {
        return index
    }
    array.push(name)
    return array.length - 1
}
