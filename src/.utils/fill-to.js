function fillTo(array, length, iteratee) {
    if (array == null) {
        return []
    }
    if (length - array.length <= 0) {
        return array
    }
    let result = []
    for (let i = array.length; i < length; i++) {
        result.push(iteratee(i))
    }
    return array.concat(result)
}

export default fillTo
