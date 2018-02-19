import React from 'react'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion'

function Frame({ className, children, isVisible }) {
    if (isVisible === false) {
        return null
    }
    return (
        <Motion
            defaultStyle={{ opacity: 0 }}
            style={{ opacity: spring(1, { stiffness: 400, damping: 40 }) }}
        >
            {style => (
                <div className={className} style={style}>
                    {children}
                </div>
            )}
        </Motion>
    )
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
