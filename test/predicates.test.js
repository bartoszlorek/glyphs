import {
    and,
    or,
    not,
    greater,
    less,
    greaterEqual,
    lessEqual,
    between,
    positive,
    negative,
    equal,
    contains,
    icontains,
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
        let test = greater(2)
        expect(test(1)).toBe(false)
        expect(test(2)).toBe(false)
        expect(test(3)).toBe(true)
    })

    it('less', () => {
        let test = less(2)
        expect(test(1)).toBe(true)
        expect(test(2)).toBe(false)
        expect(test(3)).toBe(false)
    })

    it('greaterEqual', () => {
        let test = greaterEqual(2)
        expect(test(1)).toBe(false)
        expect(test(2)).toBe(true)
        expect(test(3)).toBe(true)
    })

    it('lessEqual', () => {
        let test = lessEqual(2)
        expect(test(1)).toBe(true)
        expect(test(2)).toBe(true)
        expect(test(3)).toBe(false)
    })

    it('between', () => {
        let test = between(0, 2)
        expect(test(0)).toBe(true)
        expect(test(1)).toBe(true)
        expect(test(3)).toBe(false)
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
        let test = equal('a')
        expect(test('a')).toBe(true)
        expect(test('b')).toBe(false)
    })

    it('contains (case sensitive)', () => {
        expect(contains('a')('aa')).toBe(true)
        expect(contains('A')('aa')).toBe(false)
        expect(contains('b')('aa')).toBe(false)
    })

    it('icontains (case insensitive)', () => {
        expect(icontains('a')('aa')).toBe(true)
        expect(icontains('A')('aa')).toBe(true)
        expect(icontains('b')('aa')).toBe(false)
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
            extra: 1,
            more: 0
        },
        {
            name: 'bb',
            group: 'xx',
            value: 3,
            extra: 1
        },
        {
            name: 'cc',
            group: 'YY',
            value: 4
        }
    ]

    it('.has', () => {
        let result = data.filter(object.has('extra'))
        expect(result.length).toBe(2)
        expect(result[0].name).toBe('aa')
        expect(result[1].name).toBe('bb')
    })

    it('.has (multiple)', () => {
        let result = data.filter(object.has('extra', 'more'))
        expect(result.length).toBe(1)
        expect(result[0].name).toBe('aa')
    })

    it('.equal', () => {
        let result = data.filter(object.equal('value', 3))
        expect(result.length).toBe(1)
        expect(result[0].name).toBe('bb')
    })

    it('.contains (case sensitive)', () => {
        let result = data.filter(
            or(object.contains('group', 'yy'), object.contains('name', 'a'))
        )
        expect(result.length).toBe(1)
        expect(result[0].value).toBe(2)
    })

    it('.icontains (case insensitive)', () => {
        let result = data.filter(
            or(object.icontains('group', 'yy'), object.icontains('name', 'a'))
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
