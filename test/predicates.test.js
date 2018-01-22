import p, { and, or, not, object, array } from '../src/.utils/predicates'

describe('Logical Operators', () => {
    const Truthy = () => true
    const Falsy = () => false

    it('AND', () => {
        expect(and(Truthy)()).toBeTruthy()
        expect(and(Truthy, Truthy, Truthy)()).toBeTruthy()
        expect(and(Truthy, Falsy)()).toBeFalsy()
    })

    it('OR', () => {
        expect(or(Falsy)()).toBeFalsy()
        expect(or(Falsy, Falsy, Truthy)()).toBeTruthy()
        expect(or(Falsy, Truthy)()).toBeTruthy()
    })

    it('NOT', () => {
        expect(not(Truthy)()).toBeFalsy()
        expect(not(Falsy)()).toBeTruthy()
    })
})

describe('Data Operators: Object', () => {
    const data = [
        {
            name: 'AA',
            group: 'xx',
            value: 1
        },
        {
            name: 'aa',
            group: 'yy',
            value: 2
        },
        {
            name: 'bb',
            group: 'xx',
            value: 3
        },
        {
            name: 'cc',
            group: 'YY',
            value: 4
        }
    ]

    it('case sensitive', () => {
        let result = data.filter(
            or(
                object.contain('group', 'yy'),
                object.contain('name', 'a')
            )
        )
        expect(result.length).toBe(1)
        expect(result[0].value).toBe(2)
    })

    it('case insensitive', () => {
        let result = data.filter(
            or(
                object.icontain('group', 'yy'),
                object.icontain('name', 'a')
            )
        )
        expect(result.length).toBe(3)
        expect(result[0].value).toBe(1)
        expect(result[1].value).toBe(2)
        expect(result[2].value).toBe(4)
    })
})

describe('Data Operators: Array', () => {
    const data = ['AA', 'aa', 'bb', 'cc', 'dd']

    it('case sensitive', () => {
        let result = data.filter(array.contain('a'))
        expect(result.length).toBe(1)
        expect(result[0]).toBe('aa')
    })

    it('case insensitive', () => {
        let result = data.filter(array.icontain('a'))
        expect(result.length).toBe(2)
        expect(result[0]).toBe('AA')
        expect(result[1]).toBe('aa')
    })
})