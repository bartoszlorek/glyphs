const path = require('path')
const fileParser = require('../.utils/file-parser')
const escSymbol = require('./.internal/esc-symbol')

const unidata = require('./lookup-tables/unidata')
const getBlock = require('./.internal/unicode-block')
const getGroup = require('./general-groups/get-group')
const getNames = require('./general-groups/get-names')

fileParser({
    source: path.join(__dirname, './resources/aglfn.txt'),
    output: path.join(__dirname, './lookup-tables/aglfn-gg.js'),
    iteratee: (line, props) => {
        const [ value, glyphName, charName ] = line.split(';')
        const { category: categoryKey } = unidata[value]
        const { index: blockIndex } = getBlock(value)

        return JSON.stringify({
            value: value,
            symbol: escSymbol(value),
            name: charName.toLowerCase(),
            group: getGroup(categoryKey, blockIndex)
        })
    },
    props: {
        categories: {},
        blocks: {}
    },
    separator: ',',
    before: 'module.exports={glyphs:[',
    after: props => {
        let codes = JSON.stringify(getNames)
        return `],groups:${codes}}`
    }
})
