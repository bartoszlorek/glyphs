const validMessageType = type => {
    if (typeof type !== 'string') {
        throw 'message requires `type` as a String'
    }
}
const validTabId = id => {
    if (typeof id !== 'number') {
        throw 'tab requires `id` as a Number'
    }
}

const sendToBack = (spec, callback) => {
    if (spec != null) {
        validMessageType(spec.type)
        chrome.runtime.sendMessage(spec, callback)
    }
}

const sendToFront = (id, spec, callback) => {
    if (spec != null) {
        validTabId(id)
        validMessageType(spec.type)
        chrome.tabs.sendMessage(id, spec, callback)
    }
}

const message = {
    on: (type, callback) => {
        validMessageType(type)
        chrome.runtime.onMessage.addListener((request, sender, response) => {
            if (request.type === type) {
                callback(request, sender, response)
            }
        })
    },
    toBackground: sendToBack,
    toPopup: sendToBack,
    toTab: {
        one: sendToFront,
        all: (spec, callback) => {
            chrome.tabs.query({}, tabs => {
                tabs.forEach(tab => sendToFront(tab.id, spec, callback))
            })
        },
        current: (spec, callback) => {
            chrome.tabs.query({
                currentWindow: true,
                active: true
            }, tabs => {
                sendToFront(tabs[0].id, spec, callback)
            })
        }
    }
}

export default message
