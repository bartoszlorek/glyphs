import React from 'react'
import bem from '../bem'

function Glyph({ data, onClick }) {
    let { value, name, symbol } = data

    return (
        <div
            data-name={name}
            className={bem('glyph')}
            onClick={() => onClick(data)}
        >
            <span className={bem('symbol')}>{symbol}</span>
            <span className={bem('value')}>{value}</span>
        </div>
    )
}

export default Glyph
