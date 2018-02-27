import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Draggabilly from 'draggabilly'

const titleSlug = str => str.replace(' ', '-').toLowerCase() + '-frame'

const Handler = styled.div`
    position: relative;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    font-weight: 500;
    line-height: 1;
    cursor: move;
`

class Frame extends React.Component {
    componentDidMount() {
        this.draggable = new Draggabilly(this.refs.frameElement, {
            handle: '.frame-handler'
        })
    }

    componentWillUnmount() {
        this.draggable.destroy()
    }

    render() {
        let { className, children, title } = this.props
        return (
            <div id={titleSlug(title)} className={className} ref="frameElement">
                <Handler className="frame-handler">{title}</Handler>
                {children}
            </div>
        )
    }
}

Frame.propTypes = {
    title: PropTypes.string
}

Frame.defaultProps = {
    title: ''
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
    font-size: 14px;
    font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', Helvetica,
        Arial, sans-serif, 'Segoe UI Symbol';
`
