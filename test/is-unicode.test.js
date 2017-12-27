import isUnicode from '../src/.utils/is-unicode'

describe('is-unicode.js', () => {

    it('should return true', () => {
        expect(isUnicode('1EFD0')).toBeTruthy()
        expect(isUnicode('0105')).toBeTruthy()
        expect(isUnicode('U+012C')).toBeTruthy()
    })

    it('should return false', () => {
        expect(isUnicode('Small Letter')).toBeFalsy()
        expect(isUnicode('Latin Small Letter a with Ogonek')).toBeFalsy()
        expect(isUnicode('Latin Capital Letter W')).toBeFalsy()
    })

})