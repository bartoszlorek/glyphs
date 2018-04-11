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
        if (self.logger !== null) {
            self.logger(elem, history)
        }
        history.push(elem)
    }

    const pushActiveElement = () => {
        pushToHistory(document.activeElement)
    }

    const self = (index, predicate) => {
        if (typeof index === 'function') {
            index = index(history)
        }
        let length = history.length
        if (!length || index == null) {
            return self
        }
        if (index < 0) {
            index = -index > length ? 0 : length + index
        } else if (index >= length) {
            index = length - 1
        }

        let elem = history[index]
        if (typeof predicate === 'function') {
            let result = predicate(elem, history)
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
        document.addEventListener('click', pushActiveElement, true)
        return self
    }
    self.detach = () => {
        document.removeEventListener('click', pushActiveElement, true)
        return self
    }
    self.push = (...elems) => {
        if (elems[0] === 'active') {
            pushActiveElement()
        } else {
            elems.forEach(pushToHistory)
        }
        return self
    }

    return self
}

export default createFocus
