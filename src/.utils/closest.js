const closest = predicate => elem => {
    while (elem) {
        if (predicate(elem)) {
            return elem
        }
        elem = elem.parentElement
    }
    return null
}

export default closest
