const { groups } = require('./groups.json')

const names = {}
groups.forEach(({ code, name }) =>
    (names[code] = name))

module.exports = names
