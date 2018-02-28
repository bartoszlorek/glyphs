const path = require('path')
const sorter = require('./.internal/glyph-sorter')

sorter({
    file: path.join(__dirname, './lookup-tables/aglfn-gg-sorted.js'),
    data: require('./lookup-tables/aglfn-gg')
})
