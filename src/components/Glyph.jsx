import React from 'react'
import bem from './bem'

function Glyph(props) {
    let { value, name, symbol } = props.data
    return (
        <div
            className={bem('glyph')}
            data-name={name}
        >
            <span className={bem('symbol')}>{symbol}</span>
            <span className={bem('value')}>{value}</span>
        </div>
    )

}

export default Glyph