function escNumeric(value) {
    let result = value && value
        .match(/[\d]+/g)
        .join('') || null
    return result != null ? result : ''
}

export default escNumeric