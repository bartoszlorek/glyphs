function matchProperty(value, object) {
    value = String(value)

    if (object == null) {
        return null
    }
    let props = Object.keys(object)
    for (let prop of props) {
        if (value.indexOf(prop) >= 0) {
            return object[prop]
        }
    }
    return null
}

export default matchProperty
