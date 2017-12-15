function getIndex(array, value) {
    let index = array.indexOf(value)
    if (index > -1) {
        return index
    }
    array.push(value)
    return array.length - 1
}

module.exports = getIndex