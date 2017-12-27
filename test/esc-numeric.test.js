import escNumeric from '../src/.utils/esc-numeric'

describe('escNumeric.js', () => {

    it('should return string', () => {
        expect(escNumeric()).toBe('')
        expect(escNumeric(null)).toBe('')
        expect(escNumeric('')).toBe('')
    })

    it('should match only numbers', () => {
        expect(escNumeric('u100')).toBe('100')
    })

    it('should preserved leading zero', () => {
        expect(escNumeric('u0010')).toBe('0010')
    })

    it('should group numbers into one', () => {
        expect(escNumeric('u001aa2b34')).toBe('001234')
    })

})