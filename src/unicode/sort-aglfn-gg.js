const path = require('path')
const sorter = require('./.internal/glyph-sorter')

sorter({
    source: path.join(__dirname, './lookup-tables/aglfn-gg.js'),
    output: path.join(__dirname, './lookup-tables/aglfn-gg-sorted.js')
})
