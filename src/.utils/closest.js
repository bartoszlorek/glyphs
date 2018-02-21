const closest = predicate => elem => {
    while (elem) {
        if (predicate(elem) === true) {
            return elem
        }
        elem = elem.parentElement
    }
    return null
}

export default closest
