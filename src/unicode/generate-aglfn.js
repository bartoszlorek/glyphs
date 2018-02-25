const path = require('path')
const unicodeRange = require('./.internal/unicode-range')
const fileParser = require('../.utils/file-parser')
const escSymbol = require('./.internal/esc-symbol')

const unidata = require('./lookup-table/unidata')
const categoriesTable = require('./lookup-table/categories')

fileParser({
    source: path.join(__dirname, './resources/aglfn.txt'),
    output: path.join(__dirname, './lookup-table/aglfn.js'),
    iteratee: (line, props) => {
        let [value, glyphName, charName] = line.split(';'),
            { category } = unidata[value],
            block = unicodeRange(value)

        let blockIndex = '' + block.index
        props.blocks[blockIndex] = block.name

        let categoryKey = category
        props.categories[categoryKey] = categoriesTable[categoryKey]

        return JSON.stringify({
            value: value,
            name: charName.toLowerCase(),
            symbol: escSymbol(value),
            category: categoryKey,
            block: blockIndex
        })
    },
    props: {
        categories: {},
        blocks: {}
    },
    separator: ',',
    before: 'module.exports={glyphs:[',
    after: props => {
        let c = JSON.stringify(props.categories),
            b = JSON.stringify(props.blocks)
        return `],categories:${c},blocks:${b}}`
    }
})
