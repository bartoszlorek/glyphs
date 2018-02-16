import {
    selectionRange,
    rangeContent,
    nodeValue,
    isEditable,
    isTextElement
} from '../.utils/selection.min.js'

import spliceString from '../.utils/splice-string'
import dispatchEvent from './dispatch-event'

const isEditableText = e => isTextElement(e) || isEditable(e)

const addValue = (element, value) => {
    let { node, text, startOffset, endOffset } = element
    nodeValue(node, spliceString(text, startOffset, endOffset, value))
}

function applyGlyph(glyph) {
    let range = selectionRange()
    if (range !== null && isEditableText(range.commonAncestorContainer)) {
        rangeContent(range).forEach((element, index) => {
            let value = index === 0 ? glyph.symbol : ''
            addValue(element, value)
            dispatchEvent(element.node)
        })
    }
}

export default applyGlyph
