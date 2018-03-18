import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { setNativeValue } from '../../.utils/set-native'
import { bind } from '../../.utils/react-utils'

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
        bind(this, [
            'handleClear',
            'handleChange'
        ])
        this.state = {
            isEmpty: true
        }
    }

    handleClear() {
        setNativeValue(this.input, '')
        this.input.dispatchEvent(
            new Event('input', {
                bubbles: true
            })
        )
    }

    handleChange(e) {
        this.setState({
            isEmpty: e.target.value === ''
        })
        this.props.onChange(e)
    }

    render() {
        let { className, defaultValue, placeholder } = this.props

        return (
            <div className={className}>
                <Input
                    innerRef={node => (this.input = node)}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                />
                {!this.state.isEmpty && (
                    <ButtonClear onClick={this.handleClear}>×</ButtonClear>
                )}
            </div>
        )
    }
}

InputSearch.propTypes = {
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

InputSearch.defaultProps = {
    defaultValue: '',
    placeholder: '',
    onChange: () => null
}

export default styled(InputSearch)`
    position: relative;
`
