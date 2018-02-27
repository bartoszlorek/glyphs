const ranges = require('unicode-range-json')

module.exports = function(unicodestr) {
    if (typeof unicodestr !== 'string') {
        throw new TypeError('unicode-block expected a String')
    }
    let value = parseInt(unicodestr.replace(/^U\+/i, ''), 16)
    for (let index = 0; index < ranges.length; index++) {
        let range = ranges[index]

        if (value >= range.range[0] && value <= range.range[1]) {
            return {
                name: range.category,
                index
            }
        }
    }

    return {
        name: 'Unassigned',
        index: 0
    }
}
