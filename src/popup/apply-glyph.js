import closest from '../.utils/closest'
import setCaret from '../.utils/set-caret'
import spliceString from '../.utils/splice-string'
import dispatchEvent from './dispatch-event'
import validation from './validation'

import {
    selectionRange,
    rangeContent,
    nodeValue,
    isEditable,
    isTextElement,
    setValue
} from '../.utils/selection.min.js'

const isEditableText = e => isEditable(e) || isTextElement(e)
const isGlyphsFrame = closest(e => e.id === 'glyphs-frame')

const addValue = (element, value) => {
    let nextValue = spliceString(
        element.text,
        element.startOffset,
        element.endOffset,
        value
    )
    return setValue(element.node, nextValue)
}

const applyGlyph = glyph => new Promise((resolve, reject) => {
    let range = selectionRange()
    let valid = validation(range);

    if (valid.failed) {
        return reject(valid.error)
    }
    if (
        !isGlyphsFrame(range.commonAncestorContainer) &&
        isEditableText(range.commonAncestorContainer)
    ) {
        rangeContent(range).forEach((element, index) => {
            let { node, endOffset } = element,
                value = index === 0 ? glyph.symbol : ''

            addValue(element, value)
            setCaret(node, endOffset + 1)
            dispatchEvent(node)
        })
        resolve(glyph)
    }
})

export default applyGlyph
