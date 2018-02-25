// it doesn't care about the order of the items

function isEqualArray(value, other) {
    if (value === other) {
        return true
    }
    if (value == null || other == null ||
        value.length !== other.length) {
        return false
    }
    for (let i = 0; i < value.length; ++i) {
        if (value[i] !== other[i]) {
            return false
        }
    }
    return true
}

export default isEqualArray
