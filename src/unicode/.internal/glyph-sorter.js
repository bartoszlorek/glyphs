const fs = require('fs')
const path = require('path')
const hex = require('./esc-hexadecimal')

const sortValues = (a, b) => hex(a.value) - hex(b.value)

function glyphSorter({ source, output }) {
    if (path.extname(source) !== '.js') {
        throw new Error(`source (${source}) must be a JavaScript file`)
    }

    let { glyphs, groups } = require(source),
        strGlyphs = JSON.stringify(glyphs.sort(sortValues)),
        strGroups = JSON.stringify(groups)

    let data = `module.exports={glyphs:${strGlyphs},groups:${strGroups}}`
    fs.writeFile(output, data, 'utf8', () =>
        console.log('glyphs sorted successfully')
    )
}

module.exports = glyphSorter
