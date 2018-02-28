const path = require('path')
const fileParser = require('./.internal/file-parser')
const escSymbol = require('./.internal/esc-symbol')

const categoriesTable = require('./lookup-tables/categories')
const unidata = require('./lookup-tables/unidata')
const getBlock = require('./.internal/unicode-block')

fileParser({
    source: path.join(__dirname, './resources/aglfn.txt'),
    output: path.join(__dirname, './lookup-tables/aglfn.js'),
    iteratee: (line, props) => {
        const [ value, glyphName, charName ] = line.split(';')
        const { category: categoryKey } = unidata[value]
        let { name: blockName, index: blockIndex } = getBlock(value)

        blockIndex += ''
        props.categories[categoryKey] = categoriesTable[categoryKey]
        props.blocks[blockIndex] = blockName

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
