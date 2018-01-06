import filterTable from '../src/.utils/filter-table'

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

/*
 * { A: value, B: value }                                   // AND
 * [{ A: value }, { B: value }]                             // OR
 * ['and', { A: value }, [{ B: value }, { C: value }] ]     // complex AND
 */

describe('filter-table.js', () => {
    it('should return array', () => {
        expect(filterTable()).toBeInstanceOf(Array)
        expect(filterTable(dataset)).toBeInstanceOf(Array)
        expect(filterTable(dataset, [])).toBeInstanceOf(Array)
    })

    it('should handle simple query', () => {
        let result = filterTable(dataset, {
            name: 'bbb'
        })
        expect(result[0].value).toBe(3)
    })

    it('should handle AND query', () => {
        let result = filterTable(dataset, {
            name: 'aaa',
            group: 'second'
        })
        expect(result.length).toBe(1)
        expect(result[0].value).toBe(2)
    })

    it('should handle OR query', () => {
        let result = filterTable(dataset, [{
                name: 'bbb'
            },
            {
                value: 4
            }
        ])
        expect(result.length).toBe(2)
        expect(result[0].value).toBe(3)
        expect(result[1].value).toBe(4)
    })

    it('should handle AND as logical operator', () => {
        let result = filterTable(dataset, [
            'and',
            {
                name: 'bbb'
            },
            {
                value: 4
            }
        ])
        expect(result.length).toBe(0)
    })
})