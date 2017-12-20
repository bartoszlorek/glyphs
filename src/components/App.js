import React from 'react'
import table from '../unicode/lookup-table/aglfn'
import { bind } from '../.utils/react-utils'

import Glyph from './Glyph'
import style from './style.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        bind(this, [
            'handleSearch'
        ])
        this.state = {}
    }

    handleSearch(e) {
        console.log(e.target.value)
    }

    render() {
        return (
            <div>
                <input
                    type='text'
                    onChange={this.handleSearch}
                />
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