import React from 'react'
import styled from 'styled-components'

const Symbol = styled.span`
    background: #f2f2f2;
    font-size: 2em;
    line-height: 1em;
`

const Value = styled.span`
    display: none;
`

function Glyph({ data, className, onClick }) {
    let { value, name, symbol } = data

    return (
        <div
            data-name={name}
            className={className}
            onClick={() => onClick(data)}
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

    &::before {
        content: '';
        display: block;
        padding-top: 100%;
        height: 0;
    }
`
