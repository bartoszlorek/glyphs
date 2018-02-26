import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Symbol = styled.span`
    font-size: 2em;
    line-height: 1em;
`

const handleMouseDown = e => e.preventDefault()
const printData = data => `U+${data.value} | ${data.name}`

class Glyph extends React.PureComponent {
    constructor(props) {
        super(props)

        this.handleClick = e => {
            e.preventDefault()
            props.onClick(props.data)
        }
        this.handleMouseEnter = () => {
            props.onHover(printData(props.data))
        }
    }

    render() {
        let { className, data } = this.props
        return (
            <div
                className={className}
                onClick={this.handleClick}
                onMouseDown={handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
            >
                <Symbol>{data.symbol}</Symbol>
            </div>
        )
    }
}

Glyph.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onHover: PropTypes.func
}

export const Placeholder = styled.div`
    position: relative;
    width: 10%;
    border: 1px solid #dadada;
    border-width: 0 1px 1px 0;
    justify-content: center;
    align-items: center;
    display: flex;
    overflow: hidden;

    &:nth-child(-n + 10) {
        border-top-width: 1px;
    }
    &:nth-child(10n + 1) {
        border-left-width: 1px;
    }
    &::before {
        content: '';
        display: block;
        padding-top: 100%;
        height: 0;
    }
`

export default Placeholder.withComponent(Glyph).extend`
    &:hover {
        background: #e6e6e6;
        cursor: pointer;
    }

    &:active {
        background: transparent;
    }
`
