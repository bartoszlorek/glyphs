function escNumeric(value) {
    return value.match(/[\d]+/g).join('')
}

export default escNumeric