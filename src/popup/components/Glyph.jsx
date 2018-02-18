import React from 'react'
import styled from 'styled-components'

const Symbol = styled.span`
    font-size: 2em;
    line-height: 1em;
`

const Value = styled.span`
    display: none;
`

const preventMouseDown = e => e.preventDefault()

function Glyph({ data, className, onClick }) {
    let { value, name, symbol } = data

    return (
        <div
            data-name={name}
            className={className}
            onClick={e => {
                e.preventDefault()
                onClick(data)
            }}
            onMouseDown={preventMouseDown}
        >
            <Symbol>{symbol}</Symbol>
            <Value>{value}</Value>
        </div>
    )
}

export default styled(Glyph)`
    position: relative;
    width: 10%;
    border: 1px solid #dadada;
    border-width: 0 1px 1px 0;
    justify-content: center;
    align-items: center;
    display: flex;
    overflow: hidden;
    cursor: pointer;

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

    &:hover {
        background: #ebebeb;
    }

    &:active {
        background: #fff;
    }
`
