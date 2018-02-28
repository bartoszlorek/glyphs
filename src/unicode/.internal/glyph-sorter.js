const fs = require('fs')
const hex = require('./esc-hexadecimal')

const sortValues = (a, b) => hex(a.value) - hex(b.value)

function glyphSorter({ data, file }) {
    let sorted = data.glyphs.sort(sortValues),
        glyphs = JSON.stringify(sorted),
        groups = JSON.stringify(data.groups)

    let output = `module.exports={glyphs:${glyphs},groups:${groups}}`
    fs.writeFile(file, output, 'utf8', () =>
        console.log('glyphs sorted successfully')
    )
}

module.exports = glyphSorter
