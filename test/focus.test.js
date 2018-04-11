import createFocus, { take } from '../src/.utils/focus'

describe('focus.js', () => {
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
        document.body.innerHTML = `
            <input id="a" />
            <input id="b" />
        `
        const input = document.getElementById('a')
        input.focus()

        const focus = createFocus()
        focus.logger = jest.fn()
        focus.push('active')

        expect(focus.logger).toBeCalledWith(input, [input])
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
        document.body.innerHTML = `
            <input id="a" />
            <input id="b" />
            <input id="c" />
        `
        const inputA = document.getElementById('a')
        const inputB = document.getElementById('b')
        const inputC = document.getElementById('c')
        const history = [inputA, inputB, inputC]
        const focus = createFocus()

        focus.push(inputA)
        focus.push(inputB)
        focus.push(inputC)

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

        it('index as function', () => {
            let mockFn = jest.fn(() => 1)
            focus(mockFn)
            expect(document.activeElement).toBe(inputB)
            expect(mockFn).toBeCalledWith(history)
        })
    })
})
