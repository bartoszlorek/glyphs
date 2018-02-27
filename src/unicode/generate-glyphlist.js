const path = require('path')
const fileParser = require('../.utils/file-parser')
const escSymbol = require('./.internal/esc-symbol')

const categoriesTable = require('./lookup-table/categories')
const unidata = require('./lookup-table/unidata')
const getBlock = require('./.internal/unicode-block')

fileParser({
    source: path.join(__dirname, './resources/glyphlist.txt'),
    output: path.join(__dirname, './lookup-table/glyphlist.js'),
    iteratee: (line, props) => {
        let [glyphName, value] = line.split(';'),
            data = unidata[value]

        if (data != null) {
            let block = getBlock(value)

            let blockIndex = '' + block.index
            props.blocks[blockIndex] = block.name

            let categoryKey = data.category
            props.categories[categoryKey] = categoriesTable[categoryKey]

            return JSON.stringify({
                value: value,
                name: data.name.toLowerCase(),
                symbol: escSymbol(value),
                category: categoryKey,
                block: blockIndex
            })
        }
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
