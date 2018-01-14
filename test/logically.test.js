import logically, {
    makeWrapper,
    makePredicate,
    operators
} from '../src/.utils/logically'

/*
 * { A: value, B: value }                                   // AND
 * [{ A: value }, { B: value }]                             // OR
 * ['and', { A: value }, [{ B: value }, { C: value }] ]     // complex AND
 */

describe('logical operators', () => {
    const a = () => true
    const b = () => false

    it('AND falsy', () => {
        let and = operators['and']([a, b])
        expect(and()).toBeFalsy()
    })

    it('AND truthy', () => {
        let and = operators['and']([a, a])
        expect(and()).toBeTruthy()
    })

    it('OR', () => {
        let or = operators['or']([a, b])
        expect(or()).toBeTruthy()
    })
})

describe('internal methods', () => {
    const compare = (a, b) => a == b
    const predicate = makePredicate(compare)
    const wrapper = makeWrapper(predicate)

    it('makePredicate returns boolean', () => {
        let test = predicate({ a: 1 }),
            resultA = test({ a: 1 }),
            resultB = test({ a: 2 }),
            resultC = test({ b: 1 })
        expect(resultA).toBe(true)
        expect(resultB).toBe(false)
        expect(resultC).toBe(false)
    })

    it('makeWrapper returns boolean', () => {
        let test = wrapper([
            'and', { a: 1 },
            ['or', { b: 2 }, { c: 1 }]
        ])
        let resultA = test({ a: 1, b: 2 }),
            resultB = test({ a: 1, c: 1 }),
            resultC = test({ a: 1 })

        test({ a: 1 })
        test({ a: 10 })
        test({ a: 22 })

        expect(resultA).toBe(true)
        expect(resultB).toBe(true)
        expect(resultC).toBe(false)
    })
})

const dataset = [{
        name: 'aaa',
        value: 1,
        group: 'first'
    },
    {
        name: 'aaa',
        value: 2,
        group: 'second'
    },
    {
        name: 'bbb',
        value: 3,
        group: 'first'
    },
    {
        name: 'ccc',
        value: 4,
        group: 'second'
    }
]

describe('logically.js', () => {
    it('should handle simple query', () => {
        let result = dataset.filter(logically({
            name: 'bbb'
        }))
        expect(result[0].value).toBe(3)
    })

    it('should handle AND query', () => {
        let result = dataset.filter(logically({
            name: 'aaa',
            group: 'second'
        }))
        expect(result.length).toBe(1)
        expect(result[0].value).toBe(2)
    })

    it('should handle OR query', () => {
        let result = dataset.filter(logically([
            { name: 'bbb' },
            { value: 4 }
        ]))
        expect(result.length).toBe(2)
        expect(result[0].value).toBe(3)
        expect(result[1].value).toBe(4)
    })

    it('should handle AND as logical operator', () => {
        let result = dataset.filter(logically([
            'and',
            { name: 'bbb' },
            { value: 4 }
        ]))
        expect(result.length).toBe(0)
    })
})