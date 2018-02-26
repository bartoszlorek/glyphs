import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bind } from '../../.utils/react-utils'
import fillTo from '../../.utils/fill-to'

import Glyph, { Placeholder } from './Glyph'

class GlyphsContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        bind(this, ['handleMouseLeave'])
    }

    handleMouseLeave() {
        this.props.onHover('')
    }

    render() {
        let { items, className, emptyText } = this.props
        if (items.length === 0) {
            if (emptyText === '') {
                return null
            }
            return (
                <div className={className}>
                    <span>{emptyText}</span>
                </div>
            )
        }

        let { placeholder, onClick, onHover } = this.props
        let glyphs = items.map(item => (
            <Glyph
                key={item.value}
                data={item}
                onClick={onClick}
                onHover={onHover}
            />
        ))

        if (placeholder > 0) {
            glyphs = fillTo(glyphs, placeholder, index => (
                <Placeholder key={index} />
            ))
        }

        return (
            <div className={className} onMouseLeave={this.handleMouseLeave}>
                {glyphs}
            </div>
        )
    }
}

GlyphsContainer.propTypes = {
    items: PropTypes.array.isRequired,
    emptyText: PropTypes.string,
    placeholder: PropTypes.number,
    onClick: PropTypes.func,
    onHover: PropTypes.func
}

GlyphsContainer.defaultProps = {
    emptyText: '',
    placeholder: 0
}

export default styled(GlyphsContainer)`
    flex-wrap: wrap;
    overflow: auto;
    display: flex;

    & * {
        box-sizing: border-box;
    }
`
