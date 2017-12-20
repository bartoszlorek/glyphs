import React from 'react'
import style from './style.css'

function Glyph(props) {
    let { value, name, symbol } = props.data
    return (
        <div
            className={style.glyph}
            data-name={name}
        >
            <span className={style.symbol}>{symbol}</span>
            <span className={style.value}>{value}</span>
        </div>
    )

}

export default Glyph