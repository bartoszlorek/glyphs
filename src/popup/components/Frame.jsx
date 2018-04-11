import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Draggabilly from 'draggabilly'

import ButtonClose from './ButtonClose'

const titleSlug = str => str.replace(' ', '-').toLowerCase() + '-frame'

const Handler = styled.div`
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    height: 36px; 
    padding-left: 10px;
    font-weight: 500;
    cursor: move;
`

class Frame extends React.PureComponent {
    componentDidMount() {
        let draggie = new Draggabilly(this.refs.frameElement, {
            handle: '.frame-handler'
        })
        draggie.on('dragStart', this.props.onDragStart)
        draggie.on('dragMove', this.props.onDragMove)
        draggie.on('dragEnd', this.props.onDragEnd)
        draggie.on('pointerDown', this.props.onPointerDown)
        draggie.on('pointerUp', this.props.onPointerUp)
        draggie.on('staticClick', this.props.onStaticClick)
        this.draggable = draggie
    }

    componentWillUnmount() {
        this.draggable.destroy()
    }

    render() {
        let { className, children, title, onClose } = this.props

        return (
            <div className={className} id={titleSlug(title)} ref="frameElement">
                <Handler className="frame-handler">
                    <span>{title}</span>
                    <ButtonClose onClick={onClose} />
                </Handler>
                {children}
            </div>
        )
    }
}

Frame.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragMove: PropTypes.func,
    onDragEnd: PropTypes.func,
    onPointerDown: PropTypes.func,
    onPointerUp: PropTypes.func,
    onStaticClick: PropTypes.func
}

Frame.defaultProps = {
    title: '',
    onClose: null,
    onDragStart: null,
    onDragMove: null,
    onDragEnd: null,
    onPointerDown: null,
    onPointerUp: null,
    onStaticClick: null
}

export default styled(Frame)`
    z-index: 2147483644;
    position: fixed;
    overflow: hidden;
    top: 0;
    right: 0;
    left: auto;
    bottom: auto;
    width: 400px;
    height: 500px;
    margin: 10px;

    display: flex;
    flex-direction: column;

    background: #fff;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
    border: 1px solid #b8b8b8;
    border-radius: 2px;
    color: #333;

    & * {
        /* force global style */
        font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', Helvetica, Arial, sans-serif, 'Segoe UI Symbol' !important;
        font-size: 14px;
    }
`
