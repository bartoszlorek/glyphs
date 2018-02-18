import React from 'react'
import styled from 'styled-components'

function Body({ className, children }) {
    return <div className={className}>{children}</div>
}

export default styled(Body)`
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
`
