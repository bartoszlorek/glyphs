import React from 'react'
import table from '../unicode/lookup-table/aglfn'

import Glyph from './Glyph'
import style from './style.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <input type='text' />
                <div className={style.container}>
                    {table.glyphs.map((data, index) =>
                        <Glyph key={index} data={data} />
                    )}
                </div>
            </div>
        )
    }
}

export default App