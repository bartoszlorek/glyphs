const { groups } = require('./groups.json')

// Interpretation of Glyphs Category from Adobe Software.
// Each glyph can be assigned to multiple categories.

// props:
// name [String]                General Group Name
// code [String]                Short and unique name
// category [Array of String]   Unicode General Category Keys
// block [Array of Number]      Unicode Block Indices

module.exports = function(categoryKey = '', blockIndex = -1) {
    const codes = []

    groups.forEach(({ code, category, block }) => {
        if (category.indexOf(categoryKey) > -1 ||
            block.indexOf(blockIndex) > -1) {
            codes.push(code)
        }
    })
    return codes
}
