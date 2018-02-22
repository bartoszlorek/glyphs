import React from 'react'
import styled from 'styled-components'
import { bind } from '../../.utils/react-utils'

import Glyph from './Glyph'

class Container extends React.PureComponent {
    constructor(props) {
        super(props)
        bind(this, ['handleMouseLeave'])
    }

    handleMouseLeave() {
        this.props.onHover('')
    }

    render() {
        let { glyphs, className, onClick, onHover } = this.props
        return (
            <div className={className} onMouseLeave={this.handleMouseLeave}>
                {glyphs.length > 0 ? (
                    glyphs.map(data => (
                        <Glyph
                            key={data.value}
                            data={data}
                            onClick={onClick}
                            onHover={onHover}
                        />
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
