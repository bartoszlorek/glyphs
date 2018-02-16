import React from 'react'
import styled from 'styled-components'

import Glyph from './Glyph'

function Container({ glyphs, className, onClick }) {
    let result

    if (glyphs.length > 0) {
        result = glyphs.map((data, index) => (
            <Glyph key={index} data={data} onClick={onClick} />
        ))
    } else {
        result = <span>{'no results'}</span>
    }

    return <div className={className}>{result}</div>
}

export default styled(Container)`
    border: 1px solid #dadada;
    border-width: 1px 0 0 1px;
    flex-wrap: wrap;
    overflow: auto;
    display: flex;

    & * {
        box-sizing: border-box;
    }
`
