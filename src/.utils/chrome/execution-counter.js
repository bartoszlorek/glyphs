import { isPlainObject } from 'lodash'

const RESET_COUNTER = 'RESET_COUNTER'

function bindTabEmitter() {
    window.addEventListener('beforeunload', () => {
        chrome.runtime.sendMessage({ type: RESET_COUNTER })
    })
}

function bindBackListener(cache = {}) {
    chrome.runtime.onMessage.addListener((request, sender) => {
        if (request.type === RESET_COUNTER) {
            cache[sender.tab.id] = -1
        }
    })
    return cache
}

function createCounter(cache) {
    if (!isPlainObject(cache)) {
        throw 'createCounter requires `cache` as an Object.'
    }

    return name => {
        const value = cache[name] + 1 || 0
        cache[name] = value

        const api = {
            reset: () => {
                cache[name] = -1
                return api
            },
            equal: (x, callback) => {
                if (value === x) {
                    callback()
                }
                return api
            },
            greater: (x, callback) => {
                if (value > x) {
                    callback()
                }
                return api
            }
        }
        return api
    }
}

export {
    createCounter,
    bindTabEmitter,
    bindBackListener
}
