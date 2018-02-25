import React from 'react'
import styled from 'styled-components'

export default styled.input.attrs({
    defaultValue: props => props.defaultValue,
    type: 'search'
})`
    width: 100%;
    height: 32px;
    padding: 0.5em;
    margin: 0 0 5px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline: 0;

    &:active,
    &:focus {
        border-color: #0e9f6f;
        box-shadow: 0 0 0 2px rgba(14, 159, 111, 0.2);
    }

    &::placeholder {
        color: #aaa;
    }
`
