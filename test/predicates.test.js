import {
    and,
    or,
    not,
    greater,
    less,
    greaterEqual,
    lessEqual,
    positive,
    negative,
    equal,
    contain,
    icontain,
    object
} from '../src/.utils/predicates'

describe('Logical Operators', () => {
    const Truthy = () => true
    const Falsy = () => false

    it('AND', () => {
        expect(and(Truthy)()).toBe(true)
        expect(and(Truthy, Truthy, Truthy)()).toBe(true)
        expect(and(Truthy, Falsy)()).toBe(false)
    })

    it('OR', () => {
        expect(or(Falsy)()).toBe(false)
        expect(or(Falsy, Falsy, Truthy)()).toBe(true)
        expect(or(Falsy, Truthy)()).toBe(true)
    })

    it('NOT', () => {
        expect(not(Truthy)()).toBe(false)
        expect(not(Falsy)()).toBe(true)
    })
})

describe('Comparison Operators', () => {
    it('greater', () => {
        expect(greater(1)(2)).toBe(true)
        expect(greater(3)(2)).toBe(false)
    })

    it('less', () => {
        expect(less(2)(1)).toBe(true)
        expect(less(2)(3)).toBe(false)
    })

    it('greaterEqual', () => {
        expect(greaterEqual(1)(2)).toBe(true)
        expect(greaterEqual(2)(2)).toBe(true)
        expect(greaterEqual(3)(2)).toBe(false)
    })

    it('lessEqual', () => {
        expect(lessEqual(2)(1)).toBe(true)
        expect(lessEqual(1)(1)).toBe(true)
        expect(lessEqual(2)(3)).toBe(false)
    })

    it('positive', () => {
        expect(positive(1)).toBe(true)
        expect(positive(-1)).toBe(false)
    })

    it('negative', () => {
        expect(negative(-1)).toBe(true)
        expect(negative(1)).toBe(false)
    })

    it('equal', () => {
        expect(equal('a')('a')).toBe(true)
        expect(equal('a')('b')).toBe(false)
    })

    it('contain (case sensitive)', () => {
        expect(contain('a')('aa')).toBe(true)
        expect(contain('A')('aa')).toBe(false)
        expect(contain('b')('aa')).toBe(false)
    })

    it('icontain (case insensitive)', () => {
        expect(icontain('a')('aa')).toBe(true)
        expect(icontain('A')('aa')).toBe(true)
        expect(icontain('b')('aa')).toBe(false)
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
            value: 2,
            extra: 1
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

    it('.has', () => {
        let result = data.filter(object.has('extra'))
        expect(result.length).toBe(1)
        expect(result[0].name).toBe('aa')
    })

    it('.equal', () => {
        let result = data.filter(object.equal('value', 3))
        expect(result.length).toBe(1)
        expect(result[0].name).toBe('bb')
    })

    it('.contain (case sensitive)', () => {
        let result = data.filter(
            or(object.contain('group', 'yy'), object.contain('name', 'a'))
        )
        expect(result.length).toBe(1)
        expect(result[0].value).toBe(2)
    })

    it('.icontain (case insensitive)', () => {
        let result = data.filter(
            or(object.icontain('group', 'yy'), object.icontain('name', 'a'))
        )
        expect(result.length).toBe(3)
        expect(result[0].value).toBe(1)
        expect(result[1].value).toBe(2)
        expect(result[2].value).toBe(4)
    })

    it('.is', () => {
        let result = data.filter(object.is('value', greater(2)))
        expect(result.length).toBe(2)
        expect(result[0].name).toBe('bb')
        expect(result[1].name).toBe('cc')
    })
})
