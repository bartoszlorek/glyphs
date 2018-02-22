import React from 'react'
import styled from 'styled-components'

import Glyph from './Glyph'

class Container extends React.PureComponent {
    render() {
        let { glyphs, className, onClick } = this.props
        return (
            <div className={className}>
                {glyphs.length > 0 ? (
                    glyphs.map(data => (
                        <Glyph key={data.value} data={data} onClick={onClick} />
                    ))
                ) : (
                    <span>{'no results'}</span>
                )}
            </div>
        )
    }
}

export default styled(Container)`
    flex-wrap: wrap;
    overflow: auto;
    display: flex;

    & * {
        box-sizing: border-box;
    }
`
