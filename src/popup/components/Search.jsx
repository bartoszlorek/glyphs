import React from 'react'
import styled from 'styled-components'

export default styled.input.attrs({
    defaultValue: props => props.defaultValue,
    type: 'search'
})`
    width: 100%;
    padding: 0.65em;
    margin: 0 0 8px;
    border: 1px solid #ddd;
    box-sizing: border-box;
`
