import closest from '../.utils/closest'
import dispatchEvent from './dispatch-event'
import validation from './validation'
import {
    setSelection,
    selectionRange,
    rangeContent
} from '../.utils/selection.min.js'

const isInsideFrame = element => {
    let isFrame = e => e.id === 'glyphs-frame'
    return closest(isFrame)(element) !== null
}

const applyGlyph = glyph => new Promise((resolve, reject) => {
    let range = selectionRange(),
        valid = validation(range)

    if (valid.failed) {
        return reject(valid.error)
    }
    let container = range.commonAncestorContainer
    if (!range.editable || isInsideFrame(container)) {
        return 'soft reject'
    }

    rangeContent(range).forEach((item, index) => {
        let { node, startOffset } = item

        // apply glyph only to the first node
        // and leave the rest of selection empty
        if (index === 0) {
            item.selectedText = glyph.symbol
            setSelection(node, startOffset + 1)
        } else {
            item.selectedText = ''
        }

        // force updates
        dispatchEvent(node)
    })

    resolve(glyph)
})

export default applyGlyph
