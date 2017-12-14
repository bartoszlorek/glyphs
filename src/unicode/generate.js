const fileParser = require('../.utils/file-parser')
const unicodeRange = require('unicode-range')
const path = require('path')

fileParser({
    source: path.join(__dirname, './resources/aglfn.txt'),
    output: path.join(__dirname, 'table.js'),
    iteratee: (line, props) => {
        let fields = line.split(';'),
            block = unicodeRange(fields[0])
        return JSON.stringify({
            value: fields[0],
            name: fields[2].toLowerCase(),
            symbol: escapeSymbol(fields[0]),
            block: blockIndex(props.blocks, block)
        })
    },
    props: {
        blocks: []
    },
    separator: ',',
    before: 'module.exports={glyphs:[',
    after: (props) => '], blocks:' +
        JSON.stringify(props.blocks) + '}'
})

function blockIndex(array, name) {
    let index = array.indexOf(name)
    if (index > -1) {
        return index
    }
    array.push(name)
    return array.length - 1
}

function escapeSymbol(code) {
    return String.fromCharCode(parseInt(code, 16))
}