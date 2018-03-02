function getPrototypeBy(predicate) {
    if (predicate == null) {
        predicate = object => Object.getPrototypeOf(object) === null
    }

    return object => {
        while (object !== null) {
            object = Object.getPrototypeOf(object)
            if (predicate(object) === true) {
                return object
            }
        }

        return null
    }
}

export default getPrototypeBy
