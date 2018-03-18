function dispatchEvent(element) {
    if (element.nodeType !== 1) {
        element = element.parentElement
    }

    let events = ['change', 'input'].map(name =>
        new Event(name, {
            bubbles: true,
            cancelable: true
        })
    )
    
    events.forEach(event => {
        element.dispatchEvent(event)
    })
}

export default dispatchEvent
