import React from 'react'
import styled from 'styled-components'
import { bind } from '../../.utils/react-utils'

import Glyph from './Glyph'

class Recent extends React.PureComponent {
    render() {
        let { glyphs, className, onClick, onHover } = this.props
        if (glyphs.length === 0) {
            return null
        }
        return (
            <div className={className}>
                {glyphs.map(data => (
                    <Glyph
                        key={data.value}
                        data={data}
                        onClick={onClick}
                        onHover={onHover}
                    />
                ))}
            </div>
        )
    }
}

export default styled(Recent)`
    flex-wrap: wrap;
    overflow: auto;
    display: flex;
    margin: 0 0 5px;
    background: #fafafa;

    & * {
        box-sizing: border-box;
    }
`
