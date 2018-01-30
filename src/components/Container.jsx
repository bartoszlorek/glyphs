import React from 'react'
import bem from './bem'

import Glyph from './Glyph'

const display = glyphs => {
    if (glyphs.length > 0) {
        return glyphs.map((data, index) => <Glyph key={index} data={data} />)
    }
    return <span>{'no results'}</span>
}

function Container({ glyphs }) {
    return <div className={bem('container')}>{display(glyphs)}</div>
}

export default Container
