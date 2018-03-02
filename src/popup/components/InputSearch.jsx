import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { setValue } from '../../.utils/set-native'

import Input from './Input'

const ButtonClear = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    user-select: none;
    line-height: 32px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    color: #999;

    &:hover {
        color: #666;
        cursor: pointer;
    }

    &:active {
        color: #0e9f6f;
    }
`

class InputSearch extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleClear = this.handleClear.bind(this)
    }

    handleClear() {
        setValue(this.input, '')
        this.input.dispatchEvent(
            new Event('input', {
                bubbles: true
            })
        )
    }

    render() {
        let { className, defaultValue, placeholder, onChange } = this.props
        return (
            <div className={className}>
                <Input
                    innerRef={node => (this.input = node)}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <ButtonClear onClick={this.handleClear}>×</ButtonClear>
            </div>
        )
    }
}

InputSearch.propTypes = {
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string
}

InputSearch.defaultProps = {
    defaultValue: '',
    placeholder: ''
}

export default styled(InputSearch)`
    position: relative;
`
