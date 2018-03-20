import closest from '../.utils/closest'
import spliceString from '../.utils/splice-string'
import dispatchEvent from './dispatch-event'
import validation from './validation'

import {
    setSelection,
    selectionRange,
    rangeContent,
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
    let range = selectionRange(),
        valid = validation(range)

    if (valid.failed) {
        return reject(valid.error)
    }

    let container = range.commonAncestorContainer
    if (!isGlyphsFrame(container) && isEditableText(container)) {
        rangeContent(range).forEach((element, index) => {
            let { node, startOffset } = element

            // apply glyph only to the first node
            // and leave the rest of selection empty
            if (index === 0) {
                addValue(element, glyph.symbol)
                setSelection(node, startOffset + 1)
            } else {
                addValue(element, '')
            }

            // force updates
            dispatchEvent(node)
        })

        resolve(glyph)
    }
})

export default applyGlyph
