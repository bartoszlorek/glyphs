function escHexadecimal(code) {
    return parseInt(code.replace(/^U\+/i, ''), 16)
}

module.exports = escHexadecimal
