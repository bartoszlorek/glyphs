function escNumeric(value) {
    let result = value &&
        value.match(/[\d]+/g) ||
        null

    if (result == null) {
        return ''
    }
    return result.join('')
}

export default escNumeric