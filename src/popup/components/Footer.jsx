import React from 'react'
import styled from 'styled-components'

function Footer({ className, value }) {
    return <div className={className}>{value}</div>
}

export default styled(Footer)`
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    flex-shrink: 0;
    z-index: 9999;
    padding: 0 10px;
    height: 32px;
    background: #fff;
    border-top: 1px solid #dadada;
    font-family: monospace !important;
    line-height: 30px;
    font-size: 13px;

    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0px;
        bottom: 0;
        right: 0;
        width: 10px;
        background: #fff;
    }
`
