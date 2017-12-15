const path = require('path')
const unicodeRange = require('unicode-range')
const fileParser = require('../.utils/file-parser')
const escSymbol = require('../.utils/esc-symbol')
const getIndex = require('./.internal/get-index')

const unidata = require('./lookup-table/unidata')
const catdata = require('./lookup-table/categories')

const toDescription = name => catdata[name]

fileParser({
    source: path.join(__dirname, './resources/aglfn.txt'),
    output: path.join(__dirname, './lookup-table/aglfn.js'),
    iteratee: (line, props) => {
        let fields = line.split(';'),
            block = unicodeRange(fields[0]),
            { category } = unidata[fields[0]]

        return JSON.stringify({
            value: fields[0],
            name: fields[2].toLowerCase(),
            symbol: escSymbol(fields[0]),
            category: getIndex(props.categories, category),
            block: getIndex(props.blocks, block)
        })
    },
    props: {
        categories: [],
        blocks: []
    },
    separator: ',',
    before: 'module.exports={glyphs:[',
    after: (props) => {
        let c = JSON.stringify(props.categories.map(toDescription)),
            b = JSON.stringify(props.blocks)
        return `],categories:${c},blocks:${b}}`
    }
})