const fileParser = require('../.utils/file-parser')
const unicodeRange = require('unicode-range')
const path = require('path')

fileParser({
    source: path.join(__dirname, './resources/unidata.txt'),
    output: path.join(__dirname, './lookup-table/unidata.js'),
    iteratee: line => {
        let fields = line.split(';')
        return `"${fields[0]}":` + JSON.stringify({
            name: fields[1].toLowerCase(),
            category: fields[2]
        })
    },
    separator: ',',
    before: 'module.exports={',
    after: '}'
})