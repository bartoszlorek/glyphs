import React from 'react'
import styled from 'styled-components'

function Frame({ className, children, isVisible }) {
    if (isVisible === false) {
        return null
    }
    return <div className={className}>{children}</div>
}

export default styled(Frame)`
    z-index: 2147483644;
    position: fixed;
    top: 0;
    right: 0;
    left: auto;
    bottom: auto;
    width: 400px;
    height: 450px;
    margin: 10px;

    display: flex;
    flex-direction: column;

    background: #fff;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
    border: 1px solid #b8b8b8;

    color: #333;
    font-size: 14px;
    font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', Helvetica,
        Arial, sans-serif, 'Segoe UI Symbol';
`
