const getWindow = elem => {
    if (elem == null) {
        return null
    }
    let doc = elem.ownerDocument
    return doc.defaultView || doc.parentWindow
}

function setCaret(elem, offset) {
    if (elem == null) {
        return
    }
    let tagName = (elem.tagName && elem.tagName.toLowerCase()) || 'node'
    if (tagName === 'textarea' || tagName === 'input') {
        elem.setSelectionRange(offset, offset)
    } else {
        let selection = getWindow(elem).getSelection(),
            range = document.createRange()

        range.setStart(elem, offset)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
    }
}

export default setCaret
