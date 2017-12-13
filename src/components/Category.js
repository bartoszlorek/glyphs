import React from 'react'
import style from './style.css'

function Category({ characters, description }) {
    return (
        <div>
            <h2>{description}</h2>
            <div className={style.set}>
                {characters.map((char, index) =>
                    <div
                        key={index}
                        className={style.item}
                    >
                        <span className={style.symbol}>{char.symbol}</span>
                        <span className={style.code}>{char.code}</span>
                    </div>
                )}
            </div>
        </div>
    )

}

export default Category