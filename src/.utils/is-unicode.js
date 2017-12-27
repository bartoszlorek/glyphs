function isUnicode(value) {
    if (typeof value !== 'string') {
        return false
    }
    value = value.toLowerCase()
    if (value.substr(0, 2) === 'u+') {
        return true
    }
    let chars = Array.from(value),
        step = 1 / chars.length,
        score = 0

    for (let char of chars) {
        if (/[0-9a-f]/.test(char)) {
            score += step
        }
    }
    return score > .5
}

export default isUnicode