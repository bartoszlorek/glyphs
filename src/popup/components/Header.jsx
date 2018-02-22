import React from 'react'
import styled from 'styled-components'

function Header({ className, children }) {
    return <div className={className}>{children}</div>
}

export default styled(Header)`
    padding: 10px;
    background: #fff;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid #dadada;
    z-index: 9999;
`
