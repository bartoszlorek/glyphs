import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ButtonClose from './ButtonClose'

const Dialog = styled.div`
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    width: 75%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dbdbdb;
    padding-left: 12px;
    font-weight: 500;
`

const Body = styled.div`
    padding: 12px;
    background: #f5f5f5;
`

class Flash extends React.PureComponent {
    render() {
        let { value, onClose, className } = this.props

        if (value === '') {
            return null
        }
        return (
            <div className={className}>
                <Dialog>
                    <Header>
                        <span>Error</span>
                        <ButtonClose onClick={onClose} />
                    </Header>
                    <Body>{value}</Body>
                </Dialog>
            </div>
        )
    }
}

Flash.propTypes = {
    value: PropTypes.string.isRequired,
    onClose: PropTypes.func
}

Flash.defaultProps = {
    value: '',
    onClose: () => null
}

export default styled(Flash)`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(42, 45, 53, 0.4);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
`
