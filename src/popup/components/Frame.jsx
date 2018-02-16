import React from 'react'
import styled from 'styled-components'

function Frame({ className, children, isVisible }) {
    if (isVisible === false) {
        return null
    }
    return <div className={className}>{children}</div>
}

export default styled(Frame)`
    position: fixed;
    overflow-y: scroll;
    top: 0;
    right: 0;
    width: 400px;
    height: 450px;
    padding: 10px;
    margin: 10px;
    background: #fff;
    border: 1px solid #b8b8b8;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
    z-index: 2147483644;
    font-size: 14px;
    color: #333;
    font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', Helvetica,
        Arial, sans-serif, 'Segoe UI Symbol';
`
