import {
    selectionRange,
    rangeContent,
    nodeValue,
    isEditable,
    isTextElement,
    setNodeValue
} from '../.utils/selection.min.js'

import closest from '../.utils/closest'
import spliceString from '../.utils/splice-string'
import dispatchEvent from './dispatch-event'
import setCaret from './set-caret'

const isEditableText = e => isTextElement(e) || isEditable(e)
const isGlyphsFrame = closest(e => e.id === 'glyphs-frame')

const addValue = (element, value) => {
    let { node, text, startOffset, endOffset } = element
    setNodeValue(node, spliceString(text, startOffset, endOffset, value))
}

function applyGlyph(glyph) {
    let range = selectionRange(),
        ancestor = range.commonAncestorContainer

    if (
        range !== null &&
        !isGlyphsFrame(ancestor) &&
        isEditableText(ancestor)
    ) {
        rangeContent(range).forEach((element, index) => {
            let { node, endOffset } = element,
                value = index === 0 ? glyph.symbol : ''

            addValue(element, value)
            setCaret(node, endOffset + 1)
            dispatchEvent(node)
        })
    }
}

export default applyGlyph
