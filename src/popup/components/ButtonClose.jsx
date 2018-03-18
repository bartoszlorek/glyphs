import React from 'react'
import styled from 'styled-components'

function ButtonClose(props) {
    return (
        <div {...props}>
            <span>×</span>
        </div>
    )
}

export default styled(ButtonClose)`
    position: relative;
    display: inline-block;
    width: 36px;
    height: 36px;
    cursor: pointer;

    & span {
        display: block;
        width: 24px;
        height: 24px;
        margin: 6px auto;
        border-radius: 50%;
        background: transparent;
        text-align: center;
        line-height: 20px;
        font-weight: bold;
        font-size: 20px;
        transition: all 0.2s;
        color: #333;
    }

    &:hover span,
    &:focus span {
        background: #ccc;
        color: #fff;
    }

    &:active span {
        background: #999;
    }
`
