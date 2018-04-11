import createFocus from '../src/.utils/focus'

beforeEach(() => {
    document.activeElement.blur()
})

describe('focus.js', () => {
    document.body.innerHTML = `
        <input id="a" />
        <input id="b" />
        <input id="c" />
    `
    const inputA = document.getElementById('a')
    const inputB = document.getElementById('b')
    const inputC = document.getElementById('c')

    it('returns function with api properties', () => {
        const focus = createFocus()

        expect(focus).toBeInstanceOf(Function)
        expect(focus).toEqual(
            expect.objectContaining({
                logger: null,
                attach: expect.any(Function),
                detach: expect.any(Function),
                push: expect.any(Function)
            })
        )
    })

    it('push given value to the history', () => {
        const focus = createFocus()
        focus.logger = jest.fn()

        for (let i = 0; i < 4; i++) {
            focus.push(i)
        }
        expect(focus.logger.mock.calls).toEqual([
            [0, [0, 1, 2, 3]],
            [1, [0, 1, 2, 3]],
            [2, [0, 1, 2, 3]],
            [3, [0, 1, 2, 3]]
        ])
    })

    it('push active element to the history', () => {
        inputA.focus()
        const focus = createFocus()
        focus.logger = jest.fn()
        focus.push('active')

        expect(focus.logger).toBeCalledWith(inputA, [inputA])
    })

    it('should limit history steps', () => {
        const focus = createFocus(5)
        focus.logger = jest.fn()

        for (let i = 0; i < 10; i++) {
            focus.push(i)
        }
        expect(focus.logger).lastCalledWith(9, [5, 6, 7, 8, 9])
    })

    describe('should focus on added element by index:', () => {
        const focus = createFocus()
        focus.push(inputA, inputB, inputC)

        it('ignore wrong indices', () => {
            focus()
            focus(null)
            focus(() => {})
            expect(document.activeElement).toBe(document.body)
        })

        it('positive in the range', () => {
            focus(1)
            expect(document.activeElement).toBe(inputB)
        })

        it('positive out of the range', () => {
            focus(5)
            expect(document.activeElement).toBe(inputC)
        })

        it('negative in the range', () => {
            focus(-1)
            expect(document.activeElement).toBe(inputC)
        })

        it('negative out of the range', () => {
            focus(-5)
            expect(document.activeElement).toBe(inputA)
        })

        it('as result of function', () => {
            const mockFn = jest.fn(() => 1)
            focus(mockFn)
            expect(document.activeElement).toBe(inputB)
            expect(mockFn).toBeCalledWith([inputA, inputB, inputC])
        })
    })

    it('should change element by predicate', () => {
        const mockFn = jest.fn((elem, history) => history[1])
        const focus = createFocus()
        focus.push(inputA, inputB)
        focus(0, mockFn)

        expect(document.activeElement).toBe(inputB)
        expect(mockFn).lastCalledWith(inputA, [inputA, inputB])
    })

    it('should ignore element by predicate', () => {
        const mockFn = jest.fn((elem, history) => elem === inputB)
        const focus = createFocus()
        focus.push(inputA, inputB)

        focus(0, mockFn)
        expect(document.activeElement).toBe(document.body)
        expect(mockFn).lastCalledWith(inputA, [inputA, inputB])
    })

    it('predicate must return element for change', () => {
        const mockFn = jest.fn((elem, history) => 'wrong')
        const focus = createFocus()
        focus.push(inputA, inputB)

        focus(0, mockFn)
        expect(document.activeElement).toBe(inputA)
        expect(mockFn).lastCalledWith(inputA, [inputA, inputB])
    })
})
