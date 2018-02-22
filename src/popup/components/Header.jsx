import React from 'react'
import styled from 'styled-components'

function Header({ className, children }) {
    return <div className={className}>{children}</div>
}

export default styled(Header)`
    padding: 0 10px 10px;
    flex-shrink: 0;
    z-index: 9999;
    background: #fff;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid #dadada;
`
