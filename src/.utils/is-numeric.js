const isNum = a => !isNaN(parseInt(a, 10))

function isNumeric(value) {
    if (isNum(value[0])) {
        return true
    }
    let chars = Array.from(value),
        step = 1 / chars.length,
        score = 0

    for (let char of chars) {
        if (isNum(char)) {
            score += step
        }
    }
    return score > .5
}

export default isNumeric