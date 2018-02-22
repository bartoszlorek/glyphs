import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Overlay({ className, isVisible }) {
    if (isVisible === true) {
        return <div className={className} />
    }
    return null
}

Overlay.propTypes = {
    isVisible: PropTypes.bool,
    zIndex: PropTypes.number
}

Overlay.defaultProps = {
    isVisible: true,
    zIndex: 10
}

export default styled(Overlay)`
    position: absolute;
    z-index: ${props => props.zIndex};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`
