function createFocus(limit = 10) {
    let history = []

    const isLast = elem => {
        return elem === history[history.length - 1]
    }

    const pushHistory = elem => {
        if (elem == null || isLast(elem)) {
            return
        }
        if (history.length === limit) {
            history.shift()
        }
        if (self.logger !== null) {
            self.logger(elem, history)
        }
        history.push(elem)
    }

    const handleClick = () => {
        pushHistory(document.activeElement)
    }

    const self = (index = -1, predicate) => {
        let length = history.length
        if (!length) {
            return self
        }

        if (typeof index === 'function') {
            index = index(history)
        }
        if (index < 0) {
            index = -index > length ? 0 : length + index
        } else if (index >= length) {
            index = length - 1
        }
        if (index == null) {
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
    }

    self.logger = null
    self.attach = () => {
        document.addEventListener('click', handleClick, true)
        return self
    }
    self.detach = () => {
        document.removeEventListener('click', handleClick, true)
        return self
    }
    self.push = elem => {
        if (elem === 'active') {
            elem = document.activeElement
        }
        pushHistory(elem)
        return self
    }

    return self
}

export default createFocus
