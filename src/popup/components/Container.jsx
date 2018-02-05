import React from 'react'
import bem from '../bem'

import Glyph from './Glyph'

function Container({ glyphs, onClick }) {
    let result

    if (glyphs.length > 0) {
        result = glyphs.map((data, index) => (
            <Glyph key={index} data={data} onClick={onClick} />
        ))
    } else {
        result = <span>{'no results'}</span>
    }

    return <div className={bem('container')}>{result}</div>
}

export default Container
