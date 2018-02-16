import { selectionRange, rangeContent, nodeValue } from './.utils/selection.min'
import spliceString from './.utils/splice-string'
import message from './.utils/chrome/message'

import dispatchEvent from './scripts/dispatch-event'

const addValue = (element, value) => {
    let { node, text, startOffset, endOffset } = element
    nodeValue(node, spliceString(
        text,
        startOffset,
        endOffset,
        value
    ))
}

message.on('ADD_GLYPH', ({ glyph }) => {
    let range = selectionRange(),
        content = rangeContent(range)

    if (content.length === 0) {
        return
    }
    content.forEach((element, index) => {
        let value = index === 0 ? glyph.symbol : ''
        addValue(element, value)
        dispatchEvent(element.node)
    })
})