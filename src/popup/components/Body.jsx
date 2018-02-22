import React from 'react'
import styled from 'styled-components'

function Body({ className, children }) {
    return <div className={className}>{children}</div>
}

export default styled(Body)`
    position: relative;
    overflow-y: scroll;
    height: 100%;
    padding: 10px;
`
