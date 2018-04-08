function createFocus(limit = 10) {
    let history = []

    const isLast = elem => {
        return elem === history[history.length - 1]
    }

    const pushToHistory = elem => {
        if (elem == null || isLast(elem)) {
            return
        }
        if (history.length === limit) {
            history.shift()
        }
        history.push(elem)
    }

    const handleClick = () => {
        pushToHistory(document.activeElement)
    }

    const self = {
        push: elem => {
            if (elem == 'active') {
                elem = document.activeElement
            }
            pushToHistory(elem)
            return self
        },
        attach: () => {
            document.addEventListener('click', handleClick, true)
            return self
        },
        detach: () => {
            document.removeEventListener('click', handleClick, true)
            return self
        },
        prev: (value = 0, predicate) => {
            let index = value == null ? -1 : history.length - value
            if (index < 0) {
                return self
            }
            let elem = history[index]
            if (typeof predicate === 'function') {
                let result = predicate(elem)
                if (result === false) {
                    return self
                }
                if (result && result.nodeType === 1) {
                    elem = result
                }
            }
            elem.focus()
            return self
        },
        last: predicate => self.prev(0, predicate)
    }

    return self
}

export default createFocus
