const events = ['change', 'input'].map(name =>
    new Event(name, {
        bubbles: true,
        cancelable: false
    })
)

function dispatchEvent(element) {
    if (element.nodeType !== 1) {
        element = element.parentElement
    }
    events.forEach(event => {
        element.dispatchEvent(event)
    })
}

export default dispatchEvent
